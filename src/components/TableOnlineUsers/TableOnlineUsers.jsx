import { memo } from 'react';
import styles from './tableOnlineUsers.module.scss';

const TableOnlineUsers = ({ usersOnline }) => {

  return (
    <article className={styles.tableOnlineUsers}>
      <h3>Пользователи в сети</h3>
      <ul>
        {usersOnline?.map(user => <li key={user.uid}>{user.name}</li>)}
      </ul>
    </article>
  );
}

export default memo(TableOnlineUsers);
