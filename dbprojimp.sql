-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: dbproj
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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `first_name` varchar(200) DEFAULT NULL,
  `last_name` varchar(200) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `contact_no` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumni`
--

DROP TABLE IF EXISTS `alumni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumni` (
  `rollid` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `ctc` float NOT NULL,
  `role_applied` varchar(255) NOT NULL,
  `company_id` varchar(10) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`rollid`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_company` (`company_id`),
  CONSTRAINT `fk_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumni`
--

LOCK TABLES `alumni` WRITE;
/*!40000 ALTER TABLE `alumni` DISABLE KEYS */;
INSERT INTO `alumni` VALUES ('1901CE12','Pooja Mishra','Larsen & Toubro','pooja.mishra@gmail.com',11.3,'Civil Engineer',NULL,NULL),('1901CS15','Rahul Sharma','TCS','rahul.sharma@gmail.com',12.5,'SDE',NULL,NULL),('1901CS20','Priyanka Sharma','Facebook','priyanka.sharma@gmail.com',19.5,'Software Development Engineer',NULL,NULL),('1901CS40','Neha Gupta','Google','neha.gupta@gmail.com',20.1,'Product Manager',NULL,NULL),('1901EE10','Deepak Singh','Amazon','deepak.singh@gmail.com',18.2,'Software Development Engineer',NULL,NULL),('1901EE31','Rajesh Kumar','Microsoft','rajesh.kumar@gmail.com',22.5,'Product Manager',NULL,NULL),('1901ME21','Amit Kumar','Larsen & Toubro','amit.kumar@gmail.com',12.5,'Project Manager',NULL,NULL),('1901MT25','Ankit Singh','Tata Steel','ankit.singh@gmail.com',14.8,'Metallurgical Engineer',NULL,NULL);
/*!40000 ALTER TABLE `alumni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `id` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `Hr_contacts` varchar(255) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES ('acc01','Accenture Solutions Private Limited','hr@accenture.com',NULL),('ama01','Amazon Development Centre (India) Pvt. Ltd.','hr@amazon.com',NULL),('go01','Google India Private Limited','hr@google.com',NULL),('ibm01','International Business Machines Corporation','hr@ibm.com',NULL),('ins01','Infosys Limited','hr@infosys.com',NULL),('lnt01','Larsen & Toubro Limited','hr@lnt.com',NULL),('lt01','Larsen & Toubro','hr@lnt.com',NULL),('mic01','Microsoft India Development Center','hr@microsoft.com',NULL),('tcs01','Tata Consultancy Services','hr@tcs.com',NULL),('wip01','Wipro Limited','hr@wipro.com',NULL);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offers`
--

DROP TABLE IF EXISTS `offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offers` (
  `company_id` varchar(10) DEFAULT NULL,
  `role_offered` varchar(50) DEFAULT NULL,
  `ctc_lakhs` float DEFAULT NULL,
  `eligibility` varchar(200) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `branches_allowed` varchar(200) DEFAULT NULL,
  KEY `company_id` (`company_id`),
  CONSTRAINT `offers_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers`
--

LOCK TABLES `offers` WRITE;
/*!40000 ALTER TABLE `offers` DISABLE KEYS */;
INSERT INTO `offers` VALUES ('acc01','sde',15,NULL,NULL,NULL),('acc01','squant',16,NULL,NULL,NULL);
/*!40000 ALTER TABLE `offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `rollno` varchar(10) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gpa` float NOT NULL,
  `department` varchar(255) NOT NULL,
  `roles` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `cv` longblob,
  `image` longblob,
  `dob` date DEFAULT NULL,
  `doj` date DEFAULT NULL,
  `contact_no` varchar(16) DEFAULT NULL,
  `10th_marks` varchar(20) DEFAULT NULL,
  `12th_marks` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`rollno`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES ('2101CE01','Neha','Jain','neha_2101ce01@iitp.ac.in',8.5,'Civil Engineering','Structural Engineer, Environmental Engineer, Geotechnical Engineer, Transportation Engineer','mypassword','Female',_binary 'cv.pdf',_binary 'profile_pic.jpg',NULL,NULL,NULL,NULL,NULL),('2101CE02','Kavita','Banerjee','kavita_2101ce02@iitp.ac.in',8.7,'Civil Engineering','Structural Engineer, Environmental Engineer, Geotechnical Engineer, Transportation Engineer','mypassword','Female',_binary 'cv.pdf',_binary 'profile_pic.jpg',NULL,NULL,NULL,NULL,NULL),('2101CS30','Rahul','Sharma','rahul_2101ai40@iitp.ac.in',8.9,'Computer Science','SDE, Data Analyst, ML Engineer, Consultancy','mypassword','Male',_binary 'cv.pdf',_binary 'profile_pic.jpg',NULL,NULL,NULL,NULL,NULL),('2101EE01','Priya','Chopra','priya_2101ee01@iitp.ac.in',9.4,'Electrical Engineering','Power System Engineer, Control Systems Engineer, Electronics Engineer, Research and Development','mypassword','Female',_binary 'cv.pdf',_binary 'profile_pic.jpg',NULL,NULL,NULL,NULL,NULL),('2101EE02','Sachin','Verma','sachin_2101ee02@iitp.ac.in',9.2,'Electrical Engineering','Power System Engineer, Control Systems Engineer, Electronics Engineer, Research and Development','mypassword','Male',_binary 'cv.pdf',_binary 'profile_pic.jpg',NULL,NULL,NULL,NULL,NULL),('2101ME01','Amit','Singh','amit_2101me01@iitp.ac.in',8.1,'Mechanical Engineering','Design Engineer, Quality Control, Manufacturing Engineer, Project Management','mypassword','Male',_binary 'cv.pdf',_binary 'profile_pic.jpg',NULL,NULL,NULL,NULL,NULL),('2101ME02','Rohit','Gupta','rohit_2101me02@iitp.ac.in',8.3,'Mechanical Engineering','Design Engineer, Quality Control, Manufacturing Engineer, Project Management','mypassword','Male',_binary 'cv.pdf',_binary 'profile_pic.jpg',NULL,NULL,NULL,NULL,NULL),('2101MT01','Vikas','Kumar','vikas_2101mt01@iitp.ac.in',9.7,'Materials Science and Engineering','Materials Scientist, Metallurgist, Product Development Engineer, Quality Control','mypassword','Male',_binary 'cv.pdf',_binary 'profile_pic.jpg',NULL,NULL,NULL,NULL,NULL),('2101MT02','Shivam','Sinha','shivam_2101mt02@iitp.ac.in',9.1,'Materials Science and Engineering','Materials Scientist, Metallurgist, Product Development Engineer, Quality Control','mypassword','Male',_binary 'cv.pdf',_binary 'profile_pic.jpg',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students_applied`
--

DROP TABLE IF EXISTS `students_applied`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students_applied` (
  `student_id` varchar(10) NOT NULL,
  `company_id` varchar(10) NOT NULL,
  `role_applied` varchar(255) NOT NULL,
  PRIMARY KEY (`student_id`,`company_id`,`role_applied`),
  KEY `fk_2` (`company_id`),
  CONSTRAINT `students_applied_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`rollno`),
  CONSTRAINT `students_applied_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students_applied`
--

LOCK TABLES `students_applied` WRITE;
/*!40000 ALTER TABLE `students_applied` DISABLE KEYS */;
/*!40000 ALTER TABLE `students_applied` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students_placed`
--

DROP TABLE IF EXISTS `students_placed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students_placed` (
  `company_id` varchar(10) NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`company_id`,`student_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `students_placed_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `students_placed_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`rollno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students_placed`
--

LOCK TABLES `students_placed` WRITE;
/*!40000 ALTER TABLE `students_placed` DISABLE KEYS */;
/*!40000 ALTER TABLE `students_placed` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-13  1:09:27
