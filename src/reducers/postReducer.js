import {
  ADD_POST,
  DELETE_POST,
  FIND_UPDATE,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  UPDATE_POST,
} from "../contexts/constants";

export const postReducer = (state, { type, payload }) => {
  switch (type) {
    case POSTS_LOADED_SUCCESS: {
      return { ...state, posts: payload, postsLoading: false };
    }

    case POSTS_LOADED_FAIL: {
      return { ...state, posts: [], postsLoading: false };
    }

    case ADD_POST: {
      return { ...state, posts: [...state.posts, payload] };
    }

    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    }

    case FIND_UPDATE: {
      return { ...state, post: payload };
    }

    case UPDATE_POST: {
      const newPosts = state.posts.map((post) =>
        post._id === payload._id ? payload : post
      );
      console.log(newPosts)
      return { ...state, posts: newPosts };
    }

    default:
      return state;
  }
};
