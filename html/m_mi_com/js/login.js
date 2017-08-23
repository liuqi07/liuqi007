$("#dl-text1").val("");

//输入账号框失去焦点的时候判断账号是否能被注册
    $("#jrx-text1").blur(function(){
        var re=/^[a-zA-z]\w{3,15}$/;
        var re1=/^1\d{10}$/;
        if(re.test($("#jrx-text1").val())||re1.test($("#jrx-text1").val())){
            var user=$("#jrx-text1").val();
            //发送一次ajax请求用获取用户信息端口看要注册的账号是否被注册过
            $.ajax({
                url:"http://datainfo.duapp.com/shopdata/getuser.php",
                dataType:"jsonp",
                data:{
                    userID:user
                },
                success:function(data){
                    if(data==0){
                        $("#jrx-text1+span").html("恭喜您，账号未注册！")  //账号栏下面的<span>标签显示
                        $("#jrx-text1+span").css("color","green")       //账号栏下面的<span>标签文字变绿
                    }else{
                        $("#jrx-text1+span").html("抱歉，用户名已被注册！")  //返回值为0
                        $("#jrx-text1").val("");
                    }
                },

            })
        }else{
            $("#jrx-text1").val("");
            $("#jrx-text1+span").html("账号格式应为字母、数字或者下划线组成！")
        }

    })
    $("#jrx-text3").blur(function(){
        if($("#jrx-text3").val()==$("#jrx-text2").val()){
            $("#jrx-text3+span").html("")
        }else{
            $("#jrx-text3+span").html("密码输入不一致！")
            $("#jrx-text2").val("");
            $("#jrx-text3").val("");
        }
    })
    $("#jrx-text2").focus(function(){
        $("#jrx-text3+span").html("");
    })


    function jrxclick(){
        var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        var str = '';
        while (str.length < 4) {
            var iNum = parseInt(Math.random() * 100)
            while (iNum > 36) {
                iNum = parseInt(Math.random() * 100)
            }
            str += arr[iNum];
        }
        $(".yzm").html(str);
    }
    jrxclick();
    $(".yzm").click(function() {
        jrxclick();

    })
    $("#jrx-text4").blur(function(){
        if($("#jrx-text4").val()==$(".yzm").html()){
            $(".yzm-x").css("color","green")
            $(".yzm-x").html("验证码输入正确")
        }else{
            $(".yzm-x").html("验证码输入错误")
        }
    })
    //点击注册按钮触发的事件


    touch.on(".button-zc","tap",function(){


            if($("#jrx-text1").val()==""){
                $("#jrx-text1+span").html("账号不能为空！");
            }else if($("#jrx-text2").val()==""){
                $("#jrx-text2+span").html("请输入密码！");
            }else if($("#jrx-text3").val()==""){
                $("#jrx-text3+span").html("请再次输入密码！");
            }else if($("#jrx-text4").val()==""){
                $("#jrx-text4+span+span").html("请输入验证码！");
            }else if($("#jrx-text4").val()!=$(".yzm").html()){
                $("#jrx-text4+span+span").html("验证码输入不正确！");
                jrxclick();
            }else{
                var user=$("#jrx-text1").val();
                var pass=$("#jrx-text2").val();
                $.ajax({
                    url:"http://datainfo.duapp.com/shopdata/userinfo.php",
                    data:{
                        status:"register",
                        userID:user,
                        password:pass
                    },
                    success:function(data){
                        if(data==1){
                            alert("注册成功！")
                            window.location.href="jrx-index2.html";
                        }else if(data==2){
                            alert("不好意思，出错了！")
                        }
                    },
                })
            }



    })

    touch.on(".button-dl","tap",function(){
        var user1=$("#dl-text1").val();
        var pass1=$("#dl-text2").val();
        $.ajax({
            url:"http://datainfo.duapp.com/shopdata/userinfo.php",
            data:{
                status:"login",
                userID:user1,
                password:pass1

            },
            success:function(data){
                if(data==0){
                    alert("用户名不存在！")
                }else if(data==2){
                    alert("密码输入有误！")
                }else{
                    alert("登录成功！")
                }
            }
        })
    })

