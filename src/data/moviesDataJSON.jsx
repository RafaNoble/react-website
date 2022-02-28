import movies_data_csv from '../data/data.csv';

var archivoTxt = new XMLHttpRequest();

archivoTxt.open("GET", movies_data_csv, false);
archivoTxt.send();

var csvTxt = archivoTxt.responseText;

function csvJSON(csv) {
    var lines = csv.split("\n");
    var result = [];

    for (var i = 1; i < lines.length - 1; ++i) {
        var obj = [];
        var currentline = lines[i].split(",\"");
        obj.id = currentline[0];

        var aSimilar = currentline[1].split(", ");
        var ini = aSimilar[0];
        var fin = aSimilar[aSimilar.length - 1];
        aSimilar[0] = ini.slice(1, ini.length);
        aSimilar[aSimilar.length - 1] = fin.slice(0, -2);
        
        obj.relatedMovies = aSimilar;

        var currentTitle = currentline[2].split(",");
        obj.title = currentTitle[currentTitle.length - 1].slice(0, -1);

        result.push(obj);
    }

    return result;
}

export const movies_data = csvJSON(csvTxt);