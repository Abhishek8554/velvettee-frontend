import Card from '../../components/Card';
import styles from './Login.module.scss';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import useAuthStore from '../../stores/Auth';
import useSnackBar from '../../stores/Snackbar';
import { Link } from 'react-router-dom';
import { SnackBarTypes } from '../../enums/SnackBarTypes';
import { EyeIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import useApi from '../../hooks/useApi';
import useLoader from '../../stores/FullPageLoader';

interface Values {
    email: string;
    password: string;
}

export default function Login() {
    const api = useApi();
    const loaderService = useLoader();
    const [showPassword, setShowPassword] = useState<{
        [name: string]: boolean;
    }>({});
    const { setToken } = useAuthStore();
    const snackBarService = useSnackBar();

    const initialValues: Values = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Enter Valid email id').required('Required'),
        password: Yup.string()
            .required('Required')
            .min(6, 'Password must be at least 6 characters'),
    });

    const handleSubmit = (values: Values) => {
        loaderService.showFullPageLoader();
        api.post('/login', { email: values.email, password: values.password })
            .then((res) => {
                setToken(res.data.token);
                snackBarService.open('Login Successfull');
                loaderService.hideFullPageLoader();
            })
            .catch((err) => {
                snackBarService.open(err.message, SnackBarTypes.DANGER);
                loaderService.hideFullPageLoader();
            });
    };

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
            <Card heading="Login" subHeading="">
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
                                            className={`${styles.eye_icon} ${
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

                            <div className="flex justify-between mb-4 text-xs">
                                <label className="flex color-sub-text">
                                    <Field
                                        type="checkbox"
                                        id="rememberMe"
                                        name="rememberMe"
                                        placeholder="Remember me"
                                    />
                                    &nbsp; Remember me
                                </label>

                                <div className="color-primary underline font-medium">
                                    <Link to="/forgot-password">
                                        {' '}
                                        Forgot Password ?
                                    </Link>
                                </div>
                            </div>

                            <div className="mb-4 color-sub-text ve-terms">
                                By logging in, you agree to our{' '}
                                <a
                                    className="color-primary underline font-medium"
                                    href="/"
                                >
                                    Privacy Policy and Terms & Conditions*
                                </a>
                            </div>

                            <div className="mt-12 mb-4">
                                <Button text="Login"></Button>
                            </div>

                            <div className="flex justify-center">
                                Don’t have an account? &nbsp;
                                <Link
                                    className="color-primary underline font-medium"
                                    to="/signup"
                                >
                                    Signup
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
}
