sudo apt-get install imagemagick
sudo apt-get install graphicsmagick

nohup mongod --dbpath /var/lib/mongodb &

Обновить ноду!

Убить процесс: 1. sudo netstat -ltup 2. kill processId

https://www.8host.com/blog/upravlenie-prioritetnymi-i-fonovymi-processami-v-bash/
https://andreyex.ru/operacionnaya-sistema-linux/komanda-nohup-v-linux-pozvolyaet-zapuskat-komandy-dazhe-posle-vyhoda-iz-sistemy

403 nginx:
nginx.conf user root; - костыль
sudo systemctl restart nginx - перезапуск
https://www.internet-technologies.ru/articles/reshenie-problem-svyazannyh-s-oshibkoy-nginx-403-forbidden.html
http://localstorage.ru/konfighuratsiia-nginx-dlia-raboty-s-node-js-i-pm2/
https://www.8host.com/blog/podgotovka-prilozheniya-node-js-k-proizvodstvu-v-ubuntu-18-04/
https://www.8host.com/blog/ustanovka-nginx-v-ubuntu-18-04/
https://serveradmin.ru/ustanovka-i-nastrojka-nginx/

CRON: https://losst.ru/nastrojka-cron

/etc/letsencrypt/live/brus-bany.ru/fullchain.pem
/etc/letsencrypt/live/brus-bany.ru/privkey.pem

Обновление серта
0 3 11 */2 * /usr/bin/certbot renew --post-hook "systemctl reload nginx" --force-renew 

Чек сервера
* * * * * /root/brus-bany/check-server.sh >> /root/brus-bany/cron.log 2>&1
