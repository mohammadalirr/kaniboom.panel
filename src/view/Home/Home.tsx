import { Group, Stack, Title } from "@mantine/core";
import CreateUser from "../components/CreateUser";
import Downloader from "../components/Downloader";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  console.log(user);
  
  return (
    <>
      <Stack mt={30} justify="center" align="center" className="w-full h-full">
        <Title mb={10} style={{ fontFamily: "Vazir" }}>
          دسترسی سریع
        </Title>
        <Group pt={15}>
          <Downloader />
          {user.role === "admin" ? <CreateUser /> : null}
        </Group>
      </Stack>
    </>
  );
};

export default Home;
