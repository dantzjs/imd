let appSelect = document.getElementsByClassName('select'); //Our graphic array
let frequenciesValues = []; // Values from select
let frequenciesActive = []; // Array of only frequencies active
let frequenciesSnaphot; //A "snapshot" to compare against frequenciesActive
let imd = []; // All intermodulation values
let terminal = document.getElementById('terminal-body'); // HTML Section for display log
let terminalRes = document.getElementById('terminal-message');
let titles; // Titles for good read :)
let errors = new Array();

//Get frequencies values and filter by actives
function getFrequencies() {
	errors = new Array();
	for (let i = 0; i < appSelect.length; i++) {
		frequenciesValues[i] = appSelect[i].options[appSelect[i].selectedIndex].value;
		frequenciesValues[i] = parseFloat(frequenciesValues[i]);

		if (frequenciesValues[i] > 0) {
			frequenciesActive[i] = frequenciesValues[i];
		}
	}
}

//Calculate intermodulation values for all possible combinations
function calculateIntermodulation(frequencies) {
	intermodulation = new Array((frequencies.length * (frequencies.length - 1)) / 2);
	k = 0;
	for (let i = 0; i < frequencies.length; i++) {
		for (let j = i + 1; j < frequencies.length; j++) {
			intermodulation[k++] = [ 
				frequencies[i] + 2 * frequencies[j], // F1 + 2F2
				2 * frequencies[i] + frequencies[j], // 2F1 + F2
				frequencies[i] - 2 * frequencies[j], // F1 - 2F2
				2 * frequencies[i] - frequencies[j]  // 2F1 - F2
			];
        }
        //let mensaje[i] = "Intermodulación F"
    }
	return intermodulation;
}

//Frequencies not be negative values, apply Absolute Value for fix it and convert in Mhz unit
function fixValues(frequencies) {
	for (let i = 0; i < frequencies.length; i++) {
		for (let j = 0; j < 4; j++) {
			frequencies[i][j] = Math.abs(frequencies[i][j]);
			frequencies[i][j] = Math.round(frequencies[i][j] * 10) / 10; //Round to 1 decimal value
		}
	}
	return frequencies;
}

//Create titles for good display log
function createTitles(frequencies) {
	title = new Array( (frequencies.length * (frequencies.length - 1) ) / 2),
	k = 0;
	for (let i = 0; i < frequencies.length; i++) {
		for (let j = i + 1; j < frequencies.length; j++) {
			title[k++] = '<strong class="terminal-title">' + "Mix F" + (i + 1) + "," + "F" + (j + 1) + '</strong>';
        }
    }
	return title;
}

function showIntermodulation(frequencies) {
	let html = '';
	let k = 0;
	for (let i = 0; i < frequencies.length; i++) {
		html += titles[k++] + '<br>'; 
		for (let j = 0; j < 4; j++) { 
			html += '<span id="value-' + i + '-'+ j +'" class="terminal-values">' + frequencies[i][j] + '</span>' + '<br>';
		}
	}
	terminal.innerHTML = html;
}

function showErrors() {
	let html;

	html = 'Calculated...';

	if (errors.length > 0) {
		html = '';
		for (let i = 0; i < errors.length; i++) {
			html += errors[i];
		}
	}

	terminalRes.innerHTML = html;
}
function addErrors(type, frequency, snapshot) {
	if (type == 1) {
		errors.push('<span class="error">' + " Intermodulation with " + frequency + '</span><br>');
	} else {
		errors.push('<span class="error">' + " Intermodulation with " + frequency + " and " + snapshot + '</span><br>');
	}	
}


function changeColor(frequencies, snap) {
	console.log(frequencies, snap);

	for (let i = 0; i < frequencies.length; i++) {
		frequencies[i] = frequencies[i]; //Fix
		for (let j = 0; j < snap.length; j++) {
				if (frequencies[i] == snap[j]) {
					document.getElementById('value-' + i + '-' + j).style.color = "red";
					
			}
				else if (frequencies[i] == snap[j] - 0.1 || frequencies[i] == snap[j] + 0.1) {
					document.getElementById('value-' + i + '-' + j).style.color = "red";
					//addErrors(2, frequencies[i], snap[j]);
				}
		}
	}
}

//Compare frequencies actives with all intermodulation frequencies for analize result
function compareFrequencies(frequencies, snap) {
	console.log(frequencies, snap);

	let checkedFrequencies = new Set();

	for (let i = 0; i < frequencies.length; i++) {
		frequencies[i] = frequencies[i]; //Fix
		for (let j = 0; j < snap.length; j++) {
			if (!checkedFrequencies.has(frequencies[i]) && !checkedFrequencies.has(snap[j])) {
				if (frequencies[i] == snap[j]) {
					checkedFrequencies.add(frequencies[i]).add(snap[j]);
					addErrors(1, frequencies[i]);
					
				}
				else if (frequencies[i] == snap[j] - 0.1 || frequencies[i] == snap[j] + 0.1) {
					addErrors(2, frequencies[i], snap[j]);
				}
			}
		}
	}

	console.log(checkedFrequencies);
	showErrors();
}

//Core function, execute all previous functions
function main() {
	getFrequencies();
	imd = calculateIntermodulation(frequenciesActive);
	imd = fixValues(imd);
	//frequenciesSnaphot = imd.flat(); //Create a snapshot of all frequencies, flattening imd array
	frequenciesSnaphot = [].concat.apply([], imd); //Use this instead flat() function on Mozilla Ver. < 62
	titles = createTitles(frequenciesActive);
	showIntermodulation(imd);
	compareFrequencies(frequenciesActive, frequenciesSnaphot);
	changeColor(frequenciesActive, frequenciesSnaphot);
}
