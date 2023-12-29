import { Accessor, Component, Setter, Switch, createResource } from 'solid-js';
import { tagClient } from '~/api_client';
import MultiSelect from '../MultiSelect';
import { Match } from 'solid-js';

interface Props {
  selectedTags: Accessor<string[]>;
  setSelectedTags: Setter<string[]>;
}

const TagSelect: Component<Props> = ({ selectedTags, setSelectedTags }) => {
  const [tags] = createResource(tagClient.getTags, { initialValue: [] });

  return (
    <Switch>
      <Match when={tags.loading || tags.error}>
        <MultiSelect
          selectedValues={selectedTags}
          setSelectedValues={setSelectedTags}
          options={[]}
          placeholder="Select tags"
        />
      </Match>
      <Match when={tags()}>
        <MultiSelect
          selectedValues={selectedTags}
          setSelectedValues={setSelectedTags}
          options={tags().map((tag) => tag.name)}
          placeholder="Select tags"
        />
      </Match>
    </Switch>
  );
};

export default TagSelect;
