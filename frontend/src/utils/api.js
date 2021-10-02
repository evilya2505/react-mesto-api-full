class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getRequestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // Получает карточки с сервера
  _getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._getRequestResult);
  }

  // Получает информацию о пользователе с сервера
  _getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._getRequestResult);
  }

  getInitialData() {
    return Promise.all([this._getUserInfo(), this._getInitialCards()]);
  }

  // Добавляет карточку на сервер
  postCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.placeName,
        link: cardData.link
      })
    })
      .then(this._getRequestResult);
  }

  // Удаление карточки с сервера
  deleteCard(cardData) {
    return fetch(`${this._baseUrl}/cards/${cardData._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getRequestResult);
  }

  // Сохранение отредактированной информации о пользователе
  updateUserInfo(newUserInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newUserInfo.name,
        about: newUserInfo.about
      })
    })
    .then(this._getRequestResult);
  }

  // Обновление аватарки на сервере
  updateUserAvatar(newUserAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newUserAvatar.avatar
      })
    })
    .then(this._getRequestResult);
  }

  // Сохранить информацию о том, что поставлен лайк
  putLike(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._getRequestResult);
  }

  // Сохранить информацию о том, что лайк был убран
  removeLike(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getRequestResult);
  }


  changeLikeCardStatus(cardID, isLiked) {
    if (!isLiked) {
      return this.putLike(cardID);
    } else {
      return this.removeLike(cardID);
    }
  }
}

// Создание экземпляра класса Api
const api = new Api({
  baseUrl: 'http://62.84.116.155:3000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;
