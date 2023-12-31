import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as api from '../api';
import { verifyRo } from "@backend/dto/ro";
import { toast } from "react-toastify";
import { ErrorPage } from "../pages/ErrorPage";
import { AxiosError, AxiosResponse } from "axios";

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export const Verified = ({ children }: {children: ReactNode}) => {
  const [errored, setErrored] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const { code } = useParams();

  useEffect(() => {
    if(code === undefined) {
      setErrorMessage("Sorry, don't know where you landed!");
      return;
    }
    if(code === "D") { // debug
      setErrored(false);
      setLoading(false);
      return;
    }

    api.axios.get('/games/verify', { params : { code }, withCredentials: true})
      .then((res: AxiosResponse<verifyRo>) => {
        if(!res.data.gameExists) {
          setErrorMessage("Sorry, this game or lobby doesn't exist.");
          return;
        }
        if(!res.data.playerBelongs) {
          setErrorMessage("Sorry, you're not in this game!");
          return;
        }

        // unset if everything working
        setErrored(false);
      }).catch((err: AxiosError) => {
        if (err.code === 'ECONNABORTED') {
          toast.error("Server Timeout");
          setErrorMessage("Sorry, looks like the server is down!");
          return;
        }
        toast.error("Server Error");
        console.log(err.message);
        setErrorMessage("Sorry, don't know where you landed!");
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  if(loading) {
    return (
      <div className="container">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    )
  }

  if(errored) {
    return <ErrorPage message={errorMessage} />;
  }

  return (
    <> {children} </>
  )
}
