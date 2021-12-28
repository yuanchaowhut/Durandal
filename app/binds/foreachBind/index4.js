define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.sports = ko.observableArray([
            {id: 1, name: '篮球'},
            {id: 2, name: '羽毛球'},
            {id: 3, name: '乒乓球'},
            {id: 4, name: '排球'},
            {id: 5, name: '橄榄球'},
        ]);

        self.districts = ko.observableArray([
            {
                pid: 1,
                pname: '湖北省',
                cities: [{cid: 1, cname: '武汉市'}, {cid: 2, cname: '宜昌市'}, {cid: 3, cname: '襄阳市'}]
            },
            {
                pid: 2,
                pname: '湖南省',
                cities: [{cid: 1, cname: '长沙市'}, {cid: 2, cname: '岳阳市'}, {cid: 3, cname: '衡阳市'}]
            },
            {
                pid: 3,
                pname: '广东省',
                cities: [{cid: 1, cname: '广州市'}, {cid: 2, cname: '深圳市'}, {cid: 3, cname: '佛山市'}]
            },
        ]);
    }

    return ViewModel
});
