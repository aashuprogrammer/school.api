CREATE TABLE IF NOT EXISTS "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"fatherName" text NOT NULL,
	"motherName" text NOT NULL,
	"phoneNumber" text NOT NULL,
	"dob" text NOT NULL
);
