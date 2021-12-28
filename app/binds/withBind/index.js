define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.humanInfo = ko.observable({
            humanID: 1001,
            humanName: '张三',
            phone: 13689876675,
            email: 'zhangsan@qq.com',
            job: '程序员'
        });
        self.position = ko.observable({
            address: '光谷金融港',
            coords: {
                coordX: 114.427274,
                coordY: 30.462202
            }
        });
    }

    return ViewModel;
});
