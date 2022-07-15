import { AnimatePresence, motion } from "framer-motion";
import { Divider, useMantineColorScheme } from "@mantine/core";
import type { Note } from "@prisma/client";
// import { AiOutlineCalendar } from "react-icons/ai";
// import { TiStarOutline } from "react-icons/ti";
import { format } from "date-fns";
import { Menu } from "@mantine/core";
import { Link } from "react-router-dom";

interface Props {
  note: Note;
  index: number;
}

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const Card = ({ note, index }: Props) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const noteMenuItem = ["Edit", "Pin", "Delete"];

  return (
    <>
      <motion.div
        variants={fadeInUp}
        className={`${
          dark ? "bg-grayishDark" : "bg-white"
        } p-5 rounded-lg shadow-sm lg:h-full`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-end gap-2 pb-2 text-slate-400">
            {/* <TiStarOutline /> */}
            <Menu className={`rounded-2xl ${dark ? "bg-grayishDark" : ""}`}>
              {noteMenuItem.map((item: string, index: number) => {
                return (
                  <Menu.Item
                    className={`${
                      dark ? "hover:bg-grayishDark2" : "hover:bg-grayish"
                    }`}
                    key={index}
                  >
                    {item}
                  </Menu.Item>
                );
              })}
            </Menu>
          </div>
          <div className="flex flex-col justify-between h-full">
            <Link to={`/app/notes/${note.id}`}>
              <div>
                <motion.h3
                  className={`lg:text-lg text-sm font-semibold ${
                    dark ? "" : "text-[#000f36]"
                  }`}
                >
                  {note.title}
                </motion.h3>
                <motion.p className="lg:text-sm text-xs">
                  {note.body.slice(0, 50)}...
                </motion.p>
              </div>
            </Link>
            <div className="h-5" />
            <div>
              <div className="flex items-center gap-3">
                {/* <AiOutlineCalendar /> */}
                <p className="uppercase text-sm">
                  {format(new Date(note.updatedAt), "MMM dd")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default Card;
