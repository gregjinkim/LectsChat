Meteor.methods({
	insertClass: function(className, starttime, endtime) {
		classes.insert({
			name: className,
			activechatters: [],
			starttime: starttime,
			endtime: endtime
		});
	},
	updateSubs: function(className, userid) {
		
		var thiscourse = classes.findOne({name: className}, { fields: {
			'starttime': 1,
			'endtime': 1,
			}});
		var subs = subscriptions.findOne({subscriber: userid});
		var timeconflict = false;
		if (subs && subs.subs.length) {
			for (var i = 0; i < subs.subs.length; i++) {
				var course = classes.findOne({name: subs.subs[i]}, { fields: {
					'starttime': 1,
					'endtime': 1,
					}});

				if ((parseInt(thiscourse.starttime) < parseInt(course.starttime) 
					&& parseInt(thiscourse.endtime) > parseInt(course.starttime))
					|| (parseInt(thiscourse.starttime) < parseInt(course.endtime) 
					&& parseInt(thiscourse.endtime) > parseInt(course.endtime))) {

					timeconflict = true;
				}
			}
		}	
		if (!timeconflict) {
			subscriptions.update({subscriber: userid},
								 {$addToSet: {subs: className}});
		}
		
		

	},
	insertSubs: function(className, userid) {
		subscriptions.insert({subscriber: userid, subs: [className]});

	},
	updateActiveChatters: function(className, userid) {
		classes.update({name: className}, {$addToSet: {activechatters: userid}});
	},
	exitRoom: function(className, userid) {
		classes.update({name: className}, {$pull: {activechatters: userid}})
	},
	isThereClass: function(userid) {
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
							alert(className);
				}
				}
				
			}
			if (className) {
				Session.set("className", className);
				Meteor.call("updateActiveChatters", className, userid);
				return true;
			}
		}
		return false;
	}
})	
