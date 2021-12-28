define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel(todo) {
        var self = this;
        self.checked = ko.observable(todo.checked);
        self.content = ko.observable(todo.content);
        self.remove = remove;

        function remove() {
            if (todo.remove && typeof todo.remove === 'function') {
                todo.remove(todo.id);
            }
        }

    }

    return ViewModel;
});
