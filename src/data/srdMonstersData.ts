// Bestiario Oficial del Manual de Monstruos 5e (Monster Manual & SRD)
// Statblocks canónicos bilingües con atributos, acciones, rasgos y valores oficiales de D&D 5e

import { MonsterStatblock } from '../types';

export const SRD_MONSTERS_COMPENDIUM: MonsterStatblock[] = [
  {
    "id": "srd-aboleth",
    "name": "Aboleth",
    "size": "Large",
    "type": "Aberración",
    "alignment": "Legal Maligno",
    "ac": 17,
    "acDescription": "armadura natural",
    "hp": 135,
    "hitDice": "18d10 + 36",
    "speed": "10 pies, nadar 40 pies",
    "stats": {
      "str": 21,
      "dex": 9,
      "con": 15,
      "int": 18,
      "wis": 15,
      "cha": 18
    },
    "saves": "Con +6, Int +8, Sab +6",
    "skills": "Historia +12, Percepción +10",
    "senses": "Visión en la oscuridad 120 pies, Percepción pasiva 20",
    "languages": "Infraoscuro, telepatía 120 pies",
    "cr": "10",
    "xp": 5900,
    "traits": [
      {
        "name": "Anfibio",
        "desc": "El aboleth puede respirar aire y agua."
      },
      {
        "name": "Nube Mucosa",
        "desc": "Bajo el agua, el aboleth está rodeado de mucosidad transformadora. Una criatura a 5 pies que lo toque o golpee debe superar una salvación de Constitución CD 14 o contraer una enfermedad: solo puede respirar bajo el agua y su piel se vuelve translúcida y viscosa."
      },
      {
        "name": "Foco Telepático",
        "desc": "Si una criatura se comunica telepáticamente con el aboleth, este conoce los mayores deseos de la criatura."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "El aboleth realiza tres ataques de tentáculo."
      },
      {
        "name": "Tentáculo",
        "desc": "Ataque cuerpo a cuerpo: +9 al ataque, alcance 10 pies. Impacto: 12 (2d6 + 5) de daño contundente. El objetivo debe superar una salvación de Constitución CD 14 o quedar infectado con una enfermedad que seca su piel si no se sumerge en agua."
      },
      {
        "name": "Coletazo",
        "desc": "Ataque cuerpo a cuerpo: +9 al ataque, alcance 10 pies. Impacto: 15 (3d6 + 5) de daño contundente."
      },
      {
        "name": "Esclavizar (3/Día)",
        "desc": "El aboleth elige a una criatura a 30 pies. Debe superar una salvación de Sabiduría CD 14 o quedar mágicamente encantada por el aboleth hasta que este muera o esté en otro plano."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detectar (1 acción)",
        "desc": "El aboleth realiza una prueba de Sabiduría (Percepción)."
      },
      {
        "name": "Coletazo (1 acción)",
        "desc": "El aboleth realiza un ataque de coletazo."
      },
      {
        "name": "Drenaje Psíquico (2 acciones)",
        "desc": "Una criatura encantada por el aboleth sufre 10 (3d6) de daño psíquico, y el aboleth recupera 10 puntos de golpe."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-beholder",
    "name": "Contemplador (Beholder)",
    "size": "Large",
    "type": "Aberración",
    "alignment": "Legal Maligno",
    "ac": 18,
    "acDescription": "armadura natural",
    "hp": 180,
    "hitDice": "19d10 + 76",
    "speed": "0 pies, volar 20 pies (levitación)",
    "stats": {
      "str": 10,
      "dex": 14,
      "con": 18,
      "int": 17,
      "wis": 15,
      "cha": 17
    },
    "saves": "Int +8, Sab +7, Car +8",
    "skills": "Percepción +12",
    "conditionImmunities": "Derribado",
    "senses": "Visión en la oscuridad 120 pies, Percepción pasiva 22",
    "languages": "Infraoscuro, Habla profunda",
    "cr": "13",
    "xp": 10000,
    "traits": [
      {
        "name": "Cono Antimagia",
        "desc": "El ojo central del contemplador crea un cono de antimagia de 150 pies en la dirección que mira. Al inicio de cada turno decide hacia dónde apunta y si el cono está activo."
      }
    ],
    "actions": [
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 14 (4d6) de daño perforante."
      },
      {
        "name": "Rayos Oculares",
        "desc": "El contemplador dispara 3 rayos oculares al azar a objetivos visibles a 120 pies (1d10): 1. Rayo de Hechizo (Sab CD 16), 2. Rayo Paralizante (Con CD 16), 3. Rayo Temible (Sab CD 16), 4. Rayo Ralentizador (Des CD 16), 5. Rayo de Enervación (Con CD 16, 8d8 necrótico), 6. Rayo Telequinético (Fue CD 16), 7. Rayo Somnífero (Sab CD 16), 8. Rayo Petrificante (Des CD 16), 9. Rayo Desintegrador (Des CD 16, 10d8 de fuerza, desintegra si mata), 10. Rayo de Muerte (Des CD 16, 10d10 necrótico, mata instantáneo a 0 PG)."
      }
    ],
    "legendaryActions": [
      {
        "name": "Rayo Ocular (1 acción)",
        "desc": "El contemplador utiliza un rayo ocular aleatorio."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-spectator",
    "name": "Espectador (Spectator)",
    "size": "Medium",
    "type": "Aberración",
    "alignment": "Legal Neutral",
    "ac": 14,
    "acDescription": "armadura natural",
    "hp": 39,
    "hitDice": "6d8 + 12",
    "speed": "0 pies, volar 30 pies (levitación)",
    "stats": {
      "str": 8,
      "dex": 14,
      "con": 14,
      "int": 13,
      "wis": 14,
      "cha": 11
    },
    "skills": "Percepción +6",
    "conditionImmunities": "Derribado",
    "senses": "Visión en la oscuridad 120 pies, Percepción pasiva 16",
    "languages": "Infraoscuro, telepatía 120 pies",
    "cr": "3",
    "xp": 700,
    "actions": [
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +1 al ataque, alcance 5 pies. Impacto: 5 (2d4) de daño perforante."
      },
      {
        "name": "Rayos Oculares",
        "desc": "El espectador dispara hasta dos rayos oculares mágicos a objetivos a 90 pies: 1. Confusión (Sab CD 13), 2. Parálisis (Con CD 13), 3. Miedo (Sab CD 13), 4. Rayo Heridor (Con CD 13, 3d10 necrótico)."
      }
    ],
    "reactions": [
      {
        "name": "Reflejo de Conjuro",
        "desc": "Si el espectador tiene éxito en una tirada de salvación contra un conjuro o si un ataque con conjuro falla, puede redirigirlo contra otra criatura a 30 pies."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-mind-flayer",
    "name": "Azotamentes (Mind Flayer / Illithid)",
    "size": "Medium",
    "type": "Aberración",
    "alignment": "Legal Maligno",
    "ac": 15,
    "acDescription": "coraza pectoral",
    "hp": 71,
    "hitDice": "13d8 + 13",
    "speed": "30 pies",
    "stats": {
      "str": 11,
      "dex": 12,
      "con": 12,
      "int": 19,
      "wis": 17,
      "cha": 17
    },
    "saves": "Int +7, Sab +6, Car +6",
    "skills": "Conocimiento Arcano +7, Engaño +6, Perspicacia +6, Percepción +6, Sigilo +4",
    "senses": "Visión en la oscuridad 120 pies, Percepción pasiva 16",
    "languages": "Infraoscuro, telepatía 120 pies",
    "cr": "7",
    "xp": 2900,
    "traits": [
      {
        "name": "Resistencia Mágica",
        "desc": "El azotamentes tiene ventaja en tiradas de salvación contra conjuros y otros efectos mágicos."
      },
      {
        "name": "Lanzamiento de Conjuros Innato (Psiónica)",
        "desc": "La aptitud de lanzamiento de conjuros es Inteligencia (CD 15). A voluntad: detectar pensamientos, levitación. 1/día cada uno: dominar monstruo, proyectar imagen, cambio de plano (solo él mismo)."
      }
    ],
    "actions": [
      {
        "name": "Tentáculos",
        "desc": "Ataque cuerpo a cuerpo: +7 al ataque, alcance 5 pies. Impacto: 15 (2d10 + 4) de daño psíquico. Si el objetivo es Medium o menor, queda agarrado (CD 15 escapar) e incapacitado mientras dure el agarre."
      },
      {
        "name": "Extraer Cerebro",
        "desc": "Ataque cuerpo a cuerpo: +7 al ataque, un humanoide incapacitado que esté agarrado por el azotamentes. Impacto: 55 (10d10) de daño perforante. Si este daño reduce los PG del objetivo a 0, el azotamentes le arranca y devora el cerebro, matándolo al instante."
      },
      {
        "name": "Estallido Mental (Recarga 5-6)",
        "desc": "El azotamentes emite una descarga psíquica en un cono de 60 pies. Cada criatura debe superar una salvación de Inteligencia CD 15 o sufrir 22 (4d8 + 4) de daño psíquico y quedar aturdida durante 1 minuto."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-gibbering-mouther",
    "name": "Bocón Gorgoteante (Gibbering Mouther)",
    "size": "Medium",
    "type": "Aberración",
    "alignment": "Neutral",
    "ac": 9,
    "hp": 67,
    "hitDice": "9d8 + 27",
    "speed": "10 pies, nadar 10 pies",
    "stats": {
      "str": 10,
      "dex": 8,
      "con": 16,
      "int": 3,
      "wis": 10,
      "cha": 6
    },
    "conditionImmunities": "Derribado",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 10",
    "languages": "—",
    "cr": "2",
    "xp": 450,
    "traits": [
      {
        "name": "Gorgoteo Enloquecedor",
        "desc": "Cualquier criatura que empiece su turno a 20 pies del bocón y pueda escucharlo debe superar una salvación de Sabiduría CD 10 o verse afectada por confusión durante ese turno."
      },
      {
        "name": "Suelo Aberrante",
        "desc": "El terreno en un radio de 10 pies a su alrededor se convierte en cieno fangoso viscoso (terreno difícil). Criaturas que empiecen su turno ahí deben superar Fuerza CD 10 o su velocidad cae a 0."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza un ataque de mordisco y, si puede, usa su escupitajo cegador."
      },
      {
        "name": "Mordiscos",
        "desc": "Ataque cuerpo a cuerpo: +2 al ataque, alcance 5 pies. Impacto: 17 (5d6) de daño perforante. Si el objetivo muere por este daño, es absorbido dentro del bocón."
      },
      {
        "name": "Escupitajo Cegador (Recarga 5-6)",
        "desc": "Escupe un glóbulo a un punto a 15 pies. Destella con luz deslumbrante. Criaturas a 5 pies deben superar Destreza CD 13 o quedar cegadas hasta el final de su siguiente turno."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-chuul",
    "name": "Chúul (Chuul)",
    "size": "Large",
    "type": "Aberración",
    "alignment": "Caótico Maligno",
    "ac": 16,
    "acDescription": "armadura natural",
    "hp": 93,
    "hitDice": "11d10 + 33",
    "speed": "30 pies, nadar 30 pies",
    "stats": {
      "str": 19,
      "dex": 10,
      "con": 16,
      "int": 5,
      "wis": 11,
      "cha": 5
    },
    "skills": "Percepción +4",
    "damageImmunities": "Veneno",
    "conditionImmunities": "Envenenado",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 14",
    "languages": "Comprende el habla profunda pero no puede hablar",
    "cr": "4",
    "xp": 1100,
    "traits": [
      {
        "name": "Anfibio",
        "desc": "El chúul puede respirar aire y agua."
      },
      {
        "name": "Sentido Mágico",
        "desc": "Siente la presencia de magia en un radio de 120 pies como si estuviera bajo el conjuro detectar magia."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "El chúul realiza dos ataques de pinzas. Si está apresando a una criatura, puede usar sus tentáculos paralizantes sobre ella."
      },
      {
        "name": "Pinza",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 10 pies. Impacto: 11 (2d6 + 4) de daño contundente. El objetivo queda apresado (CD 14 escapar). Tiene dos pinzas."
      },
      {
        "name": "Tentáculos",
        "desc": "Una criatura apresada por el chúul debe superar una salvación de Constitución CD 13 o quedar paralizada por veneno durante 1 minuto."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-nothic",
    "name": "Nótico (Nothic)",
    "size": "Medium",
    "type": "Aberración",
    "alignment": "Neutral Maligno",
    "ac": 15,
    "acDescription": "armadura natural",
    "hp": 45,
    "hitDice": "6d8 + 18",
    "speed": "30 pies",
    "stats": {
      "str": 14,
      "dex": 16,
      "con": 16,
      "int": 13,
      "wis": 10,
      "cha": 8
    },
    "skills": "Conocimiento Arcano +3, Percepción +2, Perspicacia +4, Sigilo +5",
    "senses": "Visión en la verdadera 120 pies, Percepción pasiva 12",
    "languages": "Infraoscuro",
    "cr": "2",
    "xp": 450,
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "El nótico realiza dos ataques de garras."
      },
      {
        "name": "Garras",
        "desc": "Ataque cuerpo a cuerpo: +4 al ataque, alcance 5 pies. Impacto: 6 (1d6 + 3) de daño cortante."
      },
      {
        "name": "Mirada Podrida",
        "desc": "El nótico fija su ojo en una criatura a 30 pies. Salvación de Constitución CD 12 o sufre 10 (3d6) de daño necrótico."
      },
      {
        "name": "Intuición Extraña",
        "desc": "El nótico intenta extraer un secreto mental de una criatura visible a 30 pies mediante una prueba enfrentada de Perspicacia vs Engaño."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-otyugh",
    "name": "Otyugh",
    "size": "Large",
    "type": "Aberración",
    "alignment": "Neutral",
    "ac": 14,
    "acDescription": "armadura natural",
    "hp": 114,
    "hitDice": "12d10 + 48",
    "speed": "30 pies",
    "stats": {
      "str": 16,
      "dex": 11,
      "con": 19,
      "int": 6,
      "wis": 13,
      "cha": 6
    },
    "saves": "Con +7",
    "senses": "Visión en la oscuridad 120 pies, Percepción pasiva 11",
    "languages": "Otyugh",
    "cr": "5",
    "xp": 1800,
    "traits": [
      {
        "name": "Telepatía Limitada",
        "desc": "Transmite imágenes y pensamientos a criaturas a 120 pies que comprendan un idioma."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza tres ataques: uno con mordisco y dos con tentáculos."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 5 pies. Impacto: 12 (2d8 + 3) perforante. Debe superar Con CD 15 o contraer la fiebre de la inmundicia."
      },
      {
        "name": "Tentáculo",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 10 pies. Impacto: 7 (1d8 + 3) contundente y el objetivo queda apresado (CD 13)."
      },
      {
        "name": "Golpazo de Tentáculo",
        "desc": "El otyugh estrella a una criatura apresada contra otra o contra el suelo infligiendo 10 (2d6 + 3) contundente y derribándola."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-lobo",
    "name": "Lobo (Wolf)",
    "size": "Medium",
    "type": "Bestia",
    "alignment": "Sin alineamiento",
    "ac": 13,
    "acDescription": "armadura natural",
    "hp": 11,
    "hitDice": "2d8 + 2",
    "speed": "40 pies",
    "stats": {
      "str": 12,
      "dex": 15,
      "con": 12,
      "int": 3,
      "wis": 12,
      "cha": 6
    },
    "skills": "Percepción +3, Sigilo +4",
    "senses": "Percepción pasiva 13",
    "languages": "—",
    "cr": "1/4",
    "xp": 50,
    "traits": [
      {
        "name": "Olfato y Oído Aguzados",
        "desc": "El lobo tiene ventaja en las pruebas de Sabiduría (Percepción) basadas en el olfato o el oído."
      },
      {
        "name": "Tácticas de Manada (Pack Tactics)",
        "desc": "El lobo tiene ventaja en las tiradas de ataque contra una criatura si al menos uno de sus aliados está a 5 pies de ella y no está incapacitado."
      }
    ],
    "actions": [
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +4 al ataque, alcance 5 pies. Impacto: 7 (2d4 + 2) de daño perforante. Si el objetivo es una criatura, debe superar una salvación de Fuerza CD 11 o ser derribada."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-lobo-terrible",
    "name": "Lobo Terrible (Dire Wolf)",
    "size": "Large",
    "type": "Bestia",
    "alignment": "Sin alineamiento",
    "ac": 14,
    "acDescription": "armadura natural",
    "hp": 37,
    "hitDice": "5d10 + 10",
    "speed": "50 pies",
    "stats": {
      "str": 17,
      "dex": 15,
      "con": 15,
      "int": 3,
      "wis": 12,
      "cha": 7
    },
    "skills": "Percepción +3, Sigilo +4",
    "senses": "Percepción pasiva 13",
    "languages": "—",
    "cr": "1",
    "xp": 200,
    "traits": [
      {
        "name": "Oído y Olfato Aguzados",
        "desc": "Ventaja en pruebas de Sabiduría (Percepción) basadas en el oído o en el olfato."
      },
      {
        "name": "Tácticas de Manada",
        "desc": "Ventaja en tiradas de ataque si un aliado consciente está a 5 pies del objetivo."
      }
    ],
    "actions": [
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 10 (2d6 + 3) perforante. Salvación de Fuerza CD 13 o derribado."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-oso-pardo",
    "name": "Oso Pardo (Brown Bear)",
    "size": "Large",
    "type": "Bestia",
    "alignment": "Sin alineamiento",
    "ac": 11,
    "acDescription": "armadura natural",
    "hp": 34,
    "hitDice": "4d10 + 12",
    "speed": "40 pies, trepar 30 pies",
    "stats": {
      "str": 19,
      "dex": 10,
      "con": 16,
      "int": 2,
      "wis": 13,
      "cha": 7
    },
    "skills": "Percepción +3",
    "senses": "Percepción pasiva 13",
    "languages": "—",
    "cr": "1",
    "xp": 200,
    "traits": [
      {
        "name": "Olfato Aguzado",
        "desc": "Ventaja en pruebas de Percepción basadas en el olfato."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "El oso realiza dos ataques: uno de mordisco y uno de garras."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 5 pies. Impacto: 8 (1d8 + 4) perforante."
      },
      {
        "name": "Garras",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 5 pies. Impacto: 11 (2d6 + 4) cortante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-oso-polar",
    "name": "Oso Polar (Polar Bear)",
    "size": "Large",
    "type": "Bestia",
    "alignment": "Sin alineamiento",
    "ac": 12,
    "acDescription": "armadura natural",
    "hp": 42,
    "hitDice": "5d10 + 15",
    "speed": "40 pies, nadar 30 pies",
    "stats": {
      "str": 20,
      "dex": 10,
      "con": 16,
      "int": 2,
      "wis": 13,
      "cha": 7
    },
    "skills": "Percepción +3",
    "senses": "Percepción pasiva 13",
    "languages": "—",
    "cr": "2",
    "xp": 450,
    "traits": [
      {
        "name": "Olfato Aguzado",
        "desc": "Ventaja en pruebas de Sabiduría (Percepción) basadas en el olfato."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques: uno de mordisco y uno de garras."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +7 al ataque, alcance 5 pies. Impacto: 9 (1d8 + 5) perforante."
      },
      {
        "name": "Garras",
        "desc": "Ataque cuerpo a cuerpo: +7 al ataque, alcance 5 pies. Impacto: 12 (2d6 + 5) cortante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-arana-gigante",
    "name": "Araña Gigante (Giant Spider)",
    "size": "Large",
    "type": "Bestia",
    "alignment": "Sin alineamiento",
    "ac": 14,
    "acDescription": "armadura natural",
    "hp": 26,
    "hitDice": "4d10 + 4",
    "speed": "30 pies, trepar 30 pies",
    "stats": {
      "str": 14,
      "dex": 16,
      "con": 12,
      "int": 2,
      "wis": 11,
      "cha": 4
    },
    "skills": "Sigilo +7",
    "senses": "Vista ciega 10 pies, Visión en la oscuridad 60 pies, Percepción pasiva 10",
    "languages": "—",
    "cr": "1",
    "xp": 200,
    "traits": [
      {
        "name": "Trepar Cual Araña (Spider Climb)",
        "desc": "Puede escalar superficies difíciles, incluso boca abajo por los techos, sin necesidad de realizar una prueba de característica."
      },
      {
        "name": "Sentido Telaraña & Caminante de Telarañas",
        "desc": "Ignora restricciones de movimiento de telarañas y conoce la ubicación exacta de cualquier criatura en contacto con la misma red."
      }
    ],
    "actions": [
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 7 (1d8 + 3) perforante más 9 (2d8) de veneno (salvación Con CD 11 para mitad). Si el veneno reduce a 0 PG, el objetivo queda paralizado 1 hora."
      },
      {
        "name": "Telaraña (Recarga 5-6)",
        "desc": "Ataque a distancia: +5 al ataque, alcance 30/60 pies. Impacto: El objetivo queda apresado en la telaraña (CD 12 escapar)."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-tiranosaurio-rex",
    "name": "Tiranosaurio Rex (Tyrannosaurus Rex)",
    "size": "Huge",
    "type": "Bestia",
    "alignment": "Sin alineamiento",
    "ac": 13,
    "acDescription": "armadura natural",
    "hp": 136,
    "hitDice": "13d12 + 52",
    "speed": "50 pies",
    "stats": {
      "str": 25,
      "dex": 10,
      "con": 19,
      "int": 2,
      "wis": 12,
      "cha": 9
    },
    "skills": "Percepción +4",
    "senses": "Percepción pasiva 14",
    "languages": "—",
    "cr": "8",
    "xp": 3900,
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques: uno de mordisco y uno con la cola. No puede usar ambos ataques contra el mismo objetivo."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +10 al ataque, alcance 10 pies. Impacto: 33 (4d12 + 7) de daño perforante. Si el objetivo es Medium o menor, queda apresado (CD 17 escapar) y el T-Rex tiene ventaja en ataques contra él."
      },
      {
        "name": "Coletazo",
        "desc": "Ataque cuerpo a cuerpo: +10 al ataque, alcance 10 pies. Impacto: 20 (3d8 + 7) de daño contundente."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-golem-carne",
    "name": "Gólem de Carne (Flesh Golem)",
    "size": "Medium",
    "type": "Constructo",
    "alignment": "Neutral",
    "ac": 9,
    "hp": 93,
    "hitDice": "11d8 + 44",
    "speed": "30 pies",
    "stats": {
      "str": 19,
      "dex": 9,
      "con": 18,
      "int": 6,
      "wis": 10,
      "cha": 5
    },
    "damageImmunities": "Relámpago, Veneno; Contundente, perforante y cortante de ataques no mágicos ni de adamantina",
    "conditionImmunities": "Hechizado, Agotamiento, Asustado, Paralizado, Petrificado, Envenenado",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 10",
    "languages": "Comprende los idiomas de su creador pero no habla",
    "cr": "5",
    "xp": 1800,
    "traits": [
      {
        "name": "Absorción de Relámpago",
        "desc": "Siempre que sufra daño de relámpago, no sufre daño y recupera puntos de golpe iguales al daño de relámpago recibido."
      },
      {
        "name": "Forma Inmutable",
        "desc": "Inmune a cualquier conjuro o efecto que altere su forma."
      },
      {
        "name": "Aversión al Fuego",
        "desc": "Si sufre daño de fuego, tiene desventaja en tiradas de ataque y pruebas de habilidad hasta el final de su siguiente turno."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "El gólem realiza dos ataques de azote."
      },
      {
        "name": "Azote (Slam)",
        "desc": "Ataque cuerpo a cuerpo: +7 al ataque, alcance 5 pies. Impacto: 13 (2d8 + 4) de daño contundente."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-golem-piedra",
    "name": "Gólem de Piedra (Stone Golem)",
    "size": "Large",
    "type": "Constructo",
    "alignment": "Neutral",
    "ac": 17,
    "acDescription": "armadura natural",
    "hp": 178,
    "hitDice": "17d10 + 85",
    "speed": "30 pies",
    "stats": {
      "str": 22,
      "dex": 9,
      "con": 20,
      "int": 3,
      "wis": 11,
      "cha": 1
    },
    "damageImmunities": "Veneno, Psíquico; Contundente, perforante y cortante de ataques no mágicos ni adamantinos",
    "conditionImmunities": "Hechizado, Agotamiento, Asustado, Paralizado, Petrificado, Envenenado",
    "senses": "Visión en la oscuridad 120 pies, Percepción pasiva 10",
    "languages": "Comprende idiomas de su creador",
    "cr": "10",
    "xp": 5900,
    "traits": [
      {
        "name": "Forma Inmutable & Resistencia Mágica",
        "desc": "Inmune a alteración de forma. Ventaja en tiradas de salvación contra conjuros y otros efectos mágicos."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "El gólem realiza dos ataques de azote."
      },
      {
        "name": "Azote",
        "desc": "Ataque cuerpo a cuerpo: +10 al ataque, alcance 5 pies. Impacto: 19 (3d8 + 6) contundente."
      },
      {
        "name": "Ralentizar (Recarga 5-6)",
        "desc": "Afecta a criaturas en un radio de 10 pies. Salvación de Sabiduría CD 17 o se ven ralentizadas (velocidad reducida a la mitad, no reacciones, solo acción o acción adicional) durante 1 minuto."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-golem-hierro",
    "name": "Gólem de Hierro (Iron Golem)",
    "size": "Large",
    "type": "Constructo",
    "alignment": "Neutral",
    "ac": 20,
    "acDescription": "armadura natural",
    "hp": 210,
    "hitDice": "20d10 + 100",
    "speed": "30 pies",
    "stats": {
      "str": 24,
      "dex": 9,
      "con": 20,
      "int": 3,
      "wis": 11,
      "cha": 1
    },
    "damageImmunities": "Fuego, Veneno, Psíquico; Contundente, perforante y cortante no mágicos ni adamantinos",
    "conditionImmunities": "Hechizado, Agotamiento, Asustado, Paralizado, Petrificado, Envenenado",
    "senses": "Visión en la oscuridad 120 pies, Percepción pasiva 10",
    "languages": "Comprende los idiomas de su creador",
    "cr": "16",
    "xp": 15000,
    "traits": [
      {
        "name": "Absorción de Fuego",
        "desc": "El fuego lo sana en lugar de dañarlo."
      },
      {
        "name": "Resistencia Mágica & Armas Mágicas",
        "desc": "Ventaja contra conjuros. Sus ataques con armas son mágicos."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques con espada o azote."
      },
      {
        "name": "Espada de Hierro",
        "desc": "Ataque cuerpo a cuerpo: +13 al ataque, alcance 10 pies. Impacto: 23 (3d10 + 7) de daño cortante."
      },
      {
        "name": "Aliento Venenoso (Recarga 6)",
        "desc": "Exhala gas venenoso en un cono de 15 pies. Salvación de Constitución CD 19 o sufre 45 (10d8) de daño de veneno (mitad si tiene éxito)."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-armadura-animada",
    "name": "Armadura Animada (Animated Armor)",
    "size": "Medium",
    "type": "Constructo",
    "alignment": "Sin alineamiento",
    "ac": 18,
    "acDescription": "armadura de placas natural",
    "hp": 33,
    "hitDice": "6d8 + 6",
    "speed": "25 pies",
    "stats": {
      "str": 14,
      "dex": 11,
      "con": 13,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "damageImmunities": "Veneno, Psíquico",
    "conditionImmunities": "Cegado, Hechizado, Ensordecido, Agotamiento, Asustado, Paralizado, Petrificado, Envenenado",
    "senses": "Vista ciega 60 pies (ciega más allá), Percepción pasiva 6",
    "languages": "—",
    "cr": "1",
    "xp": 200,
    "traits": [
      {
        "name": "Apariencia Falsa",
        "desc": "Mientras permanece inmóvil, es indistinguible de una armadura de placas normal sobre un soporte."
      },
      {
        "name": "Susceptibilidad a Antimagia",
        "desc": "Queda incapacitada si se encuentra en un campo de antimagia."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "La armadura realiza dos ataques de azote."
      },
      {
        "name": "Azote",
        "desc": "Ataque cuerpo a cuerpo: +4 al ataque, alcance 5 pies. Impacto: 5 (1d6 + 2) contundente."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-cria-dragon-rojo",
    "name": "Cría de Dragón Rojo (Red Dragon Wyrmling)",
    "size": "Medium",
    "type": "Dragón",
    "alignment": "Caótico Maligno",
    "ac": 17,
    "acDescription": "armadura natural",
    "hp": 75,
    "hitDice": "10d8 + 30",
    "speed": "30 pies, trepar 30 pies, volar 60 pies",
    "stats": {
      "str": 19,
      "dex": 10,
      "con": 17,
      "int": 12,
      "wis": 11,
      "cha": 15
    },
    "saves": "Des +2, Con +5, Sab +2, Car +4",
    "skills": "Percepción +4, Sigilo +2",
    "damageImmunities": "Fuego",
    "senses": "Vista ciega 10 pies, Visión en la oscuridad 60 pies, Percepción pasiva 14",
    "languages": "Dracónico",
    "cr": "4",
    "xp": 1100,
    "actions": [
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 5 pies. Impacto: 9 (1d10 + 4) perforante más 3 (1d6) de fuego."
      },
      {
        "name": "Aliento de Fuego (Recarga 5-6)",
        "desc": "Cono de 15 pies. Salvación de Destreza CD 13 o sufre 24 (7d6) de daño de fuego (mitad con éxito)."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-dragon-rojo-joven",
    "name": "Dragón Rojo Joven (Young Red Dragon)",
    "size": "Large",
    "type": "Dragón",
    "alignment": "Caótico Maligno",
    "ac": 18,
    "acDescription": "armadura natural",
    "hp": 178,
    "hitDice": "17d10 + 85",
    "speed": "40 pies, trepar 40 pies, volar 80 pies",
    "stats": {
      "str": 23,
      "dex": 10,
      "con": 21,
      "int": 14,
      "wis": 11,
      "cha": 19
    },
    "saves": "Des +4, Con +9, Sab +4, Car +8",
    "skills": "Percepción +8, Sigilo +4",
    "damageImmunities": "Fuego",
    "senses": "Vista ciega 30 pies, Visión en la oscuridad 120 pies, Percepción pasiva 18",
    "languages": "Común, Dracónico",
    "cr": "10",
    "xp": 5900,
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza tres ataques: uno de mordisco y dos con sus garras."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +10 al ataque, alcance 10 pies. Impacto: 17 (2d10 + 6) perforante más 3 (1d6) fuego."
      },
      {
        "name": "Garras",
        "desc": "Ataque cuerpo a cuerpo: +10 al ataque, alcance 5 pies. Impacto: 13 (2d6 + 6) cortante."
      },
      {
        "name": "Aliento de Fuego (Recarga 5-6)",
        "desc": "Cono de 30 pies. Salvación de Destreza CD 17 o sufre 56 (16d6) de fuego (mitad con éxito)."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-dragon-verde-adulto",
    "name": "Dragón Verde Adulto (Adult Green Dragon)",
    "size": "Huge",
    "type": "Dragón",
    "alignment": "Legal Maligno",
    "ac": 19,
    "acDescription": "armadura natural",
    "hp": 207,
    "hitDice": "18d12 + 90",
    "speed": "40 pies, nadar 40 pies, volar 80 pies",
    "stats": {
      "str": 23,
      "dex": 12,
      "con": 21,
      "int": 18,
      "wis": 15,
      "cha": 17
    },
    "saves": "Des +6, Con +10, Sab +7, Car +8",
    "skills": "Engaño +8, Percepción +12, Perspicacia +7, Sigilo +6",
    "damageImmunities": "Veneno",
    "conditionImmunities": "Envenenado",
    "senses": "Vista ciega 60 pies, Visión en la oscuridad 120 pies, Percepción pasiva 22",
    "languages": "Común, Dracónico",
    "cr": "15",
    "xp": 13000,
    "traits": [
      {
        "name": "Anfibio & Resistencia Legendaria (3/Día)",
        "desc": "Puede respirar aire y agua. Puede tener éxito automático en salvaciones fallidas."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Usa Presencia Pavorosa y realiza tres ataques: mordisco y dos garras."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +11 al ataque, alcance 10 pies. Impacto: 17 (2d10 + 6) perforante más 7 (2d6) veneno."
      },
      {
        "name": "Aliento Venenoso (Recarga 5-6)",
        "desc": "Cono de 60 pies. Salvación de Constitución CD 18 o sufre 56 (16d6) de daño de veneno."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detectar (1)",
        "desc": "Prueba de Percepción."
      },
      {
        "name": "Ataque de Cola (1)",
        "desc": "+11 al ataque, alcance 15 pies. 15 (2d8 + 6) contundente."
      },
      {
        "name": "Aleteo de Alas (2)",
        "desc": "Des CD 19 o sufre 13 (2d6 + 6) contundente y cae derribado."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-dragon-azul-adulto",
    "name": "Dragón Azul Adulto (Adult Blue Dragon)",
    "size": "Huge",
    "type": "Dragón",
    "alignment": "Legal Maligno",
    "ac": 19,
    "acDescription": "armadura natural",
    "hp": 225,
    "hitDice": "18d12 + 108",
    "speed": "40 pies, excavar 30 pies, volar 80 pies",
    "stats": {
      "str": 25,
      "dex": 10,
      "con": 23,
      "int": 16,
      "wis": 15,
      "cha": 19
    },
    "saves": "Des +5, Con +11, Sab +7, Car +9",
    "skills": "Percepción +12, Sigilo +5",
    "damageImmunities": "Relámpago",
    "senses": "Vista ciega 60 pies, Visión en la oscuridad 120 pies, Percepción pasiva 22",
    "languages": "Común, Dracónico",
    "cr": "16",
    "xp": 15000,
    "traits": [
      {
        "name": "Resistencia Legendaria (3/Día)",
        "desc": "El dragón puede decidir superar automáticamente una tirada de salvación fallida."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Presencia Pavorosa y tres ataques: un mordisco y dos garras."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +12 al ataque, alcance 10 pies. Impacto: 18 (2d10 + 7) perforante más 5 (1d10) relámpago."
      },
      {
        "name": "Aliento de Relámpago (Recarga 5-6)",
        "desc": "Línea de 90 pies por 5 pies de ancho. Salvación de Destreza CD 19 o 66 (12d10) daño de relámpago."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detectar (1)",
        "desc": "Prueba de Percepción."
      },
      {
        "name": "Ataque de Cola (1)",
        "desc": "+12 al ataque, alcance 15 pies. Impacto: 16 (2d8 + 7) contundente."
      },
      {
        "name": "Aleteo de Alas (2)",
        "desc": "Destreza CD 20 o 14 (2d6 + 7) contundente y cae derribado."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-dragon-oro-adulto",
    "name": "Dragón de Oro Adulto (Adult Gold Dragon)",
    "size": "Huge",
    "type": "Dragón",
    "alignment": "Legal Bueno",
    "ac": 19,
    "acDescription": "armadura natural",
    "hp": 256,
    "hitDice": "19d12 + 133",
    "speed": "40 pies, nadar 40 pies, volar 80 pies",
    "stats": {
      "str": 27,
      "dex": 14,
      "con": 25,
      "int": 16,
      "wis": 15,
      "cha": 24
    },
    "saves": "Des +8, Con +13, Sab +8, Car +13",
    "skills": "Intuición +8, Percepción +14, Persuasión +13, Sigilo +8",
    "damageImmunities": "Fuego",
    "senses": "Vista ciega 60 pies, Visión en la oscuridad 120 pies, Percepción pasiva 24",
    "languages": "Común, Dracónico",
    "cr": "17",
    "xp": 18000,
    "traits": [
      {
        "name": "Anfibio & Resistencia Legendaria (3/Día)",
        "desc": "Respira aire y agua. Puede convertir tiradas de salvación fallidas en éxitos."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Presencia Pavorosa y tres ataques: un mordisco y dos garras."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +14 al ataque, alcance 10 pies. Impacto: 19 (2d10 + 8) perforante."
      },
      {
        "name": "Aliento de Fuego (Recarga 5-6)",
        "desc": "Cono de 60 pies. Destreza CD 21 o sufre 66 (12d10) de daño de fuego (mitad con éxito)."
      },
      {
        "name": "Aliento Debilitador",
        "desc": "Cono de 60 pies. Fuerza CD 21 o desventaja en pruebas y tiradas de ataque basadas en Fuerza durante 1 minuto."
      },
      {
        "name": "Cambio de Forma",
        "desc": "Se transforma mágicamente en un humanoide o bestia de CR igual o menor a su CR."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detectar (1)",
        "desc": "Prueba de Percepción."
      },
      {
        "name": "Ataque de Cola (1)",
        "desc": "+14 al ataque, 17 (2d8 + 8) contundente."
      },
      {
        "name": "Aleteo de Alas (2)",
        "desc": "Destreza CD 22 o 15 (2d6 + 8) contundente y derribado."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-elemental-fuego",
    "name": "Elemental de Fuego (Fire Elemental)",
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral",
    "ac": 13,
    "hp": 102,
    "hitDice": "12d10 + 36",
    "speed": "50 pies",
    "stats": {
      "str": 10,
      "dex": 17,
      "con": 16,
      "int": 6,
      "wis": 10,
      "cha": 7
    },
    "damageResistances": "Contundente, perforante y cortante de ataques no mágicos",
    "damageImmunities": "Fuego, Veneno",
    "conditionImmunities": "Agotamiento, Agarrado, Paralizado, Petrificado, Envenenado, Derribado, Restringido",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 10",
    "languages": "Ígneo",
    "cr": "5",
    "xp": 1800,
    "traits": [
      {
        "name": "Forma de Fuego",
        "desc": "El elemental puede entrar en el espacio de una criatura hostil y detenerse allí. La primera vez que entra en su espacio en un turno, la criatura sufre 5 (1d10) de daño de fuego y se prende fuego (sufre 1d10 al inicio de cada turno hasta apagarse)."
      },
      {
        "name": "Iluminación",
        "desc": "Emite luz brillante en 30 pies y luz tenue 30 pies adicionales."
      },
      {
        "name": "Susceptibilidad al Agua",
        "desc": "Por cada 5 pies que se mueva en agua o por cada galón de agua que se le arroje, sufre 1 de daño de frío."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "El elemental realiza dos ataques de toque ígneo."
      },
      {
        "name": "Toque Ígneo",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 5 pies. Impacto: 10 (2d6 + 3) de daño de fuego. Si el objetivo es una criatura u objeto inflamable, se prende fuego."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-elemental-agua",
    "name": "Elemental de Agua (Water Elemental)",
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral",
    "ac": 14,
    "acDescription": "armadura natural",
    "hp": 114,
    "hitDice": "12d10 + 48",
    "speed": "30 pies, nadar 90 pies",
    "stats": {
      "str": 18,
      "dex": 14,
      "con": 18,
      "int": 5,
      "wis": 10,
      "cha": 8
    },
    "damageResistances": "Ácido; Contundente, perforante y cortante de armas no mágicas",
    "damageImmunities": "Veneno",
    "conditionImmunities": "Agotamiento, Agarrado, Paralizado, Petrificado, Envenenado, Derribado, Restringido",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 10",
    "languages": "Acuano",
    "cr": "5",
    "xp": 1800,
    "traits": [
      {
        "name": "Forma Líquida",
        "desc": "Puede atravesar cualquier abertura tan pequeña como de 1 pulgada de ancho sin apretarse."
      },
      {
        "name": "Congelamiento",
        "desc": "Si sufre daño de frío, se congela parcialmente reduciendo su velocidad 20 pies hasta el final de su siguiente turno."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques de azote acuático."
      },
      {
        "name": "Azote",
        "desc": "Ataque cuerpo a cuerpo: +7 al ataque, alcance 5 pies. Impacto: 13 (2d8 + 4) de daño contundente."
      },
      {
        "name": "Inundar (Whelm - Recarga 4-6)",
        "desc": "Hasta dos criaturas Large o menores en su espacio deben superar Fuerza CD 15 o sufrir 13 (2d8 + 4) contundente, quedar apresadas y comenzar a ahogarse dentro del cuerpo del elemental."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-elemental-tierra",
    "name": "Elemental de Tierra (Earth Elemental)",
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral",
    "ac": 17,
    "acDescription": "armadura natural",
    "hp": 126,
    "hitDice": "12d10 + 60",
    "speed": "30 pies, excavar 30 pies",
    "stats": {
      "str": 20,
      "dex": 8,
      "con": 20,
      "int": 5,
      "wis": 10,
      "cha": 5
    },
    "damageVulnerabilities": "Trueno",
    "damageResistances": "Contundente, perforante y cortante de ataques no mágicos",
    "damageImmunities": "Veneno",
    "conditionImmunities": "Agotamiento, Paralizado, Petrificado, Envenenado",
    "senses": "Sentido sísmico 60 pies, Visión en la oscuridad 60 pies, Percepción pasiva 10",
    "languages": "Térreo",
    "cr": "5",
    "xp": 1800,
    "traits": [
      {
        "name": "Deslizamiento Terrestre",
        "desc": "Puede excavar a través de tierra y piedra no mágicas sin perturbar el material por el que se desplaza."
      },
      {
        "name": "Monstruo de Asedio",
        "desc": "Inflige daño doble a objetos y estructuras."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques de azote."
      },
      {
        "name": "Azote de Piedra",
        "desc": "Ataque cuerpo a cuerpo: +8 al ataque, alcance 10 pies. Impacto: 14 (2d8 + 5) contundente."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-elemental-aire",
    "name": "Elemental de Aire (Air Elemental)",
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral",
    "ac": 15,
    "hp": 90,
    "hitDice": "12d10 + 24",
    "speed": "0 pies, volar 90 pies (levitación)",
    "stats": {
      "str": 14,
      "dex": 20,
      "con": 14,
      "int": 6,
      "wis": 10,
      "cha": 6
    },
    "damageResistances": "Relámpago, Trueno; Contundente, perforante y cortante de no mágicos",
    "damageImmunities": "Veneno",
    "conditionImmunities": "Agotamiento, Agarrado, Paralizado, Petrificado, Envenenado, Derribado, Restringido",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 10",
    "languages": "Áurico",
    "cr": "5",
    "xp": 1800,
    "traits": [
      {
        "name": "Forma de Aire",
        "desc": "Puede atravesar aberturas de 1 pulgada sin apretarse. Puede detenerse en el espacio de una criatura hostil."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques de azote de viento."
      },
      {
        "name": "Azote de Viento",
        "desc": "Ataque cuerpo a cuerpo: +8 al ataque, alcance 5 pies. Impacto: 14 (2d8 + 5) contundente."
      },
      {
        "name": "Torbellino (Recarga 4-6)",
        "desc": "Cada criatura en su espacio debe superar Fuerza CD 13 o sufrir 15 (3d8 + 2) contundente y ser lanzada a 20 pies en una dirección aleatoria y derribada."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-balor",
    "name": "Balor",
    "size": "Huge",
    "type": "Infernal (Demonio)",
    "alignment": "Caótico Maligno",
    "ac": 19,
    "acDescription": "armadura natural",
    "hp": 262,
    "hitDice": "21d12 + 126",
    "speed": "40 pies, volar 80 pies",
    "stats": {
      "str": 26,
      "dex": 15,
      "con": 22,
      "int": 20,
      "wis": 16,
      "cha": 22
    },
    "saves": "Fue +14, Con +12, Sab +9, Car +12",
    "damageResistances": "Frío, Relámpago; Contundente, perforante y cortante de armas no mágicas",
    "damageImmunities": "Fuego, Veneno",
    "conditionImmunities": "Envenenado",
    "senses": "Visión verdadera 120 pies, Percepción pasiva 13",
    "languages": "Abisal, telepatía 120 pies",
    "cr": "19",
    "xp": 22000,
    "traits": [
      {
        "name": "Espasmo de Muerte (Death Throes)",
        "desc": "Cuando el balor muere, explota. Cada criatura a 30 pies debe realizar una salvación de Destreza CD 20, sufriendo 70 (20d6) de daño de fuego si falla, o la mitad si tiene éxito. La explosión destruye las armas del balor."
      },
      {
        "name": "Aura de Fuego",
        "desc": "Al inicio de cada turno del balor, cualquier criatura a 5 pies de él sufre 10 (3d6) de daño de fuego."
      },
      {
        "name": "Resistencia Mágica & Armas Mágicas",
        "desc": "Ventaja en salvaciones contra conjuros. Sus ataques son mágicos."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "El balor realiza dos ataques: uno con su espada de relámpagos y otro con su látigo de fuego."
      },
      {
        "name": "Espada de Relámpagos",
        "desc": "Ataque cuerpo a cuerpo: +14 al ataque, alcance 10 pies. Impacto: 21 (3d8 + 8) de daño cortante más 13 (3d8) de relámpago."
      },
      {
        "name": "Látigo de Fuego",
        "desc": "Ataque cuerpo a cuerpo: +14 al ataque, alcance 30 pies. Impacto: 15 (2d6 + 8) cortante más 10 (3d6) de fuego, y el objetivo es arrastrado hasta 25 pies hacia el balor."
      },
      {
        "name": "Teletransporte",
        "desc": "El balor se teletransporta mágicamente hasta a 120 pies a un espacio desocupado que pueda ver."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-pit-fiend",
    "name": "Diablo Mayor de la Fosa (Pit Fiend)",
    "size": "Large",
    "type": "Infernal (Diablo)",
    "alignment": "Legal Maligno",
    "ac": 19,
    "acDescription": "armadura natural",
    "hp": 300,
    "hitDice": "24d10 + 168",
    "speed": "30 pies, volar 60 pies",
    "stats": {
      "str": 26,
      "dex": 14,
      "con": 24,
      "int": 22,
      "wis": 18,
      "cha": 24
    },
    "saves": "Des +8, Con +13, Sab +10",
    "damageResistances": "Frío; Contundente, perforante y cortante de no mágicas ni plateadas",
    "damageImmunities": "Fuego, Veneno",
    "conditionImmunities": "Envenenado",
    "senses": "Visión en la verdadera 120 pies, Percepción pasiva 14",
    "languages": "Infernal, telepatía 120 pies",
    "cr": "20",
    "xp": 25000,
    "traits": [
      {
        "name": "Vista del Diablo",
        "desc": "La oscuridad mágica no obstaculiza su visión."
      },
      {
        "name": "Aura de Miedo",
        "desc": "Cualquier criatura hostil a 20 pies debe superar Sabiduría CD 21 o quedar Asustada durante 1 minuto."
      },
      {
        "name": "Resistencia Mágica & Armas Mágicas",
        "desc": "Ventaja en salvaciones contra magia. Sus ataques son mágicos."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "El diablo mayor realiza cuatro ataques: mordisco, maza, garras y cola."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +14 al ataque, alcance 5 pies. Impacto: 22 (4d6 + 8) perforante. Debe superar Con CD 21 o quedar envenenado; no puede regenerar PG mientras esté envenenado y sufre 21 (6d6) de veneno por turno."
      },
      {
        "name": "Maza",
        "desc": "Ataque cuerpo a cuerpo: +14 al ataque, alcance 10 pies. Impacto: 15 (2d6 + 8) contundente más 21 (6d6) de fuego."
      },
      {
        "name": "Garras",
        "desc": "Ataque cuerpo a cuerpo: +14 al ataque, alcance 10 pies. Impacto: 17 (2d8 + 8) cortante."
      },
      {
        "name": "Coletazo",
        "desc": "Ataque cuerpo a cuerpo: +14 al ataque, alcance 10 pies. Impacto: 24 (3d10 + 8) contundente."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-quasit",
    "name": "Quasit",
    "size": "Tiny",
    "type": "Infernal (Demonio)",
    "alignment": "Caótico Maligno",
    "ac": 13,
    "hp": 7,
    "hitDice": "3d4",
    "speed": "40 pies",
    "stats": {
      "str": 5,
      "dex": 17,
      "con": 10,
      "int": 7,
      "wis": 10,
      "cha": 10
    },
    "skills": "Sigilo +5",
    "damageResistances": "Frío, Fuego, Relámpago; Contundente, perforante y cortante no mágicos",
    "damageImmunities": "Veneno",
    "conditionImmunities": "Envenenado",
    "senses": "Visión en la oscuridad 120 pies, Percepción pasiva 10",
    "languages": "Abisal, Común",
    "cr": "1",
    "xp": 200,
    "traits": [
      {
        "name": "Resistencia Mágica & Metamorfo",
        "desc": "Ventaja contra conjuros. Puede cambiar de forma a murciélago, ciempiés o sapo."
      }
    ],
    "actions": [
      {
        "name": "Garras",
        "desc": "Ataque cuerpo a cuerpo: +4 al ataque, alcance 5 pies. Impacto: 5 (1d4 + 3) cortante más 5 (2d4) de veneno y salvación Con CD 10 o envenenado 1 minuto."
      },
      {
        "name": "Espantar (1/Día)",
        "desc": "Una criatura a 20 pies debe superar Sabiduría CD 10 o quedar Asustada 1 minuto."
      },
      {
        "name": "Invisibilidad",
        "desc": "El quasit se vuelve invisible mágicamente hasta que ataca o pierde la concentración."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-imp",
    "name": "Diablillo (Imp)",
    "size": "Tiny",
    "type": "Infernal (Diablo)",
    "alignment": "Legal Maligno",
    "ac": 13,
    "hp": 10,
    "hitDice": "3d4 + 3",
    "speed": "20 pies, volar 40 pies",
    "stats": {
      "str": 6,
      "dex": 17,
      "con": 13,
      "int": 11,
      "wis": 12,
      "cha": 14
    },
    "skills": "Engaño +4, Perspicacia +3, Persuasión +4, Sigilo +5",
    "damageResistances": "Frío; Contundente, perforante y cortante de no mágicos ni plateados",
    "damageImmunities": "Fuego, Veneno",
    "conditionImmunities": "Envenenado",
    "senses": "Visión en la oscuridad 120 pies (incluso mágica), Percepción pasiva 11",
    "languages": "Infernal, Común",
    "cr": "1",
    "xp": 200,
    "traits": [
      {
        "name": "Metamorfo",
        "desc": "Puede transformarse mágicamente en rata, cuervo o araña."
      },
      {
        "name": "Resistencia Mágica",
        "desc": "Ventaja en salvaciones contra conjuros y otros efectos mágicos."
      }
    ],
    "actions": [
      {
        "name": "Aguijón",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 5 (1d4 + 3) perforante más salvación Con CD 11 o sufrir 10 (3d6) de daño de veneno (mitad si tiene éxito)."
      },
      {
        "name": "Invisibilidad",
        "desc": "El diablillo se vuelve invisible mágicamente."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-ogro",
    "name": "Ogro (Ogre)",
    "size": "Large",
    "type": "Gigante",
    "alignment": "Caótico Maligno",
    "ac": 11,
    "acDescription": "armadura de pieles",
    "hp": 59,
    "hitDice": "7d10 + 21",
    "speed": "40 pies",
    "stats": {
      "str": 19,
      "dex": 8,
      "con": 16,
      "int": 5,
      "wis": 7,
      "cha": 7
    },
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 8",
    "languages": "Común, Gigante",
    "cr": "2",
    "xp": 450,
    "actions": [
      {
        "name": "Gran Garrote",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 5 pies. Impacto: 13 (2d8 + 4) de daño contundente."
      },
      {
        "name": "Jabalina",
        "desc": "Ataque cuerpo a cuerpo o a distancia: +6 al ataque, alcance 30/120 pies. Impacto: 11 (2d6 + 4) perforante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-troll",
    "name": "Troll",
    "size": "Large",
    "type": "Gigante",
    "alignment": "Caótico Maligno",
    "ac": 15,
    "acDescription": "armadura natural",
    "hp": 84,
    "hitDice": "8d10 + 40",
    "speed": "30 pies",
    "stats": {
      "str": 18,
      "dex": 13,
      "con": 20,
      "int": 7,
      "wis": 9,
      "cha": 7
    },
    "skills": "Percepción +2",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 12",
    "languages": "Gigante",
    "cr": "5",
    "xp": 1800,
    "traits": [
      {
        "name": "Olfato Aguzado",
        "desc": "Ventaja en pruebas de Percepción basadas en el olfato."
      },
      {
        "name": "Regeneración",
        "desc": "El troll recupera 10 puntos de golpe al inicio de su turno. Si sufre daño de ácido o de fuego, este rasgo no funciona al inicio de su siguiente turno. El troll solo muere si empieza su turno con 0 PG y no puede regenerarse."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "El troll realiza tres ataques: uno con su mordisco y dos con sus garras."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +7 al ataque, alcance 5 pies. Impacto: 7 (1d6 + 4) perforante."
      },
      {
        "name": "Garras",
        "desc": "Ataque cuerpo a cuerpo: +7 al ataque, alcance 5 pies. Impacto: 11 (2d6 + 4) cortante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-gigante-colinas",
    "name": "Gigante de las Colinas (Hill Giant)",
    "size": "Huge",
    "type": "Gigante",
    "alignment": "Caótico Maligno",
    "ac": 13,
    "acDescription": "armadura natural",
    "hp": 105,
    "hitDice": "10d12 + 40",
    "speed": "40 pies",
    "stats": {
      "str": 21,
      "dex": 8,
      "con": 19,
      "int": 5,
      "wis": 9,
      "cha": 6
    },
    "skills": "Percepción +2",
    "senses": "Percepción pasiva 12",
    "languages": "Gigante",
    "cr": "5",
    "xp": 1800,
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "El gigante realiza dos ataques con su gran garrote."
      },
      {
        "name": "Gran Garrote de Gigante",
        "desc": "Ataque cuerpo a cuerpo: +8 al ataque, alcance 10 pies. Impacto: 18 (3d8 + 5) de daño contundente."
      },
      {
        "name": "Lanzar Roca",
        "desc": "Ataque a distancia con arma: +8 al ataque, alcance 60/240 pies. Impacto: 21 (3d10 + 5) contundente."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-gigante-fuego",
    "name": "Gigante de Fuego (Fire Giant)",
    "size": "Huge",
    "type": "Gigante",
    "alignment": "Legal Maligno",
    "ac": 18,
    "acDescription": "cota de placas",
    "hp": 162,
    "hitDice": "13d12 + 78",
    "speed": "30 pies",
    "stats": {
      "str": 25,
      "dex": 9,
      "con": 23,
      "int": 10,
      "wis": 14,
      "cha": 13
    },
    "saves": "Des +3, Con +10, Car +5",
    "skills": "Atletismo +11, Percepción +6",
    "damageImmunities": "Fuego",
    "senses": "Percepción pasiva 16",
    "languages": "Gigante",
    "cr": "9",
    "xp": 5000,
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "El gigante realiza dos ataques con su gran espada."
      },
      {
        "name": "Gran Espada Gigante",
        "desc": "Ataque cuerpo a cuerpo: +11 al ataque, alcance 10 pies. Impacto: 28 (6d6 + 7) de daño cortante."
      },
      {
        "name": "Lanzar Roca Ígnea",
        "desc": "Ataque a distancia: +11 al ataque, alcance 60/240 pies. Impacto: 29 (4d10 + 7) contundente."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-plebeyo",
    "name": "Plebeyo / Aldeano (Commoner)",
    "size": "Medium",
    "type": "Humanoide (Cualquier raza)",
    "alignment": "Cualquier alineamiento",
    "ac": 10,
    "hp": 4,
    "hitDice": "1d8",
    "speed": "30 pies",
    "stats": {
      "str": 10,
      "dex": 10,
      "con": 10,
      "int": 10,
      "wis": 10,
      "cha": 10
    },
    "senses": "Percepción pasiva 10",
    "languages": "Cualquier idioma (normalmente Común)",
    "cr": "0",
    "xp": 10,
    "actions": [
      {
        "name": "Garrote o Herramienta",
        "desc": "Ataque cuerpo a cuerpo: +2 al ataque, alcance 5 pies. Impacto: 2 (1d4) contundente."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-cultista",
    "name": "Cultista (Cultist)",
    "size": "Medium",
    "type": "Humanoide (Cualquier raza)",
    "alignment": "Cualquier no bueno",
    "ac": 12,
    "acDescription": "armadura de cuero",
    "hp": 9,
    "hitDice": "2d8",
    "speed": "30 pies",
    "stats": {
      "str": 11,
      "dex": 12,
      "con": 10,
      "int": 10,
      "wis": 11,
      "cha": 10
    },
    "skills": "Engaño +2, Religión +2",
    "senses": "Percepción pasiva 10",
    "languages": "Común",
    "cr": "1/8",
    "xp": 25,
    "traits": [
      {
        "name": "Devoción Oscura",
        "desc": "El cultista tiene ventaja en tiradas de salvación contra ser Hechizado o Asustado."
      }
    ],
    "actions": [
      {
        "name": "Cimitarra",
        "desc": "Ataque cuerpo a cuerpo: +3 al ataque, alcance 5 pies. Impacto: 4 (1d6 + 1) cortante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-fanatico-culto",
    "name": "Fanático del Culto (Cult Fanatic)",
    "size": "Medium",
    "type": "Humanoide (Cualquier raza)",
    "alignment": "Cualquier no bueno",
    "ac": 13,
    "acDescription": "armadura de cuero tachonado",
    "hp": 33,
    "hitDice": "6d8 + 6",
    "speed": "30 pies",
    "stats": {
      "str": 11,
      "dex": 14,
      "con": 12,
      "int": 10,
      "wis": 13,
      "cha": 14
    },
    "skills": "Engaño +4, Persuasión +4, Religión +2",
    "senses": "Percepción pasiva 11",
    "languages": "Común",
    "cr": "2",
    "xp": 450,
    "traits": [
      {
        "name": "Devoción Oscura",
        "desc": "Ventaja en salvaciones contra ser Hechizado o Asustado."
      },
      {
        "name": "Lanzamiento de Conjuros",
        "desc": "Clérigo de nivel 4 (Sab CD 11, +3 al ataque). Trucos: luz, llama sagrada, taumaturgia. Nivel 1 (4 espacios): orden imperiosa, infligir heridas, escudo de la fe. Nivel 2 (3 espacios): inmovilizar persona, arma espiritual."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "El fanático realiza dos ataques cuerpo a cuerpo con su daga."
      },
      {
        "name": "Daga de Sacrificio",
        "desc": "Ataque cuerpo a cuerpo o a distancia: +4 al ataque, alcance 5 pies o 20/60 pies. Impacto: 4 (1d4 + 2) perforante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-guardia",
    "name": "Guardia (Guard)",
    "size": "Medium",
    "type": "Humanoide (Cualquier raza)",
    "alignment": "Cualquier alineamiento",
    "ac": 16,
    "acDescription": "camisote de mallas, escudo",
    "hp": 11,
    "hitDice": "2d8 + 2",
    "speed": "30 pies",
    "stats": {
      "str": 13,
      "dex": 12,
      "con": 12,
      "int": 10,
      "wis": 11,
      "cha": 10
    },
    "skills": "Percepción +2",
    "senses": "Percepción pasiva 12",
    "languages": "Común",
    "cr": "1/8",
    "xp": 25,
    "actions": [
      {
        "name": "Lanza",
        "desc": "Ataque cuerpo a cuerpo o a distancia: +3 al ataque, alcance 5 pies o 20/60 pies. Impacto: 4 (1d6 + 1) perforante, o 5 (1d8 + 1) a dos manos."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-bandido",
    "name": "Bandido (Bandit)",
    "size": "Medium",
    "type": "Humanoide (Cualquier raza)",
    "alignment": "Cualquier no legal",
    "ac": 12,
    "acDescription": "armadura de cuero",
    "hp": 11,
    "hitDice": "2d8 + 2",
    "speed": "30 pies",
    "stats": {
      "str": 11,
      "dex": 12,
      "con": 12,
      "int": 10,
      "wis": 10,
      "cha": 10
    },
    "senses": "Percepción pasiva 10",
    "languages": "Común",
    "cr": "1/8",
    "xp": 25,
    "actions": [
      {
        "name": "Cimitarra",
        "desc": "Ataque cuerpo a cuerpo: +3 al ataque, alcance 5 pies. Impacto: 4 (1d6 + 1) cortante."
      },
      {
        "name": "Ballesta Ligera",
        "desc": "Ataque a distancia: +3 al ataque, alcance 80/320 pies. Impacto: 5 (1d8 + 1) perforante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-capitan-bandidos",
    "name": "Capitán de Bandidos (Bandit Captain)",
    "size": "Medium",
    "type": "Humanoide",
    "alignment": "Cualquier no legal",
    "ac": 15,
    "acDescription": "cuero tachonado",
    "hp": 65,
    "hitDice": "10d8 + 20",
    "speed": "30 pies",
    "stats": {
      "str": 15,
      "dex": 16,
      "con": 14,
      "int": 14,
      "wis": 11,
      "cha": 14
    },
    "saves": "Fue +4, Des +5, Sab +2",
    "skills": "Atletismo +4, Engaño +4",
    "senses": "Percepción pasiva 10",
    "languages": "Común",
    "cr": "2",
    "xp": 450,
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza tres ataques: dos con su cimitarra y uno con su daga."
      },
      {
        "name": "Cimitarra",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 6 (1d6 + 3) cortante."
      },
      {
        "name": "Daga",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 5 (1d4 + 3) perforante."
      }
    ],
    "reactions": [
      {
        "name": "Parada (Parry)",
        "desc": "El capitán añade 2 a su CA contra un ataque cuerpo a cuerpo que fuera a impactarle."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-caballero",
    "name": "Caballero (Knight)",
    "size": "Medium",
    "type": "Humanoide",
    "alignment": "Cualquier alineamiento",
    "ac": 18,
    "acDescription": "armadura de placas",
    "hp": 52,
    "hitDice": "8d8 + 16",
    "speed": "30 pies",
    "stats": {
      "str": 16,
      "dex": 11,
      "con": 14,
      "int": 11,
      "wis": 11,
      "cha": 15
    },
    "saves": "Con +4, Sab +2",
    "senses": "Percepción pasiva 10",
    "languages": "Común",
    "cr": "3",
    "xp": 700,
    "traits": [
      {
        "name": "Valentía",
        "desc": "Ventaja en salvaciones contra ser Asustado."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "El caballero realiza dos ataques con su gran espada."
      },
      {
        "name": "Gran Espada",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 10 (2d6 + 3) cortante."
      },
      {
        "name": "Liderazgo (1/Descanso)",
        "desc": "Durante 1 minuto emite órdenes. Cada aliado a 30 pies suma 1d4 a tiradas de ataque o salvación."
      }
    ],
    "reactions": [
      {
        "name": "Parada",
        "desc": "Añade 2 a su CA contra un ataque cuerpo a cuerpo."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-mago",
    "name": "Mago (Mage)",
    "size": "Medium",
    "type": "Humanoide",
    "alignment": "Cualquier alineamiento",
    "ac": 12,
    "acDescription": "15 con armadura de mago",
    "hp": 40,
    "hitDice": "9d8",
    "speed": "30 pies",
    "stats": {
      "str": 9,
      "dex": 14,
      "con": 11,
      "int": 17,
      "wis": 12,
      "cha": 11
    },
    "saves": "Int +6, Sab +4",
    "skills": "Conocimiento Arcano +6, Historia +6",
    "senses": "Percepción pasiva 11",
    "languages": "Cualquiera cuatro idiomas",
    "cr": "6",
    "xp": 2300,
    "traits": [
      {
        "name": "Lanzador de Conjuros (Nivel 9)",
        "desc": "Int CD 14, +6 al ataque. Trucos: descarga de fuego, luz, mano de mago, prestidigitación. Nivel 1 (4 espacios): detectar magia, armadura de mago, proyectil mágico, escudo. Nivel 2 (3 espacios): paso brumoso, sugestión. Nivel 3 (3 espacios): contrahechizo, bola de fuego, volar. Nivel 4 (3 espacios): invisibilidad mayor, tormenta de hielo. Nivel 5 (1 espacio): cono de frío."
      }
    ],
    "actions": [
      {
        "name": "Daga",
        "desc": "Ataque cuerpo a cuerpo o a distancia: +5 al ataque, alcance 5 pies o 20/60 pies. Impacto: 4 (1d4 + 2) perforante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-archimago",
    "name": "Archimago (Archmage)",
    "size": "Medium",
    "type": "Humanoide",
    "alignment": "Cualquier alineamiento",
    "ac": 12,
    "acDescription": "15 con armadura de mago",
    "hp": 99,
    "hitDice": "18d8 + 18",
    "speed": "30 pies",
    "stats": {
      "str": 10,
      "dex": 14,
      "con": 12,
      "int": 20,
      "wis": 15,
      "cha": 16
    },
    "saves": "Int +9, Sab +6",
    "skills": "Conocimiento Arcano +13, Historia +13",
    "damageResistances": "Daño de conjuros; no mágico contundente, perforante y cortante (de piedras de piel)",
    "senses": "Percepción pasiva 12",
    "languages": "Seis idiomas cualesquiera",
    "cr": "12",
    "xp": 8400,
    "traits": [
      {
        "name": "Resistencia Mágica",
        "desc": "Ventaja en tiradas de salvación contra conjuros y otros efectos mágicos."
      },
      {
        "name": "Lanzador de Conjuros de Nivel 18",
        "desc": "Int CD 17, +9 al ataque. Conoce conjuros de nivel 1 al 9, incluyendo: bola de fuego, contrahechizo, teleportación, laberinto y parar el tiempo (time stop)."
      }
    ],
    "actions": [
      {
        "name": "Daga",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 5 pies. Impacto: 4 (1d4 + 2) perforante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-asesino",
    "name": "Asesino (Assassin)",
    "size": "Medium",
    "type": "Humanoide",
    "alignment": "Cualquier no bueno",
    "ac": 15,
    "acDescription": "cuero tachonado",
    "hp": 78,
    "hitDice": "12d8 + 24",
    "speed": "30 pies",
    "stats": {
      "str": 11,
      "dex": 16,
      "con": 14,
      "int": 13,
      "wis": 11,
      "cha": 10
    },
    "saves": "Des +6, Int +4",
    "skills": "Acrobacias +6, Engaño +3, Percepción +3, Sigilo +9",
    "damageResistances": "Veneno",
    "senses": "Percepción pasiva 13",
    "languages": "Común, Jerga de ladrones",
    "cr": "8",
    "xp": 3900,
    "traits": [
      {
        "name": "Asesinar (Assassinate)",
        "desc": "En su primer turno, el asesino tiene ventaja en tiradas de ataque contra cualquier criatura que no haya actuado todavía. Cualquier impacto que logre contra una criatura sorprendida es un impacto crítico."
      },
      {
        "name": "Ataque Furtivo (Sneak Attack)",
        "desc": "Inflige 14 (4d6) de daño adicional si tiene ventaja o si un aliado está a 5 pies de su objetivo."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "El asesino realiza dos ataques con su espada corta."
      },
      {
        "name": "Espada Corta Envenenada",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 5 pies. Impacto: 6 (1d6 + 3) perforante, y el objetivo debe superar una salvación de Constitución CD 15 o sufrir 24 (7d6) de daño de veneno (mitad si tiene éxito)."
      },
      {
        "name": "Ballesta Ligera Envenenada",
        "desc": "Ataque a distancia: +6 al ataque, alcance 80/320 pies. Impacto: 7 (1d8 + 3) perforante más 24 (7d6) de veneno (salvación Con CD 15 mitad)."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-orco",
    "name": "Orco (Orc)",
    "size": "Medium",
    "type": "Humanoide (Orco)",
    "alignment": "Caótico Maligno",
    "ac": 13,
    "acDescription": "armadura de pieles",
    "hp": 15,
    "hitDice": "2d8 + 6",
    "speed": "30 pies",
    "stats": {
      "str": 16,
      "dex": 12,
      "con": 16,
      "int": 7,
      "wis": 11,
      "cha": 10
    },
    "skills": "Intimidación +2",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 10",
    "languages": "Común, Orco",
    "cr": "1/2",
    "xp": 100,
    "traits": [
      {
        "name": "Agresivo (Aggressive)",
        "desc": "Como acción adicional, el orco puede moverse hasta su velocidad hacia una criatura hostil que pueda ver."
      }
    ],
    "actions": [
      {
        "name": "Gran Hacha",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 9 (1d12 + 3) cortante."
      },
      {
        "name": "Jabalina",
        "desc": "Ataque a distancia: +5 al ataque, alcance 30/120 pies. Impacto: 6 (1d6 + 3) perforante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-hobgoblin",
    "name": "Hobgoblin",
    "size": "Medium",
    "type": "Humanoide (Goblinoid)",
    "alignment": "Legal Maligno",
    "ac": 18,
    "acDescription": "cota de malla, escudo",
    "hp": 11,
    "hitDice": "2d8 + 2",
    "speed": "30 pies",
    "stats": {
      "str": 13,
      "dex": 12,
      "con": 12,
      "int": 10,
      "wis": 10,
      "cha": 9
    },
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 10",
    "languages": "Común, Goblin",
    "cr": "1/2",
    "xp": 100,
    "traits": [
      {
        "name": "Ventaja Marcial (Martial Advantage)",
        "desc": "Una vez por turno, inflige 7 (2d6) de daño adicional a una criatura impactada con un ataque con arma si esa criatura está a 5 pies de un aliado del hobgoblin que no esté incapacitado."
      }
    ],
    "actions": [
      {
        "name": "Espada Larga",
        "desc": "Ataque cuerpo a cuerpo: +3 al ataque, alcance 5 pies. Impacto: 5 (1d8 + 1) cortante."
      },
      {
        "name": "Arco Largo",
        "desc": "Ataque a distancia: +3 al ataque, alcance 150/600 pies. Impacto: 5 (1d8 + 1) perforante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-bugbear",
    "name": "Bugbear",
    "size": "Medium",
    "type": "Humanoide (Goblinoid)",
    "alignment": "Caótico Maligno",
    "ac": 16,
    "acDescription": "armadura de pieles, escudo",
    "hp": 27,
    "hitDice": "5d8 + 5",
    "speed": "30 pies",
    "stats": {
      "str": 15,
      "dex": 14,
      "con": 13,
      "int": 8,
      "wis": 11,
      "cha": 9
    },
    "skills": "Sigilo +6, Supervivencia +2",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 10",
    "languages": "Común, Goblin",
    "cr": "1",
    "xp": 200,
    "traits": [
      {
        "name": "Bruto (Brute)",
        "desc": "Un ataque con arma cuerpo a cuerpo inflige un dado adicional de su daño cuando impacta (ya incluido en el ataque)."
      },
      {
        "name": "Ataque Sorpresa",
        "desc": "Si sorprende a una criatura y la impacta durante la primera ronda de combate, inflige 7 (2d6) de daño adicional."
      }
    ],
    "actions": [
      {
        "name": "Lucero del Alba",
        "desc": "Ataque cuerpo a cuerpo: +4 al ataque, alcance 5 pies. Impacto: 11 (2d8 + 2) perforante."
      },
      {
        "name": "Jabalina",
        "desc": "Ataque a distancia: +4 al ataque, alcance 30/120 pies. Impacto: 9 (2d6 + 2) perforante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-drow",
    "name": "Drow (Elfo Oscuro)",
    "size": "Medium",
    "type": "Humanoide (Elfo)",
    "alignment": "Neutral Maligno",
    "ac": 15,
    "acDescription": "armadura de cuero tachonado",
    "hp": 13,
    "hitDice": "3d8",
    "speed": "30 pies",
    "stats": {
      "str": 10,
      "dex": 14,
      "con": 10,
      "int": 11,
      "wis": 11,
      "cha": 12
    },
    "skills": "Percepción +2, Sigilo +4",
    "senses": "Visión en la oscuridad 120 pies, Percepción pasiva 12",
    "languages": "Elfo, Infraoscuro",
    "cr": "1/4",
    "xp": 50,
    "traits": [
      {
        "name": "Sensibilidad a la Luz Solar",
        "desc": "Desventaja en tiradas de ataque y pruebas de Percepción que dependan de la vista bajo la luz del sol."
      },
      {
        "name": "Lanzamiento de Conjuros Innato",
        "desc": "Carisma (CD 11). A voluntad: luces danzantes. 1/día cada uno: oscuridad, fuego feérico."
      }
    ],
    "actions": [
      {
        "name": "Espada Corta",
        "desc": "Ataque cuerpo a cuerpo: +4 al ataque, alcance 5 pies. Impacto: 5 (1d6 + 2) perforante."
      },
      {
        "name": "Ballesta de Mano con Veneno",
        "desc": "Ataque a distancia: +4 al ataque, alcance 30/120 pies. Impacto: 5 (1d6 + 2) perforante, y debe superar Constitución CD 13 o quedar envenenado durante 1 hora. Si falla por 5 o más, cae inconsciente."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-kobold",
    "name": "Kobold",
    "size": "Small",
    "type": "Humanoide (Kobold)",
    "alignment": "Legal Maligno",
    "ac": 12,
    "hp": 5,
    "hitDice": "2d6 - 2",
    "speed": "30 pies",
    "stats": {
      "str": 7,
      "dex": 15,
      "con": 9,
      "int": 8,
      "wis": 7,
      "cha": 8
    },
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 8",
    "languages": "Común, Dracónico",
    "cr": "1/8",
    "xp": 25,
    "traits": [
      {
        "name": "Sensibilidad a la Luz Solar",
        "desc": "Desventaja en ataques si él o su objetivo están bajo luz solar directa."
      },
      {
        "name": "Tácticas de Manada",
        "desc": "Ventaja en tiradas de ataque contra una criatura si al menos un aliado está a 5 pies de ella."
      }
    ],
    "actions": [
      {
        "name": "Daga",
        "desc": "Ataque cuerpo a cuerpo: +4 al ataque, alcance 5 pies. Impacto: 4 (1d4 + 2) perforante."
      },
      {
        "name": "Honda",
        "desc": "Ataque a distancia: +4 al ataque, alcance 30/120 pies. Impacto: 4 (1d4 + 2) contundente."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-hombre-lobo",
    "name": "Hombre Lobo (Werewolf)",
    "size": "Medium",
    "type": "Humanoide (Licántropo)",
    "alignment": "Caótico Maligno",
    "ac": 11,
    "acDescription": "en forma humanoide, 12 en híbrida/lobo",
    "hp": 58,
    "hitDice": "9d8 + 18",
    "speed": "30 pies (40 pies en forma de lobo)",
    "stats": {
      "str": 15,
      "dex": 13,
      "con": 14,
      "int": 10,
      "wis": 11,
      "cha": 10
    },
    "skills": "Percepción +4, Sigilo +3",
    "damageImmunities": "Contundente, perforante y cortante de ataques no mágicos que no sean de plata",
    "senses": "Percepción pasiva 14",
    "languages": "Común (no puede hablar en forma de lobo)",
    "cr": "3",
    "xp": 700,
    "traits": [
      {
        "name": "Metamorfo (Shapechanger)",
        "desc": "Puede usar su acción para transformarse en un lobo o en un híbrido de hombre y lobo, o volver a su forma humanoide."
      },
      {
        "name": "Oído y Olfato Aguzados",
        "desc": "Ventaja en pruebas de Percepción basadas en el oído o el olfato."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "En forma humanoide o híbrida, realiza dos ataques: uno con mordisco y uno con garras o arma."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +4 al ataque, alcance 5 pies. Impacto: 6 (1d8 + 2) perforante. Si el objetivo es un humanoide, debe superar una salvación de Constitución CD 12 o quedar infectado con la maldición de la licantropía."
      },
      {
        "name": "Garras (Solo Forma Híbrida)",
        "desc": "Ataque cuerpo a cuerpo: +4 al ataque, alcance 5 pies. Impacto: 7 (2d4 + 2) cortante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-oso-lechuza",
    "name": "Oso Lechuza (Owlbear)",
    "size": "Large",
    "type": "Monstruosidad",
    "alignment": "Sin alineamiento",
    "ac": 13,
    "acDescription": "armadura natural",
    "hp": 59,
    "hitDice": "7d10 + 21",
    "speed": "40 pies",
    "stats": {
      "str": 20,
      "dex": 12,
      "con": 17,
      "int": 3,
      "wis": 12,
      "cha": 7
    },
    "skills": "Percepción +3",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 13",
    "languages": "—",
    "cr": "3",
    "xp": 700,
    "traits": [
      {
        "name": "Vista y Olfato Aguzados",
        "desc": "El oso lechuza tiene ventaja en pruebas de Sabiduría (Percepción) basadas en la vista o en el olfato."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "El oso lechuza realiza dos ataques: uno con su pico y otro con sus garras."
      },
      {
        "name": "Pico",
        "desc": "Ataque cuerpo a cuerpo: +7 al ataque, alcance 5 pies. Impacto: 10 (1d10 + 5) de daño perforante."
      },
      {
        "name": "Garras",
        "desc": "Ataque cuerpo a cuerpo: +7 al ataque, alcance 5 pies. Impacto: 14 (2d8 + 5) de daño cortante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-mimic",
    "name": "Falso Cofre / Mímico (Mimic)",
    "size": "Medium",
    "type": "Monstruosidad (Metamorfo)",
    "alignment": "Neutral",
    "ac": 12,
    "acDescription": "armadura natural",
    "hp": 58,
    "hitDice": "9d8 + 18",
    "speed": "15 pies",
    "stats": {
      "str": 17,
      "dex": 12,
      "con": 15,
      "int": 5,
      "wis": 13,
      "cha": 8
    },
    "skills": "Sigilo +5",
    "damageImmunities": "Ácido",
    "conditionImmunities": "Derribado",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 11",
    "languages": "—",
    "cr": "2",
    "xp": 450,
    "traits": [
      {
        "name": "Apariencia Falsa (Forma de Objeto)",
        "desc": "Mientras permanece inmóvil, es indistinguible de un objeto inanimado ordinario (cofre, puerta, barril, estatua)."
      },
      {
        "name": "Adhesivo (Adhesive)",
        "desc": "El mímico se adhiere a cualquier cosa que lo toque. Una criatura Huge o menor que lo toque queda agarrada (CD 13 escapar). Pruebas de habilidad realizadas para escapar del agarre tienen desventaja."
      }
    ],
    "actions": [
      {
        "name": "Seudópodo",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 7 (1d8 + 3) contundente y el objetivo queda adherido al mímico."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 7 (1d8 + 3) perforante más 4 (1d8) de daño de ácido."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-basilisco",
    "name": "Basilisco (Basilisk)",
    "size": "Medium",
    "type": "Monstruosidad",
    "alignment": "Sin alineamiento",
    "ac": 12,
    "acDescription": "armadura natural",
    "hp": 52,
    "hitDice": "8d8 + 16",
    "speed": "20 pies",
    "stats": {
      "str": 16,
      "dex": 8,
      "con": 15,
      "int": 2,
      "wis": 8,
      "cha": 7
    },
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 9",
    "languages": "—",
    "cr": "3",
    "xp": 700,
    "traits": [
      {
        "name": "Mirada Petrificante",
        "desc": "Si una criatura empieza su turno a 30 pies del basilisco y los dos pueden verse, el basilisco puede obligarla a realizar una salvación de Constitución CD 12. Si falla, comienza a convertirse en piedra (restringida) y al final de su siguiente turno debe repetir la salvación: si vuelve a fallar queda Petrificada permanentemente. Las criaturas pueden apartar la vista al inicio de su turno."
      }
    ],
    "actions": [
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 10 (2d6 + 3) perforante más 7 (2d6) de daño de veneno."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-medusa",
    "name": "Medusa",
    "size": "Medium",
    "type": "Monstruosidad",
    "alignment": "Legal Maligno",
    "ac": 15,
    "acDescription": "armadura natural",
    "hp": 127,
    "hitDice": "17d8 + 51",
    "speed": "30 pies",
    "stats": {
      "str": 10,
      "dex": 15,
      "con": 16,
      "int": 12,
      "wis": 13,
      "cha": 15
    },
    "skills": "Engaño +5, Intuición +4, Percepción +4, Sigilo +5",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 14",
    "languages": "Común",
    "cr": "6",
    "xp": 2300,
    "traits": [
      {
        "name": "Mirada Petrificante",
        "desc": "Cualquier criatura a 30 pies debe superar Constitución CD 14 o comenzar a petrificarse. Si falla por 5 o más, se petrifica al instante. Si ve su propio reflejo en una superficie brillante bajo luz adecuada, debe salvarse contra su propia petrificación."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "La medusa realiza tres ataques: uno con pelo de serpientes y dos con su espada corta, o dos con su arco largo."
      },
      {
        "name": "Pelo de Serpientes",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 4 (1d4 + 2) perforante más 14 (4d6) de daño de veneno."
      },
      {
        "name": "Espada Corta",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 5 (1d6 + 2) perforante."
      },
      {
        "name": "Arco Largo",
        "desc": "Ataque a distancia: +5 al ataque, alcance 150/600 pies. Impacto: 6 (1d8 + 2) perforante más 7 (2d6) de veneno."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-hidra",
    "name": "Hidra (Hydra)",
    "size": "Huge",
    "type": "Monstruosidad",
    "alignment": "Sin alineamiento",
    "ac": 15,
    "acDescription": "armadura natural",
    "hp": 172,
    "hitDice": "15d12 + 75",
    "speed": "30 pies, nadar 30 pies",
    "stats": {
      "str": 20,
      "dex": 12,
      "con": 20,
      "int": 2,
      "wis": 10,
      "cha": 7
    },
    "skills": "Percepción +6",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 16",
    "languages": "—",
    "cr": "8",
    "xp": 3900,
    "traits": [
      {
        "name": "Múltiples Cabezas",
        "desc": "La hidra empieza con cinco cabezas. Mientras tenga más de una cabeza, tiene ventaja en salvaciones contra ser Cegada, Hechizada, Ensordecida, Asustada, Aturdida o puesta a dormir."
      },
      {
        "name": "Crecimiento Reactivo de Cabezas",
        "desc": "Siempre que sufra 25 o más de daño en un solo turno, una de sus cabezas muere. Al final de su turno, le crecen dos cabezas nuevas por cada cabeza muerta, recuperando 10 PG por cada cabeza recuperada, a menos que haya sufrido daño de fuego desde su último turno."
      },
      {
        "name": "Reacciones Reactivas",
        "desc": "Por cada cabeza que tenga más allá de una, obtiene una reacción adicional que solo puede usarse para ataques de oportunidad."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "La hidra realiza tantos ataques de mordisco como cabezas tenga."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +8 al ataque, alcance 10 pies. Impacto: 10 (1d10 + 5) perforante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-quimera",
    "name": "Quimera (Chimera)",
    "size": "Large",
    "type": "Monstruosidad",
    "alignment": "Caótico Maligno",
    "ac": 14,
    "acDescription": "armadura natural",
    "hp": 114,
    "hitDice": "12d10 + 48",
    "speed": "30 pies, volar 60 pies",
    "stats": {
      "str": 19,
      "dex": 11,
      "con": 19,
      "int": 3,
      "wis": 14,
      "cha": 10
    },
    "skills": "Percepción +8",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 18",
    "languages": "Comprende Dracónico pero no puede hablar",
    "cr": "6",
    "xp": 2300,
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza tres ataques: uno con mordisco, uno con cuernos y uno con garras. Cuando su aliento de fuego esté disponible, puede usarlo en lugar del mordisco o los cuernos."
      },
      {
        "name": "Mordisco de Dragón",
        "desc": "Ataque cuerpo a cuerpo: +7 al ataque, alcance 5 pies. Impacto: 11 (2d6 + 4) perforante."
      },
      {
        "name": "Cornada de Cabra",
        "desc": "Ataque cuerpo a cuerpo: +7 al ataque, alcance 5 pies. Impacto: 10 (1d12 + 4) contundente."
      },
      {
        "name": "Garras de León",
        "desc": "Ataque cuerpo a cuerpo: +7 al ataque, alcance 5 pies. Impacto: 11 (2d6 + 4) cortante."
      },
      {
        "name": "Aliento de Fuego (Recarga 5-6)",
        "desc": "La cabeza de dragón exhala fuego en un cono de 15 pies. Salvación de Destreza CD 15 o sufre 31 (7d8) de fuego (mitad con éxito)."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-drider",
    "name": "Dríder (Drider)",
    "size": "Large",
    "type": "Monstruosidad",
    "alignment": "Caótico Maligno",
    "ac": 19,
    "acDescription": "armadura natural",
    "hp": 123,
    "hitDice": "13d10 + 52",
    "speed": "30 pies, trepar 30 pies",
    "stats": {
      "str": 16,
      "dex": 16,
      "con": 18,
      "int": 13,
      "wis": 14,
      "cha": 12
    },
    "skills": "Percepción +5, Sigilo +9",
    "senses": "Visión en la oscuridad 120 pies, Percepción pasiva 15",
    "languages": "Elfo, Infraoscuro",
    "cr": "6",
    "xp": 2300,
    "traits": [
      {
        "name": "Trepar Cual Araña & Caminante de Telarañas",
        "desc": "Escala paredes y techos sin tirada. No le afectan las telarañas."
      },
      {
        "name": "Sensibilidad a la Luz Solar",
        "desc": "Desventaja en ataques bajo luz solar directa."
      },
      {
        "name": "Lanzamiento de Conjuros Innato",
        "desc": "Sabiduría CD 13. A voluntad: luces danzantes. 1/día cada uno: oscuridad, fuego feérico."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza tres ataques con espada larga o tres con arco largo. Puede reemplazar un ataque por un mordisco."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 5 pies. Impacto: 2 (1d4) perforante más 9 (2d8) de veneno."
      },
      {
        "name": "Espada Larga",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 5 pies. Impacto: 7 (1d8 + 3) cortante."
      },
      {
        "name": "Arco Largo",
        "desc": "Ataque a distancia: +6 al ataque, alcance 150/600 pies. Impacto: 7 (1d8 + 3) perforante más 4 (1d8) de veneno."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-tarrasque",
    "name": "Tarrasque",
    "size": "Gargantuan",
    "type": "Monstruosidad (Titán)",
    "alignment": "Sin alineamiento",
    "ac": 25,
    "acDescription": "armadura natural reflectante",
    "hp": 676,
    "hitDice": "33d20 + 330",
    "speed": "40 pies",
    "stats": {
      "str": 30,
      "dex": 11,
      "con": 30,
      "int": 3,
      "wis": 11,
      "cha": 11
    },
    "saves": "Int +5, Sab +9, Car +9",
    "damageImmunities": "Fuego, Veneno; Contundente, perforante y cortante de ataques no mágicos",
    "conditionImmunities": "Hechizado, Asustado, Paralizado, Envenenado",
    "senses": "Vista ciega 120 pies, Percepción pasiva 10",
    "languages": "—",
    "cr": "30",
    "xp": 155000,
    "traits": [
      {
        "name": "Caparazón Reflectante",
        "desc": "Cualquier proyectil mágico, conjuro de línea o conjuro que requiera tirada de ataque a distancia que impacte al tarrasque se desvía inofensivamente (con 1d6 de 6 se refleja al lanzador)."
      },
      {
        "name": "Resistencia Legendaria (3/Día)",
        "desc": "Si falla una tirada de salvación, puede decidir tener éxito."
      },
      {
        "name": "Monstruo de Asedio",
        "desc": "Inflige daño doble a objetos y estructuras."
      },
      {
        "name": "Resistencia Mágica",
        "desc": "Ventaja en salvaciones contra conjuros y otros efectos mágicos."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Usa su Presencia Pavorosa y realiza cinco ataques: uno con mordisco, dos con garras, uno con cuernos y uno con la cola."
      },
      {
        "name": "Presencia Pavorosa",
        "desc": "Criaturas a 120 pies deben superar Sabiduría CD 17 o quedar Asustadas 1 minuto."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +19 al ataque, alcance 10 pies. Impacto: 36 (4d12 + 10) perforante. Si es Huge o menor queda apresado y puede ser tragado."
      },
      {
        "name": "Garras",
        "desc": "Ataque cuerpo a cuerpo: +19 al ataque, alcance 15 pies. Impacto: 28 (4d8 + 10) cortante."
      },
      {
        "name": "Cornada",
        "desc": "Ataque cuerpo a cuerpo: +19 al ataque, alcance 10 pies. Impacto: 32 (4d10 + 10) perforante."
      },
      {
        "name": "Coletazo",
        "desc": "Ataque cuerpo a cuerpo: +19 al ataque, alcance 20 pies. Impacto: 24 (4d6 + 10) contundente y derribado."
      },
      {
        "name": "Tragar",
        "desc": "El tarrasque se traga a una criatura Large o menor que tenga apresada. Sufre 56 (16d6) de ácido al inicio de cada turno del tarrasque."
      }
    ],
    "legendaryActions": [
      {
        "name": "Ataque (1)",
        "desc": "Realiza un ataque de garra o coletazo."
      },
      {
        "name": "Moverse (1)",
        "desc": "Se mueve hasta la mitad de su velocidad."
      },
      {
        "name": "Morder o Tragar (2)",
        "desc": "Realiza un ataque de mordisco o traga."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-cubo-gelatinoso",
    "name": "Cubo Gelatinoso (Gelatinous Cube)",
    "size": "Large",
    "type": "Cieno",
    "alignment": "Sin alineamiento",
    "ac": 6,
    "hp": 84,
    "hitDice": "8d10 + 40",
    "speed": "15 pies",
    "stats": {
      "str": 14,
      "dex": 3,
      "con": 20,
      "int": 1,
      "wis": 6,
      "cha": 1
    },
    "conditionImmunities": "Cegado, Hechizado, Ensordecido, Agotamiento, Asustado, Derribado",
    "senses": "Vista ciega 60 pies (ciego más allá), Percepción pasiva 8",
    "languages": "—",
    "cr": "2",
    "xp": 450,
    "traits": [
      {
        "name": "Cubo Transparente",
        "desc": "Incluso a simple vista es difícil de detectar; se requiere una prueba de Sabiduría (Percepción) CD 15 para verlo si no se ha movido ni atacado."
      }
    ],
    "actions": [
      {
        "name": "Pseudópodo",
        "desc": "Ataque cuerpo a cuerpo: +4 al ataque, alcance 5 pies. Impacto: 10 (3d6) de daño de ácido."
      },
      {
        "name": "Engullir (Engulf)",
        "desc": "El cubo se mueve hasta su velocidad y entra en el espacio de criaturas Large o menores. Deben superar una salvación de Destreza CD 12 o sufrir 10 (3d6) de daño de ácido, quedar engullidas dentro del cuerpo del cubo, paralizadas y sujetas a asfixia."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-pudin-negro",
    "name": "Pudín Negro (Black Pudding)",
    "size": "Large",
    "type": "Cieno",
    "alignment": "Sin alineamiento",
    "ac": 7,
    "hp": 85,
    "hitDice": "10d10 + 30",
    "speed": "20 pies, trepar 20 pies",
    "stats": {
      "str": 16,
      "dex": 5,
      "con": 16,
      "int": 1,
      "wis": 6,
      "cha": 1
    },
    "damageImmunities": "Ácido, Frío, Relámpago, Cortante",
    "conditionImmunities": "Cegado, Hechizado, Ensordecido, Agotamiento, Asustado, Derribado",
    "senses": "Vista ciega 60 pies, Percepción pasiva 8",
    "languages": "—",
    "cr": "4",
    "xp": 1100,
    "traits": [
      {
        "name": "Forma Amorfa & Corrosivo",
        "desc": "Puede atravesar rendijas de 1 pulgada. Come metal y madera: armas no mágicas de metal o madera reciben penalizador permanente acumulativo de -1 hasta destruirse."
      },
      {
        "name": "División (Split)",
        "desc": "Si es Medium o mayor y sufre daño cortante o de relámpago, se divide en dos pudines más pequeños con la mitad de PG redondeada hacia abajo."
      }
    ],
    "actions": [
      {
        "name": "Pseudópodo",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 6 (1d6 + 3) contundente más 18 (4d8) de ácido. Si el objetivo viste armadura no mágica, recibe un penalizador permanente de -1 a la CA."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-esqueleto",
    "name": "Esqueleto (Skeleton)",
    "size": "Medium",
    "type": "No-muerto",
    "alignment": "Legal Maligno",
    "ac": 13,
    "acDescription": "restos de armadura",
    "hp": 13,
    "hitDice": "2d8 + 4",
    "speed": "30 pies",
    "stats": {
      "str": 10,
      "dex": 14,
      "con": 15,
      "int": 6,
      "wis": 8,
      "cha": 5
    },
    "damageVulnerabilities": "Contundente",
    "damageImmunities": "Veneno",
    "conditionImmunities": "Envenenado, Agotamiento",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 9",
    "languages": "Comprende idiomas que hablaba en vida",
    "cr": "1/4",
    "xp": 50,
    "actions": [
      {
        "name": "Espada Corta",
        "desc": "Ataque cuerpo a cuerpo: +4 al ataque, alcance 5 pies. Impacto: 5 (1d6 + 2) perforante."
      },
      {
        "name": "Arco Corto",
        "desc": "Ataque a distancia: +4 al ataque, alcance 80/320 pies. Impacto: 5 (1d6 + 2) perforante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-zombi",
    "name": "Zombi (Zombie)",
    "size": "Medium",
    "type": "No-muerto",
    "alignment": "Neutral Maligno",
    "ac": 8,
    "hp": 22,
    "hitDice": "3d8 + 9",
    "speed": "20 pies",
    "stats": {
      "str": 13,
      "dex": 6,
      "con": 16,
      "int": 3,
      "wis": 6,
      "cha": 5
    },
    "saves": "Sab +0",
    "damageImmunities": "Veneno",
    "conditionImmunities": "Envenenado",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 8",
    "languages": "Comprende los idiomas que hablaba en vida",
    "cr": "1/4",
    "xp": 50,
    "traits": [
      {
        "name": "Fortaleza de No-muerto (Undead Fortitude)",
        "desc": "Si el daño reduce al zombi a 0 puntos de golpe, debe realizar una tirada de salvación de Constitución con una CD de 5 + el daño recibido, a menos que el daño sea radiante o procedente de un impacto crítico. Si tiene éxito, en su lugar cae a 1 punto de golpe."
      }
    ],
    "actions": [
      {
        "name": "Golpetazo (Slam)",
        "desc": "Ataque cuerpo a cuerpo: +3 al ataque, alcance 5 pies. Impacto: 4 (1d6 + 1) de daño contundente."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-ghoul",
    "name": "Necrófago (Ghoul)",
    "size": "Medium",
    "type": "No-muerto",
    "alignment": "Caótico Maligno",
    "ac": 12,
    "hp": 22,
    "hitDice": "5d8",
    "speed": "30 pies",
    "stats": {
      "str": 13,
      "dex": 15,
      "con": 10,
      "int": 7,
      "wis": 10,
      "cha": 6
    },
    "damageImmunities": "Veneno",
    "conditionImmunities": "Hechizado, Agotamiento, Envenenado",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 10",
    "languages": "Común",
    "cr": "1",
    "xp": 200,
    "actions": [
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +2 al ataque, alcance 5 pies. Impacto: 9 (2d6 + 2) de daño perforante."
      },
      {
        "name": "Garras Paralizantes",
        "desc": "Ataque cuerpo a cuerpo: +4 al ataque, alcance 5 pies. Impacto: 7 (2d4 + 2) cortante. Si el objetivo no es elfo ni no-muerto, debe superar una salvación de Constitución CD 10 o quedar Paralizado durante 1 minuto."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-fantasma",
    "name": "Fantasma (Ghost)",
    "size": "Medium",
    "type": "No-muerto",
    "alignment": "Cualquier alineamiento",
    "ac": 11,
    "hp": 45,
    "hitDice": "10d8",
    "speed": "0 pies, volar 40 pies (levitación)",
    "stats": {
      "str": 7,
      "dex": 13,
      "con": 10,
      "int": 10,
      "wis": 12,
      "cha": 17
    },
    "damageResistances": "Ácido, Fuego, Relámpago, Trueno; Contundente, perforante y cortante no mágicos",
    "damageImmunities": "Frío, Necrótico, Veneno",
    "conditionImmunities": "Hechizado, Agotamiento, Asustado, Agarrado, Paralizado, Petrificado, Envenenado, Derribado, Restringido",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 11",
    "languages": "Cualquier idioma que hablara en vida",
    "cr": "4",
    "xp": 1100,
    "traits": [
      {
        "name": "Movimiento Etéreo",
        "desc": "Puede moverse a través de otras criaturas y objetos como si fueran terreno difícil. Sufre 5 (1d10) de daño de fuerza si termina su turno dentro de un objeto."
      }
    ],
    "actions": [
      {
        "name": "Mirada Espantosa",
        "desc": "Cada criatura a 60 pies que pueda verlo debe superar Sabiduría CD 13 o quedar Asustada durante 1 minuto. Si falla por 5 o más, envejece 1d4 × 10 años instantáneamente."
      },
      {
        "name": "Toque Marchitador",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 17 (4d6 + 3) de daño necrótico."
      },
      {
        "name": "Posesión (Recarga 6)",
        "desc": "El fantasma intenta poseer el cuerpo de un humanoide a 5 pies. El objetivo debe superar una salvación de Carisma CD 13 o el fantasma toma el control total de su cuerpo."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-momia",
    "name": "Momia (Mummy)",
    "size": "Medium",
    "type": "No-muerto",
    "alignment": "Legal Maligno",
    "ac": 11,
    "acDescription": "armadura natural",
    "hp": 58,
    "hitDice": "8d8 + 24",
    "speed": "20 pies",
    "stats": {
      "str": 16,
      "dex": 8,
      "con": 15,
      "int": 6,
      "wis": 10,
      "cha": 12
    },
    "saves": "Sab +2",
    "damageVulnerabilities": "Fuego",
    "damageImmunities": "Necrótico, Veneno; Contundente, perforante y cortante de armas no mágicas",
    "conditionImmunities": "Hechizado, Agotamiento, Asustado, Paralizado, Envenenado",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 10",
    "languages": "Idiomas que hablaba en vida",
    "cr": "3",
    "xp": 700,
    "actions": [
      {
        "name": "Mirada Aterradora",
        "desc": "Fija su mirada en una criatura a 60 pies. Salvación de Sabiduría CD 11 o queda Paralizada de miedo durante 1 minuto."
      },
      {
        "name": "Golpetazo Podrido",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 10 (2d6 + 3) contundente más 10 (3d6) necrótico. Debe superar Con CD 12 o ser infectada con la Putrefacción de Momia: no puede recuperar PG y su máximo de PG disminuye 10 (3d6) cada 24 horas."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-vampiro",
    "name": "Vampiro (Vampire)",
    "size": "Medium",
    "type": "No-muerto (Metamorfo)",
    "alignment": "Legal Maligno",
    "ac": 16,
    "acDescription": "armadura natural",
    "hp": 144,
    "hitDice": "17d8 + 68",
    "speed": "30 pies",
    "stats": {
      "str": 18,
      "dex": 18,
      "con": 18,
      "int": 17,
      "wis": 15,
      "cha": 18
    },
    "saves": "Des +9, Sab +7, Car +9",
    "skills": "Percepción +7, Sigilo +9",
    "damageResistances": "Necrótico; Contundente, perforante y cortante no mágicos",
    "senses": "Visión en la oscuridad 120 pies, Percepción pasiva 17",
    "languages": "Los idiomas que hablaba en vida",
    "cr": "13",
    "xp": 10000,
    "traits": [
      {
        "name": "Regeneración",
        "desc": "El vampiro recupera 20 puntos de golpe al inicio de su turno si tiene al menos 1 PG y no está bajo la luz del sol o en agua corriente."
      },
      {
        "name": "Resistencia Legendaria (3/Día)",
        "desc": "Puede elegir superar una tirada de salvación fallida."
      },
      {
        "name": "Trepar Cual Araña & Escape Brumoso",
        "desc": "Puede caminar por paredes y techos. Al llegar a 0 PG se transforma en una nube de niebla y huye a su ataúd."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple (Forma Vampírica)",
        "desc": "Realiza dos ataques: uno de mordisco y uno de golpe desarmado."
      },
      {
        "name": "Golpe Desarmado",
        "desc": "Ataque cuerpo a cuerpo: +9 al ataque, alcance 5 pies. Impacto: 8 (1d8 + 4) contundente y el objetivo queda apresado (CD 18 escapar)."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +9 al ataque contra criatura apresada, incapacitada o voluntaria. Impacto: 7 (1d6 + 4) perforante más 10 (3d6) necrótico. El vampiro recupera PG iguales al daño necrótico y el máximo de PG del objetivo se reduce en la misma cantidad."
      },
      {
        "name": "Encanto",
        "desc": "El vampiro fija su mirada en un humanoide a 30 pies. Debe superar Sabiduría CD 17 o quedar Hechizado como amigo de confianza."
      }
    ],
    "legendaryActions": [
      {
        "name": "Moverse (1)",
        "desc": "Se mueve hasta su velocidad sin provocar ataques de oportunidad."
      },
      {
        "name": "Golpe Desarmado (1)",
        "desc": "Realiza un ataque de golpe desarmado."
      },
      {
        "name": "Mordisco (2)",
        "desc": "Realiza un ataque de mordisco."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-lich",
    "name": "Liche (Lich)",
    "size": "Medium",
    "type": "No-muerto",
    "alignment": "Cualquier alineamiento maligno",
    "ac": 17,
    "acDescription": "armadura natural",
    "hp": 135,
    "hitDice": "18d8 + 54",
    "speed": "30 pies",
    "stats": {
      "str": 11,
      "dex": 16,
      "con": 16,
      "int": 20,
      "wis": 14,
      "cha": 16
    },
    "saves": "Con +10, Int +12, Sab +9",
    "skills": "Conocimiento Arcano +19, Historia +12, Intuición +9, Percepción +9",
    "damageResistances": "Frío, Relámpago, Necrótico",
    "damageImmunities": "Veneno; Contundente, perforante y cortante de ataques no mágicos",
    "conditionImmunities": "Hechizado, Agotamiento, Asustado, Paralizado, Envenenado",
    "senses": "Visión en la verdadera 120 pies, Percepción pasiva 19",
    "languages": "Común más hasta otros cinco idiomas",
    "cr": "21",
    "xp": 33000,
    "traits": [
      {
        "name": "Resistencia Legendaria (3/Día)",
        "desc": "El liche puede decidir tener éxito en una salvación que falle."
      },
      {
        "name": "Rejuvenecimiento de Filacteria",
        "desc": "Si tiene una filacteria, el liche destruido gana un cuerpo nuevo en 1d10 días, recuperando todos sus puntos de golpe y reapareciendo junto a su filacteria."
      },
      {
        "name": "Lanzador de Conjuros de Nivel 18",
        "desc": "Int CD 20, +12 al ataque. Conoce conjuros de nivel 1 al 9, incluyendo: rayo desintegrador, globo de invulnerabilidad, dedo de la muerte, palabra de poder mortal (power word kill)."
      }
    ],
    "actions": [
      {
        "name": "Toque Paralizante",
        "desc": "Ataque de conjuro cuerpo a cuerpo: +12 al ataque, alcance 5 pies. Impacto: 10 (3d6) de daño de frío. El objetivo debe superar una salvación de Constitución CD 18 o quedar paralizado durante 1 minuto."
      }
    ],
    "legendaryActions": [
      {
        "name": "Truco (1)",
        "desc": "Lanza un truco."
      },
      {
        "name": "Toque Paralizante (2)",
        "desc": "Utiliza su toque paralizante."
      },
      {
        "name": "Mirada Temible (2)",
        "desc": "Fuerza CD 18 de Sabiduría a una criatura a 30 pies o queda Asustada 1 minuto."
      },
      {
        "name": "Disrupción de Vida (3)",
        "desc": "Criaturas vivas a 20 pies sufren 21 (6d6) de daño necrótico si fallan Constitución CD 18."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-solar",
    "name": "Solar",
    "size": "Large",
    "type": "Celestial",
    "alignment": "Legal Bueno",
    "ac": 21,
    "acDescription": "armadura natural",
    "hp": 243,
    "hitDice": "18d10 + 144",
    "speed": "50 pies, volar 150 pies",
    "stats": {
      "str": 26,
      "dex": 22,
      "con": 26,
      "int": 25,
      "wis": 25,
      "cha": 30
    },
    "saves": "Int +14, Sab +14, Car +17",
    "skills": "Percepción +14",
    "damageResistances": "Radiante; contundente, perforante y cortante de armas no mágicas",
    "damageImmunities": "Necrótico, Veneno",
    "conditionImmunities": "Hechizado, Agotamiento, Asustado, Envenenado",
    "senses": "Visión verdadera 120 pies, Percepción pasiva 24",
    "languages": "Todos, telepatía 120 pies",
    "cr": "21",
    "xp": 33000,
    "traits": [
      {
        "name": "Resistencia Mágica & Armas Angelicales",
        "desc": "Ventaja contra conjuros. Sus ataques con armas son mágicos e infligen 27 (6d8) de daño radiante adicional (incluido)."
      },
      {
        "name": "Resistencia Legendaria (3/Día)",
        "desc": "Puede convertir salvaciones fallidas en éxitos automáticos."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques con su gran espada."
      },
      {
        "name": "Gran Espada Angelical",
        "desc": "Ataque cuerpo a cuerpo: +15 al ataque, alcance 5 pies. Impacto: 22 (4d6 + 8) cortante más 27 (6d8) radiante."
      },
      {
        "name": "Arco Asesino",
        "desc": "Ataque a distancia: +13 al ataque, alcance 150/600 pies. Impacto: 15 (2d8 + 6) perforante más 27 (6d8) radiante. Si el objetivo tiene 100 PG o menos, debe superar Constitución CD 15 o morir al instante."
      },
      {
        "name": "Espada Danzante",
        "desc": "El solar suelta su espada para que levite mágicamente y ataque a 50 pies."
      }
    ],
    "legendaryActions": [
      {
        "name": "Teletransporte (1)",
        "desc": "Se teletransporta hasta a 120 pies a un espacio que pueda ver."
      },
      {
        "name": "Estallido Cegador (2)",
        "desc": "Cada criatura a 10 pies debe superar Constitución CD 20 o quedar Cegada 1 minuto."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-deva",
    "name": "Deva",
    "size": "Medium",
    "type": "Celestial",
    "alignment": "Legal Bueno",
    "ac": 17,
    "acDescription": "armadura natural",
    "hp": 136,
    "hitDice": "16d8 + 64",
    "speed": "30 pies, volar 90 pies",
    "stats": {
      "str": 18,
      "dex": 18,
      "con": 18,
      "int": 17,
      "wis": 20,
      "cha": 20
    },
    "saves": "Sab +9, Car +9",
    "skills": "Intuición +9, Percepción +9",
    "damageResistances": "Radiante; contundente, perforante y cortante de no mágicos",
    "conditionImmunities": "Hechizado, Agotamiento, Asustado",
    "senses": "Visión en la oscuridad 120 pies, Percepción pasiva 19",
    "languages": "Todos, telepatía 120 pies",
    "cr": "10",
    "xp": 5900,
    "traits": [
      {
        "name": "Armas Angelicales",
        "desc": "Sus ataques con armas infligen 18 (4d8) de daño radiante adicional."
      },
      {
        "name": "Resistencia Mágica",
        "desc": "Ventaja en salvaciones contra conjuros y otros efectos mágicos."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques cuerpo a cuerpo con su maza."
      },
      {
        "name": "Maza Bendita",
        "desc": "Ataque cuerpo a cuerpo: +8 al ataque, alcance 5 pies. Impacto: 7 (1d6 + 4) contundente más 18 (4d8) radiante."
      },
      {
        "name": "Toque Sanador (3/Día)",
        "desc": "Toca a otra criatura. El objetivo recupera mágicamente 20 (4d8 + 2) puntos de golpe y se libera de maldiciones, enfermedades, veneno, ceguera o sordera."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-unicornio",
    "name": "Unicornio (Unicorn)",
    "size": "Large",
    "type": "Celestial",
    "alignment": "Legal Bueno",
    "ac": 12,
    "hp": 67,
    "hitDice": "9d10 + 18",
    "speed": "50 pies",
    "stats": {
      "str": 18,
      "dex": 14,
      "con": 15,
      "int": 11,
      "wis": 17,
      "cha": 16
    },
    "damageImmunities": "Veneno",
    "conditionImmunities": "Hechizado, Paralizado, Envenenado",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 13",
    "languages": "Celestial, Elfo, Silvano, telepatía 60 pies",
    "cr": "5",
    "xp": 1800,
    "traits": [
      {
        "name": "Carga con Cuerno",
        "desc": "Si se mueve 20 pies en línea recta hacia un objetivo y le impacta con el cuerno, inflige 9 (2d8) perforante extra y derriba con Fuerza CD 15."
      },
      {
        "name": "Resistencia Mágica & Armas Mágicas",
        "desc": "Ventaja contra conjuros. Sus ataques son mágicos."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza un ataque de cascos y uno de cuerno."
      },
      {
        "name": "Cascos",
        "desc": "Ataque cuerpo a cuerpo: +7 al ataque, alcance 5 pies. Impacto: 11 (2d6 + 4) contundente."
      },
      {
        "name": "Cuerno",
        "desc": "Ataque cuerpo a cuerpo: +7 al ataque, alcance 5 pies. Impacto: 8 (1d8 + 4) perforante."
      },
      {
        "name": "Toque Sanador (3/Día)",
        "desc": "Toca a una criatura sanando 11 (2d8 + 2) PG y curando veneno y enfermedades."
      }
    ],
    "legendaryActions": [
      {
        "name": "Cascos (1)",
        "desc": "Realiza un ataque de cascos."
      },
      {
        "name": "Escudo Reluciente (2)",
        "desc": "Otorga +2 a la CA a sí mismo o a un aliado a 60 pies."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-pegaso",
    "name": "Pegaso (Pegasus)",
    "size": "Large",
    "type": "Celestial",
    "alignment": "Caótico Bueno",
    "ac": 12,
    "hp": 59,
    "hitDice": "7d10 + 21",
    "speed": "60 pies, volar 90 pies",
    "stats": {
      "str": 18,
      "dex": 15,
      "con": 16,
      "int": 10,
      "wis": 15,
      "cha": 13
    },
    "saves": "Des +4, Con +5, Sab +4, Car +3",
    "skills": "Percepción +6",
    "senses": "Percepción pasiva 16",
    "languages": "Comprende Celestial, Común, Elfo y Silvano pero no habla",
    "cr": "2",
    "xp": 450,
    "actions": [
      {
        "name": "Cascos",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 5 pies. Impacto: 11 (2d6 + 4) contundente."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-couatl",
    "name": "Couatl",
    "size": "Medium",
    "type": "Celestial",
    "alignment": "Legal Bueno",
    "ac": 19,
    "acDescription": "armadura natural",
    "hp": 97,
    "hitDice": "13d8 + 39",
    "speed": "30 pies, volar 90 pies",
    "stats": {
      "str": 16,
      "dex": 20,
      "con": 17,
      "int": 18,
      "wis": 20,
      "cha": 18
    },
    "saves": "Con +5, Sab +7, Car +6",
    "damageResistances": "Radiante; contundente, perforante y cortante de armas no mágicas",
    "damageImmunities": "Psíquico",
    "senses": "Visión verdadera 120 pies, Percepción pasiva 15",
    "languages": "Todos, telepatía 120 pies",
    "cr": "4",
    "xp": 1100,
    "traits": [
      {
        "name": "Resistencia Mágica",
        "desc": "Ventaja en salvaciones contra conjuros."
      },
      {
        "name": "Lanzamiento de Conjuros Innato",
        "desc": "A voluntad: detectar el mal y el bien, santuario. 3/día: restaurar menor, bendición. 1/día: restauración mayor, escudriñar."
      }
    ],
    "actions": [
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +8 al ataque, alcance 5 pies. Impacto: 8 (1d6 + 5) perforante más salvación Con CD 13 o caer inconsciente durante 24 horas."
      },
      {
        "name": "Constricción",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 10 pies. Impacto: 10 (2d6 + 3) contundente y el objetivo queda apresado (CD 15)."
      },
      {
        "name": "Cambio de Forma",
        "desc": "Se transforma mágicamente en un humanoide o bestia de CR igual o menor."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-pixie",
    "name": "Pixie (Hada)",
    "size": "Tiny",
    "type": "Feérico",
    "alignment": "Neutral Bueno",
    "ac": 15,
    "hp": 1,
    "hitDice": "1d4 - 1",
    "speed": "10 pies, volar 30 pies",
    "stats": {
      "str": 2,
      "dex": 20,
      "con": 8,
      "int": 10,
      "wis": 14,
      "cha": 15
    },
    "skills": "Percepción +4, Sigilo +7",
    "senses": "Percepción pasiva 14",
    "languages": "Silvano",
    "cr": "1/4",
    "xp": 50,
    "traits": [
      {
        "name": "Resistencia Mágica",
        "desc": "Ventaja contra conjuros."
      },
      {
        "name": "Magia Innata de Pixie",
        "desc": "Carisma CD 12. A voluntad: luces danzantes. 1/día cada uno: confusión, detectar pensamientos, disipar magia, volar, imagen mayor, invisibilidad, metamorfosis, dormir."
      }
    ],
    "actions": [
      {
        "name": "Invisibilidad Superior",
        "desc": "El pixie se vuelve invisible mágicamente hasta que se desconcentre."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-driade",
    "name": "Dríade (Dryad)",
    "size": "Medium",
    "type": "Feérico",
    "alignment": "Neutral",
    "ac": 11,
    "acDescription": "16 con piel robliza",
    "hp": 22,
    "hitDice": "5d8",
    "speed": "30 pies",
    "stats": {
      "str": 10,
      "dex": 12,
      "con": 11,
      "int": 14,
      "wis": 15,
      "cha": 18
    },
    "skills": "Percepción +4, Sigilo +5",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 14",
    "languages": "Élfico, Silvano",
    "cr": "1",
    "xp": 200,
    "traits": [
      {
        "name": "Zancada Arbórea",
        "desc": "Una vez por turno, la dríade puede usar 10 pies de movimiento para entrar en un árbol vivo y salir de otro árbol a 60 pies."
      },
      {
        "name": "Lanzamiento de Conjuros Innato",
        "desc": "Carisma CD 14. A voluntad: garrote del druida. 3/día cada uno: enmarañar, buenas bayas. 1/día cada uno: piel robliza, pasar sin dejar rastro."
      }
    ],
    "actions": [
      {
        "name": "Garrote del Bosque",
        "desc": "Ataque cuerpo a cuerpo: +2 (+6 con garrote del druida), alcance 5 pies. Impacto: 2 (1d4) o 8 (1d8 + 4) contundente."
      },
      {
        "name": "Fascinación Feérica (3/Día)",
        "desc": "Humanoide o bestia a 30 pies debe superar Sabiduría CD 14 o quedar hechizado por la dríade durante 24 horas."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-bruja-verde",
    "name": "Bruja Verde (Green Hag)",
    "size": "Medium",
    "type": "Feérico",
    "alignment": "Neutral Maligno",
    "ac": 17,
    "acDescription": "armadura natural",
    "hp": 82,
    "hitDice": "11d8 + 33",
    "speed": "30 pies, nadar 40 pies",
    "stats": {
      "str": 18,
      "dex": 12,
      "con": 16,
      "int": 13,
      "wis": 14,
      "cha": 14
    },
    "skills": "Conocimiento Arcano +3, Engaño +4, Percepción +4, Sigilo +3",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 14",
    "languages": "Común, Dracónico, Silvano",
    "cr": "3",
    "xp": 700,
    "traits": [
      {
        "name": "Anfibio",
        "desc": "Respira aire y agua."
      },
      {
        "name": "Lanzamiento de Conjuros Innato",
        "desc": "A voluntad: luces danzantes, sonido ilusorio, burla dañina."
      }
    ],
    "actions": [
      {
        "name": "Garras",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 5 pies. Impacto: 13 (2d8 + 4) cortante."
      },
      {
        "name": "Pasaje Invisible",
        "desc": "La bruja se vuelve invisible mágicamente hasta que ataca, lanza un conjuro o termina la duración."
      },
      {
        "name": "Disfraz Ilusorio",
        "desc": "Se cubre con una ilusión para parecer una criatura humanoide de estatura similar."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-glabrezu",
    "name": "Glabrezu",
    "size": "Large",
    "type": "Infernal (Demonio)",
    "alignment": "Caótico Maligno",
    "ac": 17,
    "acDescription": "armadura natural",
    "hp": 157,
    "hitDice": "15d10 + 75",
    "speed": "40 pies",
    "stats": {
      "str": 20,
      "dex": 15,
      "con": 21,
      "int": 19,
      "wis": 17,
      "cha": 16
    },
    "saves": "Fue +9, Con +9, Sab +7, Car +7",
    "damageResistances": "Frío, Fuego, Relámpago; contundente, perforante y cortante no mágicos",
    "damageImmunities": "Veneno",
    "conditionImmunities": "Envenenado",
    "senses": "Visión verdadera 120 pies, Percepción pasiva 13",
    "languages": "Abisal, telepatía 120 pies",
    "cr": "9",
    "xp": 5000,
    "traits": [
      {
        "name": "Lanzamiento de Conjuros Innato",
        "desc": "Int CD 16. A voluntad: oscuridad, detectar magia, disipar magia. 1/día cada uno: confusión, volar, palabra de poder aturdidor."
      },
      {
        "name": "Resistencia Mágica",
        "desc": "Ventaja en salvaciones contra conjuros."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza cuatro ataques: dos con sus pinzas y dos con sus puños, o dos con pinzas y un conjuro."
      },
      {
        "name": "Pinzas Colosales",
        "desc": "Ataque cuerpo a cuerpo: +9 al ataque, alcance 10 pies. Impacto: 16 (2d10 + 5) contundente y el objetivo queda apresado (CD 15)."
      },
      {
        "name": "Puño",
        "desc": "Ataque cuerpo a cuerpo: +9 al ataque, alcance 5 pies. Impacto: 7 (2d4 + 2) contundente."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-vrock",
    "name": "Vrock",
    "size": "Large",
    "type": "Infernal (Demonio)",
    "alignment": "Caótico Maligno",
    "ac": 15,
    "acDescription": "armadura natural",
    "hp": 104,
    "hitDice": "11d10 + 44",
    "speed": "40 pies, volar 60 pies",
    "stats": {
      "str": 19,
      "dex": 15,
      "con": 18,
      "int": 8,
      "wis": 13,
      "cha": 8
    },
    "saves": "Des +5, Sab +4, Car +2",
    "damageResistances": "Frío, Fuego, Relámpago; no mágico contundente, perforante y cortante",
    "damageImmunities": "Veneno",
    "conditionImmunities": "Envenenado",
    "senses": "Visión en la oscuridad 120 pies, Percepción pasiva 11",
    "languages": "Abisal, telepatía 120 pies",
    "cr": "6",
    "xp": 2300,
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques: uno con su pico y otro con sus garras."
      },
      {
        "name": "Pico",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 5 pies. Impacto: 10 (2d6 + 3) perforante."
      },
      {
        "name": "Garras",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 5 pies. Impacto: 14 (2d10 + 3) cortante."
      },
      {
        "name": "Esporas Venenosas (Recarga 6)",
        "desc": "Libera esporas tóxicas a 15 pies. Constitución CD 14 o sufrir 5 (1d10) veneno por turno hasta curarse."
      },
      {
        "name": "Graznido Desconcertante (1/Día)",
        "desc": "Emite un chillido horrendo. Cada criatura a 20 pies debe superar Constitución CD 14 o quedar aturdida hasta el final de su siguiente turno."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-marilith",
    "name": "Marilith",
    "size": "Large",
    "type": "Infernal (Demonio)",
    "alignment": "Caótico Maligno",
    "ac": 18,
    "acDescription": "armadura natural",
    "hp": 189,
    "hitDice": "18d10 + 90",
    "speed": "40 pies",
    "stats": {
      "str": 18,
      "dex": 20,
      "con": 20,
      "int": 18,
      "wis": 16,
      "cha": 20
    },
    "saves": "Fue +9, Con +10, Sab +8, Car +10",
    "damageResistances": "Frío, Fuego, Relámpago; contundente, perforante y cortante no mágicos",
    "damageImmunities": "Veneno",
    "conditionImmunities": "Envenenado",
    "senses": "Visión verdadera 120 pies, Percepción pasiva 13",
    "languages": "Abisal, telepatía 120 pies",
    "cr": "16",
    "xp": 15000,
    "traits": [
      {
        "name": "Reacción Reactiva",
        "desc": "La marilith puede realizar una reacción en cada turno del combate."
      },
      {
        "name": "Resistencia Mágica & Armas Mágicas",
        "desc": "Ventaja en salvaciones contra magia. Sus armas son mágicas."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza siete ataques: seis con sus espadas largas y uno con su cola de serpiente."
      },
      {
        "name": "Espadas Largas (x6)",
        "desc": "Ataques cuerpo a cuerpo: +9 al ataque, alcance 5 pies. Impacto: 13 (2d8 + 4) cortante por espada."
      },
      {
        "name": "Cola Constrictora",
        "desc": "Ataque cuerpo a cuerpo: +9 al ataque, alcance 10 pies. Impacto: 15 (2d10 + 4) contundente y el objetivo queda apresado (CD 19)."
      },
      {
        "name": "Teletransporte",
        "desc": "Se teletransporta mágicamente hasta a 120 pies."
      }
    ],
    "reactions": [
      {
        "name": "Parada Maestra",
        "desc": "Añade 5 a su CA contra un ataque cuerpo a cuerpo que fuera a impactarle."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-diablo-oseo",
    "name": "Diablo Óseo (Bone Devil)",
    "size": "Large",
    "type": "Infernal (Diablo)",
    "alignment": "Legal Maligno",
    "ac": 16,
    "acDescription": "armadura natural",
    "hp": 142,
    "hitDice": "15d10 + 60",
    "speed": "40 pies, volar 40 pies",
    "stats": {
      "str": 18,
      "dex": 16,
      "con": 18,
      "int": 13,
      "wis": 14,
      "cha": 16
    },
    "saves": "Int +5, Sab +6, Car +7",
    "damageResistances": "Frío; armas no mágicas ni plateadas",
    "damageImmunities": "Fuego, Veneno",
    "conditionImmunities": "Envenenado",
    "senses": "Visión en la oscuridad 120 pies (mágica), Percepción pasiva 12",
    "languages": "Infernal, telepatía 120 pies",
    "cr": "9",
    "xp": 5000,
    "traits": [
      {
        "name": "Vista del Diablo",
        "desc": "La oscuridad mágica no afecta su visión."
      },
      {
        "name": "Resistencia Mágica",
        "desc": "Ventaja en salvaciones contra conjuros."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza tres ataques: dos con sus garras y uno con su aguijón mortal."
      },
      {
        "name": "Garras",
        "desc": "Ataque cuerpo a cuerpo: +8 al ataque, alcance 10 pies. Impacto: 8 (1d8 + 4) cortante."
      },
      {
        "name": "Aguijón",
        "desc": "Ataque cuerpo a cuerpo: +8 al ataque, alcance 10 pies. Impacto: 13 (2d8 + 4) perforante más 17 (5d6) de veneno (salvación Con CD 14 o envenenado 1 minuto)."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-diablo-cornudo",
    "name": "Diablo Cornudo (Horned Devil)",
    "size": "Large",
    "type": "Infernal (Diablo)",
    "alignment": "Legal Maligno",
    "ac": 18,
    "acDescription": "armadura natural",
    "hp": 178,
    "hitDice": "17d10 + 85",
    "speed": "20 pies, volar 60 pies",
    "stats": {
      "str": 22,
      "dex": 17,
      "con": 21,
      "int": 12,
      "wis": 16,
      "cha": 17
    },
    "saves": "Fue +10, Des +7, Sab +7, Car +7",
    "damageResistances": "Frío; no mágico ni plateado",
    "damageImmunities": "Fuego, Veneno",
    "conditionImmunities": "Envenenado",
    "senses": "Visión en la oscuridad 120 pies (mágica), Percepción pasiva 13",
    "languages": "Infernal, telepatía 120 pies",
    "cr": "11",
    "xp": 7200,
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza tres ataques de cuerpo a cuerpo: dos con tridente o garras y uno con cola."
      },
      {
        "name": "Tridente Infernal",
        "desc": "Ataque cuerpo a cuerpo: +10 al ataque, alcance 10 pies. Impacto: 15 (2d8 + 6) perforante más 5 (1d10) fuego."
      },
      {
        "name": "Cola con Herida Sangrante",
        "desc": "Ataque cuerpo a cuerpo: +10 al ataque, alcance 10 pies. Impacto: 10 (1d8 + 6) perforante y el objetivo sufre 10 (3d6) de daño al inicio de cada turno por pérdida de sangre hasta superar Con CD 17."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-caballero-muerte",
    "name": "Caballero de la Muerte (Death Knight)",
    "size": "Medium",
    "type": "No-muerto",
    "alignment": "Caótico Maligno",
    "ac": 20,
    "acDescription": "armadura de placas y escudo",
    "hp": 180,
    "hitDice": "19d8 + 95",
    "speed": "30 pies",
    "stats": {
      "str": 20,
      "dex": 11,
      "con": 20,
      "int": 12,
      "wis": 16,
      "cha": 18
    },
    "saves": "Des +5, Sab +8, Car +9",
    "damageImmunities": "Necrótico, Veneno",
    "conditionImmunities": "Agotamiento, Asustado, Envenenado",
    "senses": "Visión en la oscuridad 120 pies, Percepción pasiva 13",
    "languages": "Abisal, Común",
    "cr": "17",
    "xp": 18000,
    "traits": [
      {
        "name": "Resistencia Legendaria (3/Día)",
        "desc": "Supera automáticamente tiradas de salvación fallidas."
      },
      {
        "name": "Aura Marcial de No-muertos",
        "desc": "Cualquier no-muerto o infernal a 60 pies tiene ventaja en tiradas de salvación contra expulsar no-muertos."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza tres ataques con su espada larga profana."
      },
      {
        "name": "Espada Larga Maldita",
        "desc": "Ataque cuerpo a cuerpo: +11 al ataque, alcance 5 pies. Impacto: 9 (1d8 + 5) cortante más 18 (4d8) de daño necrótico."
      },
      {
        "name": "Orbe de Fuego Infernal (1/Día)",
        "desc": "Lanza una esfera de fuego mágico a 120 pies. Explosión de 20 pies de radio. Destreza CD 18 o sufrir 35 (10d6) fuego y 35 (10d6) necrótico."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-wraith",
    "name": "Espectro de la Noche (Wraith)",
    "size": "Medium",
    "type": "No-muerto",
    "alignment": "Neutral Maligno",
    "ac": 13,
    "hp": 67,
    "hitDice": "9d8 + 27",
    "speed": "0 pies, volar 60 pies (levitación)",
    "stats": {
      "str": 6,
      "dex": 16,
      "con": 16,
      "int": 12,
      "wis": 14,
      "cha": 15
    },
    "damageResistances": "Ácido, Frío, Fuego, Relámpago, Trueno; armas no mágicas",
    "damageImmunities": "Necrótico, Veneno",
    "conditionImmunities": "Hechizado, Agotamiento, Agarrado, Paralizado, Petrificado, Envenenado, Derribado, Restringido",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 12",
    "languages": "Los que hablaba en vida",
    "cr": "5",
    "xp": 1800,
    "traits": [
      {
        "name": "Movimiento Incorpóreo",
        "desc": "Puede atravesar criaturas y objetos sólidos como terreno difícil."
      },
      {
        "name": "Sensibilidad a la Luz Solar",
        "desc": "Desventaja en ataques bajo luz solar."
      }
    ],
    "actions": [
      {
        "name": "Drenaje de Vida",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 5 pies. Impacto: 21 (4d8 + 3) necrótico. Constitución CD 14 o su máximo de PG se reduce en la misma cantidad. Si un humanoide muere por esto, se levanta como un espectro bajo su control en 1d4 asaltos."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-banshee",
    "name": "Banshee",
    "size": "Medium",
    "type": "No-muerto",
    "alignment": "Caótico Maligno",
    "ac": 12,
    "hp": 58,
    "hitDice": "13d8",
    "speed": "0 pies, volar 40 pies (levitación)",
    "stats": {
      "str": 1,
      "dex": 14,
      "con": 10,
      "int": 12,
      "wis": 11,
      "cha": 17
    },
    "damageResistances": "Ácido, Fuego, Relámpago, Trueno; no mágicos",
    "damageImmunities": "Frío, Necrótico, Veneno",
    "conditionImmunities": "Hechizado, Agotamiento, Asustado, Agarrado, Paralizado, Petrificado, Envenenado, Derribado",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 10",
    "languages": "Común, Élfico",
    "cr": "4",
    "xp": 1100,
    "traits": [
      {
        "name": "Detectar Vida",
        "desc": "Siente mágicamente la dirección de cualquier criatura viva a menos de 5 millas."
      }
    ],
    "actions": [
      {
        "name": "Toque Corruptor",
        "desc": "Ataque cuerpo a cuerpo: +4 al ataque, alcance 5 pies. Impacto: 12 (3d6 + 2) necrótico."
      },
      {
        "name": "Lamento Terrible (1/Día)",
        "desc": "Libera un gemido desgarrador. Cualquier criatura a 30 pies que lo escuche debe superar Constitución CD 13 o caer inmediatamente a 0 puntos de golpe. Si tiene éxito, sufre 10 (3d6) de daño psíquico."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-engendro-vampirico",
    "name": "Engendro Vampírico (Vampire Spawn)",
    "size": "Medium",
    "type": "No-muerto",
    "alignment": "Neutral Maligno",
    "ac": 15,
    "acDescription": "armadura natural",
    "hp": 82,
    "hitDice": "11d8 + 33",
    "speed": "30 pies",
    "stats": {
      "str": 16,
      "dex": 16,
      "con": 16,
      "int": 11,
      "wis": 10,
      "cha": 12
    },
    "saves": "Des +6, Sab +3",
    "skills": "Percepción +3, Sigilo +6",
    "damageResistances": "Necrótico; contundente, perforante y cortante de no mágicos",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 13",
    "languages": "Los que hablaba en vida",
    "cr": "5",
    "xp": 1800,
    "traits": [
      {
        "name": "Regeneración",
        "desc": "Recupera 10 puntos de golpe al inicio de su turno si no está bajo luz del sol ni en agua corriente."
      },
      {
        "name": "Trepar Cual Araña",
        "desc": "Puede trepar por superficies verticales y techos."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques: uno con garras y uno de mordisco si tiene al objetivo agarrado."
      },
      {
        "name": "Garras",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 5 pies. Impacto: 8 (2d4 + 3) cortante y agarra al objetivo (CD 13)."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque contra un objetivo agarrado o incapacitado. Impacto: 6 (1d6 + 3) perforante más 7 (2d6) necrótico; el engendro recupera esa cantidad de PG."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-manticora",
    "name": "Mantícora (Manticore)",
    "size": "Large",
    "type": "Monstruosidad",
    "alignment": "Legal Maligno",
    "ac": 14,
    "acDescription": "armadura natural",
    "hp": 68,
    "hitDice": "8d10 + 24",
    "speed": "30 pies, volar 50 pies",
    "stats": {
      "str": 17,
      "dex": 16,
      "con": 17,
      "int": 7,
      "wis": 12,
      "cha": 8
    },
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 11",
    "languages": "Común",
    "cr": "3",
    "xp": 700,
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza tres ataques: mordisco y dos garras, o tres púas de la cola."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 7 (1d8 + 3) perforante."
      },
      {
        "name": "Garras",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 6 (1d6 + 3) cortante."
      },
      {
        "name": "Púas de la Cola",
        "desc": "Ataque a distancia: +5 al ataque, alcance 100/200 pies. Impacto: 7 (1d8 + 3) perforante (tiene 24 púas)."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-minotauro",
    "name": "Minotauro (Minotaur)",
    "size": "Large",
    "type": "Monstruosidad",
    "alignment": "Caótico Maligno",
    "ac": 14,
    "acDescription": "armadura natural",
    "hp": 76,
    "hitDice": "9d10 + 27",
    "speed": "40 pies",
    "stats": {
      "str": 18,
      "dex": 11,
      "con": 16,
      "int": 6,
      "wis": 16,
      "cha": 9
    },
    "skills": "Percepción +7",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 17",
    "languages": "Abisal",
    "cr": "3",
    "xp": 700,
    "traits": [
      {
        "name": "Embestida con Cuernos",
        "desc": "Si se mueve 10 pies hacia un objetivo y le impacta con los cuernos, inflige 9 (2d8) perforante adicional y derriba con Fuerza CD 14."
      },
      {
        "name": "Sentido Laberíntico",
        "desc": "Recuerda perfectamente cualquier camino que haya recorrido y no puede perderse."
      }
    ],
    "actions": [
      {
        "name": "Gran Hacha",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 5 pies. Impacto: 17 (2d12 + 4) cortante."
      },
      {
        "name": "Cornada",
        "desc": "Ataque cuerpo a cuerpo: +6 al ataque, alcance 5 pies. Impacto: 13 (2d8 + 4) perforante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-kraken",
    "name": "Kraken",
    "size": "Gargantuan",
    "type": "Monstruosidad (Titán)",
    "alignment": "Caótico Maligno",
    "ac": 18,
    "acDescription": "armadura natural",
    "hp": 472,
    "hitDice": "27d20 + 189",
    "speed": "20 pies, nadar 60 pies",
    "stats": {
      "str": 30,
      "dex": 11,
      "con": 25,
      "int": 22,
      "wis": 18,
      "cha": 20
    },
    "saves": "Fue +17, Des +7, Con +14, Int +13, Sab +11",
    "damageImmunities": "Relámpago; no mágicos contundente, perforante y cortante",
    "conditionImmunities": "Asustado, Paralizado",
    "senses": "Vista ciega 120 pies, Percepción pasiva 14",
    "languages": "Abisal, Celestial, Infernal, Primordial, telepatía 120 pies",
    "cr": "23",
    "xp": 50000,
    "traits": [
      {
        "name": "Anfibio & Monstruo de Asedio",
        "desc": "Respira aire y agua. Inflige doble daño a estructuras."
      },
      {
        "name": "Resistencia Legendaria (3/Día)",
        "desc": "Convierte tiradas de salvación fallidas en éxitos."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza tres ataques de tentáculo. Puede sustituir un ataque por lanzar una criatura."
      },
      {
        "name": "Tentáculo Gigante",
        "desc": "Ataque cuerpo a cuerpo: +17 al ataque, alcance 30 pies. Impacto: 20 (3d6 + 10) contundente y el objetivo queda apresado (CD 20)."
      },
      {
        "name": "Mordisco Colosal",
        "desc": "Ataque cuerpo a cuerpo: +17 al ataque, alcance 5 pies. Impacto: 23 (3d8 + 10) perforante y traga a un objetivo apresado."
      },
      {
        "name": "Tormenta de Relámpagos",
        "desc": "Genera 3 rayos mágicos contra criaturas a 120 pies. Destreza CD 23 o 22 (4d10) relámpago cada uno."
      }
    ],
    "legendaryActions": [
      {
        "name": "Ataque de Tentáculo (1)",
        "desc": "Realiza un ataque de tentáculo."
      },
      {
        "name": "Nube de Tinta (3)",
        "desc": "Expulsa una nube de tinta bajo el agua en 60 pies y se mueve hasta su velocidad de nado."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-behir",
    "name": "Behir",
    "size": "Huge",
    "type": "Monstruosidad",
    "alignment": "Neutral Maligno",
    "ac": 17,
    "acDescription": "armadura natural",
    "hp": 168,
    "hitDice": "16d12 + 64",
    "speed": "50 pies, trepar 40 pies",
    "stats": {
      "str": 23,
      "dex": 16,
      "con": 18,
      "int": 7,
      "wis": 14,
      "cha": 12
    },
    "skills": "Percepción +6, Sigilo +7",
    "damageImmunities": "Relámpago",
    "senses": "Visión en la oscuridad 90 pies, Percepción pasiva 16",
    "languages": "Dracónico",
    "cr": "11",
    "xp": 7200,
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques: uno de mordisco y uno de constricción."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +10 al ataque, alcance 10 pies. Impacto: 22 (3d10 + 6) perforante."
      },
      {
        "name": "Constricción",
        "desc": "Ataque cuerpo a cuerpo: +10 al ataque, alcance 5 pies. Impacto: 17 (2d10 + 6) contundente y el objetivo queda apresado (CD 16)."
      },
      {
        "name": "Aliento de Relámpago (Recarga 5-6)",
        "desc": "Línea de 20 pies por 5 pies de ancho. Destreza CD 16 o sufrir 66 (12d10) de daño de relámpago."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-bulette",
    "name": "Bulette (Tiburón de Tierra)",
    "size": "Large",
    "type": "Monstruosidad",
    "alignment": "Sin alineamiento",
    "ac": 17,
    "acDescription": "armadura natural",
    "hp": 94,
    "hitDice": "9d10 + 45",
    "speed": "40 pies, excavar 40 pies",
    "stats": {
      "str": 19,
      "dex": 11,
      "con": 21,
      "int": 2,
      "wis": 10,
      "cha": 5
    },
    "skills": "Percepción +6",
    "senses": "Visión en la oscuridad 60 pies, Sentido sísmico 60 pies, Percepción pasiva 16",
    "languages": "—",
    "cr": "5",
    "xp": 1800,
    "traits": [
      {
        "name": "Salto Colosal",
        "desc": "Puede saltar hasta 30 pies de longitud y 15 pies de altura desde parado."
      }
    ],
    "actions": [
      {
        "name": "Mordisco Triturador",
        "desc": "Ataque cuerpo a cuerpo: +7 al ataque, alcance 5 pies. Impacto: 30 (4d12 + 4) perforante."
      },
      {
        "name": "Salto Mortal",
        "desc": "Salta sobre un espacio con criaturas. Fuerza o Destreza CD 16 o sufrir 14 (3d6 + 4) contundente más 14 (3d6 + 4) cortante y caer derribado."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-remorhaz",
    "name": "Remorhaz",
    "size": "Huge",
    "type": "Monstruosidad",
    "alignment": "Sin alineamiento",
    "ac": 17,
    "acDescription": "armadura natural",
    "hp": 195,
    "hitDice": "17d12 + 85",
    "speed": "30 pies, excavar 20 pies",
    "stats": {
      "str": 24,
      "dex": 13,
      "con": 21,
      "int": 4,
      "wis": 10,
      "cha": 5
    },
    "damageImmunities": "Frío, Fuego",
    "senses": "Visión en la oscuridad 60 pies, Sentido sísmico 60 pies, Percepción pasiva 10",
    "languages": "—",
    "cr": "11",
    "xp": 7200,
    "traits": [
      {
        "name": "Cuerpo Ardiente",
        "desc": "Cualquier criatura que lo toque o lo golpee a 5 pies sufre 10 (3d6) de daño de fuego."
      }
    ],
    "actions": [
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +11 al ataque, alcance 10 pies. Impacto: 40 (6d10 + 7) perforante más 10 (3d6) de fuego. Si el objetivo es Large o menor, queda apresado y puede ser tragado."
      },
      {
        "name": "Tragar",
        "desc": "Se traga a una criatura apresada. Sufre 21 (6d6) de ácido y 21 (6d6) de fuego al inicio de cada turno del remorhaz."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-gorgona",
    "name": "Gorgona (Gorgon)",
    "size": "Large",
    "type": "Monstruosidad",
    "alignment": "Sin alineamiento",
    "ac": 19,
    "acDescription": "placas de hierro natural",
    "hp": 114,
    "hitDice": "12d10 + 48",
    "speed": "40 pies",
    "stats": {
      "str": 20,
      "dex": 11,
      "con": 18,
      "int": 2,
      "wis": 12,
      "cha": 7
    },
    "skills": "Percepción +4",
    "conditionImmunities": "Petrificado",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 14",
    "languages": "—",
    "cr": "5",
    "xp": 1800,
    "traits": [
      {
        "name": "Embestida Arrolladora",
        "desc": "Si se mueve 20 pies en línea recta e impacta con sus cuernos, inflige 9 (2d8) perforante adicional y derriba con Fuerza CD 16."
      }
    ],
    "actions": [
      {
        "name": "Cornada",
        "desc": "Ataque cuerpo a cuerpo: +8 al ataque, alcance 5 pies. Impacto: 18 (2d12 + 5) perforante."
      },
      {
        "name": "Aliento Petrificante (Recarga 5-6)",
        "desc": "Exhala gas petrificante en un cono de 30 pies. Constitución CD 13 o comenzar a petrificarse; si vuelve a fallar queda Petrificado permanentemente."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-gelatina-ocre",
    "name": "Gelatina Ocre (Ochre Jelly)",
    "size": "Large",
    "type": "Cieno",
    "alignment": "Sin alineamiento",
    "ac": 8,
    "hp": 45,
    "hitDice": "6d10 + 12",
    "speed": "10 pies, trepar 10 pies",
    "stats": {
      "str": 15,
      "dex": 6,
      "con": 14,
      "int": 2,
      "wis": 6,
      "cha": 1
    },
    "damageResistances": "Ácido",
    "damageImmunities": "Relámpago, Cortante",
    "conditionImmunities": "Cegado, Hechizado, Ensordecido, Agotamiento, Asustado, Derribado",
    "senses": "Vista ciega 60 pies, Percepción pasiva 8",
    "languages": "—",
    "cr": "2",
    "xp": 450,
    "traits": [
      {
        "name": "División (Split)",
        "desc": "Si sufre daño cortante o de relámpago y tiene 10 o más PG, se divide en dos gelatinas Medium con la mitad de PG."
      },
      {
        "name": "Trepar Cual Araña & Amorfo",
        "desc": "Pasa por rendijas de 1 pulgada sin apretarse."
      }
    ],
    "actions": [
      {
        "name": "Pseudópodo",
        "desc": "Ataque cuerpo a cuerpo: +4 al ataque, alcance 5 pies. Impacto: 9 (2d6 + 2) contundente más 3 (1d6) de ácido."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-shambling-mound",
    "name": "Montón Ceniciento (Shambling Mound)",
    "size": "Large",
    "type": "Planta",
    "alignment": "Sin alineamiento",
    "ac": 15,
    "acDescription": "armadura natural",
    "hp": 136,
    "hitDice": "16d10 + 48",
    "speed": "20 pies, nadar 20 pies",
    "stats": {
      "str": 18,
      "dex": 8,
      "con": 16,
      "int": 5,
      "wis": 10,
      "cha": 5
    },
    "skills": "Sigilo +2",
    "damageResistances": "Frío, Fuego",
    "damageImmunities": "Relámpago",
    "conditionImmunities": "Cegado, Ensordecido, Agotamiento",
    "senses": "Vista ciega 60 pies, Percepción pasiva 10",
    "languages": "—",
    "cr": "5",
    "xp": 1800,
    "traits": [
      {
        "name": "Absorción de Relámpago",
        "desc": "El daño de relámpago lo sana en lugar de dañarlo."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques de azote. Si ambos impactan a un objetivo Medium o menor, queda engullido."
      },
      {
        "name": "Azote",
        "desc": "Ataque cuerpo a cuerpo: +7 al ataque, alcance 5 pies. Impacto: 13 (2d8 + 4) contundente."
      },
      {
        "name": "Engullir",
        "desc": "Un objetivo engullido queda cegado, restringido e incapaz de respirar, y sufre 13 (2d8 + 4) contundente al inicio de cada turno del montón."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-treant",
    "name": "Treant (Ent)",
    "size": "Huge",
    "type": "Planta",
    "alignment": "Caótico Bueno",
    "ac": 16,
    "acDescription": "corteza natural",
    "hp": 138,
    "hitDice": "12d12 + 60",
    "speed": "30 pies",
    "stats": {
      "str": 23,
      "dex": 8,
      "con": 21,
      "int": 12,
      "wis": 16,
      "cha": 12
    },
    "damageVulnerabilities": "Fuego",
    "damageResistances": "Contundente, perforante",
    "senses": "Percepción pasiva 13",
    "languages": "Común, Druídico, Élfico, Silvano",
    "cr": "9",
    "xp": 5000,
    "traits": [
      {
        "name": "Apariencia Falsa",
        "desc": "Inmóvil parece un árbol ordinario."
      },
      {
        "name": "Monstruo de Asedio",
        "desc": "Doble daño a estructuras."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques de azote."
      },
      {
        "name": "Azote de Rama",
        "desc": "Ataque cuerpo a cuerpo: +10 al ataque, alcance 5 pies. Impacto: 16 (3d6 + 6) contundente."
      },
      {
        "name": "Lanzar Roca",
        "desc": "Ataque a distancia: +10 al ataque, alcance 60/180 pies. Impacto: 28 (4d10 + 6) contundente."
      },
      {
        "name": "Animar Árboles (1/Día)",
        "desc": "Anima mágicamente hasta dos árboles a 60 pies que actúan como treants bajo su mando."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-gigante-piedra",
    "name": "Gigante de Piedra (Stone Giant)",
    "size": "Huge",
    "type": "Gigante",
    "alignment": "Neutral",
    "ac": 17,
    "acDescription": "armadura natural",
    "hp": 126,
    "hitDice": "11d12 + 55",
    "speed": "40 pies",
    "stats": {
      "str": 23,
      "dex": 15,
      "con": 20,
      "int": 10,
      "wis": 12,
      "cha": 9
    },
    "saves": "Des +5, Con +8, Sab +4",
    "skills": "Atletismo +12, Percepción +4",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 14",
    "languages": "Gigante",
    "cr": "7",
    "xp": 2900,
    "traits": [
      {
        "name": "Camuflaje de Piedra",
        "desc": "Ventaja en pruebas de Destreza (Sigilo) para esconderse en terreno rocoso."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques con su gran garrote de piedra."
      },
      {
        "name": "Gran Garrote de Piedra",
        "desc": "Ataque cuerpo a cuerpo: +9 al ataque, alcance 15 pies. Impacto: 19 (3d8 + 6) contundente."
      },
      {
        "name": "Lanzar Roca",
        "desc": "Ataque a distancia: +9 al ataque, alcance 60/240 pies. Impacto: 28 (4d10 + 6) contundente y si es criatura debe superar Fuerza CD 17 o ser derribada."
      }
    ],
    "reactions": [
      {
        "name": "Atrapar Roca",
        "desc": "Si una roca o proyectil similar le es lanzado, puede atraparlo con una prueba de Destreza CD 10 si no está incapacitado."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-gigante-escarcha",
    "name": "Gigante de la Escarcha (Frost Giant)",
    "size": "Huge",
    "type": "Gigante",
    "alignment": "Neutral Maligno",
    "ac": 15,
    "acDescription": "armadura de parches de hierro",
    "hp": 138,
    "hitDice": "12d12 + 60",
    "speed": "40 pies",
    "stats": {
      "str": 23,
      "dex": 9,
      "con": 21,
      "int": 9,
      "wis": 10,
      "cha": 12
    },
    "saves": "Con +8, Sab +3, Car +4",
    "skills": "Atletismo +9, Percepción +3",
    "damageImmunities": "Frío",
    "senses": "Percepción pasiva 13",
    "languages": "Gigante",
    "cr": "8",
    "xp": 3900,
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques con su gran hacha."
      },
      {
        "name": "Gran Hacha de Escarcha",
        "desc": "Ataque cuerpo a cuerpo: +9 al ataque, alcance 10 pies. Impacto: 25 (3d12 + 6) cortante."
      },
      {
        "name": "Lanzar Roca Gélida",
        "desc": "Ataque a distancia: +9 al ataque, alcance 60/240 pies. Impacto: 28 (4d10 + 6) contundente."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-gigante-nubes",
    "name": "Gigante de las Nubes (Cloud Giant)",
    "size": "Huge",
    "type": "Gigante",
    "alignment": "Neutral Bueno o Neutral Maligno",
    "ac": 17,
    "acDescription": "armadura natural",
    "hp": 200,
    "hitDice": "16d12 + 96",
    "speed": "40 pies",
    "stats": {
      "str": 27,
      "dex": 10,
      "con": 22,
      "int": 12,
      "wis": 16,
      "cha": 16
    },
    "saves": "Con +10, Sab +7, Car +7",
    "skills": "Intuición +7, Percepción +7",
    "senses": "Percepción pasiva 17",
    "languages": "Común, Gigante",
    "cr": "9",
    "xp": 5000,
    "traits": [
      {
        "name": "Olfato Aguzado",
        "desc": "Ventaja en pruebas de Percepción basadas en el olfato."
      },
      {
        "name": "Lanzamiento de Conjuros Innato",
        "desc": "Carisma CD 15. A voluntad: detectar magia, niebla nubosa, luz. 3/día: levitación, caída de pluma. 1/día: controlar el clima, forma gaseosa."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques con su lucero del alba."
      },
      {
        "name": "Lucero del Alba Colosal",
        "desc": "Ataque cuerpo a cuerpo: +12 al ataque, alcance 10 pies. Impacto: 21 (3d8 + 8) perforante."
      },
      {
        "name": "Lanzar Roca",
        "desc": "Ataque a distancia: +12 al ataque, alcance 60/240 pies. Impacto: 30 (4d10 + 8) contundente."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-gigante-tormentas",
    "name": "Gigante de las Tormentas (Storm Giant)",
    "size": "Huge",
    "type": "Gigante",
    "alignment": "Caótico Bueno",
    "ac": 16,
    "acDescription": "coraza pectoral",
    "hp": 230,
    "hitDice": "20d12 + 100",
    "speed": "50 pies, nadar 50 pies",
    "stats": {
      "str": 29,
      "dex": 14,
      "con": 20,
      "int": 16,
      "wis": 18,
      "cha": 18
    },
    "saves": "Fue +14, Con +10, Sab +9, Car +9",
    "skills": "Historia +8, Atletismo +14, Percepción +9",
    "damageResistances": "Frío",
    "damageImmunities": "Relámpago, Trueno",
    "senses": "Percepción pasiva 19",
    "languages": "Común, Gigante",
    "cr": "13",
    "xp": 10000,
    "traits": [
      {
        "name": "Anfibio",
        "desc": "Respira aire y agua."
      },
      {
        "name": "Lanzamiento de Conjuros Innato",
        "desc": "Carisma CD 17. A voluntad: detectar magia, levitación, luz. 3/día: respiración acuática, caminar sobre el agua. 1/día: controlar el clima, relámpago."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques con su gran espada."
      },
      {
        "name": "Gran Espada del Trueno",
        "desc": "Ataque cuerpo a cuerpo: +14 al ataque, alcance 10 pies. Impacto: 30 (6d6 + 9) cortante."
      },
      {
        "name": "Lanzar Roca",
        "desc": "Ataque a distancia: +14 al ataque, alcance 60/240 pies. Impacto: 35 (4d12 + 9) contundente."
      },
      {
        "name": "Descarga de Relámpago (Recarga 5-6)",
        "desc": "Lanza un rayo de relámpago mágico a un punto a 500 pies. Explosión de 12 pies de radio. Destreza CD 17 o sufrir 54 (12d8) daño de relámpago."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-veterano",
    "name": "Veterano (Veteran)",
    "size": "Medium",
    "type": "Humanoide",
    "alignment": "Cualquier alineamiento",
    "ac": 17,
    "acDescription": "férula",
    "hp": 58,
    "hitDice": "9d8 + 18",
    "speed": "30 pies",
    "stats": {
      "str": 16,
      "dex": 13,
      "con": 14,
      "int": 10,
      "wis": 11,
      "cha": 10
    },
    "skills": "Atletismo +5, Percepción +2",
    "senses": "Percepción pasiva 12",
    "languages": "Cualquier idioma (normalmente Común)",
    "cr": "3",
    "xp": 700,
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques de espada larga y uno de espada corta, o dos con su ballesta pesada."
      },
      {
        "name": "Espada Larga",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 7 (1d8 + 3) cortante."
      },
      {
        "name": "Espada Corta",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 6 (1d6 + 3) perforante."
      },
      {
        "name": "Ballesta Pesada",
        "desc": "Ataque a distancia: +3 al ataque, alcance 100/400 pies. Impacto: 6 (1d10 + 1) perforante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-gladiador",
    "name": "Gladiador (Gladiator)",
    "size": "Medium",
    "type": "Humanoide",
    "alignment": "Cualquier alineamiento",
    "ac": 16,
    "acDescription": "coraza pectoral, escudo",
    "hp": 112,
    "hitDice": "15d8 + 45",
    "speed": "30 pies",
    "stats": {
      "str": 18,
      "dex": 15,
      "con": 16,
      "int": 10,
      "wis": 12,
      "cha": 15
    },
    "saves": "Fue +7, Des +5, Con +6",
    "skills": "Atletismo +10, Intimidación +5",
    "senses": "Percepción pasiva 11",
    "languages": "Cualquier idioma",
    "cr": "5",
    "xp": 1800,
    "traits": [
      {
        "name": "Valiente",
        "desc": "Ventaja en salvaciones contra ser Asustado."
      },
      {
        "name": "Bruto",
        "desc": "Un ataque con arma cuerpo a cuerpo inflige un dado adicional de daño (incluido)."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza tres ataques cuerpo a cuerpo o dos a distancia."
      },
      {
        "name": "Lanza Pesada",
        "desc": "Ataque cuerpo a cuerpo o a distancia: +7 al ataque, alcance 5 pies o 20/60 pies. Impacto: 11 (2d6 + 4) perforante."
      },
      {
        "name": "Golpe de Escudo",
        "desc": "Ataque cuerpo a cuerpo: +7 al ataque, alcance 5 pies. Impacto: 9 (2d4 + 4) contundente y si es Medium o menor cae derribado (Fuerza CD 15)."
      }
    ],
    "reactions": [
      {
        "name": "Parada",
        "desc": "Añade 3 a su CA contra un ataque cuerpo a cuerpo."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-berserker",
    "name": "Bersérker (Berserker)",
    "size": "Medium",
    "type": "Humanoide",
    "alignment": "Cualquier alineamiento caótico",
    "ac": 13,
    "acDescription": "armadura de pieles",
    "hp": 67,
    "hitDice": "9d8 + 27",
    "speed": "30 pies",
    "stats": {
      "str": 16,
      "dex": 12,
      "con": 17,
      "int": 9,
      "wis": 11,
      "cha": 9
    },
    "senses": "Percepción pasiva 10",
    "languages": "Cualquier idioma",
    "cr": "2",
    "xp": 450,
    "traits": [
      {
        "name": "Ataque Temerario (Reckless Attack)",
        "desc": "Al inicio de su turno puede ganar ventaja en todas las tiradas de ataque con armas cuerpo a cuerpo durante ese turno, concediendo ventaja en los ataques contra él hasta su próximo turno."
      }
    ],
    "actions": [
      {
        "name": "Gran Hacha",
        "desc": "Ataque cuerpo a cuerpo: +5 al ataque, alcance 5 pies. Impacto: 9 (1d12 + 3) cortante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-arpy",
    "name": "Arpía (Harpy)",
    "size": "Medium",
    "type": "Monstruosidad",
    "alignment": "Caótico Maligno",
    "ac": 11,
    "hp": 38,
    "hitDice": "7d8 + 7",
    "speed": "20 pies, volar 40 pies",
    "stats": {
      "str": 12,
      "dex": 13,
      "con": 12,
      "int": 7,
      "wis": 10,
      "cha": 13
    },
    "senses": "Percepción pasiva 10",
    "languages": "Común",
    "cr": "1",
    "xp": 200,
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques: garras y garrote."
      },
      {
        "name": "Garras",
        "desc": "Ataque cuerpo a cuerpo: +3 al ataque, alcance 5 pies. Impacto: 6 (2d4 + 1) cortante."
      },
      {
        "name": "Garrote",
        "desc": "Ataque cuerpo a cuerpo: +3 al ataque, alcance 5 pies. Impacto: 3 (1d4 + 1) contundente."
      },
      {
        "name": "Canto Seductor",
        "desc": "Entona una melodía mágica. Cada humanoide o gigante a 300 pies debe superar Sabiduría CD 11 o quedar hechizado, caminando por la ruta más directa hacia la arpía."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-carrion-crawler",
    "name": "Reptador Carroñero (Carrion Crawler)",
    "size": "Large",
    "type": "Monstruosidad",
    "alignment": "Sin alineamiento",
    "ac": 13,
    "acDescription": "armadura natural",
    "hp": 51,
    "hitDice": "6d10 + 18",
    "speed": "30 pies, trepar 30 pies",
    "stats": {
      "str": 14,
      "dex": 13,
      "con": 16,
      "int": 1,
      "wis": 12,
      "cha": 5
    },
    "skills": "Percepción +3",
    "conditionImmunities": "Envenenado",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 13",
    "languages": "—",
    "cr": "2",
    "xp": 450,
    "traits": [
      {
        "name": "Olfato Aguzado & Trepar Cual Araña",
        "desc": "Ventaja en Percepción de olfato. Puede caminar por techos."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza dos ataques: tentáculos y mordisco."
      },
      {
        "name": "Tentáculos Paralizantes",
        "desc": "Ataque cuerpo a cuerpo: +8 al ataque, alcance 10 pies. Impacto: 4 (1d4 + 2) veneno y salvación Con CD 13 o paralizado 1 minuto."
      },
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +4 al ataque, alcance 5 pies. Impacto: 7 (2d4 + 2) perforante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-umber-hulk",
    "name": "Umber Hulk (Coloso Subterráneo)",
    "size": "Large",
    "type": "Monstruosidad",
    "alignment": "Caótico Maligno",
    "ac": 18,
    "acDescription": "caparazón natural",
    "hp": 93,
    "hitDice": "11d10 + 33",
    "speed": "30 pies, excavar 20 pies",
    "stats": {
      "str": 20,
      "dex": 13,
      "con": 16,
      "int": 5,
      "wis": 10,
      "cha": 10
    },
    "senses": "Visión en la oscuridad 60 pies, Sentido sísmico 60 pies, Percepción pasiva 10",
    "languages": "Umbrícola",
    "cr": "5",
    "xp": 1800,
    "traits": [
      {
        "name": "Mirada de Confusión",
        "desc": "Cualquier criatura a 30 pies que empiece su turno mirándolo debe superar Carisma CD 15 o sufrir el efecto de confusión."
      },
      {
        "name": "Excavador de Piedra",
        "desc": "Puede excavar a través de roca sólida dejando un túnel de 5 pies a su paso."
      }
    ],
    "actions": [
      {
        "name": "Ataque Múltiple",
        "desc": "Realiza tres ataques: dos con sus garras y uno con sus mandíbulas."
      },
      {
        "name": "Garras",
        "desc": "Ataque cuerpo a cuerpo: +8 al ataque, alcance 5 pies. Impacto: 9 (1d8 + 5) cortante."
      },
      {
        "name": "Mandíbulas",
        "desc": "Ataque cuerpo a cuerpo: +8 al ataque, alcance 5 pies. Impacto: 14 (2d8 + 5) cortante."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-monstruo-corrosivo",
    "name": "Monstruo Corrosivo (Rust Monster)",
    "size": "Medium",
    "type": "Monstruosidad",
    "alignment": "Sin alineamiento",
    "ac": 14,
    "acDescription": "armadura natural",
    "hp": 27,
    "hitDice": "5d8 + 5",
    "speed": "40 pies",
    "stats": {
      "str": 13,
      "dex": 12,
      "con": 13,
      "int": 2,
      "wis": 13,
      "cha": 6
    },
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 11",
    "languages": "—",
    "cr": "1/2",
    "xp": 100,
    "traits": [
      {
        "name": "Antena de Óxido",
        "desc": "Cualquier arma no mágica de metal que golpee al monstruo se corroe permanentemente (-1 de daño acumulativo). A -5 se destruye."
      }
    ],
    "actions": [
      {
        "name": "Mordisco",
        "desc": "Ataque cuerpo a cuerpo: +3 al ataque, alcance 5 pies. Impacto: 5 (1d8 + 1) perforante."
      },
      {
        "name": "Antenas",
        "desc": "Toca un objeto no mágico de metal. Si es armadura sufre un -1 permanente a la CA. A CA 10 se deshace en cenizas."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-sombra",
    "name": "Sombra (Shadow)",
    "size": "Medium",
    "type": "No-muerto",
    "alignment": "Caótico Maligno",
    "ac": 12,
    "hp": 16,
    "hitDice": "3d8 + 3",
    "speed": "40 pies",
    "stats": {
      "str": 6,
      "dex": 14,
      "con": 13,
      "int": 6,
      "wis": 10,
      "cha": 8
    },
    "skills": "Sigilo +4 (+6 en luz tenue u oscuridad)",
    "damageVulnerabilities": "Radiante",
    "damageResistances": "Ácido, Frío, Fuego, Relámpago, Trueno; no mágicos",
    "damageImmunities": "Necrótico, Veneno",
    "conditionImmunities": "Agotamiento, Asustado, Agarrado, Paralizado, Petrificado, Envenenado, Derribado, Restringido",
    "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 10",
    "languages": "—",
    "cr": "1/2",
    "xp": 100,
    "traits": [
      {
        "name": "Forma Amorfa",
        "desc": "Puede pasar por hendiduras de 1 pulgada."
      },
      {
        "name": "Sigilo en las Sombras",
        "desc": "Acción adicional para esconderse en luz tenue u oscuridad."
      }
    ],
    "actions": [
      {
        "name": "Drenaje de Fuerza",
        "desc": "Ataque cuerpo a cuerpo: +4 al ataque, alcance 5 pies. Impacto: 9 (2d6 + 2) necrótico y la puntuación de Fuerza del objetivo se reduce en 1d4. Si su Fuerza cae a 0, muere y una nueva sombra surge de su cadáver en 1d4 horas."
      }
    ],
    "source": "Manual de Monstruos 5e"
  },
  {
    "id": "srd-demilich",
    "name": "Demiliche (Demilich)",
    "size": "Tiny",
    "type": "No-muerto",
    "alignment": "Cualquier alineamiento maligno",
    "ac": 20,
    "acDescription": "armadura natural",
    "hp": 80,
    "hitDice": "20d4 + 30",
    "speed": "0 pies, volar 30 pies (levitación)",
    "stats": {
      "str": 1,
      "dex": 20,
      "con": 10,
      "int": 20,
      "wis": 17,
      "cha": 20
    },
    "saves": "Con +6, Int +11, Sab +9, Car +11",
    "damageResistances": "Contundente, perforante y cortante de armas mágicas",
    "damageImmunities": "Necrótico, Veneno, Psíquico; contundente, perforante y cortante de no mágicas",
    "conditionImmunities": "Hechizado, Ensordecido, Agotamiento, Asustado, Agarrado, Paralizado, Petrificado, Envenenado, Derribado, Restringido",
    "senses": "Vista verdadera 120 pies, Percepción pasiva 13",
    "languages": "—",
    "cr": "18",
    "xp": 20000,
    "traits": [
      {
        "name": "Resistencia Legendaria (3/Día)",
        "desc": "Convierte salvaciones fallidas en éxitos."
      },
      {
        "name": "Aura Aterradora",
        "desc": "Criaturas a 30 pies deben superar Sabiduría CD 19 o quedar Asustadas 1 minuto."
      },
      {
        "name": "Resistencia Mágica",
        "desc": "Ventaja en salvaciones contra magia."
      }
    ],
    "actions": [
      {
        "name": "Aullido Mortal (Recharge 5-6)",
        "desc": "Libera un aullido espectral. Cada criatura viva a 30 pies que lo escuche debe superar Constitución CD 15 o caer inmediatamente a 0 puntos de golpe."
      },
      {
        "name": "Drenaje de Energía",
        "desc": "Elige hasta 3 criaturas a 30 pies. Constitución CD 19 o sufrir 21 (6d6) necrótico. El demiliche recupera PG iguales al total infligido."
      }
    ],
    "legendaryActions": [
      {
        "name": "Vuelo (1)",
        "desc": "Vuela hasta su velocidad sin provocar ataques de oportunidad."
      },
      {
        "name": "Atrapar Alma (3)",
        "desc": "El demiliche atrapa mágicamente el alma de un objetivo a 30 pies en una de sus gemas (Carisma CD 19). Su cuerpo cae sin vida."
      }
    ],
    "source": "Manual de Monstruos 5e"
  }
];
