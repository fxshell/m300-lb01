# -*- mode: ruby -*-
# vi: set ft=ruby :

 Vagrant.configure("2") do |config|
	config.vm.define "web" do |web|
		web.vm.box = "ubuntu/xenial64"
		web.vm.hostname = "nodejs"
		web.vm.network "private_network", ip:"192.168.55.100"
		web.vm.network "forwarded_port", guest:80, host:8080, auto_correct: true
		web.vm.provider "virtualbox" do |vb|
			vb.memory = "1024"  
		end
  	web.vm.synced_folder "src", "/var/www/html"  
		web.vm.provision "shell", path: "server.sh"
  end

	config.vm.define "db" do |db|
		db.vm.box = "ubuntu/xenial64"
		db.vm.hostname = "mongodb"
		db.vm.network "private_network", ip:"192.168.55.101"
		db.vm.provider "virtualbox" do |vb|
			vb.memory = "1024"  
		end
		db.vm.provision "shell", path: "db.sh"
  end
end