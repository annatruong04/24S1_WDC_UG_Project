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
INSERT INTO `Event` VALUES (1,'Annual Meeting','Annual corporate meeting','2024-06-15','Main Hall',100,1,NULL),(2,'Team Building','Outdoor team building activities','2024-07-20','Park',50,2,NULL),(3,'Product Launch','Launch of the new product line','2024-08-25','Conference Room',200,3,NULL),(4,'asfds','asfds','2024-08-25','asfds',NULL,1,NULL),(5,'Protect Environment (Workshop)','Join us for an immersive and educational workshop dedicated to protecting our environment. This comprehensive event aims to empower participants with the knowledge and practical skills needed to make a positive impact on our planet. The workshop is designed for individuals of all ages who are passionate about environmental conservation and eager to learn more about sustainable practices.','2024-12-28','The Braggs',NULL,3,_binary 'C:\\fakepath\\Light-Bulb-PNG-Pic.png'),(6,'aASDF','ASDF','2024-06-21','ASDF',NULL,3,NULL),(7,'asdf','asdf','2024-06-19','asdf',NULL,3,NULL),(8,'asdf','asdf','2024-06-14','asdf',NULL,3,_binary '�PNG\r\n\Z\n\0\0\0\rIHDR\0\0\0\0\0\0\0\0\0\�x\��\0\0\0tEXtSoftware\0Adobe ImageReadyq\�e<\0\0\Z\�IDATx\�\�\�=r$Ǖ\0\�$%_\�	T<� o=\�z\�e��\�	:�\'�h�\�\�`x�\'�\��̵0\�v�\�nM�\�\0�n�\�\�\�\�ETHT(��\�ٙ/_�TJ\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0<\�!����gI�\�\�P@9�\�\�n\�\�R��~_\n\0H\0\0\0	\0\0 \0\0$\0\0�\0\0�\0\0\0\0\0@\0\0H\0\0\0	\0m\�>+a �j\�\�\0\�<\�o\��;\�\�\�I\�\�w,\�d\�\�\�\�۝D\0 CG<\�\�?<�@߻��v\�\'	\�	\�=28\�^�\0\�\��\�=�\0��\�\��9`�\�H\0$\0\���};`\���g�\0H\0f4��}�\���\�3�^�\0�|��\�b%\08b�\�܁��\�c\�+X&�#f��6�\��sgZ*	�R.g����\0\��,8p\�V�\0�7�虒�����ѣUs<\�\0	�\\/Gw\0]Z�\�w\�?\�YK\0$\0\�l�\�\�\�A�s��\��J\0$\0Ǻ	n���\"y9��y�Ϙ���.\0��]\�rE�\n�\�=u\�**\0\�B\�e\�\�τ��eH�v�\'\�{z��\0\�7��\��\n\0�\0���\�\��5�h�\n\����T\0�o\�\�\��Q�[\�4˃\�\�_�\�ٜ\�����\0��\�s��\rn�\�\�\rI\�U���(�c	�\�n��昼��|m\��v\�=ǯT\0z��\�r)*\0p��\�\��3��\�wm�a\�������\n\�\��*\0\�q%5*\0PH �R�!yQP�\�)~#\�wf�\0\�\�\�n\Z���\0\�$S;\0�\�,)�\n\�EA}9\�4�\�3���Y�\�f�\�{M���Q�\�D_�\�u�}\��O\Zo\�\0Us;�\n�܆\�\�IP�x9\�L�(�m\�vҎ᳾\n�{a\�:�3�J\�^Ӻ�՟��7�Β\�n\���\�\����1�\�:\�\�텰7\�\"YR��\n\�q�\�ޔ1y\�/@�U\0/\n\�%r�\�\�\�`�*\0\��\'a��\�\\^��\np\��\���\��\�\�T�\���\�\�\��u:K*F\0fuϜ\�\�\�\�O#\�\0\Z\�\�&anʔ�\�D:\n3�\�8\��aස�M\'&\�\0��\n���m\�.i�\�%\��*�\\��N\�x?�\�?@��%��Yi\�^�LJ 28��{m\�\�D\�:y\�@SU\0G�8\�:~t\�\� �)=��\�E><\�Yz�\��$D\0y=\�� G���mM��/m��*�F\�\���\�\��\��<Y�eYþ�I0�Pf@��}?\�\���ͮ\�t��\�_�P\�x39MoBZ	\r�\�\��\�Th\�eN\�ӗ�\�\�\�ꛞ��\�Z\�/s��\�F�\rD9M�]�t.T\��B��+���\�d� �?�\�!�w\�v�\�w%�\�\���o����q��6	\0�;\�g\�ǖ\�v\��\��iovro�����})o�ϛ��\�^����Ӧ]\�IǿKc\�6�\��\'p����\���:\�U�\�x\�u�\�=\�s?\�\�㪫\�J+\�\�\�ɰ���:c\�3\�\�\�Rك�1	釤`\�W\�s��y\r�\�8��\�A��\�{zaŧ\�\�r�wk�e�͛��w\�7<�m/U❄��\�x��U�2ß�B�\�\�EŪSZn�\�w8O\�Ϻ��\�\r����\�@6C@5\�\�@�\�*p�e�`��|\�\01}PTUJ\�f�\�\�`o4[\�n�Sy�ek\�\�\�?\��O��|��u��\�\�K?�\�\�BU��\�\�\�#t\�,\�\�P\�y�\�i2\�\�Z�\�$\�=Pk\�]ҬJGz�!\�w6\�3\�\���i���t\�T�.����m4\�\��H��\�\�\�@xD\��\r��\�m�\�	\�y*;q�n�\�\�;P�\�\�#І��\r��ܤz:\�^7\�\r�\�<7�\�Sg�}O\�\�̲��\�{\� x������ョ�}\�Ώ/���w�\�\� \�\�35>،�U��[��ϵ|�\��\�Z�\�\�Snn1��)��\�*�}�\�\�5\�\��rZ�Ɖ��?\�S\�ݧ�j.\�-\�sO�O\�	\�Ye��\��\�Ĭ��\�;f\�5\��\�X�~���\�m�6�A��T-k\�0=\�ǌ\�F?hZme\�s�\�$KK�i\�\�M�ѯX_\nA\�\�l�?l�W�$K�ޗM��\�]{Y���ȫ}�\�F�*\�BP�]g�)�\�����-\�\�k\�>\�v\�n\�>\�\���\��\��lm\��w\��\�\�\��\�\�]��\�\�y�ۖ\00�a��\�)��\�oR�W�~\�w	\�\�\���\�����\�\r��g�$�n�\�=$�\�ZI>�+\�\�>V��kXnV[\�\�j�͐Z�\�\�n�w\�\�*hx��\��R�\�(�X}\�@�J\�\�vY\�\�_Ӆ(�\�w�\�\�R}�\��\�[_B|m\�L�]\�\�\�ߥ�\�![�w�\�yj��~�~\�\�R�KK�\�1-y_t!\�\r�%풮y\��0\�v\�^kNJKV��7�AA3�\�r\�\�\�?K\�\�\�\�n�\�r�Ғ�\�J�#�P�)h\�ZJ\�W\�࿋\�YR6}(��*�\n\\\�;�\�4i�P��7�R��i\�/�b�ҬS=�6^\���\�X\�\���f\05��wĨ96����D�\�~�Nt��jI�������߃1\�^��\��EZм!��T~W\�,�\�7%\�*��\�\�%�R˓\�T\�U\��3L��#9�<� M�X\�\�V\�\�\�N��h\�Ш1_N-��yZ\�\�\�l)K[(qhI��c��d\�\n��E�����N%\��wJ~g&�\��\��\�\�\��Y\�y�R\�,mӟS5�����~���\':ϳ���:\�3ͦH�\�\r(�:t�l\��0�2��\r���\�Pʷ*����\�㣁��\�7\���;��\����\�0�r�.\n�ɇ��6�Ov�t��\�\�hU�\�Rn�,e)`�\��\�\�J(\�}U+a\�hI5�\�P�7����J҅�\�\�\�\��~\�jS�g\�5\0<n�{\�_:�\�\�/	X\�	\0��\�\�h8	�|\0�\Z�5\�Nlx@\�\�m��k��0\�\�(	�\�\\\��\�\�W\�7L�\\\n \�쿔W�7	\�u\�D\00�O��\�_�\n\0tmH6��ߤ\n\0+\�F,\��<$G%jv�\�?\�66\��<\��\��\0\�Ҕ\�\�GYr�8h-\�@on�\�?\�^\n�r�\'��\�J�N3T�H�q\���	9G8O�\�nH^\�J٢/�r�})d�\n��#�\�>\�\'kaZy���p\�A9r��M�@ӆ\�\�\�X�WU�fE��v��9D\�X7Q\� ڟ?\�{ᦲv\�p-:Iv�Sg���8\r�\n\0M�\����p3�݉�ׁ\�\�(\�@k\"\��g3s��\�\\��\�D�Q�b	Q\�Wm^̠�����D�`Q�t�\�&*\���U\�\�l$\�\�>\�P��\�̀_7\0Z1}ΏBM\�\�끁&D�N��Yڐ\�@�\�E\�f����\�n�7�\0H\0\�0c\�\��$\�4�hJ\0�\0P=\0iɏ��n\0q������\�R�Q�v�\�7\�L��F~7H\0��N\��?�\"N�\"�jQ��\n\0�~��Q��\0\�5������/�\��$\0�V\�Qh���4S	\0\��M\�i�\�\0�\0�\0P��;\�o����\0�\0�#l\0$��\�\�K��\0P���\�?9�,H\0\�q���b\�!\"\��	\0@Y\"O	\0\0�\�-�\0\0:\�&3Z&\�D\0�bF!@\0fa\0\0�\�AE\0p�)�s	\0<�&@\0	\0\0 \0\0$\0\0�\0\0�\0\0\0\0j\�4��9#M\�\�u�\0�C\�@\0��B@\�,�!\0\�p\�o)\r	\0չm�#����S�_�A^%��-98\���,�]�#\�ӆ�1\����\�J�;b	��E�_�\�L�$\0\�̿f2�\�p+\�H\0�UD63D���	3\0jсٍM���@\0	\0Պ\�\�Ct\�)@@��n1S�\��%@H\0�֕��>(yv\r0\0�v\�_3�F�$\0PF0\n3A��\�D��\��\�9�he\��\� \0�5�Q \�׍�n\03l�wϥP\�&�=\�4�x�\Z\�,�\0Q,ЂUc�$\0�����\�5\r����\Zh\�n�~D\�\�N�Y\�IP��4\�.�\�\\	5X�\�k�&�%\0\"]}�e\0jnWWB\r�\�,Y�N�\�,�9�Nɫ\��OQ\�l��]\'\��^\�\�L�ʜ�\�3\�t�:Sʰ	l��p-�:x#Լ\�I`{u��P��\�\�\�\�ͦF\�\�V)n)\�\�z\�T�J�6\�\�I�`VQ�t�<\�\�F��	g	�\\^~\�	7��\����v��	\�C`�T����:	7G�<�w!\�@o\"�Wu$�CE\���{\�B\�hu�\�7�\�\�)�.E�ZU8$)�l�\�B\�jT�\�ٿ\�@\�\"\�P��ٿ7�\�[�\�\�\�%䀙W\�\�K\0m�\����Iȹg\����\Z`o\�\���\�\�,L�\�\�\�?��D�\�\�Llvm.9�\��s�9w\'_w\�_y״7�{\�{�a\�5\�1Ì\�\�\�\�m�k\�ti7\�\�v#?t\�\�Ѭ̅,}�I�\��w�\��}\�tl\�\�O�{\�yN9\�\�L\�ؗug����~\�g\�I\�\�i:n\�\�*��Y�}\�O	k�7O�{I~�a\�3\�\�Ϊ\0.g\�\�\�\�\�u`�*\0\rY���s\�DW\\\�Ҿ!\�\��{\�\�_c�B\'\�\�\���l�\�QpL�m���\��K�\��$BR\�l6i��͜X�\�\�M=&�S��2�*\0�vj�\�N,G�\�X`�nR\��\���U�\0\�\�\�q\��E�\�ךXS�m(\�����\�~�Mr��y\�➖_�3d�{mlǐ\���\�~�\�K	3,ہ�g\�\�J\�\�6��\�����>#Gq�*\0\�8\�➖\�\�9.oqw{�\�m榀\�����P�gZ�<�\�K�-oJ6r�\�\�\����B����\�V\"\r��Ny\�\��yr�*�$S|V�f�\�2��\�B�����%�tP�\n\�\�K�\�\�\�J(\�r�\�*\�oj,\�o�,��Q�w�ƿIu��]�����4٪\��m]ү\�ԗ�\nЕ1\�9\�\�\�\�fc��ی��\�X�\�\�\�>\�ˈh\�:\�ِ\�jg�#��!�9~g�T�\�\Z\�[������\�\��_\��!Sg�\\Y��J�4j\�X�\�7���mR{�)�ޔl\��6����/\�g͚�\r�&\0\�\���\�~o\�\"SV�}��izS%�\�Ej3(a \\%3ޗ�s���������\�rMS[��\�\��\�Q�4;)K�6�)\�oϵ\�\�\�0�\�~�S*s��\�\�_\�֩ߍ9ۿe6(���k�s]A|s�@\�Rʘ�\�\�ˍ���8\Z4mZSӏ\�n�2\�f�\�$\��\�n\��\�}G�\�h\�Y?�M\�\�w�*KI�\�\�\�\�\�\�\�ScU`ԴiQ��u>�����,\�f�sM;��\�Zg��T,�Ѵ\�\�~l\�\�\�kCԠi�\Z3%ʵ\����\Z��FӆT\��~\�gl7�bJە����Sy�ZN�y��ޤ>\�\�\��]\�=X\'�\�\'%\�T6�6=�,S�xqO�.�5\�96�\�r+]Ϊ��n,�#\�~\�<�/�5\�EM\�\�NTU`X����,u�}-\�D�RqKr-\��\�|�L\��Gw\�,e^$%��\�\�o�3kg\�?	�?�.X���\�S\�\�D2\�\Z]\�{T��>\�9�ZK\��9Rj%g-\�Wl����/\��s\�\�q\�ٿ�\�WΞ\�;sr�\�8�_\�a�M��\0m\��\�J�o<\�;3�A����\'J\��fU�:g�֤c�~\�Q\'\�a}�\�\�xO�*@]��;��Ū-x\�yrqO��ﴞٿ�m�\�t\�WT7�P9.�1�ԑ�\�H\�\0\�6���\'\�\0��D4����9�Љu򎀒�\�e�Q\���\nP�\�W9�\��3��Fbf\�Ч\�ˁ}z\�:�\���\0���A\�:Q�#�$c\0�\\8\�E_�c\�@h���OE�3� K`\��6���*��\�\�a\�N��i0� �\�\�f�h�7���	���\���ț�F\����\�;N�7�A_\n|\��\�Zu\�?~\�\��6\0O9I��DU[l�\� ��\�\��0\�xҤ8D\�\�t�\�\0���M\Z�CE	\�\�b��\���\0�\�j�\��\�g�Ҕ(u�:\�,��d\�d\� <\�\�\�y\�Ycg��:\�s^k\� �\�����Q	���\0<K\�2���\�[*\0P��e�ݠ\�\�>��ٿ\�?H\0\�E��\�N\�y\�\�\�@��Jֽ\�q�\�\�\0fq)P/k\�w�)\�\�\0&��<�\�\�\�7��ɂ\0\�p\�9�o<m\��	\0H\0$\0��}���\0@5I�\�\Z�\�\�\��A\0��XWn������\n��\"^`\��\�5/V�:C\�\0\�\�\�_���\0\�p�\��\��K�_\�\���f\n\00�\���\0�2h�\�w\�\0\0X\�߅��\r$\0`�YD�w�&\�3\�j� �Z��\�\�E\�H\0�\0\��$\0P\�\0s\"̀\0�\�&;��\0\0\�X��!\0	\0P �\r�\0@ծ�\0�ݯ�\0�沙2\'\�\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\�|!b��]	\05\Z�\�f��\�<\�\�\�oД\0�\�d\0�5XkR\0�ά�G\0@�\�ԋ>+M\�a \�\�d�\�\���e\�n�?l��B/\�������U\0�\0@i�q�ZX�����\��o�T\0��B\�2H\0��Y)@5,�|,\�%[�\0@\0�\�FB\\	H\0�$?A��\0^\�\0\�\�E@˻\�>_	�ܯ�\0f\�\�\���j�\�\�}\0\0\�\�2 /�S��\�Π=\�\�UU\0�ư�H�\�\�\�SLɞ\nX�M�\�\�@v�\�d�\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0�zy\0\�\��7\�}��\�)�\�\�\�\�\�:y\0\0���ɛ��\�l$K\0\�h��\n��\�.~��\0�X�%P2{\0`~��\�MR��\�\�\��\�\�y+0�_	\�Ͽ	\�\�I\��m�+�\0\0(՝\��bU���\�\���F��b�d/\0H\0�\��\�H�@\0\0H\0\0\0	\0dr%�rf\�\0\�k�F}\'�\r��P�R�W°q\0(ڐ\�\�ȼ�\�W\�\0\�\�M��\�`\�\�\�\�B1��\�>o��\ZLɋ|\�x֚\0�ٽ\�\� ��g�Q�e\�\01v�\�o�\�l?\�\���q��\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0*\�]\0�\�:�/\0\�\�\��w\�?\0\�\�\r�\�\��\�\�\�p�I\0ЋI@\���\�7�@\�I�eg��\�k�\�6��k_5\0\�����$\�n���j\�i\�\0\�\�:�q\�\�\�\0%.��Β\0�?\0̔\�%�\0@wN+H�\0\�Y�\�\�\0�r�T\��v	\�\�\�\0\�+\��7\�1?\07e�/���\0�͸��G��τ\0ʩ,�\�\�?ì\Z\��@sN\�U�9\��\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0З�`\0\��f\�\��\0\0\0\0IEND�B`�');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'john_doe','John','Doe','john.doe@example.com','123-456-7890','password123',1,1),(2,'jane_smith','Jane','Smith','jane.smith@example.com','234-567-8901','password456',1,2),(3,'bob_brown','Bob','Brown','bob.brown@example.com','345-678-9012','password789',0,3),(4,'khanhnamld@gmail.com','Nam Khanh','Le Duc','khanhnamld@gmail.com',NULL,'',NULL,1),(5,'trannamld2005@gmail.com','dương','trần','trannamld2005@gmail.com',NULL,'',NULL,3),(6,'khanhle','Khanh','Le','abcabc@gmail.com','012345678','password123',NULL,2),(7,'duckieu','duc','kieu','duckieu@gmail.com','19348275','$argon2id$v=19$m=65536,t=3,p=4$x8rwz/ROaTFYnV4+3hrj0g$nccHfKWWpdtcMJQTKh1RGlVK0k/slqxofqjR2wCSzCI',NULL,3);
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

-- Dump completed on 2024-06-03 11:39:28
