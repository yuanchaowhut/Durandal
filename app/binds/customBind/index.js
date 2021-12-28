define(['durandal/app', 'durandal/system', 'knockout', 'jquery'], function (app, system, ko, $) {
    function ViewModel() {
        var self = this;
        self.show = ko.observable(true);

        //计算属性
        self.btnText = ko.pureComputed(function () {
            return self.show() ? '收起' : '展开';
        });

        //自定义slideVisible绑定.
        ko.bindingHandlers.slideVisible = {
            init: function (element, valueAccessor) {
                var value = valueAccessor();
                $(element).toggle(ko.unwrap(value));
            },
            update: function (element, valueAccessor) {
                var value = valueAccessor();
                ko.unwrap(value) ? $(element).slideDown() : $(element).slideUp();
            }
        };

        //按钮点击事件
        self.toggle = function () {
            var b = self.show();
            self.show(!b);
        }
    }

    return ViewModel;
});
