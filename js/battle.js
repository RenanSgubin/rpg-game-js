

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
        [ 15,     10,    1,      0,    0   ], //Skill 1
        [ 50,     0,     1,      50,   0   ], //Skill 2
        [ 20,     0,     0,      0,    30   ],  //Skill 3
        [ 0,      0,     1,      0,    0   ], //Skill 4
        [ 30,      0,     15,     0,    0   ], //Skill 5
        [ 40,      0,     20,     0,    0   ]  //Skill 6
    ];

//Posição do dano que o char da no inimigo
let bottomPosition = 50;

//Status do inimigo

let charLifePercent = 0;
let enemyDamage = 0;

//Mana do Inimigo
let enemyMana = 100;

//Defesa do Inimigo
let enemyDef = 15;

//Vida do personagem
let enemyLife = 100;

let enemySkills = 
    [                  
        //Mana  Dano   Ex.Dam   Def   Cura
        [ 10,     10,    1,      1,    1   ], //Skill 1
        [ 20,     20,    1,      1,    1   ], //Skill 2
        [ 40,     1,     1,      30,   30  ], //Skill 3
        [ 50,     50,    1,      1,    1   ], //Skill 4
        [ 50,     1,     1,      1,    30  ], //Skill 5
        [ 90,     40,     1,      1,    1   ],  //Skill 6
        [ 0,      0,     0,      0,    0   ]  //Caso a mana não seja suficiente
    ];

//Numero que vai decidir os ataques do inimigo
let enemySkillNumber = 0;


function useAttack( skillNumber ) {
    
    if(charTurn) { //Caso seja vez do jogador jogar
   
        //Ver se a mana que a skill usa é maior que a mana do char
        if(skills[skillNumber][0] <= charMana) {

        //Passar o turno pro inimigo
        charTurn = false; 

        //Desabilitar botões
        for(let i = 0; i < 6; i++) {
            document.getElementsByClassName("skill")[i].disabled = true;
        }
        
        //Tirar mana do personagem 
        charMana = charMana - skills[skillNumber][0];
        document.getElementsByClassName("mana-width")[0].style.width = charMana+"%";
        document.getElementsByClassName("mana-number")[0].innerHTML = charMana;


        //Adicionar Extra Damage, se a skill não for de extra damage, não vai adicionar nada (valor 1)
        skills[skillNumber][1] / 100 * skills[skillNumber][2];

        //Aumentar defesa
        charDef = charDef + ((charDef / 100) * skills[skillNumber][3]);

        //Curar
        charLife = charLife + skills[skillNumber][4];
        document.getElementsByClassName("life-width")[0].style.width = charLife+"%";
        document.getElementsByClassName("life-number")[0].innerHTML = charLife;
        

        //Ataque
        if(skillNumber === 0) {
            //Tirar vida do inimigo
            damage = damage + skills[skillNumber][1];
            //Porcentagem da vida do inimigo
            enemyLifePercent = 100 - damage;
            document.getElementsByClassName("life-width")[1].style.width = enemyLifePercent+"%";
            document.getElementsByClassName("life-number")[1].innerHTML = enemyLifePercent;

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

         //Adicionar 10 de mana
         enemyMana+= 10;
         if(enemyMana > 100){
             enemyMana = 100;
         }
         document.getElementsByClassName("mana-width")[1].style.width = enemyMana+"%";
         document.getElementsByClassName("mana-number")[1].innerHTML = enemyMana;
        

        function enemyAttacks() {

            //Faz um calculo com a mana pra sortear uma skill que esteja dentro do limite da mana
            enemySkillNumber = (enemyMana / 10) / 2;
                
            if(enemySkills[Math.ceil(enemySkillNumber)][0] > enemyMana) {
                //Conta vai dar 6, que é a skill referente a mana zerada
                enemySkillNumber = 120;
            }else {
                //Tirar mana
                enemyMana = enemyMana - enemySkills[Math.ceil(enemySkillNumber)][0];

                //Tirar vida do Char
                enemyDamage = enemyDamage + enemySkills[Math.ceil(enemySkillNumber)][1];
                //Porcentagem da vida do Char
                charLifePercent = 100 - enemyDamage;
                charLife = charLifePercent;
                console.log(charLife);
                document.getElementsByClassName("life-width")[0].style.width = charLife+"%";
                document.getElementsByClassName("life-number")[0].innerHTML = charLife;

                //Aparecer dano no inimigo
                document.getElementsByClassName("char-damage")[0].innerHTML = "-" + 
                enemySkills[Math.ceil(enemySkillNumber)][1];

                //Mover ele até sumir
                function showEnemyDamage(){
                    bottomPosition = bottomPosition + 0.1;
                    document.getElementsByClassName("char-damage")[0].style.bottom = bottomPosition + "%";

                    if(Math.round(bottomPosition) === 68) {
                        document.getElementsByClassName("char-damage")[0].style.display = "none";
                    }
                }
                //Zerar tudo
                bottomPosition = 50; 
                document.getElementsByClassName("char-damage")[0].style.display = "flex";
                
                setInterval(showEnemyDamage, 1); 

                //Ex. Damage
                enemySkills[Math.ceil(enemySkillNumber)][2];

                //Def Extra
                enemySkills[Math.ceil(enemySkillNumber)][3];

                //Cura
                enemySkills[Math.ceil(enemySkillNumber)][4];
            }


            //Mostrar Seta do personagem
            document.getElementsByClassName("pixel-left-arrow")[0].style.display = "block"; 
            //Tirar seta do inimigo
            document.getElementsByClassName("pixel-right-arrow")[0].style.display = "none";

            document.getElementsByClassName("mana-number")[1].innerHTML = enemyMana;
            document.getElementsByClassName("mana-width")[1].style.width = enemyMana+"%";
            
            charTurn = true;

            //Habilitar botões
            for(let i = 0; i < 6; i++) {
                document.getElementsByClassName("skill")[i].disabled = false;
            }
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