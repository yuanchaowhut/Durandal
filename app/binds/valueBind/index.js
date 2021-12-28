define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {

    function ViewModel() {
        var self = this;
        self.content = ko.observable();
    }

    return ViewModel;
});
