var game = {
			wins: 0,
			currentWord: "",
			under: [],
			movies: ["shutter_island", "the_dark_knight", "man_of_steel", "the_silence_of_the_lambs", "star_wars", "captain_america", "titanic", "the_last_airbender", "skyfall", "jurassic_park", "goodfellas", "looper", "ghostbusters", "men_in_black", "pulp_fiction", "the_lion_king", "avatar"],
			moviesDisplay: ["Shutter Island", "The Dark Knight", "Man of Steel", "The Silence of the Lambs", "Star Wars", "Captain America", "Titanic", "The Last Airbender", "Skyfall", "Jurassic Park", "Goodfellas", "Looper", "Ghostbusters", "Men in Black", "Pulp Fiction", "The Lion King", "Avatar"],
			guessesRemaining: 10,
			lettersGuessed: "",
			movieNum: "",
			movie: "",
			movieDisplay: "",
			found: false,
			firstGame: true,
			start : function(){
        this.wins = 0;
        this.firstGame = true;
        this.newGame();
      },
      newGame : function(){
      	var parent = document.getElementById("answer");
      	var image = '<img src="assets/images/placeholder.PNG" id="result">';
      	var answer = document.getElementById("movie");
      	answer.innerHTML = "";
      	parent.innerHTML = image;
      	this.guessesRemaining = 10;
      	this.lettersGuessed = "";
      	this.under = [];
      	this.currentWord = "";
      	this.movieNum = "";
      	this.movie = "";
      	this.movieDisplay = "";
        this.currentWord = this.getRandomMovie();
      	this.newWordDisplay(this.currentWord);
      },
      getRandomMovie : function(){
      	this.movieNum = Math.floor(Math.random() * (this.movies.length - 1));
      	this.movie = this.movies[this.movieNum];
      	return this.movie;
      },
      newWordDisplay : function(word){
	      under = [];
	      for(var i = 0; i < word.length; i++)
	      {
	      	if(word[i]=="_")
	      	{
	      		this.under.push(" - ");
	      	}
	      	else
	      	{
	      		this.under.push(" _");
	      	}
	      }
	      for(var j = 0; j < this.under.length; j++)
	      {
	      	this.movieDisplay = this.movieDisplay + this.under[j] + " ";
	      }
		    var html = '<p class="display-text" id="Under">Current Word:<br><br>'
		    html = html + this.movieDisplay + '</p><p class="display-text" id="wins">Wins: ' + this.wins + '</p><p class="display-text" id="Guesses">Guesses Remaining: ' + this.guessesRemaining + '</p><p class="display-text" id="Letters">Letters Guessed: <br>' + this.lettersGuessed + '<br></p>';
		    var el = document.getElementById("playspace");
		    el.innerHTML = html;
	      this.updateUnder(this.movieDisplay);
      },
      guess : function(letter){
      	if(this.guessesRemaining==1)
      	{
	      	this.lose();
	      }
	      else
	      {
	      	if(this.lettersGuessed=="")
	      	{
	      		this.lettersGuessed += letter;
	      	}
	      	else
	      	{
	      		this.lettersGuessed = this.lettersGuessed + ', ' + letter;
	      	}
	      	for(var i = 0; i < this.currentWord.length; i++)
	      	{
	      		if(letter == this.currentWord[i])
	      		{
	      			this.found=true;
	      			this.under[i]=letter;
	      			this.updateUnder(this.under);
	      		}
	      	}
	      	if(!this.found){
	      		this.guessesRemaining--;
	      		this.updateGuessesRemaining(this.guessesRemaining);
	      	}
	      	this.updateLettersGuessed(this.lettersGuessed);
	      	var sum = 0;
	      	for(var j = 0; j < this.currentWord.length; j++)
	      	{
	      		if(this.under[j] == this.currentWord[j] || this.under[j] == " - ")
	      		{
	      			sum++;
	      		}
	      	}
	      	console.log(this.movieDisplay);
	      	console.log(this.movie);
	      	console.log(sum);
	      	if(sum == this.currentWord.length)
	      	{
	      		this.win();
	      	}
	      }
	      this.found = false;
      },
      updateUnder : function(newUnder){
      	var underEl = document.getElementById("Under");
      	this.movieDisplay = "";
      	for(var j = 0; j < newUnder.length; j++)
	      {
	      	this.movieDisplay = this.movieDisplay + newUnder[j] + " ";
	      }
      	underEl.innerHTML = 'Current Word:<br><br>' + this.movieDisplay;
      },
      updateGuessesRemaining: function(newGuessesRemaining){
      	var guessesEl = document.getElementById("Guesses");
      	guessesEl.innerHTML = 'Guesses Remaining: ' + newGuessesRemaining;
      },
      updateLettersGuessed: function(newLettersGuessed){
      	var lettersEl = document.getElementById("Letters");
      	lettersEl.innerHTML = 'Letters Guessed: <br>' + newLettersGuessed;
      },
      updateWins: function(newWins){
      	var winsEl = document.getElementById("wins");
      	winsEl.innerHTML = 'Wins: ' + newWins;
      },
      win: function(){
      	var parent = document.getElementById("answer");
      	var movie = document.getElementById("movie");
      	var moviePic = ""
      	moviePic = moviePic + this.movies[this.movieNum] + ".jpg";
      	var image = '<img src="assets/images/' + moviePic + '" id="result">';
      	var display = this.moviesDisplay[this.movieNum];
      	parent.innerHTML = image;
      	movie.innerHTML = display;
      	console.log(image);
      	this.wins++;
      	this.updateWins(this.wins);
      	window.setTimeout(game.workAround, 4000);
      },
      workAround: function(){
      	game.newGame();
      },
      lose: function(){
      	alert("You lose!");
      	game.newGame();
      }
		};
		document.onload = game.start();
		document.onkeyup = function(event) {
				var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
				game.guess(userGuess);
				console.log(userGuess);
		}