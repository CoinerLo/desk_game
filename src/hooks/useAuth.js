import { useSelector } from 'react-redux';

export function useAuth() {
  const {
    email,
    uid,
    name,
    emailVerified,
    phoneNumber,
    photoURL,
    createdAt,
    token,
    isLoaded,
    errorAuth,
    gameId,
  } = useSelector(state => state.user);

  return {
    isAuth: !!email,
    uid,
    email,
    name,
    emailVerified,
    phoneNumber,
    photoURL,
    createdAt,
    token,
    isLoaded,
    errorAuth,
    gameId,
  };
}
