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

var trainName;
var destination;
var firstTrainTime;
var frequency = 0;

database.ref().on("child_added", function(snapshotChild) {
  var snapshot = snapshotChild.val();
  var trainName = snapshot.trainName;
  var destination = snapshot.destination;
  var firstTrainTime = snapshot.firstTrainTime;
  var frequency = snapshot.frequency;

  // add code to calculate train time
  var nextArrival;
  var minLeft;
  var firstTrainCalc = moment(
    snapshotChild.val().firstTrainTime,
    "hh:mm"
  ).subtract(1, "years");
  var diff = moment().diff(firstTrainCalc, "minutes");
  var left = diff % snapshotChild.val().frequency;
  var minLeft = snapshotChild.val().frequency - left;
  var arrivalTime = moment().add(minLeft, "m");
  arrivalTime = moment(arrivalTime).format("hh:mm A");

  let newRow = $("<tr>");
  $(newRow).append(`<td>${trainName}</td>`);
  $(newRow).append(`<td>${destination}</td>`);
  $(newRow).append(`<td>${frequency}</td>`);
  $(newRow).append(`<td>${arrivalTime}</td>`);
  $(newRow).append(`<td>${minLeft}</td>`);

  $("#data-goes-here").append(newRow);
});

function processEntry(event) {
  event.preventDefault();

  const trainName = $("#trainName")
    .val()
    .trim();
  const destination = $("#destination")
    .val()
    .trim();
  const firstTrainTime = $("#firstTrainTime")
    .val()
    .trim();
  const frequency = $("#frequency")
    .val()
    .trim();

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });
  clear();
}

function clear() {
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");
}
