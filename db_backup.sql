-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: volunteer
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

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

--
-- Table structure for table `Event`
--
CREATE DATABASE IF NOT EXISTS `volunteer` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE `volunteer`;

DROP TABLE IF EXISTS `Event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Event` (
  `EventID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Description` text,
  `Date` date DEFAULT NULL,
  `Location` varchar(255) DEFAULT NULL,
  `Participant` int DEFAULT NULL,
  PRIMARY KEY (`EventID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event`
--

LOCK TABLES `Event` WRITE;
/*!40000 ALTER TABLE `Event` DISABLE KEYS */;
INSERT INTO `Event` VALUES (1,'Annual Meeting','Annual general meeting for all staff.','2023-10-15','Conference Room A',100),(2,'Health Workshop','Workshop on healthy living and wellness.','2023-11-01','Health Center',50),(3,'Tech Conference','A conference on the latest in technology trends.','2023-12-05','Tech Park Auditorium',150);
/*!40000 ALTER TABLE `Event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notification`
--

DROP TABLE IF EXISTS `Notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notification` (
  `NotificationID` int NOT NULL AUTO_INCREMENT,
  `Message` text NOT NULL,
  `Time_stamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Manager` int DEFAULT NULL,
  `EventID` int DEFAULT NULL,
  `TypeID` int DEFAULT NULL,
  PRIMARY KEY (`NotificationID`),
  KEY `Manager` (`Manager`),
  KEY `EventID` (`EventID`),
  KEY `TypeID` (`TypeID`),
  CONSTRAINT `Notification_ibfk_1` FOREIGN KEY (`Manager`) REFERENCES `User` (`User_ID`),
  CONSTRAINT `Notification_ibfk_2` FOREIGN KEY (`EventID`) REFERENCES `Event` (`EventID`),
  CONSTRAINT `Notification_ibfk_3` FOREIGN KEY (`TypeID`) REFERENCES `Type` (`TypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notification`
--

LOCK TABLES `Notification` WRITE;
/*!40000 ALTER TABLE `Notification` DISABLE KEYS */;
INSERT INTO `Notification` VALUES (1,'Reminder: Annual Meeting tomorrow at 10 AM.','2024-05-27 04:58:37',1,1,1),(2,'New Workshop on Project Management next week.','2024-05-27 04:58:37',2,2,3),(3,'Conference registration opens next Monday.','2024-05-27 04:58:37',3,3,4);
/*!40000 ALTER TABLE `Notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrgUpdate`
--

DROP TABLE IF EXISTS `OrgUpdate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrgUpdate` (
  `UpdateID` int NOT NULL AUTO_INCREMENT,
  `Time_stamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `OrganizationID` int DEFAULT NULL,
  `ManagerID` int DEFAULT NULL,
  PRIMARY KEY (`UpdateID`),
  KEY `OrganizationID` (`OrganizationID`),
  KEY `ManagerID` (`ManagerID`),
  CONSTRAINT `OrgUpdate_ibfk_1` FOREIGN KEY (`OrganizationID`) REFERENCES `Organization` (`OrganizationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `OrgUpdate_ibfk_2` FOREIGN KEY (`ManagerID`) REFERENCES `User` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrgUpdate`
--

LOCK TABLES `OrgUpdate` WRITE;
/*!40000 ALTER TABLE `OrgUpdate` DISABLE KEYS */;
INSERT INTO `OrgUpdate` VALUES (1,'2024-05-27 04:58:37',1,1),(2,'2024-05-27 04:58:37',2,2),(3,'2024-05-27 04:58:37',3,3);
/*!40000 ALTER TABLE `OrgUpdate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Organization`
--

DROP TABLE IF EXISTS `Organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Organization` (
  `OrganizationID` int NOT NULL AUTO_INCREMENT,
  `Organization_name` varchar(255) NOT NULL,
  PRIMARY KEY (`OrganizationID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Organization`
--

LOCK TABLES `Organization` WRITE;
/*!40000 ALTER TABLE `Organization` DISABLE KEYS */;
INSERT INTO `Organization` VALUES (1,'Tech Innovations'),(2,'Health Solutions'),(3,'Educational Services'),(4,'Financial Advisors');
/*!40000 ALTER TABLE `Organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Role` (
  `RoleID` int NOT NULL AUTO_INCREMENT,
  `Role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`RoleID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
INSERT INTO `Role` VALUES (1,'Administrator'),(2,'Manager'),(3,'User');
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Type`
--

DROP TABLE IF EXISTS `Type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Type` (
  `TypeID` int NOT NULL AUTO_INCREMENT,
  `Type_name` varchar(255) NOT NULL,
  PRIMARY KEY (`TypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Type`
--

LOCK TABLES `Type` WRITE;
/*!40000 ALTER TABLE `Type` DISABLE KEYS */;
INSERT INTO `Type` VALUES (1,'Meeting'),(2,'Training'),(3,'Workshop'),(4,'Conference');
/*!40000 ALTER TABLE `Type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `User_ID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `First_name` varchar(255) NOT NULL,
  `Last_name` varchar(255) NOT NULL,
  `Phone_number` varchar(15) DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Receive_email` tinyint(1) DEFAULT NULL,
  `Role_ID` int DEFAULT NULL,
  `OrganizationID` int DEFAULT NULL,
  PRIMARY KEY (`User_ID`),
  UNIQUE KEY `Username` (`Username`),
  KEY `Role_ID` (`Role_ID`),
  KEY `OrganizationID` (`OrganizationID`),
  CONSTRAINT `User_ibfk_1` FOREIGN KEY (`Role_ID`) REFERENCES `Role` (`RoleID`),
  CONSTRAINT `User_ibfk_2` FOREIGN KEY (`OrganizationID`) REFERENCES `Organization` (`OrganizationID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'jdoe1','John','Doe','555-0123','jdoe@example.com','password123',1,1,1),(2,'asmith','Anna','Smith','555-0456','asmith@example.com','password123',0,2,2),(3,'bwilliams','Bob','Williams','555-0789','bwilliams@example.com','password123',1,3,3),(5,'khanhnamld@gmail.com','Nam Khanh','Le Duc',NULL,'khanhnamld@gmail.com','',NULL,3,NULL),(6,'trannamld2005@gmail.com','dương','trần',NULL,'trannamld2005@gmail.com','',NULL,3,NULL),(8,'Ashley123','Ashley','Le','32414532','abcxyz@gmail.com','password123',NULL,3,NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Event`
--

DROP TABLE IF EXISTS `User_Event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_Event` (
  `User_Event_ID` int NOT NULL AUTO_INCREMENT,
  `User_ID` int DEFAULT NULL,
  `EventID` int DEFAULT NULL,
  PRIMARY KEY (`User_Event_ID`),
  KEY `User_ID` (`User_ID`),
  KEY `EventID` (`EventID`),
  CONSTRAINT `User_Event_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `User` (`User_ID`),
  CONSTRAINT `User_Event_ibfk_2` FOREIGN KEY (`EventID`) REFERENCES `Event` (`EventID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Event`
--

LOCK TABLES `User_Event` WRITE;
/*!40000 ALTER TABLE `User_Event` DISABLE KEYS */;
INSERT INTO `User_Event` VALUES (1,1,1),(2,2,2),(3,3,3);
/*!40000 ALTER TABLE `User_Event` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-28 13:37:16
