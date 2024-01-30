import { MemberCount } from '~/components/Sidebar/types';

export const memberCountToRange = (memberCount: MemberCount) => {
  switch (memberCount) {
    case 'less-than-20':
      return { gte: 0, lte: 20 };
    case '20-50':
      return { gte: 20, lte: 50 };
    case '50-100':
      return { gte: 50, lte: 100 };
    case '100-150':
      return { gte: 100, lte: 150 };
    case 'more-than-150':
      return { gte: 150 };
  }
};

export const memberCountToRangeString = (memberCount: number) => {
  if (memberCount < 20) {
    return 'Less than 20';
  }
  if (memberCount < 50) {
    return '20-50';
  }
  if (memberCount < 100) {
    return '50-100';
  }
  if (memberCount < 150) {
    return '100-150';
  }
  return 'More than 150';
};
