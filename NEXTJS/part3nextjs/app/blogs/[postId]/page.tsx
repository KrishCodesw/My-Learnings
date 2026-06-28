import axios from "axios";
export default async function Blogpage({ params }: any) {
  const postId = (await params).postId; //Params are a promise so we await it
  console.log(postId);
  //Here we discussed dynamic routes

  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const data = response.data;
  return (
    <>
      <div className="">Blog {postId}</div>
      <br></br>
      <div className="">Title {data.title}</div>
      <div className="">body {data.body} Pata nahi yaar</div>
    </>
  );
}
