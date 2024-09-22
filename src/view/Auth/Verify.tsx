import { useEffect } from "react";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import { useVerifyQuery } from "../../app/api/authApi";
import Signin from "./Signin";
import { Loader } from "@mantine/core";
import { setUser } from "../../features/userSlice";

const Verify = ({ children }: { children: React.ReactNode }) => {
  // const { status, isSuccess, isError } = useVarifyQuery(null);
  // const navigate = useNavigate();
  // const [skip, setSkip] = useState(true);
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { error, isSuccess, isError, isLoading, data } = useVerifyQuery(null);
  useEffect(() => {
    console.log(!document.cookie, "DOC");

    console.log(isAuth);
    if (isSuccess) {      
      dispatch(login());
      dispatch(setUser(data.data));
    } else {
      console.log(error);
    }
  }, [isSuccess, isError]);

  return <>{isLoading ? <Loader /> : isAuth ? children : <Signin />}</>;
};

export default Verify;
