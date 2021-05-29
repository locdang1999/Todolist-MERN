import React, { useContext } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import {Spinner} from "react-bootstrap"
import { AuthContext } from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";
const Auth = ({ authRoute }) => {
    const {authState:{authLoading, isAuthenticated}} = useContext(AuthContext);

    let body
    if(authLoading){
        body = (
            <div className="d-flex justify-justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    }else if(isAuthenticated){
        return <Redirect to='/dashboard'/>
    }else{
        body = (
            <> 
              {authRoute === "login" && <Login />}
              {authRoute === "register" && <Register />}
            </>
        );
    }

  return (
      <div className="landing">
          <div className="dark-overlay">
              <div className="landing-inner">
                  <h1>LearnIt</h1>
                  <h4>Keep track of what you are learning</h4>
                  {body}
              </div>
          </div>
      </div>
  )
};

export default Auth;
