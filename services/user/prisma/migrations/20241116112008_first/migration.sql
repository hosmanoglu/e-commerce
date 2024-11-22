-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
INSERT INTO "User" ("id", "email", "password", "admin")
VALUES ('5d85193f-52d7-4ea9-a392-0cadb88fc148', 'asd@gmail.com', '$2b$10$vt7mraaijSowczj5eGK3VOenus98JxGJXjCpRq1WSGu5XfefbH/GO', true);


-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
