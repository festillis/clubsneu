import { clubDataloader } from './club';
import { tagDataloader } from './tag';

export const loadData = async () => {
  await tagDataloader.deleteTags();
  await tagDataloader.loadTags();

  await clubDataloader.deleteClubs();
  await clubDataloader.loadClubs();
  await clubDataloader.loadTagsForClubs();
};
