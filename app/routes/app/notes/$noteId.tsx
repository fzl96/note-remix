import { useParams, Form } from "@remix-run/react";
import { LoaderFunction, json, ActionFunction } from "@remix-run/node";
import { Aside, useMantineTheme, ScrollArea, MediaQuery } from "@mantine/core";

export const loader: LoaderFunction = () => {
  return json([
    { id: "1", name: "Pants" },
    { id: "2", name: "Jacket" },
  ]);
};

export let action: ActionFunction = async ({ request }) => {
  console.log(123);
  return { ok: true };
};

const NoteId = () => {
  const theme = useMantineTheme();

  return (
    <>
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 700 }} className='top-0'>
          <p>Application sidebar</p>
        </Aside>
      </MediaQuery>
    </>
  );
};
export default NoteId;
