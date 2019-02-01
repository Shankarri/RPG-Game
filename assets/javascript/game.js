$(document).ready(function () {
    
    var battlesound = $("#battle_Sound");
    var userattack = $("#user-attack");
    var enemyattack = $("#enemy-attack");
    var attackingDone = true;

    var user = {
        userSecId : "",
        userName : "",
        userHP :0 ,
        userDamage : 0 
    }
    var enemy = {
        enemySecId : "",
        enemyName : "",
        enemyHP :0 ,
        enemyDamage : 0 
    } 

  
    $("#restartBtn").hide();
    $(".battle").hide();
    $(".header-msg").html( "Select your character");

    $("#characters-row section").on("click", function (event) {
        // 
        $(".battle").show();
        
        var targetId =event.currentTarget.id;
        var strsplit  = targetId.split("_");
        var character = strsplit [0];
        var charhp = parseInt(event.currentTarget.dataset.hp);
        var chardamage = parseInt(event.currentTarget.dataset.attack);

        if(user.userSecId =="") 
        {
           $("#user-char").append(event.currentTarget);
            user.userSecId = targetId;  
            user.userName =character;
            user.userHP = charhp;
            user.userDamage = chardamage;

           
            console.log ("user",user);
            $(".header-msg").html( "Select your Enemy");
        }
        else if((enemy.enemySecId == "") && (targetId !=user.userSecId))
        {
            $("#enemy-char").append(event.currentTarget);
            enemy.enemySecId = targetId;  
            enemy.enemyName = character;
            enemy.enemyHP = charhp;
            enemy.enemyDamage = chardamage;
            console.log ("enemy",enemy);
            $(".header-msg").html( "Press the Attack button to start fight");
        }
    });
    
    $("#attackBtn").on("click", function (event) {
        
        if (enemy.enemySecId != "") {
            enemy.enemyHP -= user.userDamage;
            user.userHP-=enemy.enemyDamage;
            user.userDamage +=user.userDamage; 

            $("#"+user.userSecId).attr("hp",user.userHP )
            $("#"+user.userSecId).attr("attack",user.userDamage )
            console.log ("enemy",enemy);
            console.log ("user",user);
            if (attackingDone) {
                $(".header-msg").html("Keep pressing the attack button until enemy is defeated");
                attackingDone = false;
                attack(userattack, "left");
                attack(enemyattack, "right");
                setTimeout(stopattacking, 2000);
            }
        }
        else
        {
            alert("Select an enemy to attack");
        }

       
    });

    function stopattacking()
    {

           userattack.empty();
           enemyattack.empty();
           attackingDone = true;
      
    }
    function attack(charattack,position)
    {
        let charName;
        battlesound[0].play();
        var battleImg = $("<img>");
        
        
        if(position == "left")
        {
            charName = user.userName;
            battleImg.attr("id", "battle_img_1");
            battleImg.attr("style", "height: 200px;width: 350px; padding-left:3%;-webkit-transform: scaleX(-1);transform: scaleX(-1); ");
        }
        else
        {
            charName = enemy.enemyName;
            battleImg.attr("id", "battle_img_2");
            battleImg.attr("style", "height: 200px;width: 350px;padding-right:3%;");
        }
        
        imgsrc = "assets/images/" + charName +  "_small_gif.gif";
        battleImg.attr("src",imgsrc);

        charattack.append(battleImg);
        charattack.show();
    }
});

//
// /


