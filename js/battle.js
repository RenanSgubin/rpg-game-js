

let enemyLifePercent = 0;
let damage = 0;

//Mana do personagem
let charMana = 100;

//Defesa do personagem
let charDef = 33;

//Vida do personagem
let charLife = 100;

//Auxiliadora heal
let charLifeHealAux = 0;
let charLifeHealAuxTotal = 100;

//Controlar a vez de cada personagem
let charTurn = true;

//Controlar cura
let charHeal = 0;

//Controlar quantidade de rounds do Char
let roundsChar = 0;

//Pegar o numero da skill de rounds
let roundsCharSkill = 0;

//Controlar as skills que funcionam por round
let skillsRounds = [];

let skills = 
    [                  
        //Mana  Dano   Ex.Dam   Def   Cura  Rounds dura
        [ 15,     10,    1,      0,    0,       0 ], //Skill 1
        [ 20,     0,     1,      50,   0,       3 ], //Skill 2
        [ 30,     0,     0,      0,    20,      0 ],  //Skill 3
        [ 0,      0,     1,      0,    0,       3 ], //Skill 4
        [ 30,     0,     50,     0,    0,       4 ], //Skill 5
        [ 40,     0,     70,     0,    0,       4 ]  //Skill 6
    ];

//Posição do dano que o char da no inimigo
let y = 50;

//Status do inimigo
let charLifePercent = 0;

//Mana do Inimigo
let enemyMana = 100;

//Defesa do Inimigo
let enemyDef = 15;

//Auxiliadora heal
let enemyLifeHealAux = 0;
let enemyLifeHealAuxTotal = 100;

//Cura do inimigo
let enemyHeal = 0;

let enemySkills = 
    [                  
        //Mana  Dano   Ex.Dam   Def   Cura
        [ 5,      5,     0,      0,     0   ], //Skill 1
        [ 10,     10,    0,      0,     0   ], //Skill 2
        [ 30,     0,     0,      30,    0   ], //Skill 3
        [ 50,     40,    0,      0,     0   ], //Skill 4
        [ 40,     0,     0,      0,     20  ], //Skill 5
        [ 90,     80,    0,      0,     0   ],  //Skill 6
        [ 0,      0,     0,      0,     0   ]  //Caso a mana não seja suficiente
    ];

//Numero que vai decidir os ataques do inimigo
let enemySkillNumber = 0;

