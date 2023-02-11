import { useContext } from "react";
import { Icon, Input, SemanticICONS  } from "semantic-ui-react";
import { ProfileSectionWrapper, InputRow } from "./style";
import { AppContext } from "src/context";
import { useAuthStore } from "stores";

type Social = {
  name: SemanticICONS,
  url: string
}
const SocialSection = () => {
  const userData = useAuthStore((state: any) => state.user);
  if (!userData) return <>Loading</>;
  
  const { social } = userData;
  return (
    <ProfileSectionWrapper>
      <h1>Social Profile</h1>
      {social.map(({ name, url }: Social) => ( // TODO: Fix type any
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
