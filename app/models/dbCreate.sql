

USE ROOMMATES;
mysql -u root < dbCreate.sql

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Users'
-- 
-- ---

DROP TABLE IF EXISTS `Users`;
    
CREATE TABLE `Users` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `firstname` VARCHAR NULL DEFAULT NULL,
  `lastname` VARCHAR NULL DEFAULT NULL,
  `link` VARCHAR NULL DEFAULT NULL,
  `facebookId` INT NULL DEFAULT NULL,
  `birthday` DATE NULL DEFAULT NULL,
  `username` VARCHAR NULL DEFAULT NULL,
  `currentLocationId` TINYINT NULL DEFAULT NULL,
  `hometownId` TINYINT NULL DEFAULT NULL,
  `employerId` TINYINT NULL DEFAULT NULL,
  `workPosId` TINYINT NULL DEFAULT NULL,
  `gender` VARCHAR NULL DEFAULT NULL,
  `interestedIn` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Music'
-- 
-- ---

DROP TABLE IF EXISTS `Music`;
    
CREATE TABLE `Music` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `link` VARCHAR NULL DEFAULT NULL,
  `picture` VARCHAR NULL DEFAULT NULL,
  `facebookId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Movies'
-- 
-- ---

DROP TABLE IF EXISTS `Movies`;
    
CREATE TABLE `Movies` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `link` VARCHAR NULL DEFAULT NULL,
  `picture` VARCHAR NULL DEFAULT NULL,
  `facebookId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'OS'
-- 
-- ---

DROP TABLE IF EXISTS `OS`;
    
CREATE TABLE `OS` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `facebookId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'userMusic'
-- 
-- ---

DROP TABLE IF EXISTS `userMusic`;
    
CREATE TABLE `userMusic` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `musicId` TINYINT NULL DEFAULT NULL,
  `userId` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'userMovies'
-- 
-- ---

DROP TABLE IF EXISTS `userMovies`;
    
CREATE TABLE `userMovies` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `movieId` TINYINT NULL DEFAULT NULL,
  `userId` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'userDevices'
-- 
-- ---

DROP TABLE IF EXISTS `userDevices`;
    
CREATE TABLE `userDevices` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `deviceId` TINYINT NULL DEFAULT NULL,
  `userId` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'location'
-- 
-- ---

DROP TABLE IF EXISTS `location`;
    
CREATE TABLE `location` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `facebookId` INT NULL DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'employer'
-- 
-- ---

DROP TABLE IF EXISTS `employer`;
    
CREATE TABLE `employer` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `facebookId` INT NULL DEFAULT NULL,
  `companyName` INT NULL DEFAULT NULL,
  `locationId` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'position'
-- 
-- ---

DROP TABLE IF EXISTS `position`;
    
CREATE TABLE `position` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `startDate` DATE NULL DEFAULT NULL,
  `endDate` DATE NULL DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `employerId` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'sportsTeams'
-- 
-- ---

DROP TABLE IF EXISTS `sportsTeams`;
    
CREATE TABLE `sportsTeams` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `facebookId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'userTeams'
-- 
-- ---

DROP TABLE IF EXISTS `userTeams`;
    
CREATE TABLE `userTeams` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `sportsTeamId` TINYINT NULL DEFAULT NULL,
  `userId` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'athletes'
-- 
-- ---

DROP TABLE IF EXISTS `athletes`;
    
CREATE TABLE `athletes` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `facebookId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'favAthletes'
-- 
-- ---

DROP TABLE IF EXISTS `favAthletes`;
    
CREATE TABLE `favAthletes` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `athleteId` TINYINT NULL DEFAULT NULL,
  `userId` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'schools'
-- 
-- ---

DROP TABLE IF EXISTS `schools`;
    
CREATE TABLE `schools` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `facebookId` INT NULL DEFAULT NULL,
  `type` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'userEducation'
-- 
-- ---

DROP TABLE IF EXISTS `userEducation`;
    
CREATE TABLE `userEducation` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `schoolId` TINYINT NULL DEFAULT NULL,
  `userId` TINYINT NULL DEFAULT NULL,
  `concentration` VARCHAR NULL DEFAULT NULL,
  `year` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'questions'
-- 
-- ---

DROP TABLE IF EXISTS `questions`;
    
CREATE TABLE `questions` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `question` VARCHAR NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'answers'
-- 
-- ---

DROP TABLE IF EXISTS `answers`;
    
CREATE TABLE `answers` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `answer` VARCHAR NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'userAnswers'
-- 
-- ---

DROP TABLE IF EXISTS `userAnswers`;
    
CREATE TABLE `userAnswers` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `questionId` TINYINT NOT NULL DEFAULT NULL,
  `answerId` TINYINT NOT NULL DEFAULT NULL,
  `userId` TINYINT NOT NULL DEFAULT NULL,
  `importance` INT NULL DEFAULT NULL,
  `roommatePrefAnswerId` TINYINT NOT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'joinQA'
-- 
-- ---

DROP TABLE IF EXISTS `joinQA`;
    
CREATE TABLE `joinQA` (
  `id` TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `questionId` TINYINT NOT NULL DEFAULT NULL,
  `answerid` TINYINT NOT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Users` ADD FOREIGN KEY (currentLocationId) REFERENCES `location` (`id`);
