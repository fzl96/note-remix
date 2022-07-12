import { ScrollArea } from "@mantine/core";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { NoteType } from "~/api/notes";
import React from "react";
import Card from "./Card";

interface Props {
  notes: NoteType[];
  children: React.ReactNode;
}

const ListAllNotes = ({ children, notes }: Props) => {
  return (
    <>
      <div className="h-[7rem]" />
      <div className="flex gap-3">
        <div className="p-2 bg-white rounded-2xl w-96 flex flex-col gap-3 lg:h-[38rem] shadow-sm">
          <div className="px-4 py-4 bg-grayish rounded-[0.7rem]">
            Search bar
          </div>
          <ScrollArea type="scroll" scrollbarSize={4}>
            <div className={`px-3 py-1`}>
              <div className={`columns-1 gap-4`}>
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
        <div className="p-2 bg-white w-full rounded-2xl flex flex-col gap-3 lg:h-[38rem] shadow-sm lg:block">
          {children}
        </div>
      </div>
    </>
  );
};
export default ListAllNotes;
