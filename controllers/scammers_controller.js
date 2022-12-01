const db = require('../models')
const shipping_dock = db.shipping_dock

const addScammer = async (req, res) => {
    const queryResult = await db.sequelize.query("INSERT INTO `scammersdata`.`scammer`( `name`, `title`, `description`, `numbr`, `images`, `reportedBy`)" +
        "VALUES ('" + req.body.name + "','" + req.body.title + "','" + req.body.description + "','" + req.body.number
        + "','" + req.body.images + "','" + req.body.reporter + "')");

    let response = {
        error: false,
        insertedId: queryResult[0],
        result: queryResult[1]
    }
    res.status(200).json(response)
    console.log(response)
}

const getScammers = async (req, res) => {
    listScammers = await db.sequelize.query('SELECT * FROM `scammersdata`.`scammerview`'), {
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

const getScammerById = async (req, res) => {

    let id = req.params.id
    listScammers = await db.sequelize.query('SELECT * FROM `scammersdata`.`scammerview` where `scammerview`.`scammerId`=' + id), {
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
const getScammerByNumber = async (req, res) => {

    let number = req.params.number
    listScammers = await db.sequelize.query("SELECT * FROM `scammersdata`.`scammerview` where `scammerview`.`numbr` LIKE '%" + number + "%'"), {
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
const searchScammer = async (req, res) => {

    let value = req.params.value
    listScammers = await db.sequelize.query("SELECT * FROM `scammersdata`.`scammerview` where `scammerview`.`numbr` like '%"
        + value + "%' OR `scammerview`.`scammerId` like '%" + value + "%'"), {
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

const searchScammerPaginated = async (req, res) => {

    let value = req.params.value
    listScammers = await db.sequelize.query("SELECT COUNT(*)  FROM `scammersdata`.`scammerview` where `scammerview`.`numbr` like '%"
        + value + "%' OR `scammerview`.`scammerId` like '%" + value + "%'"), {
        raw: true,
    };
    let result = 0;
    if (listScammers != null) {
        result = listScammers[0].length;

    }
    let total = result;
    const limit = req.query.limit
    console.log('limit is ' + limit)
    console.log('total is ' + total)
    const lastPage = Math.ceil(total / limit)
    console.log('lastpage is ' + lastPage)
    const page = req.query.page
    let listScammers = null

    if (page <= lastPage && page > 0) {
        listScammers = await db.sequelize.query("SELECT * FROM `scammersdata`.`scammerview` where `scammerview`.`numbr` like '%"
            + value + "%' OR `scammerview`.`scammerId` like '%" + value + "%'"), {
            raw: true,
        };
    }
    let response = null;
    if (listScammers != null) {
        response = {
            error: false,
            list: listScammers[0],
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

const getPaginated = async (req, res) => {
    const result = await db.sequelize.query('SELECT COUNT(*) FROM `scammersdata`.`scammerview`');
    const total = result[0][0]['COUNT(*)']
    const limit = req.query.limit
    console.log('limit is ' + limit)
    console.log('total is ' + total)
    const lastPage = Math.ceil(total / limit)
    console.log('lastpage is ' + lastPage)
    const page = req.query.page
    let listOrderRows = null

    if (page <= lastPage && page > 0) {
        listOrderRows = await db.sequelize.query('SELECT * FROM `scammersdata`.`scammerview` ORDER BY `scammerId` LIMIT ' + limit + ' OFFSET ' + ((page - 1) * limit), {
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



const deleteScammer = async (req, res) => {
    let id = req.params.id
    listHadiths = await db.sequelize.query('DELETE FROM `scammersdata`.`scammer` WHERE `scammer`.`id`' + id), {
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
    addScammer,
    getScammers,
    getScammerByNumber,
    getScammerById,
    searchScammer,
    searchScammerPaginated,
    getPaginated,
    deleteScammer
}