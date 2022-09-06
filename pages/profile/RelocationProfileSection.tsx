import { useContext } from "react";
import { Checkbox, Radio } from "semantic-ui-react";
import { ProfileSectionWrapper } from "./style";
import { countriesList } from "../../constants";
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
  return (
    <ProfileSectionWrapper>
      <h1>Relocation</h1>
      <form>
        <div>
          <label>Are you open to remote jobs?</label>
          <select defaultValue={openToRemote} onChange={() => console.log("change")}>
            <option value={'true'}>Yes</option>
            <option value={'false'}>no</option>
          </select>
        </div>
        <div>
          <label>Where would you like to work?</label>
          <select defaultValue={relocateOptions} onChange={() => console.log("change")}>
            {countriesList.map(({ name, code }) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>
        <article>
          <section>
            <aside>
              <label>Annual salary expectation CAD</label>
              <select defaultValue={cadSalaryExpect} onChange={() => console.log("change")}>
                {salaryRange.map(({ value, text}) => (
                  <option key={value} value={value}>{text}</option>
                ))}
              </select>
            </aside>
            <aside>
              <label>Canadian visa status</label>
              <select defaultValue={canadianVisa} onChange={() => console.log("change")}>
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
              <select defaultValue={usdSalaryExpect} onChange={() => console.log("change")}>
                {salaryRange.map(({ value, text}) => (
                  <option key={value} value={value}>{text}</option>
                ))}
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
                  // value={true}
                  checked={validPassport}
                />
                <Radio 
                  label="no"
                  name="valid_passport"
                  // value={false}
                  checked={!validPassport}
                />
              </label>
            </aside>
            <aside>
              <label>
                What size company do you prefer?
                <br />
                <Checkbox onChange={() => console.log("change")} checked={companySize.includes("startup")} label="Startup" />
                <Checkbox onChange={() => console.log("change")} checked={companySize.includes("midsize")} label="Midsize" />
                <Checkbox onChange={() => console.log("change")} checked={companySize.includes("corporate")} label="Corporate" />
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
                  // value={true}
                  checked={activelyLooking}
                  onChange={() => console.log("change")}
                />
                <Radio 
                  label="no"
                  name="actively_looking_for_job"
                  // value={false}
                  checked={!activelyLooking}
                  onChange={() => console.log("change")}
                />
              </label>
            </aside>
            <aside>
              <label>What is your notice period?</label>
              <select defaultValue={noticePeriod} onChange={() => console.log("change")}>
                <option value="0">2 weeks</option>
                <option value="1">1 month</option>
                <option value="2">2 months</option>
                <option value="3">2+ months</option>
              </select>
            </aside>
          </section>
        </article>
      </form>
    </ProfileSectionWrapper>
  );
};

export default RelocationProfileSection;