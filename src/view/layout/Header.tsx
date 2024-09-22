import {
  ActionIcon,
  Burger,
  Group,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconLogout2,
  IconMoonFilled,
  IconSunFilled,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { useLogoutMutation } from "../../app/api/authApi";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ opened, toggle }) => {
  const user = useSelector((state: RootState) => state.user);
  const [logoutS, { isSuccess, isError, status, error, isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  useEffect(() => {
    if (isSuccess) {
      dispatch(logout());
    } else if (isError) {
      console.log(error);
    }
  }, [status]);

  return (
    <Group justify="space-between" h="100%" px="md">
      <Group gap={10}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        {/* <Image src="/logo_kaniboom.png" w="auto" h={55} /> */}
        <Link to="/">
          <Title c="#f16322" style={{ fontFamily: "vazir" }}>
            کانی‌بوم
          </Title>
        </Link>
        <Group className="border-r-2 border-gray-200 pr-2" gap={3}>
          <Text className="vazir">{user.username}</Text>
          <ActionIcon
            variant="subtle"
            size={20}
            onClick={() => logoutS({end: "logout"})}
            loading={isLoading}
          >
            <IconLogout2 />
          </ActionIcon>
        </Group>
      </Group>
      <ActionIcon variant="subtle" onClick={toggleColorScheme}>
        {colorScheme === "light" ? <IconSunFilled /> : <IconMoonFilled />}
      </ActionIcon>
    </Group>
  );
};

export default Header;
