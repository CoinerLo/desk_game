// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { loginUser } from '../../store/slices/userSlice';
import FormLogin from '../FormLogin';
import IsLoaded from '../IsLoaded';
import styles from './login.module.scss';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, isLoaded } = useAuth();

  useEffect(() => {
    if(isAuth) navigate('/home');
  });

  const handlerOnLogIn = useCallback((data, e) => {
    e.preventDefault();
    const { password, email } = data;
    try {
      dispatch(loginUser({ email, password }));
      navigate('/home', { replace: true });
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, navigate]);

  if (isLoaded) return <IsLoaded />

  return (
    <section className={styles.login}>
      <h1 className={styles.login_title}>Для входа в систему требуется:</h1>
      <h3>Email и пароль вспомнить!</h3>
      <FormLogin title={"Войти"} handlerSubmit={handlerOnLogIn} />
      <div className={styles.login_signup}>
        <h4>Еще нет аккаунта?</h4>
        <Link to="/signup">Зарегистрироваться</Link>
      </div>
    </section>
  );
}

export default Login;
