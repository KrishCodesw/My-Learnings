import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="text-3xl w-screen h-screen bg-black text-white flex gap-4 justify-center items-center">
        Todo
        <div className="bg-white rounded-2xl text-black ">
          <Link href="/signin">Signin</Link>
        </div>
        <div className="bg-white rounded-2xl text-black ">
          <Link href="/signup">Signup</Link>
        </div>
      </div>
    </>
  );
}
