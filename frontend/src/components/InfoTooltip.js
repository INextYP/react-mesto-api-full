import React from "react";

function InfoTooltip({onClose, imageData, isOpen}) {
    return (<div className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__container popup__container_place_info-tooltip">
                <button className="popup__close-button" aria-label="Закрыть" onClick={onClose}></button>
                <img className="infoTooltip__image" src={imageData.url} alt={imageData.title}></img>
                <p className="infoTooltip__title">{imageData.title}</p>
            </div>
        </div>);
}

export default InfoTooltip;