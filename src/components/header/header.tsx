import styles from './header.module.css';
import Button from '../button/button';

function Header() {
    return (
        <header className={`${styles.header} center`}>
            <Button name='Вход в личный кабинет'/>
        </header>
    )
}

export default Header;

