export interface CalendarEvents {
  summary: string;
  description: string;
  updated: Date;
  timeZone: string;
  accessRole: string;
  items: CalendarEvent[];
}

export interface CalendarEvent {
  id: string;
  status: string;
  htmlLink: string;
  created: Date;
  updated: Date;
  summary: string;
  description: string;
  location: string;
  colorId: string;
  creator: {
    id: string;
    email: string;
    displayName: string;
    self: boolean;
  };
  organizer: {
    id: string;
    email: string;
    displayName: string;
    self: boolean;
  };
}
