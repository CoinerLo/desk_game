import { useState, useCallback, useLayoutEffect } from 'react';
import useWebSocket /*{ ReadyState }*/ from 'react-use-websocket';
import { useGetGamesAllQuery } from '../../api';
import TableOnlineUsers from './TableOnlineUsers';

const TableOnlineUsersContainer = ({ uid, name }) => {
  const [usersOnline, setUsersOnline] = useState([]);
  const host = process.env.REACT_APP_SERVER_HOST ?? window.location.hostname;
  const port = process.env.REACT_APP_SERVER_PORT ?? 8080;
  const getSocketUrl = useCallback(() => `ws://${host}:${port}/api/v1/main`, [host, port]);
  const { data } = useGetGamesAllQuery();
  console.log(data)
  const {
    sendJsonMessage,
  } = useWebSocket(getSocketUrl, {
    onError: (event) => console.log(event),
    //onOpen: () => console.log('opened'),
    onMessage: (event) => setUsersOnline(JSON.parse(event.data)),
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
    sendJsonMessage({ type: 'adduser', payload: { name, uid }});
    return () => sendJsonMessage({ type: 'exituser', payload: { uid } });
  }, [sendJsonMessage, uid, name]);

  return (
    <TableOnlineUsers usersOnline={usersOnline} />
  );
}

export default TableOnlineUsersContainer;


/*реализовать пинг сервера для разрыва соединения и корректировки списка юзеров*/