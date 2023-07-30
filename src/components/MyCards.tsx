import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/card";
import { deleteCard, getCardsByUserId } from "../services/cardService";
import { Link } from "react-router-dom";

interface MyCardsProps {
  userInfo: any;
}

const MyCards: FunctionComponent<MyCardsProps> = ({userInfo}) => {
  let [userCards, setUserCards] = useState<Card[]>([]);
  let [dataUpdated, setDataUpdated] = useState<boolean>(false);
  let render = () => setDataUpdated(!dataUpdated);

  let handleDelete = (id: number) => {
    deleteCard(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      render()
  }

  useEffect(() => {
    getCardsByUserId(userInfo.userId)
      .then((res) => setUserCards(res.data))
      .catch((err) => console.log(err));
  }, [dataUpdated]);


  return (
    <>
      <div className="mx-5 mb-4 text-center">
        <h1 className="display-1">My Cards</h1>
        <p className="display-6 fs-4">
          Here you can edit the card you posted and more if nedeed
        </p>
      </div>
      <hr className="hr" />
      <div className="container">
      <Link to={"/addnewcard"} className="mb-3 btn btn-success"><i className="fa-solid fa-plus"></i> Add New Card
      </Link>
        {userCards.length ? (<table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Post Title</th>
              <th scope="col">Posted At</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {userCards.map((card: Card, index: number) => (
              
                <tr key={card.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{card.title}</td>
                  <td>{card.postDate}</td>
                  <td>
                    <i
                      className="ms-2 fa-solid fa-file-pen"
                    style={{cursor : "pointer"}}
                    ></i>
                  </td>
                  <td>
                    <i className="ms-2 fa-solid fa-trash col-4"
                    style={{cursor : "pointer"}}
                    onClick={() => handleDelete(card.id as number)}></i>
                  </td>
                </tr>
              
            ))}
          </tbody>
        </table>) : (
          <h2 className="display-3 fs-2 text-center">it seems you haven't posted any card yet, click the add a new card button to post your business</h2>
        )}
        
      </div>
    </>
  );
};

export default MyCards;
