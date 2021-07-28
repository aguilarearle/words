const SENTENCE_DELAY = 1000;
let audio = $('#audio')[0];
let sentenceForFading = $('#faded-sentence')[0];
let wordIx = 0;
let firstRun = true;

let timestamps = {};

let btn_id_to_song_src = {
	"poem_1": "https://storage.googleapis.com/words_bucket_1/earle_1.wav",
	"poem_2": "",
	"poem_3": "",
}

function setSpanElements(lyric){

	let lyricsElements = lyric.split(' ').map(word=>'<span class="faded-word">'+word+'</span>').join(' ');
	console.log("lyricsElemetns", lyricsElements)
	
	sentenceForFading.innerHTML = lyricsElements;
}

audio.addEventListener('ended', function(ev){
	console.log("audio Ended"); 
	$('.faded-word').forEach(word=>{
		word.classList.remove('faded-activated')
	});
	wordIx = 0;
	audio = null;
});


audio.addEventListener('timeupdate', function(ev){
	let wordsForFading = $('.faded-word').toArray();

	let t = audio.currentTime;
	
	const result = timestamps.find(({startTime, endTime}) => t >= startTime && t <= endTime);

	if (result){
		let duration  = result.endTime - t;
		wordsForFading[wordIx].classList.add('faded-activated')		
		wordsForFading[wordIx].style.transition = `opacity ${duration}s ease-in-out,  transform ${duration}s ease-in-out` 
		timestamps.shift();
		wordIx += 1;
	}	
});

audio.addEventListener('play', function(ev){
	console.log("audio started playing");
});

let btn_group = document.getElementById('btn-group');

btn_group.addEventListener('click', (event) => {

	console.log('btn_group.addEventListener event.target.id: ', event.target.id)
  const isButton = event.target.nodeName === 'BUTTON';

  if (!isButton) {
    return;
  }
  

  $.ajax({
	url: "http://localhost:8000/",
	type: "get", //send it through get method
	data: { 
	  song_id: event.target.id, 
	},
	success: function(res) {

		timestamps = res.data['timestamps'];
		let lyrics = res.data['lyrics'];
		let audio_src = btn_id_to_song_src[event.target.id];
		setSpanElements(lyrics);

		if (!audio){
			audio = $('#audio')[0];
		}
		
		
		audio.src = audio_src;
		audio.load();

		if (audio.paused){
			audio.play();
		}else{
			audio.pause();
		}			
	},
	error: function(err) {
		  console.log(err);
	}
  });  

})



