import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./EditPost.module.css";

const EditPost = ({ postId }) => {
  const [post, setPost] = useState({ title: "", content: "", tags: "" });

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`/api/posts/${postId}`);
      setPost(response.data);
    };
    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/api/posts/${postId}`, post);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="title"
        value={post.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        value={post.content}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="tags"
        value={post.tags}
        onChange={handleChange}
        required
      />
      <button type="submit">Update Post</button>
    </form>
  );
};

export default EditPost;
