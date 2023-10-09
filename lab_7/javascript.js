// https://amiiboapi.com/api/amiibo/
// https://amiiboapi.com/api/amiibo/?amiiboSeries=<value>

var apiURL = 'https://amiiboapi.com/api/amiibo/';
const amiiboSeries = [ "Super Smash Bros.",
    "Super Mario Bros.",
    "Chibi-Robo!",
    "Yoshi's Woolly World",
    "Splatoon",
    "Animal Crossing",
    "8-bit Mario",
    "Skylanders",
    "Legend Of Zelda",
    "Shovel Knight",
    "Kirby",
    "Pokemon",
    "Mario Sports Superstars",
    "Monster Hunter",
    "BoxBoy!",
    "Pikmin",
    "Fire Emblem",
    "Metroid",
    "Others",
    "Mega Man",
    "Diablo",
    "Power Pros",
    "Monster Hunter Rise",
    "Yu-Gi-Oh!",
    "Super Nintendo World" ];

function showAll()
{
	text="<h3>Amiibo Series</h3>\n<table>\n<tr><th>Series</th></tr>\n";
	Array.from(amiiboSeries).forEach( function( theSeries ){
		let theAction = 'onclick="getAmiiboSeries(\'' + theSeries.trim() + '\')"';
		text+="<tr><td><a " + theAction + ">" + theSeries +"</a></td></tr>\n";
	});
	text += "</table>\n";
	document.getElementById( 'theTable' ).innerHTML = text;
}
function getAmiiboSeries( series )
{
	apiURL += "?amiiboSeries=" + series;
	fetch( apiURL ) //get the raw answer
		.then( res => res.json() ) //get structure
		.then( data => showAmiiboSeries( data.amiibo ) ); //convert and show
}
function showAmiiboSeries( theArray )
{
	text="<h3>Amiibo Series</h3>\n<table>\n<tr><th>Series</th><th>Character</th></tr>\n";
	Array.from(theArray).forEach( function( theAmiibo ){
		let theAction = 'onclick="getCharacter( \'' + theAmiibo.name + '\')"';
		text+="<tr><td><a " + theAction + ">" + theAmiibo.amiiboSeries + "</a></td><td>"+ theAmiibo.name +"</td></tr>\n";
	});
	text += "</table>\n";
	document.getElementById( 'theTable' ).innerHTML = text;
}
function getCharacter( character )
{
	console.log(character);
	apiURL += "&name=" + character;
	console.log( apiURL );
	fetch( apiURL )										//get the raw answer
		.then( res => res.json() )						//get structure
		.then( data => showCharacter( data.amiibo ) );			//convert and show
}
function showCharacter( theArray )
{
	console.log(theArray);
	text  = "<h3>"+ theArray[0].name+"</h3>\n<table>\n<tr><th>Data</th><th>Value</th></tr>\n";
	text += "<td>" + theArray[0].name + "</td><td>" + "<img src=\"" + theArray[0].image+ "\"></td></tr>\n";
	text += "</table>\n";
	document.getElementById( 'theTable' ).innerHTML = text;
}
