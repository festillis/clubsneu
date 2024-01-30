#!/bin/bash

# Check if an argument is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <given_name>"
    exit 1
fi

# Get the given name from the command line argument
given_name=$1

# Navigate to the directory this script is in
cd "$(dirname "$0")"

# Create the directory
mkdir $given_name

# Create <given_name>.tsx
echo "import { Component } from \"solid-js\";

interface Props {}

const $given_name: Component<Props> = () => {
  return <div>$given_name</div>;
}

export default $given_name;" > $given_name/$given_name.tsx

# Create index.ts
echo "export { default } from './$given_name';" > $given_name/index.ts

echo "Directory '$given_name' created with $given_name.tsx and index.ts"

