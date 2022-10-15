import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Home from "../pages/Home";
import { GlobalContext } from "../context/GlobalState";
import Loader from "./Loader";

const Login = () => {
  const { users, loading, setLoading, isSubmitted, setIsSubmitted } =
    useContext(GlobalContext);

  const [showHidePassword, setShowHidePassword] = useState(false);

  const emails = users.map((user) => user.email);
  const findEmail = emails.find((u) => u.email);
  const passwords = users.map((user) => user.password);
  const findPassword = passwords.find((u) => u.password);
  // console.log(findEmail, passwords);

  const cred = {
    email: "abc@gmail.com",
    password: "admin123",
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required")
        .matches(cred.email, "Email is not matching"),
      password: Yup.string()
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
        .matches(cred.password, "Try again")
        .required("No password provided"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setIsSubmitted(true);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    },
  });

  if (loading) {
    return (
      <div
        className="container col-md-6  col-lg-4 mx-auto my-5 py-5"
        style={{ width: "80px" }}
      >
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
                isInvalid={!!formik.errors.email}
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
            <Button
              variant="primary"
              type="submit"
              // disabled={formik.isSubmitting}
            >
              Submit
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default Login;
