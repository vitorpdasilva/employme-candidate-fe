import { useContext } from "react";
import { Checkbox, Radio, Grid, Form, Select, Dropdown } from "semantic-ui-react";
import { ProfileSectionWrapper } from "./style";
import { countriesList, canadianVisaTypes } from "../../constants";
import AppContext from "../context";

const salaryRange = [
  { text: "70k - 80k", value: 0 },
  { text: "81k - 90k", value: 1 },
  { text: "91k - 100k", value: 2 },
  { text: "101k - 110k", value: 3 },
  { text: "111k - 120k", value: 4 },
  { text: "120k+", value: 5 },
];

const RelocationProfileSection = () => {
  const { userData } = useContext(AppContext);
  const { 
    relocation: {
      activelyLooking, 
      cadSalaryExpect,
      canadianVisa,
      companySize,
      noticePeriod,
      openToRemote,
      relocateOptions,
      usdSalaryExpect,
      validPassport,
    }
  } = userData;

  console.log({ userData })
  return (
    <ProfileSectionWrapper>
      <h1>Relocation</h1>
      <form>
        <Grid>
          <Grid.Row columns={4}>
            <Grid.Column>
              <Form.Field 
                control={Select}
                fluid
                label="Are you open to remote jobs?"
                defaultValue={openToRemote}
                options={[{ key: 'yes', value: true, text: 'yes'}, { key: 'no', value: false, text: 'no' }]}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                control={Select}
                fluid
                label="Where would you like to work?"
                defaultValue={relocateOptions}
                options={countriesList.map(({ name, code }) => ({ key: code, text: name, value: code }))}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                fluid
                control={Select}
                label="Annual salary expectation CAD"
                defaultValue={cadSalaryExpect}
                options={salaryRange.map(({ value, text }) => ({ key: value, text, value }))}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                control={Select}
                fluid
                label="Do you have a valid passport?"
                defaultValue={validPassport}
                options={[{ key: 'yes', value: true, text: 'Yes' }, { key: 'no', value: false, text: 'No' }]}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Form.Field
                control={Select}
                fluid
                label="What Canadian visa do you have?"
                defaultValue={canadianVisa}
                options={canadianVisaTypes.map(({ value, text }) => ({ value, text, key: value }))}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field 
                control={Dropdown}
                fluid
                multiple
                selection
                label="What size company do you prefer?"
                defaultValue={companySize}
                options={[
                  { value: 'startup', text: 'Startup' }, 
                  { value: 'midsize', text: 'Midsize' },
                  { value: 'corporate', text: 'Corporate' },
                ]}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Form.Field
                control={Select}
                fluid
                label="Are you actively looking for a job?"
                defaultValue={activelyLooking}
                options={[{ key: 'yes', value: true, text: 'Yes' }, { key: 'no', value: false, text: 'No' }]}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                control={Select}
                fluid
                label="What is your notice period?"
                defaultValue={noticePeriod}
                options={[
                  { key: 0, value: 0, text: '2 weeks' }, 
                  { key: 2, value: 1, text: '1 month' }, 
                  { key: 3, value: 2, text: '2 months' }, 
                  { key: 4, value: 3, text: '2 months +' },
                ]}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </form>
    </ProfileSectionWrapper>
  );
};

export default RelocationProfileSection;