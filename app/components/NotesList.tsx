import { ScrollArea } from "@mantine/core";
import { Link, useParams } from "@remix-run/react";
import { useRef, useState } from "react";
import { NoteType } from "~/api/notes";
import NoteCard from "./NoteCard";
import Masonry from "react-masonry-css";
interface Props {
  notes: NoteType[];
}

const NotesList = ({ notes }: Props) => {
  const breakpoints = {
    default: 3,
    1024: 2
  }
  return (
    <>
      <Masonry 
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note, index) => {
          return (
            <div key={index} className="mb-4">
              <Link to={`/app/notes/${note.id}`}>
                <NoteCard note={note} />
              </Link>
            </div>
          );
        })}
      </Masonry>
    </>
  );
};
export default NotesList;
