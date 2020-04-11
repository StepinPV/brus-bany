#!/bin/bash

cd /root/brus-bany
RESULT=$(netstat -tulpn | grep ':3000 ')

if [ ${RESULT} -ne 0 ]
then
  nohup npm run server:production &
fi

