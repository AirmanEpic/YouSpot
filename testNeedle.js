const https = require('https');

const query = 'hello';
const type = 'track';
const market = 'US';
const limit = '1';

const options = {
    hostname: 'api.spotify.com',
    port: 443,
    path: ('/v1/search?q=' + query + '&type=' + type + '&market=' + market + '&limit=' + limit).replace(' ', '%20'),
    method: 'GET',
    headers: {
        'Authorization': 'Bearer BQAOm4p3Wf-d6ZbMH0cwu7gDST6Kxcg_KEYoroxwHKSb7MWyz5nA9UDuv6Dc3hIozKZyDbtjVL0m3g1v26Oc3Dpc_xgbCyS-G_QHzo_n1w8CTk_P1LyDQTogA6kXKrfpeUFhP139aoWmaxnHQlg',
    },
};

const req = https.request(options, (res) => {
    //console.log('statusCode:', res.statusCode);
    //console.log('headers:', res.headers);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (e) => {
    console.error(e);
});
req.end();