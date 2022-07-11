import { Card, Text, useMantineTheme } from "@mantine/core";
import { NoteType } from "~/api/notes";
import { motion } from "framer-motion";

interface Props {
  note: NoteType;
}

const NoteCard = ({ note }: Props) => {
  const theme = useMantineTheme();

  return (
    <>
      <motion.div layoutId={note.id.toString()}>
        {/* <Card
        shadow="sm"
        p="xl"
        className={
          theme.colorScheme !== "dark" ? "bg-[#F8F9FA] z-[-1] " : "bg-[#141517]"
        }
      > */}
        <motion.h3
          layoutId={`${note.id.toString()}-title`}
          className="text-xl font-medium max-w-[20rem]"
        >
          {note.title}
        </motion.h3>

        <Text size="sm">{note.body.slice(0, 70)}</Text>
        {/* </Card> */}
      </motion.div>
    </>
  );
};
export default NoteCard;
