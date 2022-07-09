import { ScrollArea } from "@mantine/core";
import { Link, useParams } from "@remix-run/react";
import { NoteType } from "~/api/notes";
import NoteCard from "./NoteCard";

interface Props {
  notes: NoteType[];
}

const NotesList = ({ notes }: Props) => {
  const params = useParams();
  return (
    <>
      {notes.map((note) => {
        return (
          <div key={note.id} className="mb-4">
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
