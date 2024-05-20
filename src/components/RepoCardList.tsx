import React from "react";
import { RepositoryType } from "../types/types";
import CardRepo from "./CardRepo";

type RepoCardListProps = {
  data?: RepositoryType[];
};

export const RepoCardList = ({ data = [] }: RepoCardListProps) => {
  return data?.map((repository) => (
    <CardRepo key={repository.id} repoData={repository as RepositoryType} />
  ));
};
