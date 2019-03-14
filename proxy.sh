#!/bin/bash
#
#	Proxy installieren und konfigurieren
#

ufw enable
ufw allow 5000
ufw allow from 192.168.40.1 to any port 22

apt-get update -y
apt-get -y install apache2


cp /vagrant/001-mysite.conf /etc/apache2/sites-available/
a2ensite 001-mysite.conf
a2enmod proxy
a2enmod proxy_http
service apache2 restart