# Dokumentation Modul 300 LB01

## Persönlicher Wissensstand

| Technologie        | Beschreibung                                                                                                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Linux              | Ich arbeite in meiner Firma seit über zwei Jahren regelmässig mit Linux. Deshalb würde ich sagen, dass ich mich ziemlich gut mit Linux auskenne und über viele Kenntnisse verfüge, die für dieses Projekt relevant sind. |
| Virtualisierung    | Ich habe bereits viele virtuelle Maschinen mit einem Hypervisor wie VirtualBox aufgesetzt. Zudem habe ich ein Proxmox Virtualisierungsserver eingerichtet und administriert.                                             |
| Vagrant            | Ich habe bereits für ein TBZ-Modul eine selbst geschriebene Python-Applikation automatisch in einer Ubuntu Vagrant Box deployed.                                                                                         |
| Versionsverwaltung | Seit mehreren Jahren verwende ich für alle meine Programmier-Projekte Git in Kombination mit entweder GitHub oder GitLab.                                                                                                |
| Markdown           | Seit über einem Jahr schreibe ich viele Dokumentationen und auch Notizen in Markdown.                                                                                                                                    |
| Systemsicherheit   | Ich verfüge über Grundkenntnisse zu SSL-Zertifikaten oder SSH-Keys. Allerdings habe ich definitiv noch Verbesserungspotenzial in diesem Bereich.                                                                         |

## Abschnitt: Vagrant

### Projekt Apache und MySQL

    +--------------------+          +---------------------+
    ! Web Server         !          ! Datenbank Server    !
    ! Host: web          !          ! Host: db            !
    ! IP: 192.168.55.101 ! <------> ! IP: 192.168.55.100  !
    ! Port: 80           !          ! Port 3306           !
    ! Nat: 8080          !          ! Nat: -              !
    +--------------------+          +---------------------+

### Kennt die Vagrant-Befehlte

| Command           | Beschreibung                                                                                                                                                                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| vagrant up        | Start virtual machine.                                                                                                                                                                                                                                                                    |
| vagrant halt      | Halt virtual machine.                                                                                                                                                                                                                                                                     |
| vagrant destroy   | Destroy your virtual machine. The source code and the content of the data directory will remain unchanged. Only the VirtualBox machine instance will be destroyed. You can build your machine again with the 'vagrant up' command. This command is useful if you want to save disk space. |
| vagrant provision | Reconfigure the virtual machine after a source code change.                                                                                                                                                                                                                               |
| vagrant reload    | Reload the virtual machine. Useful when you need to change network or synced folder settings.                                                                                                                                                                                             |

## Vergleich Vorwissen / Wissenszuwachs

Abc

## Reflextion

Abc
