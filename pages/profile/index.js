import { useEffect, useState } from 'react';
import { Image, Icon } from 'semantic-ui-react';

import GeneralProfileSection from './GeneralProfileSection';
import ProfessionalProfileSection from './ProfessionalProfileSection';
import RelocationProfileSection from './RelocationProfileSection';
import SocialSection from './SocialSection';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await fetch('/api/user').then(data => data.json());
      console.log({ data });
      setUserData(data);
    }
    fetchUserData();
  }, []);
  
  if (!userData) {
    console.log('no data yet');
    return <>loading...</>
  };
  
  return (
    <>
      <div style={{ position: 'relative' }}>
        <Image src="https://via.placeholder.com/150" size="small" circular />
        <Icon size="big" style={{ position: 'absolute', right: 0, bottom: 10 }} name="camera" />
      </div>
      <GeneralProfileSection data={userData} />
      <ProfessionalProfileSection data={userData} />
      <RelocationProfileSection data={userData} />
      <SocialSection />
    </>
  );
};

export default Profile;