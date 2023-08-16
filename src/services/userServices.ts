import axios from "axios";
import User from "../interfaces/user";

let api: string = "http://localhost:8000/users";

export function checkUser(userToCheck: User) {
  return axios.get(
    `${api}?email=${userToCheck.email}&password=${userToCheck.password}`
  );
}

export function getAllUsers() {
  return axios.get(api);
}

export function getUserByid(id: number) {
  return axios.get(`${api}/${id}`);
}

export function addUser(userToAdd: User) {
  return axios.post(api, userToAdd);
}

export function updateUserById(userId: number, updatedUser: User) {
  return axios.put(`${api}/${userId}`, updatedUser);
}

export function deleteUser(idToDelete: number) {
  return axios.delete(`${api}/${idToDelete}`);
}

export function getUserByEmail(email: string) {
  return axios.get(`${api}?email=${email}`);
}


