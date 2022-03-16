import { IDateProvider } from "../IDateProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
  addHours(hours: number): Date {
    return dayjs().add(hours, "hour").toDate();
  }
  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }
  dateNow(): Date {
    return dayjs().toDate();
  }
  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  compareHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUtc(end_date);
    const start_date_utc = this.convertToUtc(start_date);
    return dayjs(end_date_utc).diff(start_date_utc, "hours");
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUtc(end_date);
    const start_date_utc = this.convertToUtc(start_date);
    return dayjs(end_date_utc).diff(start_date_utc, "days");
  }
}
