import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/slices/userSlice';
import { useAuth } from '../../hooks/useAuth';
import styles from './header.module.scss';
import global from '../../assets/svg/global.svg';
import home from '../../assets/svg/home-24.svg';
import logout from '../../assets/svg/logout.svg';
import login from '../../assets/svg/login.svg';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const handlerOnLogOut = () => {
    try {
      dispatch(logOut());
      navigate('/', {replace: true});
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>Лого</div>
      <nav className={styles.header__nav}>
        <Link to="/" className={styles.header__link}>
          <span>
            <img src={global} alt='Main page logo' />
          </span>
          <span>Главная</span>
        </Link>
        <Link to="/home" className={styles.header__link}>
          <span>
            <img src={home} alt='Home page logo' />
          </span>
          <span>Домашняя</span>
        </Link>
        {isAuth
          ? <Link
              to="/"
              onClick={handlerOnLogOut}
              className={styles.header__link}
            >
              <span>
                <img src={logout} alt='Logout logo'/>
              </span>
              <span>Выйти</span>
            </Link>
          : <Link to="/login" className={styles.header__link}>
              <span>
                <img src={login} alt='Login page logo' />  
              </span>
              <span>Войти</span>
            </Link>}
      </nav>
    </header>
  );
}

export default Header;
