
var appRouter = function (app, pool) {

    app.get("/words", function (req, res) {
        getWords(req, res);
    });

    app.post("/word", function (req, res) {
        createWord(req, res);
    });

    app.get("/word", function (req, res) {
        getWord(req, res);
    });

    function getWords(req, res) {

        pool.getConnection(function (err, connection) {

            if (err) {
                res.json({"code": 100, "status": "Error in connection database"});
                return;
            }

            connection.query("select * from words", function (err, rows) {
                connection.release();
                if (!err) {
                    res.json(rows);
                }
            });

            connection.on('error', function (err) {
                res.json({"code": 100, "status": "Error in connection database"});
            });
        });
    }

    function createWord(req, res) {

        pool.getConnection(function (err, connection) {

            if (err) {
                res.json({"code": 100, "status": "Error in connection database"});
                return;
            }

            connection.query("INSERT INTO words SET ?", req.body, function (err, rows) {
                connection.release();
                if (!err) {
                    res.json(rows);
                } else {
                    res.json(err);
                }
            });

            connection.on('error', function (err) {
                res.json({"code": 100, "status": "Error in connection database"});
            });
        });
    }

    function getWord(req, res) {

        pool.getConnection(function (err, connection) {

            if (err) {
                res.json({"code": 100, "status": "Error in connection database"});
                return;
            }

            if (req.query.origin) {

                connection.query("select * from words WHERE origin = ?", req.query.origin, function (err, rows) {
                    connection.release();
                    if (!err) {
                        res.json(rows);
                    } else {
                        res.json(err);
                    }
                });

            } else {

                var params = [];

                var sqlParams = "";

                if (req.query.stars) {
                    sqlParams += " AND stars >= " + req.query.stars;
                }

                if (req.query.material) {
                    sqlParams += " AND materialid IN (" + arrayAsParamString(req.query.material) + ")";
                }

                if (req.query.type) {
                    sqlParams += " AND typeid IN (" + arrayAsParamString(req.query.type) + ")";
                }

                var sqlQuery = "SELECT COUNT(*) AS count FROM words WHERE TRUE" + sqlParams;

                connection.query(sqlQuery, function (err, rows) {
                    var total = rows[0].count;

                    if (!err) {

                        if (!total) {
                            connection.release();
                            res.json([]);
                        } else {

                            sqlQuery = "SELECT COUNT(*) as count FROM words WHERE usedInRound=1" + sqlParams;

                            connection.query(sqlQuery, function (err, rows) {
                                var used = rows[0].count;
                                if (!err) {

                                    if (used === total) {

                                        var sqlUpdate = "UPDATE words SET usedInRound=0" + sqlParams;

                                        connection.query(sqlUpdate, function (err, rows) {

                                            if (!err) {

                                                sqlQuery = "SELECT * FROM words WHERE usedInRound=0" + sqlParams + "ORDER BY RAND() LIMIT 1";

                                                connection.query(sqlQuery, function (err, rows) {
                                                    var words = rows;
                                                    if (!err) {

                                                        sqlUpdate = "UPDATE words SET usedInRound=1 WHERE id=?";

                                                        connection.query(sqlUpdate, words[0].id, function (err, rows) {
                                                            connection.release();
                                                            if (!err) {
                                                                res.json(words);
                                                            } else {
                                                                res.json(err);
                                                            }
                                                        });

                                                    } else {
                                                        connection.release();
                                                        res.json(err);
                                                    }
                                                });

                                            } else {
                                                connection.release();
                                                res.json(err);
                                            }
                                        });

                                    } else {

                                        sqlQuery = "SELECT * FROM words WHERE usedInRound=0" + sqlParams + "ORDER BY RAND() LIMIT 1";

                                        connection.query(sqlQuery, function (err, rows) {
                                            var words = rows;
                                            if (!err) {

                                                sqlUpdate = "UPDATE words SET usedInRound=1 WHERE id=?";

                                                connection.query(sqlUpdate, words[0].id, function (err, rows) {
                                                    connection.release();
                                                    if (!err) {
                                                        res.json(words);
                                                    } else {
                                                        res.json(err);
                                                    }
                                                });

                                            } else {
                                                connection.release();
                                                res.json(err);
                                            }
                                        });
                                    }

                                } else {
                                    connection.release();
                                    res.json(err);
                                }
                            });
                        }

                    } else {
                        connection.release();
                        res.json(err);
                    }
                });
            }

            connection.on('error', function (err) {
                res.json({"code": 100, "status": "Error in connection database"});
            });
        });
    }

    function arrayAsParamString(input) {
        var paramsArray = [];
        var ids = Array.isArray(input) ? input : [input];
        ids.forEach(function (e) {
            paramsArray.push(+e);
        });
        return paramsArray.join(',')
    }
}

module.exports = appRouter;