/* Search */

var UI = {};

UI.EnterPress = document.querySelector(".icon").addEventListener('click',function(){

	 var input = document.querySelector(".input-search").value;
	 return input;

});

UI.SubmitClick = document.querySelector(".js-search").addEventListener('keyup',function(){

	 var input = document.querySelector(".input-search").value;
	 return input;

});


console.log(UI);

// UI.EnterPress.call(SoundCloudAPI.getTrack);




/* Query Souncloud API */


var SoundCloudAPI = {};

SoundCloudAPI.init = function() {


	SC.initialize({
  client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
});

}

SoundCloudAPI.init();


// find all sounds of buskers licensed under 'creative commons share alike'

SoundCloudAPI.getTrack = function(tracks) {

SC.get('/tracks', {
  q: 'buskers', license: 'cc-by-sa'
}).then(function(tracks) {
  console.log(SC);
  SoundCloudAPI.renderTracks(tracks);
});

}


/* DIsplay the cards */

SoundCloudAPI.getTrack("Juice WRLD");


SoundCloudAPI.renderTracks = function(tracks) {

	tracks.forEach(function(track){


		// Card
	var card = document.createElement('div');
	card.classList.add("card");

//Image
	var imageDiv = document.createElement('div');
	imageDiv.classList.add('image');

	var image_img = document.createElement('img');
	image_img.classList.add('image_img');
	image_img.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract/';

	imageDiv.appendChild(image_img);

// Content 
	var content = document.createElement('div');
	content.classList.add('content');

	var header = document.createElement('div');
	header.classList.add('header');
	header.innerHTML = '<a href" '+ track.permalink_url +'" target="_blank">' + track.title + '</a>';

// Button 
	var button = document.createElement('div');
	button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

	var icon = document.createElement('i');
	icon.classList.add('add', 'icon');

	var buttonText = document.createElement('span');
	buttonText.innerHTML = 'Add to playlist';


// appendChild
	content.appendChild(header);

	button.appendChild(icon);
	button.appendChild(buttonText);

	button.addEventListener('click', function(){
			SoundCloudAPI.getEmbed(track.permalink_url);
	});

	card.appendChild(imageDiv);
	card.appendChild(content);
	card.appendChild(button);

	var searchResults = document.querySelector(".js-search-results");
	searchResults.appendChild(card);

	})



}











/* Add to playlist */
SoundCloudAPI.getEmbed = function(TrackURL){

	SC.oEmbed(TrackURL, {
  auto_play: true
}).then(function(embed){
  console.log('oEmbed response: ', embed);

  var sideBar = document.querySelector('.js-playlist');
  sideBar.innerHTML = embed.html;

  var box = document.createElement('div');
  box.innerHTML = embed.html;

  sideBar.insertBefore(box, sideBar.firstChild);

  // localStorage.setItem('key', sideBar.innerHTML);
});

}

// var sideBar = document.querySelector('.js-playlist');
// sideBar.innerHTML = localStorage.getItem("key");
