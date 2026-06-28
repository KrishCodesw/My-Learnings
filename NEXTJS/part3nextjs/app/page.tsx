export default function Home() {
  return (
    <>
      <div className="w-screen h-screen bg-black text-white text-xl">
        <h3 className="bg-black">
          - Client side Rendering -React mai hoti hai where rendering happens on
          the client / browser Filling up/populating the dom is done on the
          client ; u get empty html with some js which gives html
          <br />
          <br />
          <br />
          <br />
          <br />
          -Server Side Rendering ; the process of creating the html which needs
          to be dumped into the dom is done on the server
          <br />
          <br />
          <br />
          <br />
          <br />
          -Whatever that can be generated in an html instantly and is same for everyone , put it in a html file and Statically serve it
        </h3>
      </div>
    </>
  );
}
