#!/bin/bash

# полный путь до скрипта
ABSOLUTE_FILENAME=`readlink -e /root/brus-bany`
# каталог в котором лежит скрипт
DIRECTORY=`dirname "$ABSOLUTE_FILENAME"`

NODE_ENV=production node $DIRECTORY/server/server.js
