CREATE DATABASE shakhruz;

\c shakhruz;

CREATE TABLE categoriy (
    id VARCHAR UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    title VARCHAR NOT NULL,
    img_url VARCHAR NOT NULL,
);

CREATE TABLE users (
    id VARCHAR UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    title VARCHAR NOT NULL,
    img_url VARCHAR NOT NULL,
);