var CsvParser = function(options, fieldDefs, path) {
    
    var parseHeader = function(headerLine) {
        columnNames = headerLine.split(options.separator);
        var key;
        var i = 0;
        var csvModel = [];
        for(key in fieldDefs) {
            var columnIndex = columnNames.findIndex(function(name) {
                return name === fieldDefs[key].name;
            });
            if(columnIndex === -1) {
                throw 'Column ' + fieldDefs[key].name + ' not found!';
            }
            var parseFunction = prepareParseFunction(fieldDefs[key]);
            csvModel[columnIndex] = {
                name: name, 
                actualColumnName: columnNames[columnIndex],
                parseFunction: parseFunction
            }
        }
    }

    var prepareParseFunction = function(fieldDef) {
        return function(value) {
            return value;
        }
    }

    this.parse = function() {
            
    }

    this.parseLine = function(line) {
        var splitted = line.split(options.separator);
        var parsed = {};
        for(var i=0; i<splitted.length; i++) {
            parsed[csvModel[i].columnNames] = csvModel[i].parseFunction(splitted[i]);
        }
        return parsed;
    }

}