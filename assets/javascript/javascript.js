var firebaseConfig = {
  apiKey: "AIzaSyBGpAVHn9V4n9mqI3sb34NB_VgsmL1-Tts",
  authDomain: "train-scheduler-fb834.firebaseapp.com",
  databaseURL: "https://train-scheduler-fb834.firebaseio.com",
  projectId: "train-scheduler-fb834",
  storageBucket: "",
  messagingSenderId: "522315562029",
  appId: "1:522315562029:web:e5c074f6a0ee1030"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

database.ref().on("child_added", function(snapshot) {
  var snapshot = snapshot.val();
  let trainName = snapshot.trainName;
  let destination = snapshot.destination;
  let firstTrainTime = snapshot.firstTrainTime;
  let frequency = snapshot.frequency;

  // add code to calculate train time
  var time = moment();
  var firstTrainCalc = moment(firstTrainTime, "HH:MM A").subtract(1, "years");
  var diff = moment().diff(moment(firstTrainCalc), "minutes");
  var left = diff % frequency;
  var minLeft = snapFreq - left;
  var arrivalTime = moment()
    .add(minLeft, "m")
    .format("HH:MM: A");

  let newRow = $("<tr>");
  $(newRow).append(`<td>${trainName}</td>`);
  $(newRow).append(`<td>${destination}</td>`);
  $(newRow).append(`<td>${frequency}</td>`);
  $(newRow).append(`<td>${nextArrival}</td>`);
  $(newRow).append(`<td>${minutesAway}</td>`);

  $("#data-goes-here").append(newRow);
});

function processEntry() {
  event.preventDefault();

  let trainName = $("#trainName")
    .val()
    .trim();
  let destination = $("#destination")
    .val()
    .trim();
  let firstTrainTime = $("#firstTrainTime")
    .val()
    .trim();
  let frequency = $("#frequency")
    .val()
    .trim();

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
    nextArrival: "",
    minutesAway: ""
  });
}

clear();

function clear() {
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");
}
