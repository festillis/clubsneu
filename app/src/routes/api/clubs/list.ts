import { Prisma } from '@prisma/client';
import { APIEvent, json } from 'solid-start';
import { ClubFilters } from '~/clients/club/types';
import { SortBy } from '~/components/Sidebar/types';
import { statusCodes } from '~/constants';
import { clubService } from '~/services';
import { countUtils, requestUtils } from '~/utils';

export const GET = async ({ request }: APIEvent) => {
  const params = requestUtils.getUrlSearchParams(request);
  const paramFilters = params.get('filters');
  const paramOrderBy = params.get('orderBy');

  if (!paramFilters || !paramOrderBy) {
    return json(
      { error: 'Missing one or more required params: filters, orderBy' },
      { status: statusCodes.BAD_REQUEST }
    );
  }

  const clubFilters = JSON.parse(paramFilters) as ClubFilters;
  const sortBy = paramOrderBy as SortBy;

  const filters: Prisma.ClubWhereInput = {};

  if (clubFilters.name) {
    filters.name = {
      contains: clubFilters.name,
      mode: 'insensitive'
    };
  }

  if (clubFilters.tagNames) {
    console.log('clubFilters.tagNames', clubFilters.tagNames);
    filters.tags = {
      some: {
        name: {
          in: clubFilters.tagNames
        }
      }
    };
  }

  if (clubFilters.joinStatuses) {
    filters.joinStatus = { in: clubFilters.joinStatuses };
  }

  if (clubFilters.membershipProcesses) {
    filters.membershipProcess = { in: clubFilters.membershipProcesses };
  }

  if (clubFilters.memberCounts) {
    filters.OR = clubFilters.memberCounts.map((memberCount) => ({
      memberCount: countUtils.memberCountToRange(memberCount)
    }));
  }

  try {
    const clubIds = await clubService.getClubIdsByFilter(filters, {
      [sortBy]: 'asc'
    });

    return json(clubIds);
  } catch (e: any) {
    console.error(e);
    return json(
      { error: e.message },
      { status: statusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
