let experience_points = Math.random(); // quantidade de xp ganha ao abater monstro, usada para aprimorar certas habilidades de uma determinada ferramenta

function drop_Minerio(min_drop, max_drop){  //quantidade de minério que dropa após minerar um bloco de minério
    return Math.floor(Math.random() * (max_drop-min_drop +1)) + min_drop;
}