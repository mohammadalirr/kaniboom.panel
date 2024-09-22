import {
  ActionIcon,
  Button,
  Modal,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm, UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconUserPlus } from "@tabler/icons-react";
import { useCreateUserMutation } from "../../app/api/authApi";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";

const CreateUser = () => {
  const [opened, { open, close }] = useDisclosure(false);

  interface FormValues {
    username: string;
    password: string;
    role: string;
  }

  const form: UseFormReturnType<FormValues> = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
      role: "",
    },
    validate: {
      username: isNotEmpty(),
      password: isNotEmpty(),
    },
  });

  const [createUser, { isSuccess, isError, isLoading }] =
    useCreateUserMutation();

  useEffect(() => {
    if (isSuccess) {
      notifications.show({
        color: "green",
        message: "کاربر جدید با موفقیت ساخته شد",
      });
    } else if (isError) {
      notifications.show({
        color: "red",
        message: "در فرآیند ساخت کاربر مشکلی پیش آمد.",
      });
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Modal
        className="yekan"
        opened={opened}
        onClose={close}
        title="ایجاد کاربر جدید"
      >
        <form onSubmit={form.onSubmit((values) => createUser(values))}>
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
            <Select
              label="نقش"
              data={["admin", "assistant"]}
              required
              key={form.key("role")}
              {...form.getInputProps("role")}
            />
            <Button type="submit" mt={15} loading={isLoading}>
              ایجاد
            </Button>
          </Stack>
        </form>
      </Modal>
      <ActionIcon radius={20} size={120} variant="subtle" onClick={open}>
        <Stack justify="center" align="center">
          <IconUserPlus size={70} />
          <Text className="vazir" size="sm">
            ایجاد کاربر جدید
          </Text>
        </Stack>
      </ActionIcon>
    </>
  );
};

export default CreateUser;
