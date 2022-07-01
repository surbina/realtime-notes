import Router from "next/router";
import type { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useHocuspocus } from "../../useHocuspocus";
import { Editor } from "../../editor";
import { firestore } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { instance } = useHocuspocus({ name: id as string });

  return <Editor instance={instance} />;
};

export async function getServerSideProps({
  res,
  query: { id },
}: NextPageContext) {
  const docRef = doc(firestore, "documents", id as string);
  const docSnap = await getDoc(docRef);

  // If the document does not exist we navigate away from this page
  if (!docSnap.exists()) {
    if (res) {
      res.writeHead(302, {
        Location: "http://localhost:3000",
      });

      res.end();
    } else {
      Router.replace("/");
    }
  }

  return {
    props: {},
  };
}

export default Home;
