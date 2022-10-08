import {useEffect, useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const imageRef = useRef();
    const titleRef = useRef();

    const handleSubmit = (evt) => {
        evt.preventDefault();

        onAddPlace({
            title: titleRef.current.value, link: imageRef.current.value,
        });
    };

    useEffect(() => {
        titleRef.current.value = '';
        imageRef.current.value = '';
    }, [isOpen]);

    return (<PopupWithForm
        name="card"
        title="Новое место"
        buttonText="Создать"
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={onClose}
    >
        <label className="form__field">
            <input ref={titleRef} type="text" id="card-name-input" className="form__item form__item_type_card-name"
                   name="name"
                   placeholder="Название"
                   required minLength="2" maxLength="30"/>
            <span className="form__item-error card-name-input-error"></span>
        </label>
        <label className="form__field">
            <input ref={imageRef} type="url" id="card-link-input" className="form__item form__item_type_card-link"
                   name="link"
                   placeholder="Ссылка на картинку" required/>
            <span className="form__item-error card-link-input-error"></span>
        </label>
    </PopupWithForm>);
}

export default AddPlacePopup;