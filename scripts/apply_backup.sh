# извлекаем архив
tar -xvf backup.tar

# удаляем старый uploads
rm -R ./public/uploads

# сохраняем новый uploads
cp -r ./backup/uploads ./public/uploads

# удаляем старую базу
mongo brus-bany --eval "db.dropDatabase()"

# накатываем базу
mongorestore ./backup/dump

# удаляем папку
rm -R ./backup

# удаляем архив
rm -R ./backup.tar

