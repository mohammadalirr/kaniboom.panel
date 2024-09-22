import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";

const App = () => {
  const [opened, { toggle }] = useDisclosure();

  // const { status, isSuccess, isError } = useVarifyQuery(null);
  // const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <>
      {/* {isAuth ? ( */}
      <AppShell
        header={{ height: "10vh" }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        pr="md"
      >
        <AppShell.Header style={{ minHeight: 50 }}>
          <Header opened={opened} toggle={toggle} />
        </AppShell.Header>
        <AppShell.Navbar p="md">
          {/* Navbar
            {Array(15)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} h={28} mt="sm" animate={false} />
              ))} */}
          <Navbar />
        </AppShell.Navbar>
        <AppShell.Main className="h-full">
          <Outlet />
          {/* <MyTable /> */}
        </AppShell.Main>
      </AppShell>
      {/* ) : null} */}
    </>
  );
};

export default App;
