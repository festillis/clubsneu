import { prisma } from '~/prisma';
import { tagNames } from './tag_names';

export const loadTags = async () => {
  for (const name of tagNames) {
    const createdTag = await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name }
    });

    console.log(`Created tag: ${createdTag.name}`);
  }
};
