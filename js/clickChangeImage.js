

function changeImg( classNumber ) {

    const imgs = 
    [
        "../img/knight-front.png",
        "../img/rogue-front.png",
        "../img/mage-front.png",
        "../img/necromancer-front.png",
        "../img/demon-front.png",
        "../img/ninja-front.png"
    ];

    //Mudar imagem
    document.getElementsByClassName("heroes-details-img")[0].src = imgs[classNumber];

    let gradientNumbers = 
        [
            //Life  Mana   Att   Def   Int  Agility Char         Type
            [ "10%","80%","60%","20%","80%","50%", "Knight",     "Tank" ], //Knight
            [ "40%","70%","40%","50%","60%","40%", "Rogue",      "Bruiser" ], //Rogue
            [ "80%","10%","30%","70%","20%","90%", "Mage",       "DPS" ], //Mage
            [ "60%","20%","50%","60%","30%","80%", "Necromancer","DPS"  ], //Necromancer
            [ "50%","50%","40%","55%","40%","65%", "Demon",      "Bruiser" ], //Demon
            [ "45%","60%","45%","70%","60%","20%", "Ninja",      "DPS" ], //Ninja
        ]

        //Mudar nome
        document.getElementsByClassName("hero-name")[0].innerHTML = gradientNumbers[classNumber][6];

        //Mudar classe
        document.getElementsByClassName("hero-class-type-2")[0].innerHTML = gradientNumbers[classNumber][7];
        
        //Life
        document.getElementsByClassName(classNumber)[0].style.background = 
        `linear-gradient(to left, rgb(229, 229, 229) ${gradientNumbers[classNumber][0]}, black ${gradientNumbers[classNumber][0]})`;
    
        //Mana
        document.getElementsByClassName(classNumber)[1].style.background = 
        `linear-gradient(to left, rgb(229, 229, 229)  ${gradientNumbers[classNumber][1]}, black ${gradientNumbers[classNumber][1]})`;
    
        //Att
        document.getElementsByClassName(classNumber)[2].style.background = 
        `linear-gradient(to left, rgb(229, 229, 229)  ${gradientNumbers[classNumber][2]}, black ${gradientNumbers[classNumber][2]})`;
    
        //Def
        document.getElementsByClassName(classNumber)[3].style.background = 
        `linear-gradient(to left, rgb(229, 229, 229)  ${gradientNumbers[classNumber][3]}, black ${gradientNumbers[classNumber][3]})`;
    
        //Int
        document.getElementsByClassName(classNumber)[4].style.background = 
        `linear-gradient(to left, rgb(229, 229, 229)  ${gradientNumbers[classNumber][4]}, black ${gradientNumbers[classNumber][4]})`;
    
        //Agility
        document.getElementsByClassName(classNumber)[5].style.background = 
        `linear-gradient(to left, rgb(229, 229, 229)  ${gradientNumbers[classNumber][5]}, black ${gradientNumbers[classNumber][5]})`;
    }