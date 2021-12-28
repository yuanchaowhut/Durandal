define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.count = ko.observable(0);
        self.handleClick = function () {
            self.count(self.count() + 1);
        };

        self.fruits = ko.observableArray([
            {sku: 1001, name: '苹果', price: 6.0, selected: ko.observable(false)},
            {sku: 1002, name: '香蕉', price: 3.0, selected: ko.observable(false)},
            {sku: 1003, name: '梨子', price: 5.0, selected: ko.observable(false)},
            {sku: 1004, name: '菠萝', price: 10.0, selected: ko.observable(false)},
            {sku: 1005, name: '橘子', price: 3.5, selected: ko.observable(false)},
        ]);
        self.handleItemClick = function (obj) {
            self.fruits().forEach(function (item) {
                item.selected(item.sku === obj.sku);
            })
        }
    }

    return ViewModel;
});
