import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Main from './components/Main';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import { useAuth } from './hooks/useAuth';
import styles from './App.module.scss';

const App = () => {
  const { isAuth } = useAuth();

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main} data-testid="html-element-main">
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path="home" element={<Home isAuth={isAuth} />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
