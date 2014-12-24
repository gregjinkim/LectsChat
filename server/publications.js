Meteor.publish("messages", function() {
	return messages.find({});
});

Meteor.publish("classes", function() {
	return classes.find({}, { fields: {
		'name': 1,
		'activechatters': 1,
		'starttime': 1,
		'endtime': 1
	}});
});

Meteor.publish("subscriptions", function(userid) {
	return subscriptions.find({ subscriber: userid }, { fields: {
		'subscriber': 1,
		'subs': 1
	}});
});

Meteor.publish("usersonline", function() {
	return Meteor.users.find({ "status.online": true });
});

Meteor.publish("facebookinfo", function() {
	return Meteor.users.find({ _id: this.userId }, { fields: {
		'services.facebook.id': 1,
		'services.facebook.name': 1,
		'services.facebook.gender': 1,
		'services.facebook.picture': 1,
	}});
});