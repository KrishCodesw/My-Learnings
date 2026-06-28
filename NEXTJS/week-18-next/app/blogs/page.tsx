import axios from "axios";

async function getblogs() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos/"
  );
  return response.data;
}

export default async function Blogs() {
  const blogs = await getblogs();

  return (
    <>
      <div>
        {blogs.map((blog: ITodo, idx: any) => (
          <Todo key={idx} title={blog.title} completed={blog.completed} />
        ))}
      </div>
    </>
  );
}

interface ITodo {
  title: string;
  completed: boolean;
}

function Todo({ title, completed }: ITodo) {
  return (
    <>
      <div>
        {title}
        {completed ? "done!" : "Not Done!"}
      </div>
    </>
  );
}
