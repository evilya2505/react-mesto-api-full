import React from 'react';

export default function useValidation(value, validations) {
  const [isEmpty, setEmpty] = React.useState(true);
  const [minLengthError, setMinLengthError] = React.useState(false);
  const [isEmailError, setEmailError] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [inputValid, setInputValid] = React.useState(false);

  React.useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          if (value) {
            setEmpty(false);
            setErrorText('');
          } else {
            setEmpty(true)
            setErrorText('Обязательное поле');
            return
          }
          break;

        case 'minLength':
          if (value.length < validations[validation]) {
            setMinLengthError(true)
            setErrorText('Минимальная длина строки 2');
          } else {
            setMinLengthError(false);
            setErrorText('');
          }
          break;

        case 'isEmail':
          const re = /^(ftp|http|https):\/\/[^ "]+$/;
          if (re.test(String(value).toLowerCase())) {
            setErrorText('');
            setEmailError(false);
          } else {
            setErrorText('Пожалуйста, введите корректный email-адрес');
            setEmailError(true);
          }
          break;

        default:
          break;
      }
    }
  }, [value, validations]);

  React.useEffect(() => {
    if (isEmpty || minLengthError || isEmailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, isEmailError]);

  return {
    errorText,
    inputValid
  }
}
