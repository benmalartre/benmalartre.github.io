
var audioContext;
var masterGainNode;

var audioInitialized = false;

var midiNotes ={
'C1' : 33,'C#1': 35,'D1' : 37,'D#1': 39,'E1' : 41,'F1' : 44,'F#1': 46,'G1' : 49,'G#1': 52,'A1' : 55,'A#1': 58,'B1' : 62,
'C2' : 65,'C#2': 69,'D2' : 73,'D#2': 78,'E2' : 82,'F2' : 87,'F#2': 93,'G2' : 98,'G#2': 104,'A2' : 110,'A#2': 117,'B2' : 124,
'C3' : 131,'C#3': 139,'D3' : 147,'D#3': 156,'E3' : 165,'F3' : 175,'F#3': 185,'G3' : 196,'G#3': 208,'A3' : 220,'A#3': 233,'B3' : 247
};

//var audioNotes = ['D2','B2','A2','G2','D2','D2','B2','A2','G2','E2','E2','E2','C3','B2','A2','E3','E3','D3'];
// We Wish You a merry christmas

var audioNotes = [
	'G2','C3','C3','D3','C3','B2','A2','F2','F2','F2',
	'A2','D3','D3','E3','D3','C3','B2','G2','G2','G2',
	'B3','E3','E3','F3','E3','D3','C3','A2',
	'G2','G2','A2','D2','B2','C2'
]

var KickPattern = [true,false,false,false,true,false,false,false,true,false,false,false,true,false,false,false];
var SnarePattern = [false,false,true,false,false,false,true,true,false,false,true,false,false,false,true,true];

function Pattern(probability){
	this.Ts = new Array(16)
	this.probability = probability;
	for(var i=0;i<16;i++){
		if(Math.random()<probability)this.Ts[i] = true;
		else this.Ts[i] = false;
	};
	this.Update = function(){
		for(var i=0;i<16;i++){
			if(Math.random()<this.probability)this.Ts[i] = true;
			else this.Ts[i] = false;
		}
	};
	return this;
}
	
// Initialize AudioContext
try {
	
	// Fix up for prefixing
	window.AudioContext = window.AudioContext||window.webkitAudioContext;
	var audioContext = new AudioContext();

	// Create master gain node.
	masterGainNode = audioContext.createGain();
	masterGainNode.gain.value = 0.333;


	// Connect the gain node to the destination.
	masterGainNode.connect(audioContext.destination);

	// Initialized
	audioInitialized = true;
}
catch(e) {
	console.log('Web Audio API is not supported in this browser');
}



function CreateOscillator(type,freq){
	if(audioInitialized == true){

		// First Oscillator
		var oscil = audioContext.createOscillator();
		
		oscil.type = type;
		oscil.frequency.value = freq;
		oscil.start();
		
		return oscil;
		}
}

function LFO(param){
	this.lfo = audioContext.createOscillator();
	this.lfo.frequency.value = 0.5;
	this.lfo.type = "sine";

	this.lfoGain = audioContext.createGain();
	this.lfoGain.gain.value = 0.5;

	// this is the parameter that is going to be modulated
	this.gain = audioContext.createGain();
	this.gain.gain.value = 0.5;
	this.gain.connect(param);

	// Oscillators go from -1 to 1
	// Make it go from -0.5 to +0.5 by connecting it to a GainNode with a gain value of 0.5
	this.lfo.connect(this.lfoGain);

	this.lfoGain.connect(this.gain.gain);
	this.lfo.connect(this.gain.gain);
}

function Envelope(gain,attack,decay){
	var now = audioContext.currentTime
	gain.gain.setValueAtTime(gain.gain.value, now);
	gain.gain.linearRampToValueAtTime( 1.0, now + attack );
	gain.gain.linearRampToValueAtTime ( 0.0, now + attack+decay );
}

function Voice(type,frequency,gain){
	this.oscil = audioContext.createOscillator();
	this.envelope = audioContext.createGain();
		
	this.oscil.type = type;
	this.oscil.frequency.value = frequency;

	this.lfo = audioContext.createOscillator();
	this.lfo.frequency.value =Math.random(); // Hz, two times per second

	this.lfoGain = audioContext.createGain();
	this.lfoGain.gain.value = 0.5;

	// this is the parameter that is going to be modulated
	this.gain = audioContext.createGain();
	this.gain.gain.value = 0.5;
	this.gain.connect(gain);
	// Oscillators go from -1 to 1
	// Make it go from -0.5 to +0.5 by connecting it to a GainNode with a gain value of 0.5
	this.lfo.connect(this.lfoGain);

	// because the value of the gain.gain AudioParam is originaly 0.5, the value is added, and it will go from 0.0 to 1.0
	this.lfoGain.connect(this.gain.gain);
	this.lfo.connect(this.gain.gain);

	this.oscil.connect(this.envelope);
	this.envelope.connect(this.gain);
	this.oscil.start();
	this.lfo.start();
	
	return this;
}
function Kick(){
	this.oscil;
	this.gain;
	this.pattern = new Pattern(0.5);
	this.Init = function(){
		this.oscil = audioContext.createOscillator();
		this.oscil.frequency.value = Math.random()*50+50;
		this.oscil.type = "sine";
		this.gain = audioContext.createGain();

		this.oscil.connect(this.gain);
		this.gain.connect(masterGainNode);

		var now = audioContext.currentTime;
		
		this.oscil.frequency.setValueAtTime(150, now);
		this.gain.gain.setValueAtTime(1, now);
		//this.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
		this.oscil.frequency.exponentialRampToValueAtTime(0.01, now + 0.5);
		this.gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

		this.oscil.start(now);
		//this.oscil.stop(now + 0.5);
	}
	this.Update = function(T){
		if(this.pattern.Ts[T]==true){
			var now = audioContext.currentTime;

			this.oscil.frequency.setValueAtTime(Math.random(50)+120, now);
			this.gain.gain.setValueAtTime(1, now);
			//this.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
			this.oscil.frequency.exponentialRampToValueAtTime(0.01, now + 0.5);
			this.gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
		}
	}
	return this;
}

