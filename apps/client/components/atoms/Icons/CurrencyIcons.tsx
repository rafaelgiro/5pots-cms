import { CurrencyIconsProps } from "./interfaces";

const RPIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 82 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.3823 9.69697L40.7692 0L54.1561 9.69697V48.4848L40.7692 57.5758L27.3823 48.4848V9.69697Z"
      fill="#EBC86E"
    />
    <path
      d="M65.1091 54.5455V16.9697L81.5385 30.303L76.062 34.5455V52.1212L81.5385 57.5758L46.2457 80V66.6667L65.1091 54.5455Z"
      fill="#EBC86E"
    />
    <path
      d="M0 30.303L15.8209 16.9697V54.5455L34.6843 66.6667V80L0 57.5758L4.86797 52.1212V34.5455L0 30.303Z"
      fill="#EBC86E"
    />
  </svg>
);

const BEIcon = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 64 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.19476 32.0599L31.7603 0L47.3408 16.1798L27.2659 40.4494L4.19476 32.0599Z"
        fill="#3DBDD3"
      />
      <path
        d="M36.2547 44.9438L51.8352 28.764L63.221 40.4494L51.8352 51.8352L36.2547 44.9438Z"
        fill="#3DBDD3"
      />
      <path
        d="M31.7603 80L0 40.4494L47.3408 60.824L31.7603 80Z"
        fill="#3DBDD3"
      />
    </svg>
  );
};

const GemstoneIcon = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 64 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.19476 32.0599L31.7603 0L47.3408 16.1798L27.2659 40.4494L4.19476 32.0599Z"
        fill="934cf2"
      />
      <path
        d="M36.2547 44.9438L51.8352 28.764L63.221 40.4494L51.8352 51.8352L36.2547 44.9438Z"
        fill="934cf2"
      />
      <path
        d="M31.7603 80L0 40.4494L47.3408 60.824L31.7603 80Z"
        fill="934cf2"
      />
    </svg>
  );
};

const PrestigeIcon = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 62 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.7865 72.6221L5.67853 40L30.7865 7.37795L55.8945 40L30.7865 72.6221Z"
        stroke="#EBC86E"
        strokeWidth="9"
      />
      <path d="M19 40.36L31 25L43 40.36L31 55.72L19 40.36Z" fill="#3DBDD3" />
    </svg>
  );
};

const CurrencyIcons = (props: CurrencyIconsProps) => {
  const { currency } = props;

  switch (currency) {
    case "rp":
      return <RPIcon />;
    case "be":
      return <BEIcon />;
    case "gemstone":
      return <GemstoneIcon />;
    default:
      return <PrestigeIcon />;
  }
};

export default CurrencyIcons;
