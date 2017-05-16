// CREATES EMPTY DB
const pg = require('pg');
const pgp = require('pg-promise')(/*options*/);

const connectionString = 'postgres://coreyshott:gift@localhost:5432/gifting';
const db = pgp(connectionString);

function resetDatabase() {
    pg.connect(connectionString, function (err, client, done) {
        if (err) {
            console.error('no db', err);
            createDatabase();
            done();
        }
        createTables();
    });
}

function createDatabase() {
    console.log('create DB');
    pg.connect(connectionString, function (err, client, done) {
        if (err) console.log(err);
        client.query('CREATE DATABASE gifting', function(err) { // create user's db
            if (err) console.log('err in create: ', err);
            done();
        })
    })
}

function createTables() {
    console.log('create tables');
    db.tx(function () {
        return this.batch([
            this.none('DROP TABLE IF EXISTS items'),
            this.none('DROP TABLE IF EXISTS lists'),
            this.none('DROP TABLE IF EXISTS users'),
            this.none('CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(20) not null, first VARCHAR(20)' +
                ' not null, last VARCHAR(20) not null, password VARCHAR(20) not null)'),
            this.none('CREATE TABLE lists(id SERIAL PRIMARY KEY, name VARCHAR(50) not null, user_id int4 REFERENCES users(id) ON DELETE' +
                ' CASCADE)'),
            this.none('CREATE TABLE items(id SERIAL PRIMARY KEY, description VARCHAR(150) not null, list_id int4 REFERENCES lists(id)' +
                ' ON DELETE CASCADE)'),
        ]);
    })
        .then(function () {
            console.log("success")
            process.exit();
        })
        .catch(function (error) {
            console.log(error); // print error;
            process.exit();
        });
}

resetDatabase();

