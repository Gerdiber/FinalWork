-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: finalworks
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `meetings`
--

DROP TABLE IF EXISTS `meetings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meetings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` int NOT NULL DEFAULT '1',
  `meeting_name` varchar(50) NOT NULL DEFAULT '新增会议',
  `g1_time` varchar(1000) NOT NULL,
  `g2_time` varchar(1000) NOT NULL,
  `g3_time` varchar(1000) NOT NULL,
  `g4_time` varchar(1000) NOT NULL,
  `g5_time` varchar(1000) NOT NULL,
  `g6_time` varchar(1000) NOT NULL,
  `g7_time` varchar(1000) NOT NULL,
  `total_time` int NOT NULL DEFAULT '0',
  `expect_in` int NOT NULL DEFAULT '0',
  `total_in` int NOT NULL DEFAULT '0',
  `total_out` int NOT NULL DEFAULT '0',
  `male` int NOT NULL DEFAULT '0',
  `female` int NOT NULL DEFAULT '0',
  `update_info` varchar(50) NOT NULL,
  `updater_group` int NOT NULL DEFAULT '1',
  `updater_id` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='会议数据';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meetings`
--

LOCK TABLES `meetings` WRITE;
/*!40000 ALTER TABLE `meetings` DISABLE KEYS */;
INSERT INTO `meetings` VALUES (1,1,'首次会议---测试','[0,0,0,0]','[0,0,0]','[0,0]','[0,0]','[0,0,0,0]','[0,0]','[0,0]',0,19,19,0,15,4,' 于 2024/4/25 1:55 更新',1,1),(2,1,'新增会议2','[0,0,0,0]','[0,0,0]','[0,0]','[0,0]','[0,0,0,0]','[0,0]','[0,0]',0,19,19,0,15,4,' 于 2024/4/22 19:26 更新',1,1),(3,1,'新增会议3','[0,0,0,0]','[0,0,0]','[0,0]','[0,0]','[0,0,0,0]','[0,0]','[0,0]',0,19,19,0,15,4,' 于 2024/4/22 19:26 更新',1,1),(4,1,'新增会议4','[0,0,0,0]','[0,0,0]','[0,0]','[0,0]','[0,0,0,0]','[0,0]','[0,0]',0,19,19,0,15,4,' 于 2024/4/22 19:26 更新',1,1),(5,1,'新增会议','[0,0,0,0]','[0,0,0]','[0,0]','[0,0]','[0,0,0,0]','[0,0]','[0,0]',0,19,19,0,15,4,' 于 2024/4/22 19:26 更新',1,1),(6,1,'新增会议','[0,0,0,0]','[0,0,0]','[0,0]','[0,0]','[0,0,0,0]','[0,0]','[0,0]',0,19,19,0,15,4,' 于 2024/4/22 19:26 更新',1,1),(7,1,'0新增会议0','[0,0,0,0]','[0,0,0]','[0,0]','[0,0]','[0,0,0,0]','[0,0]','[0,0]',50,19,19,0,15,4,' 于 2024/4/25 21:57 更新',1,1),(8,1,'新增会议','[0,0,0,0]','[0,0,0]','[0,0]','[0,0]','[0,0,0,0]','[0,0]','[0,0]',0,19,19,0,15,4,' 于 2024/4/22 19:26 更新',1,1),(9,1,'第114514次会议','[50,66,9,0]','[0,36,0]','[28,0]','[0,14]','[0,0,0,28]','[0,-1]','[0,-1]',60,19,17,2,14,3,' 于 2024/4/25 22:35 更新',1,1),(10,1,'最新会议111','[9,-1,6,7]','[19,33,0]','[0,0]','[63,0]','[0,0,44,0]','[0,70,0]','[0,55]',120,20,19,1,14,5,' 于 2024/4/25 20:39 更新',1,1),(11,1,'新增会议','[0,0,0,16,-1,52,0,17,-1,0,-1]','[0,0,0]','[0,0]','[0,0]','[0,0,0,0]','[0,0,0]','[0,0]',0,27,24,3,17,7,' 于 2024/4/26 10:40 更新',1,1);
/*!40000 ALTER TABLE `meetings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_1`
--

DROP TABLE IF EXISTS `users_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_1` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户唯一标识',
  `username` varchar(45) NOT NULL COMMENT '账号名',
  `password` varchar(45) NOT NULL COMMENT '密码',
  `name` varchar(45) NOT NULL COMMENT '名称',
  `group` int NOT NULL DEFAULT '1' COMMENT '用户所在组',
  `gender` tinyint(1) NOT NULL DEFAULT '1' COMMENT '性别,0为女,1为男',
  `age` int NOT NULL COMMENT '年级(20,21,22,23)',
  `status` int NOT NULL DEFAULT '1' COMMENT '用户状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='前端用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_1`
