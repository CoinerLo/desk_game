import { useState, useCallback, useLayoutEffect } from 'react';
import useWebSocket /*{ ReadyState }*/ from 'react-use-websocket';
import { useGetGamesAllQuery } from '../../api';
import { useAuth } from '../../hooks/useAuth';
import { useGetApiUrl } from '../../hooks/useGetApiUrl';
import Main from './Main';

const MainContainer = () => {
  const { isAuth, name, uid } = useAuth();
  const [usersOnline, setUsersOnline] = useState([]);
  const [gamesList, setGamesList] = useState([]);
  const getSocketUrl = useGetApiUrl({ path: '/api/v1/main', protocol: 'ws' });

  const { data } = useGetGamesAllQuery(); // test
  console.log(data); // тест, удалить в будующих версиях
  const {
    sendJsonMessage,
  } = useWebSocket(getSocketUrl, {
    onError: (event) => console.log(event),
    //onOpen: () => console.log('opened'),
    onMessage: (event) => {
      const { type, payload } = JSON.parse(event.data);

      switch (type) {
        case 'users':
          setUsersOnline(payload);
          break;
        case 'games':
          setGamesList(payload);
          break;
        default:
          console.log(`Неизвестный тип от сервера: ${type}`);
      }
      
    },
    //onClose: () => console.log('goodbye'),
    shouldReconnect: () => true,
    filter: () => false,
    share: true,
  });

  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: 'Connecting',
  //   [ReadyState.OPEN]: 'Open',
  //   [ReadyState.CLOSING]: 'Closing',
  //   [ReadyState.CLOSED]: 'Closed',
  //   [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  // }[readyState];

  useLayoutEffect(() => {
    sendJsonMessage({ type: 'userdata', payload: { name, uid }});
    //return () => sendJsonMessage({ type: 'exituser', payload: { uid } });
  }, [sendJsonMessage, uid, name]);

  const addNewGame = useCallback(({ maxPlayers }) => {
    const game = {
      author: name,
      players: [ name ],
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