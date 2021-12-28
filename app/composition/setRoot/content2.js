define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.imageUrl = ko.observable('/Durandal/css/images/programer.png');
    }

    return ViewModel;
});
