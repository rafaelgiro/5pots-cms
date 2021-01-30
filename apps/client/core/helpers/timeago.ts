import { SelfI } from "./interfaces";

const TimeAgo = (function () {
  const self: SelfI = {};

  // Public Methods
  self.locales = {
    prefix: "",
    sufix: "atrás",

    seconds: "menos que um minuto",
    minute: "por volta de um minuto",
    minutes: "%d minutos",
    hour: "por volta de uma hora",
    hours: "por volta de %d horas",
    day: "um dia",
    days: "%d dias",
    month: "por volta de um mês",
    months: "%d months",
    year: "por volta de um ano",
    years: "%d anos",
  };

  self.inWords = function (timeAgo) {
    const seconds = Math.floor((new Date().getTime() - timeAgo) / 1000);
    const separator = this.locales?.separator || " ";
    let words = this.locales?.prefix + separator;
    let interval = 0;
    const intervals: { [key: string]: number } = {
      year: seconds / 31536000,
      month: seconds / 2592000,
      day: seconds / 86400,
      hour: seconds / 3600,
      minute: seconds / 60,
    };

    let distance = this.locales?.seconds;

    for (const key in intervals) {
      interval = Math.floor(intervals[key]);

      if (this.locales)
        if (interval > 1) {
          distance = this.locales[key + "s"];
          break;
        } else if (interval === 1) {
          distance = this.locales[key];
          break;
        }
    }

    distance = distance?.replace(/%d/i, interval.toString());
    words += distance + separator + this.locales?.sufix;

    return words.trim();
  };

  return self;
})();

export default TimeAgo;
