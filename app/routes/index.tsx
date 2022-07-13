import { requireUserId } from "~/utils/auth.server";
import { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const loader: LoaderFunction = async ({request}) => {
  await requireUserId(request)
  return null;
}

export default function Index() {
  return (
    <div>
      <h1 className="font-bold text-3xl">Welcome to Remix</h1>
    </div>
  );
}
