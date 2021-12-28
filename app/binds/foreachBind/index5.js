define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.province = ko.observable('省级区域');
        self.city = ko.observable('市级区域');
        self.town = ko.observable('县级区域');

        self.districts = ko.observableArray([
            {
                pid: 1,
                pname: '湖北省',
                cities: [
                    {
                        cid: 1,
                        cname: '武汉市',
                        towns: [{tid: 1, tname: '洪山区'}, {tid: 2, tname: '武昌区'}, {tid: 3, tname: '江夏区'}]
                    },
                    {
                        cid: 2,
                        cname: '宜昌市',
                        towns: [{tid: 1, tname: '夷陵区'}, {tid: 2, tname: '西陵区'}, {tid: 3, tname: '猇亭区'}]
                    },
                    {
                        cid: 3,
                        cname: '襄阳市',
                        towns: [{tid: 1, tname: '襄城区'}, {tid: 2, tname: '樊城区'}, {tid: 3, tname: '襄州区'}]
                    }
                ]
            },
            {
                pid: 2,
                pname: '湖南省',
                cities: [
                    {
                        cid: 1,
                        cname: '长沙市',
                        towns: [{tid: 1, tname: '芙蓉区'}, {tid: 2, tname: '天心区'}, {tid: 3, tname: '岳麓区'}]
                    },
                    {
                        cid: 2,
                        cname: '岳阳市',
                        towns: [{tid: 1, tname: '云溪区'}, {tid: 2, tname: '君山区'}, {tid: 3, tname: '岳阳县'}]
                    },
                    {
                        cid: 3,
                        cname: '衡阳市',
                        towns: [{tid: 1, tname: '蒸湘区'}, {tid: 2, tname: '石鼓区'}, {tid: 3, tname: '雁峰区'}]
                    }
                ]
            },
            {
                pid: 3,
                pname: '广东省',
                cities: [
                    {
                        cid: 1,
                        cname: '广州市',
                        towns: [{tid: 1, tname: '越秀区'}, {tid: 2, tname: '荔湾区'}, {tid: 3, tname: '海珠区'}]
                    },
                    {
                        cid: 2,
                        cname: '深圳市',
                        towns: [{tid: 1, tname: '福田区'}, {tid: 2, tname: '罗湖区'}, {tid: 3, tname: '南山区'}]
                    },
                    {
                        cid: 3,
                        cname: '佛山市',
                        towns: [{tid: 1, tname: '禅城区'}, {tid: 2, tname: '南海区'}, {tid: 3, tname: '顺德区'}]
                    }
                ]
            },
        ]);
    }

    return ViewModel
});
