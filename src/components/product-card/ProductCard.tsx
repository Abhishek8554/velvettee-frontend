import { HeartIcon } from '@heroicons/react/24/outline';
import styles from './ProductCard.module.scss';
type Props = {
    id: string;
    imageUrl: string;
    productName: string;
    productDescription: string;
    sellingPrice: number;
    originalPrice: number | 0;
};

const ProductCard = (props: Props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.image_container}>
                <img src={props.imageUrl} alt={props.productName} />
                <div className={styles.wishlist_icon}>
                    <HeartIcon className="h-6 w-6 color-primary" />
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
                    <span className={styles.discount}>
                        (
                        {((props.originalPrice - props.sellingPrice) /
                            props.originalPrice) *
                            100}
                        % off)
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
