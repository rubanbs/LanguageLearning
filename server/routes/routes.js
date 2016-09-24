
var appRouter = function (app, pool) {

    app.get("/words", function (req, res) {
        getWords(req, res);
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
}

module.exports = appRouter;