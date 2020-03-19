#!/bin/bash

FILE="/testproject/package.json"
if [ -e $FILE ]; then
  npm ci
fi

/bin/bash