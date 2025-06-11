// "use client";

// import axios from "axios";
// import { useEffect, useState } from "react";

// const User = () => {
//   const [loading, setloading] = useState(true);
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     axios
//       .get(
//         "https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details"
//       )
//       .then((response) => {
//         setData(response.data);
//         setloading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading....</div>;
//   }

//   return (
//     <div>
//       User Page
//       <br></br>
//       <br></br>
//       <br></br>
//       {data.name}
//       <br></br>
//       <br></br>
//       {data.email}
//     </div>
//   );
// };

//
import axios from "axios";

export default async function User() {
  const response = await axios.get("http://localhost:3000/api/v1/user");
  //   await new Promise((r) => setTimeout(r, 5000));
  const data = response.data;

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>Name: {data?.name}</div>

          {data?.email}
        </div>
      </div>
    </div>
  );
}
