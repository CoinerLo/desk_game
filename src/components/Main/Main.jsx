import { useState } from 'react';
import ModalStartGame from '../ModalStartGame';
import TableGames from '../TableGames';
import TableOnlineUsers from '../TableOnlineUsers';
import styles from './main.module.scss';

const Main = ({ isAuth, usersOnline, gamesList }) => {
  const [ isOpenAside, setIsOpenAside ] = useState(true);
  const [ isOpenStartGame, setIsOpenStartGame ] = useState(false);

  return (
    <section className={styles.main}>
      <div className={styles.main_content}>
        <h1>Добро пожаловать!</h1>
        <div>
          <h2>Здесь будет основной контент для всех пользователей, но что бы кнопка что-то показала - нужно залогиниться!</h2>
          <p>Наслаждайтесь!</p>
        </div>
        <button
          type='button'
          className={styles.main_content_buttonStart}
          onClick={() => setIsOpenStartGame(true)}
        >
          Новое сражение
        </button>
      </div>
      <div className={styles.main_aside__button}>
        <button onClick={() => setIsOpenAside(!isOpenAside)}>O</button>
      </div>
      {isAuth && (
        <aside className={isOpenAside ?  styles.main_aside__open : styles.main_aside__close}>
          <TableOnlineUsers usersOnline={usersOnline} />
          <TableGames gamesList={gamesList} />
        </aside>
      )}
      {isOpenStartGame && <ModalStartGame setIsOpenStartGame={setIsOpenStartGame} />}
    </section>
  );
}

export default Main;
