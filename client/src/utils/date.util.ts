import { CalendarDate } from "@internationalized/date";

export const addMonths = (date: CalendarDate, months: number) => {
    return date.add({ months });
};
