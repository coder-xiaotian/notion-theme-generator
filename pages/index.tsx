import NotionPage from "../components/NotionPage";
import {GetStaticProps} from "next/types";
import notion from "../lib/api";

export const getStaticProps: GetStaticProps<any, { pageId: string }> = async (context) => {
  const recordMap = await notion.getPage("NotionBlog-34d4bbd70a354cf488751b49bc75c68e")
  return {
    props: {
      recordMap
    },
    revalidate: 10
  }
}

const Home = (props) => {
  return <NotionPage recordMap={props.recordMap} />
}

export default Home
