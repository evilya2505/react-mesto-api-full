import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useInput from './hooks/useInput';

function EditProfilePopup({ onUpdateUser, isLoading, isOpen, onClose }) {
  // Подписывание компонента CurrentUserContext и получение значение контекста
  const currentUser = React.useContext(CurrentUserContext);

  const nameInput = useInput(isOpen, currentUser.name, {isEmpty: true, minLength: 2});
  const descriptionInput = useInput(isOpen, currentUser.about, {isEmpty: true, minLength: 2});

  // Обработчик кнопки сабмита
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: nameInput.value,
      about: descriptionInput.value
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      formName="changeInfo"
      btnText={`${isLoading ? 'Сохранение...' : 'Сохранить'}`}
      ariaLabelText="закрыть окно редактирования профиля"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={(nameInput.inputValid && descriptionInput.inputValid) ? true : false}
    >
      <input
        onChange={nameInput.handleInputChange}
        onFocus={() => {nameInput.handleOnFocus(true)}}
        value={nameInput.value}
        type="text"
        name="name"
        placeholder="Имя"
        className="form__item form__item_el_name"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="form__input-error name-input-error">
        {(nameInput.errorText && nameInput.isOnFocus) && nameInput.errorText}
      </span>
      <input
        onChange={descriptionInput.handleInputChange}
        onFocus={() => {descriptionInput.handleOnFocus(true)}}
        value={descriptionInput.value}
        type="text"
        name="description"
        placeholder="О себе"
        className="form__item form__item_el_occupation"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="form__input-error occupation-input-error">
        {(descriptionInput.errorText && descriptionInput.isOnFocus) && descriptionInput.errorText}
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
