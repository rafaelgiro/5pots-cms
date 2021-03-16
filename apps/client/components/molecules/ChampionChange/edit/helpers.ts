import { ChangeBlockProps } from "../interfaces";

export const defaultChangeBlock = {
  type: "change",
  attribute: "ATRIBUTO",
  before: "10/20/30/40/50",
  after: "20/30/40/50/60",
} as ChangeBlockProps["block"];

export const defaultAbility = {
  stat: "p",
  blocks: [defaultChangeBlock],
} as { stat: AbilityKey; blocks: ChangeBlockProps["block"][] };
