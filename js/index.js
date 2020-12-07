let side = document.querySelectorAll(".side");
let side_trigger = document.querySelectorAll(".side_trigger i");
console.log(side_trigger);
let list = document.getElementById("list");
let container = document.getElementById("container");
let dots = document.getElementById("control").getElementsByTagName("span");
// console.log(dots);
let left = 0;
let auto = null;
let index = 0;                                      // 当前显示图片的下标
let status = false;                              // 当前轮播图动画是否在执行
//侧边栏的是否收起
side_trigger[0].onclick = () => {
    if (side[0].style.right == "0px") {
        side[0].style.right = "-146px";
    } else {
        side[0].style.right = "0px";
    }
}
// 绑定鼠标移动进轮播图时，自动轮播停止
container.onmouseover = () => {
    clearInterval(auto);
}

// 绑定鼠标移动出轮播图时，自动轮播重新开启
container.onmouseout = () => {
    autoPlay();
}

// 绑定点击焦点图标的事件
for (let i = 0; i < dots.length; i++) {
    dots[i].onclick = () => {
        if (index == i || status) {
            return false;
        }
        let new_index = i;
        let new_left = i * -710;

        index = new_index;
        animate(new_left);
    }
}


// 轮播动画的方法
function animate (new_left) {
    status = true;      // 把动画执行状态设为true

    let left = parseInt(list.style.left);
    let offset = new_left - left;           // 总移动距离
    let interval = 10;                      // 速度的单位时间
    let speed = offset / (710 / interval);    // 在总移动距离下每个单位时间内移动的距离，也就是速度

    function go () {
        left = parseInt(list.style.left);      // 当前位置
        let next_left = left + speed;           // 当前加上速度就是下一个单位时间所在位置
        list.style.left = next_left + "px";

        if (speed < 0 && next_left >= new_left || speed > 0 && next_left <= new_left) {
            setTimeout(() => {
                go();
            }, interval)
        } else {
            list.style.left = new_left + "px";        // 由于移动可能会有一部偏差，所以最后时把list的位置强制放到终点上
            changeDot();
            status = false;         // 动画结束，并且把动画状态设置为false
        }
    }

    go();
}

// 自动轮播图片的方法
function autoPlay () {
    auto = setInterval(() => {
        status = true;      // 把动画执行状态设为true
        index = ++index > 6 ? 0 : index;
        let new_left = -710 * index;
        if (new_left <= -4260) {
            new_left = 0;
            list.style.left = new_left + "px";
        }
        let left = parseInt(list.style.left);

        let offset = new_left - left;           // 总移动距离
        console.log(offset);
        let interval = 10;                      // 速度的单位时间
        let speed = offset / (710 / interval);    // 在总移动距离下每个单位时间内移动的距离，也就是速度

        function go () {
            left = parseInt(list.style.left);      // 当前位置
            let next_left = left + speed;           // 当前加上速度就是下一个单位时间所在位置
            list.style.left = next_left + "px";

            if (speed < 0 && next_left >= new_left || speed > 0 && next_left <= new_left) {
                setTimeout(() => {
                    go();
                }, interval)
            } else {
                list.style.left = new_left + "px";        // 由于移动可能会有一部偏差，所以最后时把list的位置强制放到终点上
                changeDot();
                status = false;         // 动画结束，并且把动画状态设置为false
            }
        }

        go();
    }, 3000);
}

// 检查并显示对应片图焦点图标签的方法
function changeDot () {
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = "";
    }
    if (index == 6) {
        index = 0;
    }
    dots[index].className = "on";
}
autoPlay();
