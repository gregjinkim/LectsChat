Tracker.autorun(function() {
	Meteor.subscribe("classes");
	Meteor.subscribe("subscriptions", Meteor.userId());
	subscriptions = new Meteor.Collection("subscriptions");
});

Template.Roomlist.helpers({
	classes: function(){
		return classes.find({});
	},
	subscribed: function(){
		// Add if (Meteor.userId()) to make sure user is logged in
		var subs = subscriptions.findOne({subscriber: Meteor.userId()});
		if (subs && subs.subs.length) {
			for (var i = 0; i < subs.subs.length; i++) {
				if (subs.subs[i] === Template.currentData().name) {
					return true;
				} 
			}
			return false;
		}
		return false;
	}
});

Template.Roomlist.events = {	
	'click .class': function(){
		var className = event.target.innerHTML;
		Session.set("className", className);
		Meteor.call("updateActiveChatters", className, Meteor.user());
		Router.go('/Room');
	}
}