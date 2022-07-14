import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return redirect("/app/notes");
};

const AppItems = () => {
  return <div>AppItems</div>;
};
export default AppItems;
