// src/utils/googleCalendar.ts
export function getGoogleCalendarUrl({
    title,
    description,
    location,
    start,
    end,
  }: {
    title: string;
    description?: string;
    location?: string;
    start: Date;
    end: Date;
  }): string {
    // Google Calendar expects formatted times:
    // YYYYMMDDTHHMMSSZ (UTC, so use toISOString + strip problematic chars)
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d{3}/g, "");
    };
    const dates = `${formatDate(start)}/${formatDate(end)}`;
    let url = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    url += `&text=${encodeURIComponent(title)}`;
    url += `&dates=${dates}`;
    if (description) url += `&details=${encodeURIComponent(description)}`;
    if (location) url += `&location=${encodeURIComponent(location)}`;
    return url;
  }