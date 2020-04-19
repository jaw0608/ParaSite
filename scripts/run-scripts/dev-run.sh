#!/bin/bash
pushd ../../
x-terminal-emulator -e "npm start" & x-terminal-emulator -e "npm run devStart"
