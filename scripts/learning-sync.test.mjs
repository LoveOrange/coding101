import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';
import ts from 'typescript';

// Exercise the real store/hook and Worker with isolated storage, clocks and
// transport. These tests never load credentials or connect to a database.
const compiled = new Map();
function moduleFrom(file, imports, globals = {}) {
  if (!compiled.has(file)) compiled.set(file, ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX},
  }).outputText);
  const exports = {};
  vm.runInNewContext(compiled.get(file), {exports, require: name => {
    if (!(name in imports)) throw new Error(`Unexpected import ${name}`);
    return imports[name];
  }, TextEncoder, URL, URLSearchParams, Request, Response, ...globals}, {filename: file});
  return exports;
}
const copy = value => JSON.parse(JSON.stringify(value));
const key = 'coding101.learner.v1';
const article = 'tools-and-frameworks/vue/components';
const card = 'tools-and-frameworks.vue.components#communication';
const records = () => ({cards: {}, reading: {}, sessions: [], preferences: {dailyLimit: 20}});
const seed = (id = 'a') => ({version: 1, ...records(), billing: [],
  account: {id, name: id, email: `${id}@example.test`, createdAt: '2026-01-01'},
  subscription: {status: 'trial', endsAt: '2099-01-01'}});
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((yes, no) => {resolve = yes; reject = no;});
  return {promise, resolve, reject};
};
const drain = async () => { for (let i = 0; i < 30; i++) await Promise.resolve(); };
class ApiError extends Error {
  constructor(status, code, body = {}) { super(code); Object.assign(this, {status, code, body}); }
}
const {parseLearnerDoc} = moduleFrom('worker/src/learner.ts', {});

function server() {
  const data = new Map();
  const service = {user: 'a', reachable: true, writes: 0, reads: 0};
  const check = userId => {
    if (!service.reachable) throw new TypeError('network unavailable');
    if (userId !== service.user) throw new ApiError(409, 'account_changed');
  };
  service.api = {
    me: async () => {
      if (!service.reachable) throw new TypeError('network unavailable');
      return service.user ? {user: {...seed(service.user).account}, access: seed().subscription} : {user: null, access: null};
    },
    getRecords: async userId => {
      check(userId); service.reads++;
      return {userId, ...copy(data.get(userId) ?? {version: 0, data: null}), writable: true};
    },
    putRecords: async (userId, version, doc) => {
      check(userId);
      const current = data.get(userId) ?? {version: 0, data: null};
      if (version !== current.version) throw new ApiError(409, 'version_conflict', {current: copy(current)});
      const validated = parseLearnerDoc(doc);
      assert(validated, 'Records must pass the real server validator');
      data.set(userId, {version: version + 1, data: copy(validated)});
      service.writes++;
      return {version: version + 1};
    },
    signOut: async () => {service.user = null;},
  };
  return Object.assign(service, {data});
}

