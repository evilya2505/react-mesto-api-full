import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer';

function Main({ onEditAvatar, cards, onCardClick, onCardLike, onDeleteBtn, onAddPlace, onEditProfile }) {
  // Подписывание компонента CurrentUserContext и получение значение контекста
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <main className="content root__content">
        {/* Profile Section */}
        <section className="profile content__profile">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img src={currentUser?.avatar} alt="аватарка пользователя"
            className="profile__avatar" />
            <div className="profile__avatar-overlay"></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser?.name}</h1>
            <button aria-label="изменить имя и описание профиля" type="button" className="profile__edit-btn" onClick={onEditProfile}></button>
            <p className="profile__occupation">{currentUser?.about}</p>
          </div>
          <button aria-label="добавить карточку" type="button" className="profile__add-btn" onClick={onAddPlace}></button>
        </section>
        {/* Profile Section */}

        {/* Cards Section */}
        <section className="cards content__cards">
          <ul className="cards__list">
            {Array.isArray(cards) && cards.map(card => {
              return (<Card card={card}
                            onCardClick={onCardClick}
                            key={card._id}
                            onCardLike={onCardLike}
                            onDeleteBtn={onDeleteBtn}/>)
            })
            }
          </ul>
        </section>
        {/* Cards Section */}

      </main>
      <Footer />
    </>
  )
}

export default Main;
