import { ScrollArea } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";
import { useState } from "react";
import { getNotes, NoteType } from "~/api/notes";
import NotesList from "~/components/NotesList";

export let loader: LoaderFunction = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const notes: NoteType[] = await res.json();
  return notes;
};

const Notes = () => {
  const params = useParams();
  const [active, setActive] = useState(false);

  const matches = useMediaQuery("(max-width: 768px)", false);

  const notes = useLoaderData<NoteType[]>();
  return (
    <div className="flex">
      <ScrollArea
        className={`lg:h-[45rem] lg:pr-3`}
        type="scroll"
        scrollbarSize={4}
      >
        <div
          className={`${
            !matches && "grid lg:grid-cols-4 md:grid-cols-2 gap-3"
          }`}
        >
          <NotesList notes={notes} />
        </div>
      </ScrollArea>
      {/* <Outlet /> */}
    </div>
  );
};
export default Notes;
