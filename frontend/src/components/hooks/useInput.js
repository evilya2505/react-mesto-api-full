import React from 'react';
import useValidation from './useValidation';

export default function useInput(isOpen, initialState, validations) {
  const [value, setValue] = React.useState('');
  const [isOnFocus, setIsOnFocus] = React.useState(false);
  const valid = useValidation(value, validations);

  React.useEffect(() => {
    setIsOnFocus(false);
    setValue(`${initialState}`);
  }, [isOpen, initialState]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  }

  const handleOnFocus = (state) => {
    setIsOnFocus(state);
  }

  return {
    value,
    handleInputChange,
    handleOnFocus,
    isOnFocus,
    ...valid
  }
}