function device(service, initial) {
  const saved = new Map(initial ? [[key, JSON.stringify(initial)]] : []);
  const timers = new Map(), intervals = new Map(), events = new Map();
  let clock = 0, id = 0, subscribe;
  const eventTarget = {
    addEventListener(name, fn) {if (!events.has(name)) events.set(name, new Set()); events.get(name).add(fn);},
    removeEventListener(name, fn) {events.get(name)?.delete(fn);},
  };
  const window = {...eventTarget, innerHeight: 844,
    localStorage: {getItem: k => saved.get(k) ?? null, setItem: (k, v) => saved.set(k, v)},
    setTimeout(fn, delay = 0) {timers.set(++id, {fn, at: clock + delay}); return id;},
    clearTimeout: n => timers.delete(n),
    setInterval(fn, delay) {intervals.set(++id, {fn, at: clock + delay, delay}); return id;},
    clearInterval: n => intervals.delete(n),
    requestAnimationFrame(fn) {return window.setTimeout(fn, 16);},
    cancelAnimationFrame(n) {window.clearTimeout(n);},
  };
  const document = {...eventTarget, visibilityState: 'visible'};
  const store = moduleFrom('src/learning/store.ts', {
    react: {useSyncExternalStore: (sub, snapshot) => {subscribe = sub; return snapshot();}},
    './api': {api: service.api, ApiError, serverEnabled: () => true},
    '@site/src/data/contentMoves.json': {default: JSON.parse(fs.readFileSync('src/data/contentMoves.json'))},
  }, {window, document});
  return {store, window, document, saved, intervals,
    local: () => JSON.parse(saved.get(key)),
    mount() {store.useLearner(); return subscribe(() => {});},
    async event(name, event = {}) {events.get(name)?.forEach(fn => fn(event)); await drain();},
    async tick(ms) {
      const end = clock + ms;
      for (let rounds = 0; rounds < 100; rounds++) {
        await drain();
        const next = [...timers, ...intervals].filter(([, t]) => t.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
        if (!next) {clock = end; return;}
        const [n, timer] = next; clock = timer.at;
        if (intervals.has(n)) timer.at += timer.delay; else timers.delete(n);
        timer.fn();
      }
      throw new Error('Timer loop did not converge');
    },
  };
}

test('reading, cards, settings and sessions persist before a network write and restore on another device', async () => {
  const s = server(), d = device(s, seed());
  await d.store.refresh();
  d.store.learnerActions.recordReading(article, 2, 'core', true);
  d.store.learnerActions.queueCards([card]);
  d.store.learnerActions.rate(card, 'good');
  d.store.learnerActions.setPreferences({roleId: 'frontend-vue', dailyLimit: 30});
  const session = d.store.learnerActions.startSession('exam', 'Practice', [card]);
  d.store.learnerActions.answer(session, {cardId: card, rating: 'good'});
  d.store.learnerActions.finishSession(session);
  assert.equal(d.local().reading[article].done, true);
  assert.equal(d.local().cards[card].reps, 1);
  assert.equal(s.writes, 0);
  await d.tick(2000);
  assert.equal(s.writes, 1);
  const another = device(s);
  await another.store.refresh();
  assert.equal(another.local().reading[article].furthest, 2);
  assert.equal(another.local().preferences.dailyLimit, 30);
  assert.equal(another.local().preferences.roleId, 'frontend-vue');
  assert(another.local().sessions[0].finishedAt);
});

test('offline edits survive reload and sync on reconnect without interaction', async () => {
  const s = server(), first = device(s, seed());
  await first.store.refresh(); s.reachable = false;
  first.store.learnerActions.recordReading(article, 3, 'core', true);
  await first.tick(2000);
  assert.equal(s.writes, 0);
  const reloaded = device(s, first.local());
  reloaded.mount(); await drain();
  s.reachable = true;
  await reloaded.event('online'); await reloaded.tick(0);
  assert.equal(s.data.get('a').data.reading[article].furthest, 3);
});

test('failed upload retries in the background; periodic pull sees another device', async () => {
  const s = server(), d = device(s, seed());
  const stop = d.mount(); await drain();
  s.reachable = false;
  d.store.learnerActions.recordReading(article, 1, 'core', false);
  await d.tick(2000); s.reachable = true;
  await d.tick(30000);
  assert.equal(s.writes, 1);
  const remote = s.data.get('a');
  remote.version++;
  remote.data.reading[article].furthest = 7;
  remote.data.reading[article].done = true;
  await d.tick(28000);
  assert.equal(d.local().reading[article].furthest, 7);
  stop(); assert.equal(d.intervals.size, 0);
});

test('subscriptions share one timer and hidden tabs reconcile when visible again', async () => {
  const s = server(), d = device(s, seed());
  const stop1 = d.mount(), stop2 = d.mount(); await drain();
  assert.equal(d.intervals.size, 1);
  const reads = s.reads;
  d.document.visibilityState = 'hidden'; await d.tick(60000);
  assert.equal(s.reads, reads);
  d.document.visibilityState = 'visible'; await d.event('visibilitychange');
  assert.equal(s.reads, reads + 1);
  stop1(); assert.equal(d.intervals.size, 1);
  stop2(); assert.equal(d.intervals.size, 0);
});

test('a slow pull merges edits made after the request began, and refresh is single flight', async () => {
  const s = server(), pending = deferred(), d = device(s, seed());
  s.api.getRecords = () => pending.promise;
  const pull = d.store.refresh(); await drain();
  assert.equal(d.store.refresh(), pull);
  d.store.learnerActions.recordReading(article, 4, 'core', true);
  pending.resolve({userId: 'a', version: 0, data: null, writable: true});
  await pull; await d.tick(0);
  assert.equal(d.local().reading[article].furthest, 4);
  assert.equal(s.data.get('a').data.reading[article].furthest, 4);
});

test('edits made during upload are uploaded after the first acknowledgement', async () => {
  const s = server(), d = device(s, seed()); await d.store.refresh();
  const pending = deferred(), put = s.api.putRecords;
  s.api.putRecords = async (...args) => {await pending.promise; return put(...args);};
  d.store.learnerActions.recordReading(article, 1, 'core', false); await d.tick(2000);
  d.store.learnerActions.recordReading(article, 5, 'core', true);
  pending.resolve(); await drain(); await d.tick(2000);
  assert.equal(s.writes, 2);
  assert.equal(s.data.get('a').data.reading[article].furthest, 5);
});

test('version conflicts merge both devices before retrying', async () => {
  const s = server(), d = device(s, seed()); await d.store.refresh();
  s.data.set('a', {version: 1, data: {...records(), reading: {
    other: {furthest: 2, done: true, updatedAt: '2026-01-01T00:00:00Z'},
  }}});
  d.store.learnerActions.recordReading(article, 3, 'core', false);
  await d.tick(4000);
  assert.equal(s.data.get('a').version, 2);
  assert.equal(s.data.get('a').data.reading.other.done, true);
  assert.equal(s.data.get('a').data.reading[article].furthest, 3);
});

test('old pull and push responses cannot restore records after sign-out', async () => {
  for (const operation of ['pull', 'push']) {
    const s = server(), d = device(s, seed()); await d.store.refresh();
    const pending = deferred();
    if (operation === 'pull') {s.api.getRecords = () => pending.promise; void d.store.refresh();}
    else {s.api.putRecords = () => pending.promise; d.store.learnerActions.recordReading(article, 1, 'core', true); await d.tick(2000);}
    await drain(); await d.store.learnerActions.signOut();
    pending.resolve({userId: 'a', version: 99, data: {...records(), reading: {old: {done: true}}}, writable: true});
    await drain();
    assert.equal(d.local().account, undefined);
    assert.equal(d.local().syncVersion, undefined);
    assert.deepEqual(d.local().reading, {});
  }
});

test('cached account A cannot write under account B, including a cookie change during a request', async () => {
  const s = server(), d = device(s, seed());
  s.user = 'b';
  d.store.learnerActions.recordReading(article, 1, 'core', true);
  await d.tick(2000);
  assert.equal(d.local().account.id, 'b');
  assert.deepEqual(d.local().reading, {});
  assert.equal(s.writes, 0);
  d.store.learnerActions.recordReading(article, 2, 'core', true);
  s.user = 'c'; await d.tick(2000); await d.tick(30000);
  assert.equal(s.writes, 0);
  assert.equal(d.local().account.id, 'c');
});

test('mismatched GET owner is rejected before remote records can merge', async () => {
  const s = server(), d = device(s, seed());
  s.api.getRecords = async () => ({userId: 'b', version: 9, data: {...records(), reading: {secret: {done: true}}}, writable: true});
  await d.store.refresh();
  assert.equal(d.local().reading.secret, undefined);
  d.store.learnerActions.recordReading(article, 1, 'core', true);
  await d.tick(2000); assert.equal(s.writes, 0);
});

test('settings changed on another device win; clearing a target role survives JSON and merge', async () => {
  const s = server(), d = device(s, seed());
  const local = {...records(), preferences: {dailyLimit: 20, updatedAt: '2026-02-01'}};
  const remote = {...records(), preferences: {roleId: 'go', dailyLimit: 30, updatedAt: '2026-01-01'}};
  assert.equal(d.store.mergeRecords(local, remote).preferences.roleId, undefined);
  assert.equal(d.store.mergeRecords(remote, local).preferences.roleId, undefined);
});

test('fresh-device defaults still yield to legacy remote preferences after a failed first pull', async () => {
  const s = server(), d = device(s), get = s.api.getRecords;
  s.data.set('a', {version: 1, data: {...records(), preferences: {dailyLimit: 30, roleId: 'go'}}});
  s.api.getRecords = async () => {throw new Error('temporary failure');};
  await d.store.refresh();
  s.api.getRecords = get; await d.store.refresh();
  assert.equal(d.local().preferences.dailyLimit, 30);
  assert.equal(d.local().preferences.roleId, 'go');
});

test('storage events merge simultaneous reading from two tabs and isolate changed accounts', async () => {
  const s = server(), d = device(s, seed()); d.mount(); await drain();
  d.store.learnerActions.recordReading(article, 4, 'core', true);
  const other = seed(); other.reading.other = {furthest: 2, done: true, updatedAt: '2026-01-01'};
  d.saved.set(key, JSON.stringify(other)); await d.event('storage', {key});
  assert.equal(d.local().reading[article].furthest, 4);
  assert.equal(d.local().reading.other.done, true);
  s.user = 'b'; d.saved.set(key, JSON.stringify(seed('b'))); await d.event('storage', {key});
  assert.deepEqual(d.local().reading, {});
});

test('reading starts when delayed access resolves and never credits the previous account', async () => {
  const s = server(), d = device(s);
  let dependencies, cleanup;
  const hook = moduleFrom('src/learning/article/useReadingTracker.ts', {
    react: {useEffect(fn, deps) {
      if (dependencies && deps.every((v, i) => v === dependencies[i])) return;
      cleanup?.(); dependencies = deps; cleanup = fn();
    }},
    '../content': {outlineSections: () => [{id: 'core'}]},
    '../store': d.store,
  }, {window: d.window, document: Object.assign(d.document, {querySelector: () => ({
    querySelectorAll: () => [{id: 'core', getBoundingClientRect: () => ({top: -10})}],
    getBoundingClientRect: () => ({bottom: 300}),
  })})});
  const props = {id: article, cardIds: [card]};
  hook.useReadingTracker(props); await d.tick(600);
  assert.deepEqual(copy(d.store.getLearner().reading), {});
  await d.store.refresh(); hook.useReadingTracker(props); await d.tick(600);
  assert.equal(d.local().reading[article].done, true);
  assert.equal(d.local().cards[card].reps, 0);
  s.user = 'b'; await d.store.refresh();
  await d.event('pagehide'); // Old effect has not rerendered yet.
  assert.deepEqual(d.local().reading, {});
  hook.useReadingTracker(props); await d.tick(600);
  assert.equal(d.local().reading[article].done, true);
  cleanup?.();
});

test('free users retain existing entitlement boundary', () => {
  const d = device(server(), {...seed(), subscription: {status: 'free', hadTrial: true}});
  d.store.learnerActions.recordReading(article, 2, 'core', true);
  assert.deepEqual(copy(d.store.getLearner().reading), {});
});

test('Worker pins GET and PUT to the authenticated owner, and accepts older clients', async () => {
  let queries = 0;
  const db = {query: async sql => {queries++; return sql.startsWith('SELECT') ? [] : [{version: 1}];}};
  const worker = moduleFrom('worker/src/index.ts', {
    './account': {whoIs: async () => ({user: {id: 'b'}, access: {status: 'trial'}}),
      hasAccess: () => true, isAccountRoute: () => false},
    './companies': {}, './purge': {}, './db': {neonDb: () => db},
    './learner': moduleFrom('worker/src/learner.ts', {}),
  }).default;
  const request = (method, id) => new Request(`https://example.test/api/c101/learner${method === 'GET' ? `?userId=${id}` : ''}`, {
    method, ...(method === 'PUT' ? {body: JSON.stringify({userId: id, baseVersion: 0, data: records()})} : {}),
  });
  for (const method of ['GET', 'PUT']) {
    const response = await worker.fetch(request(method, 'a'), {}, {});
    assert.equal(response.status, 409);
    assert.equal((await response.json()).error, 'account_changed');
  }
  assert.equal(queries, 0, 'A mismatched owner must not reach the database');
  const get = await worker.fetch(request('GET', 'b'), {}, {});
  assert.equal((await get.json()).userId, 'b');
  for (const id of ['b', undefined]) assert.equal((await worker.fetch(request('PUT', id), {}, {})).status, 200);
});

test('browsing topics and preparing an exam preserve the saved target role and carry the selected scope', () => {
  const d = device(server(), {...seed(), preferences: {dailyLimit: 20, roleId: 'go'}});
  let search = '?role=go', destination;
  const roleFns = moduleFrom('src/learning/roles.ts', {});
  const index = {roles: [{id: 'go', label: 'Go'}, {id: 'frontend-vue', label: 'Vue'}],
    domains: [{id: 'vue', label: 'Vue', articleIds: [article], topics: [{id: 'components', label: 'Components', articleIds: [article]}]}],
    articles: {[article]: {id: article, domainId: 'vue', topicId: 'components', roles: ['frontend-vue'], rolePriorities: {'frontend-vue': 'must'}, cardIds: [card]}},
    cards: {[card]: {id: card, articleId: article, question: 'Components?', checkpointCount: 1}}};
  const react = {useEffect() {}, useCallback: fn => fn, useMemo: fn => fn(), useRef: () => ({current: null}), useState: value => [value, () => {}]};
  const router = {useLocation: () => ({search}), useHistory: () => ({push(value) {
    destination = value; if (typeof value === 'object') search = value.search;
  }, replace(value) {destination = value;}})};
  const content = moduleFrom('src/learning/content.ts', {
    '@docusaurus/useGlobalData': {usePluginData: () => index}, '@docusaurus/router': router,
    '@docusaurus/useIsBrowser': {default: () => true}, './compact': {expandIndex: x => x},
    './store': d.store, './roles': roleFns,
  });
  const jsx = (type, props) => ({type, props});
  const imports = {react, 'react/jsx-runtime': {jsx, jsxs: jsx}, clsx: {default: () => ''},
    '@docusaurus/Link': {default: 'Link'}, '@docusaurus/router': router,
    '../store': {...d.store, useLearner: d.store.getLearner}, '../content': content,
    '../features': {useLearnerFeatures: () => true}, '../roles': roleFns,
    '../ui/ClientOnly': {ClientPage: 'ClientPage'}, '../ui/PublicCatalog': {PublicCatalog: 'PublicCatalog'},
    '../ui/RolePicker': {RolePicker: 'RolePicker'}, '../ui/RoleSelect': {RoleSelect: 'RoleSelect'},
    '../ui/scrollSelection': {}, '../study': moduleFrom('src/learning/study.ts', {}),
    '../article/ArticleParts': {reviewHref: () => '/review'}, '../companies': {},
    '../review/WeakList': {}, '../ui': {formatMonthDay: value => value}, '../review/UpgradeDialog': {},
  };
  imports['../review/WeakList'] = moduleFrom('src/learning/review/WeakList.tsx', {...imports, './report.module.css': {default: {}}});
  const render = (name, props) => {
    const component = moduleFrom(`src/learning/pages/${name}.tsx`, {...imports, [`./${name}.module.css`]: {default: {}}}).default;
    const child = component(props).props.children();
    return child.type(child.props);
  };
  const elements = node => !node || typeof node !== 'object' ? [] : Array.isArray(node)
    ? node.flatMap(elements) : [node, ...elements(node.props?.children)];
  let nodes = elements(render('Topics', {guides: {}}));
  nodes.find(n => n.type === 'RolePicker').props.onChange('frontend-vue');
  assert.equal(new URLSearchParams(search).get('role'), 'frontend-vue');
  assert.equal(d.store.getLearner().preferences.roleId, 'go');
  nodes = elements(render('Questions'));
  const examLink = nodes.find(n => n.type === 'Link' && n.props.to?.startsWith('/exam?'));
  examLink.props.onClick();
  assert.equal(d.store.getLearner().preferences.roleId, 'go');
  search = examLink.props.to.slice('/exam'.length);
  nodes = elements(render('Exam'));
  nodes.find(n => n.type === 'button' && n.props.children === '开始 1 题 →').props.onClick();
  assert.equal(d.store.getLearner().preferences.roleId, 'go');
  assert.deepEqual(copy(d.store.getLearner().sessions[0].cardIds), [card]);
  assert.equal(new URL(destination, 'https://example.test').searchParams.get('role'), 'frontend-vue');
  search = new URL(destination, 'https://example.test').search;
  const runner = moduleFrom('src/learning/review/SessionRunner.tsx', {...imports,
    '@docusaurus/Head': {default: 'Head'}, './CardFace': {}, './RatingBar': {}, './UpgradeDialog': {},
    './review.module.css': {default: {}},
  }).SessionRunner;
  nodes = elements(runner({sessionId: d.store.getLearner().sessions[0].id, details: {[card]: {...index.cards[card], checkpoints: ['Core']}}}));
  nodes.find(n => n.type === 'button' && n.props.children === '跳过').props.onClick();
  assert.equal(new URL(destination, 'https://example.test').searchParams.get('role'), 'frontend-vue');
  search = new URL(destination, 'https://example.test').search;
  imports['../review/report.module.css'] = {default: {}};
  nodes = elements(render('Report'));
  const repeat = nodes.find(n => n.type === 'Link' && n.props.children === '再来一次');
  assert.equal(new URL(repeat.props.to, 'https://example.test').searchParams.get('role'), 'frontend-vue');
  assert.equal(d.store.getLearner().preferences.roleId, 'go');
});
