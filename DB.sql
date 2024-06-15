CREATE DATABASE EDUSIGN;
USE EDUSIGN;

CREATE TABLE USERS (
    Id int NOT NULL AUTO_INCREMENT,
    Email varchar(255) NOT NULL,
    Username varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Id)
);

CREATE TABLE TRANSLATION_HISTORIES (
    Id int NOT NULL AUTO_INCREMENT,
    UserId int NOT NULL,
    FileLink varchar(255) NOT NULL,
    Result text NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Id),
    FOREIGN KEY (UserId) REFERENCES USERS(Id) ON DELETE CASCADE
);

CREATE TABLE COURSES (
    Id int NOT NULL AUTO_INCREMENT,
    CourseName varchar(255) NOT NULL,
    FileLink varchar(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Id)
);

CREATE TABLE LETTER_DICTIONARY (
    Id int NOT NULL AUTO_INCREMENT,
    Letter varchar(255) NOT NULL,
    FileLink varchar(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Id)
);