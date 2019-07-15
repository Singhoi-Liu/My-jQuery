// 自调用函数,形成一个块级作用域,形成块级作用域,保护自己的代码
;
(function () {
    /**
     * 仿照jQuery,封装一个js文件
     * 需求:
     * 1.获取元素
     * 2.具有css方法
     * 3.操作类名addClass/removeClass/toggleClass
     */
    // jq中获取元素:$(css选择器),首先构造一个函数,在需要的时候调用


    function $(selector) {
        // 1.此时,返回的是一个伪数组,
        // let nodeList =document.querySelectorAll(selector);
        // return nodeList;
        // 3.此时需要给构造的函数new一个对象出来,调用自己的构造函数,并且返回
        return new Init(selector);
    };


   
    // 2.给原型添加方法,自己创建一个构造函数
    function Init(selector) {
        //4.返回的是一个位伪数组,伪数组里面装的是我们获取的元素,所以构造函数里面需要写获取元素的代码
        let nodeList = document.querySelectorAll(selector);
        // 5.此时Init还不是一个伪数组,需要我们自己历遍nodeList,然后创建一个伪数组
        for (let i = 0; i < nodeList.length; i++) {
            this[i] = nodeList[i];
        };
        this.length = nodeList.length;
    };



     // 13.封装一个历遍伪数组的方法
     Init.prototype.each=function(callback){
        for(let i=0;i<this.length;i++){
            // 历遍数组里面的逻辑是不固定的,传回调函数进来
            callback(i,this[i])
        };
    };

    //6.实现设置和获取css样式功能,jq对象.css(属性名,属性值)jq对象.css(属性名)
    Init.prototype.css = function (property, value) {


        // 10.实现获取css属性功能,如果第二个参数没有传,就是获取
        if (value == undefined) {
            return window.getComputedStyle(this[0])[property];
        } else {
            // 7.历遍数组,把属性拿出来再设置样式属性
            for (let i = 0; i < this.length; i++) {
                // 9.把需要带单位'px'的属性用数组装起来,再去用indexOf判断
                let pxArr = ['width', 'height', 'top', 'left'];
                if (pxArr.indexOf(property) != -1) {
                    // 8.判断value是否带单位'px'
                    if (value.toString().indexOf('px') === -1) {
                        this[i].style[property] = ('property', value + 'px')
                    } else {
                        this[i].style[property] = ('property', value);
                    }
                } else {
                    this[i].style[property] = ('property', value);
                };
            }
        //11.为了实现链式编程,return
        return this;
        }
    };



    // 11.实现addClass功能,jq里面添加时这样的:jq对象.addClass('类名')
    Init.prototype.addClass=function(className){
        // 12.历遍伪数组,把里面每个元素都实现类名添加
        for (let i=0;i<this.length;i++){
            this[i].classList.add(className);
        };
        return this;
    };


    // 14.封装一个jq移除类名的方法,给Init的父辈添加方法,历遍伪数组把元素全部进行移除
    Init.prototype.removeClass=function(className){
           this.each(function(i,e){
               e.classList.remove(className);
           });
           return this;
    }
     

    // 15.封装一个jq替换类名的方法,给Init的父辈添加方法,历遍伪数组把元素全部进行移除
    Init.prototype.toggleClass=function(className){
        this.each(function(i,e){
            e.classList.toggle(className);
        });
        return this;
    }




    window.$ = window.jQuery = $;
})();
    
//    需求:
let box = $('.box');
console.log(box)
box.css;
box.css('width', 200);
// box.css('height',200);
box.css('backgroundColor', 'red');
console.log(box.css('backgroundColor'));
box.addClass('a');
box.removeClass('b')
box.toggleClass('c')

