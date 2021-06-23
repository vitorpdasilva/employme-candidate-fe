import { Image, Icon } from 'semantic-ui-react';
import { ProfileSectionWrapper } from './style';
import { countriesList } from '../../constants';

const countriesOpts = countriesList.map(({ name, code }) => <option key={code} value={code}>{name}</option>)

const Profile = () => {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <Image src="https://via.placeholder.com/150" size="small" circular />
        <Icon size="big" style={{ position: 'absolute', right: 0, bottom: 10 }} name="camera" />
      </div>
      <ProfileSectionWrapper>
        <h1>General</h1>
        <form>
          <ul>
            <li>
              <label>Citizenship</label>
              <select>
                <option value="" disabled selected>Country</option>
                {countriesOpts}
              </select>
            </li>
            <li>
              <label>Current Location</label>
              <select>
                <option value="" disabled selected>Country</option>
                {countriesOpts}
              </select>
            </li>
            <li>
              <label>Gender</label>
              <select>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </li>
            <li>
              <label>Phone</label>
                <input placeholder="Phone" />
            </li>
          </ul>
        </form>
      </ProfileSectionWrapper>
    </>
  );
};

export default Profile;