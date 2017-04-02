// CREATES EMPTY DB
const pgp = require('pg-promise')(/*options*/);
const db = pgp('postgres://coreyshott:gift@localhost:5432/gifting');


db.tx(function () {
    return this.batch([
        this.none('CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(20) not null, first VARCHAR(20) not null, last VARCHAR(20) not null, password VARCHAR(20) not null)'),
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
