import { ScrollArea, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useOutletContext, useParams } from "@remix-run/react";
import NotesList from "~/components/NotesList";
import { Tabs } from "@mantine/core";
import { NoteType } from "~/api/notes";

const Notes = () => {
  const notes = useOutletContext<NoteType[]>();
  const params = useParams();
  const matches = useMediaQuery("(max-width: 768px)", false);

  return (
    <div>
      <Tabs variant="pills" className="z-[-2]">
        <Tabs.Tab label="Home">
          <div className="flex flex-col">
            <div className="flex">
              {/* <ScrollArea type="scroll" scrollbarSize={4}> */}
              <div
                className={`grid gap-3 w-full lg:h-[30rem] lg:pr-3 transition-all ease duration-100 ${
                  !params.noteId
                    ? "lg:grid-cols-3 md:grid-cols-2 grid-cols-2"
                    : "w-[25rem]"
                }`}
              >
                <NotesList notes={notes} />
              </div>
              {/* </ScrollArea> */}
            </div>
          </div>
        </Tabs.Tab>
        <Tabs.Tab label="All Notes">Second tab content</Tabs.Tab>
        <Tabs.Tab label="Folders">Third tab content</Tabs.Tab>
      </Tabs>
    </div>
  );
};
export default Notes;
