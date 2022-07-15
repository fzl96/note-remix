import { Link, Outlet, useOutletContext } from "@remix-run/react";
import { Note } from "@prisma/client";
import Card from "~/components/notes/Card";
import { motion } from "framer-motion";

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Notes = () => {
  const notes = useOutletContext<Note[]>();

  return (
    <>
      <motion.div
        className="lg:px-10 pt-10"
        exit={{ opacity: 0 }}
        initial="initial"
        animate="animate"
        // variants={stagger}
      >
        <Link to="/app/notes/new">Create new note</Link>
        <motion.div
          className="grid lg:grid-cols-3 grid-cols-2 lg:gap-5 gap-3"
          // variants={stagger}
        >
          {notes &&
            notes.map((note: Note, i: number) => {
              return (
                // <motion.div
                //   key={note.id}
                //   whileHover={{ scale: 1.04 }}
                //   whileTap={{ scale: 1 }}
                // >
                <Card note={note} index={i} key={note.id} />
                // </motion.div>
              );
            })}
        </motion.div>
      </motion.div>
    </>
  );
};
export default Notes;
