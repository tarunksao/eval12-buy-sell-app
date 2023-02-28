require('dotenv').config();
const {connect} = require('mongoose');

const dbConnect = connect(process.env.db_url);

module.exports = {
    dbConnect
};