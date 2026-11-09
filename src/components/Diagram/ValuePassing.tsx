import {Arrow, Box, Figure, Label, Panel} from './parts';

/** Reference relationships inside sequential calls to `rename` and `replace`, before returning. */
export default function ValuePassing(): JSX.Element {
  return (
    <Figure label="依次调用 rename 与 replace，方法返回前 first 和形参 user 的引用关系">
      <Panel height={270} label="rename 修改 name 后：first 和 user 指向同一个对象，name 从 Lin 变成了 Asuka">
        {(marker) => (
          <>
            <Label x={190} y={24} mono strong>rename(first)</Label>
            <Label x={80} y={52}>main 中的变量</Label>
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
            <Label x={190} y={260}>修改共享对象，first 读到 Asuka</Label>
          </>
        )}
      </Panel>
      <Panel height={270} label="replace 重新赋值后：user 指向新对象 Rei，first 仍指向 name 已变成 Asuka 的原对象">
        {(marker) => (
          <>
            <Label x={190} y={24} mono strong>replace(first)</Label>
            <Label x={80} y={52}>main 中的变量</Label>
            <Box x={20} y={60} w={120} h={44} kind="var" />
            <Label x={80} y={88} mono>first</Label>
            <Box x={20} y={166} w={120} h={44} kind="var" />
            <Label x={80} y={194} mono>user</Label>
            <Label x={80} y={230}>形参</Label>
            <Box x={230} y={47} w={140} h={70} kind="obj" />
            <Label x={300} y={75} mono>User</Label>
            <Label x={300} y={99} mono>name = Asuka</Label>
            <Box x={230} y={153} w={140} h={70} kind="obj" />
            <Label x={300} y={181} mono>User（新对象）</Label>
            <Label x={300} y={205} mono strong>name = Rei</Label>
            <Arrow d="M140,82 L228,82" marker={marker} />
            <Arrow d="M140,180 C175,160 190,120 228,102" marker={marker} old />
            <Arrow d="M140,188 L228,188" marker={marker} />
            <Label x={202} y={146} anchor="start">原来的指向</Label>
            <Label x={190} y={260}>只改 user 的指向，first 仍读到 Asuka</Label>
          </>
        )}
      </Panel>
    </Figure>
  );
}
