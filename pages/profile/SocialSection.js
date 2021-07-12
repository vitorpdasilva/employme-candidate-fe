import React from 'react';
import { Icon } from 'semantic-ui-react';
import { ProfileSectionWrapper } from './style';

const socialMedias = ['linkedin', 'github', 'globe'];

const SocialSection = () => (
  <ProfileSectionWrapper>
    <h1>Social Profile</h1>
    {socialMedias.map(media => (
      <React.Fragment key={media}>
        <Icon name={media} />
        <input placeholder={media} />
      </React.Fragment>
    ))}

  </ProfileSectionWrapper>
);

export default SocialSection;
