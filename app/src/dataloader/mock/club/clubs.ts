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
  },
  {
    id: 'club2',
    name: 'Club2',
    description: 'Club2 description',
    calendarUrl: null,
    logoUrl:
      'https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/317742117_1777381502646757_6731108053682608929_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=PDXjML8nD6gAX-C7tzG&_nc_ht=scontent-lga3-1.xx&oh=00_AfAGsAEAkeoYINt0iMNVdKYJsQLjEAHk0aOvpN7zw9C6IA&oe=65999D7F',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'club3',
    name: 'Club3',
    description: 'Club3 description',
    calendarUrl: null,
    logoUrl: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'club4',
    name: 'Club4',
    description: 'Club4 description',
    calendarUrl: null,
    logoUrl: null,
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
  },
  {
    clubId: 'club2',
    tags: ['Consulting', 'Mentorship', 'Professional', 'Design']
  },
  {
    clubId: 'club3',
    tags: ['STEM', 'Khoury', 'Venture Accelerator', 'Cultural']
  },
  {
    clubId: 'club4',
    tags: ['Undergraduate', 'Service', 'Engineering', 'Business']
  }
];
