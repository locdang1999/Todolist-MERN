import { createContext, useReducer, useState } from "react";
import axios from "axios";
import { postReducer } from "../reducers/postReducer";
import {
  ADD_POST,
  apiUrl,
  DELETE_POST,
  FIND_UPDATE,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  UPDATE_POST,
} from "./constants";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  //state

  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postsLoading: true,
  });

  const [showAddPostModel, setShowAddPostModel] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal ] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null,
  });

  //Get all posts
  const getPosts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/posts`);
      if (res.data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: res.data.posts });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  //add post
  const addPost = async (newPost) => {
    try {
      const res = await axios.post(`${apiUrl}/posts`, newPost);
      if (res.data.success) {
        dispatch({ type: ADD_POST, payload: res.data.post });
        return res.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error!" };
    }
  };


  //Update Post
  const updatePost = async (updatePost) => {
    try {
      const res = await axios.put(`${apiUrl}/posts/${updatePost._id}`, updatePost);
      if(res.data.success){
        dispatch({ type: UPDATE_POST, payload: res.data.post})
        return res.data
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error!" };
    }
  }

  //find post when user is updating post
  const findPost = (postId) =>{
    const post = postState.posts.find(post=>post._id === postId);
    dispatch({ type: FIND_UPDATE, payload: post });
  }


  //Delete post
  const deletePost = async (postId) =>{
    try {
      const res = await axios.delete(`${apiUrl}/posts/${postId}`);
      if(res.data.success) {
        dispatch({ type: DELETE_POST, payload: postId});
      }
    } catch (error) {
      console.log(error)
    }
  }

  //Post context data
  const postContextData = {
    postState,
    getPosts,
    showAddPostModel,
    setShowAddPostModel,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    updatePost,
    findPost,
    showUpdatePostModal,
    setShowUpdatePostModal,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
