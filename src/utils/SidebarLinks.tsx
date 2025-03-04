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
      { key: "/dashboard/overview", icon: null, label: "Overview" },
      { key: "/dashboard/timelinemain", icon: null, label: "Timeline" },
      { key: "/dashboard/profile-update", icon: null, label: "Profile Update" },

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
      { key: "/dashboard/inbox", icon: null, label: "Email Inbox" },
      { key: "/dashboard/sent", icon: null, label: "Email Sent" },
    ],
  },
  {
    key: "/dashboard/settings",
    icon: <MdSettings />,
    label: "Settings",
  },
];
