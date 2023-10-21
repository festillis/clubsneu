#!/bin/bash

module_name=$1

cd src

mkdir -p modules/$module_name
touch modules/$module_name/$module_name.controller.ts
touch modules/$module_name/$module_name.schema.ts
touch modules/$module_name/$module_name.service.ts
touch modules/$module_name/$module_name.route.ts
