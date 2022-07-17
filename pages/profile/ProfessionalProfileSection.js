import { useContext } from "react";
import { Checkbox, Dropdown, Divider } from "semantic-ui-react";
import { professionList } from "../../constants";
import AppContext from "../context";
import { ProfileSectionWrapper } from "./style";

const ProfessionalProfileSection = () => {
  const { skillList, userData } = useContext(AppContext);
  const { professionalOverview: { openToDiffRole, profession, yearsOfExp, skillRank, preferenceToWork } } = userData;
  return (
    <ProfileSectionWrapper>
      <h1>Professional Overview</h1>
      <form>
        <ul>
          <li>
            <label>I am a/an</label>
            <select defaultValue={profession} onChange={() => console.log("change")}>
              {professionList.map(({ text, value }) => (
                <option key={value} value={value}>{text}</option>
              ))}
            </select>
          </li>
          <li>
            <label>With...</label>
            <select defaultValue={yearsOfExp} onChange={() => console.log("change")}>
              {[...Array(10).keys()].map(val => (
                <option key={val} value={val}>{val} years</option>
              ))}
              <option value="10">10+ years</option>
            </select>
          </li>
        </ul>
        <div>
          <Checkbox label="I am open to working in a different role" checked={openToDiffRole} />
        </div>
        <Divider hidden />
        <div>
          <label>I would like to work as...</label>
          <Dropdown
            placeholder="Profession list"
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
              <section key={index}>
                <aside>
                  <select defaultValue={skillRank[index].skillId} onChange={() => console.log("change")}>
                    {skillList?.map(({ name, id }) => (
                      <option key={name} value={id}>{name}</option>
                    ))}
                  </select>
                </aside>
                <aside>
                  <select defaultValue={skillRank[index].yearsOfExp} onChange={() => console.log("change")}>
                    {[...Array(10).keys()].map(val => (
                      <option key={val} value={val}>{val} years</option>
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