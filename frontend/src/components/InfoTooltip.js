import React from 'react';
import failPath from '../images/Fail.png'
import successPath from '../images/Success.png'


export default function InfoTooltip({ onClose, isOpen, isSuccessed, text, imgAlt }) {
  // Закрытие попапа по клику на overlay
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div onClick={handleOverlayClick} className={isOpen === true ? `popup popup-tooltip popup_opened` :  `popup popup-tooltip`}>
    <div className="popup__container popup-tooltip__container">
    <button onClick={onClose} aria-label="Закрыть всплывающее окно" type="button" className="popup__close-btn" ></button>
      <img alt={imgAlt} src={isSuccessed ? successPath : failPath} className="popup-tooltip__image"/>
      <p className="popup-tooltip__text">{text}</p>
    </div>
  </div>
  )
}
