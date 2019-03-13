#!/bin/bash
#
#	Datenbank installieren und Konfigurieren
#


sudo apt-get update
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs

node /vagrant/server.js