import { Card, Text, useMantineTheme } from "@mantine/core";
import { NoteType } from "~/api/notes";

interface Props {
  note: NoteType;
}

const NoteCard = ({ note }: Props) => {
  const theme = useMantineTheme();

  return (
    <Card
      shadow="sm"
      p="xl"
      className={theme.colorScheme === "dark" ? "bg-[#141517]" : "bg-[#F8F9FA]"}
    >
      <Text weight={500} size="lg">
        {note.title}
      </Text>

      <Text size="sm">{note.body.slice(0, 70)}</Text>
    </Card>
  );
};
export default NoteCard;
