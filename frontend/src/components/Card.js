import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner === currentUser._id;

    const cardDeleteButtonClassName = (`gallery__delete-btn ${isOwn ? 'gallery__delete-btn_visible' : 'gallery__delete-btn_hidden'}`);

    const isLiked = card.likes.some(i => i === currentUser._id);

    const cardLikeButtonClassName = `gallery__card-button-like ${isLiked ? 'gallery__card-button-like_active' : 'gallery__card-button-like'}`;

    function handleCardClick() {
        onCardClick(card);
    }

    function handleCardLikeClick() {
        onCardLike(card);
    }

    function handleCardDeleteClick() {
        onCardDelete(card);
    }

    return (<li className="gallery__card-item">
        <img src={card.link} alt={card.name} className="gallery__card-img" onClick={handleCardClick}/>
        <div className="gallery__card-description">
            <h2 className="gallery__card-name">{card.name}</h2>
            <div className="gallery__card-like-container">
                <button onClick={handleCardLikeClick} type="button" className={cardLikeButtonClassName}
                        aria-label="Нравится"></button>
                <span className="gallery__card-like-count">{card.likes.length}</span>
            </div>
        </div>
        <button onClick={handleCardDeleteClick} type="button" className={cardDeleteButtonClassName}
                aria-label="Удалить"></button>
    </li>);
}

export default Card;
