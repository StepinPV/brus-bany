#!/bin/bash

netstat -tulpn | grep ':3000 '
if [ $? -ne 0 ]
then
  npm run server:production
else
  echo server is working
fi
