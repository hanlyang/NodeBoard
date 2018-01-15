const express    = require('express');
const path       = require('path');
const favicon    = require('serve-favicon');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const app        = express();

// 템플릿 설정
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views/pages'));

// 미들웨어 사용 설정
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// 루트
app.get('/', (req, res) => {
    res.send('Node CMS Root Page');
});

// 에러 미들웨어
app.use((req, res, next) => {
    const err = new Error("404 error");
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send('Page Not Found!');
        console.log(err);
    } else {
        res.status(err.status || 500).send('에러');
        console.log(err);
    }
});

app.listen(3000, () => {
    console.log('node cms start port 3000');
});
