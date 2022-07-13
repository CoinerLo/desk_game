import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { clearErrorAuth } from '../../store/slices/userSlice';
import styles from './formLogin.module.scss';

const FormLogin = ({ title, handlerSubmit }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValid }
  } = useForm({
    mode: "all"
  });

  useEffect(() => setFocus('email'), [setFocus]);

  const { errorAuth } = useAuth();
  const { onChange } = register('email');

  const typePassword = (currentTitle) => {
    switch (currentTitle) {
      case 'Зарегистрироваться':
        return 'new-password';
      case 'Войти':
        return 'current-password';
      default:
        return 'on';
    }
  }

  const errorAuthUser = (error) => {
    console.log(error);
    switch (error) {
      case 'auth/invalid-email':
        return 'Не корректный email';
      case 'auth/email-already-in-use':
        return 'Используйте оригинальный email';
      case 'auth/wrong-password':
        return 'Не верный пароль, либо такого пользователя не существует';
      case 'auth/user-not-found': 
        return 'Не верный пароль, либо такого пользователя не существует';
      case 'auth/network-request-failed':
        return 'Отсутствует соединение с интернетом';
      default:
        return 'Ошибка, попробуйте еще раз';
    }
  }

  return (
    <section className={styles.formLogin}>
      <form onSubmit={handleSubmit(handlerSubmit)}>
        {errorAuth && <h1 className={styles.formLogin_error_message}>{errorAuthUser(errorAuth)}</h1>}
        <label htmlFor="email">
          <p>Email:</p>
          <input
            id="email"
            type="email"
            placeholder="Введите ваш email"
            onChange={onChange}
            {...register("email", {
              onChange: () => errorAuth && dispatch(clearErrorAuth()),
              required: "Поле обязательно к заполнению",
              pattern: {
                value: /.+@.+\..+/i,
                message: "Некорректный email"
              },
            })}
          />
          {errors.email && <span>{errors?.email?.message || "Ошибка в email!"}</span>}
        </label>
        <label htmlFor="password">
          <p>Пароль:</p>
          <input
            id="password"
            type="password"
            placeholder="Не менее 6 символов"
            autoComplete={typePassword(title)}
            onFocus={() => errorAuth && dispatch(clearErrorAuth())}
            {...register("password", {
              required: "Поле обязательно к заполнению",
              minLength: {
                value: 6,
                message: "Необходимо минимум 6 символов"
              }
            })}
          />
          {errors.password && <span>{errors?.password?.message || "Ошибка в пароле!"}</span>}
        </label>
        <button type="submit" disabled={!isValid}>{title}</button>
      </form>
    </section>
  );
}

export default FormLogin;
