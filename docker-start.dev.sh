#! /bin/bash

# Initialization logic can go here

echo "Starting node..."
yarn dev -L $* # The $* allows me to pass command line arguments that were passed to the docker run command.

# Cleanup logic can go here
