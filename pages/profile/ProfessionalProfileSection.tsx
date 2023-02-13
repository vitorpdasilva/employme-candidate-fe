import React from 'react'
import { useContext } from "react";
import { Divider, Grid, Form } from "semantic-ui-react";
import { professionList } from "../../constants";
import { AppContext } from "../../src/context";
import { ProfileSectionWrapper } from "./style";
import { useAuthStore } from "../../stores";
import { Checkbox, Select, MenuItem } from '@mui/material'

const ProfessionalProfileSection = () => {
  const { skillList } = useContext<any>(AppContext);
  const userData = useAuthStore((state: any) => state.user);
  if (!userData) return <>Loading</>;
  
  const { professionalOverview: { openToDiffRole, profession, yearsOfExp, skillRank, preferenceToWork } } = userData;
  
  return (
    <ProfileSectionWrapper>
      <h1>Professional Overview</h1>
      <form>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
            <Form.Field
                control={Select} 
                fluid
                label="I am a/an"
                placeholder="Profession"
                defaultValue={profession}
                options={professionList.map(({ text, value }) => ({ text, key: value, value }))} />    
            </Grid.Column>
            <Grid.Column>
              <Form.Field 
                fluid
                control={Select}
                label="With..."
                placeholder="years of experience"
                defaultValue={yearsOfExp}
                options={[...Array(10).keys()].map(value => ({ text: `${value} ${value !== 1 ? 'years' : 'year'}`, key: value, value, }))}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid> 
        <div>
          <Checkbox
            inputProps={{
              'aria-label': 'I am open to working in a different role',
            }}
            checked={openToDiffRole} 
          />
        </div>
        <Divider hidden />
        <div>
          <label>I would like to work as...</label>
          <Select
            placeholder="Profession list"
            onChange={(e) => console.log({ e })}
            defaultValue={preferenceToWork}
          >
            {professionList.map(({ text, value }) => (
              <MenuItem key={value} value={value}>{text}</MenuItem>
            ))}
          </Select>
        </div>
        <Divider hidden />
        <div>
          <h3>Rank your top 3 skills</h3>
            <Grid>
              <Grid.Row columns={3}>
                {[...Array(3).keys()].map(index => (
                  <Grid.Column>
                    <Form.Field
                      fluid
                      control={Select}
                      defaultValue={skillRank[index].skillId}
                      options={skillList?.map(({ name, id }: any) => ({ text: name, key: id, value: id }))}
                    />
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
        </div>
      </form>
    </ProfileSectionWrapper>
  );
};

export default ProfessionalProfileSection;