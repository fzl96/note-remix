import { useMediaQuery } from "@mantine/hooks";
import { Tabs } from "@mantine/core";
import AllNotes from "~/components/Notes.All";
import { useState } from "react";

const Notes = () => {
  const [activeTab, setActiveTab] = useState(1);
  const matches = useMediaQuery("(max-width: 768px)", false);

  return (
    <div>
      <Tabs
        variant="pills"
        className="z-[-2]"
        active={activeTab}
        onTabChange={setActiveTab}
      >
        <Tabs.Tab label="Home"></Tabs.Tab>
        <Tabs.Tab label="All Notes">
          <AllNotes />
        </Tabs.Tab>
        <Tabs.Tab label="Folders">Third tab content</Tabs.Tab>
      </Tabs>
    </div>
  );
};
export default Notes;
