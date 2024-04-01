import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../utils/firebase";
import { useEffect, useState } from "react";
import { IoMdTrendingUp } from "react-icons/io";
import { PiClockCountdown } from "react-icons/pi";
import { INRFormat } from "../utils/rupees_format";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/toggleSlice";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (localStorage.getItem("user")) {
    dispatch(login());
  } else {
    navigate("/auth");
  }
  const campaignsRef = collection(database, "campaigns");
  const donationsRef = collection(database, "donations");

  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);

  async function getCampaigns() {
    const data = await getDocs(campaignsRef);
    setCampaigns(data.docs);
  }
  async function getDonations() {
    const data = await getDocs(donationsRef);
    setDonations(data.docs);
  }

  useEffect(() => {
    getCampaigns();
    getDonations();
  }, []);

  return (
    <div className="px-5">
      <div className="text-xl font-bold text-gray-600 mb-5 flex items-center gap-3">
        <IoMdTrendingUp size={22} /> Trending campaigns
      </div>
      <div className="overflow-x-auto">
        <table className="table bg-white">
          <thead>
            <tr className="text-base">
              <th></th>
              <th>Title</th>
              <th>Category</th>
              <th>Raised Amount</th>
              <th>Goal Amount</th>
            </tr>
          </thead>
          <tbody>
            {campaigns
              .sort((a, b) => b.data().raisedAmount - a.data().raisedAmount)
              .slice(0, 5)
              .map((campaign, index) => {
                const campaignData = campaign.data();
                return (
                  <tr key={index} className="hover:bg-blue-200">
                    <th>{index + 1}</th>
                    <td>{campaignData.title}</td>
                    <td>{campaignData.category}</td>
                    <td>{INRFormat(campaignData.raisedAmount)}</td>
                    <td>{INRFormat(campaignData.goalAmount)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="text-xl font-bold text-gray-600 mb-5 mt-5 flex items-center gap-3">
        <PiClockCountdown size={22} /> Recent donations
      </div>
      <div className="overflow-x-auto">
        <table className="table bg-white">
          <thead>
            <tr className="text-base">
              <th></th>
              <th>Name</th>
              <th>Amount</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Campaign</th>
            </tr>
          </thead>
          <tbody>
            {donations.slice(0, 5).map((donations, index) => {
              const donationsData = donations.data();
              return (
                <tr key={index} className="hover:bg-blue-200">
                  <th>{index + 1}</th>
                  <td>{donationsData.name || "NA"}</td>
                  <td>{INRFormat(donationsData.amount)}</td>
                  <td>{donationsData.phone || "NA"}</td>
                  <td>{donationsData.email || "NA"}</td>
                  <td>
                    <a
                      href={`https://test.munniwelfare.org/details/${donationsData.campaign}`}
                    >
                      Visit
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
