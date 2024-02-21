import { ReactNode } from 'react'
import { Label } from 'semantic-ui-react'

type SkillLabelProps = {
  size?: 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive'
  color?:
    | 'red'
    | 'orange'
    | 'yellow'
    | 'olive'
    | 'green'
    | 'teal'
    | 'blue'
    | 'violet'
    | 'purple'
    | 'pink'
    | 'brown'
    | 'grey'
    | 'black'
  children?: ReactNode
}

export const SkillLabel = ({ size = 'small', color = 'blue', children }: SkillLabelProps): JSX.Element => (
  <Label size={size} color={color}>
    {children}
  </Label>
)
