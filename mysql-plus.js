exports.use = function (con) {
    exports.con = con;
}

exports.conDB = function (dbName) {
    exports.con.changeUser({database: dbName}, function (err) {
        if (err) throw err;
    });
}

exports.query = function (options = {}) {
    exports.con.query(options.query, function (err, result, fields) {
        if (err) throw err;

        console.log(options.message ? options.message : result);
    });
}

exports.showDBs = function () {
    exports.query({query: 'SHOW DATABASES'});
}

exports.createDB = function (dbName) {
    exports.query({query: `CREATE DATABASE ${dbName}`, message: `Database ${dbName} created`});
}

exports.createTable = function (tableName, columns, idCol = true) {
    let fullQuery = `CREATE TABLE ${tableName}`;

    if (idCol) {
        fullQuery += ' (id INT AUTO_INCREMENT PRIMARY KEY';
    }

    for (const colName in columns) {
        switch(columns[colName]) {
            case 'str':
                fullQuery += `, ${colName} VARCHAR(255)`;
                break;
            case 'int':
                fullQuery += `, ${colName} INT`;
        }
    }

    fullQuery += ')';

    exports.query({query: fullQuery, message: `Table ${tableName} created`});
}

exports.readTable = function (tableName) {
    exports.query({query: `SELECT * FROM ${tableName}`});
}