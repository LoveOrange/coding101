import {Arrow, Box, Figure, Label, Panel} from './parts';

export default function GoSliceAppend(): JSX.Element {
  return (
    <Figure label="追加并修改元素后，view 与 shared 共享原数组，isolated 使用独立数组">
      <Panel height={282} label="容量足够：view 与 shared 共享内容为 9、2、3、0 的原数组，长度分别为 2 和 3">
        {(marker) => (
          <>
            <Label x={190} y={25} strong>容量足够，复用原数组</Label>
            <Box x={18} y={60} w={122} h={62} kind="var" />
            <Label x={79} y={86} mono>view</Label>
            <Label x={79} y={109} mono>len=2 cap=4</Label>
            <Box x={18} y={163} w={122} h={62} kind="var" />
            <Label x={79} y={189} mono>shared</Label>
            <Label x={79} y={212} mono>len=3 cap=4</Label>
            <Box x={198} y={112} w={164} h={74} kind="obj" />
            <Label x={280} y={138}>原数组</Label>
            <Label x={280} y={165} mono strong>[9, 2, 3, 0]</Label>
            <Arrow d="M140,91 C170,91 170,136 196,136" marker={marker} />
            <Arrow d="M140,194 C170,194 170,163 196,163" marker={marker} />
            <Label x={190} y={263} mono>shared[0] = 9 改到原数组</Label>
          </>
        )}
      </Panel>
      <Panel height={282} label="容量被限制后追加：view 仍引用原数组，isolated 引用独立数组，其前三个元素为 7、2、4">
        {(marker) => (
          <>
            <Label x={190} y={25} strong>容量不足，使用新数组</Label>
            <Box x={18} y={55} w={122} h={62} kind="var" />
            <Label x={79} y={81} mono>view</Label>
            <Label x={79} y={104} mono>len=2 cap=4</Label>
            <Box x={198} y={55} w={164} h={62} kind="obj" />
            <Label x={280} y={80}>原数组</Label>
            <Label x={280} y={104} mono>[9, 2, 3, 0]</Label>
            <Arrow d="M140,86 L196,86" marker={marker} />
            <Box x={18} y={163} w={122} h={62} kind="var" />
            <Label x={79} y={189} mono>isolated</Label>
            <Label x={79} y={212} mono>len=3</Label>
            <Box x={198} y={163} w={164} h={62} kind="obj" />
            <Label x={280} y={188}>新数组的前三个元素</Label>
            <Label x={280} y={212} mono strong>[7, 2, 4]</Label>
            <Arrow d="M140,194 L196,194" marker={marker} />
            <Label x={190} y={263} mono>isolated[0] = 7 不改原数组</Label>
          </>
        )}
      </Panel>
    </Figure>
  );
}
