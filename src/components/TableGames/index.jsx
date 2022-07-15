import styles from './tableGames.module.scss';

const TableGames = ({ gamesList }) => {

  return (
    <article className={styles.tableGames}>
      <h3>Текущие игры</h3>
      <ul className='no-scrollbar'>
        {gamesList?.map(game => <li key={game.id}>{`Игра №${game.id}: ${game.author}`}</li>)}
      </ul>
    </article>
  );
}

export default TableGames;
