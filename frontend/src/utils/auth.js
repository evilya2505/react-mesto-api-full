class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _getRequestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // Регистрация пользователя
  register(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password, email
      })
    })
    .then(this._getRequestResult)
  }

  // Проверяет email и пароль пользователя на соответствие какому-либо профилю, хранящемуся в базе данных
  authorization(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password, email
      })
    })
    .then(this._getRequestResult)
  }

  // Проверяет действителен ли токен
  getContent(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${jwt}`
      }
    })
    .then(this._getRequestResult)
  }
}

const auth = new Auth({baseUrl: 'https://api.evilya.nomoredomains.club'});

export default auth;
