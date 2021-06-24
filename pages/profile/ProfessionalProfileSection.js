import { Checkbox, Dropdown } from 'semantic-ui-react'

import { professionList } from '../../constants';
import { ProfileSectionWrapper } from './style';

const ProfessionalProfileSection = () => (
  <ProfileSectionWrapper>
    <h1>Professional Overview</h1>
    <form>
      <ul>
        <li>
          <label>I am a/an</label>
          <select>
            {professionList.map(({ text, value }) => (
              <option value={value}>{text}</option>
            ))}
          </select>
        </li>
        <li>
          <label>With...</label>
          <select>
            {[...Array(10).keys()].map(val => (
              <option value={val}>{val} years</option>
            ))}
            <option value="10">10+ years</option>
          </select>
        </li>
      </ul>
      <div>
        <Checkbox label='I am open to working in a different role' />
      </div>
      <div>
        <label>I would like to work as...</label>
        <Dropdown
          placeholder='Profession list'
          fluid
          multiple
          selection
          options={professionList}
        />
      </div>
    </form>
  </ProfileSectionWrapper>
);

export default ProfessionalProfileSection;