import {useEffect, useState} from "react";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import * as authApi from "../utils/authApi";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import imageSuccess from "../image/imageSuccess.svg";
import imageFail from "../image/imageFail.svg";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const [tooltipStatus, setTooltipStatus] = useState({url: "", title: ""});
    const [userData, setUserData] = useState('');
    const history = useHistory();

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = () => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            api
                .getUserInfo(jwt)
                .then((user) => {
                    setLoggedIn(true);
                    history.push("/");
                    setCurrentUser(user.data);
                })
                .catch((e) => console.error(e.message));
            api
                .getInitialCards(jwt)
                .then((cards) => {
                    setCards(cards);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    //useEffect(() => {
        //if (loggedIn === true) {



        //}
    //}, [loggedIn]);

    // useEffect(() => {
    //     const jwt = localStorage.getItem("jwt");
    //     //if(jwt)   {
    //         authApi.getContent(jwt)
    //             .then((res) => {
    //                 setLoggedIn(true);
    //                 setUserData(res.data.email);
    //                 //localStorage.setItem("jwt", res.token);
    //                 history.push("/")
    //             }).catch((err) => {
    //             localStorage.removeItem('jwt');
    //             console.log(`Ошибка: ${err}`)
    //         });
    //     //}
    //
    // }, [history])

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };

    function handleCardClick({name, link}) {
        setSelectedCard({name, link});
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            });

    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            });
    }

    const handleUpdateUser = (data) => {
        api
            .setUserInfo(data)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            });
    };

    const handleUpdateAvatar = (data) => {
        api
            .editProfileAvatar(data)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    };

    const handleAddPlaceSubmit = (data) => {
        api
            .addNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    };

    function handleInfoTooltipClick() {
        setIsInfoTooltipPopupOpen(true);
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
        setIsInfoTooltipPopupOpen(false);
    }

    const handleRegistrationUser = (data) => {
        authApi
            .registration(data)
            .then(() => {
                    handleInfoTooltipClick();
                    history.push("/signin");
                    setTooltipStatus({
                        url: imageSuccess, title: "Вы успешно зарегистрировались!",
                    });
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
                handleInfoTooltipClick();
                setTooltipStatus({
                    url: imageFail, title: "Что-то пошло не так! Попробуйте ещё раз.",
                });
            });
    };

    const handleLoginUser = (data) => {
        return authApi
            .authorization(data)
            .then((res) => {
                    localStorage.setItem("jwt", res.token);
                    setLoggedIn(true);
                    setCurrentUser(res);
                    // console.log(res);
                    // setUserData(data.email);
                    history.push("/");
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
                handleInfoTooltipClick();
                setTooltipStatus({
                    url: imageFail, title: "Что-то пошло не так! Попробуйте ещё раз.",
                });
            });
    };

    // useEffect(() => {
    //     const token = localStorage.getItem("jwt");
    //     Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
    //         .then(([user, cards]) => {
    //             setLoggedIn(true);
    //             setCurrentUser(user);
    //             setUserData(user.data.user.email);
    //             setCards(cards);
    //         })
    //         .catch((err) => {
    //             console.log(`Ошибка: ${err}`)
    //         });
    // }, [])

    const signOut = () => {
        localStorage.removeItem("jwt");
        setLoggedIn(false);
        history.push("/signin");
    };

    return (<CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            <Switch>
                <ProtectedRoute exact path="/" loggedIn={loggedIn}>
                    <Header link="login" onClick={signOut}
                            linkText="Выйти"
                            userData={userData}/>

                    <Main onCardClick={handleCardClick}
                          onEditProfile={handleEditProfileClick}
                          onAddPlace={handleAddPlaceClick}
                          onEditAvatar={handleEditAvatarClick}
                          cards={cards}
                          onCardLike={handleCardLike}
                          onCardDelete={handleCardDelete}/>
                </ProtectedRoute>

                <Route path="/signin">
                    <Header link="/signup" linkText="Регистрация"/>
                    <div className="loginContainer">
                        <Login handleLogin={handleLoginUser}/>
                    </div>
                </Route>

                <Route path="/signup">
                    <Header link="login" linkText="Войти"/>
                    <div className="registerContainer">
                        <Register handleRegister={handleRegistrationUser}/>
                    </div>
                </Route>

                <Route path="/">
                    {loggedIn ? <Redirect to="/"/> : <Redirect to="/signin"/>}
                </Route>

            </Switch>

            <Route>{loggedIn && <Footer/>}</Route>

            <EditProfilePopup isOpen={isEditProfilePopupOpen}
                              onClose={closeAllPopups}
                              onUpdateUser={handleUpdateUser}/>

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                             onClose={closeAllPopups}
                             onUpdateAvatar={handleUpdateAvatar}/>

            <AddPlacePopup isOpen={isAddPlacePopupOpen}
                           onClose={closeAllPopups}
                           onAddPlace={handleAddPlaceSubmit}/>

            <ImagePopup card={selectedCard}
                        onClose={closeAllPopups}/>

            <InfoTooltip isOpen={isInfoTooltipPopupOpen}
                         onClose={closeAllPopups}
                         imageData={tooltipStatus}/>
        </div>
    </CurrentUserContext.Provider>)
}

export default App;
