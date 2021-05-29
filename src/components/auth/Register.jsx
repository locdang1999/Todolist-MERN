import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layouts/AlertMessage";

const Register = () => {
  //Context
  const { registerUser } = useContext(AuthContext);

  //loacl State
  const [registerForm, setRegisterform] = useState({
    userName: "",
    passWord: "",
    confirm_password: "",
  });

  const [alert, setAlert] = useState(null);

  const { userName, passWord, confirm_password } = registerForm;

  const onChangeRegisterForm = (e) => {
    setRegisterform({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    if (passWord !== confirm_password) {
      setAlert({ type: "danger", message: "Passwords do not match." });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      // console.log(registerData);
      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            name="userName"
            placeholder="Username"
            type="text"
            required
            value={userName}
            onChange = {onChangeRegisterForm}
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            name="passWord"
            placeholder="Password"
            type="password"
            required
            value={passWord}
            onChange = {onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="confirm_password"
            placeholder="Confirm Password"
            type="password"
            required
            value={confirm_password}
            onChange = {onChangeRegisterForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>

      <p>
        Already have a account?
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default Register;
