#!/bin/bash

cd /root/brus-bany
RESULT=$(netstat -tulpn | grep ':3000 ')

if [[ -z $RESULT ]]
then
  nohup npm run server:production &
fi

