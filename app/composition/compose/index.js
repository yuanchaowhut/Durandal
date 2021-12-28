define(['durandal/app', 'durandal/system', 'knockout', './todoItem'], function (app, system, ko, TodoItem) {
    function ViewModel() {
        var self = this;
        self.content = ko.observable();
        self.todoList = ko.observableArray([
            {id: 0, content: 'Do some homework', checked: 1, remove: removeItem},
            {id: 1, content: 'Play basketball', checked: 0, remove: removeItem},
            {id: 2, content: 'Watching TV', checked: 0, remove: removeItem},
            {id: 3, content: 'Wash clothes', checked: 0, remove: removeItem},
            {id: 4, content: 'Cooking', checked: 0, remove: removeItem}
        ]);
        self.TodoItem = TodoItem;

        self.handleClick = handleClick;
        self.handleKeyUp = handleKeyUp;

        function handleClick() {
            addItem();
        }

        function handleKeyUp(vm, event) {
            if (event.key === 'Enter' || event.keyCode === 13) {
                addItem();
            }
        }

        function addItem() {
            //计算id值
            var id = 0;
            var todos = self.todoList();
            if (todos && todos.length) {
                id = todos[todos.length - 1].id + 1;
            }
            var newItem = {id: id, content: self.content(), checked: 0, remove: removeItem};
            todos.push(newItem);
            self.todoList(todos);
            //清空输入框
            clearInput();
        }

        function clearInput() {
            self.content('');
        }

        function removeItem(id) {
            var todos = self.todoList();
            var index = todos.findIndex(function (item) {
                return item.id === id;
            });
            if (index !== -1) {
                todos.splice(index, 1);
            }
            self.todoList(todos);
        }

    }

    return ViewModel;
});
