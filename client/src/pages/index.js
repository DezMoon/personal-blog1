import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import AddPost from "../components/AddPost";
import Login from "../components/Login";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Layout>
      <PostList />
      <AddPost />
    </Layout>
  );
}
