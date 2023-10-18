import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as api from '../api';
import { verifyRo } from "@backend/dto/ro";
import { toast } from "react-toastify";
import { ErrorPage } from "../pages/ErrorPage";

export const Verified = ({ children }: {children: ReactNode}) => {
  const [errored, setErrored] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const { code } = useParams();

  useEffect(() => {
    if(code === undefined) {
      setErrored(true);
      setErrorMessage("Sorry, don't know where you landed!");
      return;
    }
    api.getVerify(code).then((data: verifyRo | api.ErrorResponse) => {
      if(data instanceof api.ErrorResponse) {
        toast.error("Server Error");
        console.log(data.message);
        setErrored(true);
        setErrorMessage("Sorry, don't know where you landed!");
        return;
      }
      if(!(data as verifyRo).gameExists) {
        setErrored(true);
        setErrorMessage("Sorry, this game or lobby doesn't exist.");
        return;
      }
      if(!(data as verifyRo).playerBelongs) {
        setErrored(true);
        setErrorMessage("Sorry, you're not in this game!");
        return;
      }

      setLoading(false);
    });
  }, []);


  if(errored) {
    return <ErrorPage message={errorMessage} />;
  }

  if(loading) {
    return <p>loading</p>;
  }

  return (
    <> {children} </>
  )
}
