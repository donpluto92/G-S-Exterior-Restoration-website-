CREATE TABLE `estimator_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`propertyAddress` text NOT NULL,
	`serviceType` varchar(100) NOT NULL,
	`estimatedSquareFeet` int,
	`estimatedPrice` int,
	`photoUrls` text,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `estimator_submissions_id` PRIMARY KEY(`id`)
);
