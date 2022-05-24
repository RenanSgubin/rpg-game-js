

let enemyLifePercent = 0;
let damage = 0;

//Mana do personagem
let charMana = 100;

//Defesa do personagem
let charDef = 25;

//Vida do personagem
let charLife = 100;

//Controlar a vez de cada personagem
let charTurn = true;

let skills = 
    [                  
        //Mana  Dano   Ex.Dam   Def   Cura
        [ 15,     15,    1,      0,    0   ], //Skill 1
        [ 50,     0,     1,      50,   0   ], //Skill 2
        [ 20,     0,     0,      0,    30   ],  //Skill 3
        [ 0,      0,     1,      0,    0   ], //Skill 4
        [ 0,      0,     15,     0,    0   ], //Skill 5
        [ 0,      0,     15,     0,    0   ]  //Skill 6
    ];

//Posição do dano que o char da no inimigo
let bottomPosition = 50;

//Status do inimigo

//Mana do Inimigo
let enemyMana = 150;

//Defesa do Inimigo
let enemyDef = 15;

//Vida do personagem
let enemyLife = 75;

let enemySkills = 
    [                  
        //Mana  Dano   Ex.Dam   Def   Cura
        [ 15,     15,    1,      0,    0   ], //Skill 1
        [ 50,     0,     1,      50,   0   ], //Skill 2
        [ 20,     0,     0,      0,    30   ],  //Skill 3
        [ 0,      0,     1,      0,    0   ], //Skill 4
        [ 0,      0,     15,     0,    0   ], //Skill 5
        [ 0,      0,     15,     0,    0   ]  //Skill 6
    ];


function useAttack( skillNumber ) {
    
    if(charTurn) { //Caso seja vez do jogador jogar
   
    //Ver se a mana que a skill usa é maior que a mana do char
    if(skills[skillNumber][0] <= charMana) {

        //Passar o turno pro inimigo
        charTurn = false; 
        
        //Tirar mana do personagem 
        charMana = charMana - skills[skillNumber][0];
        document.getElementsByClassName("mana-width")[0].style.width = charMana+"%";


        //Adicionar Extra Damage, se a skill não for de extra damage, não vai adicionar nada (valor 1)
        skills[skillNumber][1] / 100 * skills[skillNumber][2];

        //Aumentar defesa
        charDef = charDef + ((charDef / 100) * skills[skillNumber][3]);

        //Curar
        document.getElementsByClassName("life-width")[0].style.width = charLife+"%";
        charLife = charLife + skills[skillNumber][4];
        document.getElementsByClassName("life-width")[0].style.width = charLife+"%";
        

        //Ataque
        if(skillNumber === 0) {
            //Tirar vida do inimigo
            damage = damage + skills[skillNumber][1];
            //Porcentagem da vida do inimigo
            enemyLifePercent = 100 - (damage / (75 / 100));
            document.getElementsByClassName("life-width")[1].style.width = enemyLifePercent+"%";

            //Aparecer dano no inimigo
            document.getElementsByClassName("enemy-damage")[0].innerHTML = "-" + skills[skillNumber][1];

            //Mover ele até sumir
            function showCharDamage(){
                bottomPosition = bottomPosition + 0.1;
                document.getElementsByClassName("enemy-damage")[0].style.bottom = bottomPosition + "%";

                if(Math.round(bottomPosition) === 68) {
                    document.getElementsByClassName("enemy-damage")[0].style.display = "none";
                }
            }
            //Zerar tudo
            bottomPosition = 50; 
            document.getElementsByClassName("enemy-damage")[0].style.display = "flex";
            
            setInterval(showCharDamage, 1); 
        }
    
        }else {
            //Sem mana
            document.getElementsByClassName("out-of-mana-container")[0].style.display= "flex";

            //Animação
            document.getElementsByClassName("out-of-mana-container")[0].style.animation = "outOfMana linear 300ms";

            //Voltar div ao estado original depois de 3s
            function outOfMana(){
                document.getElementsByClassName("out-of-mana-container")[0].style.display = "none";
            }

            setTimeout(outOfMana, 1500);
        }
         
    }if(charTurn === false){ //Vez do inimigo
        document.getElementsByClassName("pixel-right-arrow")[0].style.display = "block";
        document.getElementsByClassName("pixel-left-arrow")[0].style.display = "none";

        function enemyAttacks() {
            if(charLife === 100) {
                alert("atk 1");
            }
    
            if(enemyLife < 50) {
                alert("atk 2");
            }
            
            charTurn = true;

            //Mostrar Seta do personagem
            document.getElementsByClassName("pixel-left-arrow")[0].style.display = "block"; 
            //Tirar seta do inimigo
            document.getElementsByClassName("pixel-right-arrow")[0].style.display = "none";
            
        }

        setTimeout(enemyAttacks, 2000);
    }
    
}


if(charTurn) {
    //Mostrar Seta do personagem
    document.getElementsByClassName("pixel-left-arrow")[0].style.display = "block"; 
    //Tirar seta do inimigo
    document.getElementsByClassName("pixel-right-arrow")[0].style.display = "none";
}