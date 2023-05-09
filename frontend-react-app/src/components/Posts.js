import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, removePost } from "../store/post";
import { StarRating } from "./Assets";
import CreatePost from "./CreatePost";

export default function Posts() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.postReducer);
  const postsArr = Object.values(posts);
  const [sortPosts, setSortPosts] = useState("asc");

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="posts-container">
      <div className="post-header">
        <div className="header-btn">
          <h2>Posts</h2>
          <div>
            <CreatePost />
          </div>
        </div>
        <div>
          <select
            value={sortPosts}
            onChange={(e) => setSortPosts(e.target.value)}
          >
            <option value={"asc"}>asc</option>
            <option value={"desc"}>desc</option>
          </select>
        </div>
      </div>
      <div className="posts">
        {postsArr?.map((post) => (
          <div className="single-post" key={post?.id}>
            <div className="post-info">
              <div className="post-title">{post?.title}</div>
              <div>
                {StarRating(post?.rating)} {post?.rating}
              </div>
              <div>{post?.text}</div>
            </div>
            <div className="post-coffee">
              <div className="x"></div>
              <div>
                {post?.Coffee?.name} - {post?.Coffee?.caffeine_content} mg per
                oz
              </div>
              <button className="x" onClick={() => dispatch(removePost(post))}>
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
