/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from '../../components/header/Header';
import ProductCard from '../../components/product-card/ProductCard';
import styles from './ProductListing.module.scss';
import Button from '../../components/Button';
import Footer from '../../components/footer/Footer';
import { Link, useParams } from 'react-router-dom';
const ProductListing = () => {
    const params = useParams();
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
    return (
        <>
            <div className={styles.wrapper}>
                <Header />
                <hr />
                <p className={styles.info_container}>
                    <p>Home / {params.search}</p>
                    <p>{params.search} - 52 Items</p>
                </p>
                <div className={styles.cards_wrapper}>
                    {products.map((product) => (
                        <Link to={`/product-detail/${product.id}`}>
                            <ProductCard
                                id={product.id.toString()}
                                imageUrl={product.imageUrl}
                                originalPrice={product.originalPrice}
                                sellingPrice={product.sellingPrice}
                                productDescription={product.productDescription}
                                productName={product.productName}
                            />
                        </Link>
                    ))}
                </div>
                <div className={styles.button_container}>
                    <Button text="Show More" />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductListing;
