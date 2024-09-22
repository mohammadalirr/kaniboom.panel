import {
  ActionIcon,
  Box,
  Button,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { useSigninMutation } from "../../app/api/authApi";
import { isNotEmpty, useForm, UseFormReturnType } from "@mantine/form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { setUser } from "../../features/userSlice";

interface FormValues {
  username: string;
  password: string;
}

const Signin = () => {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  const [varifyUser, { isSuccess, isError, isLoading, error, data }] =
    useSigninMutation();
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(login());
      dispatch(setUser(data.data));
    } else {
      console.log(error);
    }
  }, [isSuccess, isError]);

  const form: UseFormReturnType<FormValues> = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: isNotEmpty(),
      password: isNotEmpty(),
    },
  });

  return (
    <Box className="flex flex-col justify-center items-center w-full h-screen vazir">
      <form
        className={`shadow-lg w-72 p-5 rounded-lg ${
          colorScheme === "dark" ? "bg-gray-600" : "bg-gray-300"
        } `}
        onSubmit={form.onSubmit((values) => varifyUser(values))}
      >
        <Group justify="space-between" align="flex-start" px={5} mb={20}>
          <Box w={25}></Box>
          <Title
            order={3}
            style={{ fontFamily: "Vazir" }}
            className="text-center"
          >
            ورود به پنل
          </Title>
          <Box w={25}>
            <ActionIcon
              variant="subtle"
              onClick={toggleColorScheme}
              radius={99}
            >
              {colorScheme === "light" ? (
                <IconSunFilled />
              ) : (
                <IconMoonFilled size={20} />
              )}
            </ActionIcon>
          </Box>
        </Group>
        <Stack>
          <TextInput
            required
            label="نام کاربری"
            key={form.key("username")}
            {...form.getInputProps("username")}
          />
          <PasswordInput
            required
            label="رمز عبور"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button type="submit" mt={15} loading={isLoading}>
            ورود
          </Button>
        </Stack>
      </form>
      <Text mt={10}>
        {isSuccess ? (
          <span className="text-center"></span>
        ) : isError ? (
          <>
            {error && "data" in error ? (
              <span className="text-red-500">
                {JSON.stringify((error as FetchBaseQueryError).data)}
              </span>
            ) : (
              <span className="text-red-500">خطایی رخ داده است.</span>
            )}
          </>
        ) : null}
      </Text>{" "}
    </Box>
  );
};

export default Signin;
