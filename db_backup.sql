--
-- Current Database: `volunteer`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `volunteer` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `volunteer`;

--
-- Table structure for table `event`
--


-- Create 'Role' table
CREATE TABLE IF NOT EXISTS Role (
    RoleID INT AUTO_INCREMENT PRIMARY KEY,
    Role_name VARCHAR(255) NOT NULL
);

-- Create 'Organization' table
CREATE TABLE IF NOT EXISTS Organization (
    OrganizationID INT AUTO_INCREMENT PRIMARY KEY,
    Organization_name VARCHAR(255) NOT NULL
);

-- Create 'User' table
CREATE TABLE IF NOT EXISTS User (
    User_ID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) UNIQUE NOT NULL,
    First_name VARCHAR(255) NOT NULL,
    Last_name VARCHAR(255) NOT NULL,
    Phone_number VARCHAR(15),
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Receive_email BOOLEAN,
    Role_ID INT,
    OrganizationID INT,
    FOREIGN KEY (Role_ID) REFERENCES Role(RoleID),
    FOREIGN KEY (OrganizationID) REFERENCES Organization(OrganizationID)
);

-- Create 'Event' table
CREATE TABLE IF NOT EXISTS Event (
    EventID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Date DATE,
    Location VARCHAR(255),
    Participant INT
);

-- Create 'Type' table
CREATE TABLE IF NOT EXISTS Type (
    TypeID INT AUTO_INCREMENT PRIMARY KEY,
    Type_name VARCHAR(255) NOT NULL
);

-- Create 'Notification' table
CREATE TABLE IF NOT EXISTS Notification (
    NotificationID INT AUTO_INCREMENT PRIMARY KEY,
    Message TEXT NOT NULL,
    Time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Manager INT,
    EventID INT,
    TypeID INT,
    FOREIGN KEY (Manager) REFERENCES User(User_ID),
    FOREIGN KEY (EventID) REFERENCES Event(EventID),
    FOREIGN KEY (TypeID) REFERENCES Type(TypeID)
);

-- Create 'User_Event' table
CREATE TABLE IF NOT EXISTS User_Event (
    User_Event_ID INT AUTO_INCREMENT PRIMARY KEY,
    User_ID INT,
    EventID INT,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID),
    FOREIGN KEY (EventID) REFERENCES Event(EventID)
);

-- Create 'Update' table
CREATE TABLE IF NOT EXISTS `Update` (
    UpdateID INT AUTO_INCREMENT PRIMARY KEY,
    Time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    OrganizationID INT,
    ManagerID INT,
    FOREIGN KEY (OrganizationID) REFERENCES Organization(OrganizationID)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ManagerID) REFERENCES User(User_ID)
        ON DELETE CASCADE ON UPDATE CASCADE
);


-- Insert data into 'Role'
INSERT INTO Role (Role_name) VALUES
('Administrator'),
('Manager'),
('Employee'),
('Guest');

-- Insert data into 'Organization'
INSERT INTO Organization (Organization_name) VALUES
('Tech Innovations'),
('Health Solutions'),
('Educational Services'),
('Financial Advisors');

-- Insert data into 'User'
INSERT INTO User (Username, First_name, Last_name, Phone_number, Email, Password, Receive_email, Role_ID, OrganizationID) VALUES
('jdoe1', 'John', 'Doe', '555-0123', 'jdoe@example.com', 'password123', TRUE, 1, 1),
('asmith', 'Anna', 'Smith', '555-0456', 'asmith@example.com', 'password123', FALSE, 2, 2),
('bwilliams', 'Bob', 'Williams', '555-0789', 'bwilliams@example.com', 'password123', TRUE, 3, 3),
('ljones', 'Lisa', 'Jones', '555-1011', 'ljones@example.com', 'password123', FALSE, 4, 4);


-- Insert data into 'Event'
INSERT INTO Event (Name, Description, Date, Location, Participant) VALUES
('Annual Meeting', 'Annual general meeting for all staff.', '2023-10-15', 'Conference Room A', 100),
('Health Workshop', 'Workshop on healthy living and wellness.', '2023-11-01', 'Health Center', 50),
('Tech Conference', 'A conference on the latest in technology trends.', '2023-12-05', 'Tech Park Auditorium', 150);

-- Insert data into 'Type'
INSERT INTO Type (Type_name) VALUES
('Meeting'),
('Training'),
('Workshop'),
('Conference');

-- Insert data into 'Notification'
INSERT INTO Notification (Message, Time_stamp, Manager, EventID, TypeID) VALUES
('Reminder: Annual Meeting tomorrow at 10 AM.', CURRENT_TIMESTAMP, 1, 1, 1),
('New Workshop on Project Management next week.', CURRENT_TIMESTAMP, 2, 2, 3),
('Conference registration opens next Monday.', CURRENT_TIMESTAMP, 3, 3, 4);

-- Insert data into 'User_Event'
INSERT INTO User_Event (User_ID, EventID) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 1);

-- Insert data into 'Update'
INSERT INTO Update (Time_stamp, OrganizationID, Manager) VALUES
(CURRENT_TIMESTAMP, 1, 1),
(CURRENT_TIMESTAMP, 2, 2),
(CURRENT_TIMESTAMP, 3, 3),
(CURRENT_TIMESTAMP, 4, 4);


-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: volunteer
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'Youx Event - Graduation Ceremony','The event is dope','14/05/2024','Bar Smith Lawns',10);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-11 10:23:34

INSERT INTO Role (Role_name) VALUES
('Administrator'),
('Manager'),
('Employee'),
('Guest');



