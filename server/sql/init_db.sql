-- ktx.admin definition

CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('superadmin','staff') NOT NULL DEFAULT 'staff',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ktx.device definition

CREATE TABLE `device` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` enum('good','broken','deleted') NOT NULL DEFAULT 'good',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ktx.room definition

CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `max_capacity` int NOT NULL,
  `current_capacity` int NOT NULL DEFAULT '0',
  `base_price` decimal(10,2) NOT NULL,
  `images` json DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ktx.room_device definition

CREATE TABLE `room_device` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `condition` enum('good','broken','under_maintenance') NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `roomId` int DEFAULT NULL,
  `deviceId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c9897eaa84104871fc745854662` (`roomId`),
  KEY `FK_4a037be4a52e543ee34d5d1a1d9` (`deviceId`),
  CONSTRAINT `FK_4a037be4a52e543ee34d5d1a1d9` FOREIGN KEY (`deviceId`) REFERENCES `device` (`id`),
  CONSTRAINT `FK_c9897eaa84104871fc745854662` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ktx.`user` definition

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` enum('male','female','other') NOT NULL DEFAULT 'other',
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `student_id` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `status` enum('active','inactive','graduated','deleted') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `roomId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`email`),
  UNIQUE KEY `IDX_726563a72061070f771b221345` (`student_id`),
  KEY `FK_9a5b6e98e76999b2c6778a30eec` (`roomId`),
  CONSTRAINT `FK_9a5b6e98e76999b2c6778a30eec` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ktx.violation definition

CREATE TABLE `violation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('reward','punishment') NOT NULL,
  `description` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d1203c933fe7956ba747055be68` (`userId`),
  CONSTRAINT `FK_d1203c933fe7956ba747055be68` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ktx.contract definition

CREATE TABLE `contract` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `duration` int NOT NULL,
  `status` enum('pending','active','terminated','expired') NOT NULL DEFAULT 'pending',
  `userId` int DEFAULT NULL,
  `roomId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a837a077c734b8f4106c6923685` (`userId`),
  KEY `FK_cf9839a50efcca56cff91d68852` (`roomId`),
  CONSTRAINT `FK_a837a077c734b8f4106c6923685` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_cf9839a50efcca56cff91d68852` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ktx.maintenance_request definition

CREATE TABLE `maintenance_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `status` enum('pending','in_progress','completed') NOT NULL DEFAULT 'pending',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `roomDeviceId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_18cd13848218c9c00c62275ad64` (`roomDeviceId`),
  KEY `FK_ac15cc339b79b320d5e0934537c` (`userId`),
  CONSTRAINT `FK_18cd13848218c9c00c62275ad64` FOREIGN KEY (`roomDeviceId`) REFERENCES `room_device` (`id`),
  CONSTRAINT `FK_ac15cc339b79b320d5e0934537c` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ktx.notification definition

CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('all','personal') NOT NULL DEFAULT 'all',
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `senderId` int DEFAULT NULL,
  `receiverId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c0af34102c13c654955a0c5078b` (`senderId`),
  KEY `FK_758d70a0e61243171e785989070` (`receiverId`),
  CONSTRAINT `FK_758d70a0e61243171e785989070` FOREIGN KEY (`receiverId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_c0af34102c13c654955a0c5078b` FOREIGN KEY (`senderId`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ktx.payment definition

CREATE TABLE `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rent_amount` decimal(10,2) NOT NULL,
  `utility_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total_amount` decimal(10,2) NOT NULL,
  `payment_method` enum('VNPay','cash','bank_transfer') DEFAULT NULL,
  `status` enum('pending','completed','failed') NOT NULL DEFAULT 'pending',
  `payment_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `month` int NOT NULL,
  `year` int NOT NULL,
  `is_settled` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int DEFAULT NULL,
  `roomId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b046318e0b341a7f72110b75857` (`userId`),
  KEY `FK_34c072080d292b721c8e64af98f` (`roomId`),
  CONSTRAINT `FK_34c072080d292b721c8e64af98f` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`),
  CONSTRAINT `FK_b046318e0b341a7f72110b75857` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ktx.request definition

CREATE TABLE `request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` enum('repair','complaint','suggestion','leave_dorm','guest_visit') NOT NULL,
  `description` text NOT NULL,
  `status` enum('pending','in_progress','resolved','approved','rejected') NOT NULL DEFAULT 'pending',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_38554ade327a061ba620eee948b` (`userId`),
  CONSTRAINT `FK_38554ade327a061ba620eee948b` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;