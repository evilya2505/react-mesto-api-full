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
  _getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      }
    })
      .then(this._getRequestResult);
  }

  // Получает информацию о пользователе с сервера
  _getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      }
    })
      .then(this._getRequestResult);
  }

  getInitialData(token) {
    return Promise.all([this._getUserInfo(token), this._getInitialCards(token)]);
  }

  // Добавляет карточку на сервер
  postCard(cardData, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: cardData.placeName,
        link: cardData.link
      })
    })
      .then(this._getRequestResult);
  }

  // Удаление карточки с сервера
  deleteCard(cardData, token) {
    return fetch(`${this._baseUrl}/cards/${cardData._id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      }
    })
    .then(this._getRequestResult);
  }

  // Сохранение отредактированной информации о пользователе
  updateUserInfo(newUserInfo, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: newUserInfo.name,
        about: newUserInfo.about
      })
    })
    .then(this._getRequestResult);
  }

  // Обновление аватарки на сервере
  updateUserAvatar(newUserAvatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: newUserAvatar.avatar
      })
    })
    .then(this._getRequestResult);
  }

  // Сохранить информацию о том, что поставлен лайк
  putLike(cardID, token) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      }
    })
    .then(this._getRequestResult);
  }

  // Сохранить информацию о том, что лайк был убран
  removeLike(cardID, token) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      }
    })
    .then(this._getRequestResult);
  }


  changeLikeCardStatus(cardID, isLiked, token) {
    if (!isLiked) {
      return this.putLike(cardID, token);
    } else {
      return this.removeLike(cardID, token);
    }
  }
}

// Создание экземпляра класса Api
const api = new Api({
  baseUrl: 'https://api.evilya.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
