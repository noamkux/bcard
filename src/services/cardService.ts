import axios from "axios";
import Card from "../interfaces/card";

let api: string = "http://localhost:8000/cards";

export function getAllCards() {
  return axios.get(api);
}

export function getCardsByUserId(userId: number) {
  return axios.get(`${api}?ownerId=${userId}`);
}

export function deleteCard(idTodelete: number) {
  return axios.delete(`${api}/${idTodelete}`);
}
export function getCardById(id : string){
  return axios.get(`${api}/${id}`)
}

export function updateCardByid(id: string, newCard : Card){
  return axios.put(`${api}/${id}`, newCard)
}

export function postNewCard(cardToPost: Card) {
  return axios.post(api, cardToPost);
}
