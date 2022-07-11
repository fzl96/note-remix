import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { NoteType } from "~/api/notes";
import AppLayout from "~/components/AppLayout";

export let loader: LoaderFunction = async () => {
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
