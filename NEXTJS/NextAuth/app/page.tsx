// "use client ";
// import { signIn, signOut, useSession } from "next-auth/react";

// export default function Home() {
//   return <RealHome />;
// }

// function RealHome() {
//   const session = useSession();
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       {session.status === "authenticated" && (
//         <button
//           onClick={() => {
//             signOut();
//           }}
//         >
//           SignOUT
//         </button>
//       )}
//       {session.status === "unauthenticated" && (
//         <button
//           onClick={() => {
//             signIn();
//           }}
//         >
//           SIGNIN
//         </button>
//       )}
//     </div>
//   );
// }
