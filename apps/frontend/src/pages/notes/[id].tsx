import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { SingleNote } from "../../notes";

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const noteId = String(id);

  return noteId ? <SingleNote id={noteId} key={noteId} /> : null;
};

export default Home;
