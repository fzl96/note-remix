import { json, createCookieSessionStorage, redirect } from "@remix-run/node";
import { prisma } from "./prisma.server";
import { createUser } from "./users.server";
import bcrypt from 'bcryptjs';
import type { SignupForm, LoginForm} from "./types.server";

const secret = process.env.SESSION_SECRET
if (!secret) {
  throw new Error("Session secret is not set")
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'app-session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [secret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
})

export const signup = async (form: SignupForm) => {
  const exists = await prisma.user.count({ where: {email: form.email}});

  if (exists) {
    return json({ 
      error: `Email already exists`,
      formData: {
        name: form.name,
        email: form.email,
        password: form.password
      }
    },
      { status: 400 }
    )
  }

  const newUser = await createUser(form);

  if (!newUser) {
    return json(
      { 
        error: 'Something went wrong when trying to create new user',
        fields: { email: form.email, password: form.password },
      }, 
      {
        status: 400
      }
    )
  }

  return createUserSession(newUser.id, '/');
}

export const login = async (form: LoginForm) => {
  const user = await prisma.user.findUnique({
    where: {
      email: form.email
    }
  })

  if (!user || !(await bcrypt.compare(form.password, user.password))) {
    return json({ 
      error: "Invalid Credentials",
      formData: {
        email: form.email,
        password: form.password
      }
    }, 
    { 
      status: 400 
    });
  }

  return createUserSession(user.id, '/');

}

export const createUserSession = async (userId: string, redirectTo: string) => {
  const session = await storage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'set-cookie': await storage.commitSession(session)
    }
  })
}

export const requireUserId =  async (
  request: Request, 
  redirectTo: string = new URL(request.url).pathname
) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");

  if(!userId || typeof userId !== 'string') {
    throw redirect(`/login`)
  }
  return userId;
}

const getUserSession =(request: Request) => {
  return storage.getSession(request.headers.get('Cookie'));
}

const getUserId = async (request: Request) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== 'string') return null;
  return userId
}

export const getUser = async (request: Request) => {
  const userId = await getUserId(request);
  if (typeof userId !== 'string') return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true }
    });
    return user
  } catch (e) {
    throw logout(request)
  }
}

export const logout = async (request: Request) => {
  const session = await getUserSession(request);
  return redirect('/login', {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    }
  })
}