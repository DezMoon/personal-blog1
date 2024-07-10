import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./PostList.module.css";

const PostList = ({ tag }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/api/posts", { params: { tag } });
      setPosts(response.data);
    };

    fetchPosts();
  }, [tag]);

  return (
    <div className={styles.postList}>
      {posts.map((post) => (
        <div key={post.id} className={styles.post}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>Tags: {post.tags}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
