// import React from "react";
import type { NextPage } from "next";
// import { useRouter } from "next/router";
// import { SingleNote } from "../../notes";
import dynamic from "next/dynamic";

const Editor = dynamic(
  async () => await (await import("../../components/MultiEditor")).MultiEditor,
  {
    ssr: false,
  }
);

const Home: NextPage = () => {
  // const router = useRouter()
  // const { id } = router.query;
  // const noteId = String(id);
  // return noteId ? <SingleNote id={noteId} key={noteId} /> : null;
  return <Editor />;
};

export default Home;
