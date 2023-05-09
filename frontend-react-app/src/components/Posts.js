import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, removePost } from "../store/post";
import { StarRating } from "./Assets";
import CreatePost from "./CreatePost";

export default function Posts() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.postReducer);
  const postsArr = Object.values(posts)
  const [sortPosts, setSortPosts] = useState('asc')

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="posts">
      <div>
        <h2>Posts</h2>
        <CreatePost />
        <select value={sortPosts} onChange={(e) => setSortPosts(e.target.value)}>
          <option value={'asc'}>asc</option>
          <option value={'desc'}>desc</option>
        </select>
      </div>
      <div>
        {postsArr?.map((post) => (
          <div key={post?.id}>
            <div>{post?.title}</div>
            <div>
              {StarRating(post?.rating)} {post?.rating}
            </div>
            <div>{post?.text}</div>
            <div>{post?.Coffee?.name}</div>
            <button onClick={() => dispatch(removePost(post))}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}
