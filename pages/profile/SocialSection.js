import { useContext } from "react";
import { Icon } from "semantic-ui-react";
import { ProfileSectionWrapper } from "./style";
import AppContext from "../context";

const SocialSection = () => {
  const { userData } = useContext(AppContext);
  const { social } = userData;
  return (
    <ProfileSectionWrapper>
      <h1>Social Profile</h1>
      {social.map(({ name, url }) => (
        <div key={name}>
          <Icon name={name} />
          <input defaultValue={url} placeholder={name} />
        </div>
      ))}
    </ProfileSectionWrapper>
  );
};

export default SocialSection;
