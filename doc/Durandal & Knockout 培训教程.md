# Knockout

## 基础概述

### 是什么?

Knockout（简称KO）是一个JavaScript库，可以帮助您用干净的底层数据模型创建丰富的、反应迅速的用户界面。它通过应用[MVVM](https://baike.baidu.com/item/MVVM)模式使JavaScript前端UI简单化。任何时候你有需要动态更新UI的需求（例如，根据用户的行为或者外部数据源的变化而变化），用KO可以帮助您实现起来更简单。



### 重要特性

- **优雅的依赖性跟踪** -不管任何时候你的数据模型更新，都会自动更新相应的内容。
- **声明绑定**-浅显易懂的方式将你的用户界面指定部分关联到你的数据模型上。
- **灵活全面的模板**-使用嵌套模板可以构建复杂的动态界面。
- **轻易可扩展**-几行代码就可以实现自定义行为作为新的声明式绑定。



### 额外好处

- **纯JavaScript库**-兼容任何服务器和客户端技术。
- **可以很好的应用到已有的应用程序中**-而不需要程序主要架构发生变化。
- **简洁**-采用Gzip压缩之后只要13K。
- **兼容任何主流浏览器**-(IE 6+, Firefox 2+, Chrome, Safari, 及其他)
- **一套全面完整的规范**（采用行为驱动开发）-这意味着在新的浏览器或平台中也能够很容易验证通过。



### 数据监控

KO的三个内置核心功能：

1. 监控(Observable)和依赖性跟踪(dependency tracking)
2. 声明绑定(Declarative bindings)
3. 模板(Templating)



### MVVM模式

*模型-视图-视图模型（MVVM）*是用于构建用户界面的设计模式。它描述了如何将复杂的UI分割成三个部分：

- **模型**：应用程序所存储的数据。这个数据代表了你的业务领域对象和操作（例如，可以进行资金转账的银行账户），并独立于任何用户界面。当使用KO，通常会用Ajax调用一些服务器端API将数据读取和写入此存储模型。

- **视图模型**：可理解为UI上的数据呈现和操作后的数据暂存的表示。例如，如果你查看一个列表，视图模型将一系列的数据展示并暴露相关操作(添加和删除项目)的方法。

  需要注意的是，视图模型并不参与UI的呈现方式：它不具有按钮或显示样式的任何概念。不是持久化数据模型，它是用户正在查看或未保存的数据。当使用KO，你的视图模型是纯JavaScript对象。

- **视图**：代表MVVM模式状态的可见部分，用户的互动界面。它显示从视图模型的信息，发送命令到视图模型（例如，当用户点击按钮）。

  当使用KO，视图是简单地声明绑定到其视图模型的HTML文档。另外，也可以使用视图模型的数据生成HTML模板。



## 数据绑定

### 使用步骤

数据绑定分三步，第一步将需要呈现到UI的数据监控起来，第二步通过data-bind声明式绑定到模板(html)中，第三步就可以任意使用，UI就能同步更新。

1. **监控**

    监控普通变量：ko.observable()

    监控数组：ko.observableArray() 

    > 注意，监控数组也可以使用 ko.observable()，但是为了使语义更加明确，建议使用ko.observableArray()。

    嵌套监控：ko.observableArray({

    ​    ...object

    ​	selected: ko.observable(false)

    })

2. **绑定**

    在html中使用 **data-bind**  声明式绑定之前监控的变量。绑定值可以是单个值，变量或字面值或几乎任何有效的JavaScript表达式。

    ```html
    <h1 data-bind="text: content"></h1>	
    
    <!-- variable (usually a property of the current view model -->
    <div data-bind="visible: shouldShowMessage">...</div>
     
    <!-- comparison and conditional -->
    The item is <span data-bind="text: price() > 50 ? 'expensive' : 'cheap'"></span>.
     
    <!-- function call and comparison -->
    <button data-bind="enable: parseAreaCode(cellphoneNumber()) != '555'">...</button>
     
    <!-- function expression -->
    <div data-bind="click: function (data) { myFunction('param1', data) }">...</div>
     
    <!-- object literal (with unquoted and quoted property names) -->
    <div data-bind="with: {emotion: 'happy', 'facial-expression': 'smile'}">...</div>
    ```

3. **使用**

   ```js
   var content  = ko.observable('hello world')
   content('123');
   console.log(content())
   ```
   
   

### 常见模板

- 模板1

```js
define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    var text = ko.observable(0);
    var changeText = function () {
        text(text() + 1);
    };
    return {
        text: text,
        changeText: changeText
    }
});

```

- 模板2
```js
define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {

    return {
        text: ko.observable(0),
        changeText: function () {
            this.text(this.text() + 1);
        }
    }
});

```

- **模板3**
```js
define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.text = ko.observable(0);
        self.changeText = changeText;

        function changeText() {
            self.text(self.text() + 1);
        }
    }
		
    //return new ViewModel();
    return ViewModel;
});
```



### text

格式：data-bind="text: xxx"

它是knockout中使用最频繁也是最简单的一种绑定形式。

示例：

``` html
<h1 class="text-align-center" data-bind="text: text"></h1>

define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
      function ViewModel() {
        var self = this;
        self.text = ko.observable(0);
        self.changeText = changeText;

        function changeText() {
            self.text(self.text() + 1);
        }
    }

    return ViewModel;
   });    
```



### html

格式：data-bind="html: xxx"

用的比较少，但有时候能解决一下问题。

示例：

```html
<div data-bind="html: html"></div>

define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {

    function ViewModel() {
        var self = this;
        self.html = ko.observable();

        self.activate = function () {
            setTimeout(function () {
                var htmlStr = "<h1 style='text-align:center; color: red'>Hello World!</h1>";
                self.html(htmlStr);
            }, 1000)
        }
    }

    return ViewModel;
});
```



### value

格式：data-bind="value: xxx"

用的比较多，主要用于表单元素，如：input、textarea、select 等

value绑定有一个比较特殊的细节，即value改变后，什么时候触发ViewModel更新，这里有一个 valueUpdate 属性：

| 属性值       | 描述                                                         |          |
| ------------ | ------------------------------------------------------------ | -------- |
| change       | 当失去焦点的时候更新VM的值，或者是<select> 元素被选择的时候  | 默认     |
| keyup        | 当用户敲完一个字符手指松开键盘后立即更新VM                   |          |
| keypress     | 当用户正在敲一个字符但没有释放键盘的时候就立即更新VM，效果与afterkeydown差不多 |          |
| afterkeydown | 当用户开始输入字符的时候就更新VM。主要是捕获浏览器的keydown事件或异步handle事件 | 用的最多 |

示例：

```html
<form>
    <div class="form-group">
        <label for="default">change(默认)：</label>
        <input id="default" class="form-control" placeholder="请输入" data-bind="value: content">
    </div>
    <div class="form-group">
        <label for="keyup">keyup：</label>
        <input id="keyup" class="form-control" placeholder="请输入" data-bind="value: content, valueUpdate: 'keyup'">
    </div>
    <div class="form-group">
        <label for="keypress">keypress：</label>
        <input id="keypress" class="form-control" placeholder="请输入"
               data-bind="value: content, valueUpdate: 'keypress'">
    </div>
    <div class="form-group">
        <label for="afterkeydown">afterkeydown：</label>
        <input id="afterkeydown" class="form-control" placeholder="请输入"
               data-bind="value: content, valueUpdate: 'afterkeydown'">
    </div>
</form>


define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {

    function ViewModel() {
        var self = this;
        self.content = ko.observable();
    }

    return ViewModel;
});
```



### options

格式：data-bind="options: xxx,   optionsText: xxx,    optionsValue: xxx,   value: xxx "

​            data-bind="options: xxx,   optionsText: xxx,    optionsValue: xxx,   optionsCaption: 'xxx',    value: xxx "

​			data-bind="options: xxx,   optionsText: xxx,    optionsValue: xxx,   selectedOptions: xxx "

- options绑定主要用于<select>标签中，故下面的示例均以<select>的绑定为例。
- ko中绑定一个数组使用 ko.observable 和 ko.observableArray() 都可以，但是为了语义化更强一些，建议使用后者。



#### 基础使用

示例：

```html
<form class="form-inline">
    <div class="form-group">
        <label for="fruits">水果：</label>
        <select id="fruits" class="form-control" style="width: 200px"
                data-bind="options:fruits, optionsText:'name', optionsValue:'value', value:selectedFruit">             				 </select>
    </div>
</form>

self.fruits = ko.observableArray([
      {id: 1, name: '苹果', value: 'apple'},
      {id: 2, name: '香蕉', value: 'banana'},
      {id: 3, name: '梨子', value: 'pear'},
      {id: 4, name: '菠萝', value: 'pineapple'}
  ]);
self.selectedFruit = ko.observable();
```



#### change事件

select 最常用的change事件需要通过event属性绑定，后面将事件绑定时专门探讨，这里只要知道如何绑定即可。

示例：

```html
<form class="form-inline margin-t-md">
    <div class="form-group">
        <label for="hobbies">爱好：</label>
        <select id="hobbies" class="form-control" style="width: 200px"
                data-bind="options:hobbies, optionsText:'name', optionsValue:'id', value:selectedHobbyId, event:								{ change: $root.changeHobby }"></select>
    </div>
    <div class="form-group margin-l-lg">
        <label for="fruits">选中的爱好是：</label>
        <span data-bind="text: selectedHobbyName"></span>
    </div>
</form>

self.hobbies = ko.observableArray([
            {id: 1, name: '乒乓球'},
            {id: 2, name: '篮球'},
            {id: 3, name: '羽毛球'},
            {id: 4, name: '排球'}
        ]);
self.selectedHobbyId = ko.observable(self.hobbies()[0].id);
self.selectedHobbyName = ko.observable(self.hobbies()[0].name);
self.changeHobby = changeHobby;

function changeHobby() {
		var id = self.selectedHobbyId();
		var res = self.hobbies().find(function (item) {
				return item.id === id;
		});
		self.selectedHobbyName(res.name);
}
```



#### 默认的头

ko为select标签提供了一个“请选择”的头部属性optionsCaption，有些场景中很实用，比如列表的查询条件等。需要注意的是，当选中的是caption时，对应value、name需要处理好，value值应该undefined，name值应为空字符串。

示例：

```html
<form class="form-inline margin-t-md">
    <div class="form-group">
        <label for="languages">语言：</label>
        <select id="languages" class="form-control" style="width: 200px"
                data-bind="options:languages, optionsText:'name', optionsValue:'id', optionsCaption:'请选择', 										value:languageId, event:{ change: $root.changeLanguage }"></select>
    </div>
    <div class="form-group margin-l-lg">
        <label for="fruits">选中的语言是：</label>
        <span data-bind="text: languageName"></span>
    </div>
</form>

//optionsCaption
self.languages = ko.observableArray([
    {id: 1, name: 'Java'},
    {id: 2, name: 'Javascript'},
    {id: 3, name: 'C++'},
    {id: 4, name: 'Python'}
]);
self.languageId = ko.observable();
self.languageName = ko.observable();
self.changeLanguage = changeLanguage;

function changeLanguage() {
    var id = self.languageId();
    //必须判断
    if (id === undefined) {
        self.languageName("");
        return;
    }
    var res = self.languages().find(function (item) {
        return item.id === id;
    });
    self.languageName(res.name);
}
```



#### 手动添加头

实际开发中，我们为了方便传参，也经常手动添加一个头(请选择、全部等等)，此时就不需要再使用 optionsCation，同时由于“头”也有了具体的id和name，所以不需要再手动判断undefined等。

示例：

```html
<form class="form-inline margin-t-md">
    <div class="form-group">
        <label for="hairs">发型：</label>
        <select id="hairs" class="form-control" style="width: 200px"
                data-bind="options:hairs, optionsText:'name', optionsValue:'id', value:hairId, event:{ change: 									$root.changeHair }"></select>
    </div>
    <div class="form-group margin-l-lg">
        <label for="fruits">选中的发型是：</label>
        <span data-bind="text: hairName"></span>
    </div>
</form>

//手动加一个头
self.hairs = ko.observableArray([
    {id: 0, name: '请选择'},
    {id: 1, name: '长发'},
    {id: 2, name: '短发'},
    {id: 3, name: '卷毛'},
    {id: 4, name: '光头'}
]);
self.hairId = ko.observable();
self.hairName = ko.observable();
self.changeHair = changeHair;

function changeHair() {
    var id = self.hairId();
    var res = self.hairs().find(function (item) {
        return item.id === id;
    });
    self.hairName(res.name);
}
```



#### 多选

一般用的比较少，使用multiple的select标签时，按住shift键可以多选。由于是多选，所以此时绑定的selectedOptions也是一个数组，并且是一个由<option value="xxx"></option> 的vaue值组成的数组。

示例：

```html
<form class="form-inline margin-t-md">
    <div class="form-group">
        <label for="provinces">省份：</label>
        <select id="provinces" multiple class="form-control" style="width: 200px"
                data-bind="options:provinces, optionsText:'name', optionsValue:'id', selectedOptions: 													provinceIds, event:{ change: $root.changeProvince }"></select>
    </div>
    <div class="form-group margin-l-lg">
        <label for="fruits">选中的省份是：</label>
        <span data-bind="text: provinceNames"></span>
    </div>
</form>

//multiple select 按住shift键可多选
self.provinces = ko.observableArray([
    {id: 1, name: '湖北省'},
    {id: 2, name: '湖南省'},
    {id: 3, name: '四川省'},
    {id: 4, name: '河南省'},
    {id: 5, name: '江西省'}
]);
self.provinceIds = ko.observable();
self.provinceNames = ko.observable();
self.changeProvince = changeProvince;

function changeProvince() {
    var ids = self.provinceIds();
    var res = self.provinces().filter(function (item) {
        return ids.indexOf(item.id) !== -1;
    });
    var names = res.map(function (item) {
        return item.name
    }).join(',');
    self.provinceNames(names);
}
```



#### 默认选中1个

有时候我们的select标签默认需要选中一项，比如在某个编辑页面，需要一进入页面就默认选中上次保存的选项。此时需要给绑定的value一个初始值，特别地，如果存在optionsCaption且默认需要选中它，则value的初始值可以设定为 undefined。

示例：

```html
<form class="form-inline margin-t-md">
    <div class="form-group">
        <label for="brands">品牌：</label>
        <select id="brands" class="form-control" style="width: 200px"
                data-bind="options:brands, optionsText:'name', optionsValue:'id', value:brandId, event:{ change: 								$root.changeBrand }"></select>
    </div>
</form>

//默认选中1个
self.brands = ko.observableArray([
    {id: 0, name: '请选择'},
    {id: 1, name: '宝马'},
    {id: 2, name: '奔驰'},
    {id: 3, name: '奥迪'},
    {id: 4, name: '大众'}
]);
self.brandId = ko.observable(3); //默认选中奥迪
```



#### 默认选中多个

如果需要默认选中多个，则要使用到 selectedOptions属性，给它绑定一个数组，该数组由所有选中项的id组成（optionsValue绑定的是各个选中项的id的话）。特别地，如果不需要选中任何项，则可以给它绑定一个空数组。

示例：

```html
<form class="form-inline margin-t-md">
    <div class="form-group">
        <label for="units">企业：</label>
        <select id="units" multiple class="form-control" style="width: 200px"
                data-bind="options:units, optionsText:'name', optionsValue:'id', selectedOptions:unitIds, event:								{ change: $root.changeUnit }"></select>
    </div>
</form>

//默认选中多个
self.units = ko.observableArray([
    {id: 1, name: '阿里巴巴'},
    {id: 2, name: '腾讯'},
    {id: 3, name: '小米'},
    {id: 4, name: '百度'},
    {id: 5, name: '数字政通'}
]);
self.unitIds = ko.observableArray([1, 3, 5]); //默认选中阿里巴巴、小米、数字政通
```



### checked

checked属性主要用于单选按钮(radio)和复选框(checkbox)，下面将单独讨论。

#### 单选按钮

格式：data-bind="checked: xxx"

- xxx是一个ko变量。
- xxx如果有值，即有默认选中项时，其值必须为字符串。
- xxx如果没有值或者其值为undefined时，则不会有默认选中项。

示例：

```html
<div>
    <div class="radio">
        <label>
            <input type="radio" name="gender" id="male" value="1" data-bind="checked: gender">美女
        </label>
    </div>
    <div class="radio">
        <label>
            <input type="radio" name="gender" id="female" value="2" data-bind="checked: gender">帅哥
        </label>
    </div>
    <div class="radio">
        <label>
            <input type="radio" name="gender" id="unknown" value="3" data-bind="checked: gender">未知
        </label>
    </div>

    <div class="flex">
        <span>gender值：</span>
        <span data-bind="text: gender"></span>
    </div>
    <div class="flex margin-t-md">
        <button class="btn btn-primary" data-bind="click: printGender">打印gender类型</button>
        <span class="margin-l-md font-size-normal" data-bind="text: genderType"></span>
    </div>
</div>

define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.gender = ko.observable('1');   //注意这里必须给字符串，否则不会有默认选中项。
        self.genderType = ko.observable();
        self.printGender = printGender;

        function printGender() {
            var getType = Object.prototype.toString;
            self.genderType(getType.call(self.gender()));
        }
    }

    return ViewModel;
});
```

#### 复选框

格式：data-bind="checked: xxx"

- xxx是一个ko数组
- xxx如果有值，即有默认选中项时，则其值必须为字符串数组，比如：ko.observableArray(['1', '2', '3'])。
- xxx如果没有值或则其值为空数组时，则不会有默认选中项。

示例：

```html
<div class="margin-t-lg">
    <div class="checkbox">
        <label>
            <input type="checkbox" value="1" data-bind="checked: balls">篮球
        </label>
    </div>
    <div class="checkbox">
        <label>
            <input type="checkbox" value="2" data-bind="checked: balls">羽毛球
        </label>
    </div>
    <div class="checkbox">
        <label>
            <input type="checkbox" value="3" data-bind="checked: balls">乒乓球
        </label>
    </div>
    <div class="flex">
        <span>balls值：</span>
        <span data-bind="text: balls().join(',')"></span>
    </div>
    <div class="flex margin-t-md">
        <button class="btn btn-primary" data-bind="click: printBalls">打印balls类型</button>
        <span class="margin-l-md font-size-normal" data-bind="text: ballsType"></span>
    </div>
</div>


define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.balls = ko.observableArray(['1', '3']);
        self.ballsType = ko.observable();
        self.printBalls = printBalls;

        function printBalls() {
            var getType = Object.prototype.toString;
            self.ballsType(getType.call(self.balls()));
        }

    }

    return ViewModel;
});

```



### enable

格式：data-bind="enable: xxx"

示例：

```html
<div class="container">
    <form>
        <div class="form-group">
            <label for="username">用户名：</label>
            <input id="username" class="form-control" data-bind="enable: editable">
        </div>
        <div class="form-group">
            <label for="password">密 码：</label>
            <input id="password" class="form-control" data-bind="enable: editable">
        </div>

        <button class="btn btn-primary" data-bind="click: toggle">toggle</button>
    </form>
</div>

define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.userName = ko.observable();
        self.password = ko.observable();
        self.editable = ko.observable(false);
        self.toggle = toggle;

        function toggle() {
            var b = self.editable();
            self.editable(!b);
        }
    }

    return ViewModel;
});
```



### disable

格式：data-bind="disable: xxx"

示例：

```html
<div class="container">
    <form>
        <div class="form-group">
            <label for="broadband">备用宽带：</label>
            <input id="broadband" class="form-control" data-bind="disable: forbidden">
        </div>
        <div class="form-group">
            <label for="server">备用服务器：</label>
            <input id="server" class="form-control" data-bind="disable: forbidden">
        </div>

        <button class="btn btn-primary" data-bind="click: toggle">toggle</button>
    </form>
</div>

define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.broadband = ko.observable();
        self.server = ko.observable();
        self.forbidden = ko.observable(true);
        self.toggle = toggle;

        function toggle() {
            var b = self.forbidden();
            self.forbidden(!b);
        }
    }

    return ViewModel;
});
```



### attr

格式：data-bind="attr:{属性名:  xxx}"

其中属性名分为两大类：一是所有的HTML属性，理论上全部都支持。二是自定义属性，自定义属性如果是没有中横线连接的单个单词(如：myAttr)，则可以不加单引号，如果是有中横线连接的复合单词(例如：my-attr)，则必须加上单引号。

示例：

```html
<div class="container">
    <!--绑定src属性-->
    <div class="flex">
        <label>绑定src属性</label>
        <img class="img-circle margin-l-lg" width="200" height="200" alt="" data-bind="attr:{src: image}">
    </div>

    <!--绑定href属性-->
    <div class="flex margin-t-md">
        <label>绑定href属性</label>
        <a class="margin-l-lg" data-bind="attr:{href: link}">打开链接</a>
    </div>

    <!--绑定title属性-->
    <div class="flex margin-t-md">
        <label>绑定title属性</label>
        <span class="text-single-line margin-l-lg" style="width: 2rem" data-bind="text: introduction, attr:{title: introduction}"></span>
    </div>

    <!--绑定自定义属性1-->
    <div class="flex margin-t-md">
        <label>绑定自定义属性1</label>
        <span class="margin-l-lg" data-bind="text: customAttr1, attr:{myAttr: customAttr1}"></span>
    </div>

    <!--绑定自定义属性2-->
    <div class="flex margin-t-md">
        <label>绑定自定义属性2</label>
        <span class="margin-l-lg" data-bind="text: customAttr2, attr:{'my-attr': customAttr2}"></span>
    </div>
</div>


define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.image = ko.observable('/Durandal/css/images/programer.png');
        self.link = ko.observable('http://www.baidu.com');
        self.introduction = ko.observable('北京数字政通科技股份有限公司成立于2001年,2010年在深圳证券交易所上市(股票代码:300075)是北京市认证的高新技术企业和拥有多项自主知识产权的高科技软件企业。');
        self.customAttr1 = ko.observable('自定义属性1');
        self.customAttr2 = ko.observable('自定义属性2');
    }

    return ViewModel;
});
```



### visible

格式：data-bind="visible: xxx"   或 data-bind="visible: xxx()"

- visible绑定是knockout用于控制DOM元素显示或隐藏的方法之一，当xxx时布尔类型变量时可以不带括号。当xxx是其它类型比如数组时，可以这样使用：data-bind="visible: dataList() && dataList().length"，意思是当dataList为非空数组时显示。
- visible控制DOM元素显示隐藏是通过控制其display  css属性来实现的，文档流中该DOM仍然是存在的。

示例：

```html
<div class="container">
    <h1 data-bind="visible: show">Hello World</h1>
    <h1 data-bind="visible: dataList() && dataList().length">Hello Durandal</h1>
</div>

define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.show = ko.observable(true);
        self.dataList = ko.observableArray([]);
    }

    return ViewModel;
});
```

上面的示例代码中，show为true故Hello World会显示，而dataList是一个空数组，所以Hello Durandal不显示。下面我们看一下它的DOM结构：

![image-20211218192822518](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/image-20211218192822518.png)



### style

格式：data-bind="style: {属性名1:  属性值1,  属性名2: 属性值2, ...}"

- style绑定使用频率非常高，可以支持任意css属性，但是需要注意的是，对于background-color这类带中横线的属性名，必须使用驼峰命名(backgroundColor)，否则会报语法错误。
- 属性值可以使用js表达式、三元表达式等等。

示例：

```html
<div class="container flex flex-column align-center">
    <style>
        .box {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 2rem;
            color: #ffffff;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: bold;
            font-size: 0.2rem;
            background-color: #2aabd2;
        }
    </style>

    <div class="flex align-center">
        <button class="btn btn-danger padding-l-lg padding-r-lg" data-bind="click: handleExpand">扩大</button>
        <button class="btn btn-success padding-l-lg padding-r-lg margin-l-md" data-bind="click: handleShrink">缩小
        </button>
    </div>

    <div class="box margin-t-md"
         data-bind="style:{
                         width: 2*ratio()+'rem',
                         height: 2*ratio()+'rem',
                         backgroundColor: ratio() > 2? '#ff0000': '#2aabd2'
                     }">
        Hello
    </div>
</div>


define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.ratio = ko.observable(1.0);
        self.handleExpand = handleExpand;
        self.handleShrink = handleShrink;

        function handleExpand() {
            var ratio = self.ratio() + 0.2;
            self.ratio(ratio);
        }

        function handleShrink() {
            var ratio = self.ratio();
            if (ratio <= 1.0) {
                console.log('不能再缩小啦');
                return;
            }
            self.ratio(self.ratio() - 0.2);
        }
    }

    return ViewModel;
});
```

![style-bind](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/style-bind.gif)

### css

格式：data-bind="css:{class类名: xxx}"

- 当class类名为单个单词时，class类名可以用单引号包裹也可以不用，但是如果class类名是含中横线时必须使用单引号包裹，因此只要遇到css绑定，统一用单引号包裹class类名即可。
- ko变量xxx可以是布尔值也可以是布尔表达式，当其值为true时DOM元素会应用此class类名，为false则不会。

示例：

```html
<div class="container">
    <style>
        .selected {
            color: #ffffff;
        }

        .selected > td {
            background-color: #2aabd2 !important;
        }

        .font-bold {
            font-weight: bold;
        }
    </style>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
        </tr>
        </thead>
        <tbody data-bind="foreach: dataList">
        <tr class="cursor-pointer" data-bind="css:{'selected': selected(), 'font-bold': selected()}, click:$root.handleSelect">
            <td data-bind="text: id"></td>
            <td data-bind="text: name"></td>
            <td data-bind="text: age"></td>
        </tr>
        </tbody>
    </table>
</div>

define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.dataList = ko.observableArray([
            {id: 1, name: '宋远桥', age: 60, selected: ko.observable(false)},
            {id: 2, name: '俞莲舟', age: 50, selected: ko.observable(false)},
            {id: 3, name: '俞岱岩', age: 45, selected: ko.observable(false)},
            {id: 4, name: '张松溪', age: 40, selected: ko.observable(false)},
            {id: 5, name: '张翠山', age: 30, selected: ko.observable(false)},
            {id: 6, name: '殷梨亭', age: 28, selected: ko.observable(false)},
            {id: 7, name: '莫声谷', age: 25, selected: ko.observable(false)},
        ]);
        self.handleSelect = handleSelect;

        function handleSelect(obj) {
            self.dataList().map(function (item) {
                item.selected(item.id === obj.id);
            });
        }
    }

    return ViewModel
});
```

![css-bind](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/css-bind.gif)



## 计算属性

计算属性是knockout中非常重要的一个功能，它与普通的KO变量有所不同，它是依赖其它KO变量而存在的。当其依赖的KO变量值发生变化的时，计算属性会重新计算，反之则使用缓存中的属性值。计算属性和其它KO变量一样，都是响应式的，只不过它必须依赖某一个数据实现，并且只有它依赖的数据的值改变了，它才会更新。合理使用计算属性常常能帮我们省很多事。KO3.2.0之前计算属性使用的是 ko.computed()，3.2.0之后新推出 ko.pureComputed()，所以现在我们主要使用 puteComputed。按照官方的说法是后者可以：防止内存泄露、减少计算开销。关于computed深层次的讨论请参阅[这里](https://www.cnblogs.com/smallprogram/category/883528.html?page=2)，总结的非常到位，我们不再赘述。

格式1：ko.pureComputed(fn, context)

格式2：ko.pureComputed({

​                 read: function(){

​                        return xxx

​                 },

​                 Write: function(){

​	                    code...

​				 },

​                 owner: this

​            })

- fn 是一个函数，函数内部可以使用其它的KO变量，并且fn最终必须return一个结果出去。
- context 通常就是我们的ViewModel，所以我们经常传this。
- 计算属性赋值操作一般用的很少，如果一定要使用则要注意计算属性与它依赖的属性之间的相互影响，有时候会造成UI上的混乱。

```html
<div class="container">
    <div class="row">
        <div class="col-md-6">
            <!--计算属性取值-->
            <form>
                <div class="form-group">
                    <label for="firstName">First Name：</label>
                    <input id="firstName" data-bind="value: firstName, valueUpdate: 'afterkeydown'">
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name：</label>
                    <input id="lastName" data-bind="value: lastName, valueUpdate: 'afterkeydown'">
                </div>
                <div class="form-group">
                    <label for="fullName">Full Name：</label>
                    <input id="fullName" data-bind="value: fullName, valueUpdate: 'afterkeydown'">
                </div>
            </form>
        </div>

        <div class="col-md-6">
            <!--计算属性赋值-->
            <form>
                <div class="form-group">
                    <label for="carriageNumber">车厢号：</label>
                    <input id="carriageNumber" data-bind="value: carriageNumber, valueUpdate: 'afterkeydown'">
                </div>
                <div class="form-group">
                    <label for="seatNumber">座位号：</label>
                    <input id="seatNumber" data-bind="value: seatNumber, valueUpdate: 'afterkeydown'">
                </div>
                <div class="form-group">
                    <label for="ticket">车票：</label>
                    <input id="ticket" data-bind="value: ticket, valueUpdate: 'afterkeydown'">
                </div>
            </form>
        </div>
    </div>
</div>


define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        //fullName例子
        self.firstName = ko.observable('');
        self.lastName = ko.observable('');
        self.fullName = ko.pureComputed(function () {
            return this.firstName() + ' ' + this.lastName();
        }, this);
        // 如果使用self则this也可以不传
        // self.fullName = ko.pureComputed(function () {
        //     return self.firstName() + ' ' + self.lastName();
        // });

        //火车票例子
        self.carriageNumber = ko.observable('');
        self.seatNumber = ko.observable('');
        self.ticket = ko.pureComputed({
            //取值
            read: function () {
                return this.carriageNumber() + ' ' + this.seatNumber();
            },
            //赋值
            write: function (value) {
                if (value && value.lastIndexOf(' ') > 0) {
                    var arr = value.split(/\s+/);
                    this.carriageNumber(arr[0] || '');
                    this.seatNumber(arr[1] || '');
                }
            },
            owner: this
        });
        // 如果使用self则owner:this也可以不要 
        // self.ticket = ko.pureComputed({
        //     read: function () {
        //         return self.carriageNumber() + ' ' + self.seatNumber();
        //     },
        //     write: function (value) {
        //         if (value && value.lastIndexOf(' ') > 0) {
        //             var arr = value.split(/\s+/);
        //             self.carriageNumber(arr[0] || '');
        //             self.seatNumber(arr[1] || '');
        //         }
        //     }
        // });
    }

    return ViewModel
});
```

![computed-bind](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/computed-bind.gif)



## 流程控制

### if

格式1：data-bind="if: xxx"

格式2：<!--ko if: xxx-->

​              <!--/ko-->

格式3：data-bind="ifnot: xxx"

格式4：<!--ko ifnot: xxx-->

​              <!--/ko-->

if 绑定是KO流程控制语句中非常重要的一个(另一个是foreach下个小结讲)，KO中除了有if外还有个ifnot，这点和Vue是不同的，不过一般用其中一个即可。

- xxx是KO变量，可以是一个布尔值也可以是一个布尔表达式。
- 上面<!-- -->包裹的这部分内容，很容易误认为是html的注释，实际上它是ko if语句的一种语法，类似的还有foreach。
- data-bind="if: xxx" 这种用法只是清空了DOM元素的内容，元素本身仍然在文档流中，而 <!--ko if: xxx--> 则是通过不断创建和销毁DOM元素来实现显示和隐藏的目的。所以，一定要根据实际需求决定使用何种方式。

> 还记得之前学过的visible绑定吗？KO中控制元素显示和隐藏主要就这2种，visible是通过控制元素的display属性来实现，<!--ko if--> 则是真的的创建、销毁。所以，如果程序中需要经常频繁的控制元素显示和隐藏，则使用visible比较好，这样可以节省重新创建DOM的开销。

示例1：下面示例主要讲述 if 和 ifnot 基本使用

```html
<div class="container">
    <div class="row">
        <div class="col-md-6">
            <button class="btn btn-primary" data-bind="text: toggleText, click: toggle"></button>

            <h1 data-bind="if: show">Hello World</h1>
            <!--注意下面这个不是注释，而是ko的一种语法规则-->
            <!--ko if: show-->
            <h1>Hello KO</h1>
            <!--/ko-->
        </div>

        <div class="col-md-6">
            <button class="btn btn-primary" data-bind="text: changeText, click: change"></button>
            <h1 data-bind="ifnot: hiden">Hello Durandal</h1>
            <!--注意下面这个不是注释，而是ko的一种语法规则-->
            <!--ko ifnot: hiden-->
            <h1>Hello JS</h1>
            <!--/ko-->
        </div>
    </div>
</div>

define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.show = ko.observable(true);
        self.toggleText = ko.pureComputed(function () {
            return self.show() ? '隐藏' : '显示';
        });
        self.toggle = toggle;

        function toggle() {
            self.show(!self.show());
        }


        self.hiden = ko.observable(false);
        self.changeText = ko.pureComputed(function () {
            return self.hiden() ? '显示' : '隐藏';
        });
        self.change = change;

        function change() {
            self.hiden(!self.hiden());
        }
    }

    return ViewModel;
});
```

![if-bind](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/if-bind.gif)

示例2：下面示例主要验证 ko if 和 <!--ko if-->的区别

```html
<div class="container">
    <style>
        .box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            width: 4rem;
            height: 2.5rem;
            color: #ffffff;
            font-family: PingFangSC, PingFangSC-Regular;
            background: #2aabd2;
        }
    </style>

    <button class="btn btn-primary" data-bind="text: toggleText, click: toggle"></button>

    <div class="box margin-t-md" data-bind="if: show">
        <h1>我是大标题</h1>
        <h2>我是二标题</h2>
        我是小标题
    </div>
    <hr/>
    <!--ko if: show-->
    <div class="box margin-t-md">
        <h1>我是大标题</h1>
        <h2>我是二标题</h2>
        我是小标题
    </div>
    <!--/ko-->
</div>

define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.show = ko.observable(true);
        self.toggleText = ko.pureComputed(function () {
            return self.show() ? '隐藏' : '显示';
        });
        self.toggle = toggle;

        function toggle() {
            self.show(!self.show());
        }
    }

    return ViewModel;
});
```

<img src="https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112271211382.gif" alt="if-bind2" style="zoom:50%;" />

### foreach

foreach绑定是KO流程控制语句中另一个重要角色，主要用于渲染一个列表。它的内涵比较丰富，需要注意的地方比较多，下面将分开单独讨论。

#### 基本使用

格式1：data-bind="foreach: dataList"

格式2：<!--ko foreach-->

​			  <!--/ko-->

- 注意上面两种方式使用上的不同。前者是加在列表元素的父容器上的，后者是直接将列表元素包裹起来。
- 遍历的过程中实际上有一个隐含的上下文，即正在遍历的列表项。所以下面的示例代码中才可以直接使用 sku、name 等，它实际上相当于列表项.sku、列表项.name。

示例：

```html
<div class="container">
    <h3>data-bind方式：</h3>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>SKU</th>
            <th>名称</th>
            <th>单价</th>
        </tr>
        </thead>
        <tbody data-bind="foreach: fruits">
        <tr>
            <td data-bind="text: sku"></td>
            <td data-bind="text: name"></td>
            <td data-bind="text: price"></td>
        </tr>
        </tbody>
    </table>
    
    <h3>&lt;!--ko foreach--&gt;方式：</h3>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>SKU</th>
            <th>名称</th>
            <th>单价</th>
        </tr>
        </thead>
        <tbody>
        <!--ko foreach: fruits-->
        <tr>
            <td data-bind="text: sku"></td>
            <td data-bind="text: name"></td>
            <td data-bind="text: price"></td>
        </tr>
        <!--/ko-->
        </tbody>
    </table>
</div>

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
    }

    return ViewModel
});
```

![image-20211219123344048](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/image-20211219123344048.png)

#### $index

实际开发中，我们可能会遇到这样的场景。需要给列表增加显示一个序号列，但是后台返回的数据并没有包含序号字段，此时有两种方案，一是拿到接口返回的数据后遍历一遍手动给其扩展一个index属性。另一个方案就是直接使用KO提供的$index内置属性，这样其实是最方便的。

> 注意：$index 是从0开始的，实际开发中一般要从1开始，所以要使用 $index() + 1。

示例：

```html
<div class="container">
    <style>
        .headers {
            margin: 0;
            padding: 0;
            list-style-type: none;
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            color: white;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: bold;
            background: #3071a9;
        }

        .list {
            margin: 0;
            padding: 0;
            list-style-type: none;
            height: 0.5rem;
            line-height: 0.5rem;
            text-align: center;
            font-family: PingFangSC, PingFangSC-Regular;
        }

        ul.list:nth-child(odd) {
            background-color: #ffffff;
        }

        ul.list:nth-child(even) {
            background-color: #f2f2f2;
        }
    </style>

    <ul class="flex align-center headers">
        <li class="flex-1">序号</li>
        <li class="flex-1">学号</li>
        <li class="flex-1">姓名</li>
        <li class="flex-1">年龄</li>
    </ul>
    <!--ko foreach: students-->
    <ul class="flex align-center list">
        <li class="flex-1" data-bind="text: $index() + 1"></li>
        <li class="flex-1" data-bind="text: stuNo"></li>
        <li class="flex-1" data-bind="text: stuName"></li>
        <li class="flex-1" data-bind="text: age"></li>
    </ul>
    <!--/ko-->
</div>

define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.students = ko.observableArray([
            {stuNo: 1001, stuName: '张三', age: 18},
            {stuNo: 1002, stuName: '香蕉', age: 19},
            {stuNo: 1003, stuName: '梨子', age: 20},
            {stuNo: 1004, stuName: '菠萝', age: 17},
            {stuNo: 1005, stuName: '橘子', age: 16},
        ]);
    }

    return ViewModel
});
```

![image-20211219123753934](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/image-20211219123753934.png)

#### $data

前面提到过，foreach中有一个隐含的上下文，实际上这个隐含的上下文可通过$data拿到。尤其是当列表数据项并不是一个对象，而是一个简单的字符串或数字时，我们更需要通过$data来表示一个列表项数据。

示例：

```html
<div class="container">
    <h4>商品列表：</h4>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>SKU</th>
            <th>名称</th>
            <th>单价</th>
        </tr>
        </thead>
        <tbody data-bind="foreach: fruits">
        <tr>
            <td data-bind="text: $data.sku"></td>
            <td data-bind="text: $data.name"></td>
            <td data-bind="text: $data.price"></td>
        </tr>
        </tbody>
    </table>
    <hr/>

    <div class="flex">
        <h4>前端技术：</h4>
        <ul class="flex" data-bind="foreach: languages">
            <li class="margin-l-md" data-bind="text: $data"></li>
        </ul>
    </div>
</div>

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
```

#### as

as用于给列表项起一个别名，然后渲染列表项元素时就可以直接使用它。这在嵌套循环中尤其能发挥一些作用。

格式：data-bind="foreach: {data: list, as: 'item'}"

- list代指一个ko数组。
- as: 'item' 需要注意2个小细节，一是as后要跟一个冒号，二是别名item要用单引号包裹起来。

示例：

```html
<div class="container">
    <div class="flex">
        <h4>球类运动：</h4>
        <ul class="flex" data-bind="foreach: {data: sports, as: 'item'}">
            <li class="margin-l-md" data-bind="text: item.name"></li>
        </ul>
    </div>
    <hr/>

    <div class="flex">
        <h4>区域：</h4>
        <ul data-bind="foreach: {data: districts, as: 'province'}">
            <li data-bind="text: province.pname"></li>
            <ul data-bind="foreach: {data: province.cities, as: 'city'}">
                <li class="padding-l-md" data-bind="text: city.cname"></li>
            </ul>
        </ul>
    </div>
</div>

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
```

![image-20211219195451023](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/image-20211219195451023.png)

#### $parent与$root

对于嵌套foreach循环，有时候会有这样的需求，内层循环中需要使用外层循环中的对象，或者foreach循环中需要使用ViewModel中的数据或者绑定ViewModel中的方法。这个时候就需要用到$parent和$root这两个内置的属性。

- $parent：是一个相对的概念，即上级作用域(上下文)对象。
- $root：是一个绝对概念，即ViewModel对象。
- 更多内置上下文特殊属性请查阅[这里](https://www.cnblogs.com/smallprogram/p/5956631.html)。

示例：

```html
<div class="container">
    <div class="flex">
        <h4>区域：</h4>
        <ul data-bind="foreach: districts">
            <li>
                <span data-bind="text: pname"></span>
                <span>------------------------</span>
                <span data-bind="text: $root.province"></span>
            </li>
            <ul data-bind="foreach: cities">
                <li class="padding-l-md">
                    <span data-bind="text: cname"></span>
                    <span>------------隶属于------------</span>
                    <span data-bind="text: $parent.pname"></span>
                    <span>-------------是-----------</span>
                    <span data-bind="text: $root.city"></span>
                </li>
                <ul data-bind="foreach: towns">
                    <li class="padding-l-xlg">
                        <span data-bind="text: tname"></span>
                        <span>------------隶属于------------</span>
                        <span data-bind="text: $parent.cname"></span>
                        <span>------------是------------</span>
                        <span data-bind="text: $root.town"></span>
                    </li>
                </ul>
            </ul>
        </ul>
    </div>
</div>

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
```

![image-20211219202922932](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/image-20211219202922932.png)

有时候foreach嵌套层次太多，为了避免搞不清上下文关系，建议直接使用as起别名比较简单。例如上面的例子如果用as来处理的话，示例代码如下：

```html
<div class="container">
    <div class="flex">
        <h4>区域：</h4>
        <ul data-bind="foreach: {data: districts, as: 'item1'}">
            <li>
                <span data-bind="text: item1.pname"></span>
                <span>------------------------</span>
                <span data-bind="text: $root.province"></span>
            </li>
            <ul data-bind="foreach: {data: item1.cities, as: 'item2'}">
                <li class="padding-l-md">
                    <span data-bind="text: item2.cname"></span>
                    <span>------------隶属于------------</span>
                    <span data-bind="text: item1.pname"></span>
                    <span>-------------是-----------</span>
                    <span data-bind="text: $root.city"></span>
                </li>
                <ul data-bind="foreach: {data: item2.towns, as: 'item3'}">
                    <li class="padding-l-xlg">
                        <span data-bind="text: item3.tname"></span>
                        <span>------------隶属于------------</span>
                        <span data-bind="text: item2.cname"></span>
                        <span>------------是------------</span>
                        <span data-bind="text: $root.town"></span>
                    </li>
                </ul>
            </ul>
        </ul>
    </div>
</div>
```



### with

格式1：data-bind="with:  xxx"

格式2：<!--ko with: xxx-->

​			  <!--/ko-->	

- with绑定用于给DOM子元素(或被包裹的DOM元素)指明一个上下文对象，以便于它们能够直接使用该上下文对象的属性。很明显，这里xxx代指的就是一个对象。
- 如果使用data-bind方式，则with绑定要应用在父容器中，如果使用<!--ko with-->方式，则直接将子元素包裹起来。

```html
<div class="container">
    <div class="flex">
        <h4>用户信息：</h4>
        <ul data-bind="with: humanInfo">
            <li data-bind="text: humanID"></li>
            <li data-bind="text: humanName"></li>
            <li data-bind="text: phone"></li>
            <li data-bind="text: email"></li>
            <li data-bind="text: job"></li>
        </ul>
    </div>
    <hr/>

    <div class="flex">
        <h4>定位信息：</h4>
        <div data-bind="with: position">
            <span data-bind="text: address"></span>
            <!--ko with: coords-->
            <span data-bind="text: '(' + coordX + ',' + coordY + ')'"></span>
            <!--/ko-->
        </div>
    </div>
</div>

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
```

![image-20211219213844321](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/image-20211219213844321.png)

## 事件绑定

### click

格式：data-bind="click: fn"   或列表元素中   data-bind="click: $root.fn"

click事件是所有事件中用的最频繁的，但是用法比较简单，不过有一个细节特别容易忽视，因此需要特别注意一下。即对列表元素绑定事件时，一定要注意使用 $root ，因为列表元素默认的上下文是当前正在遍历的对象，而我们的事件处理程序是定义在VM中的，通过$root我们就能拿到VM对象。

```html
<div class="container">
    <style>
        .active > td {
            color: white;
            background-color: #2a6496!important;
        }
    </style>

    <h3 data-bind="text: count() + '次'"></h3>
    <button class="btn btn-primary margin-t-md" data-bind="click: handleClick">点击</button>
    <hr/>

    <table class="table table-striped">
        <thead>
        <tr>
            <th>SKU</th>
            <th>名称</th>
            <th>单价</th>
        </tr>
        </thead>
        <tbody data-bind="foreach: fruits">
        <tr class="cursor-pointer" data-bind="css:{'active': selected()}, click: $root.handleItemClick">
            <td data-bind="text: sku"></td>
            <td data-bind="text: name"></td>
            <td data-bind="text: price"></td>
        </tr>
        </tbody>
    </table>
</div>

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
```

![click-bind](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/click-bind.gif)

### event

如果说click绑定是因为使用频率极高而被Knockout单独拎出来的语法糖，那么event绑定就是一个通杀型选手。所有HTML DOM事件都可以通过它来绑定(HTML DOM 事件都有哪些可以参考[这里](https://www.runoob.com/jsref/dom-obj-event.html))，与click绑定一样，对列表元素绑定事件需要注意作用域。

格式：data-bind="event: {事件名1:  fn1, 事件名2:  fn2, ...}"

示例：

```html
<div class="container">
    <style>
        .box {
            width: 2rem;
            height: 2rem;
        }

        .red-bg {
            background-color: red;
        }

        .green-bg {
            background-color: green;
        }
    </style>
    <!--鼠标移入移出事件-->
    <div class="box"
         data-bind="css: {'red-bg': mouseIn(), 'green-bg': !mouseIn()},
         event:{mouseenter: handleMouseEnter, mouseleave: handleMouseLeave}"></div>

    <!--下拉框的change事件-->
    <form class="form-inline margin-t-md">
        <div class="form-group">
            <label for="hobbies">爱好：</label>
            <select id="hobbies" class="form-control" style="width: 2rem"
                    data-bind="options:hobbies, optionsText:'name', optionsValue:'id', value:selectedHobbyId, event:{ change: changeHobby }"></select>
        </div>
        <div class="form-group margin-l-lg">
            <label>选中的爱好是：</label>
            <span data-bind="text: selectedHobbyName"></span>
        </div>
    </form>
</div>


define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        //鼠标移入移出事件
        self.mouseIn = ko.observable(false);
        self.handleMouseEnter = function () {
            self.mouseIn(true);
        };

        self.handleMouseLeave = function () {
            self.mouseIn(false);
        };

        //change事件
        self.hobbies = ko.observableArray([
            {id: 1, name: '乒乓球'},
            {id: 2, name: '篮球'},
            {id: 3, name: '羽毛球'},
            {id: 4, name: '排球'}
        ]);
        self.selectedHobbyId = ko.observable(self.hobbies()[0].id);
        self.selectedHobbyName = ko.observable(self.hobbies()[0].name);
        self.changeHobby = changeHobby;

        function changeHobby() {
            var id = self.selectedHobbyId();
            var res = self.hobbies().find(function (item) {
                return item.id === id;
            });
            self.selectedHobbyName(res.name);
        }
    }

    return ViewModel;
});
```

![event-bind](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/event-bind.gif)

### 参数传递

Knockout事件的参数传递与其它框架有所不同，有一些实用的技术点我们在开发中经常会遇到，因此这里单独放一个模块探讨一下。

#### 默认参数

Knockout的事件参数我这里主要分两大类，一类是普通的事件的参数，它默认有2个参数，参数1是ViewModel对象，参数2是事件源event对象。另一类是列表事件的参数，它也默认有2个参数，参数1是当前响应事件的列表元素对应的上下文对象，参数2是事件源对象。

示例：

```html
<div class="container">
    <style>
        .active > td {
            color: white;
            background-color: #2a6496 !important;
        }
    </style>

    <!--默认参数情况-->
    <h3 data-bind="text: count() + '次'"></h3>
    <button class="btn btn-primary margin-t-md" data-bind="click: handleClick">点击</button>
    <hr/>

    <table class="table table-striped">
        <thead>
        <tr>
            <th>SKU</th>
            <th>名称</th>
            <th>单价</th>
        </tr>
        </thead>
        <tbody data-bind="foreach: fruits">
        <tr class="cursor-pointer" data-bind="css:{'active': selected()}, click: $root.handleItemClick">
            <td data-bind="text: sku"></td>
            <td data-bind="text: name"></td>
            <td data-bind="text: price"></td>
        </tr>
        </tbody>
    </table>
</div>


define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.count = ko.observable(0);
        self.fruits = ko.observableArray([
            {sku: 1001, name: '苹果', price: 6.0, selected: ko.observable(false)},
            {sku: 1002, name: '香蕉', price: 3.0, selected: ko.observable(false)},
            {sku: 1003, name: '梨子', price: 5.0, selected: ko.observable(false)},
            {sku: 1004, name: '菠萝', price: 10.0, selected: ko.observable(false)},
            {sku: 1005, name: '橘子', price: 3.5, selected: ko.observable(false)},
        ]);

        self.handleClick = handleClick;
        self.handleItemClick = handleItemClick;

        function handleClick(vm, event) {
            self.count(self.count() + 1);
        }

        function handleItemClick(item, event) {
            self.fruits().forEach(function (fruit) {
                item.selected(fruit.sku === item.sku);
            })
        }
    }

    return ViewModel;
});
```

![event-args1](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112200017894.gif)

#### 指定参数

Knockout事件传递指定参数有两种办法，一种是在原来的事件函数外面再套一层 function(){}，在function内部调用原事件函数并且传参。另一种是使用 fn.bind(obj, param1, param2, ...) 的形式。第一种方式传参的特点是比较纯粹，在事件绑定中传递什么参数，函数中就接收什么参数，既不会多，也不会少。第二种就比较特殊一点，首先就是obj无论传什么都不影响参数接收，其次所有可见参数最末尾还隐含2个参数，vm、event，如果有需要，就可以直接拿来使用，不需要显示传递。

示例：

```html
<div class="container">
    <div class="flex align-center">
        <button class="btn btn-primary padding-l-lg padding-r-lg" 
                data-bind="click: function(vm,event){handleClick('add')}">+</button>
        <input class="margin-l-xs margin-r-xs text-align-center" data-bind="value: count">
        <button class="btn btn-primary padding-l-lg padding-r-lg" 
                data-bind="click: handleClick.bind(this,'reduce')">-</button>
    </div>
</div>

define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.count = ko.observable(0);
        self.handleClick = handleClick;

        function handleClick(type) {
            switch (type) {
                case 'add':
                    self.count(self.count() + 1);
                    break;
                case 'reduce':
                    self.count(self.count() - 1);
                    break;
                default:
                    break;
            }
        }
    }

    return ViewModel;
});
```

![event-args2](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/event-args2.gif)



## 自定义绑定

自定义绑定我们在实际开发中用的比较少，因为Knockout内置的这些绑定基本上就能满足绝大多数需求，不过有时候自定义绑定确实可以解决一些问题。

格式：data-bind="自定义名称:  xxx"

示例：

```html
<div class="container padding-20">
    <div class="flex flex-column align-center">
        <button class="btn btn-primary margin-b-xs" data-bind="text: btnText, click: toggle"></button>
        <div class="box-bigger bg-default" data-bind="slideVisible: show"></div>
    </div>
</div>

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
```

![custom-bind1](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112201222438.gif)

下面这段是网上摘抄的[代码片段](https://www.cnblogs.com/smallprogram/p/5959262.html)，可以看看update中具体做了些什么。

```js
ko.bindingHandlers.slideVisible = {
    update: function(element, valueAccessor, allBindings) {
        // First get the latest data that we're bound to
        var value = valueAccessor();
 
        // Next, whether or not the supplied model property is observable, get its current value
        var valueUnwrapped = ko.unwrap(value);
 
        // Grab some more data from another binding property
        var duration = allBindings.get('slideDuration') || 400; // 400ms is default duration unless otherwise specified
 
        // Now manipulate the DOM element
        if (valueUnwrapped == true)
            $(element).slideDown(duration); // Make the element visible
        else
            $(element).slideUp(duration);   // Make the element invisible
        }
    };
```



## 延迟绑定

有时候我们的绑定处理程序需要在元素附加到 DOM、 并且整个视图组合完成后，才能使用该元素。举个例子，我们需要测量 HTML 元素的尺寸。 Durandal 提供了一种绑定处理程序的方法，以便它在组合完成之前不会执行。**这在我们公司的老项目中使用的非常频繁！**

格式：

```html
<div data-bind="myCustomHandler">
	code...
</div>

composition.addBindingHandler('myCustomHandler',{
    init:function(dom){
 
    },
    update:function(dom){
 
    }
});
```

示例1：先列举一个不使用 composition.addBindHandler() 的情形

```html
<div class="container padding-20">
    <div id="test" class="box-bigger bg-default"></div>
</div>

define(['durandal/app', 'durandal/system', 'knockout', 'jquery'], function (app, system, ko, $) {
    function ViewModel() {
        var width = $("#test").css("width");
        console.log('----------test------------width：' + width);
    }

    return ViewModel;
});
```

打印结果：

![image-20211223094939126](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112230949622.png)



示例2：使用 composition.addBindHandler() 的情形

```html
<div class="container padding-20" data-bind="myCustomHandler">
    <div id="test" class="box-bigger bg-default"></div>
</div>

define(['durandal/app', 'durandal/system', 'durandal/composition', 'knockout', 'jquery'], function (app, system, composition, ko, $) {
    function ViewModel() {

        composition.addBindingHandler('myCustomHandler', {
            init: function (dom) {
                var width = $("#test").css("width");
                console.log('----------test------------width：' + width);
            },
            update: function (dom) {
                
            }
        });
    }

    return ViewModel;
});
```

打印结果：

![image-20211223101531535](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112231015663.png)

小技巧：init 方法中的 dom 即html中data-bind的DOM元素，实际开发中我们经常将它赋值给全局变量，后面就可以使用诸如 $dom.find("#test")  这样的方法来获取当前页面中的DOM元素。这比直接使用 $("#test") 要好，因为 $("#test") 是在整个页面中检索，它可能会获取到当前页面之外的相同id的元素，从而产生一些意想不到的bug。

```html
define(['durandal/app', 'durandal/system', 'durandal/composition', 'knockout', 'jquery'], function (app, system, composition, ko, $) {
    function ViewModel() {
        var $dom = null;

        composition.addBindingHandler('myCustomHandler', {
            init: function (dom) {
                $dom = $(dom);

                // var width = $("#test").css("width");

                var width = $dom.find("#test").css("width");

                console.log('----------test------------width：' + width);
            },
            update: function (dom) {

            }
        });
    }

    return ViewModel;
});
```



## 组件化

组件化是现代前端开发框架(如Vue、React等)中非常重要的特性，可以称得上是半壁江山中(另外一半是数据驱动)。所谓组件化，简单理解就是将一个app或者页面，按照某种组织原则拆分成多个相对独立的模块。以页面为例，任何独立的可视或者可交互的区域都可以视为一个组件，比如：头部(header)、尾部(footer)、或其它可复用的区块。

下面是组件化形象的示意图：

![image-20211223142044596](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112231420257.png)

### compose

**格式：data-bind="compose:  xxx"**

**规则1：**如果 compose 绑定解析为字符串，则假定它是模块或视图的标识符。如果字符串以视图引擎识别的扩展名结尾，则通过调用其 locateView 函数来使用 viewLocator 模块，该函数返回识别的视图部分，实现为 DOM 片段。然后使用 binder 模块将该视图绑定到 bindingContext 并将其注入到 compose 绑定所在的元素中。如果它不被 viewLocator 识别，则假定它是一个模块 ID。然后使用 RequireJS 来要求模块。完成后，viewLocator 用于定位模块的常规视图，binder 用于绑定它们，并将其注入到元素中。

举例：

1. **data-bind="compose: 'myView.html'"**：查找并定位视图，将其绑定到父上下文并将其组合到声明绑定的 DOM 节点中。

2. **data-bind="compose: 'shell'"**：使用RequireJS获取shell模块及对应的视图，绑定它们并注入到声明绑定的DOM节点。

3. **data-bind="compose: someProperty"**：判断 someProperty 的类型，如果是字符串，则按照上面指定的规则完成组合，绑定视图被注入到声明此绑定的dom节点上，如果是对象则按照后面的规则完成组合。



**规则2：**如果视图属性存在，但没有模型属性，则视图将被解析并绑定到 bindingContext，然后注入到元素中。如果模型属性存在，但没有视图属性，则 viewLocator 将用于定位常规视图，它们将被绑定，然后注入到元素中。如果模型和视图属性都存在，那么它们将被绑定并注入到元素中。请记住，如果模型是一个字符串，它将被假定为一个模块 id，并将使用 RequireJS 解析。同样，如果视图是一个字符串，它将在绑定之前使用 viewLocator 进行解析。注意：以这种方式指定视图时，不需要视图的文件扩展名。

举例：

1. **data-bind="compose: { model: someModelProperty }"**：someModelProperty 的值与 viewLocator 一起使用以获取视图。然后将它们绑定并将视图注入到 DOM 节点中。

2. **data-bind="compose: { view:someViewProperty }"**：判断 someViewProperty 的类型，如果是字符串，则使用viewLocator定位视图，否则它自身被认定为一个视图。不管是哪种情况，得到的结果视图将被注入到 DOM 节点中。

3. **data-bind="compose: { model:someModelProperty, view:someViewProperty }"**：someModelProperty 的值已解析，解析 someViewProperty 的值并构造一个视图， 然后将两者绑定并注入到 DOM 节点。

4. **data-bind="compose: { model:someModelProperty, view:'myView.html' }"**：someModelProperty 的值已解析，然后使用 viewLocator 获取 view 指示的视图，然后将它们绑定并将视图注入到 DOM 节点中。

5. **data-bind="compose: { model:'shell', view:someViewProperty }"**：用RequireJS 加载 shell 模块， someViewProperty 的值被解析并返回一个视图，然后将视图绑定到已解析的模块并注入到 DOM 节点。

6. **data-bind="compose: { model:'shell', view:'myView.html' }"**：用RequireJS 加载 shell 模块，然后使用 viewLocator 获取 view 指示的视图，最后两者进行绑定并注入到 DOM 节点中。

> ​	更多使用语法参考官方文档中 [Using-Composition](http://durandaljs.com/documentation/Using-Composition.html) 章节。



示例：下面是一个todolist的简单示例。

```html
//index.html
<div class="container padding-20">
    <div class="row">
        <div class="col-md-12">
            <input data-bind="value: content, event: {keyup: handleKeyUp}" style="width: 4rem; height: 0.36rem">
            <button class="btn btn-primary" data-bind="click: handleClick">添加</button>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12" data-bind="foreach: todoList" style="width: 4.8rem">
            <div data-bind="compose: new $root.TodoItem($data)"></div>
            <!--下面这种也可以-->
<!--            <div data-bind="compose: {model: new $root.TodoItem($data), view: 'composition/compose/todoItem.html'}"></div>-->
        </div>
    </div>
</div>

//index.js
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


//todoItem.html
<div class="width-100">
    <div class="flex align-center justify-between">
        <div class="flex align-center">
            <input type="checkbox" value="1" data-bind="checked: checked" style="margin: 0; cursor:pointer;">
            <span class="margin-l-xs" data-bind="text: content, css: {'completed': checked()}"></span>
        </div>
        <button class="btn btn-link" data-bind="click: remove">删除</button>
    </div>
</div>

//todoItem.js
define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel(todo) {
        var self = this;
        self.checked = ko.observable(todo.checked);
        self.content = ko.observable(todo.content);
        self.remove = remove;

        function remove() {
            if (todo.remove && typeof todo.remove === 'function') {
                todo.remove(todo.id);
            }
        }

    }

    return ViewModel;
});
```



### register

格式：ko.components.register('component-name', {

​				viewModel: 模型,

​				template: 模板

​			});

- Component-name：注册组件的名称，在同一个app中，组件名称必须唯一，否则无法注册成功！

- viewModel：可以是构造函数、共享对象实例、createViewModel工厂函数、**AMD模块**，我们使用的最多的是AMD模块。
- template：可以是现有元素ID、现有元素实例、一串标记、DOM节点数组、文档片段、其值描述模板的AMD模块，我们使用最多的还是**AMD模块**。

具体每一种情况的示例，请查看这篇[文章](https://www.cnblogs.com/smallprogram/p/5972518.html)。下面仅列举实际开发中最常用的情景。



示例1：Demo性质的示例，主要体会一下register方式使用组件的方式，实际开发不会这么简单。

- child-comp 是我们注册的组件，可以直接像原生的html标签那样使用，由于浏览器会自动将html中的大写字母转换为小写，因此注册组件时尽量使用小写字母加中横线方式(类似于Vue)。
- ChildViewModel 是一个构造函数，这里直接定义在了父组件的视图模型中，实际开发很少这么做，大多数情况都是以AMD模块方式引入。template 模板这里简单的使用了html字符串，实际开发一般也是通过AMD模块引入。

```html
<div class="container padding-20">
    <h1 data-bind="text: parentTitle"></h1>
    <hr/>
    <!--使用注册的组件-->
    <child-comp></child-comp>
</div>


define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {

    function ViewModel() {
        this.parentTitle = ko.observable('我是父组件标题');
    }

    //构造函数 
    function ChildViewModel() {
        this.chldTitle = ko.observable('我是子组件标题');
    }

    ko.components.register('child-comp', {
        viewModel: ChildViewModel,
        template: '<div><h2 data-bind="text: chldTitle"></h2></div>'  //字符串
    });

    return ViewModel;
});
```

页面显示：

![image-20211224095536376](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112240955582.png)

示例2：AMD方式引入(比较重要)

- Index是父组件模块，child是子组件模块，index.js中通过AMD方式引入子组件相关内容。这里需要注意的小知识点是html引入的方式比较独特，**text!路径/xxx.html**。类似的还有css的引入  **css!路径/xxx.css**。
- viewModel和template分别使用AMD引入的子组件的ViewModel和template。

```html
//父组件
//index.html
<div class="container padding-20">
    <h1 data-bind="text: title"></h1>
    <hr/>
    <child-comp2></child-comp2>
</div>

//index.js
define(['durandal/app', 'durandal/system', 'knockout', './child', 'text!./child.html'], function (app, system, ko, childViewModel, template) {
    function ViewModel() {
        this.title = ko.observable('我是父组件标题');
    }

    ko.components.register('child-comp2', {
        viewModel: childViewModel,
        template: template
    });

    return ViewModel;
});


//子组件
//child.html
<div>
    <h2 data-bind="text: title"></h2>
</div>

//child.js
define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {

    function ViewModel() {
        this.title = ko.observable('我是子组件标题');
    }

    return ViewModel;
});
```



示例3：父子组件通信

KO中父子组件通信与React类似，父组件传递数据给子组件，直接通过属性方式传入，子组件传递数据给父组件要通过回调方法。

- 父组件向子组件传递数据，统一通过一个params属性传递，可以传递任意类型的数据，包括 observable 的数据。
- 父组件传递给子组件的observable数据如果直接绑定在子组件的DOM元素上，则当父组件中该数据改变时，子组件中也会相应改变，但子组件中不可以直接对其进行修改。
- 子组件向父组件传递数据，需要通过回调函数进行，因此父组件需要将此回调函数在 params 中传递下去，并且要在父组件中编写该回调函数的具体逻辑。

```html
//父组件
//index.html
<div class="container padding-20">
    <h1 data-bind="text: title"></h1>
    <button class="btn btn-primary margin-t-xs" data-bind="click: handleClick">父组件按钮</button>
    <hr/>
    <child-comp3
            params='stringValue: "hello",
            numericValue: 123,
            boolValue: true,
            objectValue: { a: 1, b: 2 },
            dateValue: new Date(),
            someValue: someValue,
            someObservable: someObservable(),
            someMethod: someMethod'>
    </child-comp3>
</div>

//index.js
define(['durandal/app', 'durandal/system', 'knockout', './child', 'text!./child.html'], function (app, system, ko, childViewModel, template) {
    function ViewModel() {
        var self = this;
        self.title = ko.observable("我是父组件标题");
        self.someValue = 'Prop from parent';
        self.someObservable = ko.observable('Observable from parent');
        self.someMethod = function (data) {
            self.someObservable(data);
        };

        self.handleClick = function () {
            self.someObservable('Observable from parent changed by parent!');
        }
    }

    ko.components.register('child-comp3', {
        viewModel: childViewModel,
        template: template
    });

    return ViewModel;
});


//子组件
//child.html
<div>
    <h1 data-bind="text: title"></h1>
    <button class="btn btn-primary margin-t-xs" data-bind="click: handleClick">子组件按钮</button>
    <h4 class="margin-t-xs" data-bind="text: stringValue"></h4>
    <h4 class="margin-t-xs" data-bind="text: numericValue"></h4>
    <h4 class="margin-t-xs" data-bind="text: boolValue"></h4>
    <h4 class="margin-t-xs" data-bind="text: objectValue"></h4>
    <h4 class="margin-t-xs" data-bind="text: dateValue"></h4>
    <h4 class="margin-t-xs" data-bind="text: someValue"></h4>
    <h4 class="margin-t-xs" data-bind="text: someObservable"></h4>
</div>

//child.js
define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {

    function ViewModel(params) {
        var self = this;
        self.stringValue = params.stringValue;
        self.numericValue = params.numericValue;
        self.boolValue = params.boolValue;
        self.objectValue = JSON.stringify(params.objectValue);
        self.dateValue = params.dateValue.getFullYear() + '-' + (params.dateValue.getMonth() + 1) + '-' + params.dateValue.getDate();
        self.someValue = params.someValue;
        self.someObservable = params.someObservable;
        self.someMethod = params.someMethod;

        self.handleClick = function () {
            if (self.someMethod && typeof self.someMethod === 'function') {
                self.someMethod("Observable from parent changed by child");
            }
        }

        self.title = ko.observable("我是子组件标题");
    }

    return ViewModel;
});
```

![composition](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112241024510.gif)



# Durandal

## 启动流程

公司的Durandal项目的启动流程主要分两种。一种是类似城管系统的以 xxx.htm 为入口的流程，另一种是类似综管服系统以 index.html 为入口的流程。不管是哪一种，都有一个核心步骤，即必须引入require.js，且必须设置data-main属性  <script src="lib/require/require.js" data-main="app/main"></script>。

> 注意：Require.js 不一定是显示引入，也可以动态创建<script>标签引入，实际上这种方式更常见。
>
> 例如 bootstrap.js 中有如下代码块：
>
> ```js
> var mainScript = document.createElement("script");
> mainScript.setAttribute("type", "text/javascript");
> mainScript.setAttribute("data-main", win.eUrban.global.rootPath + "view/main/main.js?t=" + (new Date()).getTime());
> mainScript.setAttribute("src", win.eUrban.global.rootPath + "library/3rdparty/require/require-2.1.11.min.js?t=" + (new Date()).getTime());
> document.getElementsByTagName("head").item(0).appendChild(mainScript);
> ```



### index.html



<img src="https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112281251145.png" alt="image-20211228125056206" style="zoom:75%;" />



### main.htm

​		<img src="https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112281305369.png" alt="image-20211228130434741" />



## 路由配置

Durandal项目如果只有一两个简单的页面，一般不需要使用路由。但是如果系统较复杂、层级较多，则需要使用路由(router) 甚至需要使用多级路由。

1. 在mian.js配置router插件。
2. 在路由配置的页面(习惯命名desktop.js、shell.js等)引入plugins/router模块。
3. 通过固定套路 router.map().buildNavigationModel().activate() 构建路由数据，对应的html中就可以遍历 router.navigationModel 得到配置的路由信息。
4. 路由对象属性：
   - route：可以是数组或者字符串，如果存在下级路由，则route字符串需以 *details 结尾，表示此路由下有子路由。
   - moduelId：对应页面路径，Durandal项目中每个页面都对应一组文件(xxx.html、xxx.js)。
   - title：路由的标题，用于前台展示。
   - nav：可以配置true或者配置数字序号类似于display_order，能够控制显示顺序。但是不能配置false，否则会不起作用。
   - **注意：这里还可以自己任意扩展其它属性，如果有需要的话。**
5. 路由配置页面html中 data-bind="router: { transition:'entrance', cacheViews:true }"  是固定写法。可以将其理解为一个占位div容器，当切换不同路由时，这里显示不同内容。

```html
//main.js
app.configurePlugins({
    router:true,
});

//shell.js
define(['plugins/router'], function (router) {
    return {
        router: router,
        activate: function () {
            return router.map([
                {route: ['', 'home'],    moduleId: 'hello/index',   title: 'Hello World',  nav: true },
                {route: 'binds*details', moduleId: 'binds/index',   title: 'KO Binds',  nav: true },
                {route: 'composition*details', moduleId: 'composition/index', title: 'Composition', nav: true },
                { route: 'event',    moduleId: 'event/index',   title: 'Events',   nav: true },
                { route: 'lifecycle',   moduleId: 'lifecycle/index', title: 'Lifecycle',  nav: true },
            ]).buildNavigationModel()
              .mapUnknownRoutes('hello/index', 'not-found')
              .activate();
        }
    };
});


//shell.html
<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul class="nav navbar-nav" data-bind="foreach: router.navigationModel">
      	<li data-bind="css: { active: isActive }">
        	<a data-bind="attr: { href: hash }, text: title"></a>
				</li>
    </ul>
</div>

<div class="page-host" data-bind="router: { transition:'entrance', cacheViews:true }"></div>
```

6. 如果需要使用多级路由，则父路由对象的 route 务必配置为 xxxx*details，否则不起作用。

7. 使用固定套路 router.createChildRouter().makeRelative().map().buildNavigationModel() 构建下级路由数据。同样在html中可以通过router.navigationModel()得到配置的路由信息。

   > 提示：<!--ko router: { transition:'entrance', cacheViews:true }--><!--/ko-->，与 <div data-bind="router: { transition:'entrance', cacheViews:true }"></div> 的作用是一样的，这里只是为了展示不同的写法。

```html
//composition/index.js
define(['plugins/router', 'knockout'], function(router, ko) {
    var childRouter = router.createChildRouter()
        .makeRelative({
            moduleId:'composition',
            fromParent:true
        }).map([
            { route: ['', 'compose'],    moduleId: 'compose/index',       title: 'Compose',      nav: true },
            { route: ['register'],       moduleId: 'register/index',      title: 'Register',     nav: true },
            { route: ['register2'],      moduleId: 'register2/index',     title: 'Register2',    nav: true },
            { route: ['register3'],      moduleId: 'register3/index',     title: 'Register3',    nav: true },
            { route: ['setRoot'],        moduleId: 'setRoot/index',       title: 'SetRoot',      nav: true },
        ]).buildNavigationModel();

    return {
        router: childRouter,
    };
});


//composition/index.html
<div class="full-screen">
  <div class="width-100 height-100">
    <div class="col-md-2 height-100 padding-0">
        <ul class="well nav nav-pills nav-stacked height-100 auto-scroll">
            <li class="nav-header">Composition Examples</li>

            <!--ko foreach: router.navigationModel()-->
            <li data-bind="css: { active: isActive }">
                <a data-bind="attr: { href: hash }, text: title"></a>
            </li>
            <!--/ko-->
        </ul>
    </div>
    <div class="col-md-10 height-100 padding-0">
      <!--ko router: { transition:'entrance', cacheViews:true }--><!--/ko-->
    </div>
  </div>
</div>
```



## 生命周期

Durandal 有9个生命周期方法(如下图所示)，其中我们使用的较多的2个是 activate、deactivate，分别可以用来做一些初始化工作和释放资源操作。

<img src="https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112281114368.png" alt="image-20211228111425942" style="zoom:75%;" />

```js
define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.canActivate = function () {
            console.log('----------------------canActivate----------------------');
            return true;
        };
        self.activate = function () {
            console.log('----------------------activate----------------------');
        };
        self.binding = function () {
            console.log('----------------------binding------------------------');
            return {cacheViews: false};
        };
        self.bindingComplete = function () {
            console.log('----------------------bindingComplete------------------');
        };
        self.attached = function (view, parent) {
            console.log('----------------------attached--------------------------');
        };
        self.compositionComplete = function (view) {
            console.log('----------------------compositionComplete-----------------');
        };
        self.canDeactivate = function () {
            console.log('----------------------canDeactivate--------------------');
            return true
        };
        self.deactivate = function () {
            console.log('----------------------deactivate-----------------------');
        };
        self.detached = function (view) {
            console.log('----------------------detached------------------------');
        }
    }

    return ViewModel;
});
```

![image-20211227224548313](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112272246965.png)

![image-20211227224816078](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112272248356.png)



## 事件机制

- 事件监听

  app.off("xxx"); 

  app.on("xxx").then(function(data){

  ​		---code---

  });

- 事件触发

  app.trigger("xxx", data); 

1. xxx作为事件ID须保证唯一性(例如：app:navigator:open:dialog)，以便和其它事件进行区分。
2. app.trigger中的data在app.on().then()的回调函数中以参数的形式接收，从而实现数据的传递。

```js
//navicertapply.js 监听事件
app.off('app:construction:choose:site');
app.on('app:construction:choose:site').then(function (data) {
   
});

//chooseSite.js 中触发事件
app.trigger("app:construction:choose:site", self._selectedSite);
```

类比一下jquery：

```js
$("p").off("click");
$("p").on("click", function(event, a, b){
	
});
$("p").trigger("click", ["Hello","World!"]);
```



## 另类组件

Durandal中还有一种常用的封装组件的方式，它不同与KO组件直接通过 compose 或 register 引入，而是先使用一个div进行占位，然后通过setRoot的方式动态替换占位div的内容。这种方式在公司的老项目中使用的特别多，因此很有必要单独讲一下。

格式：app.setRoot(view, null, 'replace',  data);

- 参数1：目标组件的路径，注意不要带.js后缀；
- 参数2：过渡动效，一般直接传null即可；
- 参数3：占位div的id;
- 参数4：父组件传递给子组件的数据(注意Durandal原生的app.js并不支持第4个参数，是政通的研发自己扩展的)

​	<img src="https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112281033901.png" alt="image-20211228103235570" style="zoom:50%;" />



示例：

如下所示，index.html是父组件布局文件，common-dialog 是一个公共弹框，其中 id="replace" 的div是一个占位div。通过点击上方的按钮进行内容的切换。content1、content2、content3 分别对应3个不同组件，分别显示文本、图片、视频。

**注意要点：**

1. index.js中切换内容的方式(setRoot) 和 content1.js 中获取参数数据的方式(self._ $_param) 。
2. content1中使用了前面讲过的延迟绑定技巧，这是因为直接在ViewModel最外层是拿不到参数数据的，这与代码的执行顺序有关，实际上可以放到任意生命周期钩子函数中都可以，但是习惯上我们一般使用 activate 。
3. 组件内部要回传数据给父组件怎么办？同样可以使用Durandal事件机制那一套处理(app.off、app.on().then()、app.trigger)。

```html
//index.html
<div class="container padding-20">
    <div class="flex-align-center justify-center">
        <button id="content1" class="btn btn-danger" data-bind="click: handleClick">显示内容1</button>
        <button id="content2" class="btn btn-danger margin-l-md" data-bind="click: handleClick">显示内容2</button>
        <button id="content3" class="btn btn-danger margin-l-md" data-bind="click: handleClick">显示内容3</button>
    </div>

    <hr/>
    <p>JavaScript（简称“JS”） 是一种具有函数优先的轻量级，解释型或即时编译型的编程语言。虽然它是作为开发Web页面的脚本语言而出名，但是它也被用到了很多非浏览器环境中，JavaScript 基于原型编程、多范式的动态脚本语言，并且支持面向对象、命令式、声明式、函数式编程范式。 [1]
        JavaScript在1995年由Netscape公司的Brendan Eich，在网景导航者浏览器上首次设计实现而成。因为Netscape与Sun合作，Netscape管理层希望它外观看起来像Java，因此取名为JavaScript。但实际上它的语法风格与Self及Scheme较为接近。 [2]
        JavaScript的标准是ECMAScript 。截至 2012 年，所有浏览器都完整的支持ECMAScript 5.1，旧版本的浏览器至少支持ECMAScript 3 标准。2015年6月17日，ECMA国际组织发布了ECMAScript的第六版，该版本正式名称为 ECMAScript 2015，但通常被称为ECMAScript 6 或者ES2015。</p>

    <div id="commonDialog" class="common-dialog" data-bind="visible:isShow">
        <div class="title-bar">
            <span class="text" data-bind="text: dialogTitle"></span>
            <span class="closed" data-bind="click:hideDialog">✕</span>
        </div>
        <div class="content">
            <!--占位容器-->
            <div id="replace" class="relative height-100"></div>
        </div>
    </div>
</div>


//index.js
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


//content1.html
<div class="container-fluid height-100" data-bind="Content1Handler">
    <div class="height-100">
        <h3 class="text-align-center margin-t-md" data-bind="text: content"></h3>
        <div class="margin-t-md text-align-center">
            name：<span data-bind="text: name"></span><br/>
            age：<span data-bind="text: age"></span>
        </div>
    </div>
</div>

//content1.js
define(['durandal/app', 'durandal/system', 'durandal/composition', 'knockout'], function (app, system, composition, ko) {
    function ViewModel() {
        var self = this;
        self.content = ko.observable('我是内容1');
        self.name = ko.observable();
        self.age = ko.observable();

        composition.addBindingHandler('Content1Handler', {
            init: function (dom) {
                //获取父组件传递过来的数据
                var data = self._$_param || {};
                self.name(data.name);
                self.age(data.age);
            }
        });
    }

    return ViewModel;
});

//content2、content3略
```

![content1](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112281056110.png)

![content2](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112281054527.png)

![content3](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112281055620.png)



# 扩展知识

## Commonjs & AMD

关于Commonjs和AMD规范演变过程，请参考阮一峰[JS模块化](https://note.youdao.com/s/TaQWIj3F)相关文章。

下面是现代JS库的一个起手式，以定义一个helloJs为例进行说明。它有如下特性：

- 同时支持script方式、commonJs方式、AMD方式引入。
- 仿照jquery的 $ 定义一个_。
- 既可以通过静态方法调用，又可以通过实例对象调用。

```js
(function (root) {
    var _ = function () {
        // 假如客户端以 _() 形式调用，第一次调用时，this指向的是window，执行结果return new _()，
        // 再次调用了_()，this指向的就是 _ 的一个实例了，就不会再进if内部，从而避免了循环调用。
        if (!(this instanceof _)) {
            return new _();
        }
    };

    //支持CommonJS规范和<script>方式 
    typeof module !== "undefined" && module.exports ? module.exports = _ : root._ = _;

    //支持AMD规范，依赖requireJs
    if (typeof define === "function" && define.amd) {
        define("helloJs", [], function () {
            return _;
        });
    }

   // sayHello方法同时定义在_及_的原型上，则客户端既可以通过静态方法调用，也可以通过实例对象调用。
    _.sayHello = function () {
        console.log('hello world!');
    };

    _.prototype.sayHello = function () {
        console.log('hello world!');
    };

    return _;
})(this);
```

1. 验证script方式引入：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JS模块化</title>
    <script src="./helloJs.js"></script>
</head>
<body>

<script>
    _.sayHello();
    _().sayHello();
</script>
</body>
</html>
```

2. 验证AMD方式引入

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JS模块化</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/require.js/2.3.6/require.js"></script>
</head>
<body>

<script>
    require(['./helloJs'], function (_) {
        _.sayHello();
        _().sayHello();
    })
</script>
</body>
</html>
```

3. 验证CommonJs引入(运行node命令)

```js
let _ = require('./helloJs');

_.sayHello();
_().sayHello();
```



## Nginx

Nginx是一个轻量级Web服务器，它不仅是一个高性能的HTTP和反向代理服务器，同时也是一个IMAP/POP3/SMTP 代理服务器。Nginx的核心功能(高并发、高效率、负载均衡等)属于后台的范畴，我们这里主要关注与前端相关的功能---反向代理。

- 学习文档

  官方文档：http://nginx.org/en/docs/  

  中文文档：https://www.nginx.cn/doc/ 

  

- 正向代理、反向代理

  ![正反向代理](https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112271305798.png)



- 常用命令

​		nginx                  --启动(windows系统启动命令 start nginx)

​        nginx -s stop     --直接退出

​        nginx -s quit      --保存并退出

​        nginx -s reload  --重新加载配置文件



- 其它说明

 	  由于公司的前端项目主要有2大类：

​		1.Durandal+Knockout 为主的老项目(如：城管、监督指挥大屏、渣土子系统等 );  

​		2.React、Vue为代表的新项目。

​		因此下面即将介绍的nginx使用也分2大类进行讲解。另外由于作者本人使用Mac系统，故下面的配置文件的文件路径以mac系统盘符		为准(/Users/yuanchao/xxxx/)，windows系统略有不同(C:\Documents\)，请windows用户自行修改或百度。



### 老项目配置

我们这里主要是通过nginx转发，把本地的请求转发到所配置的服务器上面去，最常见的就是转发到现场的外网上。这是因为Durandal项目属于早期项目，前后端并未分离，如果你不想自己本地起一个服务的话，就只能连别人的服务，nginx就可以帮我们做到这一点。

这里举2个例子，一个是app下的监督指挥大屏项目(screen-standard)，一个是plugin下的渣土项目(construction_v2)。如果工作中遇到类似场景，对照这两个配置文件修改即可。

- **screen-standard**

  ```nginx
  #user  nobody;
  worker_processes  1;
  
  #error_log  logs/error.log;
  #error_log  logs/error.log  notice;
  #error_log  logs/error.log  info;
  
  #pid        logs/nginx.pid;
  
  
  events {
      worker_connections  1024;
  }
  
  
  http {
      include       mime.types;
      default_type  application/octet-stream;
  
      #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
      #                  '$status $body_bytes_sent "$http_referer" '
      #                  '"$http_user_agent" "$http_x_forwarded_for"';
  
      #access_log  logs/access.log  main;
  
      sendfile        on;
      #tcp_nopush     on;
  
      #keepalive_timeout  0;
      keepalive_timeout  65;
  
      #gzip  on;
  	
      server {
          listen       8090;
          server_name  localhost;
  				root _site;
  				index index.html;
          #charset koi8-r;
  
          #access_log  logs/host.access.log  main;
  
  				# 用来登陆
          location /eUrbanMIS1201{
  					proxy_pass http://123.56.170.103:8080/eUrbanMIS1201;
  					proxy_set_header Host $host:$server_port;
  					proxy_set_header X-Real-IP $remote_addr;
  					proxy_set_header REMOTE-HOST $remote_addr;
  					proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  					send_timeout 10;
  					client_max_body_size 100m;
  					proxy_http_version 1.1;
  					proxy_set_header Upgrade $http_upgrade;
  					proxy_set_header Connection "upgrade";
  					add_header Cache-Control max-age=0;
          }
  
  				location /eUrbanMIS1201/egova-app/socket{
  					proxy_pass http://123.56.170.103:8080/eUrbanMIS1201/socket;
  					proxy_set_header Host $host:$server_port;
  					proxy_set_header X-Real-IP $remote_addr;
  					proxy_set_header REMOTE-HOST $remote_addr;
  					proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  					send_timeout 10;
  					client_max_body_size 100m;
  					proxy_http_version 1.1;
  					proxy_set_header Upgrade $http_upgrade;
  					proxy_set_header Connection "upgrade";
  					add_header Cache-Control max-age=0;
  				}
  
  				# 用来访问相对的后台接口
  				location /eUrbanMIS1201/egova-app/home {
  					proxy_pass http://123.56.170.103:8080/eUrbanMIS1201/home;
          } 
  
          location /eUrbanMIS1201/mediadl {
              proxy_pass http://123.56.170.103:8080/eUrbanMIS1201/mediadl;
          }
  
  				# 用来发布前台文件
  				location /eUrbanMIS1201/view/screen-standard {
  					alias /Users/yuanchao/Egova/wizdom-urban-v14/app/src/main/webapp/view/screen-standard;
  				}
  
          location /eUrbanMIS1201/style/screen-standard {
  					alias /Users/yuanchao/Egova/wizdom-urban-v14/app/src/main/webapp/style/screen-standard;
          }
  
  				location /eUrbanMIS2101/library/screen-standard {
  					alias /Users/yuanchao/Egova/wizdom-urban-v14/app/src/main/webapp/library/screen-standard;
  				}
  		
          #error_page  404              /404.html;
  
          # redirect server error pages to the static page /50x.html
          #
          error_page   500 502 503 504  /50x.html;
          location = /50x.html {
              root   html;
          }
  
          # proxy the PHP scripts to Apache listening on 127.0.0.1:80
          #
          #location ~ \.php$ {
          #    proxy_pass   http://127.0.0.1;
          #}
  
          # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
          #
          #location ~ \.php$ {
          #    root           html;
          #    fastcgi_pass   127.0.0.1:9000;
          #    fastcgi_index  index.php;
          #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
          #    include        fastcgi_params;
          #}
  
          # deny access to .htaccess files, if Apache's document root
          # concurs with nginx's one
          #
          #location ~ /\.ht {
          #    deny  all;
          #}
      }
  
  
      # another virtual host using mix of IP-, name-, and port-based configuration
      #
      #server {
      #    listen       8000;
      #    listen       somename:8080;
      #    server_name  somename  alias  another.alias;
  
      #    location / {
      #        root   html;
      #        index  index.html index.htm;
      #    }
      #}
  
  
      # HTTPS server
      #
      #server {
      #    listen       443 ssl;
      #    server_name  localhost;
  
      #    ssl_certificate      cert.pem;
      #    ssl_certificate_key  cert.key;
  
      #    ssl_session_cache    shared:SSL:1m;
      #    ssl_session_timeout  5m;
  
      #    ssl_ciphers  HIGH:!aNULL:!MD5;
      #    ssl_prefer_server_ciphers  on;
  
      #    location / {
      #        root   html;
      #        index  index.html index.htm;
      #    }
      #}
  }
  ```

​		访问方式：http://localhost:8090/eUrbanMIS1201/main.htm                                     ---登录

​                           http://localhost:8090/eUrbanMIS1201/view/standardScreen.html        ---大屏首页

- **construction_v2**

  ```nginx
  #user  nobody;
  worker_processes  1;
  
  #error_log  logs/error.log;
  #error_log  logs/error.log  notice;
  #error_log  logs/error.log  info;
  
  #pid        logs/nginx.pid;
  
  
  events {
      worker_connections  1024;
  }
  
  
  http {
      include       mime.types;
      default_type  application/octet-stream;
  
      #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
      #                  '$status $body_bytes_sent "$http_referer" '
      #                  '"$http_user_agent" "$http_x_forwarded_for"';
  
      #access_log  logs/access.log  main;
  
      sendfile        on;
      #tcp_nopush     on;
  
      #keepalive_timeout  0;
      keepalive_timeout  65;
  
      #gzip  on;
  	
      server {
          listen       8090;
          server_name  localhost;
  				root _site;
  				index index.html;
          #charset koi8-r;
  
          #access_log  logs/host.access.log  main;
  
  				# 用来登陆
          location /eUrbanMIS1201{
  					proxy_pass http://123.56.170.103:8080/eUrbanMIS1201;
  					proxy_set_header Host $host:$server_port;
  					proxy_set_header X-Real-IP $remote_addr;
  					proxy_set_header REMOTE-HOST $remote_addr;
  					proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  					send_timeout 10;
  					client_max_body_size 100m;
  					proxy_http_version 1.1;
  					proxy_set_header Upgrade $http_upgrade;
  					proxy_set_header Connection "upgrade";
  					add_header Cache-Control max-age=0;
          }
  
  				location /eUrbanMIS1201/egova-app/socket{
  					proxy_pass http://123.56.170.103:8080/eUrbanMIS1201/socket;
  					proxy_set_header Host $host:$server_port;
  					proxy_set_header X-Real-IP $remote_addr;
  					proxy_set_header REMOTE-HOST $remote_addr;
  					proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  					send_timeout 10;
  					client_max_body_size 100m;
  					proxy_http_version 1.1;
  					proxy_set_header Upgrade $http_upgrade;
  					proxy_set_header Connection "upgrade";
  					add_header Cache-Control max-age=0;
  				}
  
  				# 用来访问相对的后台接口
  				location /eUrbanMIS1201/egova-app/home {
  					proxy_pass http://123.56.170.103:8080/eUrbanMIS1201/home;
          } 
  
          location /eUrbanMIS1201/mediadl {
              proxy_pass http://123.56.170.103:8080/eUrbanMIS1201/mediadl;
          }
  
  				# 用来发布前台文件
  				location /eUrbanMIS1201/view/construction {
  					alias /Users/yuanchao/Egova/WebRepository/resources/view/construction;
  				}
  
          location /eUrbanMIS1201/view/construction_v3 {
              alias /Users/yuanchao/Egova/WebRepository/resources/view/construction_v3;
          }
  
  				location /eUrbanMIS2101/style/construction {
  					alias /Users/yuanchao/Egova/WebRepository/resources/style/construction;
  				}
  		
          #error_page  404              /404.html;
  
          # redirect server error pages to the static page /50x.html
          #
          error_page   500 502 503 504  /50x.html;
          location = /50x.html {
              root   html;
          }
  
          # proxy the PHP scripts to Apache listening on 127.0.0.1:80
          #
          #location ~ \.php$ {
          #    proxy_pass   http://127.0.0.1;
          #}
  
          # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
          #
          #location ~ \.php$ {
          #    root           html;
          #    fastcgi_pass   127.0.0.1:9000;
          #    fastcgi_index  index.php;
          #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
          #    include        fastcgi_params;
          #}
  
          # deny access to .htaccess files, if Apache's document root
          # concurs with nginx's one
          #
          #location ~ /\.ht {
          #    deny  all;
          #}
      }
  
  
      # another virtual host using mix of IP-, name-, and port-based configuration
      #
      #server {
      #    listen       8000;
      #    listen       somename:8080;
      #    server_name  somename  alias  another.alias;
  
      #    location / {
      #        root   html;
      #        index  index.html index.htm;
      #    }
      #}
  
  
      # HTTPS server
      #
      #server {
      #    listen       443 ssl;
      #    server_name  localhost;
  
      #    ssl_certificate      cert.pem;
      #    ssl_certificate_key  cert.key;
  
      #    ssl_session_cache    shared:SSL:1m;
      #    ssl_session_timeout  5m;
  
      #    ssl_ciphers  HIGH:!aNULL:!MD5;
      #    ssl_prefer_server_ciphers  on;
  
      #    location / {
      #        root   html;
      #        index  index.html index.htm;
      #    }
      #}
  }
  ```

​		访问方式：http://localhost:8090/eUrbanMIS1201/main.htm                                    ---登录

​						   http://localhost:8090/eUrbanMIS1201/construction.htm                       ---渣土首页



### 新项目配置

对于React项目和Vue项目，自身就带有proxy相关配置，不走nginx也是可以的。但是对于生产环境下的调试，如果走nginx配置，会带来一些便利。比如，有些bug在开发环境下正常，但是在现场的生产环境下却出现异常。我曾经采取的办法就是每次更改一点代码，然后打包发送现场更新(实际开发中我们经常这么做)，然后不断重复这一操作，直到找出bug原因。如果使用nginx 我们可以直接将访问现场的 eUbanMIS/view/xxx 路径代理到访问本地资源，这样就不需要每次都发给现场更新了。如下所示：

```nginx
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;
	
    server {
        listen       8090;
        server_name  localhost;
				root _site;
				index index.html;
        #charset koi8-r;

        #access_log  logs/host.access.log  main;

				location /eUrbanMIS1201 {
            proxy_pass http://123.56.170.103:8080/eUrbanMIS1201;
            proxy_set_header Cookie "SESSION=2fcf13ee-4172-471a-97f3-72633fcf89e6";
        }

        #生产环境
        location /eUrbanMIS1201/view/build {
            alias /Users/yuanchao/Egova/WebRepository/wizdom-advertisement/build;
        }
		
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
}
```



## 屏幕适配

### 分辨率汇总

- 1024*600 （常见8.9寸电脑使用）

- 1024*768 （常用10.4、12.1、14.1、15寸电脑使用）4:3

- 1280*800  （常见10.8、12.1、15.4寸电脑使用）16:10
- 1280*854 （不常见）16:9
- 1280*1024（常用14.1、15寸电脑使用）5:4
- **1366*768（常见15.2寸电脑使用）15:10 （主流）**
- **1440*900 （仅苹果17寸电脑使用）16:10**

- 1440*1050（常用15、16.1寸电脑使用）4:3
- 1600 * 900  16:9 (非主流)

- 1600*1024（不常见）14:9
- 1600*1200（常用15、16.1寸电脑使用）4:3

- 1680*1050（常见15.4、20寸电脑使用）16:10

- **1920*1080 16:9 （主流）**

- 1920*1200（常见20寸电脑使用）16:10



### @media

/*>=1366的设备*/

@media (min-width: 1366px) {

​    	body{font-size: 24px;}

}  

/*>=1440的设备*/

@media (min-width: 1440px) {

​    	body{font-size: 25px !important;}

} 

/*>=1920的设备*/

@media (min-width: 1920px) {

​    	body{font-size: 33px;}

} 

<img src="https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112271013036.png" alt="image-20211227101227428" style="zoom:67%" />





### rem

rem方案是公司Durandal项目中使用最多的一种屏幕适配方案，使用起来也非常简单。封装一个remResponse.js文件，然后直接在程序入口处(如：index.html 或 main.jsp)中以<script>形式引入即可。实际开发中设计稿的宽度一般都是1920px。

```js
// remResponse.js
window.webSetting = {
    // 设计稿屏幕宽度
    designWidth: 1920,
    limitWidth: 1366
};

function initFontSize() {
    var baseWidth = document.documentElement.clientWidth >= window.webSetting.limitWidth ? document.documentElement.clientWidth : window.webSetting.limitWidth;
    var rath = window._screenRath = baseWidth / window.webSetting.designWidth;
    document.documentElement.style.fontSize = (rath * 100) + "px";
}

initFontSize();
window.addEventListener("resize", initFontSize);


//index.html 中引入
 <script type="text/javascript" src="./main/remResponse.js"></script>

//main.jsp 中引入
<script type="text/javascript" src="<c:url value='/view/adlet-manage/main/remResponse.js'/>"></script>
```



### px与rem换算

1.  **px转rem**

​		rem尺寸 = 实际尺寸[px]   /  html根元素fontSize[px]

​		rem尺寸 = 实际尺寸[px]   / ( (屏幕实际宽度 /  设计稿宽度)  * 100) [px]

​		rem尺寸 = 实际尺寸[px]   /  (ratio * 100)  [px]     

> 注意：rem的本义就是一个相对单位，相对于根元素的意思(rootElement)，由于我们实际开发中常常将根元素的fontSize定位整数	
>
> 100px，故当开发所用显示器的分辨率与设计稿相同时，直接用  actualSize /  100 即可快速得出rem数值。



2. **rem转px**

​		实际尺寸[px]  =   rem尺寸 * html根元素fontSize[px]

​		实际尺寸[px]  =   rem尺寸 *  ratio * 100  [px] 

​		实际尺寸[px]  =   rem尺寸 * (屏幕实际宽度 /  设计稿宽度)  * 100 [px]

> 注意：rem转px相对简单一些，由于我们实际开发中，我们的remResponse.js文件中通常都会保存一个 window._screenRatio，故通_
>
> 常我们只需要使用：rem尺寸 * window._screenRatio * 100 即可。



## 部署更新

### 两种更新模式

不同于新项目(React、Vue等)，Durandal项目有2种更新方式，取决于前端文件以何种形式存在。

- **形式一：适用于很小的项目，一般就一个单独页面，不需要用到路由(比如综管服导航页面 navigator)。**

​		app/src/main/webapp/view/项目名称/

​		app/src/main/webapp/style/项目名称/

​		app/src/main/webapp/library/项目名称/

​		前端发送更新时直接发送对应目录文件，现场部署时按照对应路径放置好即可。源代码中有 app/src/main/webapp，现场服务器上		不存在这段路径，直接就是 view/、style/、library/。

<img src="https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112271113713.png" alt="image-20211227110147610" style="zoom:50%;" />

- **形式二：适用于较大较复杂的项目，一般要用到路由(如渣土项目 construction_v2)。**

​		plugin/插件名称。

​        前后端代码都在一个插件中，不管修改了前端还是后台代码，都需要打jar包更新。

<img src="https://gitee.com/Allen_2017/picrepo/raw/master/knockout/202112271108022.png" alt="image-20211227110835062" style="zoom:50%;" />



### 覆盖更新

Durandal项目中存在一种覆盖更新的特殊情形。通常是用定制化的配置文件去覆盖标准版jar包中的对应文件，如：i18n 文件。这是因为我们的产品要做成标准版，要满足大多数现场的需求，所以很多东西不得不做成可配的，比如项目名称、标题、logo、背景图片等。这些东西通常都放到 i18n.js 或 i18n-ex.js等文件中，不同的现场根据实际需求自行修改这些配置，然后按照对应路径放置到服务器指定目录，这样程序运行时就会读取他们自己的配置文件，换句话说，也就是用定制化的文件覆盖标准版中的同名文件。



# 参考资料

Durandal官方文档：http://durandaljs.com/docs.html

Knockout官方文档：https://knockoutjs.com/documentation/introduction.html

Knockout技术博客：https://www.cnblogs.com/smallprogram/p/5976954.html
