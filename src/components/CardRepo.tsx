import React from "react";
import { RepositoryType } from "../types/types";

type CardUserProps = {
  repoData: RepositoryType;
};

const CardUser = ({ repoData }: CardUserProps) => {
  return <div className="card">{repoData.name}</div>;
};

export default CardUser;
