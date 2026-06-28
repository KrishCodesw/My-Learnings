export const dynamic = "force-dynamic";

import { prisma } from "db/client";

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });

export default async function Home() {
  const user = await prisma.user.findMany();

  return <div>{JSON.stringify(user)}</div>;
}
