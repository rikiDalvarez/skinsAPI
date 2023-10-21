CREATE DATABASE IF NOT EXISTS store;

USE store;

DROP TABLE IF EXISTS skins;

CREATE TABLE skins (
		id 	 		 	 INT UNSIGNED NOT NULL AUTO_INCREMENT,
		name 		 	 VARCHAR(255) NOT NULL,
		price 		 INT NOT NULL,
		type  		 VARCHAR(255) NOT NULL,
		color			 VARCHAR(255) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		quantity 	 INT NOT NULL,
		PRIMARY KEY (id)
);

CREATE TABLE users (
		id 	 			 INT UNSIGNED NOT NULL AUTO_INCREMENT,
		email 		 VARCHAR(255) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY (id)
);

CREATE TABLE user_skins (
		id 	 			 INT UNSIGNED NOT NULL AUTO_INCREMENT,
		user_id 	 INT UNSIGNED NOT NULL,
		skin_id 	 INT UNSIGNED NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY (id),
		FOREIGN KEY (user_id) REFERENCES users(id),
		FOREIGN KEY (skin_id) REFERENCES skins(id)
);