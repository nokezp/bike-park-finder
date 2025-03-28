import moment from "moment";
import { OpeningHours } from "../../utils/types";
import { BikeParkQuery } from "../graphql/generated/graphql-operations";

type BikeParkOpeningHours = NonNullable<NonNullable<BikeParkQuery['bikePark']>['openingHours']>;

export function getTrailStatusColorClass(status: string) {
  switch (status) {
    case 'open':
      return 'bg-green-100 text-green-600';
    case 'close':
      return 'bg-red-100 text-red-600';
    case 'Maintenance':
      return 'bg-yellow-100 text-yellow-600';
    default:
      return 'bg-green-100 text-green-600';
  }
}

export function getTrailDifficultyColorClass(difficulty: string) {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-600';
    case 'intermediate':
      return 'bg-blue-100 text-blue-600';
    case 'expert':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-green-100 text-green-600';
  }
}

export function getWeatherIcon(icon: string): string {
  return `http://openweathermap.org/img/w/${icon}.png`;
}

export function getYouTubeEmbedUrl(url: string): string {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
}

export const formatCurrency = (amount: number | undefined, currencyCode: string | undefined) => {
  if (!amount || !currencyCode) {
    return 'Unknown';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

export const convertUnixToDayName = (unixTimestamp: number) => {
  const date = moment.unix(unixTimestamp);
  const today = moment().startOf('day');
  const tomorrow = moment().add(1, 'days').startOf('day');

  if (date.isSame(today, 'day')) {
    return 'Today';
  } else if (date.isSame(tomorrow, 'day')) {
    return 'Tomorrow';
  } else {
    return date.format('dddd'); // Returns the name of the weekday
  }
};

const formatOpeningHours = (openingHours: BikeParkOpeningHours | null | undefined): OpeningHours[] => {
  if (!openingHours) {
    return [];
  }

  return [
    { days: 'Monday', hours: openingHours.monday || 'Closed' },
    { days: 'Tuesday', hours: openingHours.tuesday || 'Closed' },
    { days: 'Wednesday', hours: openingHours.wednesday || 'Closed' },
    { days: 'Thursday', hours: openingHours.thursday || 'Closed' },
    { days: 'Friday', hours: openingHours.friday || 'Closed' },
    { days: 'Saturday', hours: openingHours.saturday || 'Closed' },
    { days: 'Sunday', hours: openingHours.sunday || 'Closed' },
  ];
};

export const getCurrentWorkingStatus = (openingHours: BikeParkOpeningHours | null | undefined): string | undefined => {
  if (!openingHours) {
    return 'Unknown';
  }

  const day = moment().format('dddd');
  return formatOpeningHours(openingHours).find(({ days }) => days === day)?.hours;
};

export const getWorkWeekStatus = (openingHours: BikeParkOpeningHours | null | undefined): string | undefined => {
  if (!openingHours) {
    return 'Unknown';
  }

  const workingHours = formatOpeningHours(openingHours);
  const formatHours = (days: OpeningHours[]) => {
    return days.map((day) => `${day.days}: ${day.hours}`).join('\n');
  };

  const weekdays = workingHours.slice(0, 5);
  return weekdays.every((day) => day.hours === weekdays[0].hours) ? weekdays[0].hours : formatHours(weekdays);
};

export const getWeekendStatus = (openingHours: BikeParkOpeningHours | null | undefined): string | undefined => {
  if (!openingHours) {
    return 'Unknown';
  }

  const workingHours = formatOpeningHours(openingHours);
  const formatHours = (days: OpeningHours[]) => {
    return days.map((day) => `${day.days}: ${day.hours}`).join('\n');
  };

  const weekendDays = workingHours.slice(5);
  return weekendDays.every((day) => day.hours === weekendDays[0].hours) ? weekendDays[0].hours : formatHours(weekendDays);
};