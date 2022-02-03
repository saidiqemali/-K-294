CREATE EXTENSION pgcrypto;

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Adminer 4.8.1 PostgreSQL 9.6.2 dump

DROP TABLE IF EXISTS "tasks";
CREATE TABLE "public"."tasks" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "owner" uuid NOT NULL,
    "description" text NOT NULL,
    "created" timestamp DEFAULT now() NOT NULL,
    "updated" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "TaskID" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE INDEX "TaskOwner" ON "public"."tasks" USING btree ("owner");


DELIMITER ;;

CREATE TRIGGER "set_timestamp" BEFORE UPDATE ON "public"."tasks" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();;

DELIMITER ;

DROP TABLE IF EXISTS "users";
CREATE TABLE "public"."users" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "email" character varying(50) NOT NULL,
    "password" character(60) NOT NULL,
    "created" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "users_id" PRIMARY KEY ("id")
) WITH (oids = false);

COMMENT ON COLUMN "public"."users"."password" IS 'Hashed password. I prefer the blowfish algorithm (bf)';

INSERT INTO "users" ("id", "email", "password", "created") VALUES
('d5e30d8f-a59d-45f3-b9ea-01e742163ff5',	'hugo@m295.local.zli.ch',	'$2a$06$Z.x5E4k0wMkKjCnT2xk1O.JXt2J180GJog3tmzqtRrNJN9srNhl4G',	'2021-11-25 07:51:11.048941');

ALTER TABLE ONLY "public"."tasks" ADD CONSTRAINT "tasks_owner_fkey" FOREIGN KEY (owner) REFERENCES users(id) NOT DEFERRABLE;

-- 2022-01-17 15:10:17.842123+00
