import { requireUserId } from "~/utils/auth.server";
import { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUser } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({request}) => {
  return await getUser(request)  ? redirect('/app/notes') : null
}

export default function Index() {
  return (
    <div>
      <h1 className="font-bold text-3xl">Welcome to Remix</h1>
    </div>
  );
}
