import { css } from "@/styled-system/css";

export function TestComponent() {
  return <button className={buttonStyle}>Test Component</button>;
}

const buttonStyle = css({
  color: "red",
  fontSize: 16,
  fontWeight: "bold",
  padding: 16,
  borderRadius: 8,
  border: "none",
  backgroundColor: "blue",
  "&:hover": {
    backgroundColor: "red",
  },
});
