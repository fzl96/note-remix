import { useMediaQuery } from "@mantine/hooks";
import { Tabs } from "@mantine/core";
import AllNotes from "~/components/Notes.All";
import { useState } from "react";
import { useOutletContext } from "@remix-run/react";
import { NoteType } from "~/api/notes";
import NotesList from "~/components/NotesList";
import ListAllNotes from "~/comps/ListAllNotes";

const Notes = () => {
  const notes = useOutletContext<NoteType[]>();
  const [activeTab, setActiveTab] = useState(1);
  // const matches = useMediaQuery("(max-width: 768px)", false);

  return (
    <div>
      <Tabs className="z-[-2]" active={activeTab} onTabChange={setActiveTab}>
        <Tabs.Tab label="Home"></Tabs.Tab>
        <Tabs.Tab label="All Notes">
          <ListAllNotes notes={notes}/>
          {/* <AllNotes /> */}
        </Tabs.Tab>
        <Tabs.Tab label="Folders">Third tab content</Tabs.Tab>
      </Tabs>
    </div>
  );
};
export default Notes;
