import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';

const app = module.exports = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../client/homepage/build')));
app.use(express.static(path.join(__dirname, '../client/spotify-playlist-analyzer/build')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).send("404 That page doesn't exist!");
    //next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //res.send(err.message);
    res.send(err.stack);
    // render the error page
    // const errorPageApp = renderToString(<ErrorPage msg={err.message} errStatus={err.status || 500} errStack={err.stack}/>);
    // res.send(template({
    //   page: errorPageApp,
    //   title: "Zachary Graham | Error..."
    // }))
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/homepage/build/index.html'));
});

app.get('/spa', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/spotify-playlist-analyzer/build/index.html'));
});