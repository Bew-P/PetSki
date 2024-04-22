DROP DATABASE IF EXISTS petski;

CREATE DATABASE IF NOT EXISTS petski;

USE petski;

CREATE TABLE Admininfo (
	id				CHAR(7) NOT NULL,
	fname 			VARCHAR(50)	NOT NULL,
    lname			VARCHAR(50)	NOT NULL,
    address 		VARCHAR(100)	NOT NULL,
    age 			INT,
    Admin_email 	VARCHAR(30)	NOT NULL,
    Admin_pw		VARCHAR(12) NOT NULL,
	CONSTRAINT PK_Admin_email PRIMARY KEY (Admin_email)
);

INSERT INTO Admininfo
VALUES ('6588022','Sakhunich','Iamcharas','Nakhon Pathom,Thailand','20','Sakhunich.iam@gmail.com','bam0229457'),
('6588168','Vichaya','Chongthanapipat','Bangkok,Thailand','19','Vichaya.cho@gmail.com','ungink1687'),
('6588169','Chananphimon','Chunchaowarit','Nakhon Pathom,Thailand','20','Chananphimon.chu@gmail.com','pin1698430'),
('6588175','Pakjira','Kharphodee','Nonthaburi,Thailand','20','Pakjira.Kha@gmail.com','bew1756217'),
('6313576','Taylor','Swift','Bangkok,Thailand','34','Taylor.swi@gmail.com','taylor1369'),
('4957534','Christian','Harper','Manhattan, New York, United States','32','Christian.har@gmail.com','Chris90572'),
('0135734','Alex','Volkov','Washington, D.C., United States','34','Alex.vol@gmail.com','Alex894618'),
('7323515','Isabella','Young','New York City, New York, United States','27','Isabella@gmail.com','Isabe926310'),
('0552413','Ava','Chen','Bangkok,Thailand','26','Ava.chen@gmail.com','Ava8961525'),
('7452373','Lucy','Foster','Bangkok,Thailand','30','Lucy.fos@gmail.com','Lucy936293');


CREATE TABLE Adminlogin (
	Admin_email		VARCHAR(30) NOT NULL,
    Admin_pw		VARCHAR(12) NOT NULL,

    CONSTRAINT FK_Admin_email FOREIGN KEY(Admin_email) REFERENCES Admininfo(Admin_email)
);

INSERT INTO Adminlogin
VALUES ("Sakhunich.iam@gmail.com","bam0229457"),
('Vichaya.cho@gmail.com','ungink1687'),
('Chananphimon.chu@gmail.com','pin1698430'),
('Pakjira.Kha@gmail.com','bew1756217'),
('Taylor.swi@gmail.com','taylor1369'),
('Christian.har@gmail.com','Chris90572'),
('Alex.vol@gmail.com','Alex894618'),
('Isabella@gmail.com','Isabe926310'),
('Ava.chen@gmail.com','Ava8961525'),
('Lucy.fos@gmail.com','Lucy936293');

CREATE TABLE Petdata (
	Product_id		VARCHAR(6) NOT NULL,
    Pname			VARCHAR(50)	NOT NULL,
    Pet_Category	VARCHAR(10)	NOT NULL,
    Brand			VARCHAR(20)	NOT NULL,
    Flavor			VARCHAR(10)	NOT NULL,
    FoodType		VARCHAR(20)	NOT NULL,
    price			INT,
    quantity		INT,
    image			VARCHAR(255),
    CONSTRAINT PK_Product_id PRIMARY KEY(Product_id)

);

ALTER TABLE Petdata
ADD CONSTRAINT Pet_Category CHECK
(Pet_Category in ('Dog','Cat','Other'));

ALTER TABLE Petdata
ADD CONSTRAINT Pet_FoodType CHECK
(FoodType in ('Dry','Wet','Veterinarydiet'));

ALTER TABLE Petdata
ADD CONSTRAINT Pet_Flavor CHECK
(Flavor in ('Beef','Chicken','Pork','Fish','Other'));

ALTER TABLE Petdata
ADD CONSTRAINT Pet_Brand CHECK
(Brand in ('Royal Canin','Pedigree','Whiskas','Smartheart','Sakura','Optimum','Hills'));

INSERT INTO Petdata 
VALUES ('784534','Royal Canin Mini 2-10 months','Dog','Royal Canin','Chicken','Dry','550','15','https://github.com/Bew-P/PetSki/blob/main/Productimg/Royal_Canin_dog1.jpeg?raw=true'),
('241535','Pedigree Adult','Dog','Pedigree','Chicken','Veterinarydiet','649','24','https://github.com/Bew-P/PetSki/blob/main/Productimg/Pedigree_Adult_1.jpg?raw=true'),
('135569','Smartheart Adult Roast Beef flavor','Dog','Smartheart','Beef','Wet','1190','13','https://github.com/Bew-P/PetSki/blob/main/Productimg/Smartheart_Adult_Roast_Beef1.jpeg?raw=true'),
('088567','Royal Canin Adult Mini Sterlised','Dog','Royal Canin','Pork','Veterinarydiet','1150','6','https://github.com/Bew-P/PetSki/blob/main/Productimg/Royal_Canin_Adult_Mini_Sterlised1.jpeg?raw=true'),
('063745','Whiskas Dry Cat Food High Protein 1.2 g','Cat','Whiskas','Fish','Dry','759','12','https://github.com/Bew-P/PetSki/blob/main/Productimg/Whiskas_Dry_Cat_High_Protein%20_1.jpeg?raw=true'),
('763695','Royal Canin Regular Fit Adult Cat','Cat','Royal Canin','Chicken','Veterinarydiet','890','21','https://github.com/Bew-P/PetSki/blob/main/Productimg/Royal_Canin_Regular_Fit_Adult_Cat1.png?raw=trueg'),
('546734','Smartheart Gold Adult Dry Cat 1.1 Kg','Cat','Smartheart','Other','Dry','1220','4','https://github.com/Bew-P/PetSki/blob/main/Productimg/Smartheart_Gold_Adult_Cat1.png?raw=true'),
('137354','Optimum Turtle food 40Kg','Other','Optimum','Other','Dry','350','17','https://github.com/Bew-P/PetSki/blob/main/Productimg/Optimum_Turtle_food_40Kg_1.jpeg?raw=true'),
('496954','Sakura Gold Fish 250g','Other','Sakura','Other','Dry','150','31','https://github.com/Bew-P/PetSki/blob/main/Productimg/Sakura_Gold_Fish_250g_1.jpeg?raw=true'),
('719047','Hills Science Diet Dry Adult Cat Food','Cat','Hills','Chicken','Dry','590','25','https://github.com/Bew-P/PetSki/blob/main/Productimg/Hills_Diet_Dry_Cat_Food2.jpeg?raw=true'),
('290145','Optimum Hi Pro 1.5 kg','Other','Optimum','Other','Dry','239','19','https://github.com/Bew-P/PetSki/raw/main/Productimg/Optimum_Hi_pro.webp'),
('123484','Hills science diet wet cat food','Cat','Hills','Chicken','Wet','489','29','https://github.com/Bew-P/PetSki/blob/main/Productimg/Hills_diet_cat_food1.jpeg?raw=true');

