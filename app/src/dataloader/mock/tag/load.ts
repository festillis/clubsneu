import { tagNames } from './tags';
import { tagService } from '~/services';

export const deleteTags = async () => {
  await tagService.deleteAllTags();

  console.log('Deleted all tags');
};

export const loadTags = async () => {
  for (const tagName of tagNames) {
    const createdTag = await tagService.createTag({ name: tagName });

    console.log(`Created tag: ${createdTag.name}`);
  }
};
