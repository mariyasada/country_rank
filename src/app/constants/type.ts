export type countryProps = {
  name: { common: string };
  population: number;
  area: number;
  flags: { png: string};
  capital: string[];
  region: string;
  cca3: string;
  languages: { [key: string]: string };
  currencies: { key: { name: string } };
  subregion: string;
  unMember: boolean;
};
export type ageProps = {
  ageGroup?: string;
  females: number;
  males: number;
  age?: number;
  name: string;
};

//
const AGE_CONSTANTS = {
  0: "0-20",
  1: "20-40",
  2: "40-60",
  3: "60-80",
  4: "80-100",
};

// utils
export const getAgeGroup = (age: number): string | null => {
  if (age >= 0 && age < 21) {
    return "0-20";
  } else if (age >= 21 && age < 31) {
    return "21-30";
  } else if (age >= 31 && age < 41) {
    return "31-40";
  } else if (age >= 41 && age < 51) {
    return "41-50";
  } else if (age >= 51 && age < 61) {
    return "51-60";
  } else if (age >= 61 && age < 71) {
    return "61-70";
  } else if (age >= 71 && age < 81) {
    return "71-80";
  } else if (age >= 81 && age < 91) {
    return "81-90";
  } else if (age >= 91 && age < 101) {
    return "91-100";
  }

  return null;
};
