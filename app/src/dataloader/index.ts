import { tagDataloader } from './tag';

export const loadData = async () => {
  await tagDataloader.loadTags();
  console.log('Loaded tags');
};
