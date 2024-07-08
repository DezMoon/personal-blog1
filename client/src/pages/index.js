import Layout from "../components/Layout";
import PostList from "../components/PostList";
import AddPost from "../components/AddPost";

export default function Home() {
  return (
    <Layout>
      <PostList />
      <AddPost />
    </Layout>
  );
}
