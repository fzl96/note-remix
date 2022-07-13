import { prisma } from "./prisma.server";
import { SignupForm } from "./types.server";
import bcrypt from 'bcryptjs';

export const createUser = async (user: SignupForm) => {
  const passwordHash = await bcrypt.hash(user.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: passwordHash,
      name: user.name
    }
  })

  return {id: newUser.id, email: newUser.email };
}