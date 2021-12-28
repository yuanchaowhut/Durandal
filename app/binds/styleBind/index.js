define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.ratio = ko.observable(1.0);
        self.handleExpand = handleExpand;
        self.handleShrink = handleShrink;

        function handleExpand() {
            var ratio = self.ratio() + 0.2;
            self.ratio(ratio);
        }

        function handleShrink() {
            var ratio = self.ratio();
            if (ratio <= 1.0) {
                console.log('不能再缩小啦');
                return;
            }
            self.ratio(self.ratio() - 0.2);
        }
    }

    return ViewModel;
});
