import User from "../interfaces/user";
import Card from "../interfaces/card";
import axios from "axios";
import { getUserByid, updateUserById } from "./userServices";
import { updateCardByid } from "./cardService";
import { errorMsg, infoMsg, successMsg } from "./feedbackService";

let api: string = "http://localhost:8000/users";

export async function handleUserFav(cardId: number, userId: number) {
  try {
    const res = await getUserByid(userId);
    if (res.data) {
      if (!res.data.favCards) {
        res.data.favCards = [];
      }
      if (!res.data.favCards.includes(cardId)) {
        res.data.favCards.push(cardId);
        await updateUserById(userId, res.data);
        return successMsg("Add To Favorites")
      } else {
        const indexToRemove: number = res.data.favCards.indexOf(cardId);
        if (indexToRemove !== -1) {
          res.data.favCards.splice(indexToRemove, 1);
          await updateUserById(userId, res.data);
          infoMsg("Card removed from Favorrites")
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}
