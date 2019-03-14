#!/bin/bash
#
#	Datenbank installieren und Konfigurieren
#

apt update -y

ufw enable
ufw allow from 192.168.40.100 to any port 3306
ufw allow from 192.168.40.1 to any port 22

sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password secret_password'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password secret_password'

sudo apt-get install -y mysql-server

sudo sed -i -e"s/^bind-address\s*=\s*127.0.0.1/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf

mysql -uroot -psecret_password <<%EOF%
	CREATE USER 'root'@'192.168.40.100' IDENTIFIED BY 'admin';
	GRANT ALL PRIVILEGES ON *.* TO 'root'@'192.168.40.100';
	FLUSH PRIVILEGES;
%EOF%

mysql -uroot -psecret_password <<%EOF%
	create database if not exists data_set;
	create user 'www-data'@'localhost' identified by 'pwd'; 
	grant usage on *.* to 'www-data'@'192.168.40.100' identified by 'pwd';
	grant all privileges on data_set.* to 'www-data'@'192.168.40.100';
	flush privileges;
	use data_set;
	create table data ( id INT PRIMARY KEY AUTO_INCREMENT, data FLOAT );
	insert into data(data) values ( 1.173 );
	insert into data(data) values ( 2.345 );
%EOF%


sudo service mysql restart