import { ScrollArea, useMantineColorScheme } from "@mantine/core";
import { Link, useParams } from "@remix-run/react";
import { useState } from "react";
import React from "react";
import Card from "./Card";
import { Note } from '@prisma/client'
interface Props {
  notes: Note[];
  children: React.ReactNode;
}

const ListAllNotes = ({ children, notes }: Props) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const params = useParams();

  return (
    <>
      <div className="h-[7rem] hidden lg:block" />
      <div className="flex gap-3 items-center justify-center">
        <div
          className={`${
            dark ? "bg-grayishDark" : "bg-white"
          } p-2 bg-white rounded-2xl lg:w-96 flex flex-col gap-3 lg:h-[38rem] shadow-sm`}
        >
          <div
            className={`${
              dark ? "bg-grayishDark2" : "bg-grayish"
            } px-4 py-4 rounded-[0.7rem]`}
          >
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
        <div
          className={`${
            dark ? "bg-grayishDark" : "bg-white"
          } p-2 w-full rounded-2xl flex flex-col gap-3 lg:h-[38rem] shadow-sm hidden lg:block`}
        >
          {!params.noteId ? (
            <div className="flex flex-col justify-center items-center w-full h-full gap-7">
              <img src="/bg.svg" alt="" className="h-[15rem]" />
            </div>
          ) : (
            <>{children}</>
          )}
        </div>
      </div>
    </>
  );
};
export default ListAllNotes;
