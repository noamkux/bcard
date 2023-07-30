import { FunctionComponent, useEffect } from "react";
import { getUserByEmail } from "../services/userServices";
import User from "../interfaces/user";

interface ProfileProps {
  userInfo: any;
}

const Profile: FunctionComponent<ProfileProps> = ({userInfo}) => {

  
  return (
    <>
    <p>{userInfo.email}</p>
    </>
  );
};

export default Profile;
