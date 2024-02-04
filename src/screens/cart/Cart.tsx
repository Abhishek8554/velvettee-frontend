/* eslint-disable @typescript-eslint/no-explicit-any */
import Carousel from 'react-multi-carousel';
import Button, { ButtonTypes } from '../../components/Button';
import CartProductCard from '../../components/cart-product-card/CartProductCard';
import Header from '../../components/header/Header';
import styles from './Cart.module.scss';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/product-card/ProductCard';
import { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import useCart from '../../stores/Cart';
import useUserService from '../../stores/UserService';
import useAuthStore, { IUserAddress } from '../../stores/Auth';
import useSnackBar from '../../stores/Snackbar';
import useLoader from '../../stores/FullPageLoader';
import { SnackBarTypes } from '../../enums/SnackBarTypes';
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

const AddressCard = (props: {
    id: string;
    name: string;
    address: string;
    locality: string;
    city: string;
    state: string;
    pincode: number;
    mobile: number;
    onRemove: (id: string) => void;
    onEdit: () => void;
}) => {
    return (
        <div className={styles.address_card_wrapper}>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.address}>
                <span className={styles.add}>{props.address}</span> -
                <span className={styles.locality}>{props.locality}</span> -
                <span className={styles.city}>{props.city}</span> -
                <span className={styles.state}>{props.state}</span> -
                <span className={styles.pincode}>{props.pincode}</span>
            </div>
            <div className={styles.mobile}>
                <div>Mobile - </div>
                <div className={styles.mobile_num}>{props.mobile}</div>
            </div>
            <div className={styles.btn_container}>
                <Button
                    text="Remove"
                    stopPropogation
                    preventDefault
                    className={styles.address_card_btn}
                    type={ButtonTypes.OUTLINE}
                    onClick={() => {
                        props.onRemove(props.id);
                    }}
                />
                <Button
                    text="Edit"
                    stopPropogation
                    preventDefault
                    className={styles.address_card_btn}
                    type={ButtonTypes.OUTLINE}
                    onClick={() => {
                        props.onEdit();
                    }}
                />
            </div>
        </div>
    );
};

// const DebitCardComponent = (props: {
//     id: string;
//     name: string;
//     cardNumber: string;
//     expiryDate: string;
//     onRemove: (id: string) => void;
//     onEdit: () => void;
// }) => {
//     return (
//         <div className={styles.address_card_wrapper}>
//             <div className={styles.name}>{props.name}</div>
//             <div className={styles.address}>
//                 <span className={styles.add}>Card Number</span> -
//                 <span className={styles.locality}>{props.cardNumber}</span>
//             </div>
//             <div className={styles.mobile}>
//                 <div>Expiry Date - </div>
//                 <div className={styles.mobile_num}>{props.expiryDate}</div>
//             </div>
//             <div className={styles.btn_container}>
//                 <Button
//                     text="Remove"
//                     className={styles.address_card_btn}
//                     type={ButtonTypes.OUTLINE}
//                     onClick={() => {
//                         props.onRemove(props.id);
//                     }}
//                 />
//                 <Button
//                     text="Edit"
//                     className={styles.address_card_btn}
//                     type={ButtonTypes.OUTLINE}
//                     onClick={() => {
//                         props.onEdit();
//                     }}
//                 />
//             </div>
//         </div>
//     );
// };

const PricingDetails = (props: {
    cartTotal: number;
    gst: number;
    shippingCharges: number;
    totalAmount: number;
    buttonText: string;
    disableBtn?: boolean;
    onClick: () => void;
}) => {
    return (
        <div className={styles.pricing_details}>
            <h1>Pricing details</h1>
            <div className={styles.seprator}></div>
            <div className={styles.card_body}>
                <div className={`${styles.cart_total} ${styles.pricing_row}`}>
                    <p>Cart Total</p>
                    <p>₹{props.cartTotal.toFixed(2)}</p>
                </div>
                <div className={styles.seprator}></div>
                <div className={styles.pricing_row}>
                    <p>GST</p>
                    <p>₹{props.gst}</p>
                </div>
                <div className={styles.seprator}></div>
                <div className={styles.pricing_row}>
                    <p>Shipping Charges</p>
                    <p>₹{props.shippingCharges}</p>
                </div>
                <div className={styles.seprator}></div>
                <div className={`${styles.pricing_row} ${styles.total}`}>
                    <p>Total Amount</p>
                    <p>₹{props.totalAmount.toFixed(2)}</p>
                </div>
                {props.buttonText && (
                    <Button
                        disabled={!!props.disableBtn}
                        text={props.buttonText}
                        className={styles.cta}
                        onClick={() => {
                            props.onClick();
                        }}
                    />
                )}
            </div>
        </div>
    );
};

