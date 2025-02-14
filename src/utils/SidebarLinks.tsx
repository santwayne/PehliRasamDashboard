import { BiUser } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { MdMessage, MdSettings } from "react-icons/md";
import { FaFolder } from "react-icons/fa";

type SidebarLink = {
  key: string;
  icon: React.ReactNode;
  label: string;
  children?: SidebarLink[]; // Optional sub-menu items
};

export const sidebarLinks: SidebarLink[] = [
  {
    key: "dashboard",
    icon: <IoMdHome />,
    label: "Dashboard",
    children: [
      { key: "/dashboard/overview", icon: null, label: "Overview" },
      { key: "/dashboard/timeline", icon: null, label: "Timeline" },
      { key: "/dashboard/notes", icon: null, label: "Notes" },
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
      { key: "/dashboard/communication/inbox", icon: null, label: "Email Inbox" },
      { key: "/dashboard/communication/sent", icon: null, label: "Email Sent" },
    ],
  },
  {
    key: "/dashboard/files",
    icon: <FaFolder />,
    label: "Files",
  },
  {
    key: "/dashboard/settings",
    icon: <MdSettings />,
    label: "Settings",
  },
];
