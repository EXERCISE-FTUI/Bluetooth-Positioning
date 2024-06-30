import { LinearGradient } from "expo-linear-gradient";

function ContainerBackground() {
  return (
    <LinearGradient
      colors={["#2A2D32", "#131313FE"]}
      style={{
        display: "flex",
        flex: 1,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: 800,
      }}
    />
  );
}

export default ContainerBackground;
