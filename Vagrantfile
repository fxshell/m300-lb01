# -*- mode: ruby -*-
# vi: set ft=ruby :

 Vagrant.configure("2") do |config|
	config.vm.define "proxy" do |proxy|
		proxy.vm.box = "ubuntu/xenial64"
		proxy.vm.hostname = "proxy"
		proxy.vm.network "private_network", ip: "192.168.40.99"
		proxy.vm.network "forwarded_port", guest:80, host:5000, auto_correct: true
		proxy.vm.provider "virtualbox" do |vb|
			vb.memory = "512"  
		end
		proxy.vm.synced_folder "proxy", "/vagrant"  
		proxy.vm.provision "shell", path: "proxy.sh"
  end

	config.vm.define "web" do |web|
		web.vm.box = "ubuntu/xenial64"
		web.vm.hostname = "web"
		web.vm.network "private_network", ip: "192.168.40.100"
		web.vm.provider "virtualbox" do |vb|
			vb.memory = "512"  
		end
		web.vm.synced_folder "src", "/var/www/html"  
		web.vm.provision "shell", path: "server.sh"
  end

	config.vm.define "db" do |db|
		db.vm.box = "ubuntu/xenial64"
		db.vm.hostname = "db"
		db.vm.network "private_network", ip: "192.168.40.101"
		db.vm.provider "virtualbox" do |vb|
			vb.memory = "1024"  
		end
		db.vm.provision "shell", path: "db.sh"
  end
end