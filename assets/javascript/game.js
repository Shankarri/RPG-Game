// Everything goes once the Document is ready
$(document).ready(function () {
    
    //------------------------------------------------------------

    // Declaring and initializing global variables  

    var battlesound = $("#battle_Sound");
    var userattack = $("#user-attack");
    var enemyattack = $("#enemy-attack");
    var attackingDone;

    var user = {
        secId : "",
        name : "",
        HP : 0 ,
        AP : 0,
        counterAP : 0,
        InitialAP:0, 
        damage : 0 
    };
    var enemy = {
        secId : "",
        name : "",
        HP :0 ,
        AP : 0,
        counterAP:0,
        InitialAP:0, 
        damage : 0 
    } ;
  
    attackingDone = true;
    $("#restartBtn").hide();
    $(".battle").hide();
    $(".battlePoints").hide();
    $(".header-msg").html( "Select your character");

    //------------------------------------------------------------

    //  When each character is selected in the character row
    $("#characters-row section").on("click", function (event) { 

        //show the battle scene
        $(".battle").show();
        var targetId = event.currentTarget.id;
        var charname = targetId.split("_")[0];

        // get the values of the clicked character and store it in character object
        let character = {
            secId : event.currentTarget.id,
            name : charname,
            InitialAP : parseInt(event.currentTarget.dataset.intialap),
            HP :  parseInt($("#"+charname+"HP").text()),
            AP :  parseInt(event.currentTarget.dataset.intialap),
            counterAP :  parseInt(event.currentTarget.dataset.counterap),
            damage : parseInt($("#"+charname+"Damage").text())
        }

        // if the user Character is empty, 
        //then place the character in the battle scene under your character
        if(user.secId =="") 
        {
           $("#user-char").append(event.currentTarget);
            user =character;
            console.log ("user",user);
            
            //display message to user to select enemy
            $(".header-msg").html( "Select your Enemy");
        }

        // if the user Character is not  empty but if enemy character is empty 
        //then place the character in the battle scene under Defender 
        else if((enemy.secId == "") && (targetId !=user.secId))
        {
            $("#enemy-char").append(event.currentTarget);
            enemy = character;
            console.log ("enemy",enemy);
            
            //display message to user to start attacking
            $(".header-msg").html( "Press the Attack button to start fight");
        }
    });
    
    //-----------------------------------------------------------------------------------------------------
    
  //  When attack button is clicked
    
    $("#attackBtn").on("click", function (event) {
        
        //  If the Enemy character is not there 
        //and enemy health points as well as user Helath pointsis more than zero
        
        if (enemy.secId != "" && enemy.HP>0 && user.HP>0) {
            
            //According to the character, change the stats for user and enemy
            enemy.HP -= user.AP;
            user.HP -= enemy.counterAP;
            user.AP +=user.InitialAP;
            enemy.damage +=user.AP;
            user.damage = enemy.counterAP;

            //Update the user and enemy stats in webpage
            updateCharacterData (user);
            updateCharacterData (enemy);
            
            // Displaying Animation for user and enemy attack with timeout 
            if (attackingDone) {
                $("#attackBtn").prop("disabled",true);
                $(".header-msg").html("Keep pressing the attack button until enemy is defeated");
                attackingDone = false;
                attack(userattack, "left");
                attack(enemyattack, "right");
                setTimeout(stopattacking, 1500);
            }

        }

        //  If the user character HP is zero or less then display you have been defeated and show reset button
        if(user.HP <= 0)
        {
            $(".header-msg").html( "<p>You have been defeated.<br> <br> Please press the restart Button to start a new game<h5>");
            $("#enemy-char").empty();
            $("#attackBtn").hide();
            $("#restartBtn").show();
        }

        //  If the enemy character is there in battle field and enemy health is zero or less
         else if (enemy.HP <= 0 && enemy.secId != "")
        {
            //  clear the enemy for new defender 
            $("#enemy-char").empty();
            stopattacking();
            enemy = {
                secId : "",
                name : "",
                HP :0 ,
                AP : 0,
                InitialAP:0, 
                damage : 0 
            };
            //attack button will not display until next enemy is chosen
            $("#attackBtn").prop("disabled",true);

            //display message to user to select next enemy
            $(".header-msg").html( "You have defected the enemy. Select Next defender");
            
            // Check if there are no more enemies left 
            if($("#characters-row section").length == 0)
            {
                //display winner message to user and provide an restart button to restart the page 
                $(".header-msg").html( "<h5>You are the winner. <br> <br>You have defected all the enemies  Please press the restart Button to start a new game<h5>");
                $("#enemy-char").empty();
                $("#attackBtn").hide();
                $("#restartBtn").show();
            }
        }
     });
     
    //-----------------------------------------------------------------------------------------------------
    

    //Once the user wins or loses the game restart button will reload the page for new game
     $("#restartBtn").on("click", function (event) {
        window.location.reload();
    });

    //-----------------------------------------------------------------------------------------------------

    //Updating the user and enemy stats in webpage
    function updateCharacterData(character)
    {
            $("#"+character.name+"HP").text(character.HP);
            // $("#"+character.name+"AP").text(character.AP);
            $("#"+character.name+"Damage").text(character.damage);
            $("#"+character.secId+" .battlePoints").show();
            console.log ("character",character);
    }

    //-----------------------------------------------------------------------------------------------------
    // If the stop the battle scene animation after timeout
    function stopattacking()
    {
          userattack.empty();
           enemyattack.empty();
           attackingDone = true;
           $("#attackBtn").prop("disabled",false);
      
    }

    //-----------------------------------------------------------------------------------------------------
    // Battle scene attack animation for user and enemy 
    function attack(charattack,position)
    {
        let charName;
        battlesound[0].play();
        var battleImg = $("<img>");
        
        
        if(position == "left")
        {
            charName = user.name;
            battleImg.attr("style", "height: 200px;width: 350px; padding-left:3%;-webkit-transform: scaleX(-1);transform: scaleX(-1); ");
        }
        else
        {
            charName = enemy.name;
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


