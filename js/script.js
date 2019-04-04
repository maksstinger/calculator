var display = document.getElementById('calcDisplay');
var calc = document.querySelector('.calc');
var numbers = document.querySelectorAll('.number');
var operations= document.querySelectorAll('.operation');
var clearData= document.querySelector('.clear');
var addToMemory= document.querySelector('.add_to_memory');
var displayCurrentNumber = 0;
var displayNextNumber = true;
var waitForOperation = '';
var localStorageOutput = document.querySelector('.display_local_storage');
var clearMemory = document.querySelector('.clear_memory');
var displayCurrentNumber = 0;
var displayNextNumber = true;
var waitForOperation = '';
for (var i = 0; i < numbers.length; i++) {
	var number = numbers[i];
	number.addEventListener('click', e => {
		numberPressed(e.target.textContent)
	});
}
for (var i = 0; i < operations.length; i++) {
	var operation = operations[i];
	operation.addEventListener('click', e => { 
		operatorPressed(e.target.textContent);
	});
}
function numberPressed(num) {
	if (displayNextNumber) {
		display.value = num;
		displayNextNumber = false;
	} else { 
		if (display.value === '0') {
		display.value = num;
	} else {
		display.value += num;
	}
}
}
function operatorPressed(symbol){
	var localOperationMemory = display.value;
	if (displayNextNumber && waitForOperation !== '=') {
		display.value = displayCurrentNumber;
	} else {
		displayNextNumber = true;
		if (waitForOperation === '+'){
			displayCurrentNumber += parseFloat(localOperationMemory);
		} else if (waitForOperation === '-'){
			displayCurrentNumber -= localOperationMemory;
		} else if (waitForOperation === '*'){
			displayCurrentNumber *= localOperationMemory;
		} else if (waitForOperation === '/'){
			displayCurrentNumber /= localOperationMemory;
		} else { 
			displayCurrentNumber = parseFloat(localOperationMemory);
		}
		display.value = displayCurrentNumber;
		waitForOperation = symbol;
	}
}
function clearMemoryStorage(){
window.localStorage.clear();
}
function clearDataPressed(clear){
	display.value = '0';
	displayNextNumber = true;
	displayCurrentNumber = 0;
	waitForOperation = '';
}
function addToMemoryPressed(){
	var lastNum = display.value;
	localStorage.setItem('savedNum', lastNum);
}
window.onload = function() {
	var recordedNum = localStorage.getItem('savedNum');
	localStorageOutput.value = recordedNum;
}
clearData.addEventListener('click', clearDataPressed);
addToMemory.addEventListener('click', addToMemoryPressed);
clearMemory.addEventListener('click', clearMemoryStorage);