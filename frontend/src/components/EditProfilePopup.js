import {useContext, useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleNameChange = (evt) => {
        setName(evt.target.value);
    };

    const handleDescriptionChange = (evt) => {
        setDescription(evt.target.value);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        onUpdateUser({
            name, about: description,
        });
    };

    useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [currentUser, isOpen]);

    return (<PopupWithForm
            name="profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__field">
                <input type="text" id="user-name-input" className="form__item form__item_type_user-name"
                       name="userName"
                       placeholder="Имя"
                       required minLength="2" maxLength="40" value={name} onChange={handleNameChange}/>
                <span className="form__item-error user-name-input-error"></span>
            </label>
            <label className="form__field">
                <input type="text" id="user-description-input"
                       className="form__item form__item_type_user-description" name="userDescription"
                       placeholder="Подпись" required minLength="2" maxLength="200" value={description}
                       onChange={handleDescriptionChange}/>
                <span className="form__item-error user-description-input-error"></span>
            </label>
        </PopupWithForm>);
}

export default EditProfilePopup;