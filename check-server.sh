#!/bin/bash

netstat -tulpn | grep ':3000 '
if [ $? -ne 0 ]
then
  echo 3000
fi

netstat -tulpn | grep ':3001 '
if [ $? -ne 0 ]
then
  echo 3001
fi
