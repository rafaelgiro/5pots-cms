import { ChangeIconProps } from "./interfaces";

const BuffIcon = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 34 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="16.9707"
        y="6.12156"
        width="61.76%"
        height="55.26%"
        transform="rotate(45 16.9707 6.12156)"
        stroke="#3C353D"
        strokeWidth="3"
      />
      <rect
        x="16.9712"
        y="1.41421"
        width="41.18%"
        height="36.84%"
        transform="rotate(45 16.9712 1.41421)"
        stroke="#3C353D"
        strokeWidth="2"
      />
    </svg>
  );
};

const NerfIcon = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 34 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="16.9705"
        y="2.12132"
        width="21"
        height="21"
        transform="rotate(45 16.9705 2.12132)"
        stroke="#3C353D"
        strokeWidth="3"
      />
      <rect
        x="16.9709"
        y="17.414"
        width="14"
        height="14"
        transform="rotate(45 16.9709 17.414)"
        stroke="#3C353D"
        strokeWidth="2"
      />
    </svg>
  );
};

const AdjustIcon = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 34 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="16.9705"
        y="6.12156"
        width="21"
        height="21"
        transform="rotate(45 16.9705 6.12156)"
        stroke="#3C353D"
        strokeWidth="3"
      />
      <rect
        x="16.9709"
        y="1.41421"
        width="14"
        height="14"
        transform="rotate(45 16.9709 1.41421)"
        stroke="#3C353D"
        strokeWidth="2"
      />
      <rect
        x="16.9709"
        y="21.4142"
        width="14"
        height="14"
        transform="rotate(45 16.9709 21.4142)"
        stroke="#3C353D"
        strokeWidth="2"
      />
    </svg>
  );
};

const ReworkIcon = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 44 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="37.1629"
        y="16.9706"
        width="21"
        height="21"
        transform="rotate(135 37.1629 16.9706)"
        stroke="#3C353D"
        strokeWidth="3"
      />
      <rect
        x="41.87"
        y="16.9711"
        width="14"
        height="14"
        transform="rotate(135 41.87 16.9711)"
        stroke="#3C353D"
        strokeWidth="2"
      />
      <rect
        x="21.87"
        y="16.9711"
        width="14"
        height="14"
        transform="rotate(135 21.87 16.9711)"
        stroke="#3C353D"
        strokeWidth="2"
      />
    </svg>
  );
};

const ChangeIcon = (props: ChangeIconProps) => {
  const { type } = props;

  switch (type) {
    case "buff":
      return <BuffIcon />;
    case "nerf":
      return <NerfIcon />;
    case "adjust":
      return <AdjustIcon />;
    default:
      return <ReworkIcon />;
  }
};

export default ChangeIcon;
