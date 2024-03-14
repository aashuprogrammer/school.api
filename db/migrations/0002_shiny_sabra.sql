CREATE TABLE IF NOT EXISTS "admission" (
	"id" serial NOT NULL,
	"students" bigserial NOT NULL,
	"name" text NOT NULL,
	"class" text NOT NULL,
	"created_at" timestamp DEFAULT 'now()'
);
--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'students'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "students" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "created_at" timestamp DEFAULT 'now()';--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "role" text NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "profile_photo" text;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "forgot_token" text;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "token_created_at" timestamp;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "created_at" timestamp DEFAULT 'now()';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "students" ADD CONSTRAINT "students_id_employees_id_fk" FOREIGN KEY ("id") REFERENCES "employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "employees" DROP COLUMN IF EXISTS "forgetPassword";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN IF EXISTS "dob";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admission" ADD CONSTRAINT "admission_id_admission_id_fk" FOREIGN KEY ("id") REFERENCES "admission"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
