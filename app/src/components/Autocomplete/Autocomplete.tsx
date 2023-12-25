import { Component } from 'solid-js';
import { Select } from '@thisbeyond/solid-select';

// Import default styles. (All examples use this via a global import)
import '@thisbeyond/solid-select/style.css';
import './style.css';

interface Props {
  options: string[];
  multiple?: boolean;
  onChange: (value: string) => void;
}

const Autocomplete: Component<Props> = ({
  options,
  multiple = false,
  onChange
}) => {
  return (
    <Select
      class="custom"
      multiple={multiple}
      options={options}
      onChange={onChange}
    />
  );
};

export default Autocomplete;
