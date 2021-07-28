const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');

// const productionReady = process.env.NODE_ENV === 'production';
const productionReady = true;
const PORT = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, Vary: Origin,');
    res.setHeader('Access-Control-Expose-Headers', 'Authorization');
    next();
});

app.get('/', (req, res) => {
    console.log(req.query);
    let {song_id} = req.query;
    console.log(song_id)
    switch(song_id){
        case 'poem_1':
            let tt = require('./stmarys_tt.json');
            fs.readFile('stgeorge_lyrics.txt', 'utf8', function(err, txt) {
                if (err) throw err;
                console.log(txt);
                let data = {timestamps: tt.timestamps, lyrics: txt}
                res.send({data: data});
            });
            break;
        default:
            res.send('nada')
    }

});


const server = app.listen(PORT , () => console.log('Server started on http://localhost:8000'))


