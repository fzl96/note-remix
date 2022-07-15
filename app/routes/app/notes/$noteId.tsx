import { ScrollArea, useMantineTheme } from "@mantine/core";
import { useOutletContext, useParams } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { NoteType } from "~/utils/types.server";
import type { Note } from "@prisma/client";

const Awa = () => {
  const notes = useOutletContext<Note[]>();
  const { noteId } = useParams();
  const currentNote: Note | undefined = notes.find(
    (note) => note.id === noteId
  );

  return (
    <>
      <motion.div
        className="bg-white h-full rounded-xl"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p>{currentNote?.title}</p>
      </motion.div>
    </>
  );
};
export default Awa;
