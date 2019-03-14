# Dokumentation Modul 300 LB01

## Inhaltsverzeichnis

-   01 - Einstieg
-   02 - Vagrant Umsetzung
-   03 - Sicherheitsaspekte
-   04 - Abschluss

---

## 01 Einstieg

### Persönlicher Wissensstand

| Technologie        | Beschreibung                                                                                                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Linux              | Ich arbeite in meiner Firma seit über zwei Jahren regelmässig mit Linux. Deshalb würde ich sagen, dass ich mich ziemlich gut mit Linux auskenne und über viele Kenntnisse verfüge, die für dieses Projekt relevant sind. |
| Virtualisierung    | Ich habe bereits viele virtuelle Maschinen mit einem Hypervisor wie VirtualBox aufgesetzt. Zudem habe ich ein Proxmox Virtualisierungsserver eingerichtet und administriert.                                             |
| Vagrant            | Ich habe bereits für ein TBZ-Modul eine selbst geschriebene Python-Applikation automatisch in einer Ubuntu Vagrant Box deployed.                                                                                         |
| Versionsverwaltung | Seit mehreren Jahren verwende ich für alle meine Programmier-Projekte Git in Kombination mit entweder GitHub oder GitLab.                                                                                                |
| Markdown           | Seit über einem Jahr schreibe ich viele Dokumentationen und auch Notizen in Markdown.                                                                                                                                    |
| Systemsicherheit   | Ich verfüge über Grundkenntnisse zu SSL-Zertifikaten oder SSH-Keys. Allerdings habe ich definitiv noch Verbesserungspotenzial in diesem Bereich.                                                                         |

### Kennt die Vagrant-Befehlte

| Command           | Beschreibung                                                                                                                                                                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| vagrant up        | Start virtual machine.                                                                                                                                                                                                                                                                    |
| vagrant halt      | Halt virtual machine.                                                                                                                                                                                                                                                                     |
| vagrant destroy   | Destroy your virtual machine. The source code and the content of the data directory will remain unchanged. Only the VirtualBox machine instance will be destroyed. You can build your machine again with the 'vagrant up' command. This command is useful if you want to save disk space. |
| vagrant provision | Reconfigure the virtual machine after a source code change.                                                                                                                                                                                                                               |
| vagrant reload    | Reload the virtual machine. Useful when you need to change network or synced folder settings.                                                                                                                                                                                             |

## 02 Vagrant Umsetzung

### Netzwerkplan

    +--------------------+          +--------------------+          +---------------------+
    ! Proxy Server       !          ! Web Server         !          ! Datenbank Server    !
    ! Host: proxy        !          ! Host: web          !          ! Host: db            !
    ! IP: 192.168.40.99  ! <------> ! IP: 192.168.40.100 ! <------> ! IP: 192.168.40.101  !
    ! Port: 5000         !          ! Port: 80           !          ! Port 3306           !
    ! Nat: 5000          !          ! Nat: -             !          ! Nat: -              !
    +--------------------+          +--------------------+          +---------------------+

## 03 Sicherheitsaspekte

### Firewall

Ausgehende Verbindungen werden standardmässig erlaubt.

#### Proxy

-   `sudo ufw enable`
-   `sudo ufw allow 5000`
-   `sudo ufw allow from 192.168.40.1 to any port 22`

#### Web

-   `sudo ufw enable`
-   `sudo ufw allow from 192.168.40.99 to any http`
-   `sudo ufw allow from 192.168.40.1 to any port 22`

#### DB

-   `sudo ufw enable`
-   `sudo ufw allow from 192.168.40.100 to any port 3306`
-   `sudo ufw allow from 192.168.40.1 to any port 22`

### Reverse Proxy

```
listen 5000
<VirtualHost *:5000>
 ProxyPass "/proxy" "http://192.168.40.100:80/"
 ProxyPassReverse "/proxy" "http://192.168.40.100:80/"
</VirtualHost>
```

### Benutzer

#### Proxy

| Benutzername | Funktion                                                                                                 |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| `root`       | Der Systemverwalter unter Linux                                                                          |
| `nobody`     | Wird von Prozessen als Benutzererkennung verwendet, wenn nur ein Minimum an Rechten vergeben werden soll |
| `www-data`   | Benutzer des Webservers Apache                                                                           |

#### Web

| Benutzername | Funktion                                                                                                 |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| `root`       | Der Systemverwalter unter Linux                                                                          |
| `nobody`     | Wird von Prozessen als Benutzererkennung verwendet, wenn nur ein Minimum an Rechten vergeben werden soll |
| `www-data`   | Benutzer des Webservers Apache                                                                           |

#### DB

| Benutzername | Funktion                                                                                                 |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| `root`       | Der Systemverwalter unter Linux                                                                          |
| `nobody`     | Wird von Prozessen als Benutzererkennung verwendet, wenn nur ein Minimum an Rechten vergeben werden soll |
| `mysql`      | Benutzer der MySQL Datenbank                                                                             |

### SSH-Zugriff

Auf eine VM wird mit folgendem Befehl per SSH zugegriffen: `vagrant ssh proxy`, `vagrant ssh web`, `vagrant ssh db`

## 04 Abschluss

### Testfälle

| Testfall                              | Resultat                                                                                                 |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Von Client: `curl 192.168.40.99:5000` | Der Systemverwalter unter Linux                                                                          |
| `nobody`                              | Wird von Prozessen als Benutzererkennung verwendet, wenn nur ein Minimum an Rechten vergeben werden soll |
| `mysql`                               | Benutzer der MySQL Datenbank                                                                             |

### Vergleich Vorwissen / Wissenszuwachs

Hauptsächlich konnte ich während dieses Projektes meine Shell-Scripting Fähigkeiten verbessern. Die Vagrant-Grundlagen habe ich bereits gekannt, konnte hier aber erstmals mit einem Multi-VM-System arbeiten. Allerdings habe ich zuvor noch nie Shell-Scripts für die automatisierte Installation von Diensten erstellt, was sehr lehrreich war.

### Reflextion

Dieses Projekt lief meiner Meinung nach sehr gut. Ich kam schnell voran und konnte bis zum Ende des Projektes mein Projekt gut abschliessen, sodass ich mit dem Endresultat zufrieden war. Während der Realisierung wurde ich zwischenzeitlich etwas davon überrascht, dass die automatisierte Installation mit Shell-Scripts nicht so einfach war, wie ich anfänglich gedacht habe. Der Rest des Projektes verlief jedoch zufriedenstellend.
