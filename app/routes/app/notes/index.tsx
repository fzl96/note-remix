import { useMediaQuery } from "@mantine/hooks";
import { Tabs } from "@mantine/core";
import { useMemo, useState } from "react";
import {
  Form,
  Outlet,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import ListAllNotes from "~/components/ListAllNotes";
import type { NoteType } from "~/utils/types.server";
import { Note } from "@prisma/client";

const Notes = () => {
  const notes = useOutletContext<NoteType[]>();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <Tabs className="z-[-2]" active={activeTab} onTabChange={setActiveTab}>
        <Tabs.Tab label="Home">
        </Tabs.Tab>
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