function useAttack( skillNumber ) {
    
    if(charTurn) { //Caso seja vez do jogador jogar

        roundsChar++;
 
        //Ver se a mana que a skill usa é maior que a mana do char
        if(skills[skillNumber][0] <= charMana) {

        //Passar o turno pro inimigo
        charTurn = false; 

        //Desabilitar botões
        //for(let i = 0; i < 7; i++) {
            //document.getElementsByTagName("button")[i].disabled = true;
        //}

        //Verificar se a skill é baseada em rounds
        if(skills[skillNumber][5] > 0) {
            //Pegar o numero da skill de rounds
            roundsCharSkill = skillNumber;
            skillsRounds = [1,3,4,5];
            roundsChar = 0;
        }

        //Verificar se a skill já bateu o número de rounds dela
        if(roundsChar ===  skills[roundsCharSkill][5]) {
            roundsChar = 0;
            skillsRounds = [];
            roundsCharSkill = 0;
            charDef = 33;
        }

        //Tirar mana do personagem 
        charMana = charMana - skills[skillNumber][0];
        document.getElementsByClassName("mana-width")[0].style.width = charMana+"%";
        document.getElementsByClassName("mana-number")[0].innerHTML = charMana;

        //Aumentar defesa
        charDef = charDef + ((charDef / 100) * skills[skillNumber][3]);
        document.getElementsByClassName("char-defense-number")[0].innerHTML = charDef;

        //Curar
        charHeal = skills[skillNumber][4];
        if(skillNumber === 2) {
            document.getElementsByClassName("life-width")[0].style.width = charLifeHealAuxTotal+skills[2][4]+"%";
            document.getElementsByClassName("life-number")[0].innerHTML = charLifeHealAuxTotal+skills[2][4];
        }
        
        //Dano ao inimigo
        damage = skills[skillNumber][1] + (skills[skillNumber][1] / 100 * skills[roundsCharSkill][2]);
        
        //Ataque
        if(skillNumber === 0) {
            //Heal do inimigo
            enemyHeal = enemySkills[Math.ceil(enemySkillNumber)][4]; 

            let enemyLife = (damage - (damage / 100 * enemyDef)) - enemyHeal;
            enemyLifeHealAux = enemyLifeHealAux + enemyLife;
            enemyLifeHealAuxTotal = 100 - enemyLifeHealAux;

            document.getElementsByClassName("life-width")[1].style.width = enemyLifeHealAuxTotal+"%";
            document.getElementsByClassName("life-number")[1].innerHTML = parseFloat(enemyLifeHealAuxTotal.toFixed(2));

            //Aparecer dano no inimigo
            document.getElementsByClassName("enemy-damage")[0].style.display = "flex"; 
            document.getElementsByClassName("enemy-damage")[0].innerHTML = "-" + parseFloat(damage - (damage / 100 * enemyDef)).toFixed(2);   

            document.getElementsByClassName("enemy-damage")[0].style.animation = "damageShake linear 300ms";

            let showDamage = setTimeout(function() {
                document.getElementsByClassName("enemy-damage")[0].style.display = "none";
            }, 1500);
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

        if(enemyLifeHealAuxTotal<= 40) {
            enemySkillNumber = 4;

            if(enemyMana < enemySkills[Math.ceil(enemySkillNumber)][0]){
                charTurn = true;
                enemySkillNumber = 6;
            }
        }
     
        //Porcentagem da vida do Char
        let enemyDamage = enemySkills[Math.ceil(enemySkillNumber)][1] - 
        (enemySkills[Math.ceil(enemySkillNumber)][1] / 100 * charDef);

        charLife = enemyDamage - charHeal; //Vida do Jogador;
        charLifeHealAux = charLifeHealAux + charLife;
        charLifeHealAuxTotal = 100 - charLifeHealAux;
        charHeal = 0;
        document.getElementsByClassName("life-width")[0].style.width = charLifeHealAuxTotal+"%";
        document.getElementsByClassName("life-number")[0].innerHTML = parseFloat(charLifeHealAuxTotal.toFixed(2));         

        //Tirar mana
        enemyMana = enemyMana - enemySkills[Math.ceil(enemySkillNumber)][0];

        //Aparecer dano no jogador
        document.getElementsByClassName("char-damage")[0].innerHTML = "-" + parseFloat(enemyDamage.toFixed(2));;
        document.getElementsByClassName("char-damage")[0].style.display= "flex";
        document.getElementsByClassName("char-damage")[0].style.animation = "damageShake linear 300ms";
        let showDamage = setTimeout(function() {
            document.getElementsByClassName("char-damage")[0].style.display = "none";
        }, 1500);

        //Ex. Damage
        enemySkills[Math.ceil(enemySkillNumber)][2];

        //Def Extra
        enemySkills[Math.ceil(enemySkillNumber)][3];

        //Cura
        document.getElementsByClassName("life-width")[1].style.width = enemyLifeHealAuxTotal+enemySkills[Math.ceil(enemySkillNumber)][4]+"%";
        document.getElementsByClassName("life-number")[1].innerHTML = enemyLifeHealAuxTotal+enemySkills[Math.ceil(enemySkillNumber)][4];
        enemyLifeHealAuxTotal = enemyLifeHealAuxTotal + enemySkills[Math.ceil(enemySkillNumber)][4];
    
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
        //for(let i = 0; i < 7; i++) {
            //document.getElementsByTagName("button")[i].disabled = false;
        //}
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
    //document.getElementsByClassName("pass-turn")[0].disabled = true;
    //Mostrar Seta do personagem
    document.getElementsByClassName("pixel-left-arrow")[0].style.display = "none"; 
    //Tirar seta do inimigo
    document.getElementsByClassName("pixel-right-arrow")[0].style.display = "block";
}

function skillsTurnsControlFunction() {

    for(let i = 0; i < skillsRounds.length; i++) {
        document.getElementsByClassName("skill")[skillsRounds[i]].disabled = true; 
        document.getElementsByClassName("skill")[skillsRounds[i]].style.filter = "brightness(60%)";
    }
    document.getElementsByClassName("skill")[0].disabled = false; 
    document.getElementsByClassName("skill")[2].disabled = false; 

    if(skillsRounds.length === 0) {
        for(let i = 0; i < 6; i++) {
            document.getElementsByClassName("skill")[i].disabled = false; 
            document.getElementsByClassName("skill")[i].style.filter = "brightness(100%)";
        }
    }
}

window.onload = () => {
    let skillsTurnsControl = setInterval(skillsTurnsControlFunction, 200);
}
