import { motion } from "framer-motion";
import { useMantineColorScheme } from "@mantine/core";
import type { Note } from "@prisma/client";
// import { AiOutlineCalendar } from 'react-icons/ai'

interface Props {
  note: Note;
}

const Card = ({ note }: Props) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.9 }}
        className={`${dark ? "bg-grayishDark2" : "bg-white"} p-5  rounded-lg shadow-sm w-full`}
        layoutId={note.id.toString()}
      >
        <div>
          <motion.h3 className="text-xl font-semibold text-[#000f36]">
            {note.title}
          </motion.h3>
          <motion.p className="text-sm">{note.body.slice(0, 50)}...</motion.p>
        </div>
        <div>
          <div className="flex">
            {/* <AiOutlineCalendar /> */}
            <p>{note.updatedAt}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default Card;
