CREATE DATABASE apatight IF NOT EXISTS;

\connect apatight;

DROP TABLE IF EXISTS gallery;

CREATE TABLE gallery (
    "place_id" int,
    "name" text,
    "photos" text[],
    PRIMARY KEY ("place_id")
);

-- \copy gallery ("place_id", "name", "photos") FROM '/Users/Pooja_Kodavanti/Desktop/HR-SDC/gallery/database/allData.csv' DELIMITER ',' CSV HEADER;
\copy gallery ("place_id", "name", "photos") FROM './allData.csv' DELIMITER ',' CSV HEADER;