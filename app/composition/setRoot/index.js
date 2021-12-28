define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.isShow = ko.observable(false);
        self.dialogTitle = ko.observable();
        self.showDialog = showDialog;
        self.hideDialog = hideDialog;
        self.handleClick = handleClick;

        function showDialog() {
            self.isShow(true);
        }

        function hideDialog() {
            self.isShow(false);
        }

        function handleClick(vm, event) {
            var id = event.target.id;
            self.dialogTitle(id);

            var view = 'composition/setRoot/' + id;
            app.setRoot(view, null, 'replace', {name: '张三', age: 20});

            showDialog();
        }
    }

    return ViewModel;
});
