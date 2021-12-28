define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.count = ko.observable(0);
        self.handleClick = handleClick;

        function handleClick(type) {
            switch (type) {
                case 'add':
                    self.count(self.count() + 1);
                    break;
                case 'reduce':
                    self.count(self.count() - 1);
                    break;
                default:
                    break;
            }
        }
    }

    return ViewModel;
});
