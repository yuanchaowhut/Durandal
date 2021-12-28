define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.broadband = ko.observable();
        self.server = ko.observable();
        self.forbidden = ko.observable(true);
        self.toggle = toggle;

        function toggle() {
            var b = self.forbidden();
            self.forbidden(!b);
        }
    }

    return ViewModel;
});
