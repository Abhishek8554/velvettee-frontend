/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import styles from './ProductCard.module.scss';
import useWishlist, { findItemInWishlist } from '../../stores/Wishlist';
import { useState } from 'react';
import Spinner from '../Spinner';
type Props = {
    id: string;
    imageUrl?: string;
    productName: string;
    productDescription: string;
    sellingPrice: number;
    originalPrice: number | 0;
    product: any;
};

const ProductCard = (props: Props) => {
    const wishlist = useWishlist();
    const [wishlistLoader, setWishlistLoader] = useState(false);
    const addToWishlist = (product: any) => {
        setWishlistLoader(true);
        wishlist.add(
            product,
            product?.colors[0],
            () => {
                setWishlistLoader(false);
            },
            () => {
                setWishlistLoader(false);
            }
        );
    };
    const removeFromWishlist = (id: string) => {
        setWishlistLoader(true);
        const foundItem = findItemInWishlist(undefined, {
            color: props.product?.colors[0],
            productId: id,
        });
        wishlist.remove(
            foundItem?._id as string,
            () => {
                setWishlistLoader(false);
            },
            () => {
                setWishlistLoader(false);
            }
        );
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.image_container}>
                <img src={props.imageUrl} alt={props.productName} />
                <div className={styles.wishlist_icon}>
                    {wishlistLoader ? (
                        <div className="p-0.5 color-primary flex justify-center .items-center ">
                            <Spinner />
                        </div>
                    ) : props.product &&
                      props.product.colors &&
                      findItemInWishlist(undefined, {
                          color: props.product?.colors[0],
                          productId: props.product?._id,
                      }) ? (
                        <HeartSolid
                            onClick={(e: any) => {
                                e.preventDefault();
                                removeFromWishlist(props.id);
                            }}
                            className="h-6 w-6 color-primary"
                        />
                    ) : (
                        <HeartIcon
                            onClick={(e: any) => {
                                e.preventDefault();
                                addToWishlist(props.product);
                            }}
                            className="h-6 w-6 color-primary"
                        />
                    )}
                </div>
            </div>
            <div className={styles.details}>
                <h1 className={styles.product_name}>{props.productName}</h1>
                <p className={styles.product_description}>
                    {props.productDescription}
                </p>
                <div className={styles.price_container}>
                    <span className={styles.currency}>₹</span>
                    <span className={styles.amount}>{props.sellingPrice}</span>
                    <span className={styles.original_price}>
                        ₹{props.originalPrice}
                    </span>
                    {props.originalPrice !== props.sellingPrice ? (
                        <span className={styles.discount}>
                            (
                            {(
                                ((props.originalPrice - props.sellingPrice) /
                                    props.originalPrice) *
                                100
                            ).toFixed(2)}
                            % off)
                        </span>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
