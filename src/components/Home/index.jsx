import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { clearErrorAuth, renameUser } from '../../store/slices/userSlice';
import styles from './home.module.scss';

const Home = ({ isAuth }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpenRename, setIsOpenRename] = useState(false);
  const { email, name, createdAt, errorAuth, uid } = useAuth();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors }
  } = useForm({ mode: 'onSubmit' });
  const { onChange } = register('name');

  useEffect(() => {
    if (!isAuth) navigate('/login', {replace: true});
    if (isOpenRename) setFocus('name');
    return () => errorAuth && dispatch(clearErrorAuth());
  }, [isAuth, navigate, setFocus, isOpenRename, dispatch, errorAuth, name, uid]);

  const handlerSubmit = (data, e) => {
    e.preventDefault();
    const newName = data.name;
    dispatch(renameUser({ newName }));
    setIsOpenRename(!isOpenRename);
  }

  const handlerOpenRename = () => {
    setIsOpenRename(!isOpenRename);
    if (errorAuth) dispatch(clearErrorAuth());
  }

  return (
    <section className={styles.home}>
      <h1>{`Личный кабинет пользователя ${name}`}</h1>
      <h2>{email}</h2>
      <p>{`Создан ${createdAt}`}</p>
      <div className={styles.home__renameWindow}>
        {errorAuth && <h4>Сменить имя не удалось, попробуйте еще раз позже.</h4>}
        {isOpenRename
          ? <>
              <form onSubmit={handleSubmit(handlerSubmit)}>
                <label>
                  Новое имя:
                  <input
                    type='text'
                    onChange={onChange}
                    onKeyDown={(e) => {
                      if (e.code === "Escape") setIsOpenRename(false);
                    }}
                    {...register('name', {
                      required: "Поле обязательно к заполнению",
                      onChange: () => errorAuth && dispatch(clearErrorAuth()),
                    })}
                  />
                  {errors.name && <span className={styles.errors}>{errors?.name?.message || "Ошибка в имени!"}</span>}
                </label>
                <div>
                  <button type='submit'>Сменить</button>
                  <button type='close' onClick={() => setIsOpenRename(false)}>X</button>
                </div>
              </form>
            </>
          : <button type='button' onClick={handlerOpenRename}>Сменить имя</button>
        }
      </div>
    </section>
  );
}

export default Home;
