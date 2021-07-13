const SENTENCE_DELAY = 1000;
let sentencesForFading = document.querySelectorAll('.faded-sentence');
let audio = document.getElementById('audio');
// let rawdata = fs.readFileSync('Mary_Had_a_Little_Lamb.json');
let wordIx = 0;
let timestampJSON = {
	"timestamps": [
		{
		  "word": "some",
		  "startTime": 4.4,
		  "endTime": 5,
		  "duration": 0.5999999999999996
		},
		{
		  "word": "say",
		  "startTime": 5,
		  "endTime": 5.3,
		  "duration": 0.2999999999999998
		},
		{
		  "word": "the",
		  "startTime": 5.3,
		  "endTime": 5.5,
		  "duration": 0.20000000000000018
		},
		{
		  "word": "world",
		  "startTime": 5.5,
		  "endTime": 5.5,
		  "duration": 0
		},
		{
		  "word": "will",
		  "startTime": 5.5,
		  "endTime": 6,
		  "duration": 0.5
		},
		{
		  "word": "end",
		  "startTime": 6,
		  "endTime": 6.3,
		  "duration": 0.2999999999999998
		},
		{
		  "word": "in",
		  "startTime": 6.3,
		  "endTime": 6.7,
		  "duration": 0.40000000000000036
		},
		{
		  "word": "fire",
		  "startTime": 6.7,
		  "endTime": 7,
		  "duration": 0.2999999999999998
		},
		{
		  "word": "some",
		  "startTime": 7,
		  "endTime": 8,
		  "duration": 1
		},
		{
		  "word": "say",
		  "startTime": 8,
		  "endTime": 8.4,
		  "duration": 0.40000000000000036
		},
		{
		  "word": "in",
		  "startTime": 8.4,
		  "endTime": 8.8,
		  "duration": 0.40000000000000036
		},
		{
		  "word": "ice",
		  "startTime": 8.8,
		  "endTime": 9.1,
		  "duration": 0.29999999999999893
		},
		{
		  "word": "from",
		  "startTime": 9.1,
		  "endTime": 10.2,
		  "duration": 1.0999999999999996
		},
		{
		  "word": "what",
		  "startTime": 10.2,
		  "endTime": 10.5,
		  "duration": 0.3000000000000007
		},
		{
		  "word": "I've",
		  "startTime": 10.5,
		  "endTime": 10.8,
		  "duration": 0.3000000000000007
		},
		{
		  "word": "tasted",
		  "startTime": 10.8,
		  "endTime": 11.2,
		  "duration": 0.3999999999999986
		},
		{
		  "word": "of",
		  "startTime": 11.2,
		  "endTime": 11.5,
		  "duration": 0.3000000000000007
		},
		{
		  "word": "desire",
		  "startTime": 11.5,
		  "endTime": 12.1,
		  "duration": 0.5999999999999996
		},
		{
		  "word": "I",
		  "startTime": 12.1,
		  "endTime": 12.9,
		  "duration": 0.8000000000000007
		},
		{
		  "word": "hold",
		  "startTime": 12.9,
		  "endTime": 13.5,
		  "duration": 0.5999999999999996
		},
		{
		  "word": "with",
		  "startTime": 13.5,
		  "endTime": 13.7,
		  "duration": 0.1999999999999993
		},
		{
		  "word": "those",
		  "startTime": 13.7,
		  "endTime": 13.9,
		  "duration": 0.20000000000000107
		},
		{
		  "word": "who",
		  "startTime": 13.9,
		  "endTime": 14.1,
		  "duration": 0.1999999999999993
		},
		{
		  "word": "favor",
		  "startTime": 14.1,
		  "endTime": 14.7,
		  "duration": 0.5999999999999996
		},
		{
		  "word": "fire",
		  "startTime": 14.7,
		  "endTime": 15.2,
		  "duration": 0.5
		},
		{
		  "word": "but",
		  "startTime": 15.2,
		  "endTime": 16.3,
		  "duration": 1.1000000000000014
		},
		{
		  "word": "if",
		  "startTime": 16.3,
		  "endTime": 16.4,
		  "duration": 0.09999999999999787
		},
		{
		  "word": "I",
		  "startTime": 16.4,
		  "endTime": 16.5,
		  "duration": 0.10000000000000142
		},
		{
		  "word": "had",
		  "startTime": 16.5,
		  "endTime": 16.8,
		  "duration": 0.3000000000000007
		},
		{
		  "word": "to",
		  "startTime": 16.8,
		  "endTime": 16.9,
		  "duration": 0.09999999999999787
		},
		{
		  "word": "perish",
		  "startTime": 16.9,
		  "endTime": 17.2,
		  "duration": 0.3000000000000007
		},
		{
		  "word": "twice",
		  "startTime": 17.2,
		  "endTime": 17.8,
		  "duration": 0.6000000000000014
		},
		{
		  "word": "I",
		  "startTime": 17.8,
		  "endTime": 18.6,
		  "duration": 0.8000000000000007
		},
		{
		  "word": "think",
		  "startTime": 18.6,
		  "endTime": 18.7,
		  "duration": 0.09999999999999787
		},
		{
		  "word": "I",
		  "startTime": 18.7,
		  "endTime": 19.1,
		  "duration": 0.40000000000000213
		},
		{
		  "word": "know",
		  "startTime": 19.1,
		  "endTime": 19.3,
		  "duration": 0.1999999999999993
		},
		{
		  "word": "enough",
		  "startTime": 19.3,
		  "endTime": 19.5,
		  "duration": 0.1999999999999993
		},
		{
		  "word": "of",
		  "startTime": 19.5,
		  "endTime": 19.9,
		  "duration": 0.3999999999999986
		},
		{
		  "word": "hate",
		  "startTime": 19.9,
		  "endTime": 20.4,
		  "duration": 0.5
		},
		{
		  "word": "to",
		  "startTime": 20.4,
		  "endTime": 20.9,
		  "duration": 0.5
		},
		{
		  "word": "say",
		  "startTime": 20.9,
		  "endTime": 21.2,
		  "duration": 0.3000000000000007
		},
		{
		  "word": "that",
		  "startTime": 21.2,
		  "endTime": 21.5,
		  "duration": 0.3000000000000007
		},
		{
		  "word": "for",
		  "startTime": 21.5,
		  "endTime": 21.8,
		  "duration": 0.3000000000000007
		},
		{
		  "word": "Destruction",
		  "startTime": 21.8,
		  "endTime": 22.5,
		  "duration": 0.6999999999999993
		},
		{
		  "word": "ice",
		  "startTime": 22.5,
		  "endTime": 23.5,
		  "duration": 1
		},
		{
		  "word": "is",
		  "startTime": 23.5,
		  "endTime": 24.3,
		  "duration": 0.8000000000000007
		},
		{
		  "word": "also",
		  "startTime": 24.3,
		  "endTime": 24.7,
		  "duration": 0.3999999999999986
		},
		{
		  "word": "great",
		  "startTime": 24.7,
		  "endTime": 25.2,
		  "duration": 0.5
		},
		{
		  "word": "and",
		  "startTime": 25.2,
		  "endTime": 26.2,
		  "duration": 1
		},
		{
		  "word": "would",
		  "startTime": 26.2,
		  "endTime": 26.4,
		  "duration": 0.1999999999999993
		},
		{
		  "word": "suffice",
		  "startTime": 26.4,
		  "endTime": 26.8,
		  "duration": 0.40000000000000213
		}
	  ]
  };

