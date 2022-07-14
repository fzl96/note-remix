import { Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import AppLayout from "~/components/AppLayout";
import { requireUserId } from "~/utils/auth.server";
import type { NoteType } from "~/utils/types.server";

export let loader: LoaderFunction = async ({request}) => {
  await requireUserId(request);
  const res = await fetch("https://dummyjson.com/posts");
  const notes = await res.json();
  return notes.posts;
};

const App = () => {
  const notes = useLoaderData<NoteType[]>();

  return (
    <AppLayout>
      <Outlet context={notes} />
    </AppLayout>
  );
};

export default App;
