// Compendio Oficial de Dotes D&D 5.5e (2024 Revised Rules) - Bilingüe
export interface FeatBenefit2024 {
  name: string;
  nameEn?: string;
  desc: string;
  descEn?: string;
}

export interface Feat2024AbilityBonus {
  stats: ('str' | 'dex' | 'con' | 'int' | 'wis' | 'cha')[];
  amount: number;
  maxCap?: number;
}

export interface Feat2024 {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  category: string;
  categoryEn?: string;
  edition: '5.5e';
  prerequisiteLevel?: number;
  prerequisite?: string;
  prerequisiteEn?: string;
  abilityBonus?: Feat2024AbilityBonus;
  repeatable?: boolean;
  subChoiceType?:
    | 'magic-initiate'
    | 'skilled'
    | 'crafter'
    | 'musician'
    | 'elemental-adept'
    | 'fey-touched'
    | 'shadow-touched'
    | 'resilient'
    | 'ritual-caster'
    | 'skill-expert'
    | 'keen-mind';
  description: string;
  descriptionEn?: string;
  benefits: FeatBenefit2024[];
  source: string;
}

export const DND_2024_FEATS: Feat2024[] = [
  {
    "id": "feat-2024-alert",
    "slug": "alert",
    "name": "Alerta",
    "nameEn": "Alert",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "description": "Tus sentidos permanecen siempre alerta ante cualquier emboscada y reaccionas con reflejos fulminantes al iniciar el combate.",
    "descriptionEn": "Your instincts keep you sharp against ambush and ready to act or coordinate at the start of combat.",
    "benefits": [
      {
        "name": "Competencia en Iniciativa",
        "nameEn": "Initiative Proficiency",
        "desc": "Cuando tiras Iniciativa, puedes sumar tu Bono de Competencia a la tirada.",
        "descEn": "When you roll Initiative, you can add your Proficiency Bonus to the roll."
      },
      {
        "name": "Intercambio de Iniciativa",
        "nameEn": "Initiative Swap",
        "desc": "Inmediatamente después de tirar Iniciativa, puedes intercambiar tu resultado con el de un aliado voluntario en el mismo combate (si ninguno está Incapacitado).",
        "descEn": "Immediately after you roll Initiative, you can swap your Initiative with one willing ally in the same combat (neither can be Incapacitated)."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-crafter",
    "slug": "crafter",
    "name": "Artesano",
    "nameEn": "Crafter",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "subChoiceType": "crafter",
    "description": "Dominas diversas artes manuales para fabricar equipo de aventura con rapidez y negociar mejores precios.",
    "descriptionEn": "You are adept at crafting useful gear quickly and bargaining for better prices on equipment.",
    "benefits": [
      {
        "name": "Competencia en Herramientas",
        "nameEn": "Tool Proficiency",
        "desc": "Ganas competencia con 3 Herramientas de Artesano a tu elección de la tabla de Elaboración Rápida (Carpintero, Curtidor, Albañil, Alfarero, Herrero, Hojalatero/Manitas, Tejedor o Tallista).",
        "descEn": "You gain proficiency with three different Artisan's Tools of your choice from the Fast Crafting table."
      },
      {
        "name": "Descuento",
        "nameEn": "Discount",
        "desc": "Siempre que compres un objeto no mágico, recibes un 20 % de descuento sobre su precio.",
        "descEn": "Whenever you buy a nonmagical item, you receive a 20 percent discount on it."
      },
      {
        "name": "Elaboración Rápida",
        "nameEn": "Fast Crafting",
        "desc": "Al finalizar un Descanso Largo, puedes fabricar un objeto de equipo de la tabla (como antorcha, cuerda, pala, red, tienda, garrote o gancho) si tienes las herramientas adecuadas. Dura hasta tu próximo Descanso Largo.",
        "descEn": "When you finish a Long Rest, you can craft one piece of gear from the Fast Crafting table using proficient Artisan Tools; it lasts until your next Long Rest."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-healer",
    "slug": "healer",
    "name": "Sanador",
    "nameEn": "Healer",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "description": "Médico de campo experto en estabilizar heridas graves en medio del combate y optimizar cada cura mágica o mundana.",
    "descriptionEn": "You have training in battlefield medicine, patching up allies quickly and maximizing healing dice.",
    "benefits": [
      {
        "name": "Médico de Batalla",
        "nameEn": "Battle Medic",
        "desc": "Si tienes un Kit de Curandero, puedes gastar 1 uso como acción de Utilizar para atender a una criatura a 5 pies. Esa criatura puede gastar 1 de sus Dados de Golpe y recupera el resultado + tu Bono de Competencia.",
        "descEn": "If you have a Healer's Kit, expend one use as a Utilize action on a creature within 5 ft; it expends one Hit Point Die and regains the roll plus your Proficiency Bonus HP."
      },
      {
        "name": "Repetir Dados de Curación",
        "nameEn": "Healing Rerolls",
        "desc": "Siempre que tires un dado para determinar cuántos PG restauras con un conjuro o con Médico de Batalla, puedes volver a tirar cualquier 1 y quedarte con el nuevo resultado.",
        "descEn": "Whenever you roll a die to restore HP with a spell or Battle Medic, you can reroll 1s and must use the new roll."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-lucky",
    "slug": "lucky",
    "name": "Afortunado",
    "nameEn": "Lucky",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "description": "Una suerte inexplicable parece torcer el destino a tu favor justo en el instante más crítico.",
    "descriptionEn": "You possess inexplicable luck that tilts critical moments in your favor.",
    "benefits": [
      {
        "name": "Puntos de Suerte",
        "nameEn": "Luck Points",
        "desc": "Tienes un número de Puntos de Suerte igual a tu Bono de Competencia y los recuperas tras un Descanso Largo.",
        "descEn": "You have Luck Points equal to your Proficiency Bonus, regained on a Long Rest."
      },
      {
        "name": "Ventaja",
        "nameEn": "Advantage",
        "desc": "Cuando tires un d20 para una prueba d20 (ataque, salvación o habilidad), puedes gastar 1 Punto de Suerte para darte Ventaja.",
        "descEn": "When you roll a d20 for a D20 Test, spend 1 Luck Point to give yourself Advantage."
      },
      {
        "name": "Desventaja",
        "nameEn": "Disadvantage",
        "desc": "Cuando una criatura tire un d20 para atacarte, puedes gastar 1 Punto de Suerte para imponerle Desventaja en esa tirada (no consume Reacción).",
        "descEn": "When a creature rolls a d20 for an attack roll against you, spend 1 Luck Point to impose Disadvantage on that roll."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-magic-initiate",
    "slug": "magic-initiate",
    "name": "Iniciado en la Magia",
    "nameEn": "Magic Initiate",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "repeatable": true,
    "subChoiceType": "magic-initiate",
    "description": "Has aprendido los fundamentos de una tradición mágica, dominando dos trucos y un conjuro de nivel 1 siempre preparado.",
    "descriptionEn": "You have learned the fundamentals of a spellcasting tradition, gaining two cantrips and one always-prepared 1st-level spell.",
    "benefits": [
      {
        "name": "Dos Trucos",
        "nameEn": "Two Cantrips",
        "desc": "Aprendes 2 trucos de la lista de Clérigo, Druida o Mago. Eliges Inteligencia, Sabiduría o Carisma como característica de lanzamiento.",
        "descEn": "Learn 2 cantrips from the Cleric, Druid, or Wizard list. Choose Intelligence, Wisdom, or Charisma as your spellcasting ability."
      },
      {
        "name": "Conjuro de Nivel 1",
        "nameEn": "Level 1 Spell",
        "desc": "Eliges 1 conjuro de nivel 1 de la misma lista; siempre lo tienes preparado. Puedes lanzarlo 1 vez por Descanso Largo sin gastar espacio, y también usando tus propios espacios de conjuro.",
        "descEn": "Choose one 1st-level spell from that same list; you always have it prepared, can cast it once per Long Rest without a spell slot, and can also cast it using any spell slots you have."
      },
      {
        "name": "Cambio y Repetible",
        "nameEn": "Spell Change & Repeatable",
        "desc": "Al subir de nivel puedes cambiar uno de estos conjuros por otro del mismo nivel de esa lista. Puedes elegir esta dote más de una vez eligiendo una lista distinta cada vez.",
        "descEn": "Whenever you gain a new level, you can replace one chosen spell with another of the same level from the chosen list. Repeatable with a different list."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-musician",
    "slug": "musician",
    "name": "Músico",
    "nameEn": "Musician",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "subChoiceType": "musician",
    "description": "Tu maestría musical eleva la moral de todo el grupo, infundiendo Inspiración Heroica al término de cada descanso.",
    "descriptionEn": "Your musical training inspires allies during rests, granting Heroic Inspiration through stirring songs.",
    "benefits": [
      {
        "name": "Entrenamiento Instrumental",
        "nameEn": "Instrument Training",
        "desc": "Ganas competencia con 3 Instrumentos Musicales a tu elección.",
        "descEn": "You gain proficiency with three Musical Instruments of your choice."
      },
      {
        "name": "Canción Alentadora",
        "nameEn": "Encouraging Song",
        "desc": "Al finalizar un Descanso Corto o Largo, puedes tocar un instrumento en el que seas competente para otorgar Inspiración Heroica a un número de aliados que te oigan igual a tu Bono de Competencia.",
        "descEn": "As you finish a Short or Long Rest, play a proficient instrument to grant Heroic Inspiration to up to Proficiency Bonus allies who hear it."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-savage-attacker",
    "slug": "savage-attacker",
    "name": "Atacante Salvaje",
    "nameEn": "Savage Attacker",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "description": "Tus golpes con armas descargan una furia brutal y devastadora en el momento exacto del impacto.",
    "descriptionEn": "You have trained to unleash devastatingly vicious strikes with your weapons.",
    "benefits": [
      {
        "name": "Daño Brutal",
        "nameEn": "Savage Damage",
        "desc": "Una vez por turno cuando golpeas a un objetivo con un arma, puedes tirar los dados de daño del arma dos veces y usar cualquiera de los dos resultados.",
        "descEn": "Once per turn when you hit a target with a weapon, you can roll the weapon's damage dice twice and use either roll."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-skilled",
    "slug": "skilled",
    "name": "Hábil",
    "nameEn": "Skilled",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "repeatable": true,
    "subChoiceType": "skilled",
    "description": "Tu curiosidad y versatilidad te han llevado a dominar múltiples habilidades y oficios.",
    "descriptionEn": "You have honed an unusually broad range of skills and practical proficiencies.",
    "benefits": [
      {
        "name": "Tres Competencias",
        "nameEn": "Three Proficiencies",
        "desc": "Ganas competencia en cualquier combinación de 3 habilidades o herramientas a tu elección. (Repetible: puedes tomar esta dote varias veces).",
        "descEn": "You gain proficiency in any combination of three skills or tools of your choice. Repeatable."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-tavern-brawler",
    "slug": "tavern-brawler",
    "name": "Luchador de Taberna",
    "nameEn": "Tavern Brawler",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "description": "Curtiéndote en reyertas callejeras y tabernas, dominas el combate desarmado y cualquier objeto como arma improvisada.",
    "descriptionEn": "Hardened by street brawls, you turn bare fists and barroom furniture into dangerous weapons.",
    "benefits": [
      {
        "name": "Golpe Desarmado Mejorado",
        "nameEn": "Enhanced Unarmed Strike",
        "desc": "Cuando impactas con un Golpe Desarmado para dañar, infliges 1d4 + tu modificador de Fuerza de daño contundente.",
        "descEn": "Your Unarmed Strikes deal Bludgeoning damage equal to 1d4 + your Strength modifier."
      },
      {
        "name": "Repetir Dados de Daño",
        "nameEn": "Damage Rerolls",
        "desc": "Siempre que saques un 1 en un dado de daño de tu Golpe Desarmado, puedes volver a tirarlo y usar el nuevo resultado.",
        "descEn": "Whenever you roll a 1 on an Unarmed Strike damage die, you can reroll it and must use the new roll."
      },
      {
        "name": "Armas Improvisadas y Empujón",
        "nameEn": "Improvised Weaponry & Push",
        "desc": "Tienes competencia con armas improvisadas. Una vez por turno, cuando golpeas con un Golpe Desarmado en tu acción de Atacar, también puedes empujar al objetivo 5 pies lejos de ti.",
        "descEn": "Proficiency with improvised weapons. Once per turn when hitting with an Unarmed Strike during the Attack action, push the target 5 ft away."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-tough",
    "slug": "tough",
    "name": "Duro",
    "nameEn": "Tough",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "description": "Tu vigor físico sobrehumano te permite soportar castigos que derribarían a cualquier otro aventurero.",
    "descriptionEn": "Your extraordinary resilience gives you substantially more hit points to endure punishment.",
    "benefits": [
      {
        "name": "Reserva de Vida",
        "nameEn": "Hit Point Maximum",
        "desc": "Tus Puntos de Golpe máximos aumentan en el doble de tu nivel de personaje al obtener esta dote, y aumentan en +2 adicionales cada vez que subas un nivel.",
        "descEn": "Your Hit Point maximum increases by twice your character level when gained, plus 2 Hit Points every time you gain a level."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-archery",
    "slug": "archery",
    "name": "Arquería",
    "nameEn": "Archery",
    "category": "Estilo de Combate",
    "categoryEn": "Fighting Style",
    "edition": "5.5e",
    "prerequisite": "Rasgo de clase Estilo de Combate",
    "prerequisiteEn": "Fighting Style feature",
    "description": "Ganas un bonificador +2 a las tiradas de ataque con armas a distancia.",
    "descriptionEn": "You gain a +2 bonus to attack rolls made with Ranged weapons.",
    "benefits": [
      {
        "name": "Armas a Distancia",
        "nameEn": "Archery",
        "desc": "Ganas un bonificador +2 a las tiradas de ataque con armas a distancia.",
        "descEn": "You gain a +2 bonus to attack rolls made with Ranged weapons."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-blind-fighting",
    "slug": "blind-fighting",
    "name": "Lucha a Ciegas",
    "nameEn": "Blind Fighting",
    "category": "Estilo de Combate",
    "categoryEn": "Fighting Style",
    "edition": "5.5e",
    "prerequisite": "Rasgo de clase Estilo de Combate",
    "prerequisiteEn": "Fighting Style feature",
    "description": "Obtienes Visión Ciega (Blindsight) a 10 pies para detectar criaturas invisibles o en oscuridad total.",
    "descriptionEn": "You have Blindsight with a range of 10 feet.",
    "benefits": [
      {
        "name": "Sentidos de Combate",
        "nameEn": "Blind Fighting",
        "desc": "Obtienes Visión Ciega (Blindsight) a 10 pies para detectar criaturas invisibles o en oscuridad total.",
        "descEn": "You have Blindsight with a range of 10 feet."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-blessed-warrior",
    "slug": "blessed-warrior",
    "name": "Guerrero Bendito",
    "nameEn": "Blessed Warrior",
    "category": "Estilo de Combate",
    "categoryEn": "Fighting Style",
    "edition": "5.5e",
    "prerequisite": "Paladín con rasgo Estilo de Combate",
    "prerequisiteEn": "Fighting Style feature",
    "description": "Aprendes 2 trucos de la lista de Clérigo (usan Carisma). Puedes cambiar uno al subir de nivel de Paladín.",
    "descriptionEn": "Learn two Cleric cantrips (Charisma-based). Paladin prerequisite.",
    "benefits": [
      {
        "name": "Paladín (Conjuros)",
        "nameEn": "Blessed Warrior",
        "desc": "Aprendes 2 trucos de la lista de Clérigo (usan Carisma). Puedes cambiar uno al subir de nivel de Paladín.",
        "descEn": "Learn two Cleric cantrips (Charisma-based). Paladin prerequisite."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-defense",
    "slug": "defense",
    "name": "Defensa",
    "nameEn": "Defense",
    "category": "Estilo de Combate",
    "categoryEn": "Fighting Style",
    "edition": "5.5e",
    "prerequisite": "Rasgo de clase Estilo de Combate",
    "prerequisiteEn": "Fighting Style feature",
    "description": "Mientras lleves armadura equipada, obtienes un bonificador +1 a tu Clase de Armadura (CA).",
    "descriptionEn": "While you are wearing Armor, you gain a +1 bonus to Armor Class.",
    "benefits": [
      {
        "name": "Protección de Armadura",
        "nameEn": "Defense",
        "desc": "Mientras lleves armadura equipada, obtienes un bonificador +1 a tu Clase de Armadura (CA).",
        "descEn": "While you are wearing Armor, you gain a +1 bonus to Armor Class."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-druidic-warrior",
    "slug": "druidic-warrior",
    "name": "Guerrero Druídico",
    "nameEn": "Druidic Warrior",
    "category": "Estilo de Combate",
    "categoryEn": "Fighting Style",
    "edition": "5.5e",
    "prerequisite": "Explorador con rasgo Estilo de Combate",
    "prerequisiteEn": "Fighting Style feature",
    "description": "Aprendes 2 trucos de la lista de Druida (usan Sabiduría). Puedes cambiar uno al subir de nivel de Explorador.",
    "descriptionEn": "Learn two Druid cantrips (Wisdom-based). Ranger prerequisite.",
    "benefits": [
      {
        "name": "Explorador (Conjuros)",
        "nameEn": "Druidic Warrior",
        "desc": "Aprendes 2 trucos de la lista de Druida (usan Sabiduría). Puedes cambiar uno al subir de nivel de Explorador.",
        "descEn": "Learn two Druid cantrips (Wisdom-based). Ranger prerequisite."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-dueling",
    "slug": "dueling",
    "name": "Duelo",
    "nameEn": "Dueling",
    "category": "Estilo de Combate",
    "categoryEn": "Fighting Style",
    "edition": "5.5e",
    "prerequisite": "Rasgo de clase Estilo de Combate",
    "prerequisiteEn": "Fighting Style feature",
    "description": "Cuando empuñas un arma cuerpo a cuerpo en una mano y ninguna otra arma, sumas +2 a sus tiradas de daño.",
    "descriptionEn": "Gain a +2 bonus to damage rolls when wielding a melee weapon in one hand and no other weapons.",
    "benefits": [
      {
        "name": "Arma a Una Mano",
        "nameEn": "Dueling",
        "desc": "Cuando empuñas un arma cuerpo a cuerpo en una mano y ninguna otra arma, sumas +2 a sus tiradas de daño.",
        "descEn": "Gain a +2 bonus to damage rolls when wielding a melee weapon in one hand and no other weapons."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-great-weapon-fighting",
    "slug": "great-weapon-fighting",
    "name": "Combate con Armas Grandes",
    "nameEn": "Great Weapon Fighting",
    "category": "Estilo de Combate",
    "categoryEn": "Fighting Style",
    "edition": "5.5e",
    "prerequisite": "Rasgo de clase Estilo de Combate",
    "prerequisiteEn": "Fighting Style feature",
    "description": "Al atacar con un arma cuerpo a cuerpo con la propiedad Pesada o Versátil empuñada a dos manos, tratas cualquier 1 o 2 en los dados de daño como un 3.",
    "descriptionEn": "When rolling 1 or 2 on a damage die with a Two-Handed or Versatile melee weapon held in two hands, treat the roll as a 3.",
    "benefits": [
      {
        "name": "Armas a Dos Manos",
        "nameEn": "Great Weapon Fighting",
        "desc": "Al atacar con un arma cuerpo a cuerpo con la propiedad Pesada o Versátil empuñada a dos manos, tratas cualquier 1 o 2 en los dados de daño como un 3.",
        "descEn": "When rolling 1 or 2 on a damage die with a Two-Handed or Versatile melee weapon held in two hands, treat the roll as a 3."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-interception",
    "slug": "interception",
    "name": "Intercepción",
    "nameEn": "Interception",
    "category": "Estilo de Combate",
    "categoryEn": "Fighting Style",
    "edition": "5.5e",
    "prerequisite": "Rasgo de clase Estilo de Combate",
    "prerequisiteEn": "Fighting Style feature",
    "description": "Cuando una criatura visible golpea a un aliado a 5 pies de ti, usas tu Reacción (empuñando arma o escudo) para reducir el daño en 1d10 + tu Bono de Competencia.",
    "descriptionEn": "Take a Reaction when an ally within 5 ft is hit to reduce the damage by 1d10 + Proficiency Bonus.",
    "benefits": [
      {
        "name": "Defensa de Aliados",
        "nameEn": "Interception",
        "desc": "Cuando una criatura visible golpea a un aliado a 5 pies de ti, usas tu Reacción (empuñando arma o escudo) para reducir el daño en 1d10 + tu Bono de Competencia.",
        "descEn": "Take a Reaction when an ally within 5 ft is hit to reduce the damage by 1d10 + Proficiency Bonus."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-protection",
    "slug": "protection",
    "name": "Protección",
    "nameEn": "Protection",
    "category": "Estilo de Combate",
    "categoryEn": "Fighting Style",
    "edition": "5.5e",
    "prerequisite": "Rasgo de clase Estilo de Combate",
    "prerequisiteEn": "Fighting Style feature",
    "description": "Empuñando un escudo, usas tu Reacción cuando un atacante visible ataca a un aliado a 5 pies para imponer Desventaja a sus ataques contra ese aliado hasta el inicio de tu siguiente turno.",
    "descriptionEn": "With a Shield, take a Reaction to impose Disadvantage on attack rolls targeting an ally within 5 ft until the start of your next turn.",
    "benefits": [
      {
        "name": "Uso de Escudo",
        "nameEn": "Protection",
        "desc": "Empuñando un escudo, usas tu Reacción cuando un atacante visible ataca a un aliado a 5 pies para imponer Desventaja a sus ataques contra ese aliado hasta el inicio de tu siguiente turno.",
        "descEn": "With a Shield, take a Reaction to impose Disadvantage on attack rolls targeting an ally within 5 ft until the start of your next turn."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-thrown-weapon-fighting",
    "slug": "thrown-weapon-fighting",
    "name": "Lucha con Armas Arrojadizas",
    "nameEn": "Thrown Weapon Fighting",
    "category": "Estilo de Combate",
    "categoryEn": "Fighting Style",
    "edition": "5.5e",
    "prerequisite": "Rasgo de clase Estilo de Combate",
    "prerequisiteEn": "Fighting Style feature",
    "description": "Puedes desenfundar un arma arrojadiza como parte del propio ataque y sumas +2 al daño en ataques a distancia hechos con armas arrojadizas.",
    "descriptionEn": "Draw a Thrown weapon as part of the attack and add +2 to damage rolls made with ranged Thrown attacks.",
    "benefits": [
      {
        "name": "Armas Arrojadizas",
        "nameEn": "Thrown Weapon Fighting",
        "desc": "Puedes desenfundar un arma arrojadiza como parte del propio ataque y sumas +2 al daño en ataques a distancia hechos con armas arrojadizas.",
        "descEn": "Draw a Thrown weapon as part of the attack and add +2 to damage rolls made with ranged Thrown attacks."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-two-weapon-fighting",
    "slug": "two-weapon-fighting",
    "name": "Combate con Dos Armas",
    "nameEn": "Two-Weapon Fighting",
    "category": "Estilo de Combate",
    "categoryEn": "Fighting Style",
    "edition": "5.5e",
    "prerequisite": "Rasgo de clase Estilo de Combate",
    "prerequisiteEn": "Fighting Style feature",
    "description": "Cuando realizas el ataque adicional otorgado por la propiedad Ligera, puedes sumar tu modificador de característica al daño de ese ataque.",
    "descriptionEn": "Add your ability modifier to the damage roll of the extra attack granted by the Light weapon property.",
    "benefits": [
      {
        "name": "Armas Ligeras",
        "nameEn": "Two-Weapon Fighting",
        "desc": "Cuando realizas el ataque adicional otorgado por la propiedad Ligera, puedes sumar tu modificador de característica al daño de ese ataque.",
        "descEn": "Add your ability modifier to the damage roll of the extra attack granted by the Light weapon property."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-unarmed-fighting",
    "slug": "unarmed-fighting",
    "name": "Lucha Desarmada",
    "nameEn": "Unarmed Fighting",
    "category": "Estilo de Combate",
    "categoryEn": "Fighting Style",
    "edition": "5.5e",
    "prerequisite": "Rasgo de clase Estilo de Combate",
    "prerequisiteEn": "Fighting Style feature",
    "description": "Tus Golpes Desarmados causan 1d6 + FUE de daño contundente (1d8 si no llevas armas ni escudo). Al inicio de cada turno infliges 1d4 contundente a una criatura que tengas apresada.",
    "descriptionEn": "Unarmed Strikes deal 1d6 + STR damage (1d8 with no weapons/shield), and deal 1d4 damage at the start of your turn to a grappled creature.",
    "benefits": [
      {
        "name": "Pugilismo",
        "nameEn": "Unarmed Fighting",
        "desc": "Tus Golpes Desarmados causan 1d6 + FUE de daño contundente (1d8 si no llevas armas ni escudo). Al inicio de cada turno infliges 1d4 contundente a una criatura que tengas apresada.",
        "descEn": "Unarmed Strikes deal 1d6 + STR damage (1d8 with no weapons/shield), and deal 1d4 damage at the start of your turn to a grappled creature."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-ability-score-improvement",
    "slug": "ability-score-improvement",
    "name": "Mejora de Característica",
    "nameEn": "Ability Score Improvement",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+",
    "prerequisiteEn": "Level 4+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex",
        "con",
        "int",
        "wis",
        "cha"
      ],
      "amount": 2,
      "maxCap": 20
    },
    "description": "Aumenta una puntuación de característica en +2, o dos puntuaciones en +1 cada una (hasta un máximo de 20).",
    "descriptionEn": "Increase one ability score by 2, or two ability scores by 1 each (maximum 20).",
    "benefits": [
      {
        "name": "Incremento (+2 o +1/+1)",
        "desc": "Elige +2 a una característica o +1 a dos características hasta un máximo de 20."
      }
    ],
    "source": "Player's Handbook (2024)",
    "repeatable": true
  },
  {
    "id": "feat-2024-actor",
    "slug": "actor",
    "name": "Actor",
    "nameEn": "Actor",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, CAR 13+",
    "prerequisiteEn": "Level 4+, CHA 13+",
    "abilityBonus": {
      "stats": [
        "cha"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Maestro de la suplantación capaz de imitar voces ajenas al instante y engañar a cualquier audiencia.",
    "descriptionEn": "Master of mimicry and disguise.",
    "benefits": [
      {
        "name": "+1 Carisma",
        "desc": "Aumentas Carisma en +1 (máximo 20)."
      },
      {
        "name": "Suplantador e Imitador",
        "desc": "Ventaja en Engaño e Interpretación mientras mantienes un disfraz; imitas voces/sonidos de otra criatura al instante (detectarlo exige superar tu CD de Engaño: 8 + CAR + Comp.)."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-athlete",
    "slug": "athlete",
    "name": "Atleta",
    "nameEn": "Athlete",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, FUE o DES 13+",
    "prerequisiteEn": "Level 4+, STR or DEX 13+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Agilidad atlética de élite para trepar sin penalización, alzarse al instante y saltar sin impulso.",
    "descriptionEn": "Athletic agility grants a Climb Speed and swift recovery from prone.",
    "benefits": [
      {
        "name": "+1 FUE o DES",
        "desc": "Aumentas Fuerza o Destreza en +1 (máximo 20)."
      },
      {
        "name": "Agilidad Atlética",
        "desc": "Obtienes Velocidad de Trepar igual a tu Velocidad. Levantarte de Derribado cuesta solo 5 pies y saltar corriendo solo requiere 5 pies de carrera."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-charger",
    "slug": "charger",
    "name": "Embestidor",
    "nameEn": "Charger",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, FUE o DES 13+",
    "prerequisiteEn": "Level 4+, STR or DEX 13+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Potencia tus cargas en línea recta para infligir daño adicional o derribar y empujar rivales.",
    "descriptionEn": "Dash faster and deliver crushing momentum strikes.",
    "benefits": [
      {
        "name": "+1 FUE o DES",
        "desc": "Aumentas Fuerza o Destreza en +1 (máximo 20)."
      },
      {
        "name": "Carrera Imparable y Carga",
        "desc": "Al usar la acción de Correr (Dash), ganas +10 pies de velocidad. Si te mueves al menos 10 pies en línea recta y aciertas un ataque cuerpo a cuerpo, puedes causar +1d8 de daño o empujar al objetivo 10 pies."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-chef",
    "slug": "chef",
    "name": "Cocinero",
    "nameEn": "Chef",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+",
    "prerequisiteEn": "Level 4+",
    "abilityBonus": {
      "stats": [
        "con",
        "wis"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Preparas banquetes restauradores en los descansos y bocados fortificantes para el combate.",
    "descriptionEn": "Prepare restorative meals and fortifying treats.",
    "benefits": [
      {
        "name": "+1 CON o SAB",
        "desc": "Aumentas Constitución o Sabiduría en +1 (máximo 20) y ganas competencia con Utensilios de Cocinero."
      },
      {
        "name": "Comida Reconstituyente y Bocados",
        "desc": "En un Descanso Corto, aliados que usen Dados de Golpe recuperan +1d8 PG extra. En un Descanso Largo cocinas bocados iguales a tu Bono de Comp. que otorgan PG temporales como Acción Adicional."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-crossbow-expert",
    "slug": "crossbow-expert",
    "name": "Experto en Ballestas",
    "nameEn": "Crossbow Expert",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, DES 13+",
    "prerequisiteEn": "Level 4+, DEX 13+",
    "abilityBonus": {
      "stats": [
        "dex"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Ignoras la recarga de todas las ballestas, disparas en cuerpo a cuerpo y combinas ballestas ligeras con dos armas.",
    "descriptionEn": "Master crossbows in close quarters and reload seamlessly.",
    "benefits": [
      {
        "name": "+1 Destreza",
        "desc": "Aumentas Destreza en +1 (máximo 20)."
      },
      {
        "name": "Recarga Rápida y Cuerpo a Cuerpo",
        "desc": "Ignoras la propiedad Carga de ballestas de mano, ligeras y pesadas (recargas incluso sin mano libre). Estar a 5 pies de un enemigo no da Desventaja con ballestas, y añades tu modificador al daño del ataque adicional de ballesta Ligera."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-crusher",
    "slug": "crusher",
    "name": "Aplastador",
    "nameEn": "Crusher",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+",
    "prerequisiteEn": "Level 4+",
    "abilityBonus": {
      "stats": [
        "str",
        "con"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Tus golpes contundentes desplazan a tus enemigos por el campo de batalla y exponen sus defensas.",
    "descriptionEn": "Move foes with bludgeoning strikes and stagger targets on crits.",
    "benefits": [
      {
        "name": "+1 FUE o CON",
        "desc": "Aumentas Fuerza o Constitución en +1 (máximo 20)."
      },
      {
        "name": "Impacto Contundente",
        "desc": "Una vez por turno al causar daño contundente, mueves al objetivo 5 pies a un espacio desocupado. En un golpe crítico contundente, los ataques contra ese objetivo tienen Ventaja hasta el inicio de tu siguiente turno."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-defensive-duelist",
    "slug": "defensive-duelist",
    "name": "Duelista Defensivo",
    "nameEn": "Defensive Duelist",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, DES 13+",
    "prerequisiteEn": "Level 4+, DEX 13+",
    "abilityBonus": {
      "stats": [
        "dex"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Desvías estocadas enemigas con un arma sutil añadiendo tu Bono de Competencia a tu CA.",
    "descriptionEn": "Parry incoming melee blows with finesse weapons.",
    "benefits": [
      {
        "name": "+1 Destreza",
        "desc": "Aumentas Destreza en +1 (máximo 20)."
      },
      {
        "name": "Parada Defensiva",
        "desc": "Empuñando un arma Sutil cuando te golpean en cuerpo a cuerpo, usas tu Reacción para sumar tu Bono de Competencia a tu CA contra ataques cuerpo a cuerpo hasta el inicio de tu siguiente turno."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-dual-wielder",
    "slug": "dual-wielder",
    "name": "Combatiente con Dos Armas",
    "nameEn": "Dual Wielder",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, FUE o DES 13+",
    "prerequisiteEn": "Level 4+, STR or DEX 13+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Realizas un ataque extra con tu Acción Adicional usando un arma no pesada tras atacar con un arma Ligera.",
    "descriptionEn": "Unleash enhanced off-hand strikes and draw two weapons at once.",
    "benefits": [
      {
        "name": "+1 FUE o DES",
        "desc": "Aumentas Fuerza o Destreza en +1 (máximo 20)."
      },
      {
        "name": "Acometida Doble y Desenfunde",
        "desc": "Al atacar con un arma Ligera, puedes usar tu Acción Adicional para hacer un ataque extra con otra arma cuerpo a cuerpo sin la propiedad Pesada. Puedes desenfundar o guardar dos armas a la vez."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-durable",
    "slug": "durable",
    "name": "Resistente",
    "nameEn": "Durable",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+",
    "prerequisiteEn": "Level 4+",
    "abilityBonus": {
      "stats": [
        "con"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Sobrevives a heridas mortales y gastas Dados de Golpe como Acción Adicional en pleno combate.",
    "descriptionEn": "Recover quickly in battle and resist death.",
    "benefits": [
      {
        "name": "+1 Constitución",
        "desc": "Aumentas Constitución en +1 (máximo 20)."
      },
      {
        "name": "Desafiar a la Muerte y Reanimación",
        "desc": "Ventaja en tiradas de salvación contra la Muerte. Como Acción Adicional, puedes gastar uno de tus Dados de Golpe y recuperar los PG tirados."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-elemental-adept",
    "slug": "elemental-adept",
    "name": "Adepto Elemental",
    "nameEn": "Elemental Adept",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, Lanzamiento de Conjuros o Magia de Pacto",
    "prerequisiteEn": "Level 4+, Spellcasting or Pact Magic",
    "abilityBonus": {
      "stats": [
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Tus conjuros elementales perforan resistencias y elevan sus tiradas mínimas de daño.",
    "descriptionEn": "Your chosen elemental spells ignore resistance and deal stronger minimum damage.",
    "benefits": [
      {
        "name": "+1 INT, SAB o CAR",
        "desc": "Aumentas Inteligencia, Sabiduría o Carisma en +1 (máximo 20)."
      },
      {
        "name": "Maestría Elemental",
        "desc": "Elige Ácido, Frío, Fuego, Relámpago o Trueno. Tus conjuros ignoran Resistencia a ese daño y cualquier 1 en los dados de daño cuenta como 2."
      }
    ],
    "source": "Player's Handbook (2024)",
    "repeatable": true,
    "subChoiceType": "elemental-adept"
  },
  {
    "id": "feat-2024-fey-touched",
    "slug": "fey-touched",
    "name": "Tocado por los Fey",
    "nameEn": "Fey Touched",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+",
    "prerequisiteEn": "Level 4+",
    "abilityBonus": {
      "stats": [
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "La magia feérica imbuye tu sangre otorgándote Paso Brumoso y un conjuro de Adivinación o Encantamiento.",
    "descriptionEn": "Fey magic grants Misty Step and another Divination or Enchantment spell.",
    "benefits": [
      {
        "name": "+1 INT, SAB o CAR",
        "desc": "Aumentas Inteligencia, Sabiduría o Carisma en +1 (máximo 20)."
      },
      {
        "name": "Magia Feérica",
        "desc": "Siempre tienes preparados Paso Brumoso y 1 conjuro de nivel 1 de Adivinación o Encantamiento. Puedes lanzar cada uno 1 vez por Descanso Largo sin gastar espacio."
      }
    ],
    "source": "Player's Handbook (2024)",
    "subChoiceType": "fey-touched"
  },
  {
    "id": "feat-2024-grappler",
    "slug": "grappler",
    "name": "Luchador de Presa",
    "nameEn": "Grappler",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, FUE o DES 13+",
    "prerequisiteEn": "Level 4+, STR or DEX 13+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Apresas enemigos automáticamente al golpear desarmado, atacas con Ventaja a tus presas y los arrastras sin penalización.",
    "descriptionEn": "Seize targets on unarmed hits and drag them at full speed.",
    "benefits": [
      {
        "name": "+1 FUE o DES",
        "desc": "Aumentas Fuerza o Destreza en +1 (máximo 20)."
      },
      {
        "name": "Puñetazo y Presa",
        "desc": "Una vez por turno cuando golpeas con un Golpe Desarmado, puedes dañar Y apresar a la vez. Tienes Ventaja en ataques contra criaturas apresadas por ti y no ves reducida tu velocidad al mover objetivos de tu tamaño o menor."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-great-weapon-master",
    "slug": "great-weapon-master",
    "name": "Maestro de Armas Grandes",
    "nameEn": "Great Weapon Master",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, FUE 13+",
    "prerequisiteEn": "Level 4+, STR 13+",
    "abilityBonus": {
      "stats": [
        "str"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Añades tu Bono de Competencia al daño de armas pesadas y encadenas ataques tras críticos o bajas.",
    "descriptionEn": "Unleash devastating Heavy weapon blows and bonus cleaves.",
    "benefits": [
      {
        "name": "+1 Fuerza",
        "desc": "Aumentas Fuerza en +1 (máximo 20)."
      },
      {
        "name": "Maestría en Armas Pesadas y Tajo",
        "desc": "Cuando golpeas en tu acción de Atacar con un arma con la propiedad Pesada, infliges daño extra igual a tu Bono de Competencia. Tras un Crítico o reducir a un rival a 0 PG con un arma cuerpo a cuerpo, haces otro ataque como Acción Adicional."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-heavily-armored",
    "slug": "heavily-armored",
    "name": "Fuertemente Acorazado",
    "nameEn": "Heavily Armored",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, Entrenamiento con Armadura Media",
    "prerequisiteEn": "Level 4+, Medium Armor Training",
    "abilityBonus": {
      "stats": [
        "str",
        "con"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Dominas las armaduras pesadas más sólidas sin ralentizarte en formación.",
    "descriptionEn": "Gain Heavy Armor training.",
    "benefits": [
      {
        "name": "+1 FUE o CON",
        "desc": "Aumentas Fuerza o Constitución en +1 (máximo 20)."
      },
      {
        "name": "Entrenamiento Pesado",
        "desc": "Obtienes entrenamiento con Armaduras Pesadas."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-heavy-armor-master",
    "slug": "heavy-armor-master",
    "name": "Maestro en Armadura Pesada",
    "nameEn": "Heavy Armor Master",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, FUE 13+, Armadura Pesada",
    "prerequisiteEn": "Level 4+, STR 13+, Heavy Armor Training",
    "abilityBonus": {
      "stats": [
        "str",
        "con"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Tu coraza pesada reduce todo daño físico contundente, cortante y perforante según tu Bono de Competencia.",
    "descriptionEn": "Heavy armor absorbs physical damage equal to your Proficiency Bonus.",
    "benefits": [
      {
        "name": "+1 FUE o CON",
        "desc": "Aumentas Fuerza o Constitución en +1 (máximo 20)."
      },
      {
        "name": "Reducción de Daño",
        "desc": "Llevando armadura pesada, el daño contundente, cortante y perforante de ataques se reduce en una cantidad igual a tu Bono de Competencia."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-inspiring-leader",
    "slug": "inspiring-leader",
    "name": "Líder Inspirador",
    "nameEn": "Inspiring Leader",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, SAB o CAR 13+",
    "prerequisiteEn": "Level 4+, WIS or CHA 13+",
    "abilityBonus": {
      "stats": [
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Infundes determinación en tu grupo tras cada descanso con PG temporales.",
    "descriptionEn": "Bolster allies with temporary hit points after each rest.",
    "benefits": [
      {
        "name": "+1 SAB o CAR",
        "desc": "Aumentas Sabiduría o Carisma en +1 (máximo 20)."
      },
      {
        "name": "Actuación Alentadora",
        "desc": "Al terminar un Descanso Corto o Largo, hasta 6 criaturas a 30 pies ganan PG temporales iguales a tu nivel + tu modificador de la característica aumentada por esta dote."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-keen-mind",
    "slug": "keen-mind",
    "name": "Mente Aguda",
    "nameEn": "Keen Mind",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, INT 13+",
    "prerequisiteEn": "Level 4+, INT 13+",
    "abilityBonus": {
      "stats": [
        "int"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Tu intelecto analítico domina saberes teóricos y examina el entorno como Acción Adicional.",
    "descriptionEn": "Sharpen analytical lore skills and Study in combat.",
    "benefits": [
      {
        "name": "+1 Inteligencia",
        "desc": "Aumentas Inteligencia en +1 (máximo 20)."
      },
      {
        "name": "Estudio Rápido y Saberes",
        "desc": "Ganas competencia (o Pericia si ya eras competente) en Conocimiento Arcano, Historia, Investigación, Naturaleza o Religión. Puedes tomar la acción Estudiar como Acción Adicional."
      }
    ],
    "source": "Player's Handbook (2024)",
    "subChoiceType": "keen-mind"
  },
  {
    "id": "feat-2024-lightly-armored",
    "slug": "lightly-armored",
    "name": "Ligeramente Acorazado",
    "nameEn": "Lightly Armored",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+",
    "prerequisiteEn": "Level 4+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Adquieres entrenamiento marcial básico con armaduras ligeras y escudos.",
    "descriptionEn": "Gain training with Light Armor and Shields.",
    "benefits": [
      {
        "name": "+1 FUE o DES",
        "desc": "Aumentas Fuerza o Destreza en +1 (máximo 20)."
      },
      {
        "name": "Protección Ligera",
        "desc": "Obtienes entrenamiento con Armaduras Ligeras y Escudos."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-mage-slayer",
    "slug": "mage-slayer",
    "name": "Matamagos",
    "nameEn": "Mage Slayer",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+",
    "prerequisiteEn": "Level 4+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Rompes la concentración de los lanzadores de conjuros y superas sus sortilegios mentales automáticamente una vez por descanso.",
    "descriptionEn": "Disrupt spellcaster concentration and shrug off mental saves.",
    "benefits": [
      {
        "name": "+1 FUE o DES",
        "desc": "Aumentas Fuerza o Destreza en +1 (máximo 20)."
      },
      {
        "name": "Rompeconcentración y Mente Blindada",
        "desc": "Las criaturas que dañes tienen Desventaja para mantener Concentración. Si fallas una salvación de INT, SAB o CAR, puedes elegir superarla automáticamente (1 vez por Descanso Corto o Largo)."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-medium-armor-master",
    "slug": "medium-armor-master",
    "name": "Maestro en Armadura Media",
    "nameEn": "Medium Armor Master",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, Entrenamiento con Armadura Media",
    "prerequisiteEn": "Level 4+, Medium Armor Training",
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Aprovechas hasta +3 de tu modificador de Destreza al llevar armadura media sin penalizarte al sigilo.",
    "descriptionEn": "Raise Dexterity AC cap in Medium Armor to +3.",
    "benefits": [
      {
        "name": "+1 FUE o DES",
        "desc": "Aumentas Fuerza o Destreza en +1 (máximo 20)."
      },
      {
        "name": "Defensa Ágil",
        "desc": "Con Armadura Media y DES 16+, puedes sumar +3 a tu CA (en vez de +2)."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-moderately-armored",
    "slug": "moderately-armored",
    "name": "Moderadamente Acorazado",
    "nameEn": "Moderately Armored",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, Entrenamiento con Armadura Ligera",
    "prerequisiteEn": "Level 4+, Light Armor Training",
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Aumentas tu protección adquiriendo entrenamiento en Armaduras Medias.",
    "descriptionEn": "Gain training with Medium Armor.",
    "benefits": [
      {
        "name": "+1 FUE o DES",
        "desc": "Aumentas Fuerza o Destreza en +1 (máximo 20)."
      },
      {
        "name": "Entrenamiento Medio",
        "desc": "Obtienes entrenamiento con Armaduras Medias."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-mounted-combatant",
    "slug": "mounted-combatant",
    "name": "Combatiente Montado",
    "nameEn": "Mounted Combatant",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+",
    "prerequisiteEn": "Level 4+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex",
        "wis"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Luchas con maestría desde la silla protegiendo a tu montura y atacando con Ventaja a objetivos a pie.",
    "descriptionEn": "Dominate battle from horseback and shield your mount.",
    "benefits": [
      {
        "name": "+1 FUE, DES o SAB",
        "desc": "Aumentas Fuerza, Destreza o Sabiduría en +1 (máximo 20)."
      },
      {
        "name": "Jinete Experto",
        "desc": "Ventaja en ataques cuerpo a cuerpo contra criaturas desmontadas menores que tu montura, puedes desviar ataques dirigidos a ella hacia ti y darle Evasión ante salvaciones de Destreza."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-observant",
    "slug": "observant",
    "name": "Observador",
    "nameEn": "Observant",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, INT o SAB 13+",
    "prerequisiteEn": "Level 4+, INT or WIS 13+",
    "abilityBonus": {
      "stats": [
        "int",
        "wis"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Tus sentidos captan los detalles más imperceptibles y buscas amenazas como Acción Adicional.",
    "descriptionEn": "Enhance Investigation or Perception and Search as a Bonus Action.",
    "benefits": [
      {
        "name": "+1 INT o SAB",
        "desc": "Aumentas Inteligencia o Sabiduría en +1 (máximo 20)."
      },
      {
        "name": "Ojo Clínico",
        "desc": "Ganas competencia (o Pericia si ya la tienes) en Perspicacia, Investigación o Percepción. Puedes usar la acción Buscar como Acción Adicional."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-piercer",
    "slug": "piercer",
    "name": "Perforador",
    "nameEn": "Piercer",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+",
    "prerequisiteEn": "Level 4+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Tus estocadas y flechas encuentran siempre las grietas de la armadura, repitiendo tiradas bajas y multiplicando críticos.",
    "descriptionEn": "Reroll weak piercing dice and add an extra die on criticals.",
    "benefits": [
      {
        "name": "+1 FUE o DES",
        "desc": "Aumentas Fuerza o Destreza en +1 (máximo 20)."
      },
      {
        "name": "Impacto Perforante",
        "desc": "Una vez por turno puedes volver a tirar un dado de daño perforante. En golpes críticos perforantes, tiras un dado de daño adicional."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-poisoner",
    "slug": "poisoner",
    "name": "Envenenador",
    "nameEn": "Poisoner",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+",
    "prerequisiteEn": "Level 4+",
    "abilityBonus": {
      "stats": [
        "dex",
        "int"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Preparas venenos letales que ignoran resistencia y recubres armas o munición como Acción Adicional.",
    "descriptionEn": "Brew potent toxins, apply them swiftly, and bypass Poison Resistance.",
    "benefits": [
      {
        "name": "+1 DES o INT",
        "desc": "Aumentas Destreza o Inteligencia en +1 (máximo 20) y competencia con Kit de Envenenador."
      },
      {
        "name": "Toxina Mortal",
        "desc": "Tu daño de veneno ignora Resistencia. Puedes aplicar veneno como Acción Adicional y elaborar dosis potentes (CD 8 + DES/INT + Comp.; 2d8 veneno y Envenenado)."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-polearm-master",
    "slug": "polearm-master",
    "name": "Maestro de Armas de Asta",
    "nameEn": "Polearm Master",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, FUE o DES 13+",
    "prerequisiteEn": "Level 4+, STR or DEX 13+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Mantienes a los enemigos a raya con golpes de empuñadura como Acción Adicional y ataques de oportunidad al acercarse.",
    "descriptionEn": "Strike with the haft as a Bonus Action and react when foes enter reach.",
    "benefits": [
      {
        "name": "+1 FUE o DES",
        "desc": "Aumentas Fuerza o Destreza en +1 (máximo 20)."
      },
      {
        "name": "Golpe de Asta y Golpe Reactivo",
        "desc": "Tras atacar con Bastón, Lanza o arma Pesada de Alcance, usas tu Acción Adicional para golpear con el extremo opuesto (1d4 contundente). Cuando una criatura entra en tu alcance, usas tu Reacción para atacarla."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-resilient",
    "slug": "resilient",
    "name": "Resiliente",
    "nameEn": "Resilient",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+",
    "prerequisiteEn": "Level 4+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex",
        "con",
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Refuerzas tu temple para resistir conjuros y efectos adversos obteniendo competencia en una salvación.",
    "descriptionEn": "Gain proficiency in one additional saving throw.",
    "benefits": [
      {
        "name": "+1 Característica y Salvación",
        "desc": "Elige una característica sin competencia en salvación: aumenta en +1 (máximo 20) y ganas competencia en sus tiradas de salvación."
      }
    ],
    "source": "Player's Handbook (2024)",
    "subChoiceType": "resilient"
  },
  {
    "id": "feat-2024-ritual-caster",
    "slug": "ritual-caster",
    "name": "Lanzador de Rituales",
    "nameEn": "Ritual Caster",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, INT, SAB o CAR 13+",
    "prerequisiteEn": "Level 4+, INT, WIS or CHA 13+",
    "abilityBonus": {
      "stats": [
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Amplías tu repertorio con conjuros rituales de nivel 1 y lanzas uno al instante al día.",
    "descriptionEn": "Learn 1st-level ritual spells and cast one instantly once per Long Rest.",
    "benefits": [
      {
        "name": "+1 INT, SAB o CAR",
        "desc": "Aumentas Inteligencia, Sabiduría o Carisma en +1 (máximo 20)."
      },
      {
        "name": "Rituales Preparados y Ritual Rápido",
        "desc": "Eliges tantos conjuros de nivel 1 con la etiqueta Ritual como tu Bono de Competencia (siempre preparados). Una vez por Descanso Largo puedes lanzar uno en su tiempo normal sin gastar espacio."
      }
    ],
    "source": "Player's Handbook (2024)",
    "subChoiceType": "ritual-caster"
  },
  {
    "id": "feat-2024-sentinel",
    "slug": "sentinel",
    "name": "Centinela",
    "nameEn": "Sentinel",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, FUE o DES 13+",
    "prerequisiteEn": "Level 4+, STR or DEX 13+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Controlas el frente de batalla deteniendo en seco a quien intenta escapar o golpear a tus aliados.",
    "descriptionEn": "Punish enemies who disengage or attack allies, reducing speed to 0 on hit.",
    "benefits": [
      {
        "name": "+1 FUE o DES",
        "desc": "Aumentas Fuerza o Destreza en +1 (máximo 20)."
      },
      {
        "name": "Guardián e Inmovilizar",
        "desc": "Si una criatura a 5 pies se Desengancha o ataca a otro objetivo, puedes hacer un ataque de oportunidad. Todo impacto de ataque de oportunidad reduce su Velocidad a 0 ese turno."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-shadow-touched",
    "slug": "shadow-touched",
    "name": "Tocado por las Sombras",
    "nameEn": "Shadow Touched",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+",
    "prerequisiteEn": "Level 4+",
    "abilityBonus": {
      "stats": [
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "La esencia del Páramo Sombrío te concede Invisibilidad y un conjuro de Ilusión o Nigromancia.",
    "descriptionEn": "Shadowfell magic grants Invisibility and one Illusion or Necromancy spell.",
    "benefits": [
      {
        "name": "+1 INT, SAB o CAR",
        "desc": "Aumentas Inteligencia, Sabiduría o Carisma en +1 (máximo 20)."
      },
      {
        "name": "Magia Sombría",
        "desc": "Siempre tienes preparados Invisibilidad y 1 conjuro de nivel 1 de Ilusión o Nigromancia. Puedes lanzar cada uno 1 vez por Descanso Largo sin gastar espacio."
      }
    ],
    "source": "Player's Handbook (2024)",
    "subChoiceType": "shadow-touched"
  },
  {
    "id": "feat-2024-sharpshooter",
    "slug": "sharpshooter",
    "name": "Tirador Certero",
    "nameEn": "Sharpshooter",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, DES 13+",
    "prerequisiteEn": "Level 4+, DEX 13+",
    "abilityBonus": {
      "stats": [
        "dex"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Tus disparos ignoran coberturas parciales, el combate a quemarropa y la penalización de alcance largo.",
    "descriptionEn": "Ignore half/three-quarters cover, long-range disadvantage, and melee penalty.",
    "benefits": [
      {
        "name": "+1 Destreza",
        "desc": "Aumentas Destreza en +1 (máximo 20)."
      },
      {
        "name": "Puntería Letal",
        "desc": "Ignoras cobertura media y tres cuartos, no tienes Desventaja al disparar a 5 pies de un enemigo, y atacar a alcance largo no impone Desventaja."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-shield-master",
    "slug": "shield-master",
    "name": "Maestro de Escudos",
    "nameEn": "Shield Master",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, Entrenamiento con Escudos",
    "prerequisiteEn": "Level 4+, Shield Training",
    "abilityBonus": {
      "stats": [
        "str"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Conviertes tu escudo en ariete para empujar o derribar enemigos tras atacar y mitigas explosiones mágicas.",
    "descriptionEn": "Bash foes prone or away with your shield and evade area spells.",
    "benefits": [
      {
        "name": "+1 Fuerza",
        "desc": "Aumentas Fuerza en +1 (máximo 20)."
      },
      {
        "name": "Golpe de Escudo y Escudo Interpuesto",
        "desc": "Al golpear cuerpo a cuerpo puedes obligar al rival a salvar FUE o quedar Derribado o empujado 5 pies. Si superas una salvación de DES para mitad de daño, usas tu Reacción para no recibir nada."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-skill-expert",
    "slug": "skill-expert",
    "name": "Experto en Habilidades",
    "nameEn": "Skill Expert",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+",
    "prerequisiteEn": "Level 4+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex",
        "con",
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Ganas una nueva competencia de habilidad y doble competencia (Pericia) en otra.",
    "descriptionEn": "Gain one skill proficiency and Expertise in one proficient skill.",
    "benefits": [
      {
        "name": "+1 Característica y Pericia",
        "desc": "Aumentas cualquier característica en +1 (máximo 20), ganas 1 competencia de habilidad y Pericia en 1 habilidad que domines."
      }
    ],
    "source": "Player's Handbook (2024)",
    "subChoiceType": "skill-expert"
  },
  {
    "id": "feat-2024-skulker",
    "slug": "skulker",
    "name": "Acechador",
    "nameEn": "Skulker",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, DES 13+",
    "prerequisiteEn": "Level 4+, DEX 13+",
    "abilityBonus": {
      "stats": [
        "dex"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Te ocultas entre penumbras con Visión Ciega, mantienes el sigilo aunque falles y obtienes Ventaja para Esconderte.",
    "descriptionEn": "Gains Blindsight 10 ft, Advantage on Hide, and stay hidden on missed attacks.",
    "benefits": [
      {
        "name": "+1 Destreza",
        "desc": "Aumentas Destreza en +1 (máximo 20)."
      },
      {
        "name": "Sombra Letal",
        "desc": "Ganas Visión Ciega a 10 pies. Tienes Ventaja en pruebas de Sigilo para Esconderte en combate, y fallar un ataque mientras estás oculto no revela tu posición."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-slasher",
    "slug": "slasher",
    "name": "Cortador",
    "nameEn": "Slasher",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+",
    "prerequisiteEn": "Level 4+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Tus tajos frenan el avance de tus víctimas y desestabilizan su guardia con golpes críticos.",
    "descriptionEn": "Slow targets by 10 feet on slashing hits and hinder attacks on criticals.",
    "benefits": [
      {
        "name": "+1 FUE o DES",
        "desc": "Aumentas Fuerza o Destreza en +1 (máximo 20)."
      },
      {
        "name": "Corte Lento y Herida Crítica",
        "desc": "Una vez por turno al causar daño cortante, reduces la Velocidad del objetivo en 10 pies hasta tu siguiente turno. Los críticos cortantes le imponen Desventaja en ataques."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-speedy",
    "slug": "speedy",
    "name": "Veloz",
    "nameEn": "Speedy",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, DES o CON 13+",
    "prerequisiteEn": "Level 4+, DEX or CON 13+",
    "abilityBonus": {
      "stats": [
        "dex",
        "con"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Tu paso supera terrenos difíciles al correr y evades los ataques de oportunidad.",
    "descriptionEn": "Increase speed by 10 feet and slip past opportunity attacks.",
    "benefits": [
      {
        "name": "+1 DES o CON",
        "desc": "Aumentas Destreza o Constitución en +1 (máximo 20)."
      },
      {
        "name": "Pies Ligeros",
        "desc": "Tu Velocidad aumenta en +10 pies. El terreno difícil no consume movimiento extra al usar Correr (Dash), y los ataques de oportunidad contra ti tienen Desventaja."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-spell-sniper",
    "slug": "spell-sniper",
    "name": "Francotirador de Conjuros",
    "nameEn": "Spell Sniper",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, Lanzamiento de Conjuros o Magia de Pacto",
    "prerequisiteEn": "Level 4+, Spellcasting or Pact Magic",
    "abilityBonus": {
      "stats": [
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Tus rayos y ataques mágicos perforan coberturas, ignoran cuerpo a cuerpo y alcanzan 60 pies más lejos.",
    "descriptionEn": "Spell attacks bypass cover, fire in melee cleanly, and reach 60 ft farther.",
    "benefits": [
      {
        "name": "+1 INT, SAB o CAR",
        "desc": "Aumentas Inteligencia, Sabiduría o Carisma en +1 (máximo 20)."
      },
      {
        "name": "Alcance y Puntería Arcana",
        "desc": "Tus ataques de conjuro ignoran cobertura media/tres cuartos, no sufren Desventaja a 5 pies, y todo conjuro de ataque con alcance 10+ pies gana +60 pies de alcance."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-telekinetic",
    "slug": "telekinetic",
    "name": "Telequinético",
    "nameEn": "Telekinetic",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+",
    "prerequisiteEn": "Level 4+",
    "abilityBonus": {
      "stats": [
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Mueves objetos con Mano de Mago invisible y empujas o atraes criaturas 5 pies como Acción Adicional.",
    "descriptionEn": "Wield an invisible Mage Hand and shove creatures 5 ft with your mind.",
    "benefits": [
      {
        "name": "+1 INT, SAB o CAR",
        "desc": "Aumentas Inteligencia, Sabiduría o Carisma en +1 (máximo 20)."
      },
      {
        "name": "Mano de Mago y Empujón Mental",
        "desc": "Aprendes Mano de Mago invisible (sin componentes V/S, +30 pies si ya la conocías). Como Acción Adicional puedes empujar o atraer 5 pies a una criatura a 30 pies (salvación FUE)."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-telepathic",
    "slug": "telepathic",
    "name": "Telepático",
    "nameEn": "Telepathic",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+",
    "prerequisiteEn": "Level 4+",
    "abilityBonus": {
      "stats": [
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Proyectas tu mente a 60 pies sin palabras y lanzas Detectar Pensamientos cada día.",
    "descriptionEn": "Speak telepathically within 60 feet and cast Detect Thoughts.",
    "benefits": [
      {
        "name": "+1 INT, SAB o CAR",
        "desc": "Aumentas Inteligencia, Sabiduría o Carisma en +1 (máximo 20)."
      },
      {
        "name": "Vínculo Mental",
        "desc": "Hablas telepáticamente a 60 pies con criaturas que entiendan al menos un idioma. Tienes preparado Detectar Pensamientos y lo lanzas 1 vez por Descanso Largo sin espacio."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-war-caster",
    "slug": "war-caster",
    "name": "Conjurador de Guerra",
    "nameEn": "War Caster",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+, Lanzamiento de Conjuros o Magia de Pacto",
    "prerequisiteEn": "Level 4+, Spellcasting or Pact Magic",
    "abilityBonus": {
      "stats": [
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Proteges tu Concentración con Ventaja, lanzas conjuros con armas o escudo y usas hechizos como Reacción.",
    "descriptionEn": "Advantage on Concentration saves, somatic casting with full hands, and spell reactions.",
    "benefits": [
      {
        "name": "+1 INT, SAB o CAR",
        "desc": "Aumentas Inteligencia, Sabiduría o Carisma en +1 (máximo 20)."
      },
      {
        "name": "Concentración y Hechizo Reactivo",
        "desc": "Ventaja en salvaciones de Constitución para mantener Concentración. Haces componentes somáticos incluso empuñando armas o escudo, y usas tu Reacción para lanzar un conjuro de 1 acción a quien salga de tu alcance."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-weapon-master",
    "slug": "weapon-master",
    "name": "Maestro de Armas",
    "nameEn": "Weapon Master",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "prerequisiteLevel": 4,
    "prerequisite": "Nivel 4+",
    "prerequisiteEn": "Level 4+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1,
      "maxCap": 20
    },
    "description": "Adoptas las propiedades de Maestría de Arma de un arma sencilla o marcial y puedes cambiarla tras descansar.",
    "descriptionEn": "Gain access to Weapon Mastery properties even on non-martial classes.",
    "benefits": [
      {
        "name": "+1 FUE o DES",
        "desc": "Aumentas Fuerza o Destreza en +1 (máximo 20)."
      },
      {
        "name": "Maestría Versátil",
        "desc": "Eliges un tipo de arma sencilla o marcial y puedes utilizar su propiedad de Maestría de Arma (puedes cambiar de arma elegida tras un Descanso Largo)."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-boon-of-combat-prowess",
    "slug": "boon-of-combat-prowess",
    "name": "Bendición de la Destreza Marcial",
    "nameEn": "Boon of Combat Prowess",
    "category": "Bendición Épica (Nivel 19+)",
    "categoryEn": "Epic Boon (Level 19+)",
    "edition": "5.5e",
    "prerequisiteLevel": 19,
    "prerequisite": "Nivel 19+",
    "prerequisiteEn": "Level 19+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex",
        "con",
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 30
    },
    "description": "Cuando fallas una tirada de ataque, puedes decidir impactar igualmente (se recarga al tirar Iniciativa o tras un Descanso Corto o Largo).",
    "descriptionEn": "When you miss with an attack roll, choose to hit instead (once per initiative or rest).",
    "benefits": [
      {
        "name": "+1 Característica (Máx. 30)",
        "desc": "Aumentas cualquier característica en +1, elevando el tope máximo a 30."
      },
      {
        "name": "Bendición de la Destreza Marcial",
        "nameEn": "Boon of Combat Prowess",
        "desc": "Cuando fallas una tirada de ataque, puedes decidir impactar igualmente (se recarga al tirar Iniciativa o tras un Descanso Corto o Largo).",
        "descEn": "When you miss with an attack roll, choose to hit instead (once per initiative or rest)."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-boon-of-dimensional-travel",
    "slug": "boon-of-dimensional-travel",
    "name": "Bendición del Viaje Dimensional",
    "nameEn": "Boon of Dimensional Travel",
    "category": "Bendición Épica (Nivel 19+)",
    "categoryEn": "Epic Boon (Level 19+)",
    "edition": "5.5e",
    "prerequisiteLevel": 19,
    "prerequisite": "Nivel 19+",
    "prerequisiteEn": "Level 19+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex",
        "con",
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 30
    },
    "description": "Inmediatamente después de tomar la acción Atacar o Magia, puedes teletransportarte hasta 30 pies a un espacio desocupado visible.",
    "descriptionEn": "Teleport up to 30 ft immediately after taking the Attack or Magic action.",
    "benefits": [
      {
        "name": "+1 Característica (Máx. 30)",
        "desc": "Aumentas cualquier característica en +1, elevando el tope máximo a 30."
      },
      {
        "name": "Bendición del Viaje Dimensional",
        "nameEn": "Boon of Dimensional Travel",
        "desc": "Inmediatamente después de tomar la acción Atacar o Magia, puedes teletransportarte hasta 30 pies a un espacio desocupado visible.",
        "descEn": "Teleport up to 30 ft immediately after taking the Attack or Magic action."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-boon-of-energy-resistance",
    "slug": "boon-of-energy-resistance",
    "name": "Bendición de la Resistencia Elemental",
    "nameEn": "Boon of Energy Resistance",
    "category": "Bendición Épica (Nivel 19+)",
    "categoryEn": "Epic Boon (Level 19+)",
    "edition": "5.5e",
    "prerequisiteLevel": 19,
    "prerequisite": "Nivel 19+",
    "prerequisiteEn": "Level 19+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex",
        "con",
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 30
    },
    "description": "Ganas Resistencia a dos tipos de daño elemental (cambiables en Descanso Largo). Como Reacción al recibir ese daño, devuelves 2d12 + CON a una criatura a 60 pies (salv. DES).",
    "descriptionEn": "Gain Resistance to two energy damage types and reflect 2d12 + CON damage as a Reaction.",
    "benefits": [
      {
        "name": "+1 Característica (Máx. 30)",
        "desc": "Aumentas cualquier característica en +1, elevando el tope máximo a 30."
      },
      {
        "name": "Bendición de la Resistencia Elemental",
        "nameEn": "Boon of Energy Resistance",
        "desc": "Ganas Resistencia a dos tipos de daño elemental (cambiables en Descanso Largo). Como Reacción al recibir ese daño, devuelves 2d12 + CON a una criatura a 60 pies (salv. DES).",
        "descEn": "Gain Resistance to two energy damage types and reflect 2d12 + CON damage as a Reaction."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-boon-of-fate",
    "slug": "boon-of-fate",
    "name": "Bendición del Destino",
    "nameEn": "Boon of Fate",
    "category": "Bendición Épica (Nivel 19+)",
    "categoryEn": "Epic Boon (Level 19+)",
    "edition": "5.5e",
    "prerequisiteLevel": 19,
    "prerequisite": "Nivel 19+",
    "prerequisiteEn": "Level 19+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex",
        "con",
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 30
    },
    "description": "Cuando tú o una criatura a 60 pies supere o falle una prueba d20, tiras 2d4 y los sumas o restas al resultado (1 vez por iniciativa o descanso).",
    "descriptionEn": "Add or subtract 2d4 from any d20 test within 60 ft once per initiative or rest.",
    "benefits": [
      {
        "name": "+1 Característica (Máx. 30)",
        "desc": "Aumentas cualquier característica en +1, elevando el tope máximo a 30."
      },
      {
        "name": "Bendición del Destino",
        "nameEn": "Boon of Fate",
        "desc": "Cuando tú o una criatura a 60 pies supere o falle una prueba d20, tiras 2d4 y los sumas o restas al resultado (1 vez por iniciativa o descanso).",
        "descEn": "Add or subtract 2d4 from any d20 test within 60 ft once per initiative or rest."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-boon-of-fortitude",
    "slug": "boon-of-fortitude",
    "name": "Bendición de la Fortaleza",
    "nameEn": "Boon of Fortitude",
    "category": "Bendición Épica (Nivel 19+)",
    "categoryEn": "Epic Boon (Level 19+)",
    "edition": "5.5e",
    "prerequisiteLevel": 19,
    "prerequisite": "Nivel 19+",
    "prerequisiteEn": "Level 19+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex",
        "con",
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 30
    },
    "description": "Tus PG máximos aumentan en +40 y, una vez por turno al recuperar PG, sumas tu modificador de Constitución adicional.",
    "descriptionEn": "Increase max HP by 40 and add your Constitution modifier once per turn when healed.",
    "benefits": [
      {
        "name": "+1 Característica (Máx. 30)",
        "desc": "Aumentas cualquier característica en +1, elevando el tope máximo a 30."
      },
      {
        "name": "Bendición de la Fortaleza",
        "nameEn": "Boon of Fortitude",
        "desc": "Tus PG máximos aumentan en +40 y, una vez por turno al recuperar PG, sumas tu modificador de Constitución adicional.",
        "descEn": "Increase max HP by 40 and add your Constitution modifier once per turn when healed."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-boon-of-irresistible-offense",
    "slug": "boon-of-irresistible-offense",
    "name": "Bendición de la Ofensiva Imparable",
    "nameEn": "Boon of Irresistible Offense",
    "category": "Bendición Épica (Nivel 19+)",
    "categoryEn": "Epic Boon (Level 19+)",
    "edition": "5.5e",
    "prerequisiteLevel": 19,
    "prerequisite": "Nivel 19+",
    "prerequisiteEn": "Level 19+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1,
      "maxCap": 30
    },
    "description": "Tu daño contundente, cortante y perforante ignora Resistencia. Si sacas un 20 natural en un ataque, añades daño extra igual a tu puntuación de FUE o DES.",
    "descriptionEn": "Bludgeoning, Piercing, and Slashing damage ignore Resistance; add ability score damage on a natural 20.",
    "benefits": [
      {
        "name": "+1 Característica (Máx. 30)",
        "desc": "Aumentas STR/DEX en +1, elevando el tope máximo a 30."
      },
      {
        "name": "Bendición de la Ofensiva Imparable",
        "nameEn": "Boon of Irresistible Offense",
        "desc": "Tu daño contundente, cortante y perforante ignora Resistencia. Si sacas un 20 natural en un ataque, añades daño extra igual a tu puntuación de FUE o DES.",
        "descEn": "Bludgeoning, Piercing, and Slashing damage ignore Resistance; add ability score damage on a natural 20."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-boon-of-recovery",
    "slug": "boon-of-recovery",
    "name": "Bendición de la Recuperación",
    "nameEn": "Boon of Recovery",
    "category": "Bendición Épica (Nivel 19+)",
    "categoryEn": "Epic Boon (Level 19+)",
    "edition": "5.5e",
    "prerequisiteLevel": 19,
    "prerequisite": "Nivel 19+",
    "prerequisiteEn": "Level 19+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex",
        "con",
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 30
    },
    "description": "Última Resistencia (1 vez por Descanso Largo, al caer a 0 PG quedas en 1 y recuperas la mitad de tus PG máximos) + reserva de diez d10 para curarte como Acción Adicional.",
    "descriptionEn": "Last Stand (once per Long Rest drop to 1 HP and regain half max HP) plus a pool of 10d10 bonus healing dice.",
    "benefits": [
      {
        "name": "+1 Característica (Máx. 30)",
        "desc": "Aumentas cualquier característica en +1, elevando el tope máximo a 30."
      },
      {
        "name": "Bendición de la Recuperación",
        "nameEn": "Boon of Recovery",
        "desc": "Última Resistencia (1 vez por Descanso Largo, al caer a 0 PG quedas en 1 y recuperas la mitad de tus PG máximos) + reserva de diez d10 para curarte como Acción Adicional.",
        "descEn": "Last Stand (once per Long Rest drop to 1 HP and regain half max HP) plus a pool of 10d10 bonus healing dice."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-boon-of-skill",
    "slug": "boon-of-skill",
    "name": "Bendición de la Maestría",
    "nameEn": "Boon of Skill",
    "category": "Bendición Épica (Nivel 19+)",
    "categoryEn": "Epic Boon (Level 19+)",
    "edition": "5.5e",
    "prerequisiteLevel": 19,
    "prerequisite": "Nivel 19+",
    "prerequisiteEn": "Level 19+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex",
        "con",
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 30
    },
    "description": "Ganas competencia en todas las habilidades del juego y Pericia (doble competencia) en una habilidad adicional a tu elección.",
    "descriptionEn": "Gain proficiency in ALL skills plus Expertise in one skill.",
    "benefits": [
      {
        "name": "+1 Característica (Máx. 30)",
        "desc": "Aumentas cualquier característica en +1, elevando el tope máximo a 30."
      },
      {
        "name": "Bendición de la Maestría",
        "nameEn": "Boon of Skill",
        "desc": "Ganas competencia en todas las habilidades del juego y Pericia (doble competencia) en una habilidad adicional a tu elección.",
        "descEn": "Gain proficiency in ALL skills plus Expertise in one skill."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-boon-of-speed",
    "slug": "boon-of-speed",
    "name": "Bendición de la Velocidad",
    "nameEn": "Boon of Speed",
    "category": "Bendición Épica (Nivel 19+)",
    "categoryEn": "Epic Boon (Level 19+)",
    "edition": "5.5e",
    "prerequisiteLevel": 19,
    "prerequisite": "Nivel 19+",
    "prerequisiteEn": "Level 19+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex",
        "con",
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 30
    },
    "description": "Puedes tomar Desengancharse como Acción Adicional (termina si estás Apresado/Restringido) y tu Velocidad aumenta en +30 pies.",
    "descriptionEn": "Speed increases by +30 ft; take Disengage and escape Grappled as a Bonus Action.",
    "benefits": [
      {
        "name": "+1 Característica (Máx. 30)",
        "desc": "Aumentas cualquier característica en +1, elevando el tope máximo a 30."
      },
      {
        "name": "Bendición de la Velocidad",
        "nameEn": "Boon of Speed",
        "desc": "Puedes tomar Desengancharse como Acción Adicional (termina si estás Apresado/Restringido) y tu Velocidad aumenta en +30 pies.",
        "descEn": "Speed increases by +30 ft; take Disengage and escape Grappled as a Bonus Action."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-boon-of-spell-recall",
    "slug": "boon-of-spell-recall",
    "name": "Bendición de la Memoria Arcana",
    "nameEn": "Boon of Spell Recall",
    "category": "Bendición Épica (Nivel 19+)",
    "categoryEn": "Epic Boon (Level 19+)",
    "edition": "5.5e",
    "prerequisiteLevel": 19,
    "prerequisite": "Nivel 19+",
    "prerequisiteEn": "Level 19+",
    "abilityBonus": {
      "stats": [
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 30
    },
    "description": "Siempre que lances un conjuro usando un espacio de nivel 1 a 4, tira 1d4: si coincide con el nivel del espacio, ¡el espacio no se gasta!",
    "descriptionEn": "When casting a spell with a level 1-4 slot, roll 1d4; if equal to slot level, the slot is not expended.",
    "benefits": [
      {
        "name": "+1 Característica (Máx. 30)",
        "desc": "Aumentas INT/WIS/CHA en +1, elevando el tope máximo a 30."
      },
      {
        "name": "Bendición de la Memoria Arcana",
        "nameEn": "Boon of Spell Recall",
        "desc": "Siempre que lances un conjuro usando un espacio de nivel 1 a 4, tira 1d4: si coincide con el nivel del espacio, ¡el espacio no se gasta!",
        "descEn": "When casting a spell with a level 1-4 slot, roll 1d4; if equal to slot level, the slot is not expended."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-boon-of-the-night-spirit",
    "slug": "boon-of-the-night-spirit",
    "name": "Bendición del Espíritu Nocturno",
    "nameEn": "Boon of the Night Spirit",
    "category": "Bendición Épica (Nivel 19+)",
    "categoryEn": "Epic Boon (Level 19+)",
    "edition": "5.5e",
    "prerequisiteLevel": 19,
    "prerequisite": "Nivel 19+",
    "prerequisiteEn": "Level 19+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex",
        "con",
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 30
    },
    "description": "En Luz Tenue u Oscuridad puedes volverte Invisible como Acción Adicional y ganas Resistencia a todo daño excepto Psíquico y Radiante.",
    "descriptionEn": "Become Invisible as a Bonus Action and resist non-Psychic/non-Radiant damage in Dim Light or Darkness.",
    "benefits": [
      {
        "name": "+1 Característica (Máx. 30)",
        "desc": "Aumentas cualquier característica en +1, elevando el tope máximo a 30."
      },
      {
        "name": "Bendición del Espíritu Nocturno",
        "nameEn": "Boon of the Night Spirit",
        "desc": "En Luz Tenue u Oscuridad puedes volverte Invisible como Acción Adicional y ganas Resistencia a todo daño excepto Psíquico y Radiante.",
        "descEn": "Become Invisible as a Bonus Action and resist non-Psychic/non-Radiant damage in Dim Light or Darkness."
      }
    ],
    "source": "Player's Handbook (2024)"
  },
  {
    "id": "feat-2024-boon-of-truesight",
    "slug": "boon-of-truesight",
    "name": "Bendición de la Visión Verdadera",
    "nameEn": "Boon of Truesight",
    "category": "Bendición Épica (Nivel 19+)",
    "categoryEn": "Epic Boon (Level 19+)",
    "edition": "5.5e",
    "prerequisiteLevel": 19,
    "prerequisite": "Nivel 19+",
    "prerequisiteEn": "Level 19+",
    "abilityBonus": {
      "stats": [
        "str",
        "dex",
        "con",
        "int",
        "wis",
        "cha"
      ],
      "amount": 1,
      "maxCap": 30
    },
    "description": "Obtienes Visión Verdadera (Truesight) permanente con un alcance de 60 pies.",
    "descriptionEn": "You gain Truesight out to a range of 60 feet.",
    "benefits": [
      {
        "name": "+1 Característica (Máx. 30)",
        "desc": "Aumentas cualquier característica en +1, elevando el tope máximo a 30."
      },
      {
        "name": "Bendición de la Visión Verdadera",
        "nameEn": "Boon of Truesight",
        "desc": "Obtienes Visión Verdadera (Truesight) permanente con un alcance de 60 pies.",
        "descEn": "You gain Truesight out to a range of 60 feet."
      }
    ],
    "source": "Player's Handbook (2024)"
  }
];
