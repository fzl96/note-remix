import { useMediaQuery } from "@mantine/hooks";
import { Tabs } from "@mantine/core";
import { useMemo, useState } from "react";
import { Link, Outlet, useOutletContext } from "@remix-run/react";
import ListAllNotes from "~/components/ListAllNotes";
import { Note } from "@prisma/client";
import Card from "~/components/notes/Card";

const Notes = () => {
  const notes = useOutletContext<Note[]>();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="lg:px-10 pt-10">
      {/* <Tabs className="z-[-2]" active={activeTab} onTabChange={setActiveTab}>
        <Link to="/app/notes/new">New</Link>
        <Tabs.Tab label="Home"> */}
          <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-5 gap-3">
            {notes && notes.map((note: Note) => {
              return (
                // <div
                //   key={note.id}
                //   className="w-[10rem] h-[10rem] flex flex-col rounded-2xl justify-center items-center bg-white"
                // >
                  // {note.title}
                  <Card note={note} key={note.id} />
                // </div>
              );
            })}
          </div>
        {/* </Tabs.Tab>
        <Tabs.Tab label="All Notes">
          <ListAllNotes notes={notes}>
            <Outlet context={notes} />
          </ListAllNotes>
        </Tabs.Tab>
        <Tabs.Tab label="Folders">Third tab content</Tabs.Tab>
      </Tabs> */}
    </div>
  );
};
export default Notes;
