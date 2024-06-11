# Template Repository for COMP SCI 2207/7207 Web & Database Computing (2023 Semester 1)

Contains environment files for WDC 2023. Copy this template for a general sandbox.

Auto commit/push/sync to Github is disabled by default in this template repository.
Enable the GitDoc extension to use this fucntionality (either in your VSCode settings, or in the Dev Container settings)


# Start mysql
```bash
- Change permission
sudo usermod -d /var/lib/mysql/ mysql
```

- Start mysql server
```bash
service mysql start
```
mysql < db_backup.sql #restore database backup
mysql #access mysql database

#run application
npm install # install dependencies
npm start # run application
