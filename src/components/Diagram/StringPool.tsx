import {Arrow, Box, Figure, Label, Panel} from './parts';

/** Two literals share the interned object; `new String` creates a separate one. */
export default function StringPool(): JSX.Element {
  return (
    <Figure label="字符串字面量共享常量池中的对象，new String 创建新对象">
      <Panel height={270} label="first 和 second 指向常量池中内容为 Java 的同一个对象，created 指向另一个内容为 Java 的 String 对象">
        {(marker) => (
          <>
            <Box x={20} y={30} w={110} h={40} kind="var" />
            <Label x={75} y={56} mono>first</Label>
            <Box x={20} y={90} w={110} h={40} kind="var" />
            <Label x={75} y={116} mono>second</Label>
            <Box x={20} y={190} w={110} h={40} kind="var" />
            <Label x={75} y={216} mono>created</Label>
            <Box x={200} y={28} w={164} h={108} kind="empty" />
            <Label x={282} y={50}>字符串常量池</Label>
            <Box x={222} y={64} w={120} h={54} kind="obj" />
            <Label x={282} y={86} mono>String</Label>
            <Label x={282} y={107} mono>"Java"</Label>
            <Box x={222} y={182} w={120} h={54} kind="obj" />
            <Label x={282} y={204} mono>String</Label>
            <Label x={282} y={225} mono>"Java"</Label>
            <Arrow d="M130,50 C175,50 185,80 220,84" marker={marker} />
            <Arrow d="M130,110 C175,110 185,100 220,98" marker={marker} />
            <Arrow d="M130,210 L220,210" marker={marker} />
            <Label x={190} y={262}>first == second 为 true，first == created 为 false</Label>
          </>
        )}
      </Panel>
    </Figure>
  );
}
