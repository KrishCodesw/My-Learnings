import { client } from "@repo/db/client";

export default async function Home() {
  const user1 = await client.user.findFirst();
  return (
    <div>
      {user1?.id}
      {user1?.username}
      Aur lodo , nahi lagegi tumhari job
    </div>
  );
}
``;
