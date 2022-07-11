import { LoaderFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";

const Awa = () => {
  const { noteId } = useParams();
  console.log(`${noteId?.toString()}-title`);

  return (
    <>
      <motion.h3
        layoutId={`${noteId?.toString()}-title`}
        className="text-2xl font-semibold ml-8 max-w-[20rem]"
      >
        dolorem dolore est ipsam
      </motion.h3>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        layoutId={noteId?.toString()}
        // transition={{ duration: 0.15 }}
        className="bg-gray-200 rounded-lg float-right h-[2.5rem] w-[5rem] z-[10000] px-10 pt-16"
      ></motion.div>
    </>
  );
};
export default Awa;
