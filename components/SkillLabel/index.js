import { Label } from "semantic-ui-react";

const SkillLabel = ({ size = "small", color = "blue", children }) => (
  <Label size={size} color={color}>{children}</Label>
);

export default SkillLabel;