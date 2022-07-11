import { ScrollArea, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";
import { useRef, useState } from "react";
import { getNotes, NoteType } from "~/api/notes";
import NotesList from "~/components/NotesList";
import { Tabs } from "@mantine/core";

export let loader: LoaderFunction = async () => {
  const res = await fetch("https://dummyjson.com/posts");
  const notes = await res.json();
  console.log({
    msg: 'Test'
  });
  return notes.posts;
};

const Notes = () => {
  const params = useParams();
  const [active, setActive] = useState(false);
  const noteCardRef = useRef();

  const matches = useMediaQuery("(max-width: 768px)", false);

  const notes = useLoaderData<NoteType[]>();

  return (
    <div>
      {/* <h3 className="text-xl lg:text-3xl font-medium lg:mb-5 lg:mt-4">
        My Notes
      </h3> */}
      <Tabs variant="pills" className="z-[-2]">
        <Tabs.Tab label="Home">
          <div className="flex flex-col">
            {/* <div>Search</div> */}
            {/* <div className="font-encode">Add new note</div> */}
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
