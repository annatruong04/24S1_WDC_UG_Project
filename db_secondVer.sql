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
-- Table structure for table `Branch`
--
CREATE DATABASE IF NOT EXISTS `volunteer` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE `volunteer`;

DROP TABLE IF EXISTS `Branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Branch` (
  `BranchID` int NOT NULL AUTO_INCREMENT,
  `Branch_name` varchar(255) NOT NULL,
  `Location` varchar(255) NOT NULL,
  `Description` text,
  `Manager_ID` int DEFAULT NULL,
  `MemberCount` int DEFAULT '0',
  PRIMARY KEY (`BranchID`),
  KEY `Manager_ID` (`Manager_ID`),
  CONSTRAINT `Branch_ibfk_1` FOREIGN KEY (`Manager_ID`) REFERENCES `User` (`User_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Branch`
--

LOCK TABLES `Branch` WRITE;
/*!40000 ALTER TABLE `Branch` DISABLE KEYS */;
INSERT INTO `Branch` VALUES (1,'Central','Downtown','Central branch',4,1),(2,'West','Westside','Western branch',5,1),(3,'East','Eastside','Eastern branch',6,5);
/*!40000 ALTER TABLE `Branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Event`
--

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
  `BranchID` int DEFAULT NULL,
  `Image` longblob,
  PRIMARY KEY (`EventID`),
  KEY `BranchID` (`BranchID`),
  CONSTRAINT `Event_ibfk_1` FOREIGN KEY (`BranchID`) REFERENCES `Branch` (`BranchID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event`
--

LOCK TABLES `Event` WRITE;
/*!40000 ALTER TABLE `Event` DISABLE KEYS */;
INSERT INTO `Event` VALUES (1,'Annual Meeting','Annual corporate meeting','2024-06-15','Main Hall',100,1,NULL),(2,'Team Building','Outdoor team building activities','2024-07-20','Park',50,2,NULL),(3,'Product Launch','Launch of the new product line','2024-08-25','Conference Room',200,3,NULL),(4,'asfds','asfds','2024-08-25','asfds',NULL,1,NULL),(5,'Protect Environment (Workshop)','Join us for an immersive and educational workshop dedicated to protecting our environment. This comprehensive event aims to empower participants with the knowledge and practical skills needed to make a positive impact on our planet. The workshop is designed for individuals of all ages who are passionate about environmental conservation and eager to learn more about sustainable practices.','2024-12-28','The Braggs',NULL,3,_binary '�\��\�\0JFIF\0\0\0\0\0\0�\�\0�\0	( \Z%!1!%)+...383,7(-./\n\n\n\r---+-------------+--+---------+--+--+-----+--------��\0\0�>\"\0�\�\0\0\0\0\0\0\0\0\0\0\0\0\0\0�\�\0=\0\0\0\0\0\0!1AQa\"�2q��BR��\�\�#3br\�\�\�CSc���\�\0\Z\0\0\0\0\0\0\0\0\0\0\0\0�\�\0)\0\0\0\0\0\0\0\0\0!1A2Q\�\"�B����\�\0\0\0?\0\�\�\�d\�-*L�)=\�bI�v�^\�$2�[���ҫ*�D\�\�\0\�\r\r+Kj�+B�\�Rd*\'ZD�&\��\�+iS3d�,����\Z\�H2TM��C�(�\�ZiGփa!��,D��d�Ќ��\�X�+\�>1�e`�\�#�<E�\��rw\�l\0\�\�\�$�LU9\�@\��DV\�԰؂\��Y�h\�E5�T�I�\�\�;[�X�\�\��1\�@6��#��W\�\0(\�\rq\�0j\�@�.\�0\�#J�A4;2�T\�\�\�a\�i�P\�\� \�8\�YR���N�R\�p\�L[\0�R�CHT�\��\�%2a҈�uB\�Q=gx&0��nb�Z!�\�*\�a(Ђ(���-1���J2K\�3&ɰV�$��\�OqXE\nc	: R\n��V�\�\�\��\�~��\�$x�\�4\�kr)ң\��C��3!�(\�Z�jL.�ֽlO��\�ӫ�R�:�\�\Z��$\�an70�kɶ)�?n\�\�\�\�)T\�\�A6\��6����<l�^\�\�,H#\��:Z���\�y�owM�\�ɦ4�\�5�mW\0oq\�\�\�\��\�31-z��\�\r\��\�?Kp\�4\��\�u0&���|\�nE�5*7 U�jc��\�\�.�S\��#d)\�/\�A0�TH�$\�ܛb+��\�;6��8�-Q!@\"\��7Q`Ye���	F\� \�r\�e@�pd����D��XH墕��\�:\��\Z\�d�%L����\0XE�A�	0%VU�Vs�\�r\�M��c:ӧ#�6E�&Ӛf؁Z\r�� \\\�3C\n�tA�qab��aL\�1�[�覆\�n>�B�L\�]�\��\����\�S,L�$\�g�\�(V\�\�\�r�YKX\�p\�x�p_nm��Mj�k�\Z��<oӕ�\'�\�0\�\"�:�Q	�\Z�\�*\r\�}j:��b���ܖ�;�\�\��\�\'���\Z�#M:[-S\�\�r<�J\�M��n@�\�\�x\\\nR�Ù\�Ǜ\�~\�\�	J\�%�#�\�Q�\0�y�zV��W�\�\�м�\\6Ӧ8]�WX�A5*щW&N&$\����w1*$J�Ş;P^(\�4��-RіH2�)&0V�%ȑi\0t�&A2�\�VQ\�Hi�� @C\�,Lb�^<~�t�H�5\�,:C�YL24\�B����eCJ;\�g*D�i/\"\�P*L\�Ҧ  ��rec%!��^]ZP\r\�h´\�W�\�y�d�\�KA)�\�\�\�����`sJtn|\�\�\"\�:@�?)جRa\�\�g�]N�G}�\�\�C���\�?c���Ē\�I�=/=Λ鐍<\�߷\�D\�\���:%L�\���N��2\�\�\�{^z\�i\�U�o2�<XqzZt�ͬ�n[\�\�nqkm��m\�\�zK5\�W\�\�5�!�S\����\����\��x\�U\�<j�\�\�\�\�\�\�H7r\"֙u�{Lu$�,\��1\�<�;��}\"\'�\�t�\�\�r�Y�R�]\��D�	 I�\��Γa\�)V�Iz@\�)Q#���e����D=E�c�P�VyB\�PD+(\�\ZҎ&��Uą6�x39ܚ`4��Dխ\�bz\�VT\�\�c \�+D�Ҳ�~9g�\�H�V�\"a\�\��\�0\�#T\02\�!N��R󌩛ΐӁ��L\�Ȑ\�\�\�\�\�Ո1�G�\�\�G��\�\nj܆\0yIS{�[\r\�7�G\�\�\�\�{\�\�\�WңA4\�2H\r`o\�ng�\�\�F���\�\�\�\�2�*�\�15Є$\�:�\��\�]=X\�\��\0\0\�E\���ר\�Hi��\���X��\'�\0\�33���-\Zm�\�\�\�\�\�Z\�6�XE\�&���f7$�{\�\��\�z\�1\�\�M��x\"r\��s�ͨ\�\�RUH\�I&\���F)�OL����\r\�/�_Q<X�>\�؃q��\�%�$\�\�;\�2�\�Nz���\0�eӽ\�m\��K&r�.\r\�\�\�/�}\�\�*�Ř�Ԇ\"�\0.P\�1zV\�e�\0\�k5V{��\�đQmꧡ�\'\r��\��\�-�r�\";mq	�ff�4dz�\�.[k_V�\r�\�\�QjJ\���S\�%J\��\�\�O\�M�ʸ\�\�\��}a�g\�\�\�\�dp~\n:�2\�] ^�\�\�\�u�\�X�A\"`\'Yb5&�\�nz\r\�\Z\���>J5O}\�\�\"*M쬤c��&zZ\�c_�%1�\0���\0-\��t�\0\�1D�[\�H��L:L\���(I�4CJ\�h\�oRr\�DQ�5J3\�k�P�\����U��\���A�\�N)DA\�]L��\�\02�^\�E�\Ztc�A�\r-y\�@CJ��\�\r�(e�J3\��-�ZM\�5\��\�G[H$��\n�w.\���\�-�\�)E,�^���\�Xby��\0\�k/�\�L�ۋX�\�ō\�\�<g��b<�Z���ɳ\�>�\�\�kOk�\�ڊ{$�e\�\�!�\�\�^�\'���\0on1\�[\�m\��\�lm\�\�y�E4,v\"\�H�)��c�\�p\�w�\�2;\\}g�\�R&qTj�I\�V,\�eU\�;��^.؉W;E\�/M\\�]�{\�2\�S�t>�\�\�nʥ\�\�bl�k\���8,5#%��P�*+\r�;\rl\��\�\�ì&\�)n\�I\�=��dIΦcmz\��m��\0��2�\�?\�O	\�ʪ\�V.M]lY��\�^\�\�ղ\�r����7�\�0Ǒ�8�Ό8�N\�3�P�O\����\�\�-�&h��au\r\�\nL�Tj�O\�\�m4X1\'��fo\��o�4�QO\�$P�ʍ/Jh?I4\�\�8�\�hm��^��4Ģ��u\0�(\�^qV\�\�OI�\0�GA�]�@�v�\�G�-\�G\�=L(vx�\ZU\�L\��gx�⻇�6jN\�W�\�/Z\0�\�ꋆ�^a)\�\�;\\i\Z��!�\\T��HZ����\�\�Sy��c\�GLե\�E�\��]��0m.`\�\0AThW�T�$\"�g-X*��m�\�=6IZ\�\�І��-�}f{��\��sR׺�^\�?\�\Z\�p\�5ƀXX��\0U<\�=�۴\�Y��\�\�3\�xRk��[�\'\�k�\"Ҧ\r\��\�\�\Z6a�#{�Y��{ 	�\�p_�dm\�osӆ\�\�f\�K\�oY�6���\0I\�\�q}��T$��\��\r�:^\�ŭ�\�\��C�<\�3Z\�+~[\�qߐ�l[�`_�#Q�o�ML\0٭�\��\�U��^�ج\�Adm�5�\�\�Mή�×2�5���jjǉ\�O\r��KEڣ \�t�#r�/\��4�\�{Z\�E�\�\�8ňVM4�\�i%{[�O������\�\�\�)P\Z��\�av\�#}�\�\�b�\ZƈD/﹵֝\�`9�v�\��9^WN�\�5\0\rE\n�\�	��ǁ7�\�kCI:/��Q���9Ui\�\�[����RO�{���	��\�ThnO�S\�?�\��\�b3nKlq<L\�(ǃ\�\�՛o�t�lü\�\�1c�\�\�\�^�n�by�L͹��_21y��̜�Q=jf\�\r\�\�\�\0\�>{W5\�~�\�\�\�>�3�y\��\0�w�=��\�0�\���\�5g\n�Vp�>O�y&���y�O+\�\�61\�r�\�\�,������\�u\�5f�@pԑx��.K��\�\�\�Dա�P\�:/W�tjFV�ɦ�#���xӼh[\�A]\�\�/+-r\"� #V�u�\�P#G\�������ӥ�\�j�î\�\�R\�\�%\�rg[R6�-\�{G��\�\�\�Ât�\�q��\0\��\�8\�=\�3�#G��Kģv�g�e\�ѩ`H`�\�#0Va\��I\�\�\�)J\�\�\�\r���\�;��\�\�\�\�x\�\��\�u8J\�U]:A]ﵹv�p\��<ܽX�L�g\�tޗ�QT�zj\�T��M\�\�\�ls40y%3\�PV#\�X��\0\06\�6ݷ�\��e\�\�\�\��\�on:Z\�\�ߦ�/�\�Y��\'><r~�G�^�UЪ�\�\�bA���\�\�\�t\�#��(�{ga\�\Z\�\�Pt �aa�\�`f�\'�\�>7��\�w#K0\�\\\�\\\�mۀ�u�s�_�\�30\�q��C4ς��K7\�PY�Ba)��1��h��ߌ!\��\�\�\�qU��>u����\�z\Z\�߼�\�M#E\�ۜV�2\�\�5�s7�\�K�\�G�8��\�\�Ǭ\'\�d\�+L\�/�����`0\�*<�\�B\�\���fm:D\��o�:���\0\�0=;�T�\�\�x\�\�Z\�\�\�\�/%Z7\�j\n\�i�X<�c\�,\�(\ZX4���xth�t0Q(gT�ԋ�,�;�\�:���3CC+\�\�4h��*�!�\�W\Zd�\r,��\�A��2T\�	\�\�\�L\��(��k\�1Qk��lW���),H^[\�\�O�(�\�9U\n\�ڢ����j�\�\�N\�\�*\�\�\����SG\�\�X֦ln?/\���/\����=7�\�+Q��C\�FP\�\�w��ۍ�\��̬�\�\�\��V\�7G��+G\���\���l�5;\��_�I���F@ �\��\�\�[K�KY\�TQQ\�cga\�\�6�s;�\�KVk~7K\��N��b�Х���\���q\�GQ��}�o<\�.���y\�	s��\�7\��fVƒCX�mZ\�|+\�j{\\齙�s�I��{2)��=�ň\�\�\�\�\�Qm \�\�\�`-�\�\\hSgWO\�b\�\�v\�#2̅�\�,F ��Ɋ\rWs\�b\"\�\�=\�\�nOV�m\�Q\�\�#ʽ�S\�\�2\�%l\�vg6PI&�\0K\�5\�>\�V}\�0���\�\�|�\�\�\�=~[�\�Ï鯘�5F�v\�\�;z�&\��:��\'�\�\�@ݫ1\�YG\�i\�xd\�L\��\0C�׬\�*Z`\�&�0\�\���\0\08\0\0\�\�MF�w��e�A3Nv�f�\�&a/#T��ˠV�X\Zb3LHhe�B�\�E��HPlD\"Fe@�U\n$H�y׉\�\�R�\��2\\@i*Fi֙\�a\�Q��D��3\�b�̻*�\�\�\"\��Jgv8l �!�-:b\0\Z+�\�\�U�֚?+�\�\�#\�AԚ]\r6�0\�\nԓN\�e�Q�\�tW\�n\�\�<vi_L\�t4\�\�\�\�\�\�0\��\��+@֢�\n��)\�\�\�\�h\�W8\�\�G\�~\�os{\�\�\�Ʒ#�\�=�+\�,+��\�\�9#\�\��Zbc���7�\�R\��\0M�\�\�%,�:c\�c~hS	�c�3a��j$\�\�3\�T\�M��\�\�l�\�\�io���I=ɽ��F�x7�nx\�)Y�@R�m=K�\�*ձ����\��BM<�\n\�� 5�V\�O�^�\0�\��\�\�Ѧ��PQ�$x`\�\'l\�e�G�w\"-R�\�x18���\�!��E!Хe1fh���h�&��\�');
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
  CONSTRAINT `Notification_ibfk_1` FOREIGN KEY (`Manager`) REFERENCES `User` (`User_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Notification_ibfk_2` FOREIGN KEY (`EventID`) REFERENCES `Event` (`EventID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Notification_ibfk_3` FOREIGN KEY (`TypeID`) REFERENCES `Type` (`TypeID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notification`
--

LOCK TABLES `Notification` WRITE;
/*!40000 ALTER TABLE `Notification` DISABLE KEYS */;
INSERT INTO `Notification` VALUES (1,'Meeting scheduled','2024-05-31 03:40:45',1,1,1),(2,'Team building event reminder','2024-05-31 03:40:45',2,2,2),(3,'Product launch alert','2024-05-31 03:40:45',3,3,3);
/*!40000 ALTER TABLE `Notification` ENABLE KEYS */;
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
  PRIMARY KEY (`RoleID`),
  UNIQUE KEY `Role_name` (`Role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  PRIMARY KEY (`TypeID`),
  UNIQUE KEY `Type_name` (`Type_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Type`
--

LOCK TABLES `Type` WRITE;
/*!40000 ALTER TABLE `Type` DISABLE KEYS */;
INSERT INTO `Type` VALUES (3,'Alert'),(1,'General'),(2,'Reminder');
/*!40000 ALTER TABLE `Type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UpdateTable`
--

DROP TABLE IF EXISTS `UpdateTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UpdateTable` (
  `UpdateID` int NOT NULL AUTO_INCREMENT,
  `Time_stamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Message` text NOT NULL,
  `Manager` int DEFAULT NULL,
  `BranchID` int DEFAULT NULL,
  PRIMARY KEY (`UpdateID`),
  KEY `Manager` (`Manager`),
  KEY `BranchID` (`BranchID`),
  CONSTRAINT `UpdateTable_ibfk_1` FOREIGN KEY (`Manager`) REFERENCES `User` (`User_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `UpdateTable_ibfk_2` FOREIGN KEY (`BranchID`) REFERENCES `Branch` (`BranchID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UpdateTable`
--

LOCK TABLES `UpdateTable` WRITE;
/*!40000 ALTER TABLE `UpdateTable` DISABLE KEYS */;
INSERT INTO `UpdateTable` VALUES (1,'2024-05-31 03:40:45','System update',1,1),(2,'2024-05-31 03:40:45','Policy change',2,2),(3,'2024-05-31 03:40:45','New branch opening',3,3);
/*!40000 ALTER TABLE `UpdateTable` ENABLE KEYS */;
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
  `Email` varchar(255) NOT NULL,
  `Phone_number` varchar(15) DEFAULT NULL,
  `Password` varchar(255) NOT NULL,
  `Receive_email` tinyint(1) DEFAULT NULL,
  `Role_ID` int DEFAULT NULL,
  PRIMARY KEY (`User_ID`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `Email` (`Email`),
  KEY `Role_ID` (`Role_ID`),
  CONSTRAINT `User_ibfk_1` FOREIGN KEY (`Role_ID`) REFERENCES `Role` (`RoleID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'john_doe','John','Doe','john.doe@example.com','123-456-7890','password123',1,1),(2,'jane_smith','Jane','Smith','jane.smith@example.com','234-567-8901','password456',1,2),(3,'bob_brown','Bob','Brown','bob.brown@example.com','345-678-9012','password789',0,3),(4,'khanhnamld@gmail.com','Nam Khanh','Le Duc','khanhnamld@gmail.com',NULL,'',NULL,1),(5,'trannamld2005@gmail.com','dương','trần','trannamld2005@gmail.com',NULL,'',NULL,3),(6,'khanhle','Khanh','Le','abcabc@gmail.com','012345678','$argon2id$v=19$m=65536,t=3,p=4$SA2BmoNzIfHtYzIEX1CSZg$LD2nFmBiAnoq/O6TDkpjyUaJ1AnQoz7qB+fSvD3D5NI',NULL,2),(7,'duckieu','duc','kieu','duckieu@gmail.com','19348275','$argon2id$v=19$m=65536,t=3,p=4$x8rwz/ROaTFYnV4+3hrj0g$nccHfKWWpdtcMJQTKh1RGlVK0k/slqxofqjR2wCSzCI',NULL,3),(8,'testing','hihihaha','Le','abcgdg@gmail.com','923489234','$argon2id$v=19$m=65536,t=3,p=4$1hvzlF/e0iTHofmMout7VQ$QFxMk9hIOtUOIfyGiKS99XyTsD4/j5W6OLfQXFAm26I',NULL,3);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Branch`
--

DROP TABLE IF EXISTS `User_Branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_Branch` (
  `User_Branch_ID` int NOT NULL AUTO_INCREMENT,
  `User_ID` int DEFAULT NULL,
  `BranchID` int DEFAULT NULL,
  PRIMARY KEY (`User_Branch_ID`),
  KEY `User_ID` (`User_ID`),
  KEY `BranchID` (`BranchID`),
  CONSTRAINT `User_Branch_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `User` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `User_Branch_ibfk_2` FOREIGN KEY (`BranchID`) REFERENCES `Branch` (`BranchID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Branch`
--

LOCK TABLES `User_Branch` WRITE;
/*!40000 ALTER TABLE `User_Branch` DISABLE KEYS */;
INSERT INTO `User_Branch` VALUES (6,4,1),(7,4,2),(9,6,3),(14,2,3),(16,7,3),(18,3,3),(19,1,3);
/*!40000 ALTER TABLE `User_Branch` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `UserBranchAfterInsert` AFTER INSERT ON `User_Branch` FOR EACH ROW BEGIN
    UPDATE Branch SET MemberCount = MemberCount + 1 WHERE BranchID = NEW.BranchID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `UserBranchAfterDelete` AFTER DELETE ON `User_Branch` FOR EACH ROW BEGIN
    UPDATE Branch SET MemberCount = MemberCount - 1 WHERE BranchID = OLD.BranchID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  CONSTRAINT `User_Event_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `User` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `User_Event_ibfk_2` FOREIGN KEY (`EventID`) REFERENCES `Event` (`EventID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Event`
--

LOCK TABLES `User_Event` WRITE;
/*!40000 ALTER TABLE `User_Event` DISABLE KEYS */;
INSERT INTO `User_Event` VALUES (1,1,1),(2,2,2),(3,3,3),(4,4,1),(5,4,2),(6,1,3),(7,2,3),(8,3,3);
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

-- Dump completed on 2024-06-04 12:11:52
