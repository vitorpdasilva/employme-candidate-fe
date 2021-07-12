import React from 'react';
import { Icon } from 'semantic-ui-react';
import { ProfileSectionWrapper } from './style';

const SocialSection = ({ data }) => {
  console.log({ data });
  const { social } = data;
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
