// src/components/AddToGoogleCalendarButton.tsx
import React from "react";
import { Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { getGoogleCalendarUrl } from "../utils/googleCalendar";

export interface CalendarEvent {
  title: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
}

export const AddToGoogleCalendarButton: React.FC<{ event: CalendarEvent }> = ({ event }) => {
  const url = getGoogleCalendarUrl(event);
  return (
    <Button
      variant="outlined"
      color="primary"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      startIcon={<CalendarMonthIcon />}
      sx={{ ml: 1 }}
    >
      Add to Google Calendar
    </Button>
  );
};