/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from '../../components/header/Header';
import ProductCard from '../../components/product-card/ProductCard';
import styles from './ProductListing.module.scss';
import Button from '../../components/Button';
import Footer from '../../components/footer/Footer';
import { useParams } from 'react-router-dom';
const ProductListing = () => {
    const params = useParams();
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
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
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
