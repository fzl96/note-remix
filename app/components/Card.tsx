import { NoteType } from "~/api/notes";
import { motion } from "framer-motion";
import { useMantineColorScheme } from "@mantine/core";

interface Props {
  note: NoteType;
}

const Card = ({ note }: Props) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.9 }}
        className={`${dark ? "bg-grayishDark2" : "bg-grayish"} p-5  rounded-md`}
        layoutId={note.id.toString()}
      >
        <motion.h3 className="font-semibold">{note.title}</motion.h3>
        <motion.p className="text-sm">{note.body.slice(0, 50)}...</motion.p>
      </motion.div>
    </>
  );
};
export default Card;
