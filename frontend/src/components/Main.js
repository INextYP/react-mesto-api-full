import {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    return (<main className="content">
        <section className="profile">
            <div className="profile__container">
                <div onClick={props.onEditAvatar} className="profile__avatar"
                     style={{backgroundImage: `url(${currentUser.avatar})`}}></div>
                <div className="profile__data-container">
                    <div className="profile__about">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                    <button onClick={props.onEditProfile} type="button" className="profile__edit-button"
                            aria-label="Изменить"></button>
                </div>
            </div>
            <button onClick={props.onAddPlace} type="button" className="profile__add-button"
                    aria-label="Добавить"></button>
        </section>
        <section className="gallery">
            <ul className="gallery__cards">
                {props.cards.map(card => (<Card key={card._id} card={card} onCardClick={props.onCardClick}
                                                onCardLike={props.onCardLike}
                                                onCardDelete={props.onCardDelete}/>))}
            </ul>
        </section>
    </main>)
}

export default Main