import clsx from "clsx";
import ChangeIcon from "../../../atoms/Icons/ChangeIcon";
import { ChangeIconProps } from "../../../atoms/Icons/interfaces";
import { ChangeChampionGoalProps } from "../interfaces";

import styles from "./styles.module.scss";

const ChangeChampionGoal = (props: ChangeChampionGoalProps) => {
  const { handleGoalChange, championName, goal: currGoal } = props;
  const goalsMap: { value: ChangeIconProps["type"]; label: string }[] = [
    {
      value: "buff",
      label: "Buff",
    },
    {
      value: "nerf",
      label: "Nerf",
    },
    {
      value: "adjust",
      label: "Ajuste",
    },
    {
      value: "rework",
      label: "Rework",
    },
  ];

  return (
    <div className={styles["change-goal"]}>
      {goalsMap.map((goal) => (
        <button
          key={`${championName}-${goal.value}-btn`}
          onClick={() => handleGoalChange(goal.value)}
          className={clsx(
            styles["change-goal__btn"],
            currGoal === goal.value && styles["change-goal__btn--active"]
          )}
        >
          <ChangeIcon type={goal.value} />
          <span>{goal.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ChangeChampionGoal;
