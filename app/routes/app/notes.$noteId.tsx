import { useMantineTheme } from "@mantine/core";
import { useOutletContext, useParams } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { NoteType } from "~/api/notes";

const Awa = () => {
  const theme = useMantineTheme();
  const notes = useOutletContext<NoteType[]>();
  const { noteId } = useParams();
  const currentNote =
    noteId && notes.find((note) => note.id === parseInt(noteId));

  return (
    <>
      <motion.div
        className="bg-gray-500 rounded-xl w-full h-full"
        layoutId={noteId}
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 1 }}
      >
        {/* <motion.h3
          // layoutId={`${noteId}-title`}
          className="text-2xl font-semibold ml-8 max-w-[25rem]"
        >
          {currentNote && currentNote.title}
        </motion.h3> */}
        {/* <motion.div
            // layoutId={noteId?.toString()}
            className={` ${
              theme.colorScheme === "dark" ? "bg-[#ee6969]" : "bg-[#fdaaaa]"
            }
         rounded-lg lg:float-right md:float-right lg:h-[2.5rem] lg:w-[5rem] z-[10000] px-10 pt-16`}
          >
          </motion.div> */}
        {/* <motion.p 
          // layoutId={`${noteId}-body`} 
          className="max-w-[50rem] p-10">
            {currentNote && currentNote.body}
          </motion.p> */}
      </motion.div>
    </>
  );
};
export default Awa;
