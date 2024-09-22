import {
  ActionIcon,
  Button,
  CopyButton,
  Group,
  Modal,
  Pagination,
  Table,
  Text,
} from "@mantine/core";
import {
  useDeleteFormMutation,
  useGetFormsQuery,
} from "../../app/api/formsApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  IconCopy,
  IconDownload,
  IconEye,
  IconFileExcel,
  IconRefresh,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const MyTable = () => {
  const param = useParams();
  const user = useSelector((state: RootState) => state.user);
  const [page, setPage] = useState(1);
  const [dataIndex, setDataIndex] = useState<number>(0);
  const [delIndex, setDelIndex] = useState<number | null>(null);
  const { data, isLoading, isSuccess, refetch } = useGetFormsQuery({
    endpoint: param.dataType,
    page,
  });
  // const { data, isLoading, isSuccess } = useXlsxQuery({
  //   type: param.dataType,
  // });

  const [deleteForm, { isSuccess: trashSuc, isError: trashErr }] =
    useDeleteFormMutation();

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);
  useEffect(() => {
    if (trashSuc) {
      notifications.show({
        color: "green",
        position: "top-right",
        message: "فرم با موفقیت حذف شد.",
      });
      refetch();
    } else if (trashErr) {
      notifications.show({
        color: "red",
        position: "top-right",
        message: "خطا در انجام عملیات حذف فایل !",
      });
    }
  }, [trashSuc]);

  useEffect(() => {
    setPage(1);
  }, [param]);

  const [opened, { open, close }] = useDisclosure(false);
  const [dOpened, { open: dOpen, close: dClose }] = useDisclosure(false);

  useEffect(() => {
    console.log(param, "PARAM");
    console.log(data, "DATA");
  }, []);

  const rows = data?.formData?.map((i: any, index: number) => (
    <Table.Tr key={index}>
      <Table.Td>{i.name || i.username}</Table.Td>
      <Table.Td style={{ fontFamily: "monospace" }}>
        {i.email || i.role}
      </Table.Td>
      <Table.Td className="yekan">{i.phone}</Table.Td>
      <Table.Td>
        <Group wrap="nowrap">
          {i.role ? null : (
            <ActionIcon
              variant="subtle"
              onClick={() => {
                open();
                setDataIndex(index);
              }}
            >
              <IconEye />
            </ActionIcon>
          )}
          {user.role === "admin" ? (
            <ActionIcon
              variant="subtle"
              onClick={() => {
                dOpen();
                setDelIndex(index);
              }}
            >
              <IconTrash size={19} />
            </ActionIcon>
          ) : null}
        </Group>
      </Table.Td>
    </Table.Tr>
  ));
  const mRows = data?.formData[dataIndex]
    ? Object.entries(data.formData[dataIndex])
        .filter(([key]) => key !== "_id" && key !== "__v")
        .map(([key, value]: any, index) => (
          <Table.Tr key={index}>
            <Table.Td style={{ fontFamily: "Yekan" }}>{`${key} :`}</Table.Td>
            <Table.Td className="yekan flex items-center gap-5">
              {/* {value} */}
              {key === "fileId" ? (
                <>
                  <Text>{value}</Text>

                  <Group wrap="nowrap">
                    <CopyButton value={value}>
                      {({ copied, copy }) => (
                        <ActionIcon
                          variant="subtle"
                          color={copied ? "teal" : ""}
                          onClick={copy}
                          size={20}
                        >
                          <IconCopy size={15} />
                        </ActionIcon>
                      )}
                    </CopyButton>
                    <ActionIcon variant="subtle" size={20}>
                      <a
                        // href={`http://localhost:3000/kb-api/forms/download/${value}`}
                        href={`https://kaniboom.liara.run/kb-api/forms/download/${value}`}
                        className="w-full h-full"
                      >
                        <IconDownload size={15} />
                      </a>
                    </ActionIcon>
                  </Group>
                </>
              ) : (
                <>
                  {value.length > 0 ? (
                    value
                  ) : (
                    <span className="text-gray-300">بدون پاسخ</span>
                  )}
                </>
              )}
            </Table.Td>
          </Table.Tr>
        ))
    : [];

  return (
    <>
      {/* <Title>{param.dataType}</Title> */}
      <Modal
        className="yekan"
        dir="ltr"
        opened={opened}
        onClose={close}
        title="جزئیات"
        size="lg"
      >
        <Table
          withRowBorders={false}
          horizontalSpacing="md"
          verticalSpacing="md"
        >
          <Table.Tbody>{mRows}</Table.Tbody>
        </Table>
      </Modal>
      <Modal
        className="yekan"
        opened={dOpened}
        onClose={dClose}
        title={`آیا از حذف این فرم اطمینان دارید؟`}
      >
        <Group>
          <Button bg="gray" onClick={dClose}>
            انصراف
          </Button>
          <Button
            bg="red"
            onClick={() => {
              deleteForm({
                endpoint: param.dataType,
                id: data?.formData[delIndex!]?._id,
              });
              dClose();
            }}
          >
            بله، مطمئنم
          </Button>
        </Group>
      </Modal>
      <Table.ScrollContainer
        minWidth={500}
        style={{ height: "90vh", minHeight: 500 }}
        pb={35}
      >
        <Table stickyHeader verticalSpacing="md" className="vazir">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>نام</Table.Th>
              <Table.Th>{data?.formData[0]?.role ? "نقش" : "ایمیل"}</Table.Th>
              {data?.formData[0]?.role ? "" : <Table.Th>شماره تماس</Table.Th>}
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
          <Group
            align="center"
            justify="flex-start"
            py={15}
            pr={10}
            className="absolute bottom-0 w-full"
            style={{ backdropFilter: "blur(5px)" }}
          >
            <ActionIcon
              loading={isLoading}
              variant="subtle"
              onClick={() => refetch()}
            >
              <IconRefresh />
            </ActionIcon>
            <Pagination
              total={data?.totalPages || 1}
              value={page}
              onChange={setPage}
              className="yekan"
              size="sm"
            />
            <a
              // href={`http://localhost:3000/kb-api/export/${param.dataType}`}
              href={`https://kaniboom.liara.run/kb-api/export/${param.dataType}`}
              className="flex"
            >
              <IconFileExcel color="#F16322" size={26} />
            </a>
          </Group>
        </Table>
      </Table.ScrollContainer>
    </>
  );
};

export default MyTable;
