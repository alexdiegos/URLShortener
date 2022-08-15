CREATE DATABASE `urlshortenerdb`;

USE urlshortenerdb;

CREATE TABLE `urlshortenerdb`.`urlshortener` (
    `id` int NOT NULL AUTO_INCREMENT,
    `url` text NOT NULL,
    `shortUrl` text NOT NULL,
    `createDate` datetime NOT NULL DEFAULT NOW(), 
    PRIMARY KEY (id)
);

CREATE USER 'urlshortenerUsr'@'localhost' IDENTIFIED WITH mysql_native_password BY '358nCQ5ltZb0%ABwuI2o';
GRANT ALL PRIVILEGES ON *.* TO 'urlshortenerUsr'@'localhost';
FLUSH PRIVILEGES;