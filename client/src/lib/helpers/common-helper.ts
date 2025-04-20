import moment from "moment";
import { OpeningHours } from "../../utils/types";
import { BikeParkQuery, PriceInput } from "../graphql/generated/graphql-operations";

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

function isParkOpen(from: string, to: string) {
  const currentTime = moment();
  const openingTime = moment(from, "HH:mm"); // moment().set({ hour: 9, minute: 0, second: 0 });
  const closingTime = moment(to, "HH:mm"); //moment().set({ hour: 17, minute: 0, second: 0 }); // 05:00 PM

  if (currentTime.isBetween(openingTime, closingTime, null, '[)')) {
    return 'Open';
  }

  return 'Closed';
}

const formatOpeningHours = (openingHours: BikeParkOpeningHours | null | undefined): OpeningHours[] => {
  if (!openingHours) {
    return [];
  }

  return [
    {
      days: 'Monday',
      hours: {
        from: openingHours.monday?.from ?? null,
        to: openingHours.monday?.to ?? null,
      }
    },
    {
      days: 'Tuesday',
      hours: {
        from: openingHours.tuesday?.from ?? null,
        to: openingHours.tuesday?.to ?? null,
      }
    },
    {
      days: 'Wednesday',
      hours: {
        from: openingHours.wednesday?.from ?? null,
        to: openingHours.wednesday?.to ?? null,
      }
    },
    {
      days: 'Thursday',
      hours: {
        from: openingHours.thursday?.from ?? null,
        to: openingHours.thursday?.to ?? null,
      }
    },
    {
      days: 'Friday',
      hours: {
        from: openingHours.friday?.from ?? null,
        to: openingHours.friday?.to ?? null,
      }
    },
    {
      days: 'Saturday',
      hours: {
        from: openingHours.saturday?.from ?? null,
        to: openingHours.saturday?.to ?? null,
      }
    },
    {
      days: 'Sunday',
      hours: {
        from: openingHours.sunday?.from ?? null,
        to: openingHours.sunday?.to ?? null,
      }
    },
  ];
};

export const getCurrentWorkingStatus = (openingHours: BikeParkOpeningHours | null | undefined): string | undefined => {
  if (!openingHours) {
    return 'Might be closed';
  }

  const day = moment().format('dddd');
  const hours = formatOpeningHours(openingHours).find(({ days }) => days === day)?.hours;
  return hours?.from && hours?.to ? isParkOpen(hours.from, hours.to) : "Might be closed";
};

export const getCurrentWorkingHours = (openingHours: BikeParkOpeningHours | null | undefined): string | undefined => {
  if (!openingHours) {
    return 'Unknown';
  }

  const day = moment().format('dddd');
  const hours = formatOpeningHours(openingHours).find(({ days }) => days === day)?.hours;
  return hours?.from && hours?.to && isParkOpen(hours.from, hours.to) ? [hours?.from, hours?.to].join(" - ") : "Unknown";
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

  if (weekdays.every((day) => day.hours?.from === null)) {
    return "Unknown"
  }

  return weekdays.every((day) => day.hours?.from === weekdays[0].hours?.from) ? [weekdays[0].hours?.from, weekdays[0].hours?.to].join(" - ") : formatHours(weekdays);
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

  if (weekendDays.every((day) => day.hours?.from === null)) {
    return "Unknown"
  }

  return weekendDays.every((day) => day.hours?.from === weekendDays[0].hours?.from) ? [weekendDays[0].hours?.from, weekendDays[0].hours?.to].join(" - ") : formatHours(weekendDays);
};

export const bikeParkStatus = [
  { status: "Open", value: "open" },
  { status: "Closed", value: "closed" },
  { status: "Maintenance", value: "maintenance" },
];

export const bikeParkPasses = [
  { name: "Daily Pass", value: "daily" },
  { name: "Multi-Day Pass", value: "multy_day" },
  { name: "Season Pass", value: "season" },
  { name: "Family Pass", value: "family" },
  { name: "Group Pass", value: "group" },
  { name: "Lift Access Pass", value: "lift_access" },
  { name: "Shuttle Pass", value: "shuttle" },
];

export const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "DKK", name: "Danish Krone" },
  { code: "CZK", name: "Czech Koruna" },
  { code: "PLN", name: "Polish Zloty" },
  { code: "HUF", name: "Hungarian Forint" },
  { code: "RON", name: "Romanian Leu" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "BGN", name: "Bulgarian Lev" },
  { code: "HRK", name: "Croatian Kuna" },
  { code: "INR", name: "Indian Rupee" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "ZAR", name: "South African Rand" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "KRW", name: "South Korean Won" },
  { code: "AED", name: "UAE Dirham" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "ILS", name: "Israeli New Shekel" }
];

export const featuresObject = [
  { name: "Flow Trail", icon: "person-biking-mountain", color: "blue", description: "Smooth, winding trails with berms and rollers for a fun, flowing ride." },
  { name: "Jump Line", icon: "fperson-skiing-jumping", color: "orange", description: "Trails filled with jumps of various sizes for airtime and tricks." },
  { name: "Downhill", icon: "angles-down", color: "red", description: "Steep, fast trails with technical sections, built for high-speed descents." },
  { name: "Enduro Routes", icon: "person-running", color: "purple", description: "Challenging trails combining uphill climbs and technical downhill sections." },
  { name: "Cross Country", icon: "bicycle", color: "green", description: "Varied terrain trails focusing on endurance, speed, and distance." },
  { name: "Freeride", icon: "person-biking", color: "yellow", description: "Trails with natural and man-made obstacles designed for creative, technical riding." },
  { name: "Pump Track", icon: "wave-square", color: "cyan", description: "A compact loop of rollers and berms designed for riding without pedaling." },
  { name: "Skills Area", icon: "graduation-cap", color: "indigo", description: "A training zone with features to practice and improve MTB techniques." },
  { name: "XC Trails", icon: "bicycle", color: "emerald", description: "Cross-country trails emphasizing fitness, efficiency, and technical skills." },
  { name: "Rock Gardens", icon: "mountain-rock", color: "stone", description: "Sections of trail filled with rocks, testing balance and bike control." },
  { name: "Natural Trails", icon: "tree", color: "stone", description: "Untouched, raw trails following natural terrain and features." },
  { name: "Race Track", icon: "flag-checkered", color: "red", description: "A competitive course built for MTB races and time trials." },
  { name: "Gravity Trails", icon: "person-falling", color: "violet", description: "Trails focused on downhill riding, using gravity for speed and flow." },
  { name: "Family Route", icon: "people-group", color: "teal", description: "Easy, safe trails ideal for family rides and all skill levels." },
  { name: "North Shore", icon: "bridge", color: "slate", description: "Technical trails with wooden features, drops, and skinnies." },
  { name: "Dirt Jumps", icon: "mountain", color: "amber", description: "Dedicated areas with dirt ramps for jumping and trick riding." },
  { name: "Training Area", icon: "dumbbell", color: "blue", description: "A practice area with varied features to build riding confidence." },
  { name: "Scenic Routes", icon: "mountain-sun", color: "green", description: "Leisurely trails offering beautiful views and relaxed riding." },
  { name: "Beginner Zone", icon: "star", color: "sky", description: "Safe and simple trails designed for new and learning riders." },
  { name: "Kids Zone", icon: "child", color: "pink", description: "Special trails and areas tailored for young and beginner kids." }
];

export type Price = {
  name: string | null;
  price: number | null;
  currency: string | null;
};

export type OpeningHoursDay = {
  from?: string;
  to?: string;
};

export type FormValues = {
  name: string;
  description?: string | null;
  location: string;
  imageUrl?: string | null;
  difficulty?: string;
  status?: string | null;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  contact?: {
    email?: string | null;
    phone?: string | null;
    website?: string | null;
  } | null | undefined;
  socialMedia?: {
    facebook?: string | null;
    instagram?: string | null;
    youtube?: string | null;
    strava?: string | null;
  } | null;
  openingHours?: {
    [day: string]: {
      from?: string | null;
      to?: string | null;
    } | null;
  } | null;
  prices?: PriceInput[];
  photos?: string[];
  videos?: string[];
  rules?: string[];
  facilities?: string[];
  features?: string[];
};