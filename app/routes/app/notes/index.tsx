import { useMediaQuery } from "@mantine/hooks";
import { Tabs } from "@mantine/core";
import { useState } from "react";
import { Outlet, useOutletContext } from "@remix-run/react";
import ListAllNotes from "~/components/ListAllNotes";
import type { NoteType } from "~/utils/types.server";

const Notes = () => {
  const notes = useOutletContext<NoteType[]>();
  const [activeTab, setActiveTab] = useState(1);
  // const matches = useMediaQuery("(max-width: 768px)", false);

  return (
    <div>
      <Tabs
        className="z-[-2]"
        active={activeTab}
        onTabChange={setActiveTab}
      >
        <Tabs.Tab label="Home"></Tabs.Tab>
        <Tabs.Tab label="All Notes">
          <ListAllNotes notes={notes}>
            <Outlet context={notes} />
          </ListAllNotes>
        </Tabs.Tab>
        <Tabs.Tab label="Folders">Third tab content</Tabs.Tab>
      </Tabs>
    </div>
  );
};
export default Notes;
