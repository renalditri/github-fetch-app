import React from "react";
import GithubIcon from "../assets/github-mark.svg";
import { UserType } from "../types/types";

type CardUserProps = {
  userData: UserType;
};

const CardUser = ({ userData }: CardUserProps) => {
  return (
    <a
      href={userData.html_url}
      target="_blank"
      rel="noreferrer"
      className="card"
    >
      <img className="profile" src={userData.avatar_url} />
      <span title={userData.login}>{userData.login}</span>
      <a
        href={userData.html_url}
        target="_blank"
        rel="noreferrer"
        title="Link to Github Profile"
      >
        <img className="github-icon" src={GithubIcon} />
      </a>
    </a>
  );
};

export default CardUser;
