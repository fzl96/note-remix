import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { requireUserId } from "~/utils/auth.server";
import { prisma } from "~/utils/prisma.server";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");
  if (typeof title !== "string" || typeof body !== "string") return null;

  const note = await prisma.note.create({
    data: {
      title: title,
      body: body,
      userId: userId
    },
  });

  return redirect('/app/notes');
};


const New = () => {
  return (
    <div>
      <form method="post">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" />
        <label htmlFor="body">Body</label>
        <input type="text" name="body" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default New;
