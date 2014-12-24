Tracker.autorun(function() {
	Meteor.subscribe("facebookinfo");
	Meteor.subscribe("users");
});

Template.profile.helpers({
	picture: function() {
		if (Session.get("profilename")) {
			return Meteor.users.findOne({"profile.name": Session.get("profilename")}).profile.picture;	
		}
	},
	name: function() {
		if (Session.get("profilename")) {
			return Meteor.users.findOne({"profile.name": Session.get("profilename")}).profile.name;	
		}
	}
})