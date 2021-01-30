export interface SelfI {
  locales?: { [key: string]: string };
  inWords?: (timeAgo: number) => string;
}
