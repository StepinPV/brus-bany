if [ -z "$1" ]
  then
    echo "Укажите имя сайта: npm run apply-backup -- my-site"
    exit 0
fi

backupFolderName="backup-$1"

# извлекаем архив
tar -xvf $backupFolderName.tar

# удаляем старый uploads
rm -R ./sites/$1/uploads

# сохраняем новый uploads
cp -r ./$backupFolderName/uploads ./sites/$1/uploads

# удаляем старую базу
mongo $1 --eval "db.dropDatabase()"

# накатываем базу
mongorestore ./$backupFolderName/dump

# удаляем папку
rm -R ./$backupFolderName

# удаляем архив
rm -R ./$backupFolderName.tar

