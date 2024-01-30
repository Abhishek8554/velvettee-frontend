/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import styles from './CartProductCard.module.scss';
import Button, { ButtonTypes } from '../Button';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
// import useCart from '../../stores/Cart';
import useWishlist from '../../stores/Wishlist';
import useApi from '../../hooks/useApi';
import ApiUrls from '../../constants/ApiUrls';
import useAuthStore from '../../stores/Auth';
import { AxiosResponse } from 'axios';
// import useCart from '../../stores/Cart';
// import { Link } from 'react-router-dom';

interface IProps {
    imageUrl: string;
    name: string;
    description: string;
    availableSizes: number[];
    selectedSize: number;
    availableQty: number;
    originalPrice: number;
    sellingPrice: number;
    product: any;
    isWishlistScreen?: boolean;
    selectedQty: number;
    onCartRemove: () => void;
    onCartUpdate?: (response: AxiosResponse) => void;
}

const CartProductCard = (props: IProps) => {
    // const cart = useCart();
    const wishlist = useWishlist();
    // const cart = useCart();
    const auth = useAuthStore();
    const api = useApi({ withAuth: true });
    const [selectedSize, setSelectedSize] = useState(props.selectedSize);
    const [selectedQty, setSelectedQty] = useState(props.selectedQty);
    const quantitlyOptions = [...new Array(props.availableQty).keys()].map(
        (x) => x + 1
    );
    const [sizeAnchorEl, setSizeAnchorEl] = useState<null | HTMLElement>(null);
    const [qtyAnchorEl, setQtyAnchorEl] = useState<null | HTMLElement>(null);
    const openSize = Boolean(sizeAnchorEl);
    const openQty = Boolean(qtyAnchorEl);
    const handleClick = (event: any) => {
        if (event.target.id === 'size-btn')
            setSizeAnchorEl(event.currentTarget);
        if (event.target.id === 'qty-btn') setQtyAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setSizeAnchorEl(null);
        setQtyAnchorEl(null);
    };
    const handleSelection = (name: string, value: number) => {
        const updates: any = {};
        if (name === 'size') {
            updates['size'] = value;
        }
        if (name === 'qty') {
            updates['quantity'] = value;
        }
        api.put(ApiUrls.CART_UPDATE_PRODUCTS, {
            userId: auth.user?._id,
            productId: props?.product?._id,
            updates: updates,
        })
            .then((response) => {
                if (name === 'size') {
                    setSelectedSize(value);
                } else {
                    setSelectedQty(value);
                }
                if (props.onCartUpdate) {
                    props.onCartUpdate(response);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        // <Link to={`/product-detail/${props.product._id}`}>
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <img src={props?.imageUrl} />
            </div>
            <div className={styles.right}>
                <div className={styles.name}>{props.name}</div>
                <div className={styles.description}>{props.description}</div>
                {!props.isWishlistScreen && (
                    <div className={styles.dropdown_container}>
                        <div
                            className={styles.dropdown}
                            id="size-btn"
                            aria-controls={openSize ? 'size-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openSize ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            Size: {selectedSize}
                            <div className={styles.dropdown_icon}>
                                <ChevronDownIcon />
                            </div>
                        </div>
                        <Menu
                            id="size-menu"
                            anchorEl={sizeAnchorEl}
                            open={openSize}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {props.availableSizes.map((size) => (
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        handleSelection('size', size);
                                    }}
                                >
                                    {size}
                                </MenuItem>
                            ))}
                        </Menu>
                        <div
                            className={styles.dropdown}
                            id="qty-btn"
                            aria-controls={openQty ? 'qty-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openQty ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            Qty: {selectedQty}
                            <div className={styles.dropdown_icon}>
                                <ChevronDownIcon />
                            </div>
                            <Menu
                                id="qty-menu"
                                anchorEl={qtyAnchorEl}
                                open={openQty}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                {quantitlyOptions.map((qty) => (
                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            handleSelection('qty', qty);
                                        }}
                                    >
                                        {qty}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </div>
                )}

                <div className={styles.price_container}>
                    <span className={styles.currency}>₹</span>
                    <span className={styles.amount}>{props.sellingPrice}</span>
                    <span className={styles.original_price}>
                        ₹{props.originalPrice}
                    </span>
                    <span className={styles.discount}>
                        (
                        {(
                            ((props.originalPrice - props.sellingPrice) /
                                props.originalPrice) *
                            100
                        ).toFixed(2)}
                        % off)
                    </span>
                </div>
                <div className={styles.buttons_container}>
                    <Button
                        text="Remove"
                        type={ButtonTypes.TEXT}
                        PrefixIcon={TrashIcon}
                        onClick={() => {
                            if (props.isWishlistScreen) {
                                wishlist.remove(props.product._id);
                            } else {
                                console.log(props.product._id);
                                props.onCartRemove();
                            }
                        }}
                    />
                    {!props.isWishlistScreen && (
                        <Button
                            text={
                                wishlist.wishlist.find(
                                    (x) => x._id === props.product._id
                                )
                                    ? 'Remove from Wishlist'
                                    : 'Add to Wishlist'
                            }
                            type={ButtonTypes.TEXT}
                            PrefixIcon={
                                wishlist.wishlist.find(
                                    (x) => x._id === props.product._id
                                )
                                    ? HeartSolid
                                    : HeartIcon
                            }
                            onClick={() => {
                                if (
                                    wishlist.wishlist.find(
                                        (x) => x._id === props.product._id
                                    )
                                ) {
                                    wishlist.remove(props.product._id);
                                } else {
                                    wishlist.add(props.product);
                                }
                            }}
                        />
                    )}
                </div>
            </div>
        </div>

        // </Link>
    );
};

export default CartProductCard;
