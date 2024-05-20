import React from "react";
import { UserType } from "../types/types";
import CardUser from "./CardUser";

type UserCardListProps = {
  data?: UserType[];
};

export const UserCardList = ({ data = [] }: UserCardListProps) => {
  return data?.map((user) => (
    <CardUser key={user.id} userData={user as UserType} />
  ));
};
