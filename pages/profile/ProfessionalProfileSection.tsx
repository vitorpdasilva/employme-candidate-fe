import React from 'react'
import { useContext } from "react";
import { Divider, Grid, Form } from "semantic-ui-react";
import { professionList } from "../../constants";
import { AppContext } from "../../src/context";
import { ProfileSectionWrapper } from "./style";
import { useAuthStore } from "../../stores";
import { Checkbox, Select, MenuItem, InputLabel } from '@mui/material'

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
              <InputLabel>I am a/an</InputLabel>
              <Select placeholder='profession' defaultValue={profession}>
                {professionList.map(({ text, value }) => (
                  <MenuItem key={value} value={value}>{text}</MenuItem>
                ))}
              </Select>
            </Grid.Column>
            <Grid.Column>
              <InputLabel>With...</InputLabel>
              <Select defaultValue={yearsOfExp}>
                {[...Array(10).keys()].map(value => (
                  <MenuItem key={value} value={value}>{`${value} ${value !== 1 ? 'years' : 'year'}`}</MenuItem>
                ))}
              </Select>
            </Grid.Column>
          </Grid.Row>
        </Grid> 
        <div>
          <InputLabel>I am open to working in a different role</InputLabel>
          <Checkbox
            aria-label=''
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