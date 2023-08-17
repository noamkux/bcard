import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../interfaces/card";
import { getCardById } from "../services/cardService";
import User from "../interfaces/user";
import { getUserByid } from "../services/userServices";
import GoogleMapComponent from "./GoogleMapComponent";

interface CardDetailsProps {}

const CardDetails: FunctionComponent<CardDetailsProps> = () => {
  let [currentCard, setCurrentCard] = useState<Card>();
  let [cardOwner, setCardOwner] = useState<User>();
  let { cardId } = useParams();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardResponse = await getCardById(cardId as string);
        setCurrentCard(cardResponse.data);

        if (cardResponse.data) {
          const userResponse = await getUserByid(cardResponse.data.ownerId as number);
          setCardOwner(userResponse.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [cardId]);
  return (
    <div className="component-container">
      <div className="mx-5 mb-4">
        <h1 className="display-1 header">{currentCard?.title} Details</h1>
      </div>
      <hr className="hr" />
      <div className="row m-0">
        <div className="col-md-6 p-0 ms-3">
          <h5 className="display-5 header">
            {currentCard?.email} - {currentCard?.phone}
          </h5>
          <p className="display-6 fs-4 text">{currentCard?.subtitle}</p>
          <p className="display-6 fs-4 text">{currentCard?.description}</p>
          <p className="text">
            Located at Address :{currentCard?.city}, {currentCard?.street}{" "}
            {currentCard?.houseNumber}, {currentCard?.country}
          </p>
          <div className="map-container">
        <GoogleMapComponent
        
            city={currentCard?.city as string}
            street={currentCard?.street as string}
            houseNumber={currentCard?.houseNumber as string}
            apiKey="AIzaSyBCC0p8BEYu5p51WHCJXpBRaKF93XeLm8I"
          />
          </div>
        </div>
        <div className="col-md-5 p-0">
          <img
          className="cardDetailsImg"
            src={currentCard?.businessImgURL}
            alt={currentCard?.businessImgAlt}
            style={{ width: "100%", height: "50vh", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
