import { useLayoutEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useWebSocket from 'react-use-websocket';
import { setGameId } from '../../store/slices/userSlice';
import { useGetApiUrl } from '../../hooks/useGetApiUrl';
import { useAuth } from '../../hooks/useAuth';


const GameId = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getSocketUrl = useGetApiUrl({ path: `/game/${gameId}`, protocol: 'ws' });
  const { name, uid } = useAuth();
  const [ players, setPlayers ] = useState();
  const [ gameState, setGameState ] = useState();

  const {
    sendJsonMessage,
  } = useWebSocket(getSocketUrl, {
    onError: (event) => console.log(event),
    //onOpen: () => console.log('opened'),
    onMessage: (event) => {
      const { type, payload } = JSON.parse(event.data);

      switch (type) { // при первом же рефакторинге нужно будет вынести это действие в отдельный хук
        case 'players':
          setPlayers(payload);
          break;
        case 'error':
          dispatch(setGameId(''));
          navigate('/', { replace: true });
          break;
        case 'gameState':
          setGameState(payload);
          break;
        case 'gameId':
          dispatch(setGameId(payload));
          break;
        default:
          console.log(`Неизвестный тип от сервера: ${type}`);
      }
    },
    //onClose: () => console.log('goodbye'),
    shouldReconnect: () => true,
    filter: () => false,
    //share: true,
  });

  useLayoutEffect(() => {
    if (!!name) sendJsonMessage({ type: 'playerEnteredGame', payload: { name, uid } });

    // если в игре нет мест то выкидываем обратно
    // отключение кнопки на фронте, при полной комнате менять стейт игры и в зависимости от него в таблице деактивировать кнопку присоединения

    //return () => sendJsonMessage({ type: 'exituser', payload: { uid } });
  }, [sendJsonMessage, uid, name]);

  const handlerExitGame = () => {
    dispatch(setGameId(''));
    navigate('/', { replace: true });
  }

  return (
    <article>
      {`This is game by id ${gameId}`}
      {players && (
        <ul>
          {players.map(({ name, uid }) => <li key={uid}>{name}</li>)}
        </ul>
      )}
      <button type='button' onClick={handlerExitGame}>Выйти из текущей игры</button>
    </article>
  );
}

export default GameId;
