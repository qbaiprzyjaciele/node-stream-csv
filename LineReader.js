

function LineReader(filePath, encoding) {
    var stream = require('fs').createReadStream(filePath);
    var EventEmitter = require('events').EventEmitter;
    var emitter = new EventEmitter();
    var dataChunk = '';
    stream.on('data', function(data) {
        dataChunk = dataChunk + new Buffer(data,encoding).toString();
        let lines = dataChunk.split('\n');
        if(lines.length > 1) { 
            emitter.emit('lines', lines.slice(0,lines.length-1));
        }
        dataChunk = lines[lines.length-1];
    });
   return emitter;
}

//var lineReader = LineReader('largetext1.txt', 'utf8');



module.exports = LineReader;


