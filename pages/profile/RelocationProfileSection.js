import { Checkbox, Radio } from 'semantic-ui-react';
import { ProfileSectionWrapper } from './style';
import { countriesList } from '../../constants';

const RelocationProfileSection = () => (
  <ProfileSectionWrapper>
    <h1>Relocation</h1>
    <form>
      <div>
        <label>Are you open to remote jobs?</label>
        <select>
          <option value={true}>Yes</option>
          <option value={false}>no</option>
        </select>
      </div>
      <div>
        <label>Where would you like to work?</label>
        <select>
          {countriesList.map(({ name, value }) => (
            <option value={value}>{name}</option>
          ))}
        </select>
      </div>
      <article>
        <section>
          <aside>
            <label>Annual salary expectation CAD</label>
            <select>
            <option value="0">70k - 80k</option>
              <option value="1">81k - 90k</option>
              <option value="2">91k - 100k</option>
              <option value="3">101k - 110k</option>
              <option value="4">111k - 120k</option>
              <option value="5">120k+</option>
            </select>
          </aside>
          <aside>
            <label>Canadian visa status</label>
            <select>
              <option value="0">No visa</option>
              <option value="1">Visitor</option>
              <option value="2">Study Permit</option>
              <option value="3">ETA</option>
              <option value="4">Open Work Permit</option>
              <option value="5">Closed Work Permit</option>
              <option value="6">Permanent Resident</option>
              <option value="7">Citizen</option>
            </select>
          </aside>
        </section>
        <section>
          <aside>
            <label>Annual remote salary expectation (USD)</label>
            <select>
              <option value="0">70k - 80k</option>
              <option value="1">81k - 90k</option>
              <option value="2">91k - 100k</option>
              <option value="3">101k - 110k</option>
              <option value="4">111k - 120k</option>
              <option value="5">120k+</option>
            </select>
          </aside>
        </section>
        <section>
          <aside>
            <label>
              Do you have a valid passport?
              <br />
              <Radio 
                label="yes"
                name="valid_passport"
                value={true}
              />
              <Radio 
                label="no"
                name="valid_passport"
                value={false}
              />
            </label>
          </aside>
          <aside>
            <label>
              What size company do you prefer?
              <br />
              <Checkbox label="Startup" />
              <Checkbox label="Midsize" />
              <Checkbox label="Corporate" />
            </label>
          </aside>
        </section>
        <section>
          <aside>
            <label>
              Are you actively looking for a job?
              <br />
              <Radio 
                label="yes"
                name="actively_looking_for_job"
                value={true}
              />
              <Radio 
                label="no"
                name="actively_looking_for_job"
                value={false}
              />
            </label>
          </aside>
          <aside>
            <label>What is your notice period?</label>
            <select>
              <option>2 weeks</option>
              <option>1 month</option>
              <option>2 months</option>
              <option>2+ months</option>
            </select>
          </aside>
        </section>
      </article>
    </form>
  </ProfileSectionWrapper>
);

export default RelocationProfileSection;