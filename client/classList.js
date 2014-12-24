Tracker.autorun(function() {
	Meteor.subscribe("classes");
	classes = new Meteor.Collection("classes");
});

Template.Classlist.helpers({
	classes: function(){
		return classes.find({});
	},
});

Template.newClass.events = {
	'submit form': function(event){
		event.preventDefault();

		var courseAbbrev = document.getElementById("courseabbrev").value;
		courseAbbrev = courseAbbrev.toUpperCase();
		var courseNumber = document.getElementById("coursenumber").value;
		var hourstart = document.getElementById("hourstart").value;
		var minutestart = document.getElementById("minutestart").value;
		var hourend = document.getElementById("hourend").value;
		var minuteend = document.getElementById("minuteend").value;

		if (courseAbbrev.match(/^[A-Z]{3,5}$/) && courseNumber.match(/^[0-9]{3}$/)
			&& hourstart.match(/^1?[0-9]$/) && minutestart.match(/^[0-5]{2}/)
			&& hourend.match(/^1?[0-9]$/) && minuteend.match(/^[0-5]{2}/)) {
			
			var className = courseAbbrev + " " + courseNumber;
			var starttime = hourstart + minutestart;
			if (document.getElementById("pmstart").checked) {
				starttime = parseInt(starttime) + 1200;
			}
			var endtime = hourend + minuteend;
			if (document.getElementById("pmend").checked) {
				endtime = parseInt(endtime) + 1200;
			}	
			Meteor.call("insertClass", className, starttime, endtime);

			document.getElementById("courseabbrev").value = "";
			document.getElementById("coursenumber").value = "";
			document.getElementById("hourstart").value = "";
			document.getElementById("minutestart").value = "";
			document.getElementById("hourend").value = "";
			document.getElementById("minuteend").value = "";
			document.getElementById("amstart").checked = true;
			document.getElementById("amend").checked = true;
		}
		return false;
	}
};

Template.Classlist.events = {	
	'click .class': function(){
		var className = event.target.innerHTML;
		var subscriber = Meteor.userId();	
		// Add if (Meteor.userId()) to make sure user is logged in
		var subs = subscriptions.findOne({subscriber: Meteor.userId()});
		if (subs) {
			Meteor.call("updateSubs", className, subscriber);
		} else {
			Meteor.call("insertSubs", className, subscriber);	
		}
	}
};	




