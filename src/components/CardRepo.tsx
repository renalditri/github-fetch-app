import React from "react";
import GithubIcon from "../assets/github-mark.svg";
import { RepositoryType } from "../types/types";

type CardRepoProps = {
  repoData: RepositoryType;
};

const CardRepo = ({ repoData }: CardRepoProps) => {
  return (
    <a
      href={repoData.html_url}
      target="_blank"
      rel="noreferrer"
      className="card"
    >
      <span>Name: {repoData.name}</span>
      <span>Owner: {repoData.owner?.login}</span>
      <a
        href={repoData.html_url}
        target="_blank"
        rel="noreferrer"
        title="Link to Repository"
      >
        <img className="github-icon" src={GithubIcon} />
      </a>
    </a>
  );
};

export default CardRepo;
