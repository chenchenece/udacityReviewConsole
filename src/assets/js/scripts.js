/*################
 *GLOBAL VARIABLES
 */
var refreshInterval = 10*60*1000; // 10 minutes in milliseconds
var updateInterval = 3*60*1000; // 3 minutes in milliseconds
var updateTimer;
var refreshTimer;
//################

/*################
 *ENTRY POINT
 */

$(function(){
  $("#request_refresh").on("click", refreshRequest);
  $("#new_request").on("click", requestNew);
  $("#notification_bar i").on("click", function(){
    $("#notification_bar").slideUp('fast');
  })
  setUpdateTimer();
  setRefreshTimer();
});

//##################
/**
 *Timer functions to automatically update submission requests
 */

function setUpdateTimer(){
  updateTimer = setInterval(updateRequest, updateInterval);
}

function removeUpdateTimer(){
  clearInterval(updateTimer);
}

function resetUpdateTimer(){
  removeUpdateTimer();
  setUpdateTimer();
}

//##################
/**
 *Timer functions to automatically update submission requests
 */

 function setRefreshTimer(){
   refreshTimer = setInterval(refreshRequest, refreshInterval);
 }

 function removeRefreshTimer(){
   clearInterval(refreshTimer);
 }

 function resetRefreshTimer(){
   removeRefreshTimer();
   setRefreshTimer();
 }

/*
 *Get an update on the submission request
 */
function updateRequest(){
  console.log("Updating Submission Request.");

  var id = $("#request_id").val();
  $.ajax({
    type: "GET",
    url: 'ajax/request',
    data: {requestId: id},
    success: onUpdateRequest,
  });
}

function onUpdateRequest(data){
  data = $.parseJSON(data);
  data.updated_at = new Date();
  update(data);
  if(data.status != 'available'){
    if(data.status == 'fulfilled'){
      $("#notification_bar").slideDown('fast');
    }
    requestNew();
  }  else {
    resetUpdateTimer();
    requestPosition();
  }
}

/*
 *Refresh the submission request so that it does not close
 */
function refreshRequest(){
  console.log("Refreshing Submission Request.");

  var id = $("#request_id").val();
  $.ajax({
    type: "GET",
    url: 'ajax/refresh',
    data: {requestId: id},
    success: onRefreshRequest,
  });
}

function onRefreshRequest(data){
  data = $.parseJSON(data);
  update(data);
  if(data.status != 'available'){
    if(data.status == 'fulfilled'){
      $("#notification_bar").slideDown('fast');
    }
    requestNew();
  }  else {
    resetRefreshTimer();
    resetUpdateTimer();
    requestPosition();
  }
}

/*
 *Get the position of the current submission request
 */

function requestPosition(){
  var id = $("#request_id").val();
  $.ajax({
    type: "GET",
    url: 'ajax/position',
    data: {position: id},
    success: onPosition,
  });
}


function onPosition(data){
  data = $.parseJSON(data);
  console.log(data);
  $('#request_position').html("\t"+data[0].position);
}

/*
 *Create a new submission request
 */

function requestNew(){
  $.ajax({
    type: "GET",
    url: 'ajax/new',
    success: onNew
  });
}

function onNew(data){
  data = $.parseJSON(data);
  console.log(data);
  if(data.id != undefined){
    resetUpdateTimer();
    resetRefreshTimer();
    update(data);
    $('#request_position').html("\t--");
  }
}

/**
 *Update elements on screen
 */

 function update(data){
   if(data.id != undefined){
     $('#request_id').val(data.id);
   }
   $('#request_status').html("\t"+ data.status);

   var lastUpdated = new Date(data.updated_at);
   var options = {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit"
   };
   lastUpdated = lastUpdated.toLocaleTimeString('en-US', options);

   $('#last_updated').html("\t"+ lastUpdated);
 }
