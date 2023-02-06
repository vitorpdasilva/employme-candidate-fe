import { useContext } from "react";
import { Input, Grid, Form, Select } from 'semantic-ui-react'
import { ProfileSectionWrapper, InputRow } from "./style";
import { countriesList } from "../../constants";
import AppContext from "../context";


const GeneralProfileSection = () => {
  const { userData } = useContext(AppContext);
  const { general: { citizenship_code, currentLocation, gender, phone } } = userData;
  console.log({ userData })
  if (!userData) return <>Loading...</>;
  
  return (
    <ProfileSectionWrapper>
      <h1>General</h1>
      <form>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Form.Field
                control={Select} 
                fluid
                label="Citizenship"
                placeholder="Citizenship"
                defaultValue={citizenship_code}
                options={countriesList.map(({ name, code }) => ({key: code, text: name, value: code }))} />                
              <Form.Field
                control={Select}
                fluid
                label="Current Location"
                placeholder="Current Location"
                defaultValue={currentLocation}
                options={countriesList.map(({ name, code }) => ({ key: code, text: name, value: code }))}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field 
                control={Select}
                label="Gender"
                fluid
                defaultValue={gender}
                placeholder="Gender"
                options={[{ key: 'female', text: 'female', value: 'female' }, { key: 'male', text: 'male', value: 'male' }]}
              />
              <Form.Field fluid label="Phone" control={Input} defaultValue={phone} />
            </Grid.Column>
          </Grid.Row>
        </Grid> 
      </form>
    </ProfileSectionWrapper>
  );
};

export default GeneralProfileSection;
