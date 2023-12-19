/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "../components/Card";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import HitApi from "../classes/HitApi";
import { RequestType } from "../enums/RequestType";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../screens/login/Login.module.scss";
// import useSnackBar from "../stores/Snackbar";

interface ForgotPasswordFormFields {
  email: string;
}

interface PasswordFormFields {
  password: string;
  cnfPassword: string;
}

interface OtpValues {
  [key: string]: string;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
}

export default function ForgotPassword() {
  const [loader, setLoader] = useState<boolean>(false);
  const [forgotPasswordStage, setForgotPasswordStage] = useState<number>(2);
  const [forgotPasswordFormValue, setForgotPasswordFormValue] =
    useState<ForgotPasswordFormFields>({ email: "" });

  // const snackBarService = useSnackBar();

  const [otpFormFields, setOtpFormFields] = useState<OtpValues>({
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
  });

  const passwordFieldInitialValue: PasswordFormFields = {
    cnfPassword: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Enter Valid email id").required("Required"),
  });

  const passwordValidationSchema = Yup.object({
    password: Yup.string()
      .required("Required")
      .min(6, "Password must be at least 6 characters"),
    cnfPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleSubmitSendEmail = (values: ForgotPasswordFormFields) => {
    setForgotPasswordFormValue(values);
    setLoader(true);
    new HitApi({
      requestType: RequestType.POST,
      url: "/forgot-password",
      payload: {
        email: values.email,
      },
      successCallback: (res) => {
        setForgotPasswordStage(2);
        setLoader(false);
      },
      errorCallback: (err) => {
        setLoader(false);
      },
    }).hitApi();
  };

  const handleSubmitOtpValue = () => {
    setLoader(true);
    new HitApi({
      requestType: RequestType.POST,
      url: "/forgot-password",
      payload: {
        otp:
          otpFormFields.value1 +
          otpFormFields.value2 +
          otpFormFields.value3 +
          otpFormFields.value4 +
          otpFormFields.value5,
        email: forgotPasswordFormValue.email,
      },
      successCallback: (res) => {
        // TODO: Handle response here
      },
      errorCallback: (err) => {
        setLoader(false);
      },
    }).hitApi();
  };

  const handleSubmitPassword = () => {
    setLoader(true);
    new HitApi({
      requestType: RequestType.POST,
      url: "/forgot-password",
      payload: {
        otp:
          otpFormFields.value1 +
          otpFormFields.value2 +
          otpFormFields.value3 +
          otpFormFields.value4 +
          otpFormFields.value5,
        email: forgotPasswordFormValue.email,
      },
      successCallback: (res) => {
        // TODO: Handle response here
      },
      errorCallback: (err) => {
        setLoader(false);
      },
    }).hitApi();
  };

  const handleOtpInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    nextField: string | null
  ) => {
    const { value, name } = event.target;
    console.log(name, value, nextField);

    setOtpFormFields((prevValues) => {
      if (prevValues[name].length == 1 && value != "") {
        return prevValues;
      }
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  const maskedEmail = forgotPasswordFormValue.email
    .split("")
    .map((char, i) => (i % 2 === 1 ? "X" : char))
    .join("");

  return (
    <div
      className={`flex items-center justify-center h-screen ${styles.wrapper}`}
    >
      <div className={styles.boy_character_wrapper}>
        <img src="/public/login-assets/Boy_Character.svg" />
      </div>
      <div className={styles.girl_character_wrapper}>
        <img src="/public/login-assets/Girl_Character.svg" />
      </div>
      {forgotPasswordStage === 1 && (
        <Card
          heading="Forgot Password"
          subHeading="Please enter a valid email associated with your account to reset your password"
        >
          <Formik
            initialValues={forgotPasswordFormValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmitSendEmail}
          >
            {({ errors }) => (
              <Form className="max-w-md mx-auto mt-8 bg-white sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                <div className="mb-4">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className={`mt-1 p-2 w-full border  rounded-md ve-field ${
                      errors.email ? "default-error-border" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm mt-1 default-error"
                  />
                </div>

                <div className="mt-12 mb-4">
                  <Button loader={loader} text="Submit"></Button>
                </div>

                <div className="flex justify-center">
                  <Link
                    to="/login"
                    className="color-primary text-sm underline font-medium"
                  >
                    Back to login{" "}
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      )}

      {forgotPasswordStage === 2 && (
        <Card
          heading="Verify Your Email"
          subHeading={`An email with a verification code was just sent to ${maskedEmail}.`}
        >
          <Formik initialValues={otpFormFields} onSubmit={handleSubmitOtpValue}>
            {({ errors }) => (
              <Form className="max-w-md mx-auto mt-8 bg-white sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                <div className="mb-4 flex">
                  {Object.keys(otpFormFields).map((item, index) => {
                    return (
                      <Field
                        type="number"
                        key={`otp-field-${item}`}
                        id={`otp-field-${item}`}
                        name={item}
                        placeholder=""
                        required={true}
                        value={otpFormFields[item]}
                        className={`mt-1 mr-2 p-2 otp-field border-b-2 outline-none border-black w-1/4 ${
                          errors[item] ? "default-error-border" : ""
                        }`}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOtpInputChange(e, `otp-field-value${index + 2}`)
                        }
                      />
                    );
                  })}

                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm mt-1 default-error"
                  />
                </div>

                <div className="mt-12 mb-4">
                  <Button loader={loader} text="Submit"></Button>
                </div>

                <div className="flex justify-center">
                  <Link
                    to="/login"
                    className="color-primary text-sm underline font-medium"
                  >
                    Back to login{" "}
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      )}

      {forgotPasswordStage === 3 && (
        <div className="card_container">
          <Card
            heading="Create New Password"
            subHeading={`Enter a new password below`}
          >
            <Formik
              initialValues={passwordFieldInitialValue}
              validationSchema={passwordValidationSchema}
              onSubmit={handleSubmitPassword}
            >
              {({ errors }) => (
                <Form className="max-w-md mx-auto mt-8 bg-white sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
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
                    <Button text="Save" loader={loader}></Button>
                  </div>

                  <div className="flex justify-center">
                    <Link
                      to="/login"
                      className="color-primary text-sm underline font-medium"
                    >
                      Back to login{" "}
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </Card>
        </div>
      )}
    </div>
  );
}
