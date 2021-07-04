#!/bin/bash

cd /root/brus-bany
RESULT=$(netstat -tulpn | grep ':3005 ')

if [[ -z $RESULT ]]
then
  npm run server:production
fi
