import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, removePost } from "../store/post";

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);
  const postsArr = Object.values(posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <h2>List of Posts</h2>
      <div>
        {postsArr?.map((post) => (
          <div key={post?.id}>
            <div>{post?.title}</div>
            <div>{post?.rating}</div>
            <div>{post?.text}</div>
            <div>{post?.Coffee?.name || 'N/A   '}</div>
            <button onClick={() => dispatch(removePost(post))}>X</button>
          </div>
        ))}
      </div>
    </>
  );
}
