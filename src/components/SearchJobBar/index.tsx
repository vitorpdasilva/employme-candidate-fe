import { FaSearch } from 'react-icons/fa'
import { countriesList } from 'src/constants'
import SearchJobBarStyled from './style'

export const SearchJobBar = (): JSX.Element => {
  return (
    <>
      <h1>Find your dream job abroad or remote</h1>
      <SearchJobBarStyled>
        <form>
          <article>
            <div>
              <p>What</p>
              <input placeholder="Job title or tech skill" />
            </div>
            <div>
              <p>Where</p>
              <select defaultValue="nop">
                <option value="nop" disabled>
                  Country or city name
                </option>
                {countriesList.map(({ name, code }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p>remote or relocate?</p>
              <select>
                <option value="remote">remote</option>
                <option value="relocate">relocate</option>
              </select>
            </div>
          </article>
          <aside>
            <button type="submit">
              <FaSearch style={{ fontSize: 24 }} />
            </button>
          </aside>
        </form>
      </SearchJobBarStyled>
    </>
  )
}
