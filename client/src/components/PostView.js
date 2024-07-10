import ReactMarkdown from "react-markdown";

const PostView = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <ReactMarkdown>{post.content}</ReactMarkdown>
      <p>Tags: {post.tags}</p>
    </div>
  );
};

export default PostView;
