if (Meteor.isClient) {
  Meteor.subscribe("users");
}

var NameTrieNode = function() {
    var that = Object.create(NameTrieNode.prototype);
    // An array of child NameTries, indexed by a letter in the name.
    var children = [];
    // True if the ancestors of this Trie creates a valid name.
    var end = false;

   /**
     * Add a list of words to the TrieNode.
     * @param {array} words - The list of words to add.
     */
    that.insertAllCurrentUsers = function() {
        words.forEach(function(element) {
            that.insert(element);
        });
    }

    /**
     * Insert a name into the NameTrie.
     * Precondition: names are in lowercase form.
     * @param {String} name - The name to insert, in lowercase form.
     */
    that.insert = function(name) {
        // Finished inserting the name, so we should mark the end as true.
        if (name === "") {
            end = true;
            return;
        }
        var firstChar = name.charAt(0);
        // If the first character does not already exist in the list of children,
        // create a new NameTrie for the character.
        if (children[firstChar] === undefined) {
            children[firstChar] = new NameTrieNode();
        }

        if (name.length === 1) {
            // We are done adding the friend, make sure the next NameTrieNode is marked as end.
            children[firstChar].insert("");
        } else {
            // Recursively add the rest of the friend to the child.
            children[firstChar].insert(name.substring(1, name.length));
        }
    }

    /**
     * Return a list of names, sorted lexicographically, that match the prefix.
     * @param {String} prefix - The prefix to match.
     * @param {Number} index - The index of the prefix we are on. Default 0 if unspecified.
     */
    that.getMatchedNames = function(prefix, index) {
        // If the index is not specified, set it to the beginning of the prefix.
        index === undefined ? index = 0 : index = index;

        // If there is no prefix, do not return anything.
        if (prefix.length === 0) {
            return [];
        }

        var child = children[prefix.charAt(index)];
        if (child === undefined) {
            // There are no names with this prefix.
            return [];
        } else {
            // Recursively call autocomplete on the NameTrieNode of the current character.
            if (index === prefix.length - 1) {
                // Finished matching the prefix, so return all names at this point.
                return child.getAllNames(prefix).sort();
            } else {
                // Increase the index and continue matching the prefix.
                return child.getMatchedNames(prefix, index + 1).sort();
            }
        }
    }

    /**
     * Return a list of all the names, not necessarily in lexicographic order, stored in this NameTrieNode
     * @param {String} nameBuilder - The current name being built. Default "" if nothing specified.
     */
    that.getAllNames = function(nameBuilder) {
        // If the nameBuilder is not specified, set it to the empty string.
        nameBuilder === undefined ? nameBuilder = "" : nameBuilder = nameBuilder;

        // The list of names.
        var names = [];

        if (end) {
            // nameBuilder currently is a name - add to the list.
            names.push(nameBuilder);
        }

        // EXAMPLE USE OF FUNCTIONALS.
        // Instead of iterating through the children using a for loop, I am making use
        // of Objects.keys(children) and writing a reduce method.
        return Object.keys(children).reduce(
            function(prev, current) {
                // Recursively add all the names of the children to the names list.
                return prev.concat(children[current].getAllNames(nameBuilder + current));
            },
            names);
    }

    Object.freeze(that);
    return that;
};


// friends = ["Melissa Chapman", "Jin Pan"];

Template.searchBox.created = function() {
	this.resultsList;
	this.max_friends = 10; // Show a maximum of 10 friends.
             this.firstNames = new NameTrieNode();
             this.lastNames = new NameTrieNode();
             var self = this;
            self.friendNames = new ReactiveVar([]);

            Meteor.call('getMarauderFriends', function(err, data) {
              if (err) {
                console.log(err);
              } else {
                self.friendNames.set(data);
              }
            });

            console.log("~get~" + self.friendNames.get().length);
	// var self = this;
	// self.friends = new ReactiveVar([]);

	// console.log("~~");
	// this.firstNames.insert("bob");
	// console.log(this.firstNames.getAllNames());
	// console.log(this.lastNames);
	// console.log("~~");

             this.firstNames.insert("Melissa");
             this.lastNames.insert("Chapman");
             this.firstNames.insert("Jin");
             this.lastNames.insert("Pan");
};


var populateTries = function() {
	// console.log("populating tries");

            // Template.instance().friendNames.get().forEach(function(friend) {
            //         name = friend.toLowerCase().split(" ");
            //         firstNames.insert(name[0]);
            //         lastNames.insert(name[1]);
            // });
	// console.log("~~finished populating tries::");
	// console.log(self.friends.get());


	// console.log(firstNames.getAllNames());
	// console.log(lastNames.getAllNames());

            // console.log("populating tries");
            // friends.forEach(function(friend) {
            //         console.log("friend: " + friend);
            //         name = friend.toLowerCase().split(" ");
            //         firstNames.insert(name[0]);
            //         lastNames.insert(name[1]);
            // });

            // console.log("hmm" + firstNames.getAllNames().length + "  " + lastNames.getAllNames().length);
}

var clearList = function() {
	Template.instance().resultsList.innerHTML = '';
};

var matchNames = function(prefix) {
	matchedFirstNames = Template.instance().firstNames.getMatchedNames(prefix);
	for (i = 0; i < Template.instance().max_friends && i < matchedFirstNames.length; ++i) {
	  	  appendName(matchedFirstNames[i]);
	}
};

var appendName=  function(name) {
    	var li = document.createElement('li');
    	li.innerHTML = name;
    	Template.instance().resultsList.appendChild(li);
};

Template.searchBox.events({
	'keyup input': function(event) {
		console.log("derp " + event.target.value);

		//TODO: change to check if this number is equal to number of marauder friends
		if (Template.instance().firstNames.getAllNames().length === 0
                                        || Template.instance().lastNames.getAllNames().length === 0) {
			populateTries();
		}

		if (!Template.instance().resultsList) {
			Template.instance().resultsList = document.getElementById('results-list');
		}

		clearList();
		matchNames(event.target.value);
	}
});	
