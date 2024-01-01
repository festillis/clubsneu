import { tagDataloader } from './tag';

export const loadData = async () => {
  await tagDataloader.deleteTags();
  await tagDataloader.loadTags();
};
