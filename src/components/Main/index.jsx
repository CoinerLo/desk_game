import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import TableOnlineUsersContainer from '../TableOnlineUsers';
import styles from './main.module.scss';

const Main = () => {
  const { isAuth, name, uid } = useAuth();
  const [ isOpenAside, setIsOpenAside ] = useState(true);
  if (!isAuth) console.log('Втупительная страница для незарегистрированных пользователей');

  return (
    <section className={styles.main}>
      <div className={styles.main_content}>
        <h1>Добро пожаловать!</h1>
        <div>
          <h2>Здесь будет основной контент для всех пользователей, но что бы кнопка что-то показала - нужно залогиниться!</h2>
          <p>Наслаждайтесь!</p>
        </div>
      </div>
      <div className={styles.main_aside__button}>
        <button onClick={() => setIsOpenAside(!isOpenAside)}>O</button>
      </div>
      {isAuth && (
        <aside className={isOpenAside ?  styles.main_aside__open : styles.main_aside__close}>
          <TableOnlineUsersContainer name={name} uid={uid} />
        </aside>
      )}
    </section>
  );
}

export default Main;
