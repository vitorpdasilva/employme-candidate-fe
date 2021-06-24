import { Image, Icon } from 'semantic-ui-react';

import GeneralProfileSection from './GeneralProfileSection';
import ProfessionalProfileSection from './ProfessionalProfileSection';

const Profile = () => {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <Image src="https://via.placeholder.com/150" size="small" circular />
        <Icon size="big" style={{ position: 'absolute', right: 0, bottom: 10 }} name="camera" />
      </div>
      <GeneralProfileSection />
      <ProfessionalProfileSection />
    </>
  );
};

export default Profile;