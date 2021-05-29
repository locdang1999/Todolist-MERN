import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TAOKEN_NAME } from "./constants";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({children}) =>{
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    //Authenticate user
    const loadUser = async () =>{
        if(localStorage[LOCAL_STORAGE_TAOKEN_NAME]){
           setAuthToken(localStorage[LOCAL_STORAGE_TAOKEN_NAME])
        }

        try {
            const res = await axios.get(`${apiUrl}/auth`);
            if(res.data.success){
                dispatch({
                    type:'SET_AUTH',
                    payload:{isAuthenticated: true, user: res.data.user}
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TAOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: 'SET_AUTH',
                payload: {isAuthenticated: false, user: null}
            })
        }
    }

    useEffect(() =>loadUser(), [])

    //login
    const loginUser = async userForm =>{
        try {
            const res = await axios.post(`${apiUrl}/auth/login`,userForm);
            if(res.data.success){
                localStorage.setItem(LOCAL_STORAGE_TAOKEN_NAME, res.data.accessToken); 
            }

            await loadUser();

            return res.data;
        } catch (error) {
            if(error.response.data) return error.response.data
            else return{success: false, message: error.message}
        }
    }

    //register
    const registerUser = async userForm =>{
        try {
            const res = await axios.post(`${apiUrl}/auth/register`,userForm);
            if(res.data.success){
                localStorage.setItem(LOCAL_STORAGE_TAOKEN_NAME, res.data.accessToken); 
            }

            await loadUser();

            return res.data;
        } catch (error) {
            if(error.response.data) return error.response.data
            else return{success: false, message: error.message}
        }
    }

    //Logout
    const logoutUser = () =>{
        localStorage.removeItem(LOCAL_STORAGE_TAOKEN_NAME);
        dispatch({
            type: 'SET_AUTH',
            payload: {isAuthenticated: false, user: null}
        })
    }

    //Context data
    const authContextdata = {loginUser, authState, registerUser, logoutUser}

    //Return provider
    return (
        <AuthContext.Provider value={authContextdata}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
