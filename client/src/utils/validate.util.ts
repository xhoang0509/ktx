import {
  AlphabetNumberOnlyRegex,
  EmailRegex,
  OnlyNumberRegex,
  PasswordValidate,
  ViName,
  ViPhoneNumberRegex,
} from "@constants/regex.const";
import moment from "moment";

export function isPhoneNumber(number: string) {
  return ViPhoneNumberRegex.test(number);
}

export function isWithinTimeRange(
  checkDate: string,
  startDate: string,
  endDate: string
) {
  const date = moment(checkDate, "YYYYMMDD", true);

  const start = moment(startDate, "YYYYMMDD");
  const end = moment(endDate, "YYYYMMDD");

  if (!date.isValid() || !start.isValid() || !end.isValid()) {
    return false;
  }

  return date.isBetween(start, end, null, "[]");
}

export function validateName(name: string): boolean {
  return ViName.test(name);
}

export function validateAlphabetOnly(value: string): boolean {
  return AlphabetNumberOnlyRegex.test(value);
}

export function validatePassword(value: string): boolean {
  return PasswordValidate.test(value);
}

export function validateEmail(email: string) {
  return EmailRegex.test(email);
}

export function validateOnlyNumber(email: string) {
  return OnlyNumberRegex.test(email);
}
