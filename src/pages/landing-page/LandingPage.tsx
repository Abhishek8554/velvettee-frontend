import Header from '../../components/header/Header';
import { Carousel } from 'flowbite-react';
import styles from './LandingPage.module.scss';
const LandingPage = () => {
    return (
        <div>
            <Header />
            <section className={styles.carousel_container}>
                <Carousel>
                    <img
                        src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                        alt="..."
                    />
                    <img
                        src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                        alt="..."
                    />
                    <img
                        src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                        alt="..."
                    />
                    <img
                        src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                        alt="..."
                    />
                    <img
                        src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
                        alt="..."
                    />
                </Carousel>
            </section>
        </div>
    );
};

export default LandingPage;
