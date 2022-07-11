import { ScrollArea } from "@mantine/core";
import { useOutletContext, useParams } from "@remix-run/react";
import { NoteType } from "~/api/notes";
import { Aside, MediaQuery } from "@mantine/core";
import NotesList from "./NotesList";
import { motion } from "framer-motion";

const AllNotes = () => {
  const notes = useOutletContext<NoteType[]>();
  return (
    <div className="flex flex-col p">
      <div className="flex">
        <div>
          <ScrollArea type="scroll" scrollbarSize={4}>
            <motion.div
              // initial={{ opacity: 0.3 }}
              // animate={{ opacity: 1 }}
              // exit={{ opacity: 1 }}
              className={`w-full lg:h-[40rem] lg:pr-3 transition-all ease duration-100 p-3`}
            >
              <NotesList notes={notes} />
            </motion.div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
export default AllNotes;
