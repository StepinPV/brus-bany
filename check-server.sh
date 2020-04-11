#!/bin/bash

netstat -tulpn | grep ':3000 '
if [ $? -ne 0 ]
then
  nohup npm run server:production &
fi
