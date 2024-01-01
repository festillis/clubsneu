#!/bin/bash

# Endpoint URL
endpoint_url="http://localhost:3000/dataload/production"

# Send the POST request using curl
response=$(curl -X POST \
                "$endpoint_url")

# Print the response
echo "$response"
