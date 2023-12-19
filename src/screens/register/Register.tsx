import styles from "./Register.module.scss";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Link } from "react-router-dom";
import HitApi from "../../classes/HitApi";
import { RequestType } from "../../enums/RequestType";
import { SnackBarTypes } from "../../enums/SnackBarTypes";
import useAuthStore from "../../stores/Auth";
import useSnackBar from "../../stores/Snackbar";
import * as Yup from "yup";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { useState } from "react";

interface Values {
  email: string;
  password: string;
  cnfPassword: string;
}

export default function Register() {
  const { setToken } = useAuthStore();
  const snackBarService = useSnackBar();
  const [loader, setLoader] = useState(false);

  const initialValues: Values = {
    email: "",
    password: "",
    cnfPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Enter Valid email id").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Password must be at least 6 characters"),
    cnfPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = (values: Values) => {
    setLoader(true);
    new HitApi({
      requestType: RequestType.POST,
      url: "/register",
      payload: {
        email: values.email,
        password: values.password,
      },
      successCallback: (res) => {
        setToken(res.token as string);
        setLoader(false);
      },
      errorCallback: (err) => {
        snackBarService.open(err.message, SnackBarTypes.DANGER);
        setLoader(false);
      },
    }).hitApi();
  };

  return (
    <div
      className={`flex items-center justify-center h-screen ${styles.wrapper} `}
    >
      <div className={styles.boy_character_wrapper}>
        <img src="/public/login-assets/Boy_Character.svg" />
      </div>
      <div className={styles.girl_character_wrapper}>
        <img src="/public/login-assets/Girl_Character.svg" />
      </div>
      <div className={styles.card_container}>
        <Card heading="Signup" subHeading="">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors }) => (
              <Form className="max-w-md mx-auto mt-8 bg-white sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                <div className="mb-4">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className={`mt-1 p-2 w-full border rounded-md ve-field ${
                      errors.email ? "default-error-border" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm mt-1 default-error"
                  />
                </div>

                <div className="mb-4">
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className={`mt-1 p-2 w-full border rounded-md ve-field ${
                      errors.password ? "default-error-border" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-sm mt-1 default-error"
                  />
                </div>

                <div className="mb-4">
                  <Field
                    type="password"
                    id="cnf-password"
                    name="cnfPassword"
                    placeholder="Confirm password"
                    className={`mt-1 p-2 w-full border rounded-md ve-field ${
                      errors.password ? "default-error-border" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="cnfPassword"
                    component="div"
                    className="text-sm mt-1 default-error"
                  />
                </div>

                <div className="mt-12 mb-4">
                  <Button text="Login" loader={loader}></Button>
                </div>

                <div className="flex justify-center">
                  Already have an account? &nbsp;
                  <Link
                    className="color-primary underline font-medium"
                    to="/login"
                  >
                    Signup
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
}
