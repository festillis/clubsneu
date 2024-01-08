import { Accessor, Component, Setter, Switch, createResource } from 'solid-js';
import { tagClient } from '~/clients';
import MultiSelect from '../MultiSelect';
import { Match } from 'solid-js';
import TagPlaceholder from './TagPlaceholder';

interface Props {
  selectedTags: Accessor<string[]>;
  onSelectedTagsChange: (tags: string[]) => void;
}

const TagSelect: Component<Props> = ({
  selectedTags,
  onSelectedTagsChange
}) => {
  const [tags] = createResource(tagClient.getTags);

  return (
    <Switch>
      <Match when={tags.loading || tags.error}>
        <MultiSelect
          selectedValues={selectedTags}
          onSelectedValuesChange={onSelectedTagsChange}
          options={[]}
          placeholder={<TagPlaceholder />}
        />
      </Match>
      <Match when={tags()}>
        <MultiSelect
          selectedValues={selectedTags}
          onSelectedValuesChange={onSelectedTagsChange}
          options={tags()!.map((tag) => tag.name)}
          placeholder={<TagPlaceholder />}
        />
      </Match>
    </Switch>
  );
};

export default TagSelect;
