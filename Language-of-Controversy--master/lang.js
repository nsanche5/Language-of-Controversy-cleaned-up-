//All to be replaced by a JS file.

//Var used to store bookfile being read in
var bookFile;

//Get rid of repeating words in the text file/string
function unique(list) 
{
  var result = [];
   
  $.each(list, function(i, e) {
    if (($.inArray(e, result) == -1) ) result.push(e);
  });

  return result;
}

function cleanText(textFile)
{
  var bookText = [];

  // get rid of random symbols
  bookText = textFile.replace(/[\.,-\/•#!?©@$%^"'\^&\*;:{}=\-_`~()\d\r\v\n]/g,"");
  //get rid of words under 3 characters in length
  bookText = bookText.replace(/(\b(\w{1,3})\b(\s|$))/g, "");
  //get rid of common words
  bookText = bookText.replace(/because|that|their|they|with|were|which|this|from|have|them|most|only|more|these|there|will|been|than|then|would|could|should|those|they|when|httpwwwidphnet|said|went|they|what|while|says|some|like|about|just|even|over|where|dont|your|after|into|down|back|around|here|away|till|through|toward|before|upon/g, "");
  //get rid of words under 3 characters in length
  bookText = bookText.replace(/(\b(\w{1,3})\b(\s|$))/g, "");
  //Multiple spaces become one.
  bookText = bookText.replace(/\s+/g, ' ');
  //Make lower case
  bookText = bookText.toLowerCase();
  //split parses the data into an array by the regular expression specified 
  bookText = bookText.split(" ");

  return bookText;
}

//Called on click
function updateData(e){

  bookFile = e.id;
  var timer;
    d3.select("svg").remove();
    $("#img").fadeOut("slow");
    $("#book").css("background-image", "url(images/flipScene.gif)");
  timer = setTimeout(function() {
      $("#book").css("background-image", "url(images/flip.png)");
      getBookFile();
      drawCloud(bookFile);
            $("#img").fadeIn("slow");
	},600); 
}

//Called whenever changing book text
function getBookFile() {
  switch(bookFile){
    case '1':
      document.getElementById("img").src = "bookstxt/american psycho.png";
      bookFile = "bookstxt/Psycho.txt";
      break;
    case '2':
      document.getElementById("img").src = "bookstxt/animal farm.png";
      bookFile = "bookstxt/AnimalFarm.txt";
      break;
    case '3':
      document.getElementById("img").src = "bookstxt/brave new world.png";
      bookFile = "bookstxt/BraveNewWorld.txt";
      break;
    case '4':
      document.getElementById("img").src = "bookstxt/frankenstein.png";
      bookFile = "bookstxt/Frankenstein.txt";
      break;
    case '5':
      document.getElementById("img").src = "bookstxt/grapes of wrath.png";
      bookFile = "bookstxt/GrapesOfWrath.txt";
      break;
    case '6':
      document.getElementById("img").src = "bookstxt/lolita.png";
      bookFile = "bookstxt/Lolita.txt";
      break;
    case '7':
      document.getElementById("img").src = "bookstxt/to kill a mockingbird.png";
      bookFile = "bookstxt/ToKillAMockingbird.txt";
      break;
    case '8':
      document.getElementById("img").src = "bookstxt/tropic of cancer.png";
      bookFile = "bookstxt/TropicOfCancer.txt";
      break;
    case '9':
      document.getElementById("img").src = "bookstxt/ulysses.png";
      bookFile = "bookstxt/Ulysses.txt";
      break;
    case '10':
      document.getElementById("img").src = "bookstxt/white niggers of america.png";
      bookFile = "bookstxt/WhiteNiggersOfAmerica.txt";
      break;
    default:
      bookFile = "bookstxt/WhiteNiggersOfAmerica.txt";
      break;
  }
}

function drawCloud(bookFile) {
  //Reads the text file as a large string 
  $.get(bookFile, function(data)
  {
    console.log(data);
    var bookText = cleanText(data);

    //
    var result = unique(bookText);
    
    var wordsDict = {};
    
    //Push the unique words into the wordArray, will be used for keeping count
    for (var i = 0; i < result.length; ++i){
      wordsDict[result[i]] = 1;
    }

    //Run through original text, increment counts of words in wordArray
    for (var i = 0, len = bookText.length; i < len; ++i)
    {
      if (bookText[i] in wordsDict)
      {
        wordsDict[bookText[i]]++;
      }
    }

    //Change 
    var top = Object.keys(wordsDict).map(function(key)
    {
      return [key, wordsDict[key]];
    });

    top.sort(function(first, second)
    {
      return second[1] - first[1];
    });

    //console.log(top);
    var topWords = [];
    for (var i = 0; i < 25; ++i)
    {
      topWords[i] = {word:top[i][0], count: top[i][1]};
    }

    drawOnGrid(topWords);

  },'text');
}

//Jquery magic
$(document).ready(function(){
  getBookFile();
  console.log(bookFile);
  drawCloud(bookFile);
});
