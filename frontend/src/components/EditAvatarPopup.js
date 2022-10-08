import {useEffect, useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = useRef();

    const handleSubmit = (evt) => {
        evt.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    };

    useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    return (<PopupWithForm
            name="avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__field">
                <input type="url"
                       id="avatar-link-input"
                       className="form__item form__item_type_avatar-link"
                       name="avatarLink"
                       placeholder="Ссылка на аватар" ref={avatarRef}
                       required/>
                <span className="form__item-error avatar-link-input-error"></span>
            </label>
        </PopupWithForm>);
}

export default EditAvatarPopup;