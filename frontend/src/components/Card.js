import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ onCardLike, onDeleteBtn, card, onCardClick }) {
  // Подписывание компонента CurrentUserContext и получение значение контекста
  const currentUser = React.useContext(CurrentUserContext);
  // Проверяет, является ли текущий пользователь владельцем карточки
  const isOwn = card.owner._id === currentUser._id;
  // Проверяет, есть ли среди лайков лайк текущего пользователя
  const isLikedByCurrentUser = card.likes.some(i => i._id === currentUser._id);

  // В зависимости от значения isOwn показывает/скрывает кнопку удаления карточки
  const cardDeleteButtonClassName = (
  `${isOwn ? 'card__delete-btn' : 'card__delete-btn card__delete-btn_hidden'}`
  );
  // В зависимости от значения isLikedByCurrentUser решает закрашивать кнопку лайка или нет
  const cardLikeClassName = (
    `${!isLikedByCurrentUser ? 'card__like-btn' : 'card__like-btn card__like-btn_active'}`
  )

  // Обработчик клика по лайку
  function handleLikeClick(card) {
    onCardLike(card);
  }
  // Обработчик клика по кнопке удаления карточки
  function handleDeleteClick(card) {
    onDeleteBtn(card);
  }

  return (
    <li className="card">
      <img
        src={card.link}
        alt={`изображение ${card.name}`}
        className="card__image"
        onClick={() => {onCardClick({name: card.name, link: card.link})}}/>
      <button
        aria-label="удалить карточку"
        className={cardDeleteButtonClassName}
        onClick={() => {handleDeleteClick(card)}}></button>
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-area">
          <button
            aria-label="поставить лайк"
            type="button"
            className={cardLikeClassName}
            onClick={() => {handleLikeClick(card)}}></button>
          <span className="card__likes-amount">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;
