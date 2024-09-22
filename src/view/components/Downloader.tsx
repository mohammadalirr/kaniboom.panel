import {
  ActionIcon,
  Modal,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconDownload } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDownloadFileQuery } from "../../app/api/formsApi"; // Assuming this is a query
import { notifications } from "@mantine/notifications";

const Downloader = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [values, setValues] = useState<any>();

  interface FormValues {
    fileId: string;
  }

  const form: UseFormReturnType<FormValues> = useForm({
    onValuesChange: (e: any) => setValues(e),
    mode: "uncontrolled",
    initialValues: {
      fileId: "",
    },
    validate: {
      fileId: (value) =>
        /^[a-f\d]{24}$/.test(value) ? null : "شناسه نامعتبر است.",
    },
  });

  const {
    data: fileBlob,
    isSuccess,
    isError,
  } = useDownloadFileQuery(form.values.fileId, {
    skip: !form.values.fileId, // Prevent the query from running initially
  });

  useEffect(() => {
    console.log(form.isValid(), "VALIDATE");
    console.log(values);

    // console.log(form, "VALUES");
  }, [values]);

  useEffect(() => {
    if (isSuccess && fileBlob) {
      // Create a URL for the blob and trigger a download
      const url = window.URL.createObjectURL(new Blob([fileBlob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "downloaded-file"); // Replace with dynamic filename if needed
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);

      notifications.show({
        color: "green",
        message: "فایل با موفقیت دریافت شد.",
      });
    } else if (isError) {
      notifications.show({
        color: "red",
        message: "در بارگیری فایل مشکلی پیش امده است.",
      });
    }
  }, [isSuccess, isError, fileBlob]);

  return (
    <>
      <Modal
        className="vazir"
        opened={opened}
        onClose={close}
        title="شناسه فایل را وارد کنید"
      >
        <form
          onSubmit={form.onSubmit((values) => {
            // Trigger the download by setting the form value
            form.setFieldValue("fileId", values.fileId);
          })}
        >
          <Stack>
            <TextInput
              autoComplete="off"
              placeholder="66daf70b32b3abae8d64a575"
              required
              {...form.getInputProps("fileId")}
            />
            {form.isValid() ? (
              // <Button type="submit" w={100}>
              <a
                style={{ backgroundColor: "#f06221" }}
                className="w-fit px-4 py-1 rounded-md"
                download
                href={`https://kaniboom.liara.run/kb-api/forms/download/${
                  values?.fileId
                }`}
              >
                دانلود
              </a>
            ) : // </Button>
            null}
          </Stack>
        </form>
      </Modal>

      <ActionIcon radius={20} size={120} variant="subtle" onClick={open}>
        <Stack justify="center" align="center">
          <IconDownload size={70} />
          <Text className="vazir" size="sm">
            دانلود فایل
          </Text>
        </Stack>
      </ActionIcon>
    </>
  );
};

export default Downloader;
