import {Arrow, Box, Figure, Label, Panel} from './parts';

/** A hash key whose field changes after insertion: the lookup goes to a different bucket. */
export default function MutableHashKey(): JSX.Element {
  return (
    <Figure label="可变哈希键：修改字段后按新的哈希值查找，找不到原来的条目">
      <Panel height={250} label="写入时，key 的 name 为 A，条目按当时的哈希值放进桶 3">
        {(marker) => (
          <>
            <Label x={190} y={24} mono strong>map.put(key, value)</Label>
            <Box x={20} y={92} w={130} h={60} kind="var" />
            <Label x={85} y={118} mono>key</Label>
            <Label x={85} y={140} mono>name = "A"</Label>
            <Box x={240} y={60} w={120} h={44} kind="obj" />
            <Label x={300} y={87} mono>桶 3：条目</Label>
            <Label x={300} y={130} mono>⋮</Label>
            <Box x={240} y={150} w={120} h={44} kind="empty" />
            <Label x={300} y={177} mono>桶 7</Label>
            <Arrow d="M150,112 C195,112 200,84 238,82" marker={marker} />
            <Label x={192} y={124} anchor="start">hashCode()</Label>
            <Label x={190} y={238}>按写入时的哈希值放进桶 3</Label>
          </>
        )}
      </Panel>
      <Panel height={250} label="把 key 的 name 改成 B 后，查询按新的哈希值去桶 7，条目仍留在桶 3">
        {(marker) => (
          <>
            <Label x={190} y={24} mono strong>key.name 改成 "B" 后 map.get(key)</Label>
            <Box x={20} y={92} w={130} h={60} kind="var" />
            <Label x={85} y={118} mono>key</Label>
            <Label x={85} y={140} mono strong>name = "B"</Label>
            <Box x={240} y={60} w={120} h={44} kind="obj" />
            <Label x={300} y={87} mono>桶 3：条目</Label>
            <Label x={300} y={130} mono>⋮</Label>
            <Box x={240} y={150} w={120} h={44} kind="empty" />
            <Label x={300} y={177} mono>桶 7：空</Label>
            <Arrow d="M150,132 C195,132 200,170 238,172" marker={marker} />
            <Label x={192} y={124} anchor="start">hashCode()</Label>
            <Label x={190} y={238}>按新的哈希值去桶 7 查找，找不到条目</Label>
          </>
        )}
      </Panel>
    </Figure>
  );
}
