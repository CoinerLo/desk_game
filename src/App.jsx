import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Main from './components/Main';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import Game from './components/Game';
import GameId from './components/GameId';
import styles from './App.module.scss';

const App = () => {

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main} data-testid="html-element-main">
        <Routes>
          <Route path='/' element={<Main />} />
          <Route
            path="home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path="game" element={<Game />}>
            <Route path=':gameId' element={
              <PrivateRoute>
                <GameId />
              </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
