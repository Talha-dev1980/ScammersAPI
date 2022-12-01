const db = require('../models')

const addUser = async (req, res) => {
    const queryResult = await db.sequelize.query("INSERT INTO `scammersdata`.`user` ( `name`, `email`, `accountId`,`numbr`) " +
        "VALUES ('" + req.body.name + "','" + req.body.email + "','" + req.body.accountId + "',,'" + req.body.number + "')");

    let response = {
        error: false,
        insertedId: queryResult[0],
        result: queryResult[1]
    }
    res.status(200).json(response)
    console.log(response)
}

const getUsers = async (req, res) => {
    listUser = await db.sequelize.query('SELECT * FROM `scammersdata`.`user`'), {
        raw: true,
    };

    let response = null;
    if (listUser != null) {
        response = {
            error: false,
            list: listUser[0],
        }
    } else {
        response = {
            error: true,
            message: "no data to show"
        }
    }
    res.status(200).json(response)
    console.log(response)
}

const getUserById = async (req, res) => {

    let id = req.params.id
    listUsers = await db.sequelize.query('SELECT * FROM `scammersdata`.`user` where `user`.`id`=' + id), {
        raw: true,
    };

    let response = null;
    if (listUsers != null) {
        response = {
            error: false,
            list: listUsers[0],
        }
    } else {
        response = {
            error: true,
            message: "no data to show"
        }
    }
    res.status(200).json(response)
    console.log(response)
}

const getUserByNumber = async (req, res) => {

    let numbr = req.params.numbr
    listUsers = await db.sequelize.query('SELECT * FROM `scammersdata`.`user` where `user`.`numbr`=' + numbr), {
        raw: true,
    };

    let response = null;
    if (listUsers != null) {
        response = {
            error: false,
            list: listUsers[0],
        }
    } else {
        response = {
            error: true,
            message: "no data to show"
        }
    }
    res.status(200).json(response)
    console.log(response)
}
const getScammersReported = async (req, res) => {

    let id = req.params.id
    listScammers = await db.sequelize.query("SELECT * FROM `scammersdata`.`scammerview` where `scammerview`.`reportedBy` LIKE '%" + id + "%'"), {
        raw: true,
    };


    let response = null;
    if (listScammers != null) {
        response = {
            error: false,
            list: listScammers[0],
        }
    } else {
        response = {
            error: true,
            message: "no data to show"
        }
    }
    res.status(200).json(response)
    console.log(response)
}
const getPaginated = async (req, res) => {
    const result = await db.sequelize.query('SELECT COUNT(*) FROM `scammersdata`.`user`');
    const total = result[0][0]['COUNT(*)']
    const limit = req.query.limit
    console.log('limit is ' + limit)
    console.log('total is ' + total)
    const lastPage = Math.ceil(total / limit)
    console.log('lastpage is ' + lastPage)
    const page = req.query.page
    let listOrderRows = null

    if (page <= lastPage && page > 0) {
        listOrderRows = await db.sequelize.query('SELECT * FROM `scammersdata`.`user` ORDER BY `id` LIMIT ' + limit + ' OFFSET ' + ((page - 1) * limit), {
            raw: true,
        });
    }
    let response = null;
    if (listOrderRows != null) {
        response = {
            error: false,
            list: listOrderRows[0],
            page: req.query.page,
            totalRecords: total,
            lastPage: lastPage
        }
    } else {

        response = {
            error: false,
            message: "No Data for this page"
        }
    } res.status(200).json(response)
}



const deleteUser = async (req, res) => {
    let id = req.params.id
    listHadiths = await db.sequelize.query('DELETE FROM `scammersdata`.`user` WHERE `scammer`.`id`' + id), {
        raw: true,
    };

    let response = {
        error: false,
        list: listHadiths,
    }
    res.status(200).json(response)
    console.log(response)
}
module.exports = {
    addUser,
    getUsers,
    getUserById,
    getUserByNumber,
    getPaginated,
    getScammersReported,
    deleteUser
}