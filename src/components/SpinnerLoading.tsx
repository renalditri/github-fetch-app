import React from "react";
import Spinner from "../assets/spinner.svg";

type PlaceholderProps = {
  isFetching: boolean;
  isSearch: boolean;
};
const SpinnerLoading = ({ isFetching, isSearch }: PlaceholderProps) => {
  return (
    <div className={isFetching ? "spinner" : "search-warn"}>
      {isFetching && isSearch ? (
        <>
          <img src={Spinner} />
          <span>Loading...</span>
        </>
      ) : (
        <span>Start searching by typing your search words</span>
      )}
    </div>
  );
};

export default SpinnerLoading;
