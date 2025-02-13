import { BiUser } from 'react-icons/bi';
import { IoMdHome } from 'react-icons/io';
import { MdMessage, MdSettings } from 'react-icons/md';
import { FaFolder } from 'react-icons/fa';

type SidebarLink = {
  key: string;
  icon: React.ReactNode;
  label: string;
};

export const sidebarLinks: SidebarLink[] = [
  {
    key: '/dashboard',
    icon: <IoMdHome />,
    label: 'Dashboard',
  },
  {
    key: '/dashboard/clients',
    icon: <BiUser />,
    label: 'Clients',
  },
  {
    key: '/dashboard/communication',
    icon: <MdMessage />,
    label: 'Communication',
  },
  {
    key: '/dashboard/files',
    icon: <FaFolder />,
    label: 'Files',
  },
  {
    key: '/dashboard/settings',
    icon: <MdSettings />,
    label: 'Settings',
  },
];
