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
            <div className={styles.wrapper}>
                <div className={styles.hamburger_lines}>
                    <span className={`${styles.line} ${styles.line1}`}></span>
                    <span className={`${styles.line} ${styles.line2}`}></span>
                    <span className={`${styles.line} ${styles.line3}`}></span>
                </div>
                <div className={styles.logo_container}>
                    <img src="white-logo.svg" alt="Velvettee" />
                </div>
                <div className={styles.actions}>
                    <div className={styles.action}>
                        <MagnifyingGlassIcon />
                    </div>
                    <div className={styles.action}>
                        <ShoppingCartIcon />
                    </div>
                    <div className={styles.action}>
                        <UserIcon />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
