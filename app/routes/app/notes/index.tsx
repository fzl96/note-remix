import { useMediaQuery } from "@mantine/hooks";
import { Tabs } from "@mantine/core";
import { useMemo, useState } from "react";
import {
  Link,
  useOutletContext,
} from "@remix-run/react";
import ListAllNotes from "~/components/ListAllNotes";
import { Note } from "@prisma/client";

const Notes = () => {
  const notes = useOutletContext<Note[]>();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <Tabs className="z-[-2]" active={activeTab} onTabChange={setActiveTab}>
        <Link to='/app/notes/new'>
          New
        </Link>
        <Tabs.Tab label="Home">
          <div className="grid grid-cols-5">
          {notes.map((note: Note) => {
            return (
              <div key={note.id} className="w-[10rem] h-[10rem] flex flex-col rounded-2xl justify-center items-center bg-white">
                {note.title}
              </div>
            )
          })}
                    </div>
        </Tabs.Tab>
        <Tabs.Tab label="All Notes">
          {/* <ListAllNotes notes={notes}>
            <Outlet context={notes} />
          </ListAllNotes> */}
        </Tabs.Tab>
        <Tabs.Tab label="Folders">Third tab content</Tabs.Tab>
      </Tabs>
    </div>
  );
};
export default Notes;
