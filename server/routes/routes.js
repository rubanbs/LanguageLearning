
var appRouter = function (app, pool) {

    app.get("/words", function (req, res) {
        getWords(req, res);
    });
    
    app.post("/word", function (req, res) {
        createWord(req, res);
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
                console.log('err');
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
                console.log('err-2');
                res.json({"code": 100, "status": "Error in connection database"});
            });
        });
    }
}

module.exports = appRouter;