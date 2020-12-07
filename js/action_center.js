let btn = document.querySelectorAll(".left a");
let list1 = document.querySelectorAll(".mainlist1");
let list2 = document.querySelectorAll(".mainlist2");
let list3 = document.querySelectorAll(".mainlist3");
console.log(list2);
for (let i = 0; i < btn.length; i++) {
    btn[i].onclick = () => {
        for (let j = 0; j < btn.length; j++) {
            if (i == j) {
                console.log(btn[j].className);
                btn[j].className = "active";
            } else {
                btn[j].className = "";
            }
        }
        switch (i) {
            case 0:
                console.log("0");
                list1[0].style.display = "block";
                list2[0].style.display = "none";
                list3[0].style.display = "none";
                break;
            case 1:
                list1[0].style.display = "none";
                list2[0].style.display = "block";
                list3[0].style.display = "none";
                break;
            case 2:
                list1[0].style.display = "none";
                list2[0].style.display = "none";
                list3[0].style.display = "block";
                break;
        }
    }
}