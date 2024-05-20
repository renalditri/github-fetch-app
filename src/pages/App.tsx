import React, { useState } from "react";
import ReactIcon from "../assets/github-mark.svg";
import DebouncedTextInput from "../components/DebouncedTextInput";
import Pagination from "../components/Pagination";
import { RepoCardList } from "../components/RepoCardList";
import SpinnerLoading from "../components/SpinnerLoading";
import { UserCardList } from "../components/UserCardList";
import WarningBox from "../components/WarningBox";
import {
  useGetRepositoryQuery,
  useGetUsersQuery,
} from "../redux/actions/apiSlice";
import { ErrorMessage, ParamsType } from "../types/types";

const objectToParams = (params: ParamsType) => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    searchParams.append(key, params[key as keyof ParamsType]?.toString());
  });
  return searchParams.toString();
};

function App() {
  const [params, setParams] = useState<ParamsType>({
    q: "",
    page: 1,
    per_page: 20,
    sort: "id",
    order: "DESC",
  });
  const [isUser, setIsUser] = useState<boolean>(true);

  const onSearch = (value: string) => {
    setParams({ ...params, q: value });
  };

  const {
    data: dataUser,
    isError: isErrorUser,
    error: errorUser,
    isFetching: isFetchingUser,
  } = useGetUsersQuery(objectToParams(params), {
    skip: params.q === "" && isUser,
  });

  const {
    data: dataRepo,
    isError: isErrorRepo,
    error: errorRepo,
    isFetching: isFetchingRepo,
  } = useGetRepositoryQuery(objectToParams(params), {
    skip: params.q === "" && !isUser,
  });

  const totalItems = isUser ? dataUser?.total_count : dataRepo?.total_count;

  return (
    <div className="app">
      <header className="header">
        <img className="header-img" src={ReactIcon} />
        <div className="header-section">
          <h1>Github Searcher</h1>
          <p>Search users or repositories below</p>
        </div>
      </header>
      <section className="input-container">
        <DebouncedTextInput
          timer={1000}
          placeholder="Type to search"
          onChange={onSearch}
          initValue={params.q}
        />
        <select
          className="select-input"
          onChange={(e) => setIsUser(e.currentTarget.value === "user")}
          defaultValue={isUser ? "user" : "repository"}
        >
          <option value="user">Users</option>
          <option value="repository">Repositories</option>
        </select>
      </section>
      {(isUser ? isErrorUser : isErrorRepo) && params.q !== "" ? (
        <WarningBox
          isError={isUser ? isErrorUser : isErrorRepo}
          error={(isUser ? errorUser : errorRepo) as ErrorMessage}
        />
      ) : (
        <>
          {isFetchingUser || isFetchingRepo || params.q === "" ? (
            <SpinnerLoading
              isFetching={isFetchingUser || isFetchingRepo}
              isSearch={params.q !== ""}
            />
          ) : (
            <section className="card-list">
              {isUser ? (
                <UserCardList data={dataUser?.items} />
              ) : (
                <RepoCardList data={dataRepo?.items} />
              )}
            </section>
          )}
        </>
      )}
      <Pagination
        params={params}
        setParams={setParams}
        totalItems={totalItems ?? 0}
      />
    </div>
  );
}

export default App;
