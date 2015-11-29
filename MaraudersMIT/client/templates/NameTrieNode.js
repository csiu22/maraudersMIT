var NameTrieNode = function() {
    var that = Object.create(NameTrieNode.prototype);
    // An array of child NameTries, indexed by a letter in the name.
    var children = [];
    // True if the ancestors of this Trie creates a valid name.
    var end = false;

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
