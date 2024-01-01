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

export interface CalendarList {
  kind: string;
  nextPageToken: string;
  nextSyncToken: string;
  items: CalendarListEntry[];
}

export interface CalendarListEntry {
  kind: string;
  id: string;
  summary: string;
  description: string;
  location: string;
  timeZone: string;
  summaryOverride: string;
  colorId: string;
  backgroundColor: string;
  foregroundColor: string;
  hidden: boolean;
  selected: boolean;
  accessRole: string;
  defaultReminders: {
    method: string;
    minutes: number;
  }[];
  notificationSettings: {
    notifications: {
      type: string;
      method: string;
    }[];
  };
  primary: boolean;
  deleted: boolean;
  conferenceProperties: {
    allowedConferenceSolutionTypes: string[];
  };
}
