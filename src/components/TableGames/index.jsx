import { useDispatch } from 'react-redux';
import { setGameId } from '../../store/slices/userSlice';
import styles from './tableGames.module.scss';

const TableGames = ({ gamesList }) => {
  const dispatch = useDispatch();

  const handlerEntereGame = (id) => () => dispatch(setGameId(id));

  return (
    <article className={styles.tableGames}>
      <h3>Текущие игры</h3>
      <ul className='no-scrollbar'>
        {gamesList?.map(game =>
          <li key={game.id}>
            {`Игра №${game.id}: ${game.author}`}
            <span onClick={handlerEntereGame(game.id)}> --{'>'}</span>
          </li>
        )}
      </ul>
    </article>
  );
}

export default TableGames;
