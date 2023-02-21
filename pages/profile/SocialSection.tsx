import { Icon, Input, SemanticICONS } from "semantic-ui-react"
import { useAuthStore } from "src/stores"
import { InputRow, ProfileSectionWrapper } from "./style"

type Social = {
  name: SemanticICONS
  url: string
}
const SocialSection = () => {
  const userData = useAuthStore((state: any) => state.user)
  if (!userData) return <>Loading</>

  const { social } = userData
  return (
    <ProfileSectionWrapper>
      <h1>Social Profile</h1>
      {social.map(({ name, url }: Social) => (
        <InputRow key={name}>
          <Input iconPosition="left" defaultValue={url} placeholder={name}>
            <Icon name={name} />
            <input />
          </Input>
        </InputRow>
      ))}
    </ProfileSectionWrapper>
  )
}

export default SocialSection
