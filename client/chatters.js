Tracker.autorun(function() {
	Meteor.subscribe("facebookinfo");
	Meteor.subscribe("usersonline");
	Meteor.subscribe("classes");
});

Template.chatters.helpers({
	classname: function() {
		return Session.get("className") + " students";
	},
	chatters: function(){
		if (classes.findOne({name: Session.get("className")})) {
			return classes.findOne({name: Session.get("className")}).activechatters;
		}
		
	},
	online: function(){	
		var userid = "" + this;
		if (Meteor.users.findOne({"_id": userid, "status.online": true})){
			return true;
		}
	},
	name: function(){
		var userid = "" + this;
		return Meteor.users.findOne({"_id": userid}).profile.name;
	},
	picture: function(){
		var userid = "" + this;
		return Meteor.users.findOne({"_id": userid}).services.facebook.picture;
	}
});

Template.chatters.events = {
	'click .chattername': function(event) {
		Session.set("profilename", event.target.innerHTML);
		Router.go('/Profile');		
	}
}