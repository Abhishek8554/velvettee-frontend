/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import styles from './ProductCard.module.scss';
import useWishlist from '../../stores/Wishlist';
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
    const addToWishlist = (product: any) => {
        wishlist.add(product);
    };
    const removeFromWishlist = (id: string) => {
        wishlist.remove(id);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.image_container}>
                <img
                    src={
                        props.imageUrl ? props.imageUrl : '/public/product.jpeg'
                    }
                    alt={props.productName}
                />
                <div className={styles.wishlist_icon}>
                    {' '}
                    {wishlist.wishlist.find((x) => x._id === props.id) ? (
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
