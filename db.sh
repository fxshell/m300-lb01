#!/bin/bash
#
#	Datenbank installieren und Konfigurieren
#


sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
sudo apt-key update -y
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update -y
sudo apt-get install -y --allow-unauthenticated mongodb-org