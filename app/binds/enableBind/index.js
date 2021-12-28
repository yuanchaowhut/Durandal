define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.userName = ko.observable();
        self.password = ko.observable();
        self.editable = ko.observable(false);
        self.toggle = toggle;

        function toggle() {
            var b = self.editable();
            self.editable(!b);
        }
    }

    return ViewModel;
});
