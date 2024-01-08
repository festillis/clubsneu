import { APIEvent, json } from 'solid-start';
import { ClubFilters } from '~/clients/club/types';
import { SortBy } from '~/components/Sidebar/types';
import { statusCodes } from '~/constants';
import { clubService } from '~/services';
import { countUtils, requestUtils } from '~/utils';

export const GET = async ({ request }: APIEvent) => {
  const params = requestUtils.getUrlSearchParams(request);
  const filters = JSON.parse(params.get('filters')!) as ClubFilters;
  const orderBy = params.get('orderBy') as SortBy;

  try {
    const clubIds = await clubService.getClubIdsByFilter(
      {
        AND: [
          { tags: { some: { name: { in: filters.tagNames } } } },
          { joinStatus: { in: filters.joinStatuses } },
          { membershipProcess: { in: filters.membershipProcesses } }
        ],
        OR: filters.memberCounts?.map((memberCount) => ({
          memberCount: countUtils.memberCountToRange(memberCount)
        }))
      },
      {
        [orderBy]: 'asc'
      }
    );

    return json(clubIds);
  } catch (e: any) {
    console.error(e);
    return json(
      { error: e.message },
      { status: statusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