ALTER TABLE `Users` ADD FOREIGN KEY (hometownId) REFERENCES `location` (`id`);
ALTER TABLE `Users` ADD FOREIGN KEY (workPosId) REFERENCES `position` (`id`);
ALTER TABLE `userMusic` ADD FOREIGN KEY (musicId) REFERENCES `Music` (`id`);
ALTER TABLE `userMusic` ADD FOREIGN KEY (userId) REFERENCES `Users` (`id`);
ALTER TABLE `userMovies` ADD FOREIGN KEY (movieId) REFERENCES `Movies` (`id`);
ALTER TABLE `userMovies` ADD FOREIGN KEY (userId) REFERENCES `Users` (`id`);
ALTER TABLE `userDevices` ADD FOREIGN KEY (deviceId) REFERENCES `OS` (`id`);
ALTER TABLE `userDevices` ADD FOREIGN KEY (userId) REFERENCES `Users` (`id`);
ALTER TABLE `employer` ADD FOREIGN KEY (locationId) REFERENCES `location` (`id`);
ALTER TABLE `position` ADD FOREIGN KEY (employerId) REFERENCES `employer` (`id`);
ALTER TABLE `userTeams` ADD FOREIGN KEY (sportsTeamId) REFERENCES `sportsTeams` (`id`);
ALTER TABLE `userTeams` ADD FOREIGN KEY (userId) REFERENCES `Users` (`id`);
ALTER TABLE `favAthletes` ADD FOREIGN KEY (athleteId) REFERENCES `athletes` (`id`);
ALTER TABLE `favAthletes` ADD FOREIGN KEY (userId) REFERENCES `Users` (`id`);
ALTER TABLE `userEducation` ADD FOREIGN KEY (schoolId) REFERENCES `schools` (`id`);
ALTER TABLE `userEducation` ADD FOREIGN KEY (userId) REFERENCES `Users` (`id`);
ALTER TABLE `userAnswers` ADD FOREIGN KEY (questionId) REFERENCES `questions` (`id`);
ALTER TABLE `userAnswers` ADD FOREIGN KEY (answerId) REFERENCES `answers` (`id`);
ALTER TABLE `userAnswers` ADD FOREIGN KEY (userId) REFERENCES `Users` (`id`);
ALTER TABLE `userAnswers` ADD FOREIGN KEY (roommatePrefAnswerId) REFERENCES `answers` (`id`);
ALTER TABLE `joinQA` ADD FOREIGN KEY (questionId) REFERENCES `questions` (`id`);
ALTER TABLE `joinQA` ADD FOREIGN KEY (answerid) REFERENCES `answers` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Music` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Movies` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `OS` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `userMusic` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `userMovies` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `userDevices` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `location` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `employer` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `position` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `sportsTeams` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `userTeams` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `athletes` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `favAthletes` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `schools` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `userEducation` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `questions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `answers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `userAnswers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `joinQA` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Users` (`id`,`name`,`firstname`,`lastname`,`link`,`facebookId`,`birthday`,`username`,`currentLocationId`,`hometownId`,`employerId`,`workPosId`,`gender`,`interestedIn`) VALUES
-- ('','','','','','','','','','','','','','');
-- INSERT INTO `Music` (`id`,`name`,`link`,`picture`,`facebookId`) VALUES
-- ('','','','','');
-- INSERT INTO `Movies` (`id`,`name`,`link`,`picture`,`facebookId`) VALUES
-- ('','','','','');
-- INSERT INTO `OS` (`id`,`name`,`facebookId`) VALUES
-- ('','','');
-- INSERT INTO `userMusic` (`id`,`musicId`,`userId`) VALUES
-- ('','','');
-- INSERT INTO `userMovies` (`id`,`movieId`,`userId`) VALUES
-- ('','','');
-- INSERT INTO `userDevices` (`id`,`deviceId`,`userId`) VALUES
-- ('','','');
-- INSERT INTO `location` (`id`,`facebookId`,`name`) VALUES
-- ('','','');
-- INSERT INTO `employer` (`id`,`facebookId`,`companyName`,`locationId`) VALUES
-- ('','','','');
-- INSERT INTO `position` (`id`,`startDate`,`endDate`,`name`,`employerId`) VALUES
-- ('','','','','');
-- INSERT INTO `sportsTeams` (`id`,`name`,`facebookId`) VALUES
-- ('','','');
-- INSERT INTO `userTeams` (`id`,`sportsTeamId`,`userId`) VALUES
-- ('','','');
-- INSERT INTO `athletes` (`id`,`name`,`facebookId`) VALUES
-- ('','','');
-- INSERT INTO `favAthletes` (`id`,`athleteId`,`userId`) VALUES
-- ('','','');
-- INSERT INTO `schools` (`id`,`name`,`facebookId`,`type`) VALUES
-- ('','','','');
-- INSERT INTO `userEducation` (`id`,`schoolId`,`userId`,`concentration`,`year`) VALUES
-- ('','','','','');
-- INSERT INTO `questions` (`id`,`question`) VALUES
-- ('','');
-- INSERT INTO `answers` (`id`,`answer`) VALUES
-- ('','');
-- INSERT INTO `userAnswers` (`id`,`questionId`,`answerId`,`userId`,`importance`,`roommatePrefAnswerId`) VALUES
-- ('','','','','','');
-- INSERT INTO `joinQA` (`id`,`questionId`,`answerid`) VALUES
-- ('','','');

