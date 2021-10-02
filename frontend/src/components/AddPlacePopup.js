import React from 'react';
import PopupWithForm from './PopupWithForm';
import useInput from './hooks/useInput';

function AddPlacePopup({ isOpen, onAddPlace, isLoading, onClose }) {
  const placeNameInput = useInput(isOpen, '', {isEmpty: true, minLength: 2});
  const linkInput = useInput(isOpen, '', {isEmpty: true, isEmail: true});

  // Обработчик кнопки сохранения
  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({link: linkInput.value, placeName: placeNameInput.value});
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="add" title="Новое место"
      formName="addCard"
      btnText={`${isLoading ? 'Создание...' : 'Создать'}`}
      ariaLabelText="закрыть окно добавление карточки"
      isOpen={isOpen}
      onClose={onClose}
      isValid={(placeNameInput.inputValid && linkInput.inputValid) ? true : false}>
      <input
        onChange={placeNameInput.handleInputChange}
        onFocus={() => {placeNameInput.handleOnFocus(true)}}
        type="text"
        name="placeName"
        placeholder="Название"
        className="form__item form__item_el_place-name"
        minLength="2"
        maxLength="30"
        value={placeNameInput.value}
        required
      />
      <span className="form__input-error placeName-input-error">
        {(placeNameInput.isOnFocus && placeNameInput.errorText) && placeNameInput.errorText}
      </span>
      <input
        onChange={linkInput.handleInputChange}
        onFocus={() => {linkInput.handleOnFocus(true)}}
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        className="form__item form__item_el_link"
        value={linkInput.value}
        required
      />
      <span className="form__input-error link-input-error">
        {(linkInput.isOnFocus && linkInput.errorText) && linkInput.errorText}
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
