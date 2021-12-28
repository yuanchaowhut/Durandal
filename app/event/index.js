define(['./publisher', './subscriber'], function (publisher, subscriber) {
    function ViewModel() {
        var self = this;
        self.publisher = publisher;
        self.subscriber = subscriber;
    }

    return ViewModel
});
