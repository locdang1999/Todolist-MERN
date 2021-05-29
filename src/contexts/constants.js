export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://safe-everglades-11548.herokuapp.com/api";
export const LOCAL_STORAGE_TAOKEN_NAME = "learnit-mern";

export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";

export const POSTS_LOADED_FAIL = "POSTS_LOADED_FAIL";

export const ADD_POST = "ADD_POST";

export const DELETE_POST = "DELETE_POST";

export const UPDATE_POST = "UPDATE_POST";

export const FIND_UPDATE = "FIND_UPDATE";