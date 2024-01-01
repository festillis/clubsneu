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
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const tagsForClubs = [
  {
    clubId: 'club1',
    tags: [
      'Undergraduate',
      'Khoury',
      'Programming',
      'Professional',
      'Design',
      'Product Development'
    ]
  }
];
