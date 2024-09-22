import { Accordion, NavLink, rem, useMantineColorScheme } from "@mantine/core";
import {
  IconBoxMargin,
  IconChevronLeft,
  IconListDetails,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";

const navbarFields = [
  {
    title: "فرم‌ها",
    value: "forms",
    panel: "فرم1",
    disabled: false,
    items: [
      {
        title: "تماس با ما",
        link: "forms/contact",
      },
      {
        title: "کارآموزی",
        link: "forms/internship",
      },
      {
        title: "بوت کمپ مسیر",
        link: "forms/masir-bootcamp",
      },
      {
        title: "ازسال طرح و ایده",
        link: "forms/plans",
      },
      {
        title: "بوت کمپ مدیریت محصول",
        link: "forms/product-bootcamp",
      },
    ],
    icon: (
      <IconListDetails
        style={{
          color: "var(--mantine-color-red-6)",
          width: rem(20),
          height: rem(20),
        }}
      />
    ),
  },
  // {
  //   title: "ابزار",
  //   value: "tools",
  //   disabled: false,
  //   items: [],
  //   icon: (
  //     <IconTools
  //       style={{
  //         color: "var(--mantine-color-indigo-6)",
  //         width: rem(20),
  //         height: rem(20),
  //       }}
  //     />
  //   ),
  // },
  {
    title: "مدیریت محتوا",
    value: "content",
    disabled: true,
    items: [],
    icon: (
      <IconBoxMargin
        style={{
          color: "var(--mantine-color-teal-6)",
          width: rem(20),
          height: rem(20),
        }}
      />
    ),
  },
];

const Navbar = () => {
  const { colorScheme } = useMantineColorScheme();
  const user = useSelector((state: RootState) => state.user);
  return (
    <Accordion variant="filled" defaultValue="forms" className="vazir">
      {navbarFields.map((i, index) => (
        <Accordion.Item key={index} value={i.value}>
          <Accordion.Control disabled={i.disabled} icon={i.icon}>
            {i.title}
          </Accordion.Control>
          {i.items.map((i, index) => (
            <Link to={i.link}>
              <Accordion.Panel
                key={index}
                pt={5}
                className={`text-sm text-gray-400 bg-opacity-50 ${
                  colorScheme === "dark"
                    ? "hover:bg-gray-700 hover:text-gray-100"
                    : "hover:bg-gray-100"
                } rounded-lg mx-2`}
              >
                {i.title}
              </Accordion.Panel>
            </Link>
          ))}
        </Accordion.Item>
      ))}
      {user.role === "admin" ? (
        <Link to="/forms/users">
          <NavLink
            mt={20}
            label="لیست کاربران"
            rightSection={<IconChevronLeft size={15} className="ml-1" />}
            leftSection={
              <IconUsersGroup
                style={{
                  color: "var(--mantine-color-blue-6)",
                  marginRight: "5px",
                  width: rem(20),
                  height: rem(20),
                }}
              />
            }
          />
        </Link>
      ) : null}
    </Accordion>
  );
};

export default Navbar;
