
import React from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import DeleteConfirmationForm from './DeleteConfirmationForm';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import auth from '../utils/auth';

function App() {
  // Переменные состояния, отвечающие за видимость попапов
  const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpenState] = React.useState(false);
  const [isDeletingPopupOpen, setDeletingPopupState] = React.useState(false);
  const [isTooltipPopupOpen, setTooltipPopupState] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});

  // Переменные состояния, отвечающие за данные пользователя и карточки
  const [currentUser, setCurrentUser] = React.useState({name:'', about: '', avatar: '', _id: '', cohort: ''});
  const [userEmail, setUserEmail] = React.useState('');
  const [cards, setCards] = React.useState([]);

  // Стейт-переменная, отвечающая за состояние загрузки
  const [isLoading, setIsLoading] = React.useState(false);

  // Стейт-переменная, содержит информацию о статусе пользователя - вошел он в систему или нет
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Стейт-переменная, содержит информацию о том, успешно ли прошла регистрация или вход или нет
  const [isSuccessed, setIsSuccessed] = React.useState(false);

  // Хранит токен текущего пользователя
  const [token, setToken] = React.useState('');

  const history = useHistory();
  const location = useLocation();

  // Эффект, вызываемый при монтировании компонента, совершает запрос в API за пользовательскими данными
  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialData(token)
      .then(([ userData, cardsData ]) => {
        cardsData.data.reverse();

        setCurrentUser(userData.data);
        setCards(cardsData.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },[loggedIn, token]);

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token');
      setToken(jwt);
      // Прооверяет, действителен ли токен и возвращает email пользователя
      auth.getContent(jwt)
      .then((data) => {
        setLoggedIn(true);
        setUserEmail(data.data.email);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn, history]);

  // Закрытие попапов
  function closeAllPopups() {
    switch(true) {
      case isEditProfilePopupOpen:
        setEditProfilePopupState(false);
        break;

      case isAddPlacePopupOpen:
        setAddPlacePopupState(false);
        break;

      case isEditAvatarPopupOpen:
        setEditAvatarPopupState(false);
        break;

      case isImagePopupOpen:
        setImagePopupOpenState(false);
        setSelectedCard({name: '', link: ''});
        break;

      case isDeletingPopupOpen:
        setDeletingPopupState(false);
        setSelectedCard({name: '', link: ''});
        break;

      case isTooltipPopupOpen:
        setTooltipPopupState(false);
        break;

      default:
        break;
    }
  }

  // Обработчик клика по кнопке редактрования аватара
  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }

  // Обработчик клика по кнопке редактирования профиля
  function handleEditProfileClick() {
    setEditProfilePopupState(true);
  }

  // Обработчика клика по кнопке добавления карточки
  function handleAddPlaceClick() {
    setAddPlacePopupState(true);
  }

  // Обработчик клика по кнопке удаление карточки
  function handleDeleteCardClick(cardData) {
    setDeletingPopupState(true);
    setSelectedCard(cardData);
  }

  // Обработчик клика на изображение карточки
  function handleCardClick(cardData) {
    setSelectedCard(cardData);
    setImagePopupOpenState(true);
  }


  // Обработчик сохранения новых данных пользователя
  function handleUpdateUser(userData) {
    setIsLoading(true);

    api.updateUserInfo(userData, token)
      .then((data) => {
        const newUserData = data.data;

        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked, token)
      .then((data) => {
        const newCard = data.data;
        // Создает новый массив с заменой измененной карточки на новую
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);

    api.deleteCard(card, token)
      .then(() => {
        // Создает копию массива без удаленной карточки
        setCards((state) => state.filter((c) => c._id !== card._id));

        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Обработчик обновления аватара
  function handleAvatarUpate(url) {
    setIsLoading(true);

    api.updateUserAvatar(url, token)
      .then((data) => {
        setCurrentUser(data.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Обработчик добавления новой карточки
  function handleAddPlaceSubmit(newCardData) {
    setIsLoading(true);

    api.postCard(newCardData, token)
      .then((data) => {
        const newCard = data.data;

        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Обработчик кнопки регистрации
  function handleRegisterSubmit(password, email) {
    auth.register(password, email)
      .then((data) => {
        setTooltipPopupState(true);
        setIsSuccessed(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setTooltipPopupState(true);
        setIsSuccessed(false);
      })
  }

  // Обработчик кнопки "Войти"
  function handleLoginSubmit(password, email) {
    auth.authorization(password, email)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem('token', data.token);
      })
      .catch((err) => {
        console.log(err);
        setTooltipPopupState(true);
        setIsSuccessed(false);
      })
  }

  // Обработчик кнопки "Выйти"
  function handleSignOutLink() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header location={location} userEmail={userEmail} onSignOut={handleSignOutLink}/>
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onDeleteBtn={handleDeleteCardClick} />
          <Route exact path="/sign-up">
            <Register
              onRegister={handleRegisterSubmit}/>
          </Route>
          <Route exact path="/sign-in">
            <Login
              onLogin={handleLoginSubmit}/>
          </Route>
        </Switch>

        <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading} />
          <EditAvatarPopup
            onSubmit={handleAvatarUpate}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            isLoading={isLoading} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading} />
          <ImagePopup card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen}/>
          <DeleteConfirmationForm
            onClose={closeAllPopups}
            isOpen={isDeletingPopupOpen}
            isLoading={isLoading}
            onSubmit={handleCardDelete}
            selectedCard={selectedCard}/>
          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isTooltipPopupOpen}
            imgAlt={isSuccessed ? 'Изображение "успешно"' : 'Изображение "не успешно"'}
            text={isSuccessed ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

