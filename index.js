const csv = require('csv');
const fs = require('fs');
const rp = require('request-promise');
function createDoc(record)
{
    var doc = {
        body_style: record.VClass,
        city_mpg: record.city08,
        fuel_type: record.fuelType1,
        highway_mpg: record.highway08,
        make: record.make,
        model: record.model,
        transmission:record.trany,
        year: record.year
    };
    doc.condition =  (doc.year >= 2016) ? 'New' : 'Used';
    doc.mileage = doc.condition == 'New' ? 0 : Math.ceil(Math.random() * 200000);
    doc.price = doc.year < 1990 ? 1000.00 : doc.year < 2000 ? 3200 : Math.ceil(Math.random() * 20000);
    return doc;    
}

function bulkIndex(docs, callback) {
    let content = '';
    for (var i = 0; i < docs.length; i++) {
        var doc = docs[i];
        content += `\r\n{ "index" : { "_index" : "cars", "_type" : "car", "_id" : "${i+1}" } }\r\n${JSON.stringify(doc)}\r\n`;
    }
    let options = {
        method : 'POST',
        uri : 'http://localhost:9200/_bulk',
        body : content,
        headers: {'Content-Type': 'text/plain'}
    };
    rp(options).then(function(body) {
        console.log('indexed!');
    }).catch(function(error) {
        console.error(error);
    });
}


function loadData() {
    fs.readFile('vehicles.csv', 'utf-8', function(error,  data){
        if(error)
            throw error;
        csv.parse(data, { auto_parse : true, columns  : true}, function(err, output) {
            let docs = output.map(o => createDoc(o));
            bulkIndex(docs);
        });
    });
}
loadData();