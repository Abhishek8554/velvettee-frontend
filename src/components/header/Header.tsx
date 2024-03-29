/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Icon from '../../classes/Icons';
import styles from './Header.module.scss';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/Auth';
import Button, { ButtonTypes } from '../Button';
import {
    HeartIcon,
    ShoppingCartIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import useWishlist from '../../stores/Wishlist';
import useCart from '../../stores/Cart';
import useUserService from '../../stores/UserService';
const Header = () => {
    const navigate = useNavigate();
    const authStore = useAuthStore();
    const userService = useUserService();
    const [inputValue, setInputValue] = useState('');
    const wishlist = useWishlist();
    const cart = useCart();
    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event: any) => {
        if (event.keyCode === 13 && inputValue) {
            navigate(`/products/${inputValue}`);
        }
    };
    const logout = () => {
        userService.logout();
    };
    return (
        <>
            <div className={`${styles.wrapper} ${styles.desktop}`}>
                <Link to={'/'}>
                    <div className={styles.icon_container}>
                        <i
                            dangerouslySetInnerHTML={{
                                __html: Icon.companyLogo,
                            }}
                        ></i>
                    </div>
                </Link>
                <div className={styles.search_container}>
                    <span>
                        <MagnifyingGlassIcon className=" color-sub-text" />
                    </span>
                    <input
                        placeholder="Search your product"
                        type="text"
                        className={styles.search_input}
                        onKeyDown={handleKeyDown}
                        onInput={handleInputChange}
                    />
                </div>
                {/* Remember to add ! */}
                {!authStore.token ? (
                    <Link to={'/signup'} className={styles.buttons_container}>
                        <Button
                            text="Login / Signup"
                            type={ButtonTypes.OUTLINE}
                            className={styles.login_btn}
                        />
                    </Link>
                ) : (
                    <div className={styles.buttons_container}>
                        <div onClick={logout} className={styles.button_icon}>
                            <UserIcon />
                        </div>
                        <Link
                            to={'/wishlist'}
                            className={`${styles.button_icon} ${styles.wishlist}`}
                        >
                            <HeartIcon />
                            {wishlist.wishlist.length ? (
                                <div className={styles.notification}></div>
                            ) : (
                                ''
                            )}
                        </Link>
                        <Link
                            to="/cart"
                            className={`${styles.button_icon} ${styles.cart}`}
                        >
                            <ShoppingCartIcon />
                            {cart.cart.length ? (
                                <div className={styles.notification}></div>
                            ) : (
                                ''
                            )}
                        </Link>
                    </div>
                )}
            </div>
            <div className={`${styles.wrapper} ${styles.mobile}`}>
                <div className={styles.link_action_container}>
                    <Link to={'/'}>
                        <div className={styles.icon_container}>
                            <i
                                dangerouslySetInnerHTML={{
                                    __html: Icon.companyLogo,
                                }}
                            ></i>
                        </div>
                    </Link>
                    {/* Remember to add ! */}
                    {!authStore.token ? (
                        <Link
                            to={'/signup'}
                            className={styles.buttons_container}
                        >
                            <Button
                                text="Login / Signup"
                                className={styles.login_btn}
                                type={ButtonTypes.OUTLINE}
                            />
                        </Link>
                    ) : (
                        <div className={styles.buttons_container}>
                            <div
                                onClick={logout}
                                className={styles.button_icon}
                            >
                                <UserIcon />
                            </div>
                            <div className={styles.button_icon}>
                                <HeartIcon />
                            </div>
                            <div className={styles.button_icon}>
                                <ShoppingCartIcon />
                            </div>
                        </div>
                    )}
                </div>
                <div
                    className={`${styles.search_container} ${styles.search_container_mobile}`}
                >
                    <span>
                        <MagnifyingGlassIcon className=" color-sub-text" />
                    </span>
                    <input
                        placeholder="Search your product"
                        type="text"
                        className={styles.search_input}
                    />
                </div>
            </div>
        </>
    );
};

export default Header;
