/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import styles from './CartProductCard.module.scss';
import Button, { ButtonTypes } from '../Button';
import {
    HeartIcon,
    ShoppingCartIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import useCart from '../../stores/Cart';
import useWishlist, { findItemInWishlist } from '../../stores/Wishlist';
import { AxiosResponse } from 'axios';
// import useCart from '../../stores/Cart';
import { Link } from 'react-router-dom';

interface IProps {
    id: string;
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
    selectedColor?: string;
    selectedQty: number;
    onCartRemove: () => void;
    onCartUpdate?: (response: AxiosResponse) => void;
}

const CartProductCard = (props: IProps) => {
    // const cart = useCart();
    const wishlist = useWishlist();
    const cart = useCart();
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
        event.stopPropagation();
        event.preventDefault();
        if (event.target.id === 'size-btn')
            setSizeAnchorEl(event.currentTarget);
        if (event.target.id === 'qty-btn') setQtyAnchorEl(event.currentTarget);
    };
    const handleClose = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
        setSizeAnchorEl(null);
        setQtyAnchorEl(null);
    };
    const handleSelection = (name: string, value: number) => {
        if (props.isWishlistScreen) {
            if (name === 'size') {
                setSelectedSize(value);
            } else {
                setSelectedQty(value);
            }
            return;
        }
        const updates: any = {};
        if (name === 'size') {
            updates['size'] = value;
        }
        if (name === 'qty') {
            updates['quantity'] = value;
        }
        cart.updateCartItem(
            props.id,
            updates,
            (response) => {
                if (name === 'size') {
                    setSelectedSize(value);
                } else {
                    setSelectedQty(value);
                }
                if (props.onCartUpdate) {
                    props.onCartUpdate(response);
                }
            },
            () => {}
        );
    };
    return (
        <Link
            to={`/product-detail/${props.product._id}?from=${
                props.isWishlistScreen ? 'wishlist' : 'cart'
            }&id=${props.id}`}
        >
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <img src={props?.imageUrl} />
                </div>
                <div className={styles.right}>
                    <div className={styles.name}>{props.name}</div>
                    <div className={styles.description}>
                        {props.description}
                    </div>
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
                                    onClick={(event: any) => {
                                        event.stopPropagation();
                                        event.preventDefault();
                                        handleClose(event);
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
                                        onClick={(event: any) => {
                                            event.stopPropagation();
                                            event.preventDefault();
                                            handleClose(event);
                                            handleSelection('qty', qty);
                                        }}
                                    >
                                        {qty}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </div>

                    <div className={styles.price_container}>
                        <span className={styles.currency}>₹</span>
                        <span className={styles.amount}>
                            {props.sellingPrice}
                        </span>
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
                            stopPropogation
                            preventDefault
                            onClick={() => {
                                if (props.isWishlistScreen) {
                                    wishlist.remove(props.id);
                                } else {
                                    props.onCartRemove();
                                }
                            }}
                        />
                        <Button
                            stopPropogation
                            preventDefault
                            text={
                                !props.isWishlistScreen
                                    ? findItemInWishlist(undefined, {
                                          color: props.selectedColor!,
                                          productId: props.product?._id,
                                      })
                                        ? 'Remove from Wishlist'
                                        : 'Move to Wishlist'
                                    : 'Move to Cart'
                            }
                            type={ButtonTypes.TEXT}
                            PrefixIcon={
                                !props.isWishlistScreen
                                    ? findItemInWishlist(undefined, {
                                          color: props.selectedColor!,
                                          productId: props.product?._id,
                                      })
                                        ? HeartSolid
                                        : HeartIcon
                                    : ShoppingCartIcon
                            }
                            onClick={() => {
                                if (!props.isWishlistScreen) {
                                    if (
                                        findItemInWishlist(undefined, {
                                            color: props.selectedColor!,
                                            productId: props.product?._id,
                                        })
                                    ) {
                                        wishlist.remove(
                                            findItemInWishlist(undefined, {
                                                color: props.selectedColor!,
                                                productId: props.product?._id,
                                            })?._id as string
                                        );
                                    } else {
                                        wishlist.add(
                                            props.product,
                                            props.selectedColor!
                                        );
                                        cart.remove(props.id, () => {});
                                    }
                                } else {
                                    cart.add(
                                        props.product,
                                        selectedSize,
                                        props.selectedColor as string,
                                        selectedQty
                                    );
                                    wishlist.remove(props.id);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CartProductCard;
