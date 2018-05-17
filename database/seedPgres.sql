CREATE DATABASE apateez IF NOT EXISTS;

\connect apateez;

CREATE TABLE gallery IF NOT EXISTS (
    "place_id" int,
    "name" text,
    "photos" text[],
    PRIMARY KEY ("place_id")
);

-- \copy gallery ("place_id", "name", "photos") FROM '/Users/Pooja_Kodavanti/Desktop/HR-SDC/gallery/database/allData.csv' DELIMITER ',' CSV HEADER;
\copy gallery ("place_id", "name", "photos") FROM './allData.csv' DELIMITER ',' CSV HEADER;