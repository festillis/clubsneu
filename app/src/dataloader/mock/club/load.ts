import { clubs } from './clubs';
import { tagsForClubs } from './tags_for_clubs';
import { clubService, tagService } from '~/services';

export const deleteClubs = async () => {
  await clubService.deleteAllClubs();

  console.log('Deleted all clubs');
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
