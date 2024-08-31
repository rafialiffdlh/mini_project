USE minprodb;
CREATE TABLE `events` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` text NOT NULL,
  `category_id` int NOT NULL,
  `duration` int NOT NULL,
  `event_date` date NOT NULL,
  `image_src` varchar(255),
  `description` text
);

CREATE TABLE `category` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20)
);

CREATE TABLE `venues` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` text NOT NULL,
  `address` text NOT NULL,
  `location_id` int NOT NULL,
  `lat` varchar(50),
  `lon` varchar(50)
);

CREATE TABLE `location` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `fullName` varchar(50)
);

CREATE TABLE `event_venue` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `venue_id` int NOT NULL
);

CREATE TABLE `ticket_type` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `maxNumber` int NOT NULL,
  `rest` int,
  `name` varchar(50)
);

CREATE TABLE `tickets` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `detail_id` int NOT NULL,
  `seat_number` text NOT NULL,
  `price` numeric(10,2) NOT NULL,
  `purchased_at` timestamp,
  `paidTicket` bool,
  `type_id` int NOT NULL
);

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) UNIQUE NOT NULL,
  `phone_number` varchar(20) UNIQUE NOT NULL,
  `registeredAt` timestamp DEFAULT (now())
);

CREATE TABLE `user_role` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role` ENUM ('organizer', 'user')
);

CREATE TABLE `purchases` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `ticket_id` int NOT NULL,
  `purchase_date` timestamp DEFAULT (now())
);

ALTER TABLE `events` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

ALTER TABLE `venues` ADD FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);

ALTER TABLE `event_venue` ADD FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

ALTER TABLE `event_venue` ADD FOREIGN KEY (`venue_id`) REFERENCES `venues` (`id`);

ALTER TABLE `tickets` ADD FOREIGN KEY (`detail_id`) REFERENCES `event_venue` (`id`);

ALTER TABLE `tickets` ADD FOREIGN KEY (`typpurchases_ibfk_1purchases_ibfk_2e_id`) REFERENCES `ticket_type` (`id`);

ALTER TABLE `user_role` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `purchases` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `purchases` ADD FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`);
