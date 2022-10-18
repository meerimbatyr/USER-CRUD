import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Home from "../pages/Home";
import Header from "../components/Header";
import { GlobalContext } from "../context/GlobalState";
import { userContext } from "../context/GlobalState";
import Loader from "./Loader";

const Login = () => {
  const {
    loggedinUser,
    setLoggedinUser,
    users,
    loading,
    setLoading,
    isSubmitted,
    setIsSubmitted,
  } = useContext(GlobalContext);

  const [showHidePassword, setShowHidePassword] = useState(false);

  function authenticate(values) {
    const { email, password } = values;
    const user = users.find(
      (u) => u.email === values.email && u.password === values.password
    );
    if (user) {
      setIsSubmitted(true);
    }
    return user;
  }

  const getNames = (values) => {
    const { email, password } = values;
    const user = users.find(
      (u) => u.email === values.email && u.password === values.password
    );
    return user;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
        .required("No password provided"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setLoading(true);
      setLoggedinUser(getNames(values));
      authenticate(values);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    },
  });

  if (loading) {
    return (
      <div style={{ width: "300px", margin: "auto" }}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      {isSubmitted ? (
        <Home />
      ) : (
        <div className="container col-md-6  col-lg-4 mx-auto my-5">
          <Form onSubmit={formik.handleSubmit}>
            <h1>Login</h1>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.email}
                isInvalid={formik.touched.email && !!formik.errors.email}
                isValid={!formik.errors.email}
              />
              {formik.touched.email ? (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              ) : undefined}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showHidePassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.password}
                isInvalid={!!formik.errors.password}
                isValid={!formik.errors.password}
              />
              {formik.touched.password ? (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              ) : undefined}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Show Password"
                onChange={(e) => setShowHidePassword(!showHidePassword)}
              />
            </Form.Group>
            <Form.Text className="text-danger fs-5">
              No matching user found
            </Form.Text>
            <br />
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default Login;
