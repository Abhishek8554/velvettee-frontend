import Card from '../components/Card';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from '../screens/login/Login.module.scss';
import useApi from '../hooks/useApi';
import useSnackBar from '../stores/Snackbar';
import { SnackBarTypes } from '../enums/SnackBarTypes';
import { EyeIcon } from '@heroicons/react/24/outline';
import useLoader from '../stores/FullPageLoader';
import ApiUrls from '../constants/ApiUrls';
import useUserService from '../stores/UserService';

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
    const [forgotPasswordStage, setForgotPasswordStage] = useState<number>(1);
    const [forgotPasswordFormValue, setForgotPasswordFormValue] =
        useState<ForgotPasswordFormFields>({ email: '' });
    const [showPassword, setShowPassword] = useState<{
        [name: string]: boolean;
    }>({});
    const snackBarService = useSnackBar();
    const api = useApi();
    const userService = useUserService();
    const loaderService = useLoader();
    const navigate = useNavigate();
    const [otpFormFields, setOtpFormFields] = useState<OtpValues>({
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
    });

    const passwordFieldInitialValue: PasswordFormFields = {
        cnfPassword: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Enter Valid email id').required('Required'),
    });

    const passwordValidationSchema = Yup.object({
        password: Yup.string()
            .required('Required')
            .min(6, 'Password must be at least 6 characters'),
        cnfPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Required')
            .min(6, 'Password must be at least 6 characters'),
    });

    const handleSubmitSendEmail = (values: ForgotPasswordFormFields) => {
        setForgotPasswordFormValue(values);
        loaderService.showFullPageLoader();
        api.post(ApiUrls.FORGOT_PASSWORD, { email: values.email })
            .then(() => {
                setForgotPasswordStage(2);
                loaderService.hideFullPageLoader();
            })
            .catch((err) => {
                loaderService.hideFullPageLoader();
                snackBarService.open(err.message, SnackBarTypes.DANGER);
            });
    };

    const handleSubmitOtpValue = () => {
        loaderService.showFullPageLoader();
        api.post(ApiUrls.VERIFY_OTP, {
            otp:
                otpFormFields.value1 +
                otpFormFields.value2 +
                otpFormFields.value3 +
                otpFormFields.value4 +
                otpFormFields.value5,
            email: forgotPasswordFormValue.email,
        })
            .then(() => {
                loaderService.hideFullPageLoader();
                setForgotPasswordStage(3);
            })
            .catch((err) => {
                snackBarService.open(err.message, SnackBarTypes.DANGER);
                loaderService.hideFullPageLoader();
            });
    };

    const handleSubmitPassword = (values: {
        cnfPassword: string;
        password: string;
    }) => {
        loaderService.showFullPageLoader();
        userService.resetPassword(
            forgotPasswordFormValue.email,
            values.password,
            () => {
                loaderService.hideFullPageLoader();
                navigate('/login');
            },
            (err) => {
                loaderService.hideFullPageLoader();
                snackBarService.open(err.message, SnackBarTypes.DANGER);
            }
        );
    };

    const handleOtpInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        nextField: string | null,
        prevField: string | null
    ) => {
        const { value, name } = event.target;

        setOtpFormFields((prevValues) => {
            if (prevValues[name].length == 1 && value != '') {
                return prevValues;
            }
            return {
                ...prevValues,
                [name]: value,
            };
        });
        if (value) {
            const nextEl: HTMLInputElement = document.getElementById(
                nextField as string
            ) as HTMLInputElement;
            if (nextEl) {
                nextEl.focus();
            }
        } else {
            const prevEl: HTMLInputElement = document.getElementById(
                prevField as string
            ) as HTMLInputElement;
            if (prevEl) {
                prevEl.focus();
            }
        }
    };

    const splittedEmail = forgotPasswordFormValue.email.split('@');
    let maskedEmail;
    if (forgotPasswordFormValue.email) {
        maskedEmail =
            splittedEmail[0].slice(0, 3) +
            new Array(splittedEmail[0].length - 3).fill('•').join('') +
            splittedEmail[1];
    }

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
                                            errors.email
                                                ? 'default-error-border'
                                                : ''
                                        }`}
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-sm mt-1 default-error"
                                    />
                                </div>

                                <div className="mt-12 mb-4">
                                    <Button text="Submit"></Button>
                                </div>

                                <div className="flex justify-center">
                                    <Link
                                        to="/login"
                                        className="color-primary text-sm underline font-medium"
                                    >
                                        Back to login{' '}
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
                    <Formik
                        initialValues={otpFormFields}
                        onSubmit={handleSubmitOtpValue}
                    >
                        {({ errors }) => (
                            <Form className="max-w-md mx-auto mt-8 bg-white sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                                <div className="mb-4 flex">
                                    {Object.keys(otpFormFields).map(
                                        (item, index) => {
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
                                                        errors[item]
                                                            ? 'default-error-border'
                                                            : ''
                                                    }`}
                                                    onChange={(
                                                        e: React.ChangeEvent<HTMLInputElement>
                                                    ) =>
                                                        handleOtpInputChange(
                                                            e,
                                                            `otp-field-value${
                                                                index + 2
                                                            }`,
                                                            `otp-field-value${index}`
                                                        )
                                                    }
                                                />
                                            );
                                        }
                                    )}

                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-sm mt-1 default-error"
                                    />
                                </div>

                                <div className="mt-12 mb-4">
                                    <Button text="Submit"></Button>
                                </div>

                                <div className="flex justify-center">
                                    <Link
                                        to="/login"
                                        className="color-primary text-sm underline font-medium"
                                    >
                                        Back to login{' '}
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
                                        <div
                                            className={`mt-1 p-2 w-full border rounded-md ve-field  ${
                                                styles.password_wrapper
                                            } ${
                                                errors.password
                                                    ? 'default-error-border'
                                                    : 'field'
                                            }`}
                                        >
                                            <Field
                                                type={
                                                    showPassword['password']
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                id="password"
                                                name="password"
                                                placeholder="Enter your password"
                                                className="flex-1"
                                            />
                                            <div className={styles.eye_wrapper}>
                                                <EyeIcon
                                                    onClick={() => {
                                                        setShowPassword(
                                                            (pre) => {
                                                                return {
                                                                    ...(pre as {
                                                                        [
                                                                            name: string
                                                                        ]: boolean;
                                                                    }),
                                                                    'password':
                                                                        !showPassword[
                                                                            'password'
                                                                        ],
                                                                };
                                                            }
                                                        );
                                                    }}
                                                />
                                                <span
                                                    className={`${
                                                        styles.eye_icon
                                                    } ${
                                                        showPassword['password']
                                                            ? styles.close
                                                            : 'd-none'
                                                    }`}
                                                    onClick={() => {
                                                        setShowPassword(
                                                            (pre) => {
                                                                return {
                                                                    ...(pre as {
                                                                        [
                                                                            name: string
                                                                        ]: boolean;
                                                                    }),
                                                                    'password':
                                                                        !showPassword[
                                                                            'password'
                                                                        ],
                                                                };
                                                            }
                                                        );
                                                    }}
                                                ></span>
                                            </div>
                                        </div>
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-sm mt-1 default-error"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <div
                                            className={`mt-1 p-2 w-full border rounded-md ve-field  ${
                                                styles.password_wrapper
                                            } ${
                                                errors.password
                                                    ? 'default-error-border'
                                                    : 'field'
                                            }`}
                                        >
                                            <Field
                                                type={
                                                    showPassword['cnfPassword']
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                id="cnfPassword"
                                                name="cnfPassword"
                                                placeholder="Confirm your password"
                                                className="flex-1"
                                            />
                                            <div className={styles.eye_wrapper}>
                                                <EyeIcon
                                                    onClick={() => {
                                                        setShowPassword(
                                                            (pre) => {
                                                                return {
                                                                    ...(pre as {
                                                                        [
                                                                            name: string
                                                                        ]: boolean;
                                                                    }),
                                                                    'cnfPassword':
                                                                        !showPassword[
                                                                            'cnfPassword'
                                                                        ],
                                                                };
                                                            }
                                                        );
                                                    }}
                                                />
                                                <span
                                                    className={`${
                                                        styles.eye_icon
                                                    } ${
                                                        showPassword[
                                                            'cnfPassword'
                                                        ]
                                                            ? styles.close
                                                            : 'd-none'
                                                    }`}
                                                    onClick={() => {
                                                        setShowPassword(
                                                            (pre) => {
                                                                return {
                                                                    ...(pre as {
                                                                        [
                                                                            name: string
                                                                        ]: boolean;
                                                                    }),
                                                                    'cnfPassword':
                                                                        !showPassword[
                                                                            'cnfPassword'
                                                                        ],
                                                                };
                                                            }
                                                        );
                                                    }}
                                                ></span>
                                            </div>
                                        </div>
                                        <ErrorMessage
                                            name="cnfPassword"
                                            component="div"
                                            className="text-sm mt-1 default-error"
                                        />
                                    </div>
                                    <div className="mt-12 mb-4">
                                        <Button text="Save"></Button>
                                    </div>
                                    <div className="flex justify-center">
                                        <Link
                                            to="/login"
                                            className="color-primary text-sm underline font-medium"
                                        >
                                            Back to login{' '}
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
