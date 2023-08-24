import { FunctionComponent, useContext, useEffect, useState } from "react";
import User from "../interfaces/user";
import { deleteUser, getAllUsers } from "../services/userServices";
import EditRole from "./EditRoleModal";
import { getCardsByUserId } from "../services/cardService";
import { SiteTheme } from "../App";
import EditRoleModal from "./EditRoleModal";

interface SandboxProps {
  userInfo: any;
}

const Sandbox: FunctionComponent<SandboxProps> = ({ userInfo }) => {
  let [users, setUsers] = useState<User[]>([]);
  const [postedCards, setPostedCards] = useState<{ [key: number]: number }>({});
  let theme = useContext(SiteTheme);
  let [dataUpdated, setDataUpdated] = useState<boolean>(false);
  let render = () => setDataUpdated(!dataUpdated);

  let handleDelete = (id: number) => {
    deleteUser(id)
      .then((res) => {
        render();
      })
      .catch((err) => console.log(err));
  };

  console.log(userInfo);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, [dataUpdated]);

  useEffect(() => {
    users.map((user: User) =>
      getCardsByUserId(user.id as number)
        .then((res) => {
          setPostedCards((prevPostedCards) => ({
            ...prevPostedCards,
            [user.id as number]: res.data.length,
          }));
        })
        .catch((err) => console.log("error"))
    );
  }, [users]);

  return (
    <div className="component-container">
      <div className="mx-5 mb-4 text-center header">
        <h1 className="display-1">Sandbox</h1>
        <p className="display-6 fs-4">
          Here you can edit the users of the website, change premetions and see
          statistics
        </p>
      </div>
      <hr className="hr" />
      <div className="container">
        {users.length ? (
          <table
            className={`${theme == "-dark" ? "table table-dark" : "table"}`}
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User Name</th>
                <th scope="col">Role</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Card Posted</th>
                <th scope="col">Edit Role</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User, index: number) => (
                <tr key={user.id}>
                  <td scope="row">{index + 1}</td>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{postedCards[user.id as number]}</td>
                  <td>
                    <EditRoleModal
                      userId={user.id as number}
                      dataUpdated={dataUpdated}
                      setDataUpdated={setDataUpdated}
                    />
                  </td>
                  <td>
                    {userInfo.userId == user.id ? (
                      <>
                        <i
                          className="ms-2 fa-solid fa-trash col-4"
                          title="you can't delete yourself"
                          style={{ cursor: "not-allowed" }}
                        ></i>
                      </>
                    ) : (
                      <i
                        className="ms-2 fa-solid fa-trash col-4"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(user.id as number)}
                      ></i>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="display-3 fs-2 text-center">
            it seems you haven't posted any card yet, click the add a new card
            button to post your business
          </h2>
        )}
      </div>
    </div>
  );
};

export default Sandbox;
