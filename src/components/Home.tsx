import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../interfaces/card";
import { deleteCard, getAllCards } from "../services/cardService";
import { Link } from "react-router-dom";
import { handleUserFav } from "../services/favoritesService";
import { getUserByid } from "../services/userServices";
import { SiteTheme } from "../App";

interface HomeProps {
  userInfo: any;
}

const Home: FunctionComponent<HomeProps> = ({ userInfo }) => {
  let [cards, setCards] = useState<Card[]>([]);
  let [dataUpdated, setDataUpdated] = useState<boolean>(false);
  let [favoritesCards, setFavoriteCards] = useState<number[]>();
  let theme = useContext(SiteTheme);
  let render = () => setDataUpdated(!dataUpdated);
  let handleDelete = (id: number) => {
    deleteCard(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    render();
  };

  let handleFav = async (cardId: number) => {
    try {
      const response = await handleUserFav(cardId, userInfo.userId);
      console.log(response);
      render();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCards()
      .then((res) => setCards(res.data))
      .catch((err) => console.log(err));
    getUserByid(userInfo.userId)
      .then((res) => setFavoriteCards(res.data.favCards))
      .catch((err) => console.log(err)); 
      
  }, [dataUpdated]);

  return (
    <>
      <div className={`mx-5 mb-4 text-center header`}>
        <h1 className="display-1">Welcom To BCard</h1>
        <p className="display-6 fs-4">
          Here you can find business and services of all kind, you can take a
          look and find the right professional for your job or advertise your
          own buissnes
        </p>
      </div>
      <hr className="hr" />
      {cards.length ? (
        <div className="container">
          <div className="row">
            {cards.map((card: Card) => (
              <div className="col-md-4 mb-5 " key={card.id}>
                <div className={`card theme${theme}`} style={{ width: "100%" }}>
                  <Link to={`/${card.id}`}>
                    <img
                      src={card.businessImgURL}
                      className="card-img-top"
                      alt={card.businessImgAlt}
                      style={{ height: "8rem", objectFit: "cover" }}
                    />
                  </Link>
                  <div className="card-body">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/${card.id}`}
                    >
                      <h5 className={`card-title text-center theme-text${theme}`}>
                        {card.title.charAt(0).toUpperCase() +
                          card.title.slice(1)}
                      </h5>
                      <p className={`card-text display-6 fs-6 text-center mb-3 theme-text${theme}`}>
                        {card.subtitle}
                      </p>
                    </Link>
                    <p className="card-text">{card.description}</p>
                    <a
                      href={"https://" + card.webSite}
                      target="_blank"
                      className="btn btn-primary w-100"
                    >
                      Go To{" "}
                      {card.title.charAt(0).toUpperCase() + card.title.slice(1)}{" "}
                      Website
                    </a>
                    <div className="card-footer text-center">
                      Address :{card.city}, {card.street} {card.houseNumber},{" "}
                      {card.country}
                      <div className="text-center mt-1">
                        {(userInfo.role === "admin" ||
                          userInfo.userId === card.ownerId) && (
                          <i
                            className="fa-solid fa-trash col-4"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(card.id as number)}
                          ></i>
                        )}
                        {userInfo.email &&(
                        favoritesCards?.includes(card.id as number) ? (
                          <i
                            className="fa-solid fa-heart col-4"
                            onClick={() => handleFav(card.id as number)}
                            style={{ cursor: "pointer", color: "red" }}
                            
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-heart col-4"
                            onClick={() => handleFav(card.id as number)}
                            style={{ cursor: "pointer", color: "black" }}
                          ></i>
                        ))}
                        <Link
                          to={`tel:${card.phone}`}
                          style={{ color: "black" }}
                        >
                          <i className="fa-solid fa-phone col-4"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <p>No cards to display</p>
        </>
      )}
    </>
  );
};

export default Home;
