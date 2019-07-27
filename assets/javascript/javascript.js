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
  var trainName = snapshotChild.trainName;
  var destination = snapshotChild.destination;
  var firstTrainTime = snapshotChild.firstTrainTime;
  var frequency = snapshotChild.frequency;

  // add code to calculate train time
  var nextArrival;
  var minLeft;
  var firstTrainCalc = moment(
    snapshotChild.val().firstTrainTime,
    "HH:MM A"
  ).subtract(1, "years");
  var diff = moment().diff(moment(firstTrainCalc), "minutes");
  var left = diff % snapshotChild.val().frequency;
  var minLeft = snapshotChild.val().frequency - left;
  var arrivalTime = moment().add(minLeft, "m");
  arrivalTime = moment(arrivalTime).format("HH:MM: A");

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

  database.ref().push({
    trainName: $("#trainName")
      .val()
      .trim(),
    destination: $("#destination")
      .val()
      .trim(),
    firstTrainTime: $("#firstTrainTime")
      .val()
      .trim(),
    frequency: $("#frequency")
      .val()
      .trim()
  });
}

clear();

function clear() {
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");
}
