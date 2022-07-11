import { ScrollArea } from "@mantine/core";
import { Link, useLoaderData } from "@remix-run/react";
import Masonry from "react-masonry-css";
import { NoteType } from "~/api/notes";
import Card from "./Card";

interface Props {
  notes: NoteType[];
}

const ListAllNotes = ({ notes }: Props) => {
  const breakpoints = {
    default: 4,
    1024: 2,
  };

  return (
    <>
      <div className="flex flex-col p">
        <div className="flex">
          <div>
            <ScrollArea type="scroll" scrollbarSize={4}>
              <div
                className={`w-full lg:h-[40rem] lg:pr-3 transition-all ease duration-100 p-3`}
              >
                <div className="columns-2 lg:columns-3 gap-4">
                  {notes.map((note, index) => {
                    return (
                      <div key={index} className="mb-4 break-inside-avoid">
                        <Link to={`/app/notes/${note.id}`}>
                          <Card note={note} />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListAllNotes;
