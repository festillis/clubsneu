import { Club } from '@prisma/client';

export const clubs: Club[] = [
  {
    id: 'club1',
    name: 'Sandbox',
    description:
      "Northeastern's student-led software consultancy working closely with clients to help them best leverage computation.",
    calendarUrl:
      'https://calendar.google.com/calendar/embed?src=aab8e2278c912e76e6e7e7f2836021a9a838b75d39ceea69eee8ad9ee675c170%40group.calendar.google.com&ctz=America%2FNew_York',
    logoUrl:
      'https://media.licdn.com/dms/image/C4D0BAQED6_9ck5p3dw/company-logo_200_200/0/1630460726053/sandboxnu_logo?e=2147483647&v=beta&t=l6TJJhWFVnwOWsq6s8gVtSZlB3W_wGSJedC772x7smw',
    joinStatus: 'accepting-members',
    membershipProcess: 'application-required',
    memberCount: 50,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'club2',
    name: 'Generate',
    description: 'Club2 description',
    calendarUrl: null,
    logoUrl:
      'https://media.licdn.com/dms/image/D4E0BAQFOBhB8E28uyw/company-logo_200_200/0/1666806309716/generate_product_development_logo?e=1713398400&v=beta&t=wG2YV_Qfg0FyzVvjjRj-_YZuvtoSSombCmydoX-VmbE',
    joinStatus: 'not-accepting-members',
    membershipProcess: 'audition-required',
    memberCount: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'club3',
    name: 'Club3',
    description: 'Club3 description',
    calendarUrl: null,
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/1200px-Solid_black.svg.png',
    joinStatus: 'not-accepting-members',
    membershipProcess: 'open-membership',
    memberCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'club4',
    name: 'Club4',
    description: 'Club4 description',
    calendarUrl: null,
    logoUrl: null,
    joinStatus: 'not-accepting-members',
    membershipProcess: 'audition-required',
    memberCount: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'club5',
    name: 'Club5',
    description: 'Club5 description',
    calendarUrl: null,
    logoUrl: null,
    joinStatus: 'not-accepting-members',
    membershipProcess: 'audition-required',
    memberCount: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'club6',
    name: 'Club6',
    description: 'Club6 description',
    calendarUrl: null,
    logoUrl: null,
    joinStatus: 'not-accepting-members',
    membershipProcess: 'audition-required',
    memberCount: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'club7',
    name: 'Club7',
    description: 'Club7 description',
    calendarUrl: null,
    logoUrl: null,
    joinStatus: 'not-accepting-members',
    membershipProcess: 'audition-required',
    memberCount: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'club8',
    name: 'Club8',
    description: 'Club8 description',
    calendarUrl: null,
    logoUrl: null,
    joinStatus: 'not-accepting-members',
    membershipProcess: 'audition-required',
    memberCount: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'club9',
    name: 'Club9',
    description: 'Club9 description',
    calendarUrl: null,
    logoUrl: null,
    joinStatus: 'not-accepting-members',
    membershipProcess: 'audition-required',
    memberCount: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'club10',
    name: 'Club10',
    description: 'Club10 description',
    calendarUrl: null,
    logoUrl: null,
    joinStatus: 'not-accepting-members',
    membershipProcess: 'audition-required',
    memberCount: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'club11',
    name: 'Club11',
    description: 'Club11 description',
    calendarUrl: null,
    logoUrl: null,
    joinStatus: 'accepting-members',
    membershipProcess: 'audition-required',
    memberCount: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
