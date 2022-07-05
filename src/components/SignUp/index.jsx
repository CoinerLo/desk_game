import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { addNewUser } from '../../store/slices/userSlice';
import FormLogin from '../FormLogin';
import IsLoaded from '../IsLoaded';
import styles from './signup.module.scss';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, isLoaded } = useAuth();

  useEffect(() => {
    if(isAuth) navigate('/home');
  });

  const handlerOnSignUp = useCallback((data, e) => {
    e.preventDefault();
    const { password, email } = data;
    dispatch(addNewUser({ password, email }));
  }, [dispatch]);

  if (isLoaded) return <IsLoaded />

  return (
    <section className={styles.signup}>
      <h1>Для регистрации потребуется:</h1>
      <h3>Email и немного фантазии!</h3>
      <FormLogin title={"Зарегистрироваться"} handlerSubmit={handlerOnSignUp} />
    </section>
  )
}

export default SignUp;
