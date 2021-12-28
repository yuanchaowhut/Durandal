define(['durandal/app', 'knockout'], function (app, ko) {
    function ViewModel() {
        var self = this;
        self.received = ko.observableArray([]);
        self.subscribe = subscribe;
        self.unsubscribe = unsubscribe;

        function subscribe() {
            app.on("app:sample:event").then(function (data) {
                if (data) {
                    var messages = self.received();
                    messages.push(data);
                    self.received(messages);
                }
            });
        }

        function unsubscribe() {
            app.off("app:sample:event");
        }
    }

    return ViewModel;
});
