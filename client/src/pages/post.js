// This can be expanded to fetch and display a single post
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/posts/${id}`).then((response) => {
        setPost(response.data);
      });
    }
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Tags: {post.tags}</p>
    </div>
  );
};

export default Post;
