import { Accessor, Component, Setter, Switch, createResource } from 'solid-js';
import { tagClient } from '~/clients';
import MultiSelect from '../MultiSelect';
import { Match } from 'solid-js';
import TagPlaceholder from './TagPlaceholder';

interface Props {
  selectedTags: Accessor<string[]>;
  setSelectedTags: Setter<string[]>;
}

const TagSelect: Component<Props> = ({ selectedTags, setSelectedTags }) => {
  const [tags] = createResource(tagClient.getTags);

  return (
    <Switch>
      <Match when={tags.loading || tags.error}>
        <MultiSelect
          selectedValues={selectedTags}
          setSelectedValues={setSelectedTags}
          options={[]}
          placeholder={<TagPlaceholder />}
        />
      </Match>
      <Match when={tags()}>
        <MultiSelect
          selectedValues={selectedTags}
          setSelectedValues={setSelectedTags}
          options={tags()!.map((tag) => tag.name)}
          placeholder={<TagPlaceholder />}
        />
      </Match>
    </Switch>
  );
};

export default TagSelect;
