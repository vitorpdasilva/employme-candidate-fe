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
            <select>
              <option value="" disabled selected>Country</option>
              {countriesList.map(({ name, code }) => (
                <option
                  selected={citizenship_code === code}
                  key={code}
                  value={code}
                >
                  {name}
                </option>
              ))}
            </select>
          </li>
          <li>
            <label>Current Location</label>
            <select>
              <option value="" disabled selected>Country</option>
              {countriesList.map(({ name, code }) => (
                <option
                  selected={currentLocation === code}
                  key={code}
                  value={code}
                >
                  {name}
                </option>
              ))}
            </select>
          </li>
          <li>
            <label>Gender</label>
            <select>
              <option selected={gender === 'male'} value="male">Male</option>
              <option selected={gender === 'female'} value="female">Female</option>
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
