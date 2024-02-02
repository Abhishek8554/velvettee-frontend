import styles from './Register.module.scss';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { SnackBarTypes } from '../../enums/SnackBarTypes';
import useSnackBar from '../../stores/Snackbar';
import * as Yup from 'yup';
import Card from '../../components/Card';
import Button, { ButtonTypes } from '../../components/Button';
import { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import useLoader from '../../stores/FullPageLoader';
import useUserService from '../../stores/UserService';

interface Values {
    email: string;
    password: string;
    cnfPassword: string;
}

export default function Register() {
    const navigate = useNavigate();
    const userService = useUserService();
    const snackBarService = useSnackBar();
    const [showPassword, setShowPassword] = useState<{
        [name: string]: boolean;
    }>({});
    const loaderService = useLoader();

    const initialValues: Values = {
        email: '',
        password: '',
        cnfPassword: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Enter Valid email id').required('Required'),
        password: Yup.string()
            .required('Required')
            .min(6, 'Password must be at least 6 characters'),
        cnfPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Required')
            .min(6, 'Password must be at least 6 characters'),
    });

    const handleSubmit = (values: Values) => {
        loaderService.showFullPageLoader();
        userService.register(
            values.email,
            values.password,
            () => {
                loaderService.hideFullPageLoader();
                snackBarService.open('Register Successfull');
                navigate('/');
            },
            (err) => {
                snackBarService.open(err.message, SnackBarTypes.DANGER);
                loaderService.hideFullPageLoader();
            }
        );
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
                                                    setShowPassword((pre) => {
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
                                                    });
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
                                                    setShowPassword((pre) => {
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
                                                    });
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
                                                    setShowPassword((pre) => {
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
                                                    });
                                                }}
                                            />
                                            <span
                                                className={`${
                                                    styles.eye_icon
                                                } ${
                                                    showPassword['cnfPassword']
                                                        ? styles.close
                                                        : 'd-none'
                                                }`}
                                                onClick={() => {
                                                    setShowPassword((pre) => {
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
                                                    });
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
                                    <Button text="Signup"></Button>
                                </div>

                                <div className="flex justify-center">
                                    Already have an account? &nbsp;
                                    <Link
                                        className="color-primary underline font-medium"
                                        to="/login"
                                    >
                                        Login
                                    </Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <p className={styles.google_login_text}>
                        <span></span>
                        <span className={styles.text}>Or Signup with</span>
                        <span></span>
                    </p>
                    <Button
                        onClick={() => {
                            userService.loginWithGoogle();
                        }}
                        type={ButtonTypes.OUTLINE}
                        className={styles.google_btn}
                        prefixImgePath="/public/login-assets/google.svg"
                        text="Google"
                    />
                </Card>
            </div>
        </div>
    );
}
