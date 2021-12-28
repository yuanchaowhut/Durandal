define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.videoUrl = ko.observable('http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4');
        // self.videoUrl = ko.observable('https://www.runoob.com/try/demo_source/movie.mp4');
    }

    return ViewModel;
});
