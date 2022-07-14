import { ScrollArea, useMantineTheme } from "@mantine/core";
import { useOutletContext, useParams } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { NoteType } from "~/utils/types.server";

const Awa = () => {
  const notes = useOutletContext<NoteType[]>();
  const { noteId } = useParams();
  const currentNote = noteId && notes && notes.find((note) => note.id === parseInt(noteId));

  return (
    <>
      <ScrollArea type="scroll" scrollbarSize={4}>
        <div className={`px-3 py-1 h-[36rem] flex flex-col`}>
          <motion.h3 className="text-2xl font-semibold">
            {currentNote && currentNote.title}
          </motion.h3>
          <div className="h-5"></div>
          <motion.p>{currentNote && currentNote.body}</motion.p>
        </div>
      </ScrollArea>
    </>
  );
};
export default Awa;
