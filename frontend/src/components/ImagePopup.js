import React from 'react';

function ImagePopup({ onClose, card, isOpen }) {
  // Закрытие попапа по клику на overlay
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div onClick={handleOverlayClick} className={isOpen === true ? `popup popup-photo popup_opened` :  `popup popup-photo`}>
      <div className="popup__container popup-photo__container">
        <button aria-label="закрыть фотографию" type="button" className="popup__close-btn popup-photo__close-btn" onClick={onClose}></button>
        <div className="popup-photo__image-container">
          <img src={card.link} alt="изображение" className="popup-photo__image" />
          <p className="popup-photo__title">{card.name}</p>
        </div>
      </div>
    </div>
  )
}

export default ImagePopup;
