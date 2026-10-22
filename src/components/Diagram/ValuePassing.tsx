import {Arrow, Box, Figure, Label, Panel} from './parts';

/** `rename` vs `replace`: what the caller's variable and the parameter point to after each call. */
export default function ValuePassing(): JSX.Element {
  return (
    <Figure label="rename 与 replace 调用后，调用方变量和形参分别指向哪个对象">
      <Panel height={270} label="rename：调用方变量和形参指向同一个对象，对象的 name 改成了 Asuka">
        {(marker) => (
          <>
            <Label x={190} y={24} mono strong>rename(first)</Label>
            <Label x={80} y={52}>调用方变量</Label>
            <Box x={20} y={60} w={120} h={44} kind="var" />
            <Label x={80} y={88} mono>first</Label>
            <Box x={20} y={166} w={120} h={44} kind="var" />
            <Label x={80} y={194} mono>user</Label>
            <Label x={80} y={230}>形参</Label>
            <Box x={220} y={100} w={140} h={70} kind="obj" />
            <Label x={290} y={128} mono>User</Label>
            <Label x={290} y={152} mono strong>name = Asuka</Label>
            <Arrow d="M140,82 C180,82 185,120 218,125" marker={marker} />
            <Arrow d="M140,188 C180,188 185,152 218,148" marker={marker} />
            <Label x={190} y={260}>改的是同一个对象，调用方能看到</Label>
          </>
        )}
      </Panel>
      <Panel height={270} label="replace：形参改为指向新对象，调用方变量仍指向原来 name 为 Lin 的对象">
        {(marker) => (
          <>
            <Label x={190} y={24} mono strong>replace(first)</Label>
            <Label x={80} y={52}>调用方变量</Label>
            <Box x={20} y={60} w={120} h={44} kind="var" />
            <Label x={80} y={88} mono>first</Label>
            <Box x={20} y={166} w={120} h={44} kind="var" />
            <Label x={80} y={194} mono>user</Label>
            <Label x={80} y={230}>形参</Label>
            <Box x={230} y={47} w={140} h={70} kind="obj" />
            <Label x={300} y={75} mono>User</Label>
            <Label x={300} y={99} mono>name = Lin</Label>
            <Box x={230} y={153} w={140} h={70} kind="obj" />
            <Label x={300} y={181} mono>User（新对象）</Label>
            <Label x={300} y={205} mono strong>name = Asuka</Label>
            <Arrow d="M140,82 L228,82" marker={marker} />
            <Arrow d="M140,180 C175,160 190,120 228,102" marker={marker} old />
            <Arrow d="M140,188 L228,188" marker={marker} />
            <Label x={202} y={146} anchor="start">原来的指向</Label>
            <Label x={190} y={260}>只改了形参，调用方仍指向 Lin</Label>
          </>
        )}
      </Panel>
    </Figure>
  );
}
