import { useMantineColorScheme } from "@mantine/core";
import { NoteType } from "~/api/notes";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  note: NoteType;
}

const NoteCard = ({ note }: Props) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <>
      <motion.div
        layoutId={`${note.id.toString()}-container`}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.9 }}
        className={`${dark ? "bg-[#141517]" : "bg-[#fdaaaa]"} p-5 rounded-lg
        `}
      >
        <motion.h3
          // layoutId={`${note.id.toString()}-title`}
          className="text-lg font-medium max-w-[20rem]"
        >
          {note.title}
        </motion.h3>

        <motion.p 
        // layoutId={`${note.id.toString()}-body`} 
        className="text-md ">
          {note.body.slice(0, 80)}...
        </motion.p>
      </motion.div>
    </>
  );
};
export default NoteCard;
