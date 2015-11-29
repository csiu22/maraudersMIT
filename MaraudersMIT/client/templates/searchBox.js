Template.searchBox.created = function() {
	this.resultsList;
	this.max_friends = 10; // Show a maximum of 10 friends.
	this.firstNames = new NameTrieNode();
	this.lastNames = new NameTrieNode();

	this.firstNames.insert("Jin");
	this.firstNames.insert("Jill");
};

var clearList = function() {
	Template.instance().resultsList.innerHTML = '';
};

var matchNames = function(prefix) {
	matchedNames = Template.instance().firstNames.getMatchedNames(prefix);
	for (i = 0; i < Template.instance().max_friends && i < matchedNames.length; ++i) {
	  	  appendName(matchedNames[i]);
	}
};

var appendName=  function(name) {
    	var li = document.createElement('li');
    	li.innerHTML = name;
    	Template.instance().resultsList.appendChild(li);
};

Template.searchBox.events({
	'keyup input': function(event) {
		if (!Template.instance().resultsList) {
			Template.instance().resultsList = document.getElementById('results-list');
		}
		clearList();
		matchNames(event.target.value);
	}
});	