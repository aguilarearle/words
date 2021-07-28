
const speech = require('@google-cloud/speech');

const client = new speech.SpeechClient();
lyricData = require('./stgeorge_phrases.json');

async function syncRecognize(
    filename,
    encoding,
    sampleRateHertz,
    languageCode
  ) {
 
    const fs = require('fs');
  
    const config = {
      encoding: encoding,
      sampleRateHertz: sampleRateHertz,
      languageCode: languageCode,
      enableWordTimeOffsets: true,
    //   audioChannelCount: 2,      
    };
    const audio = {
      content: fs.readFileSync(filename).toString('base64'),
    };
  
    const request = {
      config: config,
      audio: audio,
    };
  
    let timestamps = []
    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    console.log('response: ', response);    
    console.log('response.results[0]: ', response.results[0]);
    console.log('response.results[1]: ', response.results[1]);
    console.log('response.results[0].alternatives[0].words: ', response.results[0].alternatives[0].words);
    response.results[1].alternatives[0].words.forEach(wordInfo => {
        // NOTE: If you have a time offset exceeding 2^32 seconds, use the
        // wordInfo.{x}Time.seconds.high to calculate seconds.
        const startSecs =
          `${wordInfo.startTime.seconds}` +
          '.' +
          wordInfo.startTime.nanos / 100000000;
        const endSecs =
          `${wordInfo.endTime.seconds}` +
          '.' +
          wordInfo.endTime.nanos / 100000000;
        console.log(`Word: ${wordInfo.word}`);
        console.log(`\t ${startSecs} secs - ${endSecs} secs`);
        timestamps.push({
            'word': wordInfo.word, 
            'startTime': parseFloat(startSecs), 
            'endTime': parseFloat(endSecs), 
            'duration': endSecs-startSecs,
        })
      });
    
    console.log('timestamps: ', timestamps);
    let timeStampJSON = {'timestamps': timestamps}
    console.log('timeStampJSON: ', timeStampJSON);
    let data = JSON.stringify(timeStampJSON, null, 2);
    fs.writeFileSync('Mary_Had_a_Little_Lamb.json', data);
    // const transcription = response.results
    //   .map(result => result.alternatives[0].transcript)
    //   .join('\n');
    // console.log('Transcription: ', transcription);
    // [END speech_transcribe_sync]
  }

//   syncRecognize("./music/tiff_example.wav","LINEAR16", 48000, 'en-US');

    


async function longRunningRecognize(
    gcsUri,
    encoding,
    sampleRateHertz,
    languageCode
){

    
    const fs = require('fs');

    const speechContext = {
        phrases: lyricData,
    };

    console.log(lyricData);

    const config = {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
        enableWordTimeOffsets: true,
        audioChannelCount: 1,   
        speechContexts: [speechContext],   
    };
      
    const audio = {
        uri: gcsUri,
    };
      
    const request = {
        config: config,
        audio: audio,
    };

    let timestamps = []


    // Detects speech in the audio file. This creates a recognition job that you
    // can wait for now, or get its result later.
    const [operation] = await client.longRunningRecognize(request);
    // Get a Promise representation of the final result of the job
    const [response] = await operation.promise();

    const transcription1 = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    
    console.log(`Transcription 1 : ${transcription1}`);

    response.results
        .forEach(result => {
            result.alternatives[0].words.forEach(wordInfo => {
                // NOTE: If you have a time offset exceeding 2^32 seconds, use the
                // wordInfo.{x}Time.seconds.high to calculate seconds.
                const startSecs =
                  `${wordInfo.startTime.seconds}` +
                  '.' +
                  wordInfo.startTime.nanos / 100000000;
                const endSecs =
                  `${wordInfo.endTime.seconds}` +
                  '.' +
                  wordInfo.endTime.nanos / 100000000;
                console.log(`Word: ${wordInfo.word}`);
                console.log(`\t ${startSecs} secs - ${endSecs} secs`);
                timestamps.push({
                    'word': wordInfo.word, 
                    'startTime': parseFloat(startSecs), 
                    'endTime': parseFloat(endSecs), 
                    'duration': endSecs-startSecs,
                })
              });
        });
        console.log('timestamps: ', timestamps);
        let timeStampJSON = {'timestamps': timestamps}
        console.log('timeStampJSON: ', timeStampJSON);
        let data = JSON.stringify(timeStampJSON, null, 2);
        fs.writeFileSync('stmarys_tt.json', data);

}


let url = "gs://words_bucket_1/earle_1.wav"
longRunningRecognize(url, "LINEAR16", 44100, 'en-US')
// URL: 
  
