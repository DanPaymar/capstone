'use strict';

require('dotenv').config()
const bcrypt = require('bcryptjs');
const { response } = require('express');
const { CONNECTION_STRING } = process.env
const Sequelize = require('sequelize');
const sequelize = new Sequelize(CONNECTION_STRING)

module.exports = {
    signUp: (req, res) => {
        const { name, email, password } = req.body
        console.log('check if email was entered')

        if (!email) {
            console.log('You did not enter a valid email')
            return res.status(400).send('You must enter an email')
        }

        if (!password || password.length < 6) {
            console.log('you must enter a password with more than 6 characters')
            return res.status(400).send('Password must be 6 or more characters')
        }

        const salt = bcrypt.genSaltSync(10)
        const passHash = bcrypt.hashSync(password, salt)

        // Insert the new user to database with sequelize
        sequelize.query(`
            INSERT INTO account (name, email, password)
            VALUES ('${name}', '${email}', '${passHash}') RETURNING *;
        `)
            .then((dbRes) => {
                req.session.user = dbRes[0][0]
                console.log(dbRes[0])
                res.status(200).send(dbRes[0])
            })
            .catch(err => console.log(err))
    },
    editProfile: (req, res) => {
        const { name, city } = req.body
        const { id } = req.session.user
        sequelize.query(`
            UPDATE account
            set name = '${name}', city = '${city}'
            where id = ${id} RETURNING *;
        `)
            .then((dbRes) => {
                // add security by returning just the city and the name
                console.log(dbRes[0])
                res.status(200).send(dbRes[0])
            })
            .catch(err => console.log(err))
    },
    logIn: (req, res) => {
        const { email, password } = req.body
        // sequelize query to find user
        sequelize.query(`
                SELECT * FROM account
                WHERE email = '${email}';
            `)
            .then(dbRes => {
                let user = dbRes[0][0]
                console.log(user)
                let passCheck = bcrypt.compareSync(password, user.password)
                // validate users email and password is entered correct
                if (user.email === email && passCheck) {
                    req.session.user = user
                    return res.status(200).send({ message: 'user logged in' })
                } else {
                    return 'Wrong email or password'
                }
            })
    },
    sessionCheck: (req, res) => {
        if (req.session.user) {
            res.status(200).send({ signedIn: true })
        } else {
            res.status(400).send({ signedIn: false })
        }
    },
    logOut: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/');
        });
    },
    getProfile: (req, res) => {
        if (req.session.user) {
            sequelize.query(`
            SELECT name, city, email FROM account
            where id = ${req.session.user.id} 
            `)
                .then((dbRes) => {
                    res.status(200).send(dbRes[0][0])
                })
                .catch(err => console.log(err));

        } else {
            res.status(400).send({ message: 'nothing happened' })
        }
    }


}

