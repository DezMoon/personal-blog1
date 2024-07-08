import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./PostList.module.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/api/posts");
      setPosts(response.data);
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.postList}>
      {posts.map((post) => (
        <div key={post.id} className={styles.post}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p className={styles.tags}>Tags: {post.tags}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
