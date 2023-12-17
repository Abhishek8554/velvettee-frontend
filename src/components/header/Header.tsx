/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Icon from '../../classes/Icons';
import styles from './Header.module.scss';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
    ChevronDownIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import { UserCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
const Header = () => {
    const [menAnchorEl, setMenAnchorEl] = React.useState<null | HTMLElement>(
        null
    );
    const openMenMenu = Boolean(menAnchorEl);
    const [wmenAnchorEl, setwmenAnchorEl] = React.useState<null | HTMLElement>(
        null
    );
    const openWmenMenu = Boolean(wmenAnchorEl);
    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement>,
        name: 'men' | 'wmen'
    ) => {
        if (name === 'men') {
            setMenAnchorEl(event.currentTarget);
        } else {
            setwmenAnchorEl(event.currentTarget);
        }
    };
    const handleClose = (name: 'men' | 'wmen') => {
        if (name === 'men') {
            setMenAnchorEl(null);
        } else {
            setwmenAnchorEl(null);
        }
    };
    const mensMenuItems: string[] = ['Shirt', 'T-Shirts', 'Jeans', 'Pants'];
    return (
        <div className={styles.wrapper}>
            <div className={styles.icon_container}>
                <i dangerouslySetInnerHTML={{ __html: Icon.companyLogo }}></i>
            </div>
            <div className={styles.actions_container}>
                <div className={styles.dropdown}>
                    <div
                        className={styles.label}
                        onClick={(e: any) => {
                            handleClick(e, 'men');
                        }}
                        id="men-btn"
                        aria-controls={openMenMenu ? 'men-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenMenu ? 'true' : undefined}
                    >
                        Men{' '}
                        <span>
                            <ChevronDownIcon className="h-10 w-10" />
                        </span>{' '}
                    </div>
                    <Menu
                        id="men-menu"
                        anchorEl={menAnchorEl}
                        open={openMenMenu}
                        onClose={() => {
                            handleClose('men');
                        }}
                        MenuListProps={{
                            'aria-labelledby': 'men-btn',
                        }}
                    >
                        {mensMenuItems.map((item: string, index: number) => (
                            <MenuItem
                                key={index + 1}
                                onClick={() => {
                                    handleClose('men');
                                }}
                                classes={styles.harshtanya}
                            >
                                {item}
                            </MenuItem>
                        ))}
                    </Menu>
                    <div
                        className={styles.label}
                        onClick={(e: any) => {
                            handleClick(e, 'wmen');
                        }}
                        id="wmen-btn"
                        aria-controls={openWmenMenu ? 'wmen-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openWmenMenu ? 'true' : undefined}
                    >
                        women{' '}
                        <span>
                            <ChevronDownIcon
                                className={`h-10 w-10 ${styles.dropdown_icons}`}
                            />
                        </span>{' '}
                    </div>
                    <Menu
                        id="wmen-menu"
                        anchorEl={wmenAnchorEl}
                        open={openWmenMenu}
                        onClose={() => {
                            handleClose('wmen');
                        }}
                        MenuListProps={{
                            'aria-labelledby': 'wmen-btn',
                        }}
                    >
                        {mensMenuItems.map((item: string, index: number) => (
                            <MenuItem
                                key={index + 1}
                                onClick={() => {
                                    handleClose('wmen');
                                }}
                                classes={styles.harshtanya}
                            >
                                {item}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
                <div className={styles.search_container}>
                    <span>
                        <MagnifyingGlassIcon className=" color-sub-text" />
                    </span>
                    <input
                        placeholder="Search your product"
                        type="text"
                        className={styles.search_input}
                    />
                </div>
                <div className={styles.buttons_container}>
                    <a href="#" className={styles.button}>
                        <span>
                            <UserCircleIcon />
                        </span>
                        <p>Login</p>
                    </a>

                    <a href="#" className={styles.button}>
                        <span>
                            <ShoppingCartIcon />
                        </span>
                        <p>Cart</p>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Header;
