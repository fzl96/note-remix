import { useOutletContext, useParams } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { NoteType } from "~/api/notes";

const Awa = () => {
  const notes = useOutletContext<NoteType[]>();
  const { noteId } = useParams();
  const currentNote =
    noteId && notes.find((note) => note.id === parseInt(noteId));

  return (
    <>
      <motion.h3
        layoutId={`${noteId?.toString()}-title`}
        className="text-2xl font-semibold ml-8 max-w-[20rem]"
      >
        {currentNote && currentNote.title}
      </motion.h3>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        layoutId={noteId?.toString()}
        className="bg-gray-200 rounded-lg float-right h-[2.5rem] w-[5rem] z-[10000] px-10 pt-16"
      ></motion.div>
    </>
  );
};
export default Awa;
