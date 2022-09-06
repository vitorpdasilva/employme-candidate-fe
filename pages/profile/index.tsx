import { useEffect, useContext } from "react";
import { Icon } from "semantic-ui-react";

import AppContext from "../context";
import GeneralProfileSection from "./GeneralProfileSection";
import ProfessionalProfileSection from "./ProfessionalProfileSection";
import RelocationProfileSection from "./RelocationProfileSection";
import SocialSection from "./SocialSection";

const placeHolder = "https://via.placeholder.com/150";

const Profile = () => {
  const { userData, actions: { fetchUserData } } = useContext(AppContext);
  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData) {
    console.log("userData loading");
    return <>loading...</>;
  }
  
  return (
    <>
      <div style={{ position: "relative" }}>
        <img src={userData?.picture || placeHolder} />
        <Icon size="big" style={{ position: "absolute", right: 0, bottom: 10 }} name="camera" />
      </div>
      <GeneralProfileSection />
      <ProfessionalProfileSection />
      <RelocationProfileSection />
      <SocialSection />
    </>
  );
};

export default Profile;