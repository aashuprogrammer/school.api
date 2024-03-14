DROP TABLE "admission";--> statement-breakpoint
DROP TABLE "students";--> statement-breakpoint
ALTER TABLE "employees" ALTER COLUMN "id" SET DATA TYPE bigserial;--> statement-breakpoint
ALTER TABLE "employees" ALTER COLUMN "created_at" SET DATA TYPE timestamp (0) with time zone;--> statement-breakpoint
ALTER TABLE "employees" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "forgot_token_created_at" timestamp (0) with time zone;--> statement-breakpoint
ALTER TABLE "employees" DROP COLUMN IF EXISTS "token_created_at";--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_email_unique" UNIQUE("email");