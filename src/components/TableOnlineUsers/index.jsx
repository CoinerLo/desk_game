import { useState, useCallback, useLayoutEffect } from 'react';
import useWebSocket /*{ ReadyState }*/ from 'react-use-websocket';
import { useGetGamesAllQuery } from '../../api';
import TableOnlineUsers from './TableOnlineUsers';
import { useGetApiUrl } from '../../hooks/useGetApiUrl';

const TableOnlineUsersContainer = ({ uid, name }) => {
  const [usersOnline, setUsersOnline] = useState([]);

  const getSocketUrl = useCallback(() =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGetApiUrl({ path: '/api/v1/main', protocol: 'ws' }), []
  );

  const { data } = useGetGamesAllQuery();
  console.log(data); // тест, удалить в будующих версиях
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