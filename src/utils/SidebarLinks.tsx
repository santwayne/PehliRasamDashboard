import { BiUser } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { MdMessage, MdSettings } from "react-icons/md";

type SidebarLink = {
  key: string;
  icon: React.ReactNode;
  label: string;
  children?: SidebarLink[];
};

export const sidebarLinks: SidebarLink[] = [
  {
    key: "dashboard",
    icon: <IoMdHome />,
    label: "Dashboard",
    children: [
      { key: "/dashboard/overview", icon: <IoMdHome />, label: "Overview" },
      { key: "/dashboard/timelinemain", icon: <IoMdHome />, label: "Timeline" },
      { key: "/dashboard/profile-update", icon: <IoMdHome />, label: "Profile Update" },
    ],
  },
  {
    key: "/dashboard/clients",
    icon: <BiUser />,
    label: "Clients",
  },
  {
    key: "communication",
    icon: <MdMessage />,
    label: "Communication",
    children: [
      { key: "/dashboard/inbox", icon: <MdMessage />, label: "Email Inbox" },
      { key: "/dashboard/sent", icon: <MdMessage />, label: "Email Sent" },
    ],
  },
  {
    key: "settings",
    icon: <MdSettings />,
    label: "Settings",
    children: [
      {
        key: "clients-settings",
        icon: <BiUser />,
        label: "Clients",
        children: [
          { key: "/dashboard/lists", icon: <BiUser />, label: "Lists" },
          { key: "/dashboard/fields", icon: <BiUser />, label: "Fields" },
        ],
      },
      { key: "/dashboard/users", icon: <MdSettings />, label: "Users" },
      { key: "/dashboard/admin-info", icon: <MdSettings />, label: "Admin Info" },
    ],
  },
];
