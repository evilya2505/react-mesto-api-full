import React from 'react';

function PopupWithForm({ isValid, formName, onClose, isOpen, name, btnText, children, ariaLabelText, title, onSubmit }) {
  // Закрытие попапа по клику на overlay
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div onClick={handleOverlayClick} className={isOpen === true ? `popup popup-${name} popup_opened` :  `popup popup-${name}`}>
      <div className="popup__container">
      <button onClick={onClose} aria-label={ariaLabelText} type="button" className="popup__close-btn" ></button>
        <form onSubmit={onSubmit} name={`${formName}`} className={`form popup__form form-${name}`} noValidate>
          <h2 className="form__title">{title}</h2>
          <fieldset className={name === 'delete' ? 'form__input-container form__input-container_type_delete ' : 'form__input-container'}>
            {children}
            <button type="submit" className={isValid ? `form__save-btn` : `form__save-btn form__save-btn_disabled`}>{btnText}</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
