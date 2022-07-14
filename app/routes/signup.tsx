import { z } from "zod";
import FormField from "~/components/form-field";
import React, { useEffect, useRef, useState } from "react";
import { Link, useActionData } from "@remix-run/react";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { validationAction } from "~/utils/validators.server";
import { signup } from "~/utils/auth.server";
import { getUser } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) =>{
  return await getUser(request) ? redirect('/') : null
}

const schema = z.object({
  name: z.string().min(4, { message: "Name should have at least 4 letters" }),
  email: z
    .string({
      required_error: "Email is Required",
    })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

type ActionInput = z.TypeOf<typeof schema>;

export const action: ActionFunction = async ({ request }) => {
  const { formData, errors } = await validationAction<ActionInput>({
    request,
    schema,
  });

  if (errors) {
    return json({ formData, errors }, { status: 400 });
  }

  const { email, password, name } = formData;

  return await signup({
    email,
    password,
    name,
  });
};

const SignUp = () => {
  const actionData = useActionData();
  const [formError, setFormError] = useState(actionData?.error || "");
  const errors = actionData?.errors || '';
  const firstLoad = useRef(true);
  const [formData, setFormData] = useState({
    name: actionData?.formData?.name || '',
    email: actionData?.formData?.email || '',
    password: actionData?.formData?.password || '',
  });

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
        <h3 className="text-3xl font-semibold text-gray-800 mb-1">Sign Up</h3>
        <p className="text-gray-500 mb-5 text-sm">Create an account</p>
        <p className="text-red-500 w-full text-center mb-2">{formError}</p>
        <form method="post">
          <FormField
            htmlFor="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleInputChange(e, "name")}
            error={errors?.name}
          />
          <FormField
            htmlFor="email"
            placeholder="Email"
            value={formData.email}
            error={errors?.email}
            onChange={(e) => handleInputChange(e, "email")}
          />
          <FormField
            htmlFor="password"
            placeholder="Password"
            type="password"
            error={errors?.password}
            value={formData.password}
            onChange={(e) => handleInputChange(e, "password")}
          />
          <button
            type="submit"
            className="h-[3.5rem] bg-gray-800 text-white w-full rounded-2xl"
          >
            Log in
          </button>
        </form>
        <p className="mt-4 text-center text-base">
          Already have an account?
          <span className="text-gray-800 underline ml-1">
            <Link to="/login">Log in</Link>
          </span>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
