import React, { useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
  const { type, ...restParams } = params;
  const searchParams = new URLSearchParams();
  Object.keys(restParams).forEach((key) => {
    searchParams.append(
      key,
      restParams[key as keyof Omit<ParamsType, "type">]?.toString()
    );
  });
  return searchParams.toString();
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const params: ParamsType = useMemo(() => {
    return {
      q: searchParams.get("q") ?? "",
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      per_page: searchParams.get("perPage")
        ? Number(searchParams.get("perPage"))
        : 20,
      sort: searchParams.get("sort") ?? "id",
      order: searchParams.get("order") ?? "DESC",
      type: searchParams.get("type") ?? "user",
    };
  }, [searchParams]);

  const isUser = useMemo(
    () =>
      searchParams.has("type") ? searchParams.get("type") === "user" : true,
    [searchParams]
  );

  const setParams = (params: ParamsType) => {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      searchParams.append(
        key,
        params?.[key as unknown as keyof ParamsType]?.toString() ?? ""
      );
    });
    navigate({ pathname: location.pathname, search: searchParams?.toString() });
  };

  const onSearch = (value: string) => {
    setParams({ ...params, q: value });
  };

  const {
    data: dataUser,
    isError: isErrorUser,
    error: errorUser,
    isFetching: isFetchingUser,
  } = useGetUsersQuery(objectToParams(params), {
    skip: params.q === "" || !isUser,
  });

  const {
    data: dataRepo,
    isError: isErrorRepo,
    error: errorRepo,
    isFetching: isFetchingRepo,
  } = useGetRepositoryQuery(objectToParams(params), {
    skip: params.q === "" || isUser,
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
          onChange={(e) =>
            setParams({ ...params, type: e.currentTarget.value })
          }
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
