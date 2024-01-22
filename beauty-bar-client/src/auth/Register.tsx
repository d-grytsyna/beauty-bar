import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AccountModel from "../models/account/AccountModel";
import authService from "../services/auth.service";

const Register: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: AccountModel = {
    email: "",
    password: "",
    tel: "",
    name: "",
    surname: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("This is not a valid email.")
      .max(90, "Email must be at most 90 characters.")
      .required("This field is required!"),
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
      .test(
        "containsLowercase",
        "The password must contain at least one lowercase letter.",
        (val: string | undefined) => !val || /[a-z]/.test(val)
      )
      .test(
        "containsUppercase",
        "The password must contain at least one uppercase letter.",
        (val: string | undefined) => !val || /[A-Z]/.test(val)
      )
      .test(
        "containsNumber",
        "The password must contain at least one number.",
        (val: string | undefined) => !val || /\d/.test(val)
      )
      .required("This field is required!"),
    confirmPassword: Yup.string()
      .required("This field is required!")
      .oneOf([Yup.ref("password")], "Passwords must match."),
    tel: Yup.string()
      .required("This field is required!")
      .matches(
        /^\d{3}-\d{3}-\d{4}$/,
        "Invalid phone number format. Use 000-000-0000."
      ),
    name: Yup.string()
      .test(
        "len",
        "The username must be between 2 and 40 characters.",
        (val: any) =>
          val && val.toString().length >= 2 && val.toString().length <= 50
      )
      .matches(/^\S*$/, "The username must not contain spaces.")
      .required("This field is required!"),
    surname: Yup.string()
      .test(
        "len",
        "The username must be between 2 and 40 characters.",
        (val: any) =>
          val && val.toString().length >= 2 && val.toString().length <= 50
      )
      .matches(/^\S*$/, "The surname must not contain spaces.")
      .required("This field is required!"),
  });

  const handleRegister = (formValue: AccountModel) => {
    const { email, password, tel, name, surname } = formValue;

    authService.register(email, password, tel, name, surname).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div className="background-container flex-grow-1 p-5">
      <div className="container d-flex justify-content-center ">
        <div className="col-md-6 col-12">
          <h4 className=" w-100 text-center secondary-element-colour">
            Sign up
          </h4>
          <div className="secondary-colour p-4 rounded">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              <Form>
                {!successful && (
                  <div>
                    <div className="form-group form-style">
                      <label
                        htmlFor="email"
                        className="main-element-colour w-100 d-block mb-1"
                      >
                        {" "}
                        Email{" "}
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="main-element-colour"
                      />
                    </div>

                    <div className="form-group form-style">
                      <label
                        htmlFor="password"
                        className=" main-element-colour w-100 d-block mb-2"
                      >
                        {" "}
                        Password{" "}
                      </label>
                      <Field
                        name="password"
                        type="password"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="main-element-colour"
                      />
                    </div>

                    <div className="form-group form-style">
                      <label
                        htmlFor="confirmPassword"
                        className=" main-element-colour w-100 d-block mb-2"
                      >
                        {" "}
                        Confirm password{" "}
                      </label>
                      <Field
                        name="confirmPassword"
                        type="password"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="main-element-colour"
                      />
                    </div>

                    <div className="form-group form-style">
                      <label
                        htmlFor="tel"
                        className=" main-element-colour w-100 d-block  mb-2"
                      >
                        {" "}
                        Tel{" "}
                      </label>
                      <Field name="tel" type="text" className="form-control" />
                      <ErrorMessage
                        name="tel"
                        component="div"
                        className="main-element-colour"
                      />
                    </div>

                    <div className="form-group form-style">
                      <label
                        htmlFor="name"
                        className=" main-element-colour w-100 d-block  mb-2"
                      >
                        {" "}
                        Name{" "}
                      </label>
                      <Field name="name" type="text" className="form-control" />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="main-element-colour"
                      />
                    </div>

                    <div className="form-group form-style">
                      <label
                        htmlFor="surname"
                        className=" main-element-colour w-100 d-block mb-2"
                      >
                        {" "}
                        Surname{" "}
                      </label>
                      <Field
                        name="surname"
                        type="text"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="surname"
                        component="div"
                        className="main-element-colour"
                      />
                    </div>

                    <div className="form-group d-flex justify-content-center">
                      <button type="submit" className="btn auth-btn">
                        Sign Up
                      </button>
                    </div>
                  </div>
                )}

                {message && (
                  <div className="form-group m-2">
                    <div
                      className={
                        successful
                          ? "main-colour p-3 text-center rounded accent-element-colour"
                          : "accent-colour rounded p-2 main-element-colour m-3"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                    <a
                      href="/login"
                      className="btn accent-btn w-100 main-element-colour main-link"
                    >
                      Sign in
                    </a>
                  </div>
                )}
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
