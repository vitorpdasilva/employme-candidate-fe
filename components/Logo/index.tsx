import { colors } from "../../styles/theme";

const Logo = () => (
  <div
    style={{
      width: 45,
      height: 45,
      background: colors.blue.default,
      borderRadius: 5,
      color: colors.white.default,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    EM
  </div>
);

export default Logo;