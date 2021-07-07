import { Checkbox, Dropdown, Divider } from 'semantic-ui-react'

import { professionList, skillList } from '../../constants';
import { ProfileSectionWrapper } from './style';

const ProfessionalProfileSection = ({ data }) => {
  const { professionalOverview: { openToDiffRole, profession, yearsOfExp, skillRank, preferenceToWork } } = data;
  return (
    <ProfileSectionWrapper>
      <h1>Professional Overview</h1>
      <form>
        <ul>
          <li>
            <label>I am a/an</label>
            <select>
              {professionList.map(({ text, value }) => (
                <option selected={profession === value} key={value} value={value}>{text}</option>
              ))}
            </select>
          </li>
          <li>
            <label>With...</label>
            <select>
              {[...Array(10).keys()].map(val => (
                <option selected={yearsOfExp === val} key={val} value={val}>{val} years</option>
              ))}
              <option value="10">10+ years</option>
            </select>
          </li>
        </ul>
        <div>
          <Checkbox label='I am open to working in a different role' checked={openToDiffRole} />
        </div>
        <Divider hidden />
        <div>
          <label>I would like to work as...</label>
          <Dropdown
            placeholder='Profession list'
            fluid
            multiple
            selection
            options={professionList}
            onChange={(e, { value }) => console.log(value)}
            defaultValue={preferenceToWork}
          />
        </div>
        <Divider hidden />
        <div>
          <h3>Rank your top 3 skills</h3>
          <article>
            {[...Array(3).keys()].map(index => (
              <section>
                <aside>
                  <select>
                    {skillList.map(({ text, value }) => (
                      <option selected={value === skillRank[index].skill} key={value} value={value}>{text}</option>
                    ))}
                  </select>
                </aside>
                <aside>
                  <select>
                    {[...Array(10).keys()].map(val => (
                      <option selected={skillRank[index].yearsOfExp === val} key={val} value={val}>{val} years</option>
                    ))}
                  </select>
                </aside>
              </section>
            ))}
          </article>
        </div>
      </form>
    </ProfileSectionWrapper>
  );
};

export default ProfessionalProfileSection;