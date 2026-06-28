// //Here we discussed catch all ids
// export default function Page({
//   params,
// }: {
//   params: {
//     slug: string[];
//   };
// }) {
//   return <>{JSON.stringify(params)}</>;
// }

// {
//   params: {
//     slug: string[];
//   };
// This is the real Type of params

// # Catch all [[…slug]]

// You can also use double brackets like `[[...slug]]` to make the catch-all **optional** (so it can match `/docs` as well as `/docs/anything/here`).
