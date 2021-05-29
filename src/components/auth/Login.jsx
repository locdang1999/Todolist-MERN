import React, { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layouts/AlertMessage";

const Login = () => {
  //Context
  const { loginUser } = useContext(AuthContext);

  // //Router
  // const history = useHistory();

  //loacl State
  const [loginForm, setLoginform] = useState({
    userName: "",
    passWord: "",
  });

  const [alert, setAlert] = useState(null);

  const { userName, passWord } = loginForm;

  const onChangeLoginForm = (e) => {
    setLoginform({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      // console.log(loginData);
      if (loginData.success) {
        // history.push("/dashboard");
      } else {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() =>setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert}/>
        <Form.Group>
          <Form.Control
            name="userName"
            placeholder="Username"
            type="text"
            required
            value={userName}
            onChange={onChangeLoginForm}
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            name="passWord"
            placeholder="Password"
            type="password"
            required
            value={passWord}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>

      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default Login;
