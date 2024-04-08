import { lazy } from "react";
import { MdCampaign, MdDashboard, MdMessage, MdReport } from "react-icons/md";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaPlusCircle, FaPowerOff, FaUsers } from "react-icons/fa";
import { MdGroups } from "react-icons/md";

export const PageRoutes = [
  {
    path: "/",
    title: "Dashboard",
    element: lazy(() => import("./pages/HomePage")),
    icon: <MdDashboard size={24} />,
  },
  {
    path: "/create",
    title: "Create campaign",
    element: lazy(() => import("./pages/CreateCampaign")),
    icon: <FaPlusCircle size={24} />,
  },
  {
    path: "/donations",
    title: "Donations",
    element: lazy(() => import("./pages/DonationPage")),
    icon: <BiSolidDonateHeart size={24} />,
  },
  {
    path: "/campaigns",
    title: "Campaigns",
    element: lazy(() => import("./pages/DonationPage")),
    icon: <MdCampaign size={24} />,
  },
  {
    path: "/accounts",
    title: "Accounts",
    element: lazy(() => import("./pages/AccountsPage")),
    icon: <MdGroups size={28} />,
  },
  {
    path: "/reports",
    title: "Reports",
    element: lazy(() => import("./pages/DonationPage")),
    icon: <MdReport size={24} />,
  },
  {
    path: "/logout",
    title: "Logout",
    element: lazy(() => import("./pages/DonationPage")),
    icon: <FaPowerOff size={24} />,
  },
];
