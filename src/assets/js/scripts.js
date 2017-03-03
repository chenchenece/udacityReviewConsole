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
  $("#request_refresh").on("click", refreshSubmissionRequest);
  $("#new_request").on("click", newSubmissionRequest);
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
  updateTimer = setInterval(updateSubmissionRequest, updateInterval);
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
   refreshTimer = setInterval(refreshSubmissionRequest, refreshInterval);
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
function updateSubmissionRequest(){
  console.log("Updating Submission Request.");

  var onUpdateRequest = function(data){
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
      positionOfSubmissionRequest();
    }
  };

  var id = $("#request_id").val();
  $.ajax({
    type: "GET",
    url: 'ajax/request',
    data: {requestId: id},
    success: onUpdateRequest,
  });
}


/*
 *Refresh the submission request so that it does not close
 */
function refreshSubmissionRequest(){
  console.log("Refreshing Submission Request.");
  var id = $("#request_id").val();

  var onRefreshRequest = function(data){
    data = $.parseJSON(data);
    update(data);
    if(data.status != 'available'){
      if(data.status == 'fulfilled'){
        $("#notification_bar").slideDown('fast');
      }
      requestNew();
    } else {
      resetRefreshTimer();
      resetUpdateTimer();
      positionOfSubmissionRequest();
    }
  };

  $.ajax({
    type: "GET",
    url: 'ajax/refresh',
    data: {requestId: id},
    success: onRefreshRequest,
  });
}

/*
 *Get the position of the current submission request
 */

function positionOfSubmissionRequest(){
  var id = $("#request_id").val();

  var onPosition = function(data){
    data = $.parseJSON(data);
    console.log(data);
    $('#request_position').html("\t"+data[0].position);
  };

  $.ajax({
    type: "GET",
    url: 'ajax/position',
    data: {requestId: id},
    success: onPosition,
  });
}

/*
 *Create a new submission request
 */

function newSubmissionRequest(){
  var onNew = function(data){
    data = $.parseJSON(data);
    console.log(data);
    if(data.id != undefined){
      resetUpdateTimer();
      resetRefreshTimer();
      update(data);
      $('#request_position').html("\t--");
    }
  };

  $.ajax({
    type: "GET",
    url: 'ajax/new',
    success: onNew
  });
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
