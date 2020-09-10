/* ---------- CONNECTION MODIFIERS --------- */
/**
 * @param {Connection} con Connection started by app.js
 */
exports.use = (con) => {
    exports.con = con;
}

exports.conDB = (dbName) => {
    exports.con.changeUser({
        database: dbName
    }, function (err) {
        if (err) throw err;
    });
}

/* ---------- QUERY FUNCTIONS --------- */
/**
 * MySQL query without placeholders.
 * @param {{query: string, action: function(Array), request: function(Array), info: string, message: string}=} options Options for MySQL query.
 */
exports.query = (options = {}) => {
    return new Promise((resolve, reject) => {
        exports.con.query(options.query, function (err, result, fields) {
            if (err) return reject(err);

            if (options.info) console.log(options.info);
            console.log(options.message ? options.message : result);
            console.log('');

            if (options.action) options.action(result);
            if (options.request) result = options.request(result);

            return resolve(result);
        });
    })
}

/**
 * Query involving an escape string and placeholders.
 * @param {{query: string, placeholders: Array, action: function(Array), request: function(Array), info: string, message: string}=} options Options for MySQL query.
 */
exports.escQuery = (options = {}) => {
    return new Promise((resolve, reject) => {
        exports.con.query(options.query, options.placeholders, function (err, result, fields) {
            if (err) return reject(err);

            if (options.info) console.log(options.info);
            console.log(options.message ? options.message : result);
            console.log('');

            if (options.action) options.action(result);
            if (options.request) result = options.request(result);

            return resolve(result);
        });
    })
};

/* ---------- DATABASE LEVEL FUNCTIONS--------- */
exports.showDBs = async () => {
    return exports.query({
        query: 'SHOW DATABASES',
        info: 'Showing Databases:'
    });
}

exports.createDB = async (dbName) => {
    return exports.query({
        query: `CREATE DATABASE ${dbName}`,
        message: `Database ${dbName} created`
    });
}

/* ---------- TABLE LEVEL FUNCTIONS --------- */
/**
 * Creates a table and returns the MySQL query result.
 * @param {string} tableName Name of the table being created.
 * @param {{colName: string}} columns Column names and types. ex: {username: 'str', password: 'str'}. Possible types are 'str', 'int'.
 * @param {boolean=} idCol Whether or not an id column should be included.
 */
exports.createTable = async (tableName, columns, idCol = true) => { // columns ex: = {colName : 'str', colName2 : 'int'}
    let fullQuery = `CREATE TABLE ${tableName}`;

    if (idCol) {
        fullQuery += ' (id INT AUTO_INCREMENT PRIMARY KEY';
    }

    for (const colName in columns) {
        switch (columns[colName]) {
            case 'str':
                fullQuery += `, ${colName} VARCHAR(255)`;
                break;
            case 'int':
                fullQuery += `, ${colName} INT`;
                break;
        }
    }

    fullQuery += ')';

    return exports.query({
        query: fullQuery,
        message: `Table ${tableName} created`
    });
}

exports.readTable = async (tableName) => {
    return exports.query({
        query: `SELECT * FROM ${tableName}`,
        info: `Reading table ${tableName}`
    });
}

exports.searchTable = async (tableName, col, value, options = {}) => {
    return exports.escQuery({
        query: `SELECT * FROM ${tableName} WHERE ${col} = ?`,
        placeholders: [value],
        info: `Searching table ${tableName} for where ${col} == ${value}`,
        ...options
    });
}

exports.insertRow = async (tableName, columns, options = {}) => {
    const colNames = Object.keys(columns);
    const colValues = Object.values(columns);

    let fullQuery = `INSERT INTO ${tableName}(${colNames.shift()}`;

    colNames.forEach(colName => {
        fullQuery += `, ${colName}`;
    });

    fullQuery += ') VALUES (?';

    for (i = 0; i < colNames.length; i++) {
        fullQuery += ', ?';
    }

    fullQuery += ')';

    return exports.escQuery({
        query: fullQuery,
        placeholders: colValues,
        ...options
    });
}

exports.deleteRow = async (tableName, condition) => {
    return exports.query({
        query: `DELETE FROM ${tableName} WHERE ${condition}`,
        message: `Deleted from ${tableName} where ${condition}`
    });
}