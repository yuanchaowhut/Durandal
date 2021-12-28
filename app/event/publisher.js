define(['durandal/app', 'knockout'], function (app, ko) {
    function ViewModel() {
        var self = this;
        self.message = ko.observable();
        self.triggerEvent = triggerEvent;

        function triggerEvent() {
            app.trigger('app:sample:event', self.message());
        }
    }

    return ViewModel;
});