let timestamps = timestampJSON.timestamps;
// console.log('timestamps: ', timestamps);



sentencesForFading.forEach(sentence=>{
	sentence.innerHTML = sentence.textContent.split(' ').map(word=>'<span class="faded-word">'+word+'</span>').join(' ');
	console.log("sentencesForFading.forEach");
	
});

let wordsForFading = document.querySelectorAll('.faded-word');



audio.addEventListener('ended', function(ev){
	console.log("audio Ended"); 
	document.querySelectorAll('.faded-word').forEach(word=>{
		word.classList.remove('faded-activated');
	});	
	wordIx = 0;
		 // ask user about re-playing the same song & other operations
});


audio.addEventListener('timeupdate', function(ev){
	
	
	var div_array = Array.from(wordsForFading); // converts NodeList to Array

	let t = audio.currentTime;
	
	
	const result = timestamps.find(({startTime, endTime}) => t >= startTime && t <= endTime);
	
	
	if (result){
		console.log('Got result')
		console.log('result: ', result)
		console.log('wordIx: ', wordIx)
		console.log("Current time", t);
		console.log('div_array[wordIx].textContent: ', div_array[wordIx].textContent);

		let duration  = result.endTime - t;
		// console.log("delay", delay);

		// console.log('div_array[wordIx].style: ', div_array[wordIx].style);
		div_array[wordIx].classList.add('faded-activated')
		
		div_array[wordIx].style.transition = `opacity ${duration}s ease-in-out,  transform ${duration}s ease-in-out` 
		// div_array[wordIx].style.transitionDelay = delay;
		//.style.transitionDelay = "2s";
		// div_array[wordIx].style.transitionDuration = `${result.duration}s`;
		
		// div_array[wordIx].style.transition = `opacity ${result.duration}` 
		// console.log('result.duration: ', result.duration);
		// console.log('div_array[wordIx].style: ', div_array[wordIx].style);
		timestamps.shift();
		wordIx += 1;
		
	}	
});

audio.addEventListener('play', function(ev){
	console.log("audio started playing");
	// console.log(audio.currentTime);

});

// function startSentence(sentenceElement){
// 	console.log('startSentence');
// 	console.log(sentenceElement);
// 	if(!sentenceElement){
// 		return;
// 	}
// 	setTimeout(()=>{
// 		sentenceElement.querySelector('.faded-word').classList.add('faded-activated');	
// 	})
// }

document.querySelector('#Play').addEventListener('click', (e)=>{
	// e.target.blur();

	if (audio.paused){
		audio.play();
	}else{
		audio.pause();
	}
	
	

	// startSentence(document.querySelector('.faded-sentence'));


});


