import useLoader from '../../stores/FullPageLoader';
import styles from './FullPageLoader.module.scss';
const FullPageLoader = () => {
    const loaderService = useLoader();
    if (loaderService.loaderVisible) {
        return (
            <div className={styles.backdrop}>
                <span className={styles.loader}></span>
            </div>
        );
    }
};

export default FullPageLoader;
