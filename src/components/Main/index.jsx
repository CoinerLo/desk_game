import { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import useWebSocket /*{ ReadyState }*/ from 'react-use-websocket';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//import { useGetGamesAllQuery } from '../../api';
import { useAuth } from '../../hooks/useAuth';
import { setGameId } from '../../store/slices/userSlice';
import { useGetApiUrl } from '../../hooks/useGetApiUrl';
import Main from './Main';

const MainContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, name, uid, gameId } = useAuth();
  const [usersOnline, setUsersOnline] = useState([]);
  const [gamesList, setGamesList] = useState([]);
  const getSocketUrl = useGetApiUrl({ path: '/api/v1/main', protocol: 'ws' });

  //const { data } = useGetGamesAllQuery(); // test
  //console.log(data); // тест, удалить в будующих версиях
  const {
    sendJsonMessage,
  } = useWebSocket(getSocketUrl, {
    onError: (event) => console.log(event),
    //onOpen: () => console.log('opened'),
    onMessage: (event) => {
      const { type, payload } = JSON.parse(event.data);

      switch (type) { // при первом же рефакторинге нужно будет вынести это действие в отдельный хук
        case 'users':
          setUsersOnline(payload);
          break;
        case 'games':
          setGamesList(payload);
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

  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: 'Connecting',
  //   [ReadyState.OPEN]: 'Open',
  //   [ReadyState.CLOSING]: 'Closing',
  //   [ReadyState.CLOSED]: 'Closed',
  //   [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  // }[readyState];

  useLayoutEffect(() => {
    if (!!name) sendJsonMessage({ type: 'userdata', payload: { name, uid }});
    //return () => sendJsonMessage({ type: 'exituser', payload: { uid } });
  }, [sendJsonMessage, uid, name]);

  useEffect(() => {
    if (!!gameId) {
      navigate(`/game/${gameId}`, { replace: true });
      dispatch(setGameId(''));
    }
  }, [dispatch, gameId, navigate]);

  const addNewGame = useCallback(({ maxPlayers }) => {
    const game = {
      author: name,
      players: [],
      maxPlayers
    }
    sendJsonMessage({ type: 'newgame', payload: game });
  }, [name, sendJsonMessage]);

  if (!isAuth) console.log('Втупительная страница для незарегистрированных пользователей');

  return (
    <Main
      isAuth={isAuth}
      usersOnline={usersOnline}
      gamesList={gamesList}
      addNewGame={addNewGame}
    />
  );
}

export default MainContainer;


/* Нужно будет в будущих версиях сделать эту страницу приватной, а стартовую чисто рекламной */