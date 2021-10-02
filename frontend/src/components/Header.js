import React from 'react';
import logoPath from '../images/logo.svg';
import { Route, Switch, Link } from 'react-router-dom';

function Header({ location, onSignOut, userEmail }) {
  return (
    <header className="header root__header">
      <Link to="/" className="header__link">
        <img src={logoPath} alt="изображение логотипа" className="header__logo" />
      </Link>
      <nav className="header__nav">
        <ul className="header__list">
          <Switch>
            <Route exact path='/sign-up'>
                <li className="header__list-item">
                  <Link to="/sign-in" className="header__list-link">Войти</Link>
                </li>
            </Route>
            <Route exact path='/'>
              <li className="header__list-item">
                <p className="header__list-text">{userEmail}</p>
              </li>
              <li className="header__list-item">
                <Link onClick={onSignOut} to="/sign-in" className="header__list-link header__list-link_type_exit">Выйти</Link>
              </li>
            </Route>
            <Route exact path='/sign-in'>
            <li className="header__list-item">
                <Link to="/sign-up" className="header__list-link">Регистрация</Link>
              </li>
            </Route>
          </Switch>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
