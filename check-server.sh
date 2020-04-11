#!/bin/bash

if [`netstat -tulpn | grep ':3000 '`]
then
  echo 3000
fi

if [`netstat -tulpn | grep ':3001 '`]
then
  echo 3001
fi
