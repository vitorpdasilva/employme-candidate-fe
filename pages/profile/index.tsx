import { useEffect, useContext } from "react";
import { Icon } from "semantic-ui-react";

import { AppContext } from "src/context";
import GeneralProfileSection from "./GeneralProfileSection";
import ProfessionalProfileSection from "./ProfessionalProfileSection";
import RelocationProfileSection from "./RelocationProfileSection";
import SocialSection from "./SocialSection";
import { useUserAuth } from "src/hooks";
import { useAuthStore } from "stores";

const placeHolder = "https://via.placeholder.com/150";

const Profile = () => {
  const userData = useAuthStore((state: any) => state.user);
  
  if (!userData) {
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