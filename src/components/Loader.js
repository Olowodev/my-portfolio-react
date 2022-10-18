import styles from '../styles/Loader.module.css'

const Loader = ({}) => {
    return (
        <div className={styles.Loader}>
            <div className={styles.boxes}>
            <div className={styles.firstBox}></div>
            <div className={styles.secondBox}></div>
            <div className={styles.thirdBox}></div>
            <div className={styles.fourthBox}></div>
            </div>
        </div>
    );
}

export default Loader;