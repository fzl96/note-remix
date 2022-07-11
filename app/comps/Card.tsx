import { NoteType } from "~/api/notes";
import { motion } from "framer-motion";

interface Props {
  note: NoteType;
}

const Card = ({ note }: Props) => {
  return (
    <>
      <motion.div
        className="p-5 bg-gray-200 rounded-md"
        layoutId={note.id.toString()}
      >
        {note.title}
      </motion.div>
    </>
  );
};
export default Card;
