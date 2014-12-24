Template.nav.events = {
	'click #home': function() {
		Session.set("exitRoom", true);
		Router.go('/Index');
	},
	'click #room': function() {
		var userid = Meteor.userId();
		var subs = subscriptions.findOne({subscriber: userid});
		var currentdate = new Date();

		var time;
		if (currentdate.getMinutes < 10) {
			time = currentdate.getHours() + "0" + currentdate.getMinutes();
		} else {
			time = currentdate.getHours() + "" + currentdate.getMinutes();
		}

		if (subs && subs.subs.length) {// add time test
			var className;
			for (var i = 0; i < subs.subs.length; i++) {
				var name = subs.subs[i];
				var clas = classes.findOne({ name: name });
				if (clas) {
					if (parseInt(clas.starttime) <= parseInt(time) 
						&& parseInt(clas.endtime) > parseInt(time)) {

							className = clas.name;
				}
				}
				
			}
			if (className) {
				Session.set("className", className);
				Meteor.call("updateActiveChatters", className, userid);
				Router.go('/Room');
			}
		}
	}
}