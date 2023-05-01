require('dotenv').config();
const {CONNECTION_STRING} = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorize: false
        }
    }
});

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        CREATE TABLE public.Users (
            user_key serial NOT NULL,
            username varchar(255) NOT NULL,
            user_password varchar(255) NOT NULL,
            user_first_name varchar(255) NOT NULL,
            user_last_name varchar(255) NOT NULL,
            user_vehicle varchar(255) NOT NULL,
            user_photo_url varchar,
            CONSTRAINT Users_pk PRIMARY KEY (user_key)
        ) WITH (
          OIDS=FALSE
        );
        
        CREATE TABLE public.favorited_trails (
            favorites_key serial NOT NULL,
            user_key int NOT NULL,
            trail_key int NOT NULL,
            CONSTRAINT favorited_trails_pk PRIMARY KEY (favorites_key)
        ) WITH (
          OIDS=FALSE
        );
        
        CREATE TABLE public.trails (
            trail_key serial NOT NULL,
            trail_name varchar(255) NOT NULL,
            trail_location varchar(255) NOT NULL,
            trail_length int NOT NULL,
            trail_est_time varchar(255) NOT NULL,
            trail_difficulty varchar(255) NOT NULL,
            CONSTRAINT trails_pk PRIMARY KEY (trail_key)
        ) WITH (
          OIDS=FALSE
        );
        
        CREATE TABLE public.completed_trails (
            completed_key serial NOT NULL,
            user_key int NOT NULL,
            trail_key int NOT NULL,
            CONSTRAINT completed_trails_pk PRIMARY KEY (completed_key)
        ) WITH (
          OIDS=FALSE
        );
        
        CREATE TABLE public.public_meets (
            meet_key serial NOT NULL,
            user_key int NOT NULL,
            trail_key int NOT NULL,
            meet_location varchar(255) NOT NULL,
            meet_end_location varchar(255) NOT NULL,
            meet_date DATE NOT NULL,
            meet_time TIME NOT NULL,
            meet_notes varchar(255) NOT NULL,
            CONSTRAINT public_meets_pk PRIMARY KEY (meet_key)
        ) WITH (
          OIDS=FALSE
        );
        
        CREATE TABLE public.favorited_meets (
            favorite_meet_key serial NOT NULL,
            user_key int NOT NULL,
            meet_key int NOT NULL,
            CONSTRAINT favorited_meets_pk PRIMARY KEY (favorite_meet_key)
        ) WITH (
          OIDS=FALSE
        );
        
        CREATE TABLE public.trail_pics (
            picture_key serial NOT NULL,
            trail_key int NOT NULL,
            pic_url varchar NOT NULL,
            CONSTRAINT trail_pics_pk PRIMARY KEY (picture_key)
        ) WITH (
          OIDS=FALSE
        );
        
        ALTER TABLE favorited_trails ADD CONSTRAINT favorited_trails_fk0 FOREIGN KEY (user_key) REFERENCES Users(user_key);
        ALTER TABLE favorited_trails ADD CONSTRAINT favorited_trails_fk1 FOREIGN KEY (trail_key) REFERENCES trails(trail_key);
        
        
        ALTER TABLE completed_trails ADD CONSTRAINT completed_trails_fk0 FOREIGN KEY (user_key) REFERENCES Users(user_key);
        ALTER TABLE completed_trails ADD CONSTRAINT completed_trails_fk1 FOREIGN KEY (trail_key) REFERENCES trails(trail_key);
        
        ALTER TABLE public_meets ADD CONSTRAINT public_meets_fk0 FOREIGN KEY (user_key) REFERENCES Users(user_key);
        ALTER TABLE public_meets ADD CONSTRAINT public_meets_fk1 FOREIGN KEY (trail_key) REFERENCES trails(trail_key);
        
        ALTER TABLE favorited_meets ADD CONSTRAINT favorited_meets_fk0 FOREIGN KEY (user_key) REFERENCES Users(user_key);
        ALTER TABLE favorited_meets ADD CONSTRAINT favorited_meets_fk1 FOREIGN KEY (meet_key) REFERENCES public_meets(meet_key);
        
        ALTER TABLE trail_pics ADD CONSTRAINT trail_pics_fk0 FOREIGN KEY (trail_key) REFERENCES trails(trail_key);
        
        INSERT INTO users (username, user_password, user_first_name, user_last_name, user_vehicle, user_photo_url)
        VALUES ('DamnitDan', '123456dR', 'Daniel', 'Robertson', '2020 Jeep Wrangler', 'https://scontent-den4-1.xx.fbcdn.net/v/t39.30808-6/277774682_10159715010468828_3611850610941157258_n.jpg?stp=c0.17.206.206a_dst-jpg_p206x206&_nc_cat=103&ccb=1-7&_nc_sid=da31f3&_nc_ohc=2kZ_EUwtoiwAX_1xt9s&_nc_ht=scontent-den4-1.xx&oh=00_AfAEAS7INnTA9OUZ429UFLOCHbHEkVatb4xKIa8HcmG54A&oe=644F0C3F' ),
        ('NateDogg', '123456nR', 'Nathan', 'Robertson', '2016 Jeep Wrangler', 'https://scontent-den4-1.xx.fbcdn.net/v/t39.30808-6/312109338_10160052619548828_8300825392932293957_n.jpg?stp=c86.0.206.206a_cp6_dst-jpg_p206x206&_nc_cat=106&ccb=1-7&_nc_sid=da31f3&_nc_ohc=7YCJ9c2JsRAAX_V4B3J&_nc_oc=AQkX4U99Xou2DreorWcSl46wHAB_R9lH-JTuVgoCaeNQT6H7OVuwIZ7bQ_98CZ1JXgY&_nc_ht=scontent-den4-1.xx&oh=00_AfAmHgjAkrMYPPqyeGzFPHSH2vbM07bT8GhGLiv07GULMw&oe=644F66B4' );

        INSERT INTO trails (trail_name, trail_location, trail_length, trail_est_time, trail_difficulty)
        VALUES ('Mesa Arch Trail', 'Canyonlands National Park', 0.7, '17m', 'Easy'),
        ('Aztec Butte Trail', 'Canyonlands National Park', 1.6, '45m', 'Moderate'),
        ('Fins & Things OHV Trail', 'Sand Flats Recreation Area', 9.8, '4h 30m', 'Moderate'),
        ('Toquerville Falls', 'Toquerville, Utah', 11.7, '5h', 'Moderate'),
        ('Gemini Brideges OHV Trail', 'Moab, Utah', 13.2, '6h 30m', 'Moderate'),
        ('Peek-a-Boo Canyon', 'Kanab, Utah', 8.7, '4h 20m', 'Moderate'),
        ('Hells Revenge OHV Trail', 'Sand Flats Recreation Area', 9.0, '5h', 'Hard'),
        ('Chicken Corners OHV Trail', 'Moab, Utah', 41.6, '10h 50m', 'Moderate'),
        ('Moab Rim Trail', 'Grand County Trail System', 7.7, '4h 10m', 'Hard'),
        ('Top of the World Trail', 'Moab, Utah', 18.9, '5h 16m', 'Hard'),
        ('Poison Spider Mesa', 'Poison Spider Mesa', 13.5, '8h 51m', 'Moderate'),
        ('Harrah Pass', 'Moab, Utah', 19.3, '7h 34m', 'Moderate');

        INSERT INTO trail_pics (trail_key, pic_url)
        VALUES (1, 'https://www.alltrails.com/api/alltrails/trails/10032796/profile_photo?show_placeholder=no&show_static_map=yes&size=larger_wide&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i'),
        (1, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTQ2NjgyMDgvMGI3ZjgzZTFhYWViODZkMzNlOGI4NzNlNDIxNWIxNTEuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (1, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTQ2Njg0MjEvMTA0OWQxN2QzODcxOWE4ODQ0MzZjYWE0YmExMjdkYzcuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (2, 'https://www.alltrails.com/api/alltrails/trails/10018277/profile_photo?show_placeholder=no&show_static_map=yes&size=larger_wide&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i'),
        (2, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTQ1MjY4MjIvNjg4Y2FiZjQ1Njk1NGM4YzM4MzQ4NTNlMTIwMjM5MjQuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (2, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTQ1MjY4MjcvZDNkYjM5ZDA1NDhkYzk0MDhiYWIxYzIxNmQ3ZWI3MDAuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (3, 'https://www.alltrails.com/api/alltrails/trails/10033862/profile_photo?show_placeholder=no&show_static_map=yes&size=larger_wide&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i'),
        (3, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTM5MjMyNzEvZGJkY2RjZGEwMGFkMWY3ZDkyZTUzYTNlMzgzMDkxYjYuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (3, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTM5MjMyNzQvODkyZTYwMjg4MDA1NzM2ZmIwZGU3NTU0MTNiOGUzYWIuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (4, 'https://www.alltrails.com/api/alltrails/trails/10318801/profile_photo?show_placeholder=no&show_static_map=yes&size=larger_wide&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i'),
        (4, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTQzODgyNTkvZTk4NjcxOTlhODE0YWQ1YTE3MDY0OWRlOThmYjYyOTUuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (4, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTQzODgyNTIvYTEyNWFjM2FiMWQyZmY0NDgzYmE2M2U4NzVlZjIyMTcuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (5, 'https://www.alltrails.com/api/alltrails/trails/10036951/profile_photo?show_placeholder=no&show_static_map=yes&size=larger_wide&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i'),
        (5, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTQ1MjIyNTgvNzZmYjgzMzA5ZTUxNzA0OTkwMTlkYzJlODFmNjg0N2UuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (5, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTQyMjAxNDAvNDU0NmIxNTFlNWY0ZDY5ZjAwOTdhNDZmZDEwOWExZjkuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (6, 'https://www.alltrails.com/api/alltrails/trails/10244137/profile_photo?show_placeholder=no&show_static_map=yes&size=larger_wide&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i'),
        (6, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTQ0MTk4MDUvOWMyZDM4ZjQ2MTM3ODUyMGNmOWJkMDhlYTMyOGViYzAuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (6, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTQzMjgwNDcvMWNkOGIzYjA3ZGU2NmE1MTJhMDJmNjQ1MWRlZDE4OWMuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (7, 'https://www.alltrails.com/api/alltrails/trails/10042975/profile_photo?show_placeholder=no&show_static_map=yes&size=larger_wide&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i'),
        (7, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTQwOTg3MDIvOTg2ZTJhOTlhNzZhOTY4NDYyMGZiMDFmYjg2NjViNzkuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (7, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTM5MTc4NDUvYjhiNTc1ODM1Y2IxOTE4M2RhMWI0Y2RkZWE3MWI0NTEuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (8, 'https://www.alltrails.com/api/alltrails/trails/10260558/profile_photo?show_placeholder=no&show_static_map=yes&size=larger_wide&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i'),
        (8, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTQ2NjQ4NzYvMmRkNzgyMDk1NzA3ODMyMmE5YTlhNjk1NzQ4MzVkMTIuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (8, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTQ1Nzk2MjEvZjBiMGVkNmMzZGY1YThmNDJkMmNkZGRhNDA2NzYzYzkuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (9, 'https://www.alltrails.com/api/alltrails/trails/10039547/profile_photo?show_placeholder=no&show_static_map=yes&size=larger_wide&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i'),
        (9, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTQ2NTIxODYvZDUyMzgwNGI3NTZjM2E4NTQxNjY1NmNmNTc3ZjBkMzcuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (9, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTQ2NTIxODQvMTkzMzc3MjI5NTNjYjExZDI3NjY5MTNmZDExZTRlNjguanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (10, 'https://www.alltrails.com/api/alltrails/trails/10042979/profile_photo?show_placeholder=no&show_static_map=yes&size=larger_wide&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i'),
        (10, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTM5MDYzNjAvMGExOTYyNjk4NDM1NDI3NTA0NDhmNmY2NzY0ODAzOWEuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (10, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTM5MDYzNjQvOTlhMmRjOTdiZDJlNzUzZDI2MDMxN2YzMzY1MGNlNzMuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (11, 'https://www.alltrails.com/api/alltrails/trails/10034935/profile_photo?show_placeholder=no&show_static_map=yes&size=larger_wide&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i'),
        (11, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTMzOTcyNTUvMWM3OGJkYmIwNDBkOTg2YzkwMWJjODFjNGQ0NGMzNDYuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (11, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTMzOTcyNTQvY2VmNTcxOWNjOWE3NTVhZjZhMGRjMjRhOWRjZGVhMTIuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0='),
        (12, 'https://www.alltrails.com/api/alltrails/trails/10033857/profile_photo?show_placeholder=no&show_static_map=yes&size=larger_wide&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i'),
        (12, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTQzNjkxNzAvYTZhZDg5MDM3NWU3MGUzZmM5NWE5NDI0YTlhODlkNzEuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0'),
        (12, 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTQzNjkxOTkvMGNiNjdlM2Q2ZGM1ZTA1N2UzNjNiYTVhMWNlMWNiNjAuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0');

        
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },


}