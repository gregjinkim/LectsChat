Template.input.events = {
  'submit form': function(event){
    event.preventDefault();

    if (Meteor.user()){
      var name = Meteor.user().profile.name;
    } else {
      var name = 'Anonymous';
    }

    var message = document.getElementById('message');

    if (message.value !== '') {
      messages.insert({
        name: name,
        message: message.value,
        time: Date.now(),
        className: Session.get("className")
      });

      document.getElementById('message').value = '';
      message.value = '';
    };
  }
}
