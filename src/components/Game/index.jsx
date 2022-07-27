import { Outlet } from 'react-router-dom';

const Game = () => {
  return (
    <section>
      This is game page! Welcome!
      <Outlet />
    </section>
  );
}

export default Game;
