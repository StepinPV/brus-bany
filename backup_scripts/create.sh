# создаем папку
mkdir backup

# date=`date +%Y-%m-%d-%H:%M`

# сохраняем базу
mongodump -d brus-bany -o ./backup/dump/

# сохраняем изображения
cp -r ./public/uploads ./backup

# создаем архив
tar -cvf ./backup.tar ./backup

# удаляем папку
rm -R ./backup
