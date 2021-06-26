import { Icon } from 'semantic-ui-react';
import { ProfileSectionWrapper } from './style';

const socialMedias = ['linkedin', 'github', 'globe'];

const SocialSection = () => (
  <ProfileSectionWrapper>
    <h1>Social Profile</h1>
    {socialMedias.map(media => (
      <>
        <Icon name={media} />
        <input placeholder={media} />
      </>
    ))}

  </ProfileSectionWrapper>
);

export default SocialSection;
