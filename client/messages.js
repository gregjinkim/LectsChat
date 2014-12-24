Tracker.autorun(function() {
	Meteor.subscribe("messages");
	messages = new Meteor.Collection("messages");
});

Template.messages.helpers({
  messages: function(){
  	var className = Session.get("className");
    return messages.find({className: className}, {sort: {time: 1}} );
  }
})
