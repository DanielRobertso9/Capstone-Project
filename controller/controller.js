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

let userKey = [0]

module.exports = {
    key: (req, res) => { 
        let uKey = userKey
        res.status(200).send(uKey);
        },
    updateKey: (req, res) => {
        userKey.splice(0, 1, req.body.key)
        console.log(userKey)
        res.sendStatus(200)
    },
    getTrails: (req, res) => {
        sequelize.query(`SELECT * FROM trails;`)
        .then((dbResult) => {
            res.status(200).send(dbResult[0]);
        })
        .catch((err) => console.log(err));
    },
    getPictures: (req, res) => {
        sequelize.query(`SELECT * FROM trail_pics;`)
        .then((dbResult) => {
            res.status(200).send(dbResult[0]);
        })
        .catch((err) => console.log(err));
    },
    login: (req, res) => {
        sequelize.query(`SELECT * FROM users;`)
        .then((dbResult) =>{
                res.status(200).send(dbResult[0])
            })
        .catch((err) => console.log(err));
    },
    getMeets: (req, res) => {
        sequelize.query(`SELECT * FROM public_meets
        JOIN trails ON public_meets.trail_key = trails.trail_key
        ORDER BY CONCAT(meet_date, ' ', meet_time) ASC;`)
        .then((dbResult) =>{
                res.status(200).send(dbResult[0])
            })
        .catch((err) => console.log(err));
    },
    getFavoritedMeets: (req, res) => {
        sequelize.query(`SELECT * FROM favorited_meets 
        JOIN public_meets ON favorited_meets.meet_key = public_meets.meet_key
        JOIN trails ON public_meets.trail_key = trails.trail_key
        WHERE favorited_meets.user_key = ${userKey}
        ORDER BY CONCAT(meet_date, ' ', meet_time) ASC;`)
        .then((dbResult) =>{
                res.status(200).send(dbResult[0])
            })
        .catch((err) => console.log(err));
    },
    getFavorites: (req, res) => {
        sequelize.query(`SELECT * FROM favorited_trails  
        JOIN trails ON favorited_trails.trail_key = trails.trail_key
        WHERE user_key = ${userKey};`)
        .then((dbResult) =>{
                res.status(200).send(dbResult[0])
            })
        .catch((err) => console.log(err));
    },
    getCompleted: (req, res) => {
        sequelize.query(`SELECT * FROM completed_trails  
        JOIN trails ON completed_trails.trail_key = trails.trail_key
        WHERE user_key = ${userKey};`)
        .then((dbResult) =>{
                res.status(200).send(dbResult[0])
            })
        .catch((err) => console.log(err));
    },
    getUserInfo: (req, res) => {
        sequelize.query(`SELECT * FROM users
        WHERE user_key = ${userKey};`)
        .then((dbResult) =>{
            res.status(200).send(dbResult[0])
        })
        .catch((err) => console.log(err));
    },
    createMeet: (req, res) => {
        let {
            name,
            start,
            end,
            date,
            time,
            notes,
        } = req.body
        sequelize.query(`INSERT INTO public_meets (user_key, trail_key, meet_location, meet_end_location, meet_date, meet_time, meet_notes)
        VALUES (${userKey}, ${name}, '${start}', '${end}', '${date}', '${time}', '${notes}')
        RETURNING *`)

        .then((dbResult) => {
            res.status(200).send(dbResult[0]);
        })
        .catch((err) => console.log(err));
    },
    favoriteMeet: (req, res) => {
        const {id} = req.params

        sequelize.query(`INSERT INTO favorited_meets (user_key, meet_key)
        VALUES (${userKey}, ${id})`)
        .then(() => {
            res.status(200)
        })
        .catch((err) => console.log(err));
    },
    completeTrail: (req, res) => {
        const {id} = req.params

        sequelize.query(`INSERT INTO completed_trails (user_key, trail_key)
        VALUES (${userKey}, ${id})`)
        .then(() => {
            res.status(200)
        })
        .catch((err) => console.log(err));
    },
    deleteFavorite: (req, res) => {
        const {id} = req.params

        sequelize.query(`DELETE FROM favorited_trails
        WHERE favorites_key = ${id}`)
        .then(() => {
            res.status(200)
        })
        .catch((err) => console.log(err));
    }, 
    deleteCompleted: (req, res) => {
        const {id} = req.params

        sequelize.query(`DELETE FROM completed_trails
        WHERE completed_key = ${id}`)
        .then(() => {
            res.status(200)
        })
        .catch((err) => console.log(err));
    },
    favoriteTrail: (req, res) => {
        const {id} = req.params

        sequelize.query(`INSERT INTO favorited_trails (user_key, trail_key)
        VALUES (${userKey}, ${id})`)
        .then(() => {
            res.status(200)
        })
        .catch((err) => console.log(err));
    },
    createUser: (req, res) => {
        let {
            user,
            password,
            first,
            last,
            vehicle,
            photo,
        } = req.body
        sequelize.query(`INSERT INTO users (username, user_password, user_first_name, user_last_name, user_vehicle, user_photo_url)
        VALUES ('${user}', '${password}', '${first}', '${last}', '${vehicle}', '${photo}')
        RETURNING user_key;`)
        .then((dbResult) => {
            res.status(200).send(dbResult[0]);
        })
        .catch((err) => console.log(err));
    },
}