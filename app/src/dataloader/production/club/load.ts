import { clubs } from './clubs';
import { tagsForClubs } from './tags_for_clubs';
import { clubService, tagService, userService } from '~/services';

export const deleteClubs = async () => {
  await clubService.deleteAllClubs();

  console.log('Deleted all clubs');
};

export const deleteClubOwners = async () => {
  await clubService.deleteAllClubOwners();

  console.log('Deleted all club owners');
};

export const loadClubs = async () => {
  for (const club of clubs) {
    const createdClub = await clubService.createClub(club);

    console.log(`Created club: ${createdClub.name}`);
  }
};

export const loadTagsForClubs = async () => {
  for (const { clubId, tags } of tagsForClubs) {
    for (const tagName of tags) {
      const tag = await tagService.getTagByName(tagName);

      if (!tag) {
        throw new Error(`Tag with name ${tagName} not found`);
      }

      await clubService.addTagToClub(clubId, tag.id);
    }
  }
};

export const loadOwnersForClubs = async () => {
  const allUserIds = await userService.getAllUserIds();

  for (const club of clubs) {
    for (const userId of allUserIds) {
      await clubService.addOwnerToClub({
        userId,
        clubId: club.id,
        role: 'President'
      });

      console.log(`Added owner ${userId} to club ${club.name}`);
    }
  }
};
