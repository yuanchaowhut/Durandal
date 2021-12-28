define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.fruits = ko.observableArray([
            {sku: 1001, name: '苹果', price: 6.0},
            {sku: 1002, name: '香蕉', price: 3.0},
            {sku: 1003, name: '梨子', price: 5.0},
            {sku: 1004, name: '菠萝', price: 10.0},
            {sku: 1005, name: '橘子', price: 3.5},
        ]);

        self.languages = ko.observableArray(['JS', 'Vue', 'React', 'Knockout', 'Wechat', 'uni-app', 'Taro']);
    }

    return ViewModel
});
