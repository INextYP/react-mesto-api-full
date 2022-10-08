function PopupWithForm({name, title, buttonText, children, isOpen, onClose, onSubmit}) {
    return (<div className={`popup popup-${name} ${isOpen && 'popup_opened'}`}>
        <div className="popup__container">
            <form className={`form form_place_${name}`} name={`${name}`} onSubmit={onSubmit} noValidate>
                <h2 className="form__heading">{title}</h2>
                <fieldset className="form__input-container">
                    {children}
                    <button type="submit" className="form__submit-button">{buttonText}</button>
                </fieldset>
            </form>
            <button className="popup__close-button" aria-label="Закрыть" onClick={onClose}></button>
        </div>
    </div>)
}

export default PopupWithForm;