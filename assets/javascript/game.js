$(document).ready(function () {
    
    var battlesound = $("#battle_Sound");
    var userattack = $("#user-attack");
    var enemyattack = $("#enemy-attack");
    var attackingDone;
    var user = {
        secId : "",
        name : "",
        HP : 0 ,
        AP : 0,
        Incrementer:0, 
        damage : 0 
    };
    var enemy = {
        secId : "",
        name : "",
        HP :0 ,
        AP : 0,
        Incrementer:0, 
        damage : 0 
    } ;

    function initialize()
    {
        attackingDone = true;
        $("#restartBtn").hide();
        $(".battle").hide();
        $(".battlePoints").hide();
        $(".header-msg").html( "Select your character");
    }


    

  


    $("#characters-row section").on("click", function (event) { 
        $(".battle").show();
        var targetId = event.currentTarget.id;
        var charname = targetId.split("_")[0];
        let character = {
            secId : event.currentTarget.id,
            name : charname,
            Incrementer : parseInt(event.currentTarget.dataset.intialap),
            HP :  parseInt($("#"+charname+"HP").text()),
            AP :  parseInt($("#"+charname+"AP").text()),
            damage : parseInt($("#"+charname+"Damage").text())
        }
        if(user.secId =="") 
        {
           $("#user-char").append(event.currentTarget);
            user =character;
            console.log ("user",user);
            $(".header-msg").html( "Select your Enemy");
        }
        else if((enemy.secId == "") && (targetId !=user.secId))
        {
            $("#enemy-char").append(event.currentTarget);
            enemy = character;
            console.log ("enemy",enemy);
            $(".header-msg").html( "Press the Attack button to start fight");
        }
    });
    
    $("#restartBtn").on("click", function (event) {
        window.location.reload();
        
    });
    $("#attackBtn").on("click", function (event) {
        
        if (enemy.secId != "" && enemy.HP>0 && user.HP>0) {
            
            enemy.HP -= user.AP;
            enemy.damage +=user.AP;
            user.HP -=enemy.AP;
            user.damage +=enemy.AP;
            user.AP +=user.Incrementer;
            
            if(enemy.HP <= 0)
                {attackingDone = false;}
            
            if (attackingDone) {
                $(".header-msg").html("Keep pressing the attack button until enemy is defeated");
                attackingDone = false;
                attack(userattack, "left");
                attack(enemyattack, "right");
                setTimeout(stopattacking, 2000);
            }

            updateCharacterData (user);
            updateCharacterData (enemy);
        }
        else if (enemy.secId == "")
        {
            alert("Select an enemy to attack");
        }
        if(user.HP <= 0)
        {
            $(".header-msg").html( "<h3>You have been defeated. Please press the restart Button to start a new game<h3>");
            $("#enemy-char").empty();
            $("#user-char").empty();
            $("#restartBtn").show();
        }
         else if (enemy.HP <= 0 && enemy.secId != "")
        {
            $(".header-msg").html( "You have defected the enemy. Select Next defender");
            $("#enemy-char").empty();
            enemy = {
                secId : "",
                name : "",
                HP :0 ,
                AP : 0,
                Incrementer:0, 
                damage : 0 
            };
            if($("#characters-row section").length == 0)
            {
                $(".header-msg").html( "<h3>You are the winner. You have defected all the enemies  Please press the restart Button to start a new game<h3>");
                $("#enemy-char").empty();
                $("#user-char").empty();
                $("#restartBtn").show();
            }
        }
     });

    function updateCharacterData(character)
    {
            $("#"+character.name+"HP").text(character.HP);
            $("#"+character.name+"AP").text(character.AP);
            $("#"+character.name+"Damage").text(character.damage);
            $("#"+character.secId+" .battlePoints").show();
            console.log ("character",character);
    }
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
            charName = user.name;
            battleImg.attr("id", "battle_img_1");
            battleImg.attr("style", "height: 200px;width: 350px; padding-left:3%;-webkit-transform: scaleX(-1);transform: scaleX(-1); ");
        }
        else
        {
            charName = enemy.name;
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


