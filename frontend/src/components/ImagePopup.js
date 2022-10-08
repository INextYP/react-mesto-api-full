function ImagePopup({card, onClose}) {
    return (<div className={`popup popup-image ${card && 'popup_opened'} `}>
        <div className="popup__container">
            <img src={card?.link} alt={card?.name} className="popup__img"/>
            <h3 className="popup__img-heading">{card?.name}</h3>
            <button className="popup__close-button" aria-label="Закрыть" onClick={onClose}></button>
        </div>
    </div>)
}

export default ImagePopup;