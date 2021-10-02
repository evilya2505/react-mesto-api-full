import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteConfirmationForm({ selectedCard, isLoading, isOpen, onClose, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(selectedCard);
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      formName="deleteCard"
      btnText={`${isLoading ? 'Удаление...' : 'Удалить'}`}
      ariaLabelText="закрыть окно удаления карточки"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={true}/>
  )
}

export default DeleteConfirmationForm;
