import React from 'react';
import PopupWithForm from './PopupWithForm';
import useInput from './hooks/useInput';

function EditAvatarPopup({ isOpen, onSubmit, onClose, isLoading }) {
  const urlInput = useInput(isOpen, '', {isEmpty: true, isEmail: true});

  // Обработчик кнопки сохранения
  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({avatar: urlInput.value});
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      formName="updateAvatar"
      btnText={`${isLoading ? 'Сохранение...' : 'Сохранить'}`}
      ariaLabelText="закрыть окно обновления аватарки"
      isOpen={isOpen}
      onClose={onClose}
      isValid={urlInput.inputValid ? true : false}
    >
      <input
        value={urlInput.value}
        onChange={urlInput.handleInputChange}
        onFocus={() => {urlInput.handleOnFocus(true)}}
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        className="form__item form__item_el_avatar"
        required
      />
      <span className="form__input-error avatar-input-error">
        {(urlInput.isOnFocus && urlInput.errorText) && urlInput.errorText}
      </span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
