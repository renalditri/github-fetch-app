import React from "react";
import { ErrorMessage } from "../types/types";

type WarningBoxProps = {
  isError: boolean;
  error?: ErrorMessage;
};
const WarningBox = ({ isError, error }: WarningBoxProps) => {
  return (
    <>
      {isError ? (
        <div className="error-container">
          <>
            <span>Error: {error?.data?.message}</span>
          </>
        </div>
      ) : null}
    </>
  );
};

export default WarningBox;
