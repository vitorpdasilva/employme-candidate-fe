import { useContext } from "react";
import { Icon, Input } from "semantic-ui-react";
import { ProfileSectionWrapper, InputRow } from "./style";
import AppContext from "../context";

const SocialSection = () => {
  const { userData } = useContext(AppContext);
  const { social } = userData;
  return (
    <ProfileSectionWrapper>
      <h1>Social Profile</h1>
      {social.map(({ name, url }: any) => ( // TODO: Fix type any
        <InputRow key={name}>
          <Input iconPosition='left' defaultValue={url} placeholder={name}>
            <Icon name={name} />
            <input />
          </Input>
        </InputRow>
      ))}
    </ProfileSectionWrapper>
  );
};

export default SocialSection;
