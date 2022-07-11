import { ScrollArea } from "@mantine/core";
import { Link, useParams } from "@remix-run/react";
import { useRef, useState } from "react";
import { NoteType } from "~/api/notes";
import NoteCard from "./NoteCard";

interface Props {
  notes: NoteType[];
}

const NotesList = ({ notes }: Props) => {
  return (
    <>
      {notes.map((note, index) => {
        return (
          <div key={index} className="mb-4">
            <Link to={`/app/notes/${note.id}`}>
              <NoteCard note={note} />
            </Link>
          </div>
        );
      })}
    </>
  );
};
export default NotesList;
