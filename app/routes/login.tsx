import FormField from "~/components/form-field";
import React, { useEffect, useState, useRef } from "react";
import { Link, useActionData } from "@remix-run/react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { login } from "~/utils/auth.server";
import { getUser } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return (await getUser(request)) ? redirect("/") : null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return json({ error: "invalid form type" });
  }

  return login({ email, password });
};

const Login = () => {
  const actionData = useActionData();
  const [formError, setFormError] = useState(actionData?.error || "");
  const errors = actionData?.errors || "";
  const [formData, setFormData] = useState({
    email: actionData?.formData?.email || "",
    password: actionData?.formData?.password || "",
  });
  const firstLoad = useRef(true);

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError("");
    }
  }, [formData]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({
      ...form,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-grayish">
      <div className="bg-white lg:w-96 shadow-md flex sm:mx-4 flex-col p-10 rounded-2xl mx-3">
        <h3 className="text-3xl font-semibold text-gray-800 mb-1">Log in</h3>
        <p className="text-gray-500 mb-5 text-sm">Log in to continue to app</p>
        <p className="text-red-500 w-full text-center mb-2">{formError}</p>
        <form method="post">
          <FormField
            htmlFor="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, "email")}
            error={errors?.email}
          />
          <FormField
            htmlFor="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange(e, "password")}
            error={errors?.password}
          />
          <button
            type="submit"
            className="h-[3.5rem] bg-gray-800 text-white w-full rounded-2xl"
          >
            Log in
          </button>
        </form>
        <p className="mt-4 text-center text-base">
          Don't have an account yet?{" "}
          <span className="text-gray-800 underline ml-1">
            <Link to="/signup">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};
export default Login;
