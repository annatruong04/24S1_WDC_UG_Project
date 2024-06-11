# Project COMP SCI 2207/7207 Web & Database Computing (2023 Semester 1)
## Green Earth - Group 92
This is the...

<img width="1440" alt="Screenshot 2024-06-11 at 5 31 33 pm" src="https://github.com/UAdelaide/24S1_WDC_UG_Group_92/assets/140358233/eb8e0c07-9c70-4505-bf4b-841e974a3406">

Contains environment files for WDC 2023. Copy this template for a general sandbox.

Auto commit/push/sync to Github is disabled by default in this template repository.
Enable the GitDoc extension to use this fucntionality (either in your VSCode settings, or in the Dev Container settings)


# Start mysql
- Change permission
```bash
sudo usermod -d /var/lib/mysql/ mysql
```

- Start mysql server
```bash
service mysql start
```

- Restore database backup
```bash
mysql < db_secondVer.sql
```

- Access mysql database
```bash
mysql
```

# Run application
- Install dependencies
```bash
npm install
```
- Run application
```bash
npm start
```
