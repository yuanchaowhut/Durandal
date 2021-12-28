define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.hello1 = ko.observable("hello world 1!");
        self.hello2 = "hello world 2!";
        self.hello3 = ko.observable("hello world 3!");

        self.handleChange = handleChange;
        self.handlePrint = handlePrint;

        function handleChange(vm, evt) {
            var id = evt.target.id;
            if (id === "hello2") {
                self.hello2 += '2';
            } else {
                self.hello3(self.hello3() + 3);
            }
        }

        function handlePrint() {
            console.log("hello2:" + self.hello2);
            console.log("hello3:" + self.hello3());
        }
    }

    // return ViewModel;
    return new ViewModel();
});