const Cart = () => {
    const cart = useCart();
    const userService = useUserService();
    const auth = useAuthStore();
    const snackBarService = useSnackBar();
    const loaderService = useLoader();
    const cardNumberRegExp =
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
    const cvvRegExp = /^[0-9]{3,4}$/;
    const [currentSteps, setCurrentSteps] = useState(CartSteps.CART);
    const [cartDetails, setCartDetails] = useState<any>(undefined);
    const [products, setProducts] = useState<any>(undefined);
    const [addresses, setAddresses] = useState<any>(undefined);
    const [addNewAddress, setAddNewAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(undefined);
    const [currentlyEditingAddress, setCurrentlyEditingAddress] =
        useState(undefined);
    const navigate = useNavigate();
    const addressInitialValues = {
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
    const [initialValues, setInitialValues] = useState(addressInitialValues);
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is Required'),
        mobileNumber: Yup.string()
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                'Mobile Number is not valid'
            )
            .max(10, 'Invalid Mobile Number')
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
        month: Yup.string()
            .required('Month is Required')
            .matches(/^(0?[1-9]|1[012])$/, 'Enter a valid Month'),
        year: Yup.string().required('Year is Required'),
        cvv: Yup.string()
            .matches(cvvRegExp, 'Invalid CVV')
            .required('CVV is required'),
    });
    const handleSubmit = (values: any) => {
        loaderService.showFullPageLoader();
        if (currentlyEditingAddress) {
            userService.updateAddress(
                values,
                (currentlyEditingAddress as any)?._id,
                (response) => {
                    setAddNewAddress(false);
                    setAddresses(response.data.user.addresses);
                    setCurrentlyEditingAddress(undefined);
                    setInitialValues(addressInitialValues);
                    loaderService.hideFullPageLoader();
                    snackBarService.open(response.data.message);
                },
                (err) => {
                    loaderService.hideFullPageLoader();
                    snackBarService.open(err.message, SnackBarTypes.DANGER);
                }
            );
        } else {
            userService.addAddress(
                values as IUserAddress,
                (response) => {
                    loaderService.hideFullPageLoader();
                    snackBarService.open(response.data.message);
                    setAddresses(response.data.user.addresses);
                    setAddNewAddress(false);
                    setInitialValues(addressInitialValues);
                },
                (error) => {
                    loaderService.hideFullPageLoader();
                    snackBarService.open(error.message, SnackBarTypes.DANGER);
                }
            );
        }
    };

    const onAddNewAddress = () => {
        setAddNewAddress(true);
        setSelectedAddress(undefined);
    };

    const selectAddress = (address: any) => {
        setSelectedAddress(address);
        setInitialValues(addressInitialValues);
        setAddNewAddress(false);
        setCurrentlyEditingAddress(undefined);
    };
    const onAddressEdit = (address: any) => {
        setCurrentlyEditingAddress(address);
        setInitialValues({
            name: address?.name,
            mobileNumber: address?.phone,
            address: address?.address,
            city: address?.City,
            markDefault: address?.IsDefault,
            pinCode: address?.pincode,
            saveAs: address?.IsHome ? 'Home' : 'Work',
            state: address?.State,
            town: address?.Town,
        });
        setAddNewAddress(true);
    };
    const handlePaymentFormSubmit = () => {
        // TODO: handle payment gateway save card here
        userService.placeOrderFromCart(
            (response) => {
                console.log(response);
                snackBarService.open(response.data.message);
                getCartDetails();
            },
            (err) => {
                snackBarService.open(err.message, SnackBarTypes.DANGER);
            }
        );
        // console.log(a);
        // if (a.saveSecurly) {
        //     userService.saveCard(
        //         a,
        //         (response) => {
        //             console.log(response);
        //         },
        //         (err) => {
        //             console.log(err);
        //         }
        //     );
        // }
    };

    const getCartDetails = () => {
        cart.getCartDetails(
            auth.user?._id as string,
            (response) => {
                setCartDetails(response.data);
                loaderService.hideFullPageLoader();
                cart.getSimilarItems(
                    response.data?.cartItems.map(
                        (cartItem: any) => cartItem?.productDetails?._id
                    ),
                    (response) => {
                        setProducts(response.data);
                    },
                    () => {}
                );
            },
            (err) => {
                loaderService.hideFullPageLoader();
                snackBarService.open(err?.message, SnackBarTypes.DANGER);
            }
        );
    };

    const getAddresses = () => {
        userService.fetchAddresses(
            auth.user?._id as string,
            (response) => {
                if (response.data.addresses && response.data.addresses.length) {
                    setAddNewAddress(false);
                } else {
                    setAddNewAddress(true);
                }
                setAddresses(response.data.addresses);
                const defaultAddress = response.data?.addresses?.find(
                    (x: any) => x?.IsDefault
                );

                if (defaultAddress) {
                    setSelectedAddress(defaultAddress);
                }
                loaderService.hideFullPageLoader();
            },
            (err) => {
                snackBarService.open(err.message, SnackBarTypes.DANGER);
                loaderService.hideFullPageLoader();
            }
        );
    };

    useEffect(() => {
        loaderService.showFullPageLoader();
        getCartDetails();
        getAddresses();
    }, []);
    return (
        <>
            <Header />
            {cartDetails?.cartItems?.length ? (
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
                                if (selectedAddress) {
                                    setCurrentSteps(CartSteps.PAYMENT);
                                }
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
                                    {cartDetails.cartItems.map(
                                        (cartItem: any) => (
                                            <CartProductCard
                                                imageUrl={
                                                    cartItem?.colorImages[
                                                        cartItem?.cartitem
                                                            ?.color
                                                    ][0]
                                                }
                                                name={
                                                    cartItem?.productDetails
                                                        ?.name
                                                }
                                                availableSizes={
                                                    cartItem?.productDetails
                                                        ?.size
                                                }
                                                description={
                                                    cartItem?.productDetails
                                                        ?.productShortDesc
                                                }
                                                originalPrice={
                                                    cartItem?.productDetails
                                                        ?.price
                                                }
                                                sellingPrice={
                                                    cartItem?.productDetails
                                                        ?.sellingPrice
                                                }
                                                selectedSize={
                                                    cartItem?.cartitem?.size
                                                }
                                                selectedQty={
                                                    cartItem?.cartitem?.quantity
                                                }
                                                product={
                                                    cartItem?.productDetails
                                                }
                                                availableQty={
                                                    cartItem?.productDetails
                                                        ?.availableQuantity
                                                }
                                                key={
                                                    cartItem?.productDetails
                                                        ?._id
                                                }
                                                onCartRemove={() => {
                                                    cart.remove(
                                                        cartItem?.productDetails
                                                            ?._id,
                                                        () => {
                                                            loaderService.showFullPageLoader();
                                                            getCartDetails();
                                                        }
                                                    );
                                                }}
                                                onCartUpdate={() => {
                                                    loaderService.showFullPageLoader();
                                                    getCartDetails();
                                                }}
                                            />
                                        )
                                    )}
                                </div>
                                <div className={styles.right}>
                                    <PricingDetails
                                        onClick={() => {
                                            setCurrentSteps(CartSteps.ADDRESS);
                                        }}
                                        cartTotal={
                                            cartDetails?.pricingDetails
                                                ?.carttotal
                                        }
                                        gst={cartDetails?.pricingDetails?.Gst}
                                        shippingCharges={
                                            cartDetails?.pricingDetails
                                                ?.shippingamount
                                        }
                                        totalAmount={
                                            cartDetails?.pricingDetails?.total
                                        }
                                        buttonText="Proceed to address"
                                    />
                                </div>
                            </div>
                            {products && products.length && (
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
                                            customLeftArrow={
                                                <CustomLeftArrow />
                                            }
                                            customRightArrow={
                                                <CustomRightArrow />
                                            }
                                        >
                                            {products.map(
                                                (product: any, i: number) => (
                                                    <Link
                                                        key={i}
                                                        className="mx-4 inline-block"
                                                        to={`/product-detail/${product.id}`}
                                                    >
                                                        <ProductCard
                                                            id={product._id.toString()}
                                                            imageUrl={
                                                                product
                                                                    .colorImages[
                                                                    product
                                                                        .colors[0]
                                                                ][0]
                                                            }
                                                            originalPrice={
                                                                product.price
                                                            }
                                                            sellingPrice={
                                                                product.sellingPrice
                                                            }
                                                            productDescription={
                                                                product.productShortDesc
                                                            }
                                                            productName={
                                                                product.name
                                                            }
                                                            product={product}
                                                        />
                                                    </Link>
                                                )
                                            )}
                                        </Carousel>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {currentSteps === CartSteps.ADDRESS && (
                        <div className={styles.steps_container}>
                            <div className={`${styles.step} ${styles.step_1}`}>
                                <div className={styles.left}>
                                    {addresses && addresses.length
                                        ? addresses?.map((address: any) => (
                                              <>
                                                  {(
                                                      currentlyEditingAddress as any
                                                  )?._id !== address?._id && (
                                                      <div
                                                          className={
                                                              (
                                                                  selectedAddress as any
                                                              )?._id ===
                                                              address?._id
                                                                  ? styles.selected_address
                                                                  : ''
                                                          }
                                                          onClick={() => {
                                                              selectAddress(
                                                                  address
                                                              );
                                                          }}
                                                      >
                                                          <AddressCard
                                                              id={address?._id}
                                                              address={
                                                                  address?.address
                                                              }
                                                              city={
                                                                  address.City
                                                              }
                                                              state={
                                                                  address.State
                                                              }
                                                              locality={
                                                                  address.Town
                                                              }
                                                              mobile={
                                                                  address.phone
                                                              }
                                                              name={
                                                                  address.name
                                                              }
                                                              pincode={
                                                                  address.pincode
                                                              }
                                                              key={address._id}
                                                              onEdit={() => {
                                                                  onAddressEdit(
                                                                      address
                                                                  );
                                                              }}
                                                              onRemove={(
                                                                  id: string
                                                              ) => {
                                                                  userService.removeAddress(
                                                                      id,
                                                                      () => {
                                                                          if (
                                                                              (
                                                                                  selectedAddress as any
                                                                              )
                                                                                  ?._id ===
                                                                              id
                                                                          ) {
                                                                              setSelectedAddress(
                                                                                  undefined
                                                                              );
                                                                          }
                                                                          getAddresses();
                                                                      },
                                                                      (err) => {
                                                                          snackBarService.open(
                                                                              err.message,
                                                                              SnackBarTypes.DANGER
                                                                          );
                                                                      }
                                                                  );
                                                              }}
                                                          />
                                                      </div>
                                                  )}
                                              </>
                                          ))
                                        : ''}
                                    {(!(addresses && addresses.length) ||
                                        addNewAddress) && (
                                        <Formik
                                            enableReinitialize
                                            initialValues={initialValues}
                                            validationSchema={validationSchema}
                                            onSubmit={handleSubmit}
                                        >
                                            {({ errors }) => (
                                                <Form
                                                    className={styles.cart_form}
                                                >
                                                    <div
                                                        className={
                                                            styles.form_heading
                                                        }
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
                                                                } ${
                                                                    styles.field
                                                                }`}
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
                                                                } ${
                                                                    styles.field
                                                                }`}
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
                                                        &nbsp; Mark this as my
                                                        default address
                                                    </label>
                                                    <Button
                                                        text="Add Address"
                                                        className={styles.cta}
                                                    />
                                                </Form>
                                            )}
                                        </Formik>
                                    )}

                                    {!addNewAddress && (
                                        <Button
                                            text={'Add Address'}
                                            type={ButtonTypes.OUTLINE}
                                            onClick={onAddNewAddress}
                                        />
                                    )}
                                </div>
                                <div className={styles.right}>
                                    <PricingDetails
                                        onClick={() => {
                                            setCurrentSteps(CartSteps.PAYMENT);
                                        }}
                                        cartTotal={
                                            cartDetails?.pricingDetails
                                                ?.carttotal
                                        }
                                        gst={cartDetails?.pricingDetails?.Gst}
                                        shippingCharges={
                                            cartDetails?.pricingDetails
                                                ?.shippingamount
                                        }
                                        totalAmount={
                                            cartDetails?.pricingDetails?.total
                                        }
                                        disableBtn={!selectedAddress}
                                        buttonText="Proceed to Payment"
                                    />
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
                                            {/* <DebitCardComponent
                                                id="1"
                                                cardNumber="123"
                                                expiryDate="23/11/200"
                                                name="Harsh"
                                                onEdit={() => {}}
                                                onRemove={() => {}}
                                            /> */}
                                            <Formik
                                                initialValues={
                                                    paymentFormInitialValues
                                                }
                                                validationSchema={
                                                    paymentFormValidationSchema
                                                }
                                                onSubmit={
                                                    handlePaymentFormSubmit
                                                }
                                            >
                                                {({ errors }) => (
                                                    <Form
                                                        className={
                                                            styles.cart_form
                                                        }
                                                    >
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
                                                                } ${
                                                                    styles.field
                                                                }`}
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
                                                                } ${
                                                                    styles.field
                                                                }`}
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
                                                            &nbsp; Save this
                                                            card Securly
                                                        </label>
                                                        <Button
                                                            text={`Pay ${cartDetails?.pricingDetails?.total}`}
                                                            className={
                                                                styles.cta
                                                            }
                                                        />
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.right}>
                                    <PricingDetails
                                        onClick={() => {}}
                                        cartTotal={
                                            cartDetails?.pricingDetails
                                                ?.carttotal
                                        }
                                        gst={cartDetails?.pricingDetails?.Gst}
                                        shippingCharges={
                                            cartDetails?.pricingDetails
                                                ?.shippingamount
                                        }
                                        totalAmount={
                                            cartDetails?.pricingDetails?.total
                                        }
                                        buttonText={``}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.error}>
                    <h1 className={styles.msg}>Oops!!! Your cart is empty</h1>

                    <Button
                        className={styles.back}
                        onClick={() => navigate('/')}
                        text="Back To Home"
                    />
                </div>
            )}

            <Footer />
        </>
    );
};

export default Cart;
