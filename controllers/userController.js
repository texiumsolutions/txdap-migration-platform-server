var User = require('../models/User');



const upload = async (req, res) => {
    try {
        res.send({ status: 200, success: true, msg: 'Running' });
    }
    catch (error) {
        res.send({ status: 400, success: false, msg: error.message });
    }
}

module.exports = {
    upload
}