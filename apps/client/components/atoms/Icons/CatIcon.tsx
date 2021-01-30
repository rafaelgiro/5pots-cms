const CatIcon = ({ stroke }: { stroke: string }) => (
  <svg
    width="41"
    height="29"
    viewBox="0 0 41 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="14.1423"
      y="14.1422"
      width="17"
      height="17"
      transform="rotate(-45 14.1423 14.1422)"
      strokeWidth="3"
      stroke={stroke || "#3C353D"}
    />
    <rect
      x="2.12132"
      y="14.1717"
      width="17"
      height="17"
      transform="rotate(-45 2.12132 14.1717)"
      strokeWidth="3"
      stroke={stroke || "#3C353D"}
    />
  </svg>
);

export default CatIcon;
