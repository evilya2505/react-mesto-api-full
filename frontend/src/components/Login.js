import React from 'react';
import useInput from './hooks/useInput';

export default function Login({ onLogin }) {
  const emailInput = useInput(true, '', {isEmpty: true, isEmail: true});
  const passwordInput = useInput(true, '', {isEmpty: true});

  function handleSubmit(e) {
    e.preventDefault();

    onLogin(passwordInput.value, emailInput.value);
  }

  return (
    <section className="login">
      <form className="form form-auth" name="login" onSubmit={handleSubmit}>
        <h1 className="form__title form__title_type_auth">Вход</h1>
        <fieldset className="form__input-container">
          <input
          value={emailInput.value}
          onChange={emailInput.handleInputChange}
          type="email"
          name="email"
          placeholder="Email"
          className="form__item form__item_type_auth form__item_el_email"
          required />
          <span className="form__input-error email-input-error">
          </span>
          <input
            value={passwordInput.value}
            onChange={passwordInput.handleInputChange}
            type="password"
            name="password"
            placeholder="Пароль"
            className="form__item form__item_type_auth form__item_el_password"
            required />
          <span className="form__input-error password-input-error">
          </span>
          <button type="submit" className="form__save-btn form__save-btn_type_auth">Войти</button>
        </fieldset>
      </form>
    </section>
  )
}
