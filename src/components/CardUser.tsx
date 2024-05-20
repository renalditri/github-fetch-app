import React from "react";
import { UserType } from "../types/types";

type CardUserProps = {
  userData: UserType;
};

const CardUser = ({ userData }: CardUserProps) => {
  return (
    <div className="card">
      <img src={userData.avatar_url} />
      {userData.login}
    </div>
  );
};

export default CardUser;
