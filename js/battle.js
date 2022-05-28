

let enemyLifePercent = 0;
let damage = 0;

//Mana do personagem
let charMana = 100;

//Defesa do personagem
let charDef = 25;

//Vida do personagem
let charLife = 100;

//Auxiliadora heal
let charLifeHealAux = 0;
let charLifeHealAuxTotal = 100;

//Controlar a vez de cada personagem
let charTurn = true;

//Controlar cura
let charHeal = 0;

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

//Mana do Inimigo
let enemyMana = 100;

//Defesa do Inimigo
let enemyDef = 15;

//Vida do personagem
let enemyLife = 100;

let enemyDamage = 0;

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
        for(let i = 0; i < 7; i++) {
            document.getElementsByTagName("button")[i].disabled = true;
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
        charHeal = skills[skillNumber][4];
        if(skillNumber === 2) {
            if(charLifeHealAuxTotal > 100) {
                alert("asasa");
            }
            document.getElementsByClassName("life-width")[0].style.width = charLifeHealAuxTotal+30+"%";
            document.getElementsByClassName("life-number")[0].innerHTML = charLifeHealAuxTotal+30;
        }
        
        

        //Ataque
        if(skillNumber === 0) {
            //Tirar vida do inimigo
            damage = damage + skills[skillNumber][1];
            //Porcentagem da vida do inimigo
            enemyLifePercent = 100 - (damage - (damage / 100 * 15));

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
        enemyTurn();
    }
    
}

function enemyTurn() {
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
            let teste = 0;

            charLife = teste - charHeal; //Vida do Jogador;
            charLifeHealAux = charLifeHealAux + charLife;
            charLifeHealAuxTotal = 100 - charLifeHealAux;

            document.getElementsByClassName("life-width")[0].style.width = charLifeHealAuxTotal+"%";
            document.getElementsByClassName("life-number")[0].innerHTML = charLifeHealAuxTotal;

        }else {
            if(enemyMana >= 20) {
                //Porcentagem da vida do Char
                let teste = enemySkills[Math.ceil(enemySkillNumber)][1] - 
                (enemySkills[Math.ceil(enemySkillNumber)][1] / 100 * 25);

                charLife = teste - charHeal; //Vida do Jogador;
                console.log(charLife);
                charLifeHealAux = charLifeHealAux + charLife;
                charLifeHealAuxTotal = 100 - charLifeHealAux;

                document.getElementsByClassName("life-width")[0].style.width = charLifeHealAuxTotal+"%";
                document.getElementsByClassName("life-number")[0].innerHTML = charLifeHealAuxTotal;
            }
                

            //Tirar mana
            enemyMana = enemyMana - enemySkills[Math.ceil(enemySkillNumber)][0];

            //Aparecer dano no jogador
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

        //Adicionar mana para o jogador a cada round
        charMana = charMana + 8;
        if(charMana > 100){
            charMana = 100;
        }
        document.getElementsByClassName("mana-width")[0].style.width = charMana+"%";
        document.getElementsByClassName("mana-number")[0].innerHTML = charMana;

        //Habilitar botões
        for(let i = 0; i < 7; i++) {
            document.getElementsByTagName("button")[i].disabled = false;
        }
    }

    setTimeout(enemyAttacks, 2000);

}

if(charTurn) {
    //Mostrar Seta do personagem
    document.getElementsByClassName("pixel-left-arrow")[0].style.display = "block"; 
    //Tirar seta do inimigo
    document.getElementsByClassName("pixel-right-arrow")[0].style.display = "none";

}

function passTurn() {
    charTurn = false;
    enemyTurn();

    //Desabilitar botão
    document.getElementsByClassName("pass-turn")[0].disabled = true;
    //Mostrar Seta do personagem
    document.getElementsByClassName("pixel-left-arrow")[0].style.display = "none"; 
    //Tirar seta do inimigo
    document.getElementsByClassName("pixel-right-arrow")[0].style.display = "block";
}
