sudo apt-get install imagemagick
sudo apt-get install graphicsmagick

nohup mongod --dbpath /var/lib/mongodb &
local - mongod --dbpath /Users/pvstepin/dev/mongodb

Обновить ноду!

Убить процесс: 1. sudo netstat -ltup 2. kill processId

https://www.8host.com/blog/upravlenie-prioritetnymi-i-fonovymi-processami-v-bash/
https://andreyex.ru/operacionnaya-sistema-linux/komanda-nohup-v-linux-pozvolyaet-zapuskat-komandy-dazhe-posle-vyhoda-iz-sistemy

403 nginx:
nginx.conf user root; - костыль
sudo systemctl restart nginx - перезапуск
https://www.internet-technologies.ru/a rticles/reshenie-problem-svyazannyh-s-oshibkoy-nginx-403-forbidden.html
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

https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp

ОП:
root@brusbany:~# ps axu | awk  '{print $6 " " $11 $12 $13 $14 " "  $2}' | awk '{ proc_list[$2] += $1; } END \
> { for (proc in proc_list) { printf("%d\t%s\n", proc_list[proc],proc); }}' | sort -n | tail -n 10 | sort -rn | awk '{$1/=1024;printf "%.0fMB\t",$1}{print $2}'
