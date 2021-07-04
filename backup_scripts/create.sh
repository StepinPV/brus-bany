if [ -z "$1" ]
  then
    echo "Укажите имя сайта: npm run create-backup -- my-site"
    exit 0
fi

backupFolderName="backup-$1"

# создаем папку
mkdir $backupFolderName

# date=`date +%Y-%m-%d-%H:%M`

# сохраняем базу
mongodump -d $1 -o ./$backupFolderName/dump/

# сохраняем изображения
cp -r ./sites/$1/uploads ./${backupFolderName}

# создаем архив
tar -cvf ./${backupFolderName}.tar ./${backupFolderName}

# удаляем папку
rm -R ./${backupFolderName}
