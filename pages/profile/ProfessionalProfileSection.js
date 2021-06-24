import { Checkbox, Dropdown } from 'semantic-ui-react'

import { professionList, skillList } from '../../constants';
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
              <option key={value} value={value}>{text}</option>
            ))}
          </select>
        </li>
        <li>
          <label>With...</label>
          <select>
            {[...Array(10).keys()].map(val => (
              <option key={val} value={val}>{val} years</option>
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
      <div>
        <h3>Rank your top 3 skills</h3>
        <article>
          {[...Array(3).keys()].map(() => (
            <section>
              <aside>
                <select>
                  {skillList.map(({ text, value }) => (
                    <option key={value} value={value}>{text}</option>
                  ))}
                </select>
              </aside>
              <aside>
                <select>
                  {[...Array(10).keys()].map(val => (
                    <option key={val} value={val}>{val} years</option>
                  ))}
                  <option value="10">10+ years</option>
                </select>
              </aside>
            </section>
          ))}
        </article>
      </div>
    </form>
  </ProfileSectionWrapper>
);

export default ProfessionalProfileSection;