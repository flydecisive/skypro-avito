import styles from './main.module.css'
import Header from "../../components/header/header";

function Main() {
    return (
        <div className={`${styles.main}`}>
            <Header />
            <div className={`${styles.wrapper} center`}></div>
        </div>
    )
}

export default Main;