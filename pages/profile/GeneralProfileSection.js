import { ProfileSectionWrapper } from './style';
import { countriesList } from '../../constants';

const GeneralProfileSection = ({ data }) => {
  const { general: { citizenship_code, currentLocation, gender, phone } } = data;
  return (
    <ProfileSectionWrapper>
      <h1>General</h1>
      <form>
        <ul>
          <li>
            <label>Citizenship</label>
            <select
              defaultValue={citizenship_code}
              onChange={() => console.log('change')}
            >
              <option value="" disabled>Country</option>
              {countriesList.map(({ name, code }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </li>
          <li>
            <label>Current Location</label>
            <select
              defaultValue={currentLocation}
              onChange={() => console.log('change')}
            >
              <option value="" disabled>Country</option>
              {countriesList.map(({ name, code }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </li>
          <li>
            <label>Gender</label>
            <select
              defaultValue={gender}
              onChange={() => console.log('change')}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </li>
          <li>
            <label>Phone</label>
            <input placeholder="Phone" defaultValue={phone} />
          </li>
        </ul>
      </form>
    </ProfileSectionWrapper>
  );
}

export default GeneralProfileSection;
