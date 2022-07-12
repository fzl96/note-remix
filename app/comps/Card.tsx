import { NoteType } from "~/api/notes";
import { motion } from "framer-motion";

interface Props {
  note: NoteType;
}

const Card = ({ note }: Props) => {
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.9 }}
        className="p-5 bg-grayish rounded-md"
        layoutId={note.id.toString()}
      >
        <motion.h3>{note.title}</motion.h3>
        <motion.p>{note.body.slice(0, 75)}</motion.p>
      </motion.div>
    </>
  );
};
export default Card;
