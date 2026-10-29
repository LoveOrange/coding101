import {Arrow, Box, Figure, Label, Panel} from './parts';

const STEPS: {text: string; kind: 'var' | 'obj'}[] = [
  {text: '打开 input', kind: 'var'},
  {text: '打开 output', kind: 'var'},
  {text: 'input.transferTo(output) 抛出 E1', kind: 'obj'},
  {text: '关闭 output，抛出 E2', kind: 'obj'},
  {text: '关闭 input，抛出 E3', kind: 'obj'},
];

/** Order of opening, failing and closing in try-with-resources, and where the close failures end up. */
export default function TryWithResources(): JSX.Element {
  const top = 44;
  const step = 50;
  const resultY = top + STEPS.length * step;
  return (
    <Figure label="try-with-resources 的执行顺序与抑制异常">
      <Panel height={resultY + 92} label="按声明顺序打开 input 和 output；主体抛出 E1 后，先关闭 output 再关闭 input；向外抛出 E1，E2 和 E3 进入它的 suppressed 列表">
        {(marker) => (
          <>
            <Label x={190} y={24}>假设复制和两次关闭都失败</Label>
            {STEPS.map(({text, kind}, i) => {
              const y = top + i * step;
              return (
                <g key={text}>
                  <Box x={30} y={y} w={320} h={34} kind={kind} />
                  <Label x={190} y={y + 22} mono>{text}</Label>
                  <Arrow d={`M190,${y + 34} L190,${y + step - 2}`} marker={marker} />
                </g>
              );
            })}
            <Box x={30} y={resultY} w={320} h={56} kind="var" />
            <Label x={190} y={resultY + 23} mono strong>向外抛出 E1</Label>
            <Label x={190} y={resultY + 45} mono>E1.getSuppressed() = [E2, E3]</Label>
            <Label x={190} y={resultY + 84}>关闭顺序与声明顺序相反</Label>
          </>
        )}
      </Panel>
    </Figure>
  );
}
