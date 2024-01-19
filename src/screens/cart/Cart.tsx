/* eslint-disable @typescript-eslint/no-explicit-any */
import Carousel from 'react-multi-carousel';
import Button from '../../components/Button';
import CartProductCard from '../../components/cart-product-card/CartProductCard';
import Header from '../../components/header/Header';
import styles from './Cart.module.scss';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/product-card/ProductCard';
import { useState } from 'react';
import Footer from '../../components/footer/Footer';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import useCart from '../../stores/Cart';
enum CartSteps {
    CART,
    ADDRESS,
    PAYMENT,
}
const CustomRightArrow = ({ onClick }: any) => {
    return (
        <div
            className={`${styles.arrow} ${styles.arrow_right}`}
            onClick={() => onClick()}
        >
            <ChevronRightIcon />
        </div>
    );
};
const CustomLeftArrow = ({ onClick }: any) => {
    return (
        <div
            className={`${styles.arrow} ${styles.arrow_left}`}
            onClick={() => onClick()}
        >
            <ChevronLeftIcon />
        </div>
    );
};
const Cart = () => {
    const cart = useCart();
    const cardNumberRegExp =
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
    const cvvRegExp = /^[0-9]{3,4}$/;
    const [currentSteps, setCurrentSteps] = useState(CartSteps.CART);

    const products = [
        {
            id: 1,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 2,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 3,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 4,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 5,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 6,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 7,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 8,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 9,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 10,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
    ];
    const initialValues = {
        name: '',
        mobileNumber: '',
        pinCode: '',
        address: '',
        town: '',
        city: '',
        state: '',
        saveAs: 'Home',
        markDefault: false,
    };
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is Required'),
        mobileNumber: Yup.string()
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                'Mobile Number is not valid'
            )
            .required('Mobile Number is Required'),
        pinCode: Yup.string()
            .matches(/^[1-9][0-9]{5}$/, 'Enter a valid pincode')
            .required('Pin Code is required'),
        address: Yup.string().required('Address is Required'),
        town: Yup.string().required('Town is Required'),
        city: Yup.string().required('City is Required'),
        state: Yup.string().required('State is Required'),
    });
    const paymentFormInitialValues = {
        cardNumber: '',
        name: '',
        month: '',
        year: '',
        cvv: '',
        saveSecurly: false,
    };
    const paymentFormValidationSchema = Yup.object({
        cardNumber: Yup.string()
            .matches(cardNumberRegExp, 'Enter a valid card number')
            .required('Card Number is Required'),
        name: Yup.string().required('Name is Required'),
        month: Yup.string().required('Month is Required'),
        year: Yup.string().required('Year is Required'),
        cvv: Yup.string()
            .matches(cvvRegExp, 'Invalid CVV')
            .required('CVV is required'),
    });
    const handleSubmit = (a: any) => {
        console.log(123);
        console.log(a);
    };
    const handlePaymentFormSubmit = (a: any) => {
        console.log(123);
        console.log(a);
    };
    return (
        <>
            <Header />
            <div className={styles.wrapper}>
                <div className={styles.stepper_wrapper}>
                    <div
                        className={styles.stepper_item}
                        onClick={() => {
                            setCurrentSteps(CartSteps.CART);
                        }}
                    >
                        <div
                            className={`${styles.step_counter} ${
                                currentSteps === CartSteps.CART
                                    ? styles.active
                                    : ''
                            }`}
                        >
                            1
                        </div>
                        <div className={styles.step_name}>Cart</div>
                    </div>

                    <div
                        className={styles.stepper_item}
                        onClick={() => {
                            setCurrentSteps(CartSteps.ADDRESS);
                        }}
                    >
                        <div
                            className={`${styles.step_counter} ${
                                currentSteps === CartSteps.ADDRESS
                                    ? styles.active
                                    : ''
                            }`}
                        >
                            2
                        </div>
                        <div className={styles.step_name}>Address</div>
                    </div>
                    <div
                        className={styles.stepper_item}
                        onClick={() => {
                            setCurrentSteps(CartSteps.PAYMENT);
                        }}
                    >
                        <div
                            className={`${styles.step_counter} ${
                                currentSteps === CartSteps.PAYMENT
                                    ? styles.active
                                    : ''
                            }`}
                        >
                            3
                        </div>
                        <div className={styles.step_name}>Payment</div>
                    </div>
                </div>

                {currentSteps === CartSteps.CART && (
                    <div className={styles.steps_container}>
                        <div className={`${styles.step} ${styles.step_1}`}>
                            <div className={styles.left}>
                                {cart.cart.map((cartItem) => (
                                    <CartProductCard
                                        imageUrl={cartItem.imageUrl}
                                        name={cartItem.name}
                                        availableSizes={cartItem.size}
                                        description={cartItem.productShortDesc}
                                        originalPrice={cartItem.price}
                                        sellingPrice={cartItem.sellingPrice}
                                        selectedSize={32}
                                        availableQty={
                                            cartItem.availableQuantity
                                        }
                                        key={cartItem._id}
                                    />
                                ))}
                            </div>
                            <div className={styles.right}>
                                <div className={styles.pricing_details}>
                                    <h1>Pricing details</h1>
                                    <div className={styles.seprator}></div>
                                    <div className={styles.card_body}>
                                        <div
                                            className={`${styles.cart_total} ${styles.pricing_row}`}
                                        >
                                            <p>Cart Total</p>
                                            <p>₹3198.21</p>
                                        </div>
                                        <div className={styles.seprator}></div>
                                        <div className={styles.pricing_row}>
                                            <p>GST</p>
                                            <p>₹383.21</p>
                                        </div>
                                        <div className={styles.seprator}></div>
                                        <div className={styles.pricing_row}>
                                            <p>Shipping Charges</p>
                                            <p>₹0</p>
                                        </div>
                                        <div className={styles.seprator}></div>
                                        <div
                                            className={`${styles.pricing_row} ${styles.total}`}
                                        >
                                            <p>Total Amount</p>
                                            <p>₹90000</p>
                                        </div>
                                        <Button
                                            text="Proceed to address"
                                            className={styles.cta}
                                            onClick={() => {
                                                setCurrentSteps(
                                                    CartSteps.ADDRESS
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.similar}>
                            <p className="text-l font-bold my-8">
                                {' '}
                                You may also like{' '}
                            </p>

                            <div className="mt-8">
                                <Carousel
                                    additionalTransfrom={0}
                                    arrows
                                    autoPlaySpeed={3000}
                                    centerMode={false}
                                    className=""
                                    containerClass="carousel-container w-full"
                                    dotListClass=""
                                    draggable
                                    focusOnSelect={false}
                                    // infinite
                                    // itemClass="ml-2"
                                    keyBoardControl
                                    minimumTouchDrag={80}
                                    pauseOnHover
                                    renderArrowsWhenDisabled={false}
                                    renderButtonGroupOutside={false}
                                    renderDotsOutside={false}
                                    responsive={{
                                        desktop: {
                                            breakpoint: {
                                                max: 3000,
                                                min: 1024,
                                            },
                                            items: 4,
                                            partialVisibilityGutter: 40,
                                        },
                                        mobile: {
                                            breakpoint: {
                                                max: 464,
                                                min: 0,
                                            },
                                            items: 1,
                                            partialVisibilityGutter: 30,
                                        },
                                        tablet: {
                                            breakpoint: {
                                                max: 1024,
                                                min: 464,
                                            },
                                            items: 2,
                                            partialVisibilityGutter: 30,
                                        },
                                    }}
                                    rewind={false}
                                    rewindWithAnimation={false}
                                    rtl={false}
                                    shouldResetAutoplay
                                    showDots={false}
                                    sliderClass=""
                                    slidesToSlide={1}
                                    swipeable
                                    customLeftArrow={<CustomLeftArrow />}
                                    customRightArrow={<CustomRightArrow />}
                                >
                                    {products.map((product, i) => (
                                        <Link
                                            key={i}
                                            className="mx-4 inline-block"
                                            to={`/product-detail/${product.id}`}
                                        >
                                            <ProductCard
                                                id={product.id.toString()}
                                                imageUrl={product.imageUrl}
                                                originalPrice={
                                                    product.originalPrice
                                                }
                                                sellingPrice={
                                                    product.sellingPrice
                                                }
                                                productDescription={
                                                    product.productDescription
                                                }
                                                productName={
                                                    product.productName
                                                }
                                                product={product}
                                            />
                                        </Link>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                )}
                {currentSteps === CartSteps.ADDRESS && (
                    <div className={styles.steps_container}>
                        <div className={`${styles.step} ${styles.step_1}`}>
                            <div className={styles.left}>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ errors }) => (
                                        <Form>
                                            <div
                                                className={styles.form_heading}
                                            >
                                                Contact details
                                            </div>
                                            <div className="mb-4">
                                                <Field
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Name*"
                                                    className={`mt-1 p-2 w-full border rounded-md ve-field transparent  ${
                                                        errors.name
                                                            ? 'default-error-border'
                                                            : ''
                                                    } ${styles.field}`}
                                                />
                                                <ErrorMessage
                                                    name="name"
                                                    component="div"
                                                    className="text-sm mt-1 default-error"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Field
                                                    type="number"
                                                    id="mobileNumber"
                                                    name="mobileNumber"
                                                    placeholder="Mobile No*"
                                                    className={`mt-1 p-2 w-full border rounded-md ve-field transparent  ${
                                                        errors.mobileNumber
                                                            ? 'default-error-border'
                                                            : ''
                                                    } ${styles.field}`}
                                                />
                                                <ErrorMessage
                                                    name="mobileNumber"
                                                    component="div"
                                                    className="text-sm mt-1 default-error"
                                                />
                                            </div>

                                            <div
                                                className={`${styles.form_heading} my-10`}
                                            >
                                                Address
                                            </div>
                                            <div className="mb-4">
                                                <Field
                                                    type="text"
                                                    id="pinCode"
                                                    name="pinCode"
                                                    placeholder="Pin Code*"
                                                    className={`mt-1 p-2 w-full border rounded-md ve-field transparent  ${
                                                        errors.pinCode
                                                            ? 'default-error-border'
                                                            : ''
                                                    } ${styles.field}`}
                                                />
                                                <ErrorMessage
                                                    name="pinCode"
                                                    component="div"
                                                    className="text-sm mt-1 default-error"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Field
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    placeholder="Address (House No, Building, Street, Area)*"
                                                    className={`mt-1 p-2 w-full border rounded-md ve-field transparent  ${
                                                        errors.address
                                                            ? 'default-error-border'
                                                            : ''
                                                    } ${styles.field}`}
                                                />
                                                <ErrorMessage
                                                    name="address"
                                                    component="div"
                                                    className="text-sm mt-1 default-error"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Field
                                                    type="text"
                                                    id="town"
                                                    name="town"
                                                    placeholder="Locality / Town*"
                                                    className={`mt-1 p-2 w-full border rounded-md ve-field transparent  ${
                                                        errors.town
                                                            ? 'default-error-border'
                                                            : ''
                                                    } ${styles.field}`}
                                                />
                                                <ErrorMessage
                                                    name="town"
                                                    component="div"
                                                    className="text-sm mt-1 default-error"
                                                />
                                            </div>
                                            <div
                                                className={
                                                    styles.city_state_wrapper
                                                }
                                            >
                                                <div className="mb-4">
                                                    <Field
                                                        type="text"
                                                        id="city"
                                                        name="city"
                                                        placeholder="City / District*"
                                                        className={`mt-1 p-2 w-full border rounded-md ve-field transparent  ${
                                                            errors.city
                                                                ? 'default-error-border'
                                                                : ''
                                                        } ${styles.field}`}
                                                    />
                                                    <ErrorMessage
                                                        name="city"
                                                        component="div"
                                                        className="text-sm mt-1 default-error"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <Field
                                                        type="text"
                                                        id="state"
                                                        name="state"
                                                        placeholder="State*"
                                                        className={`mt-1 p-2 w-full border rounded-md ve-field transparent  ${
                                                            errors.state
                                                                ? 'default-error-border'
                                                                : ''
                                                        } ${styles.field}`}
                                                    />
                                                    <ErrorMessage
                                                        name="state"
                                                        component="div"
                                                        className="text-sm mt-1 default-error"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className={`${styles.form_heading} my-10`}
                                            >
                                                Save Address as
                                            </div>
                                            <div
                                                className={
                                                    styles.city_state_wrapper
                                                }
                                            >
                                                <div className="mb-4">
                                                    <Field
                                                        id="home"
                                                        type="radio"
                                                        name="saveAs"
                                                        value="Home"
                                                    />
                                                    <label
                                                        className={
                                                            styles.radio_labels
                                                        }
                                                        htmlFor="home"
                                                    >
                                                        Home
                                                    </label>
                                                </div>
                                                <div className="mb-4">
                                                    <Field
                                                        id="work"
                                                        type="radio"
                                                        name="saveAs"
                                                        value="Work"
                                                    />
                                                    <label
                                                        className={
                                                            styles.radio_labels
                                                        }
                                                        htmlFor="work"
                                                    >
                                                        Work
                                                    </label>
                                                </div>
                                            </div>
                                            <label className="flex my-5">
                                                <Field
                                                    type="checkbox"
                                                    id="markDefault"
                                                    name="markDefault"
                                                    placeholder="markDefault"
                                                />
                                                &nbsp; Mark this as my default
                                                address
                                            </label>
                                            <Button
                                                text="Add Address"
                                                className={styles.cta}
                                            />
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.pricing_details}>
                                    <h1>Pricing details</h1>
                                    <div className={styles.seprator}></div>
                                    <div className={styles.card_body}>
                                        <div
                                            className={`${styles.cart_total} ${styles.pricing_row}`}
                                        >
                                            <p>Cart Total</p>
                                            <p>₹3198.21</p>
                                        </div>
                                        <div className={styles.seprator}></div>
                                        <div className={styles.pricing_row}>
                                            <p>GST</p>
                                            <p>₹383.21</p>
                                        </div>
                                        <div className={styles.seprator}></div>
                                        <div className={styles.pricing_row}>
                                            <p>Shipping Charges</p>
                                            <p>₹0</p>
                                        </div>
                                        <div className={styles.seprator}></div>
                                        <div
                                            className={`${styles.pricing_row} ${styles.total}`}
                                        >
                                            <p>Total Amount</p>
                                            <p>₹90000</p>
                                        </div>
                                        <Button
                                            text="Proceed to payment"
                                            className={styles.cta}
                                            onClick={() => {
                                                setCurrentSteps(
                                                    CartSteps.PAYMENT
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {currentSteps === CartSteps.PAYMENT && (
                    <div className={styles.steps_container}>
                        <div className={`${styles.step} ${styles.step_1}`}>
                            <div className={styles.left}>
                                <div className={styles.card_heading}>
                                    Payment mode
                                </div>
                                <div className={styles.card_form_wrapper}>
                                    <p className={styles.payment_mode}>
                                        Credit/Debit Card
                                    </p>
                                    <div className={styles.add_card_form}>
                                        <Formik
                                            initialValues={
                                                paymentFormInitialValues
                                            }
                                            validationSchema={
                                                paymentFormValidationSchema
                                            }
                                            onSubmit={handlePaymentFormSubmit}
                                        >
                                            {({ errors }) => (
                                                <Form>
                                                    <p
                                                        className={
                                                            styles.card_form_headings
                                                        }
                                                    >
                                                        Add new Card
                                                    </p>
                                                    <div className="mb-4">
                                                        <Field
                                                            type="cardNumber"
                                                            id="cardNumber"
                                                            name="cardNumber"
                                                            placeholder="Card Number"
                                                            className={`mt-1 p-2 w-full border rounded-md ve-field transparent  ${
                                                                errors.cardNumber
                                                                    ? 'default-error-border'
                                                                    : ''
                                                            } ${styles.field}`}
                                                        />
                                                        <ErrorMessage
                                                            name="cardNumber"
                                                            component="div"
                                                            className="text-sm mt-1 default-error"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <Field
                                                            type="text"
                                                            id="name"
                                                            name="name"
                                                            placeholder="Name"
                                                            className={`mt-1 p-2 w-full border rounded-md ve-field transparent  ${
                                                                errors.name
                                                                    ? 'default-error-border'
                                                                    : ''
                                                            } ${styles.field}`}
                                                        />
                                                        <ErrorMessage
                                                            name="name"
                                                            component="div"
                                                            className="text-sm mt-1 default-error"
                                                        />
                                                    </div>
                                                    <p
                                                        className={
                                                            styles.card_form_headings
                                                        }
                                                    >
                                                        Expiration Date
                                                    </p>
                                                    <div
                                                        className={
                                                            styles.card_fields_wrapper
                                                        }
                                                    >
                                                        <div className="mb-4">
                                                            <Field
                                                                type="text"
                                                                id="month"
                                                                name="month"
                                                                placeholder="Month"
                                                                className={`mt-1 p-2 w-full border rounded-md ve-field transparent  ${
                                                                    errors.month
                                                                        ? 'default-error-border'
                                                                        : ''
                                                                } ${
                                                                    styles.field
                                                                }`}
                                                            />
                                                            <ErrorMessage
                                                                name="month"
                                                                component="div"
                                                                className="text-sm mt-1 default-error"
                                                            />
                                                        </div>
                                                        <div className="mb-4">
                                                            <Field
                                                                type="text"
                                                                id="year"
                                                                name="year"
                                                                placeholder="Year"
                                                                className={`mt-1 p-2 w-full border rounded-md ve-field transparent  ${
                                                                    errors.year
                                                                        ? 'default-error-border'
                                                                        : ''
                                                                } ${
                                                                    styles.field
                                                                }`}
                                                            />
                                                            <ErrorMessage
                                                                name="year"
                                                                component="div"
                                                                className="text-sm mt-1 default-error"
                                                            />
                                                        </div>
                                                        <div className="mb-4">
                                                            <Field
                                                                type="text"
                                                                id="cvv"
                                                                name="cvv"
                                                                placeholder="CVV"
                                                                className={`mt-1 p-2 w-full border rounded-md ve-field transparent  ${
                                                                    errors.cvv
                                                                        ? 'default-error-border'
                                                                        : ''
                                                                } ${
                                                                    styles.field
                                                                }`}
                                                            />
                                                            <ErrorMessage
                                                                name="cvv"
                                                                component="div"
                                                                className="text-sm mt-1 default-error"
                                                            />
                                                        </div>
                                                    </div>

                                                    <label className="flex my-5">
                                                        <Field
                                                            type="checkbox"
                                                            id="saveSecurly"
                                                            name="saveSecurly"
                                                            placeholder="saveSecurly"
                                                        />
                                                        &nbsp; Save this card
                                                        Securly
                                                    </label>
                                                    <Button
                                                        text="Pay 123"
                                                        className={styles.cta}
                                                    />
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.pricing_details}>
                                    <h1>Pricing details</h1>
                                    <div className={styles.seprator}></div>
                                    <div className={styles.card_body}>
                                        <div
                                            className={`${styles.cart_total} ${styles.pricing_row}`}
                                        >
                                            <p>Cart Total</p>
                                            <p>₹3198.21</p>
                                        </div>
                                        <div className={styles.seprator}></div>
                                        <div className={styles.pricing_row}>
                                            <p>GST</p>
                                            <p>₹383.21</p>
                                        </div>
                                        <div className={styles.seprator}></div>
                                        <div className={styles.pricing_row}>
                                            <p>Shipping Charges</p>
                                            <p>₹0</p>
                                        </div>
                                        <div className={styles.seprator}></div>
                                        <div
                                            className={`${styles.pricing_row} ${styles.total}`}
                                        >
                                            <p>Total Amount</p>
                                            <p>₹90000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Cart;
