
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
CREATE TABLE "public" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"access_level" varchar(10) NOT NULL
);
CREATE TABLE "ingredients_instock" (
	"id" serial NOT NULL,
	"ingredient" varchar(100) NOT NULL,
	"quantity" int NOT NULL,
	"unit" varchar(15) NOT NULL,
	"location" varchar(255) NOT NULL,
	"user_id" int NOT NULL
);
CREATE TABLE "weekly_plan" (
	"id" serial NOT NULL,
	"spoon_id" int NOT NULL,
	"dow" varchar(50) NOT NULL,
	"week_number" int NOT NULL,
	"user_id" int NOT NULL
);
CREATE TABLE "recipes" (
	"id" serial NOT NULL,
	"spoon_id" int NOT NULL,
	"recipe_name" varchar(255) NOT NULL,
	"recipe_image" varchar(500) NOT NULL,
	"likes" int NOT NULL,
	"favorited" BOOLEAN NOT NULL DEFAULT 'false',
	"user_id" int NOT NULL
);
CREATE TABLE "recipe_used_ingredients" (
	"id" int NOT NULL,
	"spoon_id" int NOT NULL,
	"ingredient" varchar(100) NOT NULL,
	"quantity" float4 NOT NULL,
	"unit" varchar(15) NOT NULL,
	"user_id" int NOT NULL
);
CREATE TABLE "recipe_missed_ingredients" (
	"id" serial NOT NULL,
	"spoon_id" serial NOT NULL,
	"ingredient" varchar(100) NOT NULL,
	"quantity" float4 NOT NULL,
	"unit" varchar(255) NOT NULL,
	"user_id" int NOT NULL
);










