#!/bin/bash

# Endpoint URL
endpoint_url="http://localhost:3000/dataload/clear/$1"

# Send the DELETE request using curl
response=$(curl -X DELETE \
                "$endpoint_url")

# Print the response
echo "$response"
