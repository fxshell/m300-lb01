#!/bin/bash
#
#	Datenbank installieren und Konfigurieren
#


echo -----------------------------------------------------------------
echo -                           MongoDB                             -
echo -----------------------------------------------------------------

apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

mkdir -p /data/db
chmod -R 777 /data/db

sed -i -e 's/127.0.0.1/192.168.55.101/g' /etc/mongod.conf

service mongod start