Router.route('/', {
	path: '/',
	action: function() {
		var userid = Meteor.userId();
		var subs = subscriptions.findOne({subscriber: userid});
		var currentdate = new Date();

		var time;
		if (currentdate.getMinutes < 10) {
			time = currentdate.getHours() + "0" + currentdate.getMinutes();
		} else {
			time = currentdate.getHours() + "" + currentdate.getMinutes();
		}
		
		var inClass = false;
		if (subs && subs.subs.length) {// add time test
			var className;
			for (var i = 0; i < subs.subs.length; i++) {
				var name = subs.subs[i];
				var clas = classes.findOne({ name: name });
				if (clas) {
					if (parseInt(clas.starttime) <= parseInt(time) 
						&& parseInt(clas.endtime) > parseInt(time)) {
							className = clas.name;
							inClass = true;
					}
				}	
			}
			if (className && !Session.get("goIndex")) {
				Session.set("className", className);
				Session.set("goIndex", true);
				Meteor.call("updateActiveChatters", className, userid);
				Router.go('/Room');
			} 
		}
		if (!inClass || Session.get("goIndex")) {
			this.render('Index');
		}
	}
});

Router.route('/classlist');

Router.route('/roomlist');

Router.route('/Room');

Router.route('/profile');

Router.onStop(function(){
	var className = Session.get("className");
	Meteor.call("exitRoom", className, Meteor.user())}, 
	{ only: ['Room'] });
