import {Arrow, Box, Figure, Label, Panel} from './parts';

/** `first.clone()`: a new array whose element still points at the same `StringBuilder`. */
export default function ShallowCopy(): JSX.Element {
  return (
    <Figure label="数组 clone 后的浅拷贝">
      <Panel height={250} label="first 和 clone 出的 second 是两个数组，它们的第 0 个元素指向同一个内容为 AB 的 StringBuilder">
        {(marker) => (
          <>
            <Label x={190} y={24} mono strong>second = first.clone()</Label>
            <Label x={95} y={50}>first（原数组）</Label>
            <Box x={20} y={58} w={150} h={46} kind="var" />
            <Label x={95} y={87} mono>[0]</Label>
            <Label x={95} y={152}>second（新数组）</Label>
            <Box x={20} y={160} w={150} h={46} kind="var" />
            <Label x={95} y={189} mono>[0]</Label>
            <Box x={240} y={98} w={124} h={66} kind="obj" />
            <Label x={302} y={125} mono>StringBuilder</Label>
            <Label x={302} y={149} mono strong>"AB"</Label>
            <Arrow d="M170,81 C205,81 210,118 238,122" marker={marker} />
            <Arrow d="M170,183 C205,183 210,146 238,142" marker={marker} />
            <Label x={190} y={240}>数组是新的，元素指向的对象仍然共享</Label>
          </>
        )}
      </Panel>
    </Figure>
  );
}
