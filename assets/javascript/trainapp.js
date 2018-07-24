$('document').ready(function () {

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyCqAZ67dimCUJVoDa5rPdHm5HkinOgZC3U",
		authDomain: "fir-hw-af841.firebaseapp.com",
		databaseURL: "https://fir-hw-af841.firebaseio.com",
		projectId: "fir-hw-af841",
		storageBucket: "fir-hw-af841.appspot.com",
		messagingSenderId: "330770599979"
	};
	firebase.initializeApp(config);



	//store the data form the database in a variable
	var database = firebase.database();

	// Initial Values
	var name = "";
	var destination = "";
	var firstTrain = "03:30";


	//from the guide
	// First Time (pushed back 1 year to make sure it comes before current time)
	//var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	//console.log(firstTimeConverted);
	//==============================================================================

	var firstTrainLastYear = moment(firstTrain, "HH:mm").subtract(1, "years");

	console.log(firstTrainLastYear);

	var frequency = 0;


	// Capture Button Click
	$("#add-train").on("click", function (event) {

		//prevents page from refreshing
		event.preventDefault();


		// the logic for storing and retrieving the train info
		// Don't forget to provide initial data to your Firebase database. (see lines 140-143)
		name = $("#name-input").val().trim();
		destination = $("#destination-input").val().trim();
		firstTrain = $("#start-input").val().trim();
		frequency = $("#frequency-input").val().trim();


		//organize the way our info will be pushed to the sever
		database.ref().push({

			name: name,
			destination: destination,
			firstTrain: firstTrain,
			frequency: frequency,
			dateAdded: firebase.database.ServerValue.TIMESTAMP
		});

		//clears the input box for the next suggestion
		$("#name-input").val(" ");
		$("#destination-input").val(" ");
		$("#start-input").val(" ");
		$("#frequency-input").val(" ");

	});

	//code and explanation taken from recent-user-with-all-users-solved.html
	// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
	database.ref().on("child_added", function (childSnapshot) {

		// Log everything that's coming out of snapshot
		console.log(childSnapshot.val().name);
		console.log(childSnapshot.val().destination);
		console.log(childSnapshot.val().firstTrain);
		console.log(childSnapshot.val().frequency);





		// console.log(start.format());

		//save all the values to a variable

		name = (childSnapshot.val().name);
		destination = (childSnapshot.val().destination);
		firstTrain = (childSnapshot.val().firstTrain);
		frequency = (childSnapshot.val().frequency);
		var next = 0;
		var minAway = 0;
		var timeNow = 0;


		//this splits the user input into an array with [HH, mm]
		// var timeArr = firstTrain.split(":");

		// console.log(timeArr);


		//this gives the moment the values from time array as the user input time
		// var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);


		// console.log(trainTime.format("HH:mm"));
		// 
		// trainTime.format("HH:mm");


		console.log("next arrival " + nextArrivalTime);
		// console.log("nextarrival" + nextArrival);



		//get current time
		var currentTime = moment();


		//find the difference between then and now
		var timeDifference = currentTime.diff(firstTrainLastYear, "minutes");



		var remainderTime = (timeDifference % frequency);

		var minAway = (frequency - remainderTime);

		var nextArrivalTime = currentTime.add(minAway, "minutes").local().format("HH:mm");


		//call getnext..function to wherever i am pulling the data from:

		// function getNextArrivalMoment(trainTime, currentTime, frequency) {
		// 	var timeDifference = currentTime.diff(trainTime, "minutes");


		// 	// moment().add(timeDifference, 'minutes');

		// 	var remainderTime = (timeDifference % frequency);

		// 	var minAway = (frequency - remainderTime);

		// 	console.log(frequency - remainderTime);

		// 	console.log("minutes away " + minAway);

		// 	return (currentTime.add(minAway, "minutes").local().format("HH:mm"));

		// }




		// current time 12:00 train 10:00 
		// timedifference = 120
		// 8: 00 8: 13 8: 26 8: 39 8: 52 9: 05


		// Add each train's data into the table
		$("#train-table > tbody").prepend("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + firstTrain + "</td><td>" + frequency + "</td><td>" + nextArrivalTime + "</td><td>" + minAway + "</td></tr>");




		// Handle the errors
	}, function (errorObject) {
		console.log("Errors handled: " + errorObject.code);
	});


	//adiing a clock widget to show current time
	//from here since i can't seem to get my jquery to work
	//https://codepen.io/ValyTGV/pen/NAXwyQ


	window.setInterval(ut, 1000);

	function ut() {
		var d = new Date();
		document.getElementById("time").innerHTML = d.toLocaleTimeString('en-US', { hour12: false });
		document.getElementById("date").innerHTML = d.toLocaleDateString();


		//i want to put these last two in jquery form but these next two lines are not working
		// $("#time").innerHTML = d.toLocaleTimeString();
		// $("#date").text = d.toLocaleDateString();		

	}








});


