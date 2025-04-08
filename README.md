# Project COMP SCI 2207/7207 Web & Database Computing (2023 Semester 1)
## Green Earth - Group 92
This is the volunteer website of group 92 named **Green Earth**. This platform has been designed to streamline volunteer activities, enhance communication, and facilitate the management of volunteer organizations. Below, you'll find an overview of the key features and functionalities that have been implemented and will be assessed.

<img width="1500" alt="Screenshot 2024-06-11 at 5 42 42 pm" src="https://github.com/UAdelaide/24S1_WDC_UG_Group_92/assets/140358233/71263da1-2420-4a29-9a4e-b4730dda3875">

https://www.figma.com/community/file/1491387464703230128
# Key Features
### General Users
- Sign Up/Log In: Users can create an account and log in to the system
- Manage User Information: Users can update their personal information
- Send request to join a branch of our Green Earth Organization
- View Updates: Users can see updates from the branch they are members of
- See Upcoming Events and RSVP: Users can view and RSVP to upcoming events

### Volunteer Organization Managers
- Sign Up/Log In: Managers can create an account and log in to the system
- Manage User Information: Managers can update their personal information
- View Members: Managers can view the list of members in their organization
- Post Updates: Managers can post updates publicly or privately to their members
- Manage Events: Managers can create, update, and manage volunteer events
- Track RSVPs: Managers can see who has RSVP'd for an event

### System Admins
- Sign Up/Log In: Admins can log in to the system and manage their personal information
- Manage Users: Admins have the ability to manage all user accounts
- Manage Volunteer Organization Branches: Admins can oversee different branches of the volunteer organization
- Sign Up Other Admins: Admins can create accounts for other admins

### Additional Features
- Email Account Linking: Users can link their email accounts for easier login
- Public Information Access: Users without accounts can view public updates and information from the volunteer organization
- Email Notifications: Users can opt-in to receive email notifications for updates and events. They can also customize their notification preferences for each organization they are part of
- Members of branch can comment on event detail page
- Breadcrumbs as a part of cognitive handling
- Search bar for better assistance of branches and events

## Start mysql
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

## Run application
- Install dependencies
```bash
npm install
```
- Run application
```bash
npm start
```
## Accounts for testing
To Log In into Member, Manager and Admin pages, here are some available accounts for testing:

**Member**
- Username
```bash
monsieurkd
```
- Password
```bash
1
```

**Manager**
- Username
```bash
khanhle
```
- Password
```bash
1
```

**Admin**
- Username
```bash
admin
```
- Password
```bash
password123
```

