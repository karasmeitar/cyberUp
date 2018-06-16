function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
			clearInterval(timeinterval);
			$.ajax({
			url: "http://localhost:8081/api/candidate",
			type: "GET",
			crossDomain: true,
			contentType:"application/json",
			dataType: "json",
			success:function(result){
				if(result.status==='error'){
					$('.error').text(result.message);
					$('.error').show();
				}
				else{
					$('.cyb-winner').html('The winner is: \n'+result.message[0].first_name +' ' + result.message[0].last_name).wrap('<pre />');
					$('.cyb-title').hide();
					$('.cyb-winner').show();
				}
			},
			error:function(xhr,status,error){
					
			}
		});
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) +1000*60*5);
//var deadline = new Date(Date.parse(new Date()) + 20* 1000);
initializeClock('clockdiv', deadline);
$('.cyb-winner').click(function(){
			$.ajax({
			url: "http://54.82.120.46:8080/api/candidate",
			type: "GET",
			crossDomain: true,
			contentType:"application/json",
			dataType: "json",
			success:function(result){
				if(result.status==='error'){
					$('.error').text(result.message);
					$('.error').show();
				}
				else{
					
					$('.cyb-winner').html('The winner is: \n'+result.message[0].first_name +' ' + result.message[0].last_name).wrap('<pre />');
					$('.cyb-title').hide();
					$('.cyb-winner').show();
				}
			},
			error:function(xhr,status,error){
				
			}
		});

});
