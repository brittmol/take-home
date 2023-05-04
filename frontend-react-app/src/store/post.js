import { csrfFetch } from "./csrf";

// ----------------- ACTIONS ----------------------------------

const LOAD_POSTS = "posts/loadPosts";
const loadPosts = (posts) => ({
  type: LOAD_POSTS,
  posts,
});

const ADD_POST = "posts/addPost";
const addPost = (post) => ({
  type: ADD_POST,
  post,
});

const DELETE_POST = "posts/deletePost";
export const deletePost = (post) => ({
  type: DELETE_POST,
  post,
});

// ----------------- THUNKS ----------------------------------

export const getPosts = () => async (dispatch) => {
  const response = await csrfFetch("/api/posts");
  if (response.ok) {
    const posts = await response.json();
    dispatch(loadPosts(posts));
    return posts;
  }
};

export const createPost = (data) => async (dispatch) => {
  const response = await csrfFetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const post = await response.json();
    dispatch(addPost(post));
    return post;
  } else if (response.status < 500) {
    const post = await response.json();
    if (post.errors) return post.errors;
  } else {
    return ["An error occurred. Please try to create a new post again."];
  }
};

export const removePost = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${data.id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const post = await response.json();
    dispatch(deletePost(post));
  }
};

// ----------------- REDUCER ----------------------------------

export default function postReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case LOAD_POSTS:
      action.posts.forEach((post) => {
        newState[post.id] = post;
      });
      return newState;
    case ADD_POST:
      newState = { ...state, [action.post.id]: action.post };
      return newState;
    case DELETE_POST:
      newState = { ...state };
      delete newState[action.post.id];
      return newState;
    default:
      return state;
  }
}
