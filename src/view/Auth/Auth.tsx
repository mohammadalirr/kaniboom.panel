import React from "react";
import Signin from "./Signin";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  return <>{isAuth ? children : <Signin />}</>;
};

export default Auth;
