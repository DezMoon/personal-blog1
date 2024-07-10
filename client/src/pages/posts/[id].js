import { useRouter } from "next/router";
import Head from "next/head";
import PostView from "../../components/PostView";
import axios from "axios";

const PostPage = ({ post }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title} | Personal Blog</title>
        <meta name="description" content={post.content.substring(0, 150)} />
        <meta name="keywords" content={post.tags} />
      </Head>
      <main>
        <PostView post={post} />
      </main>
    </>
  );
};

export async function getStaticPaths() {
  const response = await axios.get("/api/posts");
  const paths = response.data.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const response = await axios.get(`/api/posts/${params.id}`);
  return {
    props: { post: response.data },
  };
}

export default PostPage;
