import { useContext } from "react";
import { Input, Select } from 'semantic-ui-react'
import { ProfileSectionWrapper, InputRow } from "./style";
import { countriesList } from "../../constants";
import AppContext from "../context";

const GeneralProfileSection = () => {
  const { userData } = useContext(AppContext);
  const { general: { citizenship_code, currentLocation, gender, phone } } = userData;
  console.log({ userData });
  if (!userData) return <>Loading...</>;
  console.log({ test: countriesList.map(({ name, code }) => (
    { key: name, value: code, text: name }
    )) })
  return (
    <ProfileSectionWrapper>
      <h1>General</h1>
      <form>
        <ul>
          <li>
            <Input label="Citizenship" list='citizenship' placeholder='Choose your citizenship' />
            <datalist id="citizenship">
              <option value="" disabled>Country</option>
              {countriesList.map(({ name, code }) => (
                <option key={code} value={name}>
                  {name}
                </option>
              ))}
            </datalist>
          </li>
          <li>
            <label>Current Location</label>
            <select
              defaultValue={currentLocation}
              onChange={() => console.log("change")}
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
              onChange={() => console.log("change")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </li>
          <li>
            <InputRow>
              <Input label="Phone" placeholder="Phone" defaultValue={phone} />
            </InputRow>
          </li>
        </ul>
      </form>
    </ProfileSectionWrapper>
  );
};

export default GeneralProfileSection;
