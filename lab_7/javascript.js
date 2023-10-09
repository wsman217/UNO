//https://restcountries.com/v3.1/region/europe
//https://restcountries.com/v3.1/region/europe?fields=name
//https://restcountries.com/v3.1/all?fields=region
//https://restcountries.com/v3.1/name/mexico

// https://amiiboapi.com/api/amiibo/
// https://amiiboapi.com/api/amiibo/?amiiboSeries=
// https://amiiboapi.com/api/amiibo/?amiiboSeries=<value>
// https://amiiboapi.com/api/amiibo/?amiiboSeries=

const apiURL = 'https://amiiboapi.com/api/amiibo/';
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
		let theAction = 'onclick="getAmiiboSeries( \'' + theSeries + "');\"";
		//example: onclick="getCountries( 'Europe');"
		console.log( theAction );
		text+="<tr><td><a " + theAction + ">" + theSeries +"</a></td></tr>\n";
	});
	text += "</table>\n";
	document.getElementById( 'theTable' ).innerHTML = text;
}
function getAmiiboSeries( series )
{
	// theURL = apiURL + "region/" + region;
	theURL = apiURL + "?amiiboSeries=" + series;
	//example: https://restcountries.com/v3.1/region/Europe
	console.log( theURL );
	fetch( theURL ) //get the raw answer
		.then( res => res.json() ) //get structure
		.then( data => showAmiiboSeries( data ) ); //convert and show
}
function showAmiiboSeries( theArray )
{
	text="<h3>Amiibo Series</h3>\n<table>\n<tr><th>Series</th><th>Character</th></tr>\n";
	Array.from(theArray).forEach( function( theAmiibo ){
		let theAction = 'onclick="getCharacter( \'' + theAmiibo.name.common + "');\"";
		//example: onclick="getCountry( 'United Kingdom');"
		console.log( theAction );
		text+="<tr><td><a " + theAction + ">" + theAmiibo.name.common + "</a></td><td>"+ theAmiibo.subregion +"</td></tr>\n";
	});
	text += "</table>\n";
	document.getElementById( 'theTable' ).innerHTML = text;
}
function getCharacter( character )
{
	theURL = apiURL + "&character=" + character;
	//example: https://restcountries.com/v3.1/name/United Kingdom
	console.log( theURL );
	fetch( theURL )										//get the raw answer
		.then( res => res.json() )						//get structure
		.then( data => showCharacter( data ) );			//convert and show
}
function showCharacter( theArray )
{
	text  = "<h3>"+ theArray[0].name.common +"</h3>\n<table>\n<tr><th>Data</th><th>Value</th></tr>\n";
	text += "<td>Official name</td><td>" + theArray[0].name.official + "</td></tr>\n";
	text += "<td>Capital</td><td>" + theArray[0].capital + "</td></tr>\n";
	text += "<td>Flag</td><td>" + "<img src=\"" + theArray[0].flags.png + "\"></td></tr>\n";
	text += "</table>\n";
	document.getElementById( 'theTable' ).innerHTML = text;
}