function Snare(){
	this.noise;
	this.gain;
	this.pattern = new Pattern(0.5);
	this.noiseBuffer = function() {
		var bufferSize = audioContext.sampleRate;
		var buffer = audioContext.createBuffer(1, bufferSize, bufferSize);
		var output = buffer.getChannelData(0);

		for (var i = 0; i < bufferSize; i++) {
			output[i] = Math.random() * 2 - 1;
		}

		return buffer;
	};

	this.Init = function(){
		this.noise = audioContext.createBufferSource();
		this.noise.buffer = this.noiseBuffer();
		this.noise.loop = true;
		var noiseFilter = audioContext.createBiquadFilter();
		noiseFilter.type = 'lowpass';
		noiseFilter.frequency.value = 1000;
		noiseFilter.Q.value = 2.5;
		this.noise.connect(noiseFilter);
		
		this.noiseEnvelope = audioContext.createGain();
		noiseFilter.connect(this.noiseEnvelope);

		this.noiseEnvelope.connect(masterGainNode);

		this.osc = audioContext.createOscillator();
		this.osc.type = 'triangle';

		this.oscEnvelope = audioContext.createGain();
		this.osc.connect(this.oscEnvelope);
		this.oscEnvelope.connect(masterGainNode);

		var now = audioContext.currentTime;
		this.noiseEnvelope.gain.setValueAtTime(1, now);
		this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
		this.noise.start(now)

		this.osc.frequency.setValueAtTime(100, now);
		this.oscEnvelope.gain.setValueAtTime(0.7, now);
		this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
		this.osc.start(now)
	}
	this.Update = function(T){
		if(this.pattern.Ts[T]==true){
			var now = audioContext.currentTime;

			this.noiseEnvelope.gain.setValueAtTime(1, now);
			this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

			this.osc.frequency.setValueAtTime(100, now);
			this.oscEnvelope.gain.setValueAtTime(0.7, now);
			this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

			//this.osc.stop(time + 0.2);
			///this.noise.stop(time + 0.2);
		}
	}
	return this;
}

function Voicer(nb,frequency){
	this.noteID=0;
	this.voices = new Array(nb);
	this.nbvoices = nb;
	this.frequency = frequency
	this.gain;
	this.tick = 0;
	this.Init = function(){
		this.gain = audioContext.createGain();
		this.noiseFilter = audioContext.createBiquadFilter();
		this.noiseFilter.type = 'lowpass';
		this.noiseFilter.frequency.value = 666;
		this.gain.connect(this.noiseFilter);
		this.noiseFilter.connect(masterGainNode);
		this.gain.gain.value = 1	;
		
		for(var i=0;i<this.nbvoices;i++){
			this.voices[i] = new Voice("sine",frequency*(i+1),this.gain);
		}
	}
	this.Update = function(mx,my){
		this.tick++;
		var now = audioContext.currentTime;
		if(this.tick%5==0){
				
			this.noteID++;
			if(this.noteID>=audioNotes.length)this.noteID = 0;
			this.noiseFilter.frequency.value = Math.random()*1000+250;
			this.frequency = midiNotes[audioNotes[this.noteID]];//(1-Math.sin(this.tick*0.01))*10+33;//MidiNotes[Math.floor(Math.random()*12)];
			this.noiseFilter.Q.value = my*10+5;
			for(var i=0;i<this.nbvoices;i++){
				this.voices[i].oscil.frequency.value = this.frequency*(i+1);
				//this.voices[i].oscil.frequency.linearRampToValueAtTime(Math.random(100)+20, now + 5);
			}
		}
	}
}

function DrumMachine(){
	this.kick = new Kick();
	this.snare = new Snare();
	this.kick2 = new Kick();
	this.T = 0;
	this.lastT;
	this.tempo = 60 	;//bpm
	this.tick = 0;
	this.Init = function(){
		this.kick.Init();
		this.kick2.Init();
		this.snare.Init();
	}
	this.Update = function(){
		var t = audioContext.currentTime/60*this.tempo;	
		this.T = (Math.floor(t))%16;
		if(this.T!=this.lastT){
			this.tick++;
			this.kick.Update(this.T);
			this.kick2.Update(this.T);
			this.snare.Update(this.T);
		}
		this.lastT = this.T;
		if(this.tick%16==0){
			this.snare.pattern.Update();
			this.kick.pattern.Update();
			this.kick2.pattern.Update();
			//this.tempo = Math.floor((Math.random()+1)*5)*60;
		}
		
	}
}

