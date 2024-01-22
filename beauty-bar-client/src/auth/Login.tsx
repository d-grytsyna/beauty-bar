import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import authService from "../services/auth.service";

type Props = {};

const Login: React.FC<Props> = () => {
  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: {
    email: string;
    password: string;
  } = {
    email: "",
    password: "",
  };

  useEffect(() => {
    const button = document.getElementById("signin-button");
    if (button)
      button.style.display = "none";
  }, [])

  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email("This is not a valid email.")
    .max(90, "Email must be at most 90 characters.")
    .required("* This field is required!"),
    password: Yup.string()

    .test(
      "noSpaces",
      "The password must not contain spaces.",
      (val: string | undefined) => !val || !/\s/.test(val)
    )
    .test(
      "len",
      "The password must be between 10 and 64 characters.",
      (val: any) =>
        val && val.toString().length >= 10 && val.toString().length <= 64
    )
    .required("* This field is required!"),
  });

  const handleLogin = (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;

    setMessage("");
    setLoading(true);

    authService.login(email, password).then(
      () => {
        history.push("/profile");
        window.location.reload();
      },
      (error:any) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="background-container flex-grow-1 p-5">
    <div className="container d-flex justify-content-center">
    <div className="col-md-6 col-12">
      <h4 className=" w-100 text-center secondary-element-colour">Sign in</h4>
      <div className="secondary-colour p-4 rounded">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group form-style">
              <label htmlFor="email" className="main-element-colour w-100 d-block  mb-2">Email</label>
              <Field name="email" type="text" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="main-element-colour"
              />
            </div>

            <div className="form-group form-style">
              <label htmlFor="password" className=" main-element-colour w-100 d-block mb-2">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="main-element-colour"
              />
            </div>
            {message && (
              <div className="form-group">
                <div className="accent-colour rounded p-2 text-center main-element-colour mb-3" role="alert">
                  {message}
                </div>
              </div>
            )}
            <div className="form-group d-flex justify-content-center">
              <button type="submit" className="btn auth-btn" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
          </Form>
        </Formik>
        <div className="mt-3">
          <p className="main-element-colour text-center">Don't have an account? <a href="/register" className="accent-element-colour accent-link">Sign up</a> </p>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Login;
