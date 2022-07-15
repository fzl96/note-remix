import { Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import AppLayout from "~/components/AppLayout";
import { requireUserId } from "~/utils/auth.server";
import type { NoteType } from "~/utils/types.server";
import { prisma } from "~/utils/prisma.server";
import { Note } from "@prisma/client";

export let loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  // const notes = await prisma.user.findUnique({
  //   where: {
  //     id: userId,
  //   },
  //   select: {
  //     notes: true,
  //   },
  // });
  const notes = await prisma.note.findMany({
    where: {
      userId
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })

  return notes;
};

const App = () => {
  const notes = useLoaderData();

  return (
    <AppLayout>
      <Outlet context={notes} />
    </AppLayout>
  );
};

export default App;