--

LOCK TABLES `users_1` WRITE;
/*!40000 ALTER TABLE `users_1` DISABLE KEYS */;
INSERT INTO `users_1` VALUES (1,'admin1','admin123','管理员[前端]',1,1,23,0),(2,'ozm','aa123','OuZeMing',1,1,23,1),(3,'zs','123456','张三',1,0,23,1),(4,'nihao','11111111','你好',1,1,23,1),(5,'nooba','noob','nooba',1,1,22,1),(6,'noobb','noob','noobb',1,0,21,1),(7,'noobc','noob','noobc',1,1,20,1),(8,'noobd','noob','noobd',1,0,23,1),(9,'noobe','noob','noobe',1,0,23,1),(10,'noobf','noob','noobf',1,1,23,1),(11,'noobg','noob','noobg',1,0,23,1);
/*!40000 ALTER TABLE `users_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_2`
--

DROP TABLE IF EXISTS `users_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_2` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户唯一标识',
  `username` varchar(45) NOT NULL COMMENT '账号名',
  `password` varchar(45) NOT NULL COMMENT '密码',
  `name` varchar(45) NOT NULL COMMENT '名称',
  `group` int NOT NULL DEFAULT '2' COMMENT '用户所在组',
  `gender` tinyint(1) NOT NULL DEFAULT '1' COMMENT '性别,0为女,1为男',
  `age` int NOT NULL COMMENT '年级(20,21,22,23)',
  `status` int NOT NULL DEFAULT '1' COMMENT '用户状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='前端用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_2`
--

LOCK TABLES `users_2` WRITE;
/*!40000 ALTER TABLE `users_2` DISABLE KEYS */;
INSERT INTO `users_2` VALUES (1,'admin2','admin123','管理员(后台)',2,1,23,0),(2,'kiki','123456','kiki',2,1,23,1),(3,'kikti','123456','kikti',2,1,23,1);
/*!40000 ALTER TABLE `users_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_3`
--

DROP TABLE IF EXISTS `users_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_3` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户唯一标识',
  `username` varchar(45) NOT NULL COMMENT '账号名',
  `password` varchar(45) NOT NULL COMMENT '密码',
  `name` varchar(45) NOT NULL COMMENT '名称',
  `group` int NOT NULL DEFAULT '3' COMMENT '用户所在组',
  `gender` tinyint(1) NOT NULL DEFAULT '1' COMMENT '性别,0为女,1为男',
  `age` int NOT NULL COMMENT '年级(20,21,22,23)',
  `status` int NOT NULL DEFAULT '1' COMMENT '用户状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='前端用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_3`
--

LOCK TABLES `users_3` WRITE;
/*!40000 ALTER TABLE `users_3` DISABLE KEYS */;
INSERT INTO `users_3` VALUES (1,'admin3','admin123','管理员(嵌入式)',3,1,23,0),(2,'amns','123444','阿弥诺斯',3,0,21,1);
/*!40000 ALTER TABLE `users_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_4`
--

DROP TABLE IF EXISTS `users_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_4` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户唯一标识',
  `username` varchar(45) NOT NULL COMMENT '账号名',
  `password` varchar(45) NOT NULL COMMENT '密码',
  `name` varchar(45) NOT NULL COMMENT '名称',
  `group` int NOT NULL DEFAULT '4' COMMENT '用户所在组',
  `gender` tinyint(1) NOT NULL DEFAULT '1' COMMENT '性别,0为女,1为男',
  `age` int NOT NULL COMMENT '年级(20,21,22,23)',
  `status` int NOT NULL DEFAULT '1' COMMENT '用户状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='前端用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_4`
--

LOCK TABLES `users_4` WRITE;
/*!40000 ALTER TABLE `users_4` DISABLE KEYS */;
INSERT INTO `users_4` VALUES (1,'admin4','admin123','管理员(移动)',4,1,23,0),(2,'zgyd','1111111','中国移动',4,1,23,1);
/*!40000 ALTER TABLE `users_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_5`
--

DROP TABLE IF EXISTS `users_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_5` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户唯一标识',
  `username` varchar(45) NOT NULL COMMENT '账号名',
  `password` varchar(45) NOT NULL COMMENT '密码',
  `name` varchar(45) NOT NULL COMMENT '名称',
  `group` int NOT NULL DEFAULT '5' COMMENT '用户所在组',
  `gender` tinyint(1) NOT NULL DEFAULT '1' COMMENT '性别,0为女,1为男',
  `age` int NOT NULL COMMENT '年级(20,21,22,23)',
  `status` int NOT NULL DEFAULT '1' COMMENT '用户状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='前端用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_5`
--

LOCK TABLES `users_5` WRITE;
/*!40000 ALTER TABLE `users_5` DISABLE KEYS */;
INSERT INTO `users_5` VALUES (1,'admin5','admin123','管理员[人工智能]',5,1,23,0),(2,'ls','123456','李四',5,1,23,1),(3,'kobe','114514','牢大',5,1,20,1),(4,'debugger','123456','kiki',5,0,23,1);
/*!40000 ALTER TABLE `users_5` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_6`
--

DROP TABLE IF EXISTS `users_6`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_6` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户唯一标识',
  `username` varchar(45) NOT NULL COMMENT '账号名',
  `password` varchar(45) NOT NULL COMMENT '密码',
  `name` varchar(45) NOT NULL COMMENT '名称',
  `group` int NOT NULL DEFAULT '6' COMMENT '用户所在组',
  `gender` tinyint(1) NOT NULL DEFAULT '1' COMMENT '性别,0为女,1为男',
  `age` int NOT NULL COMMENT '年级(20,21,22,23)',
  `status` int NOT NULL DEFAULT '1' COMMENT '用户状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='前端用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_6`
--

LOCK TABLES `users_6` WRITE;
/*!40000 ALTER TABLE `users_6` DISABLE KEYS */;
INSERT INTO `users_6` VALUES (1,'admin6','admin123','管理员(图形)',6,1,23,0),(2,'b','11111111','bbb',6,0,23,1),(3,'abcde','abcde','abcde',6,0,22,1);
/*!40000 ALTER TABLE `users_6` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_7`
--

DROP TABLE IF EXISTS `users_7`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_7` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户唯一标识',
  `username` varchar(45) NOT NULL COMMENT '账号名',
  `password` varchar(45) NOT NULL COMMENT '密码',
  `name` varchar(45) NOT NULL COMMENT '名称',
  `group` int NOT NULL DEFAULT '7' COMMENT '用户所在组',
  `gender` tinyint(1) NOT NULL DEFAULT '1' COMMENT '性别,0为女,1为男',
  `age` int NOT NULL COMMENT '年级(20,21,22,23)',
  `status` int NOT NULL DEFAULT '1' COMMENT '用户状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='前端用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_7`
--

LOCK TABLES `users_7` WRITE;
/*!40000 ALTER TABLE `users_7` DISABLE KEYS */;
INSERT INTO `users_7` VALUES (1,'admin7','admin123','管理员(设计)',7,1,23,0),(2,'a','123456','a',7,1,23,1);
/*!40000 ALTER TABLE `users_7` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-26 15:00:02
