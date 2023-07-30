import { FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../interfaces/card";
import { getCardById } from "../services/cardService";

interface CardDetailsProps {}

const CardDetails: FunctionComponent<CardDetailsProps> = () => {
    
//   let currentCard: Card = series.find((s) => s.rank == Number(rank)) as Series;
  let [currentCard, setCurrentCard] = useState<Card>()
  let { cardId } = useParams();
  getCardById(cardId as string)
  .then((res) => setCurrentCard(res.data))

  return <>This is CardDetails
  {currentCard?.id}
  </>;
};

export default CardDetails;
