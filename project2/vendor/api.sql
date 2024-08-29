-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS messages_id_seq;

-- Table Definition
CREATE TABLE "public"."messages" (
    "id" int4 NOT NULL DEFAULT nextval('messages_id_seq'::regclass),
    "sender_id" int4 NOT NULL,
    "recipient_id" int4 NOT NULL,
    "message" text NOT NULL,
    "sent_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "name" varchar(30) NOT NULL,
    "email" varchar(30),
    "password" varchar(15) NOT NULL,
    "username" varchar(20) NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX unique_username_password ON public.users USING btree (username, password);

INSERT INTO "public"."messages" ("id", "sender_id", "recipient_id", "message", "sent_at") VALUES
(6, 1, 32, 'sda', '2024-06-10 11:01:41.918013');
INSERT INTO "public"."messages" ("id", "sender_id", "recipient_id", "message", "sent_at") VALUES
(7, 31, 32, 'hi', '2024-06-10 16:38:28.253234');
INSERT INTO "public"."messages" ("id", "sender_id", "recipient_id", "message", "sent_at") VALUES
(8, 31, 32, 'hi', '2024-06-10 16:38:56.495786');
INSERT INTO "public"."messages" ("id", "sender_id", "recipient_id", "message", "sent_at") VALUES
(9, 31, 32, 'hi', '2024-06-10 16:39:37.813823'),
(10, 31, 32, 'hi', '2024-06-10 16:43:27.467309'),
(11, 31, 32, 'hi', '2024-06-10 16:44:53.340663'),
(12, 31, 32, 'hi', '2024-06-10 17:45:46.099498'),
(13, 31, 32, 'hloo', '2024-06-10 17:49:10.838114'),
(14, 31, 32, 'hlo', '2024-06-10 18:09:54.561222'),
(15, 31, 32, 'hola', '2024-06-10 18:09:58.732671'),
(16, 31, 32, 'how are you', '2024-06-10 18:22:05.637549'),
(17, 31, 32, 'hola', '2024-06-10 19:00:50.690837');

INSERT INTO "public"."users" ("id", "name", "email", "password", "username") VALUES
(31, 'rimmon', 'flavinsesu@gmail.com', 'password', 'cr7');
INSERT INTO "public"."users" ("id", "name", "email", "password", "username") VALUES
(32, 'sherin', 'sadasdasdasd@gm.com', 'password', 'cherry');

