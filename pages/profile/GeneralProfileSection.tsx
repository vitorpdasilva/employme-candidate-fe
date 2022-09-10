import { useContext } from "react";
import { Input, Grid } from 'semantic-ui-react'
import { ProfileSectionWrapper, InputRow } from "./style";
import { countriesList } from "../../constants";
import AppContext from "../context";
import ReactCountryFlag from "react-country-flag";


const GeneralProfileSection = () => {
  const { userData } = useContext(AppContext);
  const { general: { citizenship_code, currentLocation, gender, phone } } = userData;
  
  if (!userData) return <>Loading...</>;
  
  return (
    <ProfileSectionWrapper>
      <h1>General</h1>
      <form>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <InputRow labelWidth="130px">
                <Input fluid defaultValue={countriesList.find(country => country.code === citizenship_code)?.name} label="Citizenship" list='citizenship' placeholder='Choose your citizenship' />
                <datalist id="citizenship">
                  <option value="" disabled>Country</option>
                  {countriesList.map(({ name, code }) => (
                    <option key={code} value={name}>
                      {name}
                    </option>
                  ))}
                </datalist>
              </InputRow>
              <InputRow labelWidth="130px">
                <Input fluid defaultValue={countriesList.find(country => country.code === currentLocation)?.name} label="Current location" list='current_location' placeholder='Current Location' />
                <datalist id="current_location">
                  <option value="" disabled>Country</option>
                  {countriesList.map(({ name, code }) => (
                    <option key={code} value={name} />
                  ))}
                </datalist>
              </InputRow>
            </Grid.Column>
            <Grid.Column>
              <InputRow labelWidth="75px">
                <Input fluid defaultValue={gender} label="Gender" list="gender" placeholder="Gender" />
                <datalist id="gender">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </datalist>
              </InputRow>
              <InputRow labelWidth="75px">
                <Input label="Phone" placeholder="Phone" defaultValue={phone} />
              </InputRow>
            </Grid.Column>
          </Grid.Row>
        </Grid> 
      </form>
    </ProfileSectionWrapper>
  );
};

export default GeneralProfileSection;
