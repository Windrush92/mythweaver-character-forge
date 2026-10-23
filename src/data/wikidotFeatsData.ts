// COMPENDIO COMPLETO DE 154 DOTES OFICIALES DE D&D 5E (WIKIDOT)
// Ingestado y sincronizado automáticamente con paridad 1:1

import { OfficialFeat } from './characterCreatorData';

export const ALL_WIKIDOT_FEATS: OfficialFeat[] = [
  {
    "id": "aberrant-dragonmark",
    "name": "Aberrant Dragonmark (Aberrant Dragonmark)",
    "nameEn": "Aberrant Dragonmark",
    "source": "Eberron - Rising from the Last War",
    "category": "Magia",
    "prerequisite": "No other dragonmark",
    "description": "You have manifested an aberrant dragonmark. Determine its appearance and the flaw associated with it. You gain the following benefits:",
    "benefits": [
      "Increase your Constitution score by 1, to a maximum of 20.",
      "You learn a cantrip of your choice from the sorcerer spell list. In addition, choose a 1st-level spell from the sorcerer spell list. You learn that spell and can cast it through your mark. Once you cast it, you must finish a short or long rest before you can cast it again through the mark. Constitution is your spellcasting ability for these spells.",
      "When you cast the 1st-level spell through your mark, you can expend one of your Hit Dice and roll it. If you roll an even number, you gain a number of temporary hit points equal to the number rolled. If you roll an odd number, one random creature within 30 feet of you (not including you) takes force damage equal to the number rolled. If no other creatures are in range, you take the damage. You also develop a random flaw from the Aberrant Dragonmark Flaws table. | Aberrant Dragonmark Flaws | | d8 | Flaw | | 1 | Your mark is a source of constant physical pain. | | 2 | Your mark whispers to you. Its meaning can be unclear. | | 3 | When you're stressed, the mark hisses audibly. | | 4 | The skin around the mark is burned, scaly, or withered. | | 5 | Animals are uneasy around you. | | 6 | You have a mood swing any time you use your mark. | | 7 | Your looks change slightly whenever you use the mark. | | 8 | You have horrific nightmares after you use your mark. | **Option: Greater Aberrant Powers**",
      "At the DM's option, a character who has the *Aberrant Dragonmark* feat has a chance of manifesting greater power. Upon reaching 10th level, such a character has a 10 percent chance of gaining an Epic Boon from among the options in chapter 7 of the *Dungeon Master's Guide*. If the character fails to gain a boon, they have a 10 percent chance the next time they gain a level.",
      "If the character gains a boon, the DM chooses it or determines it randomly. The character also permanently loses one of their Hit Dice, and their hit point maximum is reduced by an amount equal to a roll of that die plus their Constitution modifier (minimum reduction of 1). This reduction can't be reversed by any means."
    ],
    "abilityBonus": {
      "stats": [
        "con"
      ],
      "amount": 1
    }
  },
  {
    "id": "actor",
    "name": "Actor (Actor)",
    "nameEn": "Actor",
    "source": "Player's Handbook",
    "category": "Utilidad",
    "description": "Skilled at mimicry and dramatics, you gain the following benefits:",
    "benefits": [
      "Increase your Charisma score by 1, to a maximum of 20.",
      "You have an advantage on Charisma (Deception) and Charisma (Performance) checks when trying to pass yourself off as a different person.",
      "You can mimic the speech of another person or the sounds made by other creatures. You must have heard the person speaking, or heard the creature make the sound, for at least 1 minute. A successful Wisdom (Insight) check contested by your Charisma (Deception) check allows a listener to determine that the effect is faked."
    ],
    "abilityBonus": {
      "stats": [
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "alert",
    "name": "Alerta (Alert)",
    "nameEn": "Alert",
    "source": "Player's Handbook",
    "category": "Combate",
    "description": "Always on the lookout for danger, you gain the following benefits:",
    "benefits": [
      "You can't be surprised while you are conscious.",
      "You gain a +5 bonus to initiative.",
      "Other creatures don't gain advantage on attack rolls against you as a result of being unseen by you."
    ]
  },
  {
    "id": "artificer-initiate",
    "name": "Iniciado en el Artífice (Artificer Initiate)",
    "nameEn": "Artificer Initiate",
    "source": "Tasha's Cauldron of Everything",
    "category": "Magia",
    "description": "You’ve learned some of an artificer’s inventiveness:",
    "benefits": [
      "You learn one cantrip of your choice from the Artificer spell list, and you learn one 1st-level spell of your choice from that list. Intelligence is your spellcasting ability for these spells.",
      "You can cast this feat's 1st-level spell without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast the spell using any spell slots you have.",
      "You gain proficiency with one type of artisan's tools of your choice, and you can use that type of tool as a spellcasting focus for any spell you cast that uses Intelligence as its spellcasting ability."
    ]
  },
  {
    "id": "athlete",
    "name": "Atleta (Athlete)",
    "nameEn": "Athlete",
    "source": "Player's Handbook",
    "category": "General",
    "description": "You have undergone extensive physical training to gain the following benefits:",
    "benefits": [
      "Increase your Strength or Dexterity score by 1, to a maximum of 20.",
      "When you are prone, standing up uses only 5 feet of your movement.",
      "Climbing doesn't cost you extra movement.",
      "You can make a running long jump or a running high jump after moving only 5 feet on foot, rather than 10 feet."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1
    }
  },
  {
    "id": "cartomancer",
    "name": "Cartomancer (Cartomancer)",
    "nameEn": "Cartomancer",
    "source": "The Book of Many Things",
    "category": "Magia",
    "prerequisite": "4th Level, Spellcasting Feature",
    "description": "You have learned to channel your magic through a deck of cards. You can use a card deck as your spellcasting focus, and you gain the following benefits:\n\n**Card Tricks.** You learn the Prestidigitation cantrip and can use it to create illusions that duplicate the effects of stage magic. When you use Prestidigitation in this way, you can conceal the verbal and somatic components of the spell as ordinary conversation and card handling.\n\n**Hidden Ace.** When you finish a long rest, you can choose one spell from your class’s spell list and imbue that spell into a card. The chosen spell must have a casting time of 1 action, and it must be a level for which you have spell slots. The card remains imbued with this spell for 8 hours. While the card is imbued with the spell, you can use a bonus action to flourish the card and cast the spell within. The card then immediately loses its magic.",
    "benefits": [
      "You have learned to channel your magic through a deck of cards. You can use a card deck as your spellcasting focus, and you gain the following benefits:\n\n**Card Tricks.** You learn the Prestidigitation cantrip and can use it to create illusions that duplicate the effects of stage magic. When you use Prestidigitation in this way, you can conceal the verbal and somatic components of the spell as ordinary conversation and card handling.\n\n**Hidden Ace.** When you finish a long rest, you can choose one spell from your class’s spell list and imbue that spell into a card. The chosen spell must have a casting time of 1 action, and it must be a level for which you have spell slots. The card remains imbued with this spell for 8 hours. While the card is imbued with the spell, you can use a bonus action to flourish the card and cast the spell within. The card then immediately loses its magic."
    ]
  },
  {
    "id": "charger",
    "name": "Cargador (Charger)",
    "nameEn": "Charger",
    "source": "Player's Handbook",
    "category": "Combate",
    "description": "When you use your action to Dash, you can use a bonus action to make one melee weapon attack or to shove a creature. If you move at least 10 feet in a straight line immediately before taking this bonus action, you either gain a +5 bonus to the attack’s damage roll (if you chose to make a melee attack and hit) or push the target up to 10 feet away from you (if you chose to shove and you succeed).",
    "benefits": [
      "When you use your action to Dash, you can use a bonus action to make one melee weapon attack or to shove a creature. If you move at least 10 feet in a straight line immediately before taking this bonus action, you either gain a +5 bonus to the attack’s damage roll (if you chose to make a melee attack and hit) or push the target up to 10 feet away from you (if you chose to shove and you succeed)."
    ]
  },
  {
    "id": "chef",
    "name": "Chef (Chef)",
    "nameEn": "Chef",
    "source": "Tasha's Cauldron of Everything",
    "category": "Utilidad",
    "description": "Time and effort spent mastering the culinary arts has paid off. You gain the following benefits:",
    "benefits": [
      "Increase your Constitution or Wisdom score by 1, to a maximum of 20.",
      "You gain proficiency with cook’s utensils if you don’t already have it.",
      "As part of a short rest, you can cook special food, provided you have ingredients and cook's utensils on hand. You can prepare enough of this food for a number of creatures equal to 4 + your proficiency bonus. At the end of the short rest, any creature who eats the food and spends one or more Hit Dice to regain hit points regains an extra 1d8 hit points.",
      "With one hour of work or when you finish a long rest, you can cook a number of treats equal to your proficiency bonus. These special treats last 8 hours after being made. A creature can use a bonus action to eat one of those treats to gain temporary hit points equal to your proficiency bonus."
    ],
    "abilityBonus": {
      "stats": [
        "con",
        "wis"
      ],
      "amount": 1
    }
  },
  {
    "id": "crossbow-expert",
    "name": "Experto en Ballestas (Crossbow Expert)",
    "nameEn": "Crossbow Expert",
    "source": "Player's Handbook",
    "category": "Combate",
    "description": "Thanks to extensive practice with the crossbow, you gain the following benefits:",
    "benefits": [
      "You ignore the loading quality of crossbows with which you are proficient.",
      "Being within 5 feet of a hostile creature doesn’t impose disadvantage on your ranged attack rolls.",
      "When you use the Attack action and attack with a one handed weapon, you can use a bonus action to attack with a hand crossbow you are holding."
    ]
  },
  {
    "id": "crusher",
    "name": "Triturador (Crusher)",
    "nameEn": "Crusher",
    "source": "Tasha's Cauldron of Everything",
    "category": "Combate",
    "description": "You are practiced in the art of crushing your enemies, granting you the following benefits:",
    "benefits": [
      "Increase your Strength or Constitution by 1, to a maximum of 20.",
      "Once per turn, when you hit a creature with an attack that deals bludgeoning damage, you can move it 5 feet to an unoccupied space, provided the target is no more than one size larger than you.",
      "When you score a critical hit that deals bludgeoning damage to a creature, attack rolls against that creature are made with advantage until the start of your next turn."
    ]
  },
  {
    "id": "defensive-duelist",
    "name": "Duelista Defensivo (Defensive Duelist)",
    "nameEn": "Defensive Duelist",
    "source": "Player's Handbook",
    "category": "Combate",
    "prerequisite": "Dexterity 13 or higher",
    "description": "When you are wielding a finesse weapon with which you are proficient and another creature hits you with a melee attack, you can use your reaction to add your proficiency bonus to your AC for that attack, potentially causing the attack to miss you.",
    "benefits": [
      "When you are wielding a finesse weapon with which you are proficient and another creature hits you with a melee attack, you can use your reaction to add your proficiency bonus to your AC for that attack, potentially causing the attack to miss you."
    ]
  },
  {
    "id": "dungeon-delver",
    "name": "Explorador de Mazmorras (Dungeon Delver)",
    "nameEn": "Dungeon Delver",
    "source": "Player's Handbook",
    "category": "Combate",
    "description": "Alert to the hidden traps and secret doors found in many dungeons, you gain the following benefits:",
    "benefits": [
      "You have advantage on Wisdom (Perception) and Intelligence (Investigation) checks made to detect the presence of secret doors.",
      "You have advantage on saving throws made to avoid or resist traps.",
      "You have resistance to the damage dealt by traps.",
      "Travelling at a fast pace doesn't impose the normal -5 penalty on your passive Wisdom (Perception) score."
    ]
  },
  {
    "id": "durable",
    "name": "Duradero (Durable)",
    "nameEn": "Durable",
    "source": "Player's Handbook",
    "category": "General",
    "description": "Hardy and resilient, you gain the following benefits:",
    "benefits": [
      "Increase your Constitution score by 1, to a maximum of 20.",
      "When you roll a Hit Die to regain hit points, the minimum number of hit points you regain from the roll equals twice your Constitution modifier (minimum of 2)."
    ],
    "abilityBonus": {
      "stats": [
        "con"
      ],
      "amount": 1
    }
  },
  {
    "id": "eldritch-adept",
    "name": "Adepto Sobrenatural (Eldritch Adept)",
    "nameEn": "Eldritch Adept",
    "source": "Tasha's Cauldron of Everything",
    "category": "Magia",
    "prerequisite": "Spellcasting or Pact Magic feature",
    "description": "Studying occult lore, you learn one Eldritch Invocation option of your choice from the warlock class. Your spellcasting ability for the invocation is Intelligence, Wisdom, or Charisma (choose when you select this feat). If the invocation has a prerequisite of any kind, you can choose that invocation only if you’re a warlock who meets the prerequisite.\n\nWhenever you gain a level, you can replace the invocation with another one from the warlock class.",
    "benefits": [
      "Studying occult lore, you learn one Eldritch Invocation option of your choice from the warlock class. Your spellcasting ability for the invocation is Intelligence, Wisdom, or Charisma (choose when you select this feat). If the invocation has a prerequisite of any kind, you can choose that invocation only if you’re a warlock who meets the prerequisite.\n\nWhenever you gain a level, you can replace the invocation with another one from the warlock class."
    ]
  },
  {
    "id": "elemental-adept",
    "name": "Adepto Elemental (Elemental Adept)",
    "nameEn": "Elemental Adept",
    "source": "Player's Handbook",
    "category": "Magia",
    "prerequisite": "The ability to cast at least one spell",
    "description": "Dote oficial de D&D 5e.",
    "benefits": [
      "When you gain this feat, choose one of the following damage types: acid, cold, fire, lightning, or thunder.",
      "Spells you cast ignore resistance to damage of the chosen type. In addition, when you roll damage for a spell you cast that deals damage of that type, you can treat any 1 on a damage die as a 2.",
      "You can select this feat multiple times. Each time you do so, you must choose a different damage type."
    ],
    "subChoice": {
      "title": "Tipo de Daño Elemental",
      "description": "Elige un tipo de daño para ignorar resistencia y tratar los 1s como 2s:",
      "maxSelections": 1,
      "options": [
        {
          "id": "acid",
          "name": "Ácido (Acid)",
          "desc": "Tus conjuros ignoran resistencia al daño de ácido y tratan los 1s en dados de daño como 2s."
        },
        {
          "id": "cold",
          "name": "Frío (Cold)",
          "desc": "Tus conjuros ignoran resistencia al daño de frío y tratan los 1s en dados de daño como 2s."
        },
        {
          "id": "fire",
          "name": "Fuego (Fire)",
          "desc": "Tus conjuros ignoran resistencia al daño de fuego y tratan los 1s en dados de daño como 2s."
        },
        {
          "id": "lightning",
          "name": "Relámpago (Lightning)",
          "desc": "Tus conjuros ignoran resistencia al daño de relámpago y tratan los 1s en dados de daño como 2s."
        },
        {
          "id": "thunder",
          "name": "Trueno (Thunder)",
          "desc": "Tus conjuros ignoran resistencia al daño de trueno y tratan los 1s en dados de daño como 2s."
        }
      ]
    }
  },
  {
    "id": "ember-of-the-fire-giant",
    "name": "Ember of the Fire Giant (Ember of the Fire Giant)",
    "nameEn": "Ember of the Fire Giant",
    "source": "Bigby Presents - Glory of the Giants",
    "category": "Magia",
    "prerequisite": "4th Level, Strike of the Giants (Fire Strike) Feat",
    "description": "You’ve manifested the fiery combat emblematic of fire giants, granting you the following benefits:",
    "benefits": [
      "**Ability Score Increase.** Increase your Strength, Constitution, or Wisdom score by 1, to a maximum of 20.",
      "**Born of Flame.** You have resistance to fire damage.",
      "**Searing Ignition.** When you take the Attack action on your turn, you can replace a single attack with a magical burst of flame. Each creature of your choice in a 15-foot-radius sphere centered on you must make a Dexterity saving throw (DC equals 8 + your proficiency bonus + the modifier of the ability increased by this feat). On a failed save, a creature takes fire damage equal to 1d8 + your proficiency bonus, and it has the blinded condition until the start of your next turn. On a successful save, the creature takes half as much damage only. You can use your Searing Ignition a number of times equal to your proficiency bonus (but no more than once per turn), and you regain all expended uses when you finish a long rest."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "con",
        "wis"
      ],
      "amount": 1
    }
  },
  {
    "id": "fey-touched",
    "name": "Tocado por el Feywild (Fey Touched)",
    "nameEn": "Fey Touched",
    "source": "Tasha's Cauldron of Everything",
    "category": "Magia",
    "description": "Your exposure to the Feywild's magic has changed you, granting you the following benefits:",
    "benefits": [
      "Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "You learn the Misty Step spell and one 1st-level spell of your choice. The 1st-level spell must be from the Divination or Enchantment school of magic. You can cast each of these spells without expending a spell slot. Once you cast either of these spells in this way, you can't cast that spell in this way again until you finish a long rest. You can also cast these spells using spell slots you have of the appropriate level. The spells' spellcasting ability is the ability increased by this feat."
    ],
    "abilityBonus": {
      "stats": [
        "int",
        "wis",
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "fighting-initiate",
    "name": "Fighting Initiate (Fighting Initiate)",
    "nameEn": "Fighting Initiate",
    "source": "Tasha's Cauldron of Everything",
    "category": "General",
    "prerequisite": "Proficiency with a martial weapon",
    "description": "Your martial training has helped you develop a particular style of fighting. As a result, you learn one Fighting Style option of your choice from the fighter class. If you already have a style, the one you choose must be different.\n\nWhenever you reach a level that grants the Ability Score Improvement feature, you can replace this feat's fighting style with another one from the fighter class that you don't have.",
    "benefits": [
      "Your martial training has helped you develop a particular style of fighting. As a result, you learn one Fighting Style option of your choice from the fighter class. If you already have a style, the one you choose must be different.\n\nWhenever you reach a level that grants the Ability Score Improvement feature, you can replace this feat's fighting style with another one from the fighter class that you don't have."
    ]
  },
  {
    "id": "fury-of-the-frost-giant",
    "name": "Fury of the Frost Giant (Fury of the Frost Giant)",
    "nameEn": "Fury of the Frost Giant",
    "source": "Bigby Presents - Glory of the Giants",
    "category": "Combate",
    "prerequisite": "4th Level, Strike of the Giants (Frost Strike) Feat",
    "description": "You’ve manifested the icy might emblematic of frost giants, granting you the following benefits:",
    "benefits": [
      "**Ability Score Increase.** Increase your Strength, Constitution, or Wisdom score by 1, to a maximum of 20.",
      "**Born of Ice.** You have resistance to cold damage.",
      "**Frigid Retaliation.** Immediately after a creature you can see within 30 feet of you hits you with an attack roll and deals damage, you can use your reaction to retaliate with a conjured blast of ice. The creature must make a Constitution saving throw (DC equals 8 + your proficiency bonus + the modifier of the ability increased by this feat). On a failed save, the creature takes cold damage equal to 1d8 + your proficiency bonus, and its speed is reduced to 0 until the end of its next turn. You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "con",
        "wis"
      ],
      "amount": 1
    }
  },
  {
    "id": "gift-of-the-chromatic-dragon",
    "name": "Gift of the Chromatic Dragon (Gift of the Chromatic Dragon)",
    "nameEn": "Gift of the Chromatic Dragon",
    "source": "Fizban's Treasury of Dragons",
    "category": "Combate",
    "description": "You’ve manifested some of the power of chromatic dragons, granting you the following benefits:",
    "benefits": [
      "**Chromatic Infusion.** As a bonus action, you can touch a simple or martial weapon and infuse it with one of the following damage types: acid, cold, fire, lightning, or poison. For the next minute, the weapon deals an extra 1d4 damage of the chosen type when it hits. After you use this bonus action, you can’t do so again until you finish a long rest.",
      "**Reactive Resistance.** When you take acid, cold, fire, lightning, or poison damage, you can use your reaction to give yourself resistance to that instance of damage. You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
    ]
  },
  {
    "id": "gift-of-the-gem-dragon",
    "name": "Gift of the Gem Dragon (Gift of the Gem Dragon)",
    "nameEn": "Gift of the Gem Dragon",
    "source": "Fizban's Treasury of Dragons",
    "category": "Combate",
    "description": "You’ve manifested some of the power of gem dragons, granting you the following benefits:",
    "benefits": [
      "**Ability Score Increase.** Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "**Telekinetic Reprisal.** When you take damage from a creature that is within 10 feet of you, you can use your reaction to emanate telekinetic energy. The creature that dealt damage to you must make a Strength saving throw (DC equals 8 + your proficiency bonus + the ability modifier of the score increased by this feat). On a failed save, the creature takes 2d8 force damage and is pushed up to 10 feet away from you. On a successful save, the creature takes half as much damage and isn’t pushed. You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
    ],
    "abilityBonus": {
      "stats": [
        "int",
        "wis",
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "gift-of-the-metallic-dragon",
    "name": "Gift of the Metallic Dragon (Gift of the Metallic Dragon)",
    "nameEn": "Gift of the Metallic Dragon",
    "source": "Fizban's Treasury of Dragons",
    "category": "Magia",
    "description": "You’ve manifested some of the power of metallic dragons, granting you the following benefits:",
    "benefits": [
      "**Draconic Healing.** You learn the Cure Wounds spell. You can cast this spell without expending a spell slot. Once you cast this spell in this way, you can’t do so again until you finish a long rest. You can also cast this spell using spell slots you have. The spell’s spellcasting ability is Intelligence, Wisdom, or Charisma when you cast it with this feat (choose when you gain the feat).",
      "**Protective Wings.** You can manifest protective wings that can shield you or others. When you or another creature you can see within 5 feet of you is hit by an attack roll, you can use your reaction to manifest spectral wings from your back for a moment. You grant a bonus to the target’s AC equal to your proficiency bonus against that attack roll, potentially causing it to miss. You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
    ]
  },
  {
    "id": "grappler",
    "name": "Luchador (Grappler)",
    "nameEn": "Grappler",
    "source": "Player's Handbook",
    "category": "Combate",
    "prerequisite": "Strength 13 or higher",
    "description": "You've developed the skills necessary to hold your own in close-quarters grappling. You gain the following benefits:",
    "benefits": [
      "You have advantage on attack rolls against a creature you are grappling.",
      "You can use your action to try to pin a creature grappled by you. To do so, make another grapple check. If you succeed, you and the creature are both restrained until the grapple ends."
    ]
  },
  {
    "id": "great-weapon-master",
    "name": "Maestro de Armas Grandes (Great Weapon Master)",
    "nameEn": "Great Weapon Master",
    "source": "Player's Handbook",
    "category": "Combate",
    "description": "You've learned to put the weight of a weapon to your advantage, letting its momentum empower your strikes. You gain the following benefits:",
    "benefits": [
      "On your turn, when you score a critical hit with a melee weapon or reduce a creature to 0 hit points with one, you can make one melee weapon attack as a bonus action.",
      "Before you make a melee attack with a heavy weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack's damage."
    ]
  },
  {
    "id": "guile-of-the-cloud-giant",
    "name": "Guile of the Cloud Giant (Guile of the Cloud Giant)",
    "nameEn": "Guile of the Cloud Giant",
    "source": "Bigby Presents - Glory of the Giants",
    "category": "Magia",
    "prerequisite": "4th Level, Strike of the Giants (Cloud Strike) Feat",
    "description": "You’ve manifested the confounding magic emblematic of cloud giants, granting you the following benefits:",
    "benefits": [
      "**Ability Score Increase.** Increase your Strength, Constitution, or Charisma score by 1, to a maximum of 20.",
      "**Cloudy Escape.** When a creature you can see hits you with an attack roll, you can use your reaction to give yourself resistance to that attack’s damage. You then teleport to an unoccupied space that you can see within 30 feet of yourself. You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "con",
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "gunner",
    "name": "Artillero (Gunner)",
    "nameEn": "Gunner",
    "source": "Tasha's Cauldron of Everything",
    "category": "Combate",
    "description": "You have a quick hand and keen eye when employing firearms, granting you the following benefits:",
    "benefits": [
      "Increase your Dexterity score by 1, to a maximum of 20.",
      "You gain proficiency with firearms (see “Firearms” in the *Dungeon Master’s Guide*).",
      "You ignore the loading property of firearms.",
      "Being within 5 feet of a hostile creature doesn't impose disadvantage on your ranged attack rolls."
    ],
    "abilityBonus": {
      "stats": [
        "dex"
      ],
      "amount": 1
    }
  },
  {
    "id": "healer",
    "name": "Sanador (Healer)",
    "nameEn": "Healer",
    "source": "Player's Handbook",
    "category": "General",
    "description": "You are an able physician, allowing you to mend wounds quickly and get your allies back in the fight. You gain the following benefits:",
    "benefits": [
      "When you use a healer's kit to stabilize a dying creature, that creature also regains 1 hit point.",
      "As an action you can spend one use of a healer's kit to tend to a creature and restore 1d6 + 4 hit points to it, plus additional hit points equal to the creature's maximum number of Hit Dice. The creature can't regain hit points from this feat again until it finishes a short or long rest."
    ]
  },
  {
    "id": "heavily-armored",
    "name": "Con Armadura Pesada (Heavily Armored)",
    "nameEn": "Heavily Armored",
    "source": "Player's Handbook",
    "category": "Combate",
    "prerequisite": "Proficiency with medium armor",
    "description": "You have trained to master the use of heavy armor, gaining the following benefits:",
    "benefits": [
      "Increase your Strength score by 1, to a maximum of 20.",
      "You gain proficiency with heavy armor."
    ],
    "abilityBonus": {
      "stats": [
        "str"
      ],
      "amount": 1
    }
  },
  {
    "id": "heavy-armor-master",
    "name": "Maestro de la Armadura Pesada (Heavy Armor Master)",
    "nameEn": "Heavy Armor Master",
    "source": "Player's Handbook",
    "category": "Magia",
    "prerequisite": "Proficiency with heavy armor",
    "description": "You can use your armor to deflect strikes that would kill others. You gain the following benefits:",
    "benefits": [
      "Increase your Strength score by 1, to a maximum of 20.",
      "While you are wearing heavy armor, bludgeoning, piercing, and slashing damage that you take from nonmagical attacks is reduced by 3."
    ],
    "abilityBonus": {
      "stats": [
        "str"
      ],
      "amount": 1
    }
  },
  {
    "id": "inspiring-leader",
    "name": "Líder Inspirador (Inspiring Leader)",
    "nameEn": "Inspiring Leader",
    "source": "Player's Handbook",
    "category": "General",
    "prerequisite": "Charisma 13 or higher",
    "description": "You can spend 10 minutes inspiring your companions, shoring up their resolve to fight. When you do so, choose up to six friendly creatures (which can include yourself) within 30 feet of you who can see or hear you and who can understand you. Each creature can gain temporary hit points equal to your level + your Charisma modifier. A creature can't gain temporary hit points from this feat again until it has finished a short or long rest.",
    "benefits": [
      "You can spend 10 minutes inspiring your companions, shoring up their resolve to fight. When you do so, choose up to six friendly creatures (which can include yourself) within 30 feet of you who can see or hear you and who can understand you. Each creature can gain temporary hit points equal to your level + your Charisma modifier. A creature can't gain temporary hit points from this feat again until it has finished a short or long rest."
    ]
  },
  {
    "id": "keen-mind",
    "name": "Mente Aguda (Keen Mind)",
    "nameEn": "Keen Mind",
    "source": "Player's Handbook",
    "category": "General",
    "description": "You have a mind that can track time, direction, and detail with uncanny precision. You gain the following benefits.",
    "benefits": [
      "Increase your Intelligence score by 1, to a maximum of 20.",
      "You always know which way is north.",
      "You always know the number of hours left before the next sunrise or sunset.",
      "You can accurately recall anything you have seen or heard within the past month."
    ],
    "abilityBonus": {
      "stats": [
        "int"
      ],
      "amount": 1
    }
  },
  {
    "id": "keenness-of-the-stone-giant",
    "name": "Keenness of the Stone Giant (Keenness of the Stone Giant)",
    "nameEn": "Keenness of the Stone Giant",
    "source": "Bigby Presents - Glory of the Giants",
    "category": "Magia",
    "prerequisite": "4th Level, Strike of the Giants (Stone Strike) Feat",
    "description": "You’ve manifested the physical talents emblematic of stone giants, granting you the following benefits:",
    "benefits": [
      "**Ability Score Increase.** Increase your Strength, Constitution, or Wisdom score by 1, to a maximum of 20.",
      "**Cavernous Sight.** You gain darkvision with a range of 60 feet. If you already have darkvision from another source, its range increases by 60 feet.",
      "**Stone Throw.** As a bonus action, you can take a rock and make a magical attack with it. The attack is a ranged spell attack with a range of 60 feet that uses the ability score you increased with this feat as the spellcasting ability. On a hit, the rock deals 1d10 force damage, and the target must succeed on a Strength saving throw (DC equals 8 + your proficiency bonus + the spellcasting ability modifier) or have the prone condition. You can use this bonus action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "con",
        "wis"
      ],
      "amount": 1
    }
  },
  {
    "id": "lightly-armored",
    "name": "Con Armadura Ligera (Lightly Armored)",
    "nameEn": "Lightly Armored",
    "source": "Player's Handbook",
    "category": "Combate",
    "description": "You have trained to master the use of light armor, gaining the following benefits.",
    "benefits": [
      "Increase your Strength or Dexterity score by 1, to a maximum of 20.",
      "You gain proficiency with light armor."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1
    }
  },
  {
    "id": "linguist",
    "name": "Lingüista (Linguist)",
    "nameEn": "Linguist",
    "source": "Player's Handbook",
    "category": "Magia",
    "description": "You have studied languages and codes, gaining the following benefits:",
    "benefits": [
      "Increase your Intelligence score by 1, to a maximum of 20.",
      "You learn three languages of your choice.",
      "You can ably create written ciphers. Others can't decipher a code you create unless you teach them, they succeed on an Intelligence check (DC equal to your Intelligence score + your proficiency bonus), or they use magic to decipher it."
    ],
    "abilityBonus": {
      "stats": [
        "int"
      ],
      "amount": 1
    }
  },
  {
    "id": "lucky",
    "name": "Afortunado (Lucky)",
    "nameEn": "Lucky",
    "source": "Player's Handbook",
    "category": "Combate",
    "description": "You have inexplicable luck that seems to kick in at just the right moment.\n\nYou have 3 luck points. Whenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional d20. You can choose to spend one of your luck points after you roll the die, but before the outcome is determined. You choose which of the d20s is used for the attack roll, ability check, or saving throw.\n\nYou can also spend one luck point when an attack roll is made against you. Roll a d20 and then choose whether the attack uses the attacker's roll or yours.\n\nIf more than one creature spends a luck point to influence the outcome of a roll, the points cancel each other out; no additional dice are rolled.\n\nYou regain your expended luck points when you finish a long rest.",
    "benefits": [
      "You have inexplicable luck that seems to kick in at just the right moment.\n\nYou have 3 luck points. Whenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional d20. You can choose to spend one of your luck points after you roll the die, but before the outcome is determined. You choose which of the d20s is used for the attack roll, ability check, or saving throw.\n\nYou can also spend one luck point when an attack roll is made against you. Roll a d20 and then choose whether the attack uses the attacker's roll or yours.\n\nIf more than one creature spends a luck point to influence the outcome of a roll, the points cancel each other out; no additional dice are rolled.\n\nYou regain your expended luck points when you finish a long rest."
    ]
  },
  {
    "id": "mage-slayer",
    "name": "Asesino de Magos (Mage Slayer)",
    "nameEn": "Mage Slayer",
    "source": "Player's Handbook",
    "category": "Magia",
    "description": "You have practiced techniques in melee combat against spellcasters, gaining the following benefits.",
    "benefits": [
      "When a creature within 5 feet of you casts a spell, you can use your reaction to make a melee weapon attack against that creature.",
      "When you damage a creature that is concentrating on a spell, that creature has disadvantage on the saving throw it makes to maintain its concentration.",
      "You have advantage on saving throws against spells cast by creatures within 5 feet of you."
    ]
  },
  {
    "id": "magic-initiate",
    "name": "Iniciado en la Magia (Magic Initiate)",
    "nameEn": "Magic Initiate",
    "source": "Player's Handbook",
    "category": "Magia",
    "description": "Choose a class: bard, cleric, druid, sorcerer, warlock, or wizard. You learn two cantrips of your choice from that class's spell list.\n\nIn addition, choose one 1st-level spell to learn from that same list. Using this feat, you can cast the spell once at its lowest level, and you must finish a long rest before you can cast it in this way again.\n\nYour spellcasting ability for these spells depends on the class you chose: Charisma for bard, sorcerer, or warlock; Wisdom for cleric or druid; or Intelligence for wizard.",
    "benefits": [
      "Choose a class: bard, cleric, druid, sorcerer, warlock, or wizard. You learn two cantrips of your choice from that class's spell list.\n\nIn addition, choose one 1st-level spell to learn from that same list. Using this feat, you can cast the spell once at its lowest level, and you must finish a long rest before you can cast it in this way again.\n\nYour spellcasting ability for these spells depends on the class you chose: Charisma for bard, sorcerer, or warlock; Wisdom for cleric or druid; or Intelligence for wizard."
    ]
  },
  {
    "id": "martial-adept",
    "name": "Adepto Marcial (Martial Adept)",
    "nameEn": "Martial Adept",
    "source": "Player's Handbook",
    "category": "Utilidad",
    "description": "You have martial training that allows you to perform special combat maneuvers. You gain the following benefits.",
    "benefits": [
      "You learn two maneuvers of your choice from among those available to the Battle Master archetype in the fighter class. If a maneuver you use requires your target to make a saving throw to resist the maneuver's effects, the saving throw DC equals 8 + your proficiency bonus + your Strength or Dexterity modifier (your choice).",
      "You gain one superiority die, which is a d6 (this die is added to any superiority dice you have from another source). This die is used to fuel your maneuvers. A superiority die is expended when you use it. You regain your expended superiority dice when you finish a short or long rest."
    ]
  },
  {
    "id": "medium-armor-master",
    "name": "Maestro de la Armadura Media (Medium Armor Master)",
    "nameEn": "Medium Armor Master",
    "source": "Player's Handbook",
    "category": "Combate",
    "prerequisite": "Proficiency with medium armor",
    "description": "You have practiced moving in medium armor to gain the following benefits:",
    "benefits": [
      "Wearing medium armor doesn't impose disadvantage on your Dexterity (Stealth) checks.",
      "When you wear medium armor, you can add 3, rather than 2, to your AC if you have a Dexterity of 16 or higher."
    ]
  },
  {
    "id": "metamagic-adept",
    "name": "Adepto Metamágico (Metamagic Adept)",
    "nameEn": "Metamagic Adept",
    "source": "Tasha's Cauldron of Everything",
    "category": "Magia",
    "prerequisite": "Spellcasting or Pact Magic feature",
    "description": "You've learned how to exert your will on your spells to alter how they function:",
    "benefits": [
      "You learn two Metamagic options of your choice from the sorcerer class. You can use only one Metamagic option on a spell when you cast it, unless the option says otherwise. Whenever you reach a level that grants the Ability Score Improvement feature, you can replace one of these Metamagic options with another one from the sorcerer class.",
      "You gain 2 sorcery points to spend on Metamagic (these points are added to any sorcery points you have from another source but can be used only on Metamagic). You regain all spent sorcery points when you finish a long rest."
    ]
  },
  {
    "id": "mobile",
    "name": "Móvil (Mobile)",
    "nameEn": "Mobile",
    "source": "Player's Handbook",
    "category": "Combate",
    "description": "You are exceptionally speedy and agile. You gain the following benefits:",
    "benefits": [
      "Your speed increases by 10 feet.",
      "When you use the Dash action, difficult terrain doesn't cost you extra movement on that turn.",
      "When you make a melee attack against a creature, you don't provoke opportunity attacks from that creature for the rest of the turn, whether you hit or not."
    ]
  },
  {
    "id": "moderately-armored",
    "name": "Con Armadura Media (Moderately Armored)",
    "nameEn": "Moderately Armored",
    "source": "Player's Handbook",
    "category": "Combate",
    "prerequisite": "Proficiency with light armor",
    "description": "You have trained to master the use of medium armor and shields, gaining the following benefits:",
    "benefits": [
      "Increase your Strength or Dexterity score by 1, to a maximum of 20.",
      "You gain proficiency with medium armor and shields."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1
    }
  },
  {
    "id": "mounted-combatant",
    "name": "Combatiente Montado (Mounted Combatant)",
    "nameEn": "Mounted Combatant",
    "source": "Player's Handbook",
    "category": "Combate",
    "description": "You are a dangerous foe to face while mounted. While you are mounted and aren't incapacitated, you gain the following benefits:",
    "benefits": [
      "You have advantage on melee attack rolls against any unmounted creature that is smaller than your mount.",
      "You can force an attack targeted at your mount to target you instead.",
      "If your mount is subjected to an effect that allows it to make Dexterity saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw, and only half damage if it fails."
    ]
  },
  {
    "id": "observant",
    "name": "Observador (Observant)",
    "nameEn": "Observant",
    "source": "Player's Handbook",
    "category": "General",
    "description": "Quick to notice details of your environment, you gain the following benefits:",
    "benefits": [
      "Increase your Intelligence or Wisdom score by 1, to a maximum of 20.",
      "If you can see a creature's mouth while it is speaking a language you understand, you can interpret what it's saying by reading its lips.",
      "You have a +5 bonus to your passive Wisdom (Perception) and passive Intelligence (Investigation) scores."
    ],
    "abilityBonus": {
      "stats": [
        "int",
        "wis"
      ],
      "amount": 1
    }
  },
  {
    "id": "piercer",
    "name": "Perforador (Piercer)",
    "nameEn": "Piercer",
    "source": "Tasha's Cauldron of Everything",
    "category": "Combate",
    "description": "You have achieved a penetrating precision in combat, granting you the following benefits:",
    "benefits": [
      "Increase your Strength or Dexterity by 1, to a maximum of 20.",
      "Once per turn, when you hit a creature with an attack that deals piercing damage, you can re-roll one of the attack’s damage dice, and you must use the new roll.",
      "When you score a critical hit that deals piercing damage to a creature, you can roll one additional damage die when determining the extra piercing damage the target takes."
    ]
  },
  {
    "id": "poisoner",
    "name": "Envenenador (Poisoner)",
    "nameEn": "Poisoner",
    "source": "Tasha's Cauldron of Everything",
    "category": "Combate",
    "description": "You can prepare and deliver deadly poisons, gaining the following benefits:",
    "benefits": [
      "When you make a damage roll, you ignore resistance to poison damage.",
      "You can coat a weapon in poison as a bonus action, instead of an action.",
      "You gain proficiency with the poisoner's kit if you don't already have it. With one hour of work using a poisoner's kit and expending 50 gp worth of materials, you can create a number of doses of potent poison equal to your proficiency bonus. Once applied to a weapon or piece of ammunition, the poison retains its potency for 1 minute or until you hit with the weapon or ammunition. When a creature takes damage from the coated weapon or ammunition, that creature must succeed on a DC 14 Constitution saving throw or take 2d8 poison damage and become poisoned until the end of your next turn."
    ]
  },
  {
    "id": "polearm-master",
    "name": "Maestro de Armas de Asta (Polearm Master)",
    "nameEn": "Polearm Master",
    "source": "Player's Handbook",
    "category": "Combate",
    "description": "You gain the following benefits:",
    "benefits": [
      "When you take the Attack action and attack with only a glaive, halberd, quarterstaff, or spear, you can use a bonus action to make a melee attack with the opposite end of the weapon. This attack uses the same ability modifier as the primary attack. The weapon's damage die for this attack is a d4, and it deals bludgeoning damage.",
      "While you are wielding a glaive, halberd, pike, quarterstaff, or spear, other creatures provoke an opportunity attack from you when they enter the reach you have with that weapon."
    ]
  },
  {
    "id": "resilient",
    "name": "Resistente (Resilient)",
    "nameEn": "Resilient",
    "source": "Player's Handbook",
    "category": "Utilidad",
    "description": "Choose one ability score. You gain the following benefits:",
    "benefits": [
      "Increase the chosen ability score by 1, to a maximum of 20.",
      "You gain proficiency in saving throws using the chosen ability."
    ]
  },
  {
    "id": "rune-shaper",
    "name": "Rune Shaper (Rune Shaper)",
    "nameEn": "Rune Shaper",
    "source": "Bigby Presents - Glory of the Giants",
    "category": "Magia",
    "prerequisite": "Spellcasting Feature or Rune Carver Background",
    "description": "You’ve studied the magic of Giant runes, granting you the following benefits:",
    "benefits": [
      "**Comprehend Languages.** You learn the Comprehend Languages spell. You can cast this spell without expending a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast this spell using any spell slots you have.",
      "**Rune Magic.** You know a number of runes equal to half your proficiency bonus (rounded down), chosen from the Rune Spells table. Whenever you finish a long rest, you can inscribe each rune you know onto one nonmagical weapon, armor, piece of clothing, or other object you touch. You temporarily learn the 1st-level spells that correspond to the runes you inscribed, as specified on the Rune Spells table, and you know those spells until you finish a long rest, when the runes fade. While you are wearing or carrying any rune-marked object, you can cast the spells associated with those runes using any spell slots you have. You can also invoke a rune inscribed on an object you are wearing or carrying and cast its associated spell without expending a spell slot or using material components. Once you cast the spell in this way, you can’t do so again until you finish a long rest. Your spellcasting ability for this feat is Intelligence, Wisdom, or Charisma (choose when you select this feat). Each time you gain a level, you can replace one of the runes you know with another one from the Rune Spells table. Rune Spells | Rune | Spell | | Cloud | Fog Cloud | | Death | Inflict Wounds | | Dragon | Chromatic Orb | | Enemy | Disguise self | | Fire | Burning hands | | Friend | Speak with animals | | Frost | Armor of Agathys | | Hill | Goodberry | | Journey | Longstrider | | King | Command | | Mountain | Entangle | | Stone | Sanctuary | | Storm | Thunderwave |"
    ]
  },
  {
    "id": "savage-attacker",
    "name": "Atacante Salvaje (Savage Attacker)",
    "nameEn": "Savage Attacker",
    "source": "Player's Handbook",
    "category": "Combate",
    "description": "Once per turn when you roll damage for a melee weapon attack, you can reroll the weapon's damage dice and use either total.",
    "benefits": [
      "Once per turn when you roll damage for a melee weapon attack, you can reroll the weapon's damage dice and use either total."
    ]
  },
  {
    "id": "sentinel",
    "name": "Centinela (Sentinel)",
    "nameEn": "Sentinel",
    "source": "Player's Handbook",
    "category": "Combate",
    "description": "You have mastered techniques to take advantage of every drop in any enemy's guard, gaining the following benefits.",
    "benefits": [
      "When you hit a creature with an opportunity attack, the creature's speed becomes 0 for the rest of the turn.",
      "Creatures provoke opportunity attacks from you even if they take the Disengage action before leaving your reach.",
      "When a creature within 5 feet of you makes an attack against a target other than you (and that target doesn't have this feat), you can use your reaction to make a melee weapon attack against the attacking creature."
    ]
  },
  {
    "id": "shadow-touched",
    "name": "Tocado por las Sombras (Shadow Touched)",
    "nameEn": "Shadow Touched",
    "source": "Tasha's Cauldron of Everything",
    "category": "Magia",
    "description": "Your exposure to the Shadowfell's magic has changed you, granting you the following benefits:",
    "benefits": [
      "Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "You learn the Invisibility spell and one 1st-level spell of your choice. The 1st-level spell must be from the Illusion or Necromancy school of magic. You can cast each of these spells without expending a spell slot. Once you cast either of these spells in this way, you can't cast that spell in this way again until you finish a long rest. You can also cast these spells using spell slots you have of the appropriate level. The spells' spellcasting ability is the ability increased by this feat."
    ],
    "abilityBonus": {
      "stats": [
        "int",
        "wis",
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "sharpshooter",
    "name": "Francotirador (Sharpshooter)",
    "nameEn": "Sharpshooter",
    "source": "Player's Handbook",
    "category": "Combate",
    "description": "You have mastered ranged weapons and can make shots that others find impossible. You gain the following benefits:",
    "benefits": [
      "Attacking at long range doesn't impose disadvantage on your ranged weapon attack rolls.",
      "Your ranged weapon attacks ignore half and three-quarters cover.",
      "Before you make an attack with a ranged weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If that attack hits, you add +10 to the attack's damage."
    ]
  },
  {
    "id": "shield-master",
    "name": "Maestro del Escudo (Shield Master)",
    "nameEn": "Shield Master",
    "source": "Player's Handbook",
    "category": "Magia",
    "description": "You use shields not just for protection but also for offense. You gain the following benefits while you are wielding a shield:",
    "benefits": [
      "If you take the Attack action on your turn, you can use a bonus action to try to shove a creature within 5 feet of you with your shield.",
      "If you aren't incapacitated, you can add your shield's AC bonus to any Dexterity saving throw you make against a spell or other harmful effect that targets only you.",
      "If you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you can use your reaction to take no damage if you succeed on the saving throw, interposing your shield between yourself and the source of the effect."
    ]
  },
  {
    "id": "skill-expert",
    "name": "Experto en Habilidades (Skill Expert)",
    "nameEn": "Skill Expert",
    "source": "Tasha's Cauldron of Everything",
    "category": "Utilidad",
    "description": "You have honed your proficiency with particular skills, granting you the following benefits:",
    "benefits": [
      "Increase one ability score of your choice by 1, to a maximum of 20.",
      "You gain proficiency in one skill of your choice.",
      "Choose one skill in which you have proficiency. You gain expertise with that skill, which means your proficiency bonus is doubled for any ability check you make with it. The skill you choose must be one that isn't already benefiting from a feature, such as Expertise, that doubles your proficiency bonus."
    ],
    "abilityBonus": {
      "flexible": true,
      "amount": 1
    }
  },
  {
    "id": "skilled",
    "name": "Habilidoso (Skilled)",
    "nameEn": "Skilled",
    "source": "Player's Handbook",
    "category": "Utilidad",
    "description": "You gain proficiency in any combination of three skills or tools of your choice.",
    "benefits": [
      "You gain proficiency in any combination of three skills or tools of your choice."
    ]
  },
  {
    "id": "skulker",
    "name": "Acechador (Skulker)",
    "nameEn": "Skulker",
    "source": "Player's Handbook",
    "category": "Combate",
    "prerequisite": "Dexterity 13 or higher",
    "description": "You are an expert at slinking through shadows. You gain the following benefits:",
    "benefits": [
      "You can try to hide when you are lightly obscured from the creature from which you are hiding.",
      "When you are hidden from a creature and miss it with a ranged weapon attack, making the attack doesn't reveal your position.",
      "Dim light doesn't impose disadvantage on your Wisdom (Perception) checks relying on sight."
    ]
  },
  {
    "id": "slasher",
    "name": "Acuchillador (Slasher)",
    "nameEn": "Slasher",
    "source": "Tasha's Cauldron of Everything",
    "category": "Combate",
    "description": "You've learned where to cut to have the greatest results, granting you the following benefits:",
    "benefits": [
      "Increase your Strength or Dexterity by 1, to a maximum of 20.",
      "Once per turn when you hit a creature with an attack that deals slashing damage, you can reduce the speed of the target by 10 feet until the start of your next turn.",
      "When you score a critical hit that deals slashing damage to a creature, you grievously wound it. Until the start of your next turn, the target has disadvantage on all attack rolls."
    ]
  },
  {
    "id": "soul-of-the-storm-giant",
    "name": "Soul of the Storm Giant (Soul of the Storm Giant)",
    "nameEn": "Soul of the Storm Giant",
    "source": "Bigby Presents - Glory of the Giants",
    "category": "Magia",
    "prerequisite": "4th Level, Strike of the Giants (Storm Strike) Feat",
    "description": "You’ve manifested the tempest magic emblematic of storm giants, granting you the following benefits:",
    "benefits": [
      "**Ability Score Increase.** Increase your Strength, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "**Maelstrom Aura.** As a bonus action, you surround yourself with an aura of magical wind and lightning that extends 10 feet from you in every direction but not through total cover. The aura lasts until the start of your next turn or until you are incapacitated. While the aura is active, you have resistance to lightning and thunder damage. In addition, attack rolls against you have disadvantage, and whenever another creature starts its turn within the aura, you can force the creature to make a Strength saving throw (DC equals 8 + your proficiency bonus + the ability modifier of the score increased by this feat). On a failed save, the creature’s speed is halved until the start of its next turn. You can use this bonus action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "wis",
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "spell-sniper",
    "name": "Francotirador de Conjuros (Spell Sniper)",
    "nameEn": "Spell Sniper",
    "source": "Player's Handbook",
    "category": "Magia",
    "prerequisite": "The ability to cast at least one spell",
    "description": "You have learned techniques to enhance your attacks with certain kinds of spells, gaining the following benefits:",
    "benefits": [
      "When you cast a spell that requires you to make an attack roll, the spell's range is doubled.",
      "Your ranged spell attacks ignore half cover and three-quarters cover.",
      "You learn one cantrip that requires an attack roll. Choose the cantrip from the bard, cleric, druid, sorcerer, warlock, or wizard spell list. Your spellcasting ability for this cantrip depends on the spell list you chose from: Charisma for bard, sorcerer, and warlock; Wisdom for cleric or druid; or Intelligence for wizard."
    ]
  },
  {
    "id": "strike-of-the-giants",
    "name": "Golpe de los Gigantes (Strike of the Giants)",
    "nameEn": "Strike of the Giants",
    "source": "Bigby Presents - Glory of the Giants",
    "category": "Magia",
    "prerequisite": "Martial Weapon Proficiency or Giant Foundling Background",
    "description": "You have absorbed primeval magic that gives you an echo of the might of giants. When you take this feat, choose one of the benefits listed below. Once per turn, when you hit a target with a melee weapon attack or a ranged weapon attack using a thrown weapon, you can imbue the attack with an additional effect depending on the benefit you chose:",
    "benefits": [
      "**Cloud Strike.** The target takes an extra 1d4 thunder damage. If the target is a creature, it must succeed on a Wisdom saving throw, or you become invisible to it until the start of your next turn or until immediately after you make an attack roll or cast a spell.",
      "**Fire Strike.** The target takes an extra 1d10 fire damage.",
      "**Frost Strike.** The target takes an extra 1d6 cold damage. If the target is a creature, it must succeed on a Constitution saving throw, or its speed is reduced to 0 until the start of your next turn.",
      "**Hill Strike.** The target takes an extra 1d6 damage of the weapon’s type. If the target is a creature, it must succeed on a Strength saving throw or have the prone condition.",
      "**Stone Strike.** The target takes an extra 1d6 force damage. If the target is a creature, it must succeed on a Strength saving throw or be pushed 10 feet from you in a straight line.",
      "**Storm Strike.** The target takes an extra 1d6 lightning damage. If the target is a creature, it must succeed on a Constitution saving throw, or it has disadvantage on attack rolls until the start of your next turn. The saving throw DC for these effects equals 8 + your proficiency bonus + your Strength or Constitution modifier. You can use this feat a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
    ],
    "subChoice": {
      "title": "Beneficio de Golpe de los Gigantes",
      "description": "Elige uno de los 6 beneficios primordiales para imbuir tus ataques:",
      "maxSelections": 1,
      "options": [
        {
          "id": "cloud-strike",
          "name": "Golpe de Nube (Cloud Strike)",
          "desc": "1d4 de daño de trueno extra. Criatura debe superar salvación de Sabiduría o te vuelves invisible para ella hasta el inicio de tu siguiente turno."
        },
        {
          "id": "fire-strike",
          "name": "Golpe de Fuego (Fire Strike)",
          "desc": "1d10 de daño de fuego extra al impacto."
        },
        {
          "id": "frost-strike",
          "name": "Golpe de Escarcha (Frost Strike)",
          "desc": "1d6 de daño de frío extra. Criatura debe superar salvación de Constitución o su velocidad se reduce a 0 hasta el inicio de tu siguiente turno."
        },
        {
          "id": "hill-strike",
          "name": "Golpe de la Colina (Hill Strike)",
          "desc": "1d6 de daño extra del tipo del arma. Criatura debe superar salvación de Fuerza o cae derribada (prone)."
        },
        {
          "id": "stone-strike",
          "name": "Golpe de Piedra (Stone Strike)",
          "desc": "1d6 de daño de fuerza extra. Criatura debe superar salvación de Fuerza o es empujada 10 pies en línea recta."
        },
        {
          "id": "storm-strike",
          "name": "Golpe de la Tormenta (Storm Strike)",
          "desc": "1d6 de daño de relámpago extra. Criatura debe superar salvación de Constitución o tiene desventaja en tiradas de ataque hasta el inicio de tu siguiente turno."
        }
      ]
    }
  },
  {
    "id": "tavern-brawler",
    "name": "Peleador de Taberna (Tavern Brawler)",
    "nameEn": "Tavern Brawler",
    "source": "Player's Handbook",
    "category": "Combate",
    "description": "Accustomed to the rough-and-tumble fighting using whatever weapons happen to be at hand, you gain the following benefits:",
    "benefits": [
      "Increase your Strength or Consititution score by 1, to a maximum of 20.",
      "You are proficient with improvised weapons.",
      "Your unarmed strike uses a d4 for damage.",
      "When you hit a creature with an unarmed strike or an improvised weapon on your turn, you can use a bonus action to attempt to grapple the target."
    ],
    "abilityBonus": {
      "stats": [
        "str"
      ],
      "amount": 1
    }
  },
  {
    "id": "telekinetic",
    "name": "Telequinético (Telekinetic)",
    "nameEn": "Telekinetic",
    "source": "Tasha's Cauldron of Everything",
    "category": "Magia",
    "description": "You learn to move things with your mind, granting you the following benefits:",
    "benefits": [
      "Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "You learn the *mage hand* cantrip. You can cast it without verbal or somatic components, and you can make the spectral hand invisible. If you already know this spell, its range increases by 30 feet when you cast it. Its spellcasting ability is the ability increased by this feat.",
      "As a bonus action, you can try to telekinetically shove one creature you can see within 30 feet of you. When you do so, the target must succeed on a Strength saving throw (DC 8 + your proficiency bonus + the ability modifier of the score increased by this feat) or be moved 5 feet toward or away from you. A creature can willingly fail this save."
    ],
    "abilityBonus": {
      "stats": [
        "int",
        "wis",
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "telepathic",
    "name": "Telepático (Telepathic)",
    "nameEn": "Telepathic",
    "source": "Tasha's Cauldron of Everything",
    "category": "Magia",
    "description": "You awaken the ability to mentally connect with others, granting you the following benefits:",
    "benefits": [
      "Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "You can speak telepathically to any creature you can see within 60 feet of you. Your telepathic utterances are in a language you know, and the creature understands you only if it knows that language. Your communication doesn't give the creature the ability to respond to you telepathically.",
      "You can cast the Detect Thoughts spell, requiring no spell slot or components, and you must finish a long rest before you can cast it this way again. Your spellcasting ability for the spell is the ability increased by this feat. If you have spell slots of 2nd level or higher, you can cast this spell with them."
    ],
    "abilityBonus": {
      "stats": [
        "int",
        "wis",
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "tough",
    "name": "Robusto (Tough)",
    "nameEn": "Tough",
    "source": "Player's Handbook",
    "category": "General",
    "description": "Your hit point maximum increases by an amount equal to twice your level when you gain this feat. Whenever you gain a level thereafter, your hit point maximum increases by an additional 2 hit points.",
    "benefits": [
      "Your hit point maximum increases by an amount equal to twice your level when you gain this feat. Whenever you gain a level thereafter, your hit point maximum increases by an additional 2 hit points."
    ]
  },
  {
    "id": "vigor-of-the-hill-giant",
    "name": "Vigor of the Hill Giant (Vigor of the Hill Giant)",
    "nameEn": "Vigor of the Hill Giant",
    "source": "Bigby Presents - Glory of the Giants",
    "category": "Utilidad",
    "prerequisite": "4th Level, Strike of the Giants (Hill Strike) Feat",
    "description": "You’ve manifested the resilience emblematic of hill giants, granting you the following benefits:",
    "benefits": [
      "**Ability Score Increase.** Increase your Strength, Constitution, or Wisdom score by 1, to a maximum of 20.",
      "**Bulwark.** When you are subjected to an effect that would move you at least 5 feet or give you the prone condition, you can use your reaction to steady yourself. You aren’t moved and don’t have the prone condition.",
      "**Iron Stomach.** Whenever you eat food as part of a short rest and spend one or more Hit Dice to regain hit points, you regain additional hit points equal to your Constitution modifier + your proficiency bonus."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "con",
        "wis"
      ],
      "amount": 1
    }
  },
  {
    "id": "war-caster",
    "name": "Conjurador de Batalla (War Caster)",
    "nameEn": "War Caster",
    "source": "Player's Handbook",
    "category": "Magia",
    "prerequisite": "The ability to cast at least one spell",
    "description": "You have practiced casting spells in the midst of combat, learning techniques that grant you the following benefits:",
    "benefits": [
      "You have advantage on Constitution saving throws that you make to maintain your concentration on a spell when you take damage.",
      "You can perform the somatic components of spells even when you have weapons or a shield in one or both hands.",
      "When a hostile creature's movement provokes an opportunity attack from you, you can use your reaction to cast a spell at the creature, rather than making an opportunity attack. The spell must have a casting time of 1 action and must target only that creature."
    ]
  },
  {
    "id": "weapon-master",
    "name": "Maestro de Armas (Weapon Master)",
    "nameEn": "Weapon Master",
    "source": "Player's Handbook",
    "category": "Combate",
    "description": "You have practiced extensively with a variety of weapons, gaining the following benefits:",
    "benefits": [
      "Increase your Strength or Dexterity score by 1, to a maximum of 20.",
      "You gain proficiency with four weapons of your choice. Each one must be a simple or a martial weapon."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1
    }
  },
  {
    "id": "agent-of-order",
    "name": "Agent of Order (Agent of Order)",
    "nameEn": "Agent of Order",
    "source": "Planescape - Adventures in the Multiverse.",
    "category": "Magia",
    "prerequisite": "4th Level, Scion of the Outer Planes (Lawful Outer Plane) Feat",
    "description": "You can channel cosmic forces of order to gain these benefits:\n\n**Ability Score Increase.** Increase an ability score of your choice by 1, to a maximum of 20.\n\n**Stasis Strike.** Once per turn when you damage a creature you can see within 60 feet of yourself, you can deal an extra 1d8 force damage to the target, and it must succeed on a Wisdom saving throw (DC equal to 8 + your proficiency bonus + the modifier of the spellcasting ability you chose for the Scion of the Outer Planes feat) as spectral bindings try to ensnare it. On a successful save, the target escapes. On a failed save, the target has the restrained condition until the start of your next turn. These bindings manifest as chains or some other symbol of stasis. You can use this benefit a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
    "benefits": [
      "You can channel cosmic forces of order to gain these benefits:\n\n**Ability Score Increase.** Increase an ability score of your choice by 1, to a maximum of 20.\n\n**Stasis Strike.** Once per turn when you damage a creature you can see within 60 feet of yourself, you can deal an extra 1d8 force damage to the target, and it must succeed on a Wisdom saving throw (DC equal to 8 + your proficiency bonus + the modifier of the spellcasting ability you chose for the Scion of the Outer Planes feat) as spectral bindings try to ensnare it. On a successful save, the target escapes. On a failed save, the target has the restrained condition until the start of your next turn. These bindings manifest as chains or some other symbol of stasis. You can use this benefit a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
    ]
  },
  {
    "id": "baleful-scion",
    "name": "Baleful Scion (Baleful Scion)",
    "nameEn": "Baleful Scion",
    "source": "Planescape - Adventures in the Multiverse",
    "category": "Combate",
    "prerequisite": "4th Level, Scion of the Outer Planes (Evil Outer Plane) Feat.",
    "description": "You can channel cosmic forces of evil to gain these benefits:\n\n**Ability Score Increase.** Increase an ability score of your choice by 1, to a maximum of 20.\n\n**Grasp of Avarice.** Once per turn, when you damage a creature you can see within 60 feet of yourself, you can also deal necrotic damage to it. The necrotic damage equals 1d6 + your proficiency bonus, and you regain a number of hit points equal to this necrotic damage dealt. You can use this benefit a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
    "benefits": [
      "You can channel cosmic forces of evil to gain these benefits:\n\n**Ability Score Increase.** Increase an ability score of your choice by 1, to a maximum of 20.\n\n**Grasp of Avarice.** Once per turn, when you damage a creature you can see within 60 feet of yourself, you can also deal necrotic damage to it. The necrotic damage equals 1d6 + your proficiency bonus, and you regain a number of hit points equal to this necrotic damage dealt. You can use this benefit a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
    ]
  },
  {
    "id": "cohort-of-chaos",
    "name": "Cohort of Chaos (Cohort of Chaos)",
    "nameEn": "Cohort of Chaos",
    "source": "Planescape - Adventures in the Multiverse",
    "category": "Magia",
    "prerequisite": "4th Level, Scion of the Outer Planes (Chaotic Outer Plane) Feat.",
    "description": "You can channel cosmic forces of chaos to gain these benefits:\n\n**Ability Score Increase.** Increase an ability score of your choice by 1, to a maximum of 20.\n\n**Chaotic Flare.** When you roll a 1 or a 20 on an attack roll or a saving throw, the magic of chaos flows through you. Roll a d4 and consult the Chaotic Flares table to determine what happens. A flare lasts until the end of your next turn, and a new flare can't occur until after the first flare ends.\n\n| d4 | Flare |\n\n| 1 | Battle Fury. A creature of your choice that you can see is filled with reckless fury. It has advantage on attack rolls and disadvantage on ability checks. |\n\n| 2 | Disruption Field. Waves of energy ripple around you. Every creature that starts its turn within 5 feet of you, or that moves into that area for the first time on a turn, takes 1d8 force damage. |\n\n| 3 | Unbound. When you move, you can use some or all of your walking speed to teleport yourself once, along with any equipment you're wearing or carrying, up to the distance used to an unoccupied space that you can see. |\n\n| 4 | Wailing Winds. Winds swirl in a 15-foot-radius sphere centered on you. You and any other creatures in that area have disadvantage on Wisdom saving throws. |",
    "benefits": [
      "You can channel cosmic forces of chaos to gain these benefits:\n\n**Ability Score Increase.** Increase an ability score of your choice by 1, to a maximum of 20.\n\n**Chaotic Flare.** When you roll a 1 or a 20 on an attack roll or a saving throw, the magic of chaos flows through you. Roll a d4 and consult the Chaotic Flares table to determine what happens. A flare lasts until the end of your next turn, and a new flare can't occur until after the first flare ends.\n\n| d4 | Flare |\n\n| 1 | Battle Fury. A creature of your choice that you can see is filled with reckless fury. It has advantage on attack rolls and disadvantage on ability checks. |\n\n| 2 | Disruption Field. Waves of energy ripple around you. Every creature that starts its turn within 5 feet of you, or that moves into that area for the first time on a turn, takes 1d8 force damage. |\n\n| 3 | Unbound. When you move, you can use some or all of your walking speed to teleport yourself once, along with any equipment you're wearing or carrying, up to the distance used to an unoccupied space that you can see. |\n\n| 4 | Wailing Winds. Winds swirl in a 15-foot-radius sphere centered on you. You and any other creatures in that area have disadvantage on Wisdom saving throws. |"
    ]
  },
  {
    "id": "outlands-envoy",
    "name": "Outlands Envoy (Outlands Envoy)",
    "nameEn": "Outlands Envoy",
    "source": "Planescape - Adventures in the Multiverse",
    "category": "Magia",
    "prerequisite": "4th Level, Scion of the Outer Planes (The Outlands) Feat.",
    "description": "You have spent significant time in Sigil or the Outlands, the crossroads of the multiverse. Being steeped in converging planar energies grants you these benefits:\n\n**Ability Score Increase.** Increase an ability score of your choice by 1, to a maximum of 20.\n\n**Crossroads Emissary.** You learn the *misty step* and *tongues* spells. You can cast each spell once using this feat without a spell slot, and you must finish a long rest before you can cast that spell in this way again. When you cast *tongues* using this feat, you require no material components. You can also cast these spells using spell slots you have of the appropriate level. The spells' spellcasting ability is the one chosen when you gained the Scion of the Outer Planes feat.",
    "benefits": [
      "You have spent significant time in Sigil or the Outlands, the crossroads of the multiverse. Being steeped in converging planar energies grants you these benefits:\n\n**Ability Score Increase.** Increase an ability score of your choice by 1, to a maximum of 20.\n\n**Crossroads Emissary.** You learn the *misty step* and *tongues* spells. You can cast each spell once using this feat without a spell slot, and you must finish a long rest before you can cast that spell in this way again. When you cast *tongues* using this feat, you require no material components. You can also cast these spells using spell slots you have of the appropriate level. The spells' spellcasting ability is the one chosen when you gained the Scion of the Outer Planes feat."
    ]
  },
  {
    "id": "planar-wanderer",
    "name": "Planar Wanderer (Planar Wanderer)",
    "nameEn": "Planar Wanderer",
    "source": "Planescape - Adventures in the Multiverse",
    "category": "Combate",
    "prerequisite": "4th Level, Scion of the Outer Planes Feat",
    "description": "You can draw upon the forces of the multiverse to survive cosmic extremes and to traverse its infinite realms, granting you these benefits:\n\n**Planar Adaption.** When you finish a long rest, you gain resistance to either acid, cold or fire damage (your choice) until you finish your next long rest.\n\n**Portal Cracker.** Your experience with portals allows you to open them without a portal key. As an action, you can concentrate on a portal you're aware of within 5 feet of yourself and make a DC 20 Intelligence (Arcana) check. On a failed check, you take 3d8 psychic damage and can't use this benefit on that portal again until you finish a long rest. On a successful check, you can force the portal open or closed for 1 hour. For that duration, the portal doesn't respond to its portal key unless a creature employing the key succeeds on a DC 20 Intelligence (Arcana) check as an action.\n\n**Portal Sense.** You know the direction to the last planar portal you used while you and the portal are on the same plane of existence. Moreover, as an action, you can detect the location of any portals within 30 feet of you that aren't behind total cover. Once you detect a portal with this action, you can't use the action again until you finish a long rest.",
    "benefits": [
      "You can draw upon the forces of the multiverse to survive cosmic extremes and to traverse its infinite realms, granting you these benefits:\n\n**Planar Adaption.** When you finish a long rest, you gain resistance to either acid, cold or fire damage (your choice) until you finish your next long rest.\n\n**Portal Cracker.** Your experience with portals allows you to open them without a portal key. As an action, you can concentrate on a portal you're aware of within 5 feet of yourself and make a DC 20 Intelligence (Arcana) check. On a failed check, you take 3d8 psychic damage and can't use this benefit on that portal again until you finish a long rest. On a successful check, you can force the portal open or closed for 1 hour. For that duration, the portal doesn't respond to its portal key unless a creature employing the key succeeds on a DC 20 Intelligence (Arcana) check as an action.\n\n**Portal Sense.** You know the direction to the last planar portal you used while you and the portal are on the same plane of existence. Moreover, as an action, you can detect the location of any portals within 30 feet of you that aren't behind total cover. Once you detect a portal with this action, you can't use the action again until you finish a long rest."
    ]
  },
  {
    "id": "righteous-heritor",
    "name": "Righteous Heritor (Righteous Heritor)",
    "nameEn": "Righteous Heritor",
    "source": "Planescape - Adventures in the Multiverse",
    "category": "Combate",
    "prerequisite": "4th Level, Scion of the Outer Planes (Good Outer Plane) Feat.",
    "description": "You can channel cosmic forces of good to gain these benefits:\n\n**Ability Score Increase.** Increase an ability score of your choice by 1, to a maximum of 20.\n\n**Soothe Pain.** When you or a creature within 30 feet of you takes damage, you can use your reaction to reduce that damage by 1d10 + your proficiency bonus. You can use this benefit a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
    "benefits": [
      "You can channel cosmic forces of good to gain these benefits:\n\n**Ability Score Increase.** Increase an ability score of your choice by 1, to a maximum of 20.\n\n**Soothe Pain.** When you or a creature within 30 feet of you takes damage, you can use your reaction to reduce that damage by 1d10 + your proficiency bonus. You can use this benefit a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
    ]
  },
  {
    "id": "scion-of-the-outer-planes",
    "name": "Scion of the Outer Planes (Scion of the Outer Planes)",
    "nameEn": "Scion of the Outer Planes",
    "source": "Planescape - Adventures in the Multiverse",
    "category": "Magia",
    "prerequisite": "Planescape Campaign.",
    "description": "Your connection to an Outer Plane infuses you with the energy there. Choose a type of plane listed in the Planar Infusion Table. Your choice gives you a resistance to a damage type and the ability to cast a cantrip, as specified in the table. You can cast this cantrip without material components, and your spellcasting ability for it is Intelligence, Wisdom or Charisma (choose when you select this feat).\n\n| Plane | Resistance | Cantrip |\n\n| Chaotic Outer Plane | Poison | Minor Illusion |\n\n| Evil Outer Plane | Necrotic | Chill Touch |\n\n| Good Outer Plane | Radiant | Sacred Flame |\n\n| Lawful Outer Plane | Force | Guidance |\n\n| The Outlands | Psychic | Mage Hand |",
    "benefits": [
      "Your connection to an Outer Plane infuses you with the energy there. Choose a type of plane listed in the Planar Infusion Table. Your choice gives you a resistance to a damage type and the ability to cast a cantrip, as specified in the table. You can cast this cantrip without material components, and your spellcasting ability for it is Intelligence, Wisdom or Charisma (choose when you select this feat).\n\n| Plane | Resistance | Cantrip |\n\n| Chaotic Outer Plane | Poison | Minor Illusion |\n\n| Evil Outer Plane | Necrotic | Chill Touch |\n\n| Good Outer Plane | Radiant | Sacred Flame |\n\n| Lawful Outer Plane | Force | Guidance |\n\n| The Outlands | Psychic | Mage Hand |"
    ]
  },
  {
    "id": "strixhaven-initiate",
    "name": "Strixhaven Initiate (Strixhaven Initiate)",
    "nameEn": "Strixhaven Initiate",
    "source": "Strixhaven: A Curriculum of Chaos",
    "category": "Magia",
    "description": "You have studied some magical theory and have learned a few spells associated with Strixhaven University.\n\nChoose one of Strixhaven's colleges: Lorehold, Prismari. Quandrix, Silverquill, or Witherbloom. You learn two cantrips and one 1st-level spell based on the college you choose, as specified in the Strixhaven Spells table.\n\nYou can cast the chosen 1st-level spell without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast the spell using any spell slots you have.\n\nYour spellcasting ability for this feat's spells is Intelligence, Wisdom, or Charisma (choose when you select this feat).\n\n| Strixhaven Spells |\n\n| College | Cantrips | 1st-Level Spell |\n\n| Lorehold | Choose two from Light, Sacred Flame, and Thaumaturgy. | Choose one 1st-level Cleric or Wizard spell. |\n\n| Prismari | Choose two from Fire Bolt, Prestidigitation, and Ray of Frost. | Choose one 1st-level Bard or Sorcerer spell. |\n\n| Quandrix | Choose two from Druidcraft, Guidance, and Mage Hand. | Choose one 1st-level Druid or Wizard spell. |\n\n| Silverquill | Choose two from Sacred Flame, Thaumaturgy, and Vicious Mockery. | Choose one 1st-level Bard or Cleric spell. |\n\n| Witherbloom | Choose two from Chill Touch, Druidcraft, and Spare the Dying. | Choose one 1st-level Druid or Wizard spell. |",
    "benefits": [
      "You have studied some magical theory and have learned a few spells associated with Strixhaven University.\n\nChoose one of Strixhaven's colleges: Lorehold, Prismari. Quandrix, Silverquill, or Witherbloom. You learn two cantrips and one 1st-level spell based on the college you choose, as specified in the Strixhaven Spells table.\n\nYou can cast the chosen 1st-level spell without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast the spell using any spell slots you have.\n\nYour spellcasting ability for this feat's spells is Intelligence, Wisdom, or Charisma (choose when you select this feat).\n\n| Strixhaven Spells |\n\n| College | Cantrips | 1st-Level Spell |\n\n| Lorehold | Choose two from Light, Sacred Flame, and Thaumaturgy. | Choose one 1st-level Cleric or Wizard spell. |\n\n| Prismari | Choose two from Fire Bolt, Prestidigitation, and Ray of Frost. | Choose one 1st-level Bard or Sorcerer spell. |\n\n| Quandrix | Choose two from Druidcraft, Guidance, and Mage Hand. | Choose one 1st-level Druid or Wizard spell. |\n\n| Silverquill | Choose two from Sacred Flame, Thaumaturgy, and Vicious Mockery. | Choose one 1st-level Bard or Cleric spell. |\n\n| Witherbloom | Choose two from Chill Touch, Druidcraft, and Spare the Dying. | Choose one 1st-level Druid or Wizard spell. |"
    ]
  },
  {
    "id": "strixhaven-mascot",
    "name": "Strixhaven Mascot (Strixhaven Mascot)",
    "nameEn": "Strixhaven Mascot",
    "source": "Strixhaven: A Curriculum of Chaos",
    "category": "Magia",
    "prerequisite": "4th Level, Strixhaven Initiate Feat",
    "description": "You have learned how to summon a Strixhaven mascot to assist you, granting you these benefits:",
    "benefits": [
      "You can cast the Find Familiar spell as a ritual. Your familiar can take the form of the mascot associated with the college you chose for the Strixhaven Initiate feat: a **spirit statue mascot** (Lorehold), an **art elemental mascot** (Prismari), a **fractal mascot** (Quandrix), an **inkling mascot** (Silverquill), or a **pest mascot** (Witherbloom).",
      "When you take the Attack action on your turn, you can forgo one attack to allow your mascot familiar to make one attack of its own with its reaction.",
      "If your mascot familiar is within 60 feet of you, you can be teleported as an action, swapping places with the familiar. If your destination space is too small for you to occupy, the teleportation fails and is wasted. Once you teleport this way, you can't do so again until you finish a long rest, unless you expend a spell slot of 2nd level or higher to do it again."
    ]
  },
  {
    "id": "adept-of-the-black-robes",
    "name": "Adept of the Black Robes (Adept of the Black Robes)",
    "nameEn": "Adept of the Black Robes",
    "source": "Dragonlance: Shadow of the Dragon Queen",
    "category": "Magia",
    "prerequisite": "4th Level, Initiate of High Sorcery (Nuitari) Feat",
    "description": "You chose the moon Nuitari to influence your magic, and your ambition and loyalty to the Order of the Black Robes has been recognized, granting you these benefits:",
    "benefits": [
      "**Ambitious Magic.** You learn one 2nd-level spell of your choice. The 2nd-level spell must be from the Enchantment or Necromancy school of magic. You can cast this feat’s 2nd-level spell without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast this spell using spell slots you have of the appropriate level. The spell’s spellcasting ability is the one chosen when you gained the Initiate of High Sorcery feat.",
      "**Life Channel.** You can channel your life force into the power of your magic. When a creature you can see within 60 feet of you fails a saving throw against a spell that deals damage that you cast, you can expend a number of Hit Dice equal to the level of the spell. Roll the expended Hit Dice and add them together. The damage that the creature takes increases by an amount equal to that total."
    ]
  },
  {
    "id": "adept-of-the-red-robes",
    "name": "Adept of the Red Robes (Adept of the Red Robes)",
    "nameEn": "Adept of the Red Robes",
    "source": "Dragonlance: Shadow of the Dragon Queen",
    "category": "Magia",
    "prerequisite": "4th Level, Initiate of High Sorcery (Lunitari) Feat",
    "description": "You chose the moon Lunitari to influence your magic, and your dedication to maintaining the balance between all things has been recognized by the Order of the Red Robes, granting you these benefits:",
    "benefits": [
      "**Insightful Magic.** You learn one 2nd-level spell of your choice. The 2nd-level spell must be from the Illusion or Transmutation school of magic. You can cast this feat’s 2nd-level spell without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast this spell using spell slots you have of the appropriate level. The spell’s spellcasting ability is the one chosen when you gained the Initiate of High Sorcery feat.",
      "**Magical Balance.** When you make an attack roll or an ability check and roll a 9 or lower on the d20, you can balance fate and treat the roll as a 10. You can balance fate in this way a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
    ]
  },
  {
    "id": "adept-of-the-white-robes",
    "name": "Adept of the White Robes (Adept of the White Robes)",
    "nameEn": "Adept of the White Robes",
    "source": "Dragonlance: Shadow of the Dragon Queen",
    "category": "Magia",
    "prerequisite": "4th Level, Initiate of High Sorcery Feat",
    "description": "You chose the moon Solinari to influence your magic, and your oath to use magic to make the world a better place has been recognized by the Order of the White Robes, granting you these benefits:",
    "benefits": [
      "**Protective Magic.** You learn one 2nd-level spell of your choice. The 2nd-level spell must be from the Abjuration or Divination school of magic. You can cast this feat’s 2nd-level spell without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast this spell using spell slots you have of the appropriate level. The spell’s spellcasting ability is the one chosen when you gained the Initiate of High Sorcery feat.",
      "**Protective Ward.** When you or a creature you can see within 30 feet of you takes damage, you can use your reaction to expend a spell slot and weave protective magic around the target. Roll a number of d6s equal to the level of the spell slot expended and reduce the damage the target takes by the total rolled on those dice + your spellcasting ability modifier."
    ]
  },
  {
    "id": "divinely-favored",
    "name": "Divinely Favored (Divinely Favored)",
    "nameEn": "Divinely Favored",
    "source": "Dragonlance: Shadow of the Dragon Queen",
    "category": "Magia",
    "prerequisite": "4th Level, Dragonlance Campaign",
    "description": "A god chose you to carry a spark of their power.\n\nYou learn one cantrip of your choice from the Cleric spell list and one 1st-level spell based on the alignment of your character, as specified in the Alignment Spells table below. You also learn the Augury spell.\n\n| Alignment Spells |\n\n| Alignment | 1st-level Spells |\n\n| Evil | Choose one 1st-level Warlock spell |\n\n| Good | Choose one 1st-level Cleric spell. |\n\n| Neutral | Choose one 1st-level Druid spell |\n\nYou can cast the chosen 1st-level spell and the Augury spell without a spell slot, and you must finish a long rest before you can cast either of these spells in this way again. You can also cast these spells using spell slots you have of the appropriate level.\n\nYour spellcasting ability for this feat’s spells is Intelligence, Wisdom, or Charisma (choose when you select this feat).\n\nIn addition, you can use a holy symbol as a spellcasting focus for any spell you cast that uses the spellcasting ability you choose when you select this feat.",
    "benefits": [
      "A god chose you to carry a spark of their power.\n\nYou learn one cantrip of your choice from the Cleric spell list and one 1st-level spell based on the alignment of your character, as specified in the Alignment Spells table below. You also learn the Augury spell.\n\n| Alignment Spells |\n\n| Alignment | 1st-level Spells |\n\n| Evil | Choose one 1st-level Warlock spell |\n\n| Good | Choose one 1st-level Cleric spell. |\n\n| Neutral | Choose one 1st-level Druid spell |\n\nYou can cast the chosen 1st-level spell and the Augury spell without a spell slot, and you must finish a long rest before you can cast either of these spells in this way again. You can also cast these spells using spell slots you have of the appropriate level.\n\nYour spellcasting ability for this feat’s spells is Intelligence, Wisdom, or Charisma (choose when you select this feat).\n\nIn addition, you can use a holy symbol as a spellcasting focus for any spell you cast that uses the spellcasting ability you choose when you select this feat."
    ]
  },
  {
    "id": "initiate-of-high-sorcery",
    "name": "Initiate of High Sorcery (Initiate of High Sorcery)",
    "nameEn": "Initiate of High Sorcery",
    "source": "Dragonlance: Shadow of the Dragon Queen",
    "category": "Magia",
    "prerequisite": "Dragonlance Campaign, Sorcerer or Wizard Class or Mage of High Sorcery Background",
    "description": "You've received training from magic-users affiliated with the Mages of High Sorcery.\n\nChoose one of the three moons of Krynn to influence your magic: the black moon, Nuitari; the red moon, Lunitari; or the white moon Solinari. You learn one cantrip of your choice from the Wizard spell list and two 1st-level spells based on the moon you choose, as specified in the Lunar Spells table.\n\n| Lunar Spells |\n\n| Moon | 1st-Level Spell |\n\n| Nuitari | Choose two from Dissonant Whispers, False Life, Hex, and Ray of Sickness |\n\n| Lunitari | Choose two from Color Spray, Disguise Self, Feather Fall, and Longstrider |\n\n| Solinari | Choose two from Comprehend Languages, Detect Evil and Good, Protection from Evil and Good, and Shield |\n\nYou can cast each of the chosen 1st-level spells without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast the spells using any spell slots you have.\n\nYour spellcasting ability for this feat’s spells is Intelligence, Wisdom, or Charisma (choose when you select this feat).",
    "benefits": [
      "You've received training from magic-users affiliated with the Mages of High Sorcery.\n\nChoose one of the three moons of Krynn to influence your magic: the black moon, Nuitari; the red moon, Lunitari; or the white moon Solinari. You learn one cantrip of your choice from the Wizard spell list and two 1st-level spells based on the moon you choose, as specified in the Lunar Spells table.\n\n| Lunar Spells |\n\n| Moon | 1st-Level Spell |\n\n| Nuitari | Choose two from Dissonant Whispers, False Life, Hex, and Ray of Sickness |\n\n| Lunitari | Choose two from Color Spray, Disguise Self, Feather Fall, and Longstrider |\n\n| Solinari | Choose two from Comprehend Languages, Detect Evil and Good, Protection from Evil and Good, and Shield |\n\nYou can cast each of the chosen 1st-level spells without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast the spells using any spell slots you have.\n\nYour spellcasting ability for this feat’s spells is Intelligence, Wisdom, or Charisma (choose when you select this feat)."
    ]
  },
  {
    "id": "knight-of-the-crown",
    "name": "Knight of the Crown (Knight of the Crown)",
    "nameEn": "Knight of the Crown",
    "source": "Dragonlance: Shadow of the Dragon Queen",
    "category": "Combate",
    "prerequisite": "4th Level, Squire of Solamnia Feat",
    "description": "You are a Knight of Solamnia aligned with the Order of the Crown, a group that extols the virtues of cooperation, loyalty, and obedience. You excel in group combat and gain these benefits:",
    "benefits": [
      "**Ability Score Increase.** Increase your Strength, Dexterity, or Constitution score by 1, to a maximum of 20.",
      "**Commanding Rally.** As a bonus action, you can command one ally within 30 feet of yourself to attack. If that ally can see or hear you, they can immediately make one weapon attack as a reaction. If the attack hits, the ally can roll a d8 and add the number rolled as a bonus to the attack's damage roll. You can use this bonus action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "dex",
        "con"
      ],
      "amount": 1
    }
  },
  {
    "id": "knight-of-the-rose",
    "name": "Knight of the Rose (Knight of the Rose)",
    "nameEn": "Knight of the Rose",
    "source": "Dragonlance: Shadow of the Dragon Queen",
    "category": "Utilidad",
    "prerequisite": "4th Level, Squire of Solamnia Feat",
    "description": "You are a Knight of Solamnia aligned with the Order of the Rose, a group known for leadership, justice, and wisdom. Your resolve grants you these benefits:",
    "benefits": [
      "**Ability Score Increase.** Increase your Constitution, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "**Bolstering Rally.** As a bonus action, you can encourage one creature you can see within 30 feet of yourself (you can choose yourself). If the target can see or hear you, the target gains temporary hit points equal to 1d8 + your proficiency bonus + the ability modifier of the ability score increased by this feat. You can use this bonus action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
    ],
    "abilityBonus": {
      "stats": [
        "con",
        "wis",
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "knight-of-the-sword",
    "name": "Knight of the Sword (Knight of the Sword)",
    "nameEn": "Knight of the Sword",
    "source": "Dragonlance: Shadow of the Dragon Queen",
    "category": "Combate",
    "prerequisite": "4th Level, Squire of Solamnia Feat",
    "description": "You are a Knight of Solamnia aligned with the Order of the Sword, a group devoted to heroism and courage. Bravery steels your spirit, granting you these benefits:",
    "benefits": [
      "**Ability Score Increase** Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "**Demoralizing Strike.** Once per turn, when you hit a creature with a weapon attack roll, you can attempt to frighten that target. The target must make a Wisdom saving throw (DC equals 8 + your proficiency bonus + the ability modifier of the score increased by this feat). On a failed save, the target is frightened of you until the end of your next turn. On a successful save, the target has disadvantage on the next attack roll it makes before the end of its next turn. You can use this benefit a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
    ],
    "abilityBonus": {
      "stats": [
        "int",
        "wis",
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "squire-of-solamnia",
    "name": "Squire of Solamnia (Squire of Solamnia)",
    "nameEn": "Squire of Solamnia",
    "source": "Dragonlance: Shadow of the Dragon Queen",
    "category": "Combate",
    "prerequisite": "Dragonlance Campaign, Fighter or Paladin Class or Knight of Solamnia Background",
    "description": "Your training in the ways of the Knights of Solamnia grants you these benefits:",
    "benefits": [
      "**Mount Up.** Mounting or dismounting costs you only 5 feet of movement.",
      "**Precise Strike.** Once per turn, when you make a weapon attack roll against a creature, you can cause the attack roll to have advantage. If the attack hits, you roll a d8 and add the number rolled as a bonus to the attack's damage roll. You can use this benefit a number of times equal to your proficiency bonus, but a use is expended only if the attack hits. You regain all expended uses when you finish a long rest."
    ]
  },
  {
    "id": "servo-crafting",
    "name": "Servo Crafting (Servo Crafting)",
    "nameEn": "Servo Crafting",
    "source": "Plane Shift - Kaladesh",
    "category": "Magia",
    "prerequisite": "Intelligence 13 or higher",
    "description": "You are skilled in the creation of servos—tiny constructs that function as personal assistants. You can cast the Find Familiar spell as a ritual, creating a servo to serve as your familiar instead of an animal. It uses the Servo stat block, but in every other way, a servo familiar functions as described in the find familiar spell.\n\nYou can communicate telepathically with your servo familiar and perceive through its senses as long as you are on the same plane of existence. You can speak through your servo in your own voice.\n\nAdditionally, when you take the Attack action, you can forgo one of your own attacks to allow your servo familiar to make one attack of its own.\n\n| Servo |\n\n| Tiny construct, unaligned |\n\n| Armor Class: 11 (natural armor) |\n\n| Hit Points: 10 (3d4 + 3) |\n\n| Speed: 20 ft. |\n\n| STR | DEX | CON | INT | WIS | CHA |\n\n| 4 (-3) | 11 (+0) | 12 (+1) | 3 (-4) | 10 (+0) | 7 (-2) |\n\n| Damage Immunities: poison |\n\n| Condition Immunities: charmed, poisoned |\n\n| Senses: passive Perception 10 |\n\n| Languages: — |\n\n| Challenge: 0 (10 XP) |\n\n| Actions |\n\n| Claw. Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 slashing damage. |",
    "benefits": [
      "You are skilled in the creation of servos—tiny constructs that function as personal assistants. You can cast the Find Familiar spell as a ritual, creating a servo to serve as your familiar instead of an animal. It uses the Servo stat block, but in every other way, a servo familiar functions as described in the find familiar spell.\n\nYou can communicate telepathically with your servo familiar and perceive through its senses as long as you are on the same plane of existence. You can speak through your servo in your own voice.\n\nAdditionally, when you take the Attack action, you can forgo one of your own attacks to allow your servo familiar to make one attack of its own.\n\n| Servo |\n\n| Tiny construct, unaligned |\n\n| Armor Class: 11 (natural armor) |\n\n| Hit Points: 10 (3d4 + 3) |\n\n| Speed: 20 ft. |\n\n| STR | DEX | CON | INT | WIS | CHA |\n\n| 4 (-3) | 11 (+0) | 12 (+1) | 3 (-4) | 10 (+0) | 7 (-2) |\n\n| Damage Immunities: poison |\n\n| Condition Immunities: charmed, poisoned |\n\n| Senses: passive Perception 10 |\n\n| Languages: — |\n\n| Challenge: 0 (10 XP) |\n\n| Actions |\n\n| Claw. Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 slashing damage. |"
    ]
  },
  {
    "id": "quicksmithing",
    "name": "Quicksmithing (Quicksmithing)",
    "nameEn": "Quicksmithing",
    "source": "Plane Shift - Kaladesh",
    "category": "Magia",
    "prerequisite": "Intelligence 13 or higher",
    "description": "You have mastered the art of on-the-fly invention, improvement, and jury-rigging. You can use your talents to create immediate, short-term magical effects similar to spells, given time and an adequate supply of aether.\n\nWhen you choose this feat, you master two magical effects, each of which recreates the effect of a 1st-level spell that has the ritual tag. These spells can come from any class list, but Intelligence is your spellcasting ability for them.\n\nIf you come across a schematic geared toward quicksmithing or study with another quicksmith, you might be able to add another spell to the effects you have mastered. The spell’s level can be no higher than half your level (rounded up), and it must have the ritual tag. The process of mastering the spell takes 2 hours per level of the spell, and costs 50 gp per level. The cost represents aether you use as you experiment with the spell effect to master it.\n\nIn addition, you have proficiency with artisan’s tools (quicksmith’s tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours unless you spend 1 hour repairing it to keep it functioning. You can use your action to dismantle the device, at which point you can reclaim the materials used to create it. You can have up to three such devices active at a time.\n\nWhen you create a device, choose one of the following options:",
    "benefits": [
      "***Clockwork Toy.*** This toy is a clockwork animal, monster, or person, such as a frog, mouse, bird, dragon, or soldier. When placed on the ground, the toy moves 5 feet across the ground on each of your turns in a random direction. It makes noises as appropriate to the creature it represents.",
      "***Fire Starter.*** This device produces a miniature flame, which you can use to light a candle, torch, or campfire. Using the device requires your action.",
      "***Music Box.*** When opened, this music box plays a single song at a moderate volume. The box stops playing when it reaches the song’s end or when it is closed."
    ]
  },
  {
    "id": "cruel",
    "name": "Cruel (Cruel)",
    "nameEn": "Cruel",
    "source": "Tal'Dorei Campaign Setting Reborn",
    "category": "Combate",
    "description": "The challenges and struggles you've faced throughout your life have led you to delight in inflicting pain and anguish upon others. You gain a number of cruelty dice equal to your proficiency bonus. Your cruelty dice are d6s. You can roll only one cruelty die per turn, and a cruelty die is spent when you roll it.\n\nYou can roll a cruelty die under any of the following circumstances, with the indicated result:",
    "benefits": [
      "When you deal damage to a creature, spend one cruelty die to deal extra damage to the creature equal to the roll.",
      "When you score a critical hit, spend one cruelty die to gain temporary hit points equal to the roll.",
      "When you make a Charisma (Intimidation) check, spend one cruelty die and add the roll to your check. You regain all spent cruelty dice when you finish a long rest."
    ]
  },
  {
    "id": "flash-recall",
    "name": "Flash Recall (Flash Recall)",
    "nameEn": "Flash Recall",
    "source": "Tal'Dorei Campaign Setting Reborn",
    "category": "Magia",
    "prerequisite": "Spellcasting feature from a class that prepares spells",
    "description": "You've developed the ability to instantly recall an unprepared spell in moments of sudden necessity.\n\nAs a bonus action, you prepare a spell of 1st level or higher from your spellbook (if you're a wizard) or from your class spell list (if you're not a wizard). This spell must be of a level for which you have spell slots, and it replaces another spell of an equal or higher level that you had previously prepared.\n\nOnce you use this feat to recall a spell, you can't do so again until you complete a short or long rest.",
    "benefits": [
      "You've developed the ability to instantly recall an unprepared spell in moments of sudden necessity.\n\nAs a bonus action, you prepare a spell of 1st level or higher from your spellbook (if you're a wizard) or from your class spell list (if you're not a wizard). This spell must be of a level for which you have spell slots, and it replaces another spell of an equal or higher level that you had previously prepared.\n\nOnce you use this feat to recall a spell, you can't do so again until you complete a short or long rest."
    ]
  },
  {
    "id": "mystic-conflux",
    "name": "Mystic Conflux (Mystic Conflux)",
    "nameEn": "Mystic Conflux",
    "source": "Tal'Dorei Campaign Setting Reborn",
    "category": "Magia",
    "description": "You possess an intuitive understanding of the way magic ebbs and flows within enchanted items. Such items attune easily to you, and you are able to sound out their secrets. You gain the following benefits:",
    "benefits": [
      "You can attune to up to four magic items at once.",
      "You can cast the Identify spell without expending a spell slot or material components. You must finish a long rest before you can do so again."
    ]
  },
  {
    "id": "remarkable-recovery",
    "name": "Remarkable Recovery (Remarkable Recovery)",
    "nameEn": "Remarkable Recovery",
    "source": "Tal'Dorei Campaign Setting Reborn",
    "category": "Magia",
    "description": "Your body has the ability to recover quickly from terrible injuries, and is unusually receptive to healing magic. You gain the following benefits:",
    "benefits": [
      "Increase your Constitution score by 1, to a maximum of 20.",
      "When you are successfully stabilized while dying, you regain hit points equal to your Constitution modifier (minimum of 1).",
      "Whenever you regain hit points as a result of a spell, potion, or class feature (but not this feat), you regain additional hit points equal to your Constitution modifier (minimum of 1)."
    ],
    "abilityBonus": {
      "stats": [
        "con"
      ],
      "amount": 1
    }
  },
  {
    "id": "spelldriver",
    "name": "Spelldriver (Spelldriver)",
    "nameEn": "Spelldriver",
    "source": "Tal'Dorei Campaign Setting Reborn",
    "category": "Magia",
    "description": "*Prerequisites: Character level 11 or higher; Spellcasting or Pact Magic feature*\n\nThrough intense focus, training, and dedication, you’ve harnessed the techniques of rapid spellcasting. When you use your bonus action to cast a spell of 1st level or higher, you can also use your action to cast another spell of 1st level or higher. However, if you cast two or more spells in a single turn, only one of them can be 3rd level or higher.",
    "benefits": [
      "*Prerequisites: Character level 11 or higher; Spellcasting or Pact Magic feature*\n\nThrough intense focus, training, and dedication, you’ve harnessed the techniques of rapid spellcasting. When you use your bonus action to cast a spell of 1st level or higher, you can also use your action to cast another spell of 1st level or higher. However, if you cast two or more spells in a single turn, only one of them can be 3rd level or higher."
    ]
  },
  {
    "id": "thrown-arms-master",
    "name": "Thrown Arms Master (Thrown Arms Master)",
    "nameEn": "Thrown Arms Master",
    "source": "Tal'Dorei Campaign Setting Reborn",
    "category": "Combate",
    "description": "You’ve honed your ability to lob weaponry into the fray, including weapons not meant for ranged combat. You gain the following benefits:",
    "benefits": [
      "Increase your Strength or Dexterity score by 1, to a maximum of 20.",
      "Simple and martial melee weapons without the thrown property have the thrown property for you. One-handed weapons have a normal range of 20 feet and a long range of 60 feet, while two-handed weapons have a normal range of 15 feet and a long range of 30 feet.",
      "Weapons that already have the thrown property increase their short range by 20 feet and their long range by 40 feet for you.",
      "When you miss with a thrown weapon attack using a light weapon, the weapon returns to your grasp like a boomerang at the end of your turn, unless something prevents it from returning. You can catch and stow as many weapons as you threw in this way."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1
    }
  },
  {
    "id": "vital-sacrifice",
    "name": "Vital Sacrifice (Vital Sacrifice)",
    "nameEn": "Vital Sacrifice",
    "source": "Tal'Dorei Campaign Setting Reborn",
    "category": "Magia",
    "description": "You've learned secrets of hemocraft that grant you esoteric power at the price of your own life force. As a bonus action, you can choose to take 1d6 necrotic damage to gain a blood boon. Your blood boon lasts for 1 hour or until expended.\n\nYou can expend this blood boon to gain one of the following benefits:",
    "benefits": [
      "When you make an attack roll, you roll 1d6 and add it to the total.",
      "When you hit with an attack or spell, you deal an additional 2d6 necrotic damage.",
      "When you cause a creature to make a Strength, Dexterity, or Constitution saving throw, roll a d4 and reduce their save by the amount rolled. The damage you take to gain a blood boon can’t be reduced in any way."
    ]
  },
  {
    "id": "bountiful-luck",
    "name": "Bountiful Luck (Bountiful Luck)",
    "nameEn": "Bountiful Luck",
    "source": "Xanathar's Guide to Everything",
    "category": "Combate",
    "prerequisite": "Halfling",
    "description": "Your people have extraordinary luck, which you have learned to mystically lend to your companions whenever you see them falter. You're not sure how you do it, you just wish it, and it happens. Surely a sign of fortune's favor!",
    "benefits": [
      "When an ally you can see within 30 feet of you rolls a 1 on the d20 for an attack roll, an ability check, or a saving throw, you can use your reaction to let the ally reroll the die. The ally must use the new roll.",
      "When you use this ability, you can't use your Lucky racial trait before the end of your next turn"
    ]
  },
  {
    "id": "dragon-fear",
    "name": "Dragon Fear (Dragon Fear)",
    "nameEn": "Dragon Fear",
    "source": "Xanathar's Guide to Everything",
    "category": "Combate",
    "prerequisite": "Dragonborn",
    "description": "When angered, you radiate menace. You gain the following benefits:",
    "benefits": [
      "Increase your Strength, Constitution, or Charisma score by 1, to a maximum of 20.",
      "Instead of exhaling destructive energy, you can expend a use of your Breath Weapon trait to roar, forcing each creature of your choice within 30 feet of you to make a Wisdom saving throw (DC 8 + your proficiency bonus + your Charisma modifier). A target automatically succeeds on the save if it can’t hear or see you. On a failed save, a target becomes frightened for 1 minute. If the frightened target takes any damage, it can repeat the saving throw, ending the effect on itself on a success."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "con",
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "dragon-hide",
    "name": "Dragon Hide (Dragon Hide)",
    "nameEn": "Dragon Hide",
    "source": "Xanathar's Guide to Everything",
    "category": "Combate",
    "prerequisite": "Dragonborn",
    "description": "You manifest scales and claws reminiscent of your draconic ancestors. You gain the following benefits:",
    "benefits": [
      "Increase your Strength, Constitution, or Charisma score by 1, up to a maximum of 20.",
      "Your scales harden. While you aren't wearing armor, you can calculate your AC as 13 + your Dexterity modifier. You can use a shield and still gain this benefit.",
      "You can grow retractable claws from the tips of your fingers. Extending or retracting the claws requires no action. The claws are natural weapons, which you can use to make unarmed strikes. If you hit with them, you deal slashing damage equal to 1d4 + your Strength modifier, instead of the normal bludgeoning damage for an unarmed strike."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "con",
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "dwarven-resilience",
    "name": "Dwarven Fortitude (Dwarven Fortitude)",
    "nameEn": "Dwarven Fortitude",
    "source": "Xanathar's Guide to Everything",
    "category": "General",
    "prerequisite": "Dwarf",
    "description": "You have the blood of dwarf heroes flowing through your veins. You gain the following benefits:",
    "benefits": [
      "Increase your Constitution score by 1, to a maximum of 20.",
      "Whenever you take the Dodge action in combat, you can spend one Hit Die to heal yourself. Roll the die, add your Constitution modifier, and regain a number of hit points equal to the total (minimum of 1)."
    ],
    "abilityBonus": {
      "stats": [
        "con"
      ],
      "amount": 1
    }
  },
  {
    "id": "drow-high-magic",
    "name": "Drow High Magic (Drow High Magic)",
    "nameEn": "Drow High Magic",
    "source": "Xanathar's Guide to Everything",
    "category": "Magia",
    "prerequisite": "Elf (drow)",
    "description": "You learn more of the magic typical of dark elves. You learn the Detect Magic spell and can cast it at will, without expending a spell slot. You also learn Levitate and Dispel Magic, each of which you can cast once without expending a spell slot. You regain the ability to cast the spell in this way when you finish a long rest. Charisma is your spellcasting ability for these spells.",
    "benefits": [
      "You learn more of the magic typical of dark elves. You learn the Detect Magic spell and can cast it at will, without expending a spell slot. You also learn Levitate and Dispel Magic, each of which you can cast once without expending a spell slot. You regain the ability to cast the spell in this way when you finish a long rest. Charisma is your spellcasting ability for these spells."
    ]
  },
  {
    "id": "elven-accuracy",
    "name": "Elven Accuracy (Elven Accuracy)",
    "nameEn": "Elven Accuracy",
    "source": "Player's Handbook",
    "category": "Magia",
    "prerequisite": "Elf or Half-Elf",
    "description": "Souce: Xanathar's Guide to Everything\n\nThe accuracy of elves is legendary, especially that of elf archers and spellcasters. You have uncanny aim with attacks that rely on precision rather than brute force. You gain the following benefits:",
    "benefits": [
      "Increase your Dexterity, Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20",
      "Whenever you have advantage on an attack roll using Dexterity, Intelligence, Wisdom, or Charisma, you can reroll one of the dice once."
    ],
    "abilityBonus": {
      "stats": [
        "dex",
        "int",
        "wis",
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "fade-away",
    "name": "Fade Away (Fade Away)",
    "nameEn": "Fade Away",
    "source": "Player's Handbook",
    "category": "Magia",
    "prerequisite": "Gnome",
    "description": "Souce: Xanathar's Guide to Everything\n\nYour people are clever, with a knack for illusion magic. You have learned a magical trick for fading away when you suffer harm. You gain the following benefits:",
    "benefits": [
      "Increase your Dexterity or Intelligence score by 1, to a maximum of 20.",
      "Immediately after you take damage, you can use a reaction to magically become invisible until the end of your next turn or until you attack, deal damage, or force someone to make a saving throw. Once you use this ability, you can't do so again until you finish a short or long rest."
    ],
    "abilityBonus": {
      "stats": [
        "dex",
        "int"
      ],
      "amount": 1
    }
  },
  {
    "id": "fey-teleportation",
    "name": "Fey Teleportation (Fey Teleportation)",
    "nameEn": "Fey Teleportation",
    "source": "Player's Handbook",
    "category": "Magia",
    "prerequisite": "Elf (High)",
    "description": "Souce: Xanathar's Guide to Everything\n\nYour study of high elven lore has unlocked fey power that few other elves possess, except your eladrin cousins. Drawing on your fey ancestry, you can momentarily stride through the Feywild to shorten your path from one place to another. You gain the following benefits:",
    "benefits": [
      "Increase your Intelligence or Charisma score by 1, to a maximum of 20.",
      "You learn to speak, read, and write Sylvan",
      "You learn the Misty Step spell and can cast it once without expending a spell slot. You regain the ability to cast it in this way when you finish a short or long rest. Intelligence is your spellcasting ability for this spell."
    ],
    "abilityBonus": {
      "stats": [
        "int",
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "flames-of-phlegethos",
    "name": "Flames of Phlegethos (Flames of Phlegethos)",
    "nameEn": "Flames of Phlegethos",
    "source": "Xanathar's Guide to Everything",
    "category": "Magia",
    "prerequisite": "Tiefling",
    "description": "You learn to call on hellfire to serve your commands. You gain the following benefits:",
    "benefits": [
      "Increase your Intelligence or Charisma score by 1, to a maximum of 20.",
      "When you roll fire damage for a spell you cast, you can reroll any roll of 1 on the fire damage dice, but you must use the new roll, even if it is another 1.",
      "Whenever you cast a spell that deals fire damage, you can cause flames to wreathe you until the end of your next turn. The flames don’t harm you or your possessions, and they shed bright light out to 30 feet and dim light for an additional 30 feet. While the flames are present, any creature within 5 feet of you that hits you with a melee attack takes 1d4 fire damage."
    ],
    "abilityBonus": {
      "stats": [
        "int",
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "infernal-constitution",
    "name": "Infernal Constitution (Infernal Constitution)",
    "nameEn": "Infernal Constitution",
    "source": "Xanathar's Guide to Everything",
    "category": "Combate",
    "prerequisite": "Tiefling",
    "description": "Fiendish blood runs strong in you, unlocking a resilience akin to that possessed by some fiends. You gain the following benefits:",
    "benefits": [
      "Increase your Constitution score by 1, up to a maximum of 20.",
      "You have resistance to cold damage and poison damage.",
      "You have advantage on saving throws against being poisoned."
    ],
    "abilityBonus": {
      "stats": [
        "con"
      ],
      "amount": 1
    }
  },
  {
    "id": "orcish-fury",
    "name": "Orcish Fury (Orcish Fury)",
    "nameEn": "Orcish Fury",
    "source": "Xanathar's Guide to Everything",
    "category": "Combate",
    "prerequisite": "Half-orc",
    "description": "Your fury burns tirelessly. You gain the following benefits:",
    "benefits": [
      "Increase your Strength or Constitution score by 1, up to a maximum of 20.",
      "When you hit with an attack made with a simple or martial weapon, you can roll one of the weapon’s damage dice an additional time and add it as extra damage of the weapon’s damage type. Once you use this ability, you can’t use it again until you finish a short or long rest.",
      "Immediately after you use your Relentless Endurance trait, you can use your reaction to make one weapon attack."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "con"
      ],
      "amount": 1
    }
  },
  {
    "id": "prodigy",
    "name": "Prodigy (Prodigy)",
    "nameEn": "Prodigy",
    "source": "Xanathar's Guide to Everything",
    "category": "Utilidad",
    "prerequisite": "Half-Elf, Half-Orc or Human",
    "description": "You have a knack for learning new things. You gain the following benefits:",
    "benefits": [
      "You gain one skill proficiency of your choice, one tool proficiency of your choice, and fluency in one language of your choice.",
      "Choose one skill in which you have proficiency. You gain expertise with that skill, which means your proficiency bonus is doubled for any ability check you make with it. The skill you choose must be one that isn't already benefiting from a feature, such as Expertise, that doubles your proficiency bonus"
    ]
  },
  {
    "id": "revenant-blade",
    "name": "Revenant Blade (Revenant Blade)",
    "nameEn": "Revenant Blade",
    "source": "Eberron - Rising from the Last War",
    "category": "Combate",
    "prerequisite": "Elf",
    "description": "You are descended from a master of the double-bladed scimitar, and some of that mastery has passed on to you. You gain the following benefits:",
    "benefits": [
      "Increase your Dexterity or Strength score by 1, to a maximum of 20.",
      "While you are holding a double-bladed scimitar with two hands, you gain a +1 bonus to Armor Class.",
      "A double-bladed scimitar has the finesse property when you wield it."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "dex"
      ],
      "amount": 1
    }
  },
  {
    "id": "second-chance",
    "name": "Second Chance (Second Chance)",
    "nameEn": "Second Chance",
    "source": "Xanathar's Guide to Everything",
    "category": "Combate",
    "prerequisite": "Halfling",
    "description": "Fortune favors you when someone tries to strike you. You gain the following benefits:",
    "benefits": [
      "Increase your Dexterity, Constitution, or Charisma score by 1, to a maximum of 20.",
      "When a creature you can see hits you with an attack roll, you can use your reaction to force that creature to reroll. Once you use this ability, you can’t use it again until you roll initiative at the start of combat or until you finish a short or long rest."
    ],
    "abilityBonus": {
      "stats": [
        "dex",
        "con",
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "svirfneblin-magic",
    "name": "Svirfneblin Magic (Svirfneblin Magic)",
    "nameEn": "Svirfneblin Magic",
    "source": "Mordenkainen's Tome of Foes",
    "category": "Magia",
    "prerequisite": "Gnome (Deep Gnome)",
    "description": "You have inherited the innate spellcasting ability of your ancestors. This ability allows you to cast Nondetection on yourself at will, without needing a material component.\n\nYou can also cast each of the following spells once with this ability: Blindness/Deafness, Blur, and Disguise Self. You regain the ability to cast these spells when you finish a long rest. Intelligence is your spellcasting ability for these spells",
    "benefits": [
      "You have inherited the innate spellcasting ability of your ancestors. This ability allows you to cast Nondetection on yourself at will, without needing a material component.\n\nYou can also cast each of the following spells once with this ability: Blindness/Deafness, Blur, and Disguise Self. You regain the ability to cast these spells when you finish a long rest. Intelligence is your spellcasting ability for these spells"
    ]
  },
  {
    "id": "wood-elf-magic",
    "name": "Wood Elf Magic (Wood Elf Magic)",
    "nameEn": "Wood Elf Magic",
    "source": "Xanathar's Guide to Everything",
    "category": "Magia",
    "prerequisite": "Elf (Wood)",
    "description": "You learn the magic of the primeval woods, which are revered and protected by your people. You learn one Druid cantrip of your choice. You also learn the Longstrider and Pass Without Trace spells, each of which you can cast once without expending a spell slot. You regain the ability to cast these two spells in this way when you finish a long rest. Wisdom is your spellcasting ability for all three spells.",
    "benefits": [
      "You learn the magic of the primeval woods, which are revered and protected by your people. You learn one Druid cantrip of your choice. You also learn the Longstrider and Pass Without Trace spells, each of which you can cast once without expending a spell slot. You regain the ability to cast these two spells in this way when you finish a long rest. Wisdom is your spellcasting ability for all three spells."
    ]
  },
  {
    "id": "barbed-hide",
    "name": "Barbed Hide (Barbed Hide)",
    "nameEn": "Barbed Hide",
    "source": "Unearthed Arcana 39 - Feats for Races",
    "category": "Combate",
    "prerequisite": "Tiefling",
    "description": "One of your ancestors was a barbed devil or other spiky fiend. Barbs protrude from your head. You gain the following benefits:",
    "benefits": [
      "Increase your Constitution or Charisma score by 1, up to a maximum of 20.",
      "You gain proficiency in the Intimidation skill. If you’re already proficient in it, your proficiency bonus is doubled for any check you make with it.",
      "As a bonus action, you can cause small barbs to protrude all over your body or cause them to retract. At the start of each of your turns while the barbs are out, you deal 1d6 piercing damage to any creature grappling you or any creature grappled by you."
    ],
    "abilityBonus": {
      "stats": [
        "con",
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "critter-friend",
    "name": "Critter Friend (Critter Friend)",
    "nameEn": "Critter Friend",
    "source": "Unearthed Arcana 39 - Feats for Races",
    "category": "Magia",
    "prerequisite": "Gnome (forest)",
    "description": "Your friendship with animals mystically deepens. You gain the following benefits:",
    "benefits": [
      "You gain proficiency in the Animal Handling skill. If you’re already proficient in it, your proficiency bonus is doubled for any check you make with it.",
      "You learn the Speak with Animals spell and can cast it at will, without expending a spell slot. You also learn the Animal Friendship spell, and you can cast it once with this feat, without expending a spell slot. You regain the ability to cast it in this way when you finish a long rest. Wisdom is your spellcasting ability for these spells."
    ]
  },
  {
    "id": "dragon-wings",
    "name": "Dragon Wings (Dragon Wings)",
    "nameEn": "Dragon Wings",
    "source": "Unearthed Arcana 39 - Feats for Races",
    "category": "Combate",
    "prerequisite": "Dragonborn",
    "description": "You sprout draconic wings. With your wings, you have a flying speed of 20 feet if you aren’t wearing heavy armor and aren't exceeding your carrying capacity.",
    "benefits": [
      "You sprout draconic wings. With your wings, you have a flying speed of 20 feet if you aren’t wearing heavy armor and aren't exceeding your carrying capacity."
    ]
  },
  {
    "id": "everybodys-friend",
    "name": "Everybody's Friend (Everybody's Friend)",
    "nameEn": "Everybody's Friend",
    "source": "Unearthed Arcana 39 - Feats for Races",
    "category": "Utilidad",
    "prerequisite": "Half-elf",
    "description": "You develop your magnetic personality to ease your way through the world. You gain the following benefits:",
    "benefits": [
      "Increase your Charisma score by 1, up to a maximum of 20.",
      "You gain proficiency in Deception and Persuasion skills. If you're already proficient in either skill, your proficiency bonus is doubled for any check you make with that skill."
    ],
    "abilityBonus": {
      "stats": [
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "grudge-bearer",
    "name": "Grudge Bearer (Grudge Bearer)",
    "nameEn": "Grudge Bearer",
    "source": "Unearthed Arcana 39 - Feats for Races",
    "category": "Combate",
    "prerequisite": "Dwarf",
    "description": "You have a deep hatred for a particular kind of creature. Choose your foes, a type of creature to bear the burden of your wrath: aberrations, beasts, celestials, constructs, dragons, elementals, fey, fiends, giants, monstrosities, oozes, plants, or undead. Alternatively, you can choose two races of humanoid (such as gnolls and orcs). You gain the following benefits:",
    "benefits": [
      "Increase your Strength, Constitution, or Wisdom score by 1, to a maximum of 20.",
      "During the first round of any combat against your chosen foes, your attack rolls against any of them have advantage.",
      "When any of your chosen foes makes an opportunity attack against you, it makes the attack roll with disadvantage.",
      "Whenever you make an Intelligence (Arcana, History, Nature, or Religion) check to recall information about your chosen foes, you add double your proficiency bonus to the check, even if you’re not normally proficient."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "con",
        "wis"
      ],
      "amount": 1
    }
  },
  {
    "id": "human-determination",
    "name": "Human Determination (Human Determination)",
    "nameEn": "Human Determination",
    "source": "Unearthed Arcana 39 - Feats for Races",
    "category": "Combate",
    "prerequisite": "Human",
    "description": "You are filled with a determination that can draw the unreachable within your reach. You gain the following benefits:",
    "benefits": [
      "Increase one ability score of your choice by 1, to a maximum of 20.",
      "When you make an attack roll, an ability check, or a saving throw, you can do so with advantage. Once you use this ability, you can’t use it again until you finish a short or long rest."
    ],
    "abilityBonus": {
      "flexible": true,
      "amount": 1
    }
  },
  {
    "id": "orcish-aggression",
    "name": "Orcish Aggression (Orcish Aggression)",
    "nameEn": "Orcish Aggression",
    "source": "Unearthed Arcana 39 - Feats for Races",
    "category": "General",
    "prerequisite": "Half-orc",
    "description": "As a bonus action, you can move up to your speed toward an enemy of your choice that you can see or hear. You must end this move closer to the enemy than you started.",
    "benefits": [
      "As a bonus action, you can move up to your speed toward an enemy of your choice that you can see or hear. You must end this move closer to the enemy than you started."
    ]
  },
  {
    "id": "wonder-maker",
    "name": "Wonder Maker (Wonder Maker)",
    "nameEn": "Wonder Maker",
    "source": "Unearthed Arcana 39 - Feats for Races",
    "category": "Utilidad",
    "prerequisite": "Gnome (rock)",
    "description": "You master the tinker techniques of your people. You gain the following benefits:",
    "benefits": [
      "Increase your Dexterity or Intelligence score by 1, to a maximum of 20.",
      "When you make a check using your proficiency with tinker’s tools, you add double your proficiency bonus to the check.",
      "When you make a device with your Tinker trait, you have the following additional options for what you make: ***Alarm***: This device senses when a creature moves to within 15 feet of it without speaking aloud a password chosen when you create it. One round after a creature moves into range, the alarm makes a shrill ringing that lasts for 1 minute and can be heard from up to 300 feet away.",
      "***Calculator***: This device makes doing sums easy.",
      "***Lifter***: This device can be used as a block and tackle, allowing its user to hoist five times the weight the user can normally lift.",
      "***Timekeeper***: This pocket watch keeps accurate time.",
      "***Weather Sensor***: When used as an action, this device predicts weather conditions in a 1-mile radius over the next 4 hours, showing one symbol (clouds, sun/moon, rain, or snow) for each hour"
    ],
    "abilityBonus": {
      "stats": [
        "dex",
        "int"
      ],
      "amount": 1
    }
  },
  {
    "id": "vampiric-exultation",
    "name": "Vampiric Exultation (Vampiric Exultation)",
    "nameEn": "Vampiric Exultation",
    "source": "Plane Shift - Ixalan",
    "category": "General",
    "prerequisite": "Vampire (Ixalan)",
    "description": "As an action, you can transform the lower half of your body into an inky black vapor, allowing you to float through the air. While transformed, you have a flying speed of 30 feet. You can maintain this form for up to 10 minutes. Once you use this ability, you can't use it again until you finish a short or long rest.",
    "benefits": [
      "As an action, you can transform the lower half of your body into an inky black vapor, allowing you to float through the air. While transformed, you have a flying speed of 30 feet. You can maintain this form for up to 10 minutes. Once you use this ability, you can't use it again until you finish a short or long rest."
    ]
  },
  {
    "id": "acrobat",
    "name": "Acrobat (Acrobat)",
    "nameEn": "Acrobat",
    "source": "Unearthed Arcana 38 - Feats for Skills",
    "category": "Utilidad",
    "description": "You become more nimble, gaining the following benefits:",
    "benefits": [
      "Increase your Dexterity score by 1, to a maximum of 20.",
      "You gain proficiency in the Acrobatics skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
      "As a bonus action, you can make a DC 15 Dexterity (Acrobatics) check. If you succeed, difficult terrain doesn’t cost you extra movement until the end of the current turn."
    ],
    "abilityBonus": {
      "stats": [
        "dex"
      ],
      "amount": 1
    }
  },
  {
    "id": "alchemist",
    "name": "Alchemist (Alchemist)",
    "nameEn": "Alchemist",
    "source": "Unearthed Arcana 15 - Feats",
    "category": "Utilidad",
    "description": "You have studied the secrets of alchemy and are an expert in its practice, gaining the following benefits:",
    "benefits": [
      "Increase your Intelligence score by 1, to a maximum of 20.",
      "You gain proficiency with alchemist’s supplies. If you are already proficient with them, you double your proficiency bonus to checks you make with them.",
      "As an action, you can identify one potion within 5 feet of you, as if you had tasted it. You must see the liquid for this benefit to work.",
      "Over the course of any short rest, you can temporarily improve the potency of one potion of healing of any rarity. To use this benefit, you must have alchemist’s supplies with you, and the potion must be within reach. If the potion is drunk no more than 1 hour after the short rest ends, the creature drinking the potion can forgo the potion’s die roll and regains the maximum number of hit points that the potion can restore."
    ],
    "abilityBonus": {
      "stats": [
        "int"
      ],
      "amount": 1
    }
  },
  {
    "id": "animal-handler",
    "name": "Animal Handler (Animal Handler)",
    "nameEn": "Animal Handler",
    "source": "Unearthed Arcana 38 - Feats for Skills",
    "category": "Utilidad",
    "description": "You master the techniques needed to train and handle animals. You gain the following benefits:",
    "benefits": [
      "Increase your Wisdom score by 1, to a maximum of 20.",
      "You gain proficiency in the Animal Handling skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
      "You can use a bonus action on your turn to command one friendly beast within 60 feet of you that can hear you and that isn’t currently following the command of someone else. You decide now what action the beast will take and where it will move during its next turn, or you issue a general command that lasts for 1 minute, such as to guard a particular area."
    ],
    "abilityBonus": {
      "stats": [
        "wis"
      ],
      "amount": 1
    }
  },
  {
    "id": "arcanist",
    "name": "Arcanist (Arcanist)",
    "nameEn": "Arcanist",
    "source": "Unearthed Arcana 38 - Feats for Skills",
    "category": "Magia",
    "description": "You study the arcane arts, gaining the following benefits:",
    "benefits": [
      "Increase your Intelligence score by 1, to a maximum of 20.",
      "You gain proficiency in the Arcana skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
      "You learn the Prestidigitation and Detect Magic spells. You can cast Detect Magic once without expending a spell slot, and you regain the ability to do so when you finish a long rest."
    ],
    "abilityBonus": {
      "stats": [
        "int"
      ],
      "amount": 1
    }
  },
  {
    "id": "blade-mastery",
    "name": "Blade Mastery (Blade Mastery)",
    "nameEn": "Blade Mastery",
    "source": "Unearthed Arcana 15 - Feats",
    "category": "Combate",
    "description": "You master the shortsword, longsword, scimitar, rapier, and greatsword. You gain the following benefits when using any of them:",
    "benefits": [
      "You gain a +1 bonus to attack rolls you make with the weapon.",
      "On your turn, you can use your reaction to assume a parrying stance, provided you have the weapon in hand. Doing so grants a +1 bonus to your AC until the start of your next turn or until you're not holding the weapon.",
      "When you make an opportunity attack with the weapon, you have advantage on the attack roll."
    ]
  },
  {
    "id": "brawny",
    "name": "Brawny (Brawny)",
    "nameEn": "Brawny",
    "source": "Unearthed Arcana 38 - Feats for Skills",
    "category": "Utilidad",
    "description": "You become stronger, gaining the following benefits:",
    "benefits": [
      "Increase your Strength score by 1, to a maximum of 20.",
      "You gain proficiency in the Athletics skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
      "You count as if you were one size larger for the purpose of determining your carrying capacity."
    ],
    "abilityBonus": {
      "stats": [
        "str"
      ],
      "amount": 1
    }
  },
  {
    "id": "burglar",
    "name": "Burglar (Burglar)",
    "nameEn": "Burglar",
    "source": "Unearthed Arcana 15 - Feats",
    "category": "Utilidad",
    "description": "You pride yourself on your quickness and your close study of certain clandestine activities. You gain the following benefits:",
    "benefits": [
      "Increase your Dexterity score by 1, to a maximum of 20.",
      "You gain proficiency with thieves’ tools. If you are already proficient with them, you add double your proficiency bonus to checks you make with them."
    ],
    "abilityBonus": {
      "stats": [
        "dex"
      ],
      "amount": 1
    }
  },
  {
    "id": "diplomat",
    "name": "Diplomat (Diplomat)",
    "nameEn": "Diplomat",
    "source": "Unearthed Arcana 38 - Feats for Skills",
    "category": "Utilidad",
    "description": "You master the arts of diplomacy, gaining the following benefits:",
    "benefits": [
      "Increase your Charisma score by 1, to a maximum of 20.",
      "You gain proficiency in the Persuasion skill. If you are already proficient in this skill, you add double your proficiency bonus to checks you make with it.",
      "If you spend 1 minute talking to someone who can understand what you say, you can make a Charisma (Persuasion) check contested by the creature's Wisdom (Insight) check. If you or your companions are fighting the creature, your check automatically fails. If your check succeeds, the target is charmed by you as long as it remains within 60 feet of you and for 1 minute thereafter."
    ],
    "abilityBonus": {
      "stats": [
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "empathic",
    "name": "Empathic (Empathic)",
    "nameEn": "Empathic",
    "source": "Unearthed Arcana 38 - Feats for Skills",
    "category": "Combate",
    "description": "You possess keen insight into how other people think and feel. You gain the following benefits:",
    "benefits": [
      "Increase your Wisdom score by 1, to a maximum of 20.",
      "You gain proficiency in the Insight skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
      "You can use your action to try to get uncanny insight about one humanoid you can see within 30 feet of you. Make a Wisdom (Insight) check contested by the target’s Charisma (Deception) check. If your check succeeds, you have advantage on attack rolls and ability checks against the target until the end of your next turn."
    ],
    "abilityBonus": {
      "stats": [
        "wis"
      ],
      "amount": 1
    }
  },
  {
    "id": "fell-handed",
    "name": "Fell Handed (Fell Handed)",
    "nameEn": "Fell Handed",
    "source": "Unearthed Arcana 14 - Feats",
    "category": "Combate",
    "description": "You master the handaxe, battleaxe, greataxe, warhammer, and maul. You gain the following benefits when using any of them:",
    "benefits": [
      "You gain a +1 bonus to attack rolls you make with the weapon.",
      "Whenever you have advantage on a melee attack roll you make with the weapon and hit, you can also knock the target prone if the lower of the two d20 rolls would also hit the target.",
      "Whenever you have disadvantage on a melee attack roll you make with the weapon, the target takes bludgeoning damage equal to your Strength modifier (minimum of 0) if the attack misses but the higher of the two d20 rolls would have hit.",
      "If you use the Help action to aid an ally's melee attack while you're wielding the weapon, you knock the target's shield aside momentarily. In addition to the ally gaining advantage on the attack roll, the ally gains a +2 bonus to the roll if the target is using a shield"
    ]
  },
  {
    "id": "flail-mastery",
    "name": "Flail Mastery (Flail Mastery)",
    "nameEn": "Flail Mastery",
    "source": "Unearthed Arcana 15 - Feats",
    "category": "Combate",
    "description": "The flail is a tricky weapon to use, but you have spent countless hours mastering it. You gain the following benefits:",
    "benefits": [
      "You gain a +1 bonus to attack rolls you make with a flail.",
      "As a bonus action on your turn, you can prepare yourself to extend your flail to sweep over targets’ shields. Until the end of this turn, your attack rolls with a flail gain a +2 bonus against any target using a shield.",
      "When you hit with an opportunity attack using a flail, the target must succeed on a Strength saving throw (DC 8 + your proficiency bonus + your Strength modifier) or be knocked prone."
    ]
  },
  {
    "id": "gourmand",
    "name": "Gourmand (Gourmand)",
    "nameEn": "Gourmand",
    "source": "Unearthed Arcana 15 - Feats",
    "category": "Utilidad",
    "description": "You have mastered a variety of special recipes, allowing you to prepare exotic dishes with useful effects. You gain the following benefits:",
    "benefits": [
      "Increase your Constitution score by 1, to a maximum of 20.",
      "You gain proficiency with cook’s utensils. If you are already proficient with them, you add double your proficiency bonus to checks you make with them.",
      "As an action, you can inspect a drink or plate of food within 5 feet of you and determine whether it is poisoned, provided that you can see and smell it.",
      "During a long rest, you can prepare and serve a meal that helps you and your allies recover from the rigors of adventuring, provided you have suitable food, cook’s utensils, and other supplies on hand. The meal serves up to six people, and each person who eats it regains two additional Hit Dice at the end of the long rest. In addition, those who partake of the meal have advantage on Constitution saving throws against disease for the next 24 hours."
    ],
    "abilityBonus": {
      "stats": [
        "con"
      ],
      "amount": 1
    }
  },
  {
    "id": "greater-dragonmark",
    "name": "Greater Dragonmark (Greater Dragonmark)",
    "nameEn": "Greater Dragonmark",
    "source": "Wayfinder's Guide to Eberron",
    "category": "Magia",
    "prerequisite": "8th level, character must possess a dragonmark",
    "description": "Your dragonmark has grown in size and power. This enhances your existing dragonmark, and the benefits are based on the mark that you already possess. A greater dragonmark provides the following benefits:",
    "benefits": [
      "The die type of your dragonmarked Intuition Die increases by one (for example, from a d4 to a d6).",
      "Increase one ability score by 1, to a maximum of 20. The abilities available to you are based on your mark, as shown on the Greater Dragonmark Benefits table.",
      "You learn a set of spells, each of which you can cast once without expending a spell slot or using a material component. The list of spells, the spellcasting ability for them, and the type of rest you must complete to regain the use of these spells are shown on the Greater Dragonmark Benefits table. **Greater Dragonmarks Benefits** | Dragonmark | Ability | Spells | Spellcasting Ability | Rest Required | | Detection | Charisma or Intelligence | See Invisibility, True Seeing | Intelligence | Long | | Finding | Dexterity, Strength, or Wisdom | Locate Creature, Find the Path | Wisdom | Long | | Handling | Dexterity or Wisdom | Beast Sense, Dominate Beast | Wisdom | Long | | Healing | Dexterity or Wisdom | Mass Healing Word, Greater Restoration | Wisdom | Long | | Hospitality | Charisma or Dexterity | Sanctuary, Mordenkainen's Magnificent Mansion | Charisma | Long | | Making | Dexterity or Intelligence | Fabricate, Creation | Intelligence | Long | | Passage | Dexterity or Constitution | Blink, Teleportation Circle | Constitution | Long | | Scribing | Intelligence or Charisma | Sending, Tongues | Intelligence | Long or Short | | Sentinel | Strength or Wisdom | Compelled Duel, Warding Bond | Wisdom | Long or Short | | Shadow | Charisma or Dexterity | Nondetection, Mislead | Charisma | Long | | Storm | Charisma or Dexterity | Control Water, Control Winds | Charisma | Long | | Warding | Dexterity or Intelligence | Knock, Glyph of Warding, Leomund's Secret Chest** | Intelligence | Long | ** To cast Leomund’s Secret Chest using this feat and the Mark of Warding, you must have a Siberys dragonshard with a value of at least 100 gp. While you have this dragonshard in hand, it serves as the spell’s focus, and you can use it to summon and dismiss the chest."
    ]
  },
  {
    "id": "historian",
    "name": "Historian (Historian)",
    "nameEn": "Historian",
    "source": "Unearthed Arcana 38 - Feats for Skills",
    "category": "Utilidad",
    "description": "Your study of history rewards you with the following benefits:\n\n• Increase your Intelligence score by 1, to a maximum of 20.\n\n• You gain proficiency in the History skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.\n\n• When you take the Help action to aid another creature’s ability check, you can make a DC 15 Intelligence (History) check. On a success, that creature’s check gains a bonus equal to your proficiency bonus, as you share pertinent advice and historical examples. To receive this bonus, the creature must be able to understand what you’re saying.",
    "benefits": [
      "Your study of history rewards you with the following benefits:\n\n• Increase your Intelligence score by 1, to a maximum of 20.\n\n• You gain proficiency in the History skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.\n\n• When you take the Help action to aid another creature’s ability check, you can make a DC 15 Intelligence (History) check. On a success, that creature’s check gains a bonus equal to your proficiency bonus, as you share pertinent advice and historical examples. To receive this bonus, the creature must be able to understand what you’re saying."
    ],
    "abilityBonus": {
      "stats": [
        "int"
      ],
      "amount": 1
    }
  },
  {
    "id": "investigator",
    "name": "Investigator (Investigator)",
    "nameEn": "Investigator",
    "source": "Unearthed Arcana 38 - Feats for Skills",
    "category": "Utilidad",
    "description": "You have an eye for detail and can pick out the smallest clues. You gain the following benefits:",
    "benefits": [
      "Increase your Intelligence score by 1, to a maximum of 20.",
      "You gain proficiency in the Investigation skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
      "You can take the Search action as a bonus action."
    ],
    "abilityBonus": {
      "stats": [
        "int"
      ],
      "amount": 1
    }
  },
  {
    "id": "master-of-disguise",
    "name": "Master of Disguise (Master of Disguise)",
    "nameEn": "Master of Disguise",
    "source": "Unearthed Arcana 15 - Feats",
    "category": "Utilidad",
    "description": "You have honed your ability to shape your personality and to read the personalities of others. You gain the following benefits:",
    "benefits": [
      "Increase your Charisma score by 1, to a maximum of 20.",
      "You gain proficiency with the disguise kit. If you are already proficient with it, you add double your proficiency bonus to checks you make with it.",
      "If you spend 1 hour observing a creature, you can then spend 8 hours crafting a disguise you can quickly don to mimic that creature. Making the disguise requires a disguise kit. You must make checks as normal to disguise yourself, but you can assume the disguise as an action."
    ],
    "abilityBonus": {
      "stats": [
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "medic",
    "name": "Medic (Medic)",
    "nameEn": "Medic",
    "source": "Unearthed Arcana 38 - Feats for Skills",
    "category": "Utilidad",
    "description": "You master the physician's arts, gaining the following benefits:",
    "benefits": [
      "Increase your Wisdom score by 1, to a maximum of 20.",
      "You gain proficiency in the Medicine skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
      "During a short rest, you can clean and bind the wounds of up to six willing beasts and humanoids. Make a DC 15 Wisdom (Medicine) check for each creature. On a success, if a creature spends a Hit Die during this rest, that creature can forgo the roll and instead regain the maximum number of hit points the die can restore. A creature can do so only once per rest, regardless of how many Hit Dice it spends."
    ],
    "abilityBonus": {
      "stats": [
        "wis"
      ],
      "amount": 1
    }
  },
  {
    "id": "menacing",
    "name": "Menacing (Menacing)",
    "nameEn": "Menacing",
    "source": "Unearthed Arcana 38 - Feats for Skills",
    "category": "Combate",
    "description": "You become fearsome to others, gaining the following benefits:",
    "benefits": [
      "Increase your Charisma score by 1, to a maximum of 20.",
      "You gain proficiency in the Intimidation skill. If you are already proficiency in the skill, you add double your proficiency bonus to checks you make with it.",
      "When you take the Attack action on your turn, you can replace one attack with an attempt to demoralize one humanoid you can see within 30 feet of you that can see and hear you. Make a Charisma (Intimidation) check contested by the target's Wisdom (Insight) check. If your check succeeds, the target is frightened until the end of your next turn. If your check fails, the target can't be frightened by you in this way for 1 hour."
    ],
    "abilityBonus": {
      "stats": [
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "metabolic-control",
    "name": "Metabolic Control (Metabolic Control)",
    "nameEn": "Metabolic Control",
    "source": "Unearthed Arcana 71 - Psionic Options Revisited",
    "category": "General",
    "prerequisite": "Psionic Talent feature or Wild Talent feat",
    "description": "You have refined psionic control over your body’s functions. You gain the following benefits:",
    "benefits": [
      "Increase your Strength, Dexterity, or Constitution score by 1, to a maximum of 20.",
      "If your Psionic Talent die is available, you can take an action to channel your psionic power to nourish yourself for the next 24 hours, as if you consumed sufficient food and water for a day. When you take this action, your Psionic Talent die decreases by one die size.",
      "If your Psionic Talent die is available, you can meditate for 1 minute, at the end of which you gain the benefits of finishing a short rest, and your Psionic Talent die decreases by one die size. You can’t meditate in this way again until you finish a long rest."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "dex",
        "con"
      ],
      "amount": 1
    }
  },
  {
    "id": "naturalist",
    "name": "Naturalist (Naturalist)",
    "nameEn": "Naturalist",
    "source": "Unearthed Arcana 38 - Feats for Skills",
    "category": "Magia",
    "description": "Your extensive study of nature rewards you with the following benefits:",
    "benefits": [
      "Increase your Intelligence score by 1, to a maximum of 20.",
      "You gain proficiency in the Nature skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
      "You learn the Druidcraft and Detect Poison and Disease spells. You can cast detect poison and disease once without expending a spell slot, and you regain the ability to do so when you finish a long rest."
    ],
    "abilityBonus": {
      "stats": [
        "int"
      ],
      "amount": 1
    }
  },
  {
    "id": "perceptive",
    "name": "Perceptive (Perceptive)",
    "nameEn": "Perceptive",
    "source": "Unearthed Arcana 38 - Feats for Skills",
    "category": "Utilidad",
    "description": "You hone your senses until they become razor sharp. You gain the following benefits:",
    "benefits": [
      "Increase your Wisdom score by 1, to a maximum of 20.",
      "You gain proficiency in the Perception skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
      "Being in a lightly obscured area doesn't impose disadvantage on your Wisdom (Perception) checks if you can both see and hear."
    ],
    "abilityBonus": {
      "stats": [
        "wis"
      ],
      "amount": 1
    }
  },
  {
    "id": "performer",
    "name": "Performer (Performer)",
    "nameEn": "Performer",
    "source": "Unearthed Arcana 38 - Feats for Skills",
    "category": "Utilidad",
    "description": "You master performance so that you can command any stage. You gain the following benefits:",
    "benefits": [
      "Increase your Charisma score by 1, to a maximum of 20.",
      "You gain proficiency in the Performance skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
      "While performing, you can try to distract one humanoid you can see who can see and hear you. Make a Charisma (Performance) check contested by the humanoid's Wisdom (Insight) check. If your check succeeds, you grab the humanoid's attention enough that it makes Wisdom (Perception) and Intelligence (Investigation) checks with disadvantage until you stop performing."
    ],
    "abilityBonus": {
      "stats": [
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "practiced-expert",
    "name": "Practiced Expert (Practiced Expert)",
    "nameEn": "Practiced Expert",
    "source": "Unearthed Arcana 73 - Feats",
    "category": "Utilidad",
    "description": "You have honed your proficiency with particular skills or tools, gaining the following benefits:",
    "benefits": [
      "Increase one ability score of your choice by 1, to a maximum of 20.",
      "You gain proficiency with one skill or tool of your choice.",
      "Choose one of your skill or tool proficiencies. Your proficiency bonus is doubled for any ability check you make that uses the chosen proficiency."
    ],
    "abilityBonus": {
      "flexible": true,
      "amount": 1
    }
  },
  {
    "id": "quick-fingered",
    "name": "Quick-Fingered (Quick-Fingered)",
    "nameEn": "Quick-Fingered",
    "source": "Unearthed Arcana 38 - Feats for Skills",
    "category": "Utilidad",
    "description": "Your nimble fingers and agility let you perform sleight of hand. You gain the following benefits:",
    "benefits": [
      "Increase your Dexterity score by 1, to a maximum of 20.",
      "You gain proficiency in the Sleight of Hand skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
      "As a bonus action, you can make a Dexterity (Sleight of Hand) check to plant something on someone else, conceal an object on a creature, lift a purse, or take something from a pocket."
    ],
    "abilityBonus": {
      "stats": [
        "dex"
      ],
      "amount": 1
    }
  },
  {
    "id": "shield-training",
    "name": "Shield Training (Shield Training)",
    "nameEn": "Shield Training",
    "source": "Unearthed Arcana 73 - Feats",
    "category": "Magia",
    "description": "You’ve trained in the effective use of shields. You gain the following benefits:",
    "benefits": [
      "Increase your Strength, Dexterity, or Constitution score by 1, to a maximum of 20.",
      "You gain proficiency with shields.",
      "In combat, you can don or doff a shield as the free object interaction on your turn.",
      "If you have the Spellcasting or Pact Magic feature, you can use a shield as a spellcasting focus."
    ],
    "abilityBonus": {
      "stats": [
        "str",
        "dex",
        "con"
      ],
      "amount": 1
    }
  },
  {
    "id": "silver-tongued",
    "name": "Pico de Oro (Silver-Tongued)",
    "nameEn": "Silver-Tongued",
    "source": "Unearthed Arcana 38 - Feats for Skills",
    "category": "Combate",
    "description": "Desarrollas tu habilidad conversacional para engañar mejor a otros. Obtienes los siguientes beneficios:",
    "benefits": [
      "Aumenta tu puntuación de Carisma en 1, hasta un máximo de 20.",
      "Ganas competencia en la habilidad Engaño. Si ya eres competente en ella, sumas el doble de tu bonificador de competencia a las pruebas que hagas con ella.",
      "Cuando realizas la acción de Atacar en tu turno, puedes reemplazar un ataque por un intento de engañar a un humanoide que puedas ver a 30 pies o menos y que pueda verte y oírte. Haz una prueba de Carisma (Engaño) enfrentada a la prueba de Sabiduría (Perspicacia) del objetivo. Si tienes éxito, tu movimiento no provoca ataques de oportunidad del objetivo y tus tiradas de ataque contra él tienen ventaja; ambos beneficios duran hasta el final de tu siguiente turno o hasta que uses esta habilidad contra un objetivo diferente. Si fallas, el objetivo no puede ser engañado por ti de esta manera durante 1 hora."
    ],
    "abilityBonus": {
      "stats": [
        "cha"
      ],
      "amount": 1
    }
  },
  {
    "id": "spear-mastery",
    "name": "Maestría con Lanza (Spear Mastery)",
    "nameEn": "Spear Mastery",
    "source": "Unearthed Arcana 15 - Feats",
    "category": "Combate",
    "description": "Aunque la lanza es un arma sencilla de aprender, te recompensa por el tiempo dedicado a dominarla. Obtienes los siguientes beneficios:\n\n• Ganas un bonificador de +1 a las tiradas de ataque que realices con una lanza.\n\n• Cuando usas una lanza, su dado de daño cambia de 1d6 a 1d8, y de 1d8 a 1d10 cuando se empuña a dos manos.\n\n• Puedes preparar tu lanza para recibir una carga. Como acción adicional, elige una criatura a 20 pies o más de ti. Si se mueve al alcance de tu lanza en su siguiente turno, puedes hacer un ataque cuerpo a cuerpo contra ella como reacción (+1d8 de daño perforante extra, o +1d10 a dos manos).\n\n• Como acción adicional en tu turno, puedes aumentar tu alcance con una lanza en 5 pies durante el resto de tu turno.",
    "benefits": [
      "Ganas un bonificador de +1 a las tiradas de ataque que realices con una lanza.",
      "Cuando usas una lanza, su dado de daño cambia de 1d6 a 1d8, y de 1d8 a 1d10 cuando se empuña a dos manos.",
      "Puedes preparar tu lanza para recibir una carga como acción adicional contra una criatura a 20 pies o más: reacción para atacar si entra en tu alcance (+1d8 o +1d10 de daño).",
      "Como acción adicional en tu turno, aumentas tu alcance con la lanza en 5 pies durante el resto de tu turno."
    ]
  },
  {
    "id": "stealthy",
    "name": "Sigiloso (Stealthy)",
    "nameEn": "Stealthy",
    "source": "Unearthed Arcana 38 - Feats for Skills",
    "category": "Utilidad",
    "description": "Sabes cómo ocultarte de la forma más efectiva. Obtienes los siguientes beneficios:",
    "benefits": [
      "Aumenta tu puntuación de Destreza en 1, hasta un máximo de 20.",
      "Ganas competencia en la habilidad Sigilo. Si ya eres competente en ella, sumas el doble de tu bonificador de competencia a las pruebas que hagas con ella.",
      "Si estás oculto, puedes moverte hasta 10 pies al descubierto sin revelarte si terminas el movimiento en una posición donde no seas claramente visible."
    ],
    "abilityBonus": {
      "stats": [
        "dex"
      ],
      "amount": 1
    }
  },
  {
    "id": "survivalist",
    "name": "Superviviente Experto (Survivalist)",
    "nameEn": "Survivalist",
    "source": "Unearthed Arcana 38 - Feats for Skills",
    "category": "Magia",
    "description": "Dominas el conocimiento de la naturaleza salvaje, obteniendo los siguientes beneficios:",
    "benefits": [
      "Aumenta tu puntuación de Sabiduría en 1, hasta un máximo de 20.",
      "Ganas competencia en la habilidad Supervivencia. Si ya eres competente en ella, sumas el doble de tu bonificador de competencia a las pruebas que hagas con ella.",
      "Aprendes el conjuro Alarma. Puedes lanzarlo una vez sin gastar ranuras de conjuro tras cada descanso largo."
    ],
    "abilityBonus": {
      "stats": [
        "wis"
      ],
      "amount": 1
    }
  },
  {
    "id": "tandem-tactician",
    "name": "Táctico en Pareja (Tandem Tactician)",
    "nameEn": "Tandem Tactician",
    "source": "Unearthed Arcana 73 - Feats",
    "category": "Combate",
    "description": "Tu presencia en una escaramuza eleva la efectividad de tus camaradas. Obtienes los siguientes beneficios:",
    "benefits": [
      "Puedes usar la acción de Ayudar como acción adicional.",
      "Cuando usas la acción de Ayudar para asistir a un aliado en atacar a una criatura, aumenta el alcance de la acción de Ayudar en 10 pies. Además, puedes ayudar a dos aliados que ataquen a la misma criatura dentro del alcance."
    ]
  },
  {
    "id": "theologian",
    "name": "Teólogo (Theologian)",
    "nameEn": "Theologian",
    "source": "Unearthed Arcana 38 - Feats for Skills",
    "category": "Magia",
    "description": "Tu extenso estudio de la religión te recompensa con los siguientes beneficios:",
    "benefits": [
      "Aumenta tu puntuación de Inteligencia en 1, hasta un máximo de 20.",
      "Ganas competencia en la habilidad Religión. Si ya eres competente en ella, sumas el doble de tu bonificador de competencia a las pruebas que hagas con ella.",
      "Aprendes los trucos Taumaturgia y Detectar el Bien y el Mal. Puedes lanzar Detectar el Bien y el Mal una vez sin gastar ranuras de conjuro tras cada descanso largo."
    ],
    "abilityBonus": {
      "stats": [
        "int"
      ],
      "amount": 1
    }
  },
  {
    "id": "tower-of-iron-will",
    "name": "Torre de Voluntad Férrea (Tower of Iron Will)",
    "nameEn": "Tower of Iron Will",
    "source": "Unearthed Arcana 71 - Psionic Options Revisited",
    "category": "General",
    "prerequisite": "Rasgo Talento Psiónico o Dote Talento Salvaje",
    "description": "Las defensas de tu mente son formidables. Cuando tú u otra criatura que puedas ver a 30 pies o menos falle una tirada de salvación, puedes usar tu reacción para tirar tu dado de Talento Psiónico y sumar el resultado a la tirada de salvación, pudiendo hacer que tenga éxito.",
    "benefits": [
      "Cuando tú u otra criatura a 30 pies falle una tirada de salvación, usa tu reacción para tirar tu dado de Talento Psiónico y sumarlo a la salvación."
    ]
  },
  {
    "id": "tracker",
    "name": "Rastreador (Tracker)",
    "nameEn": "Tracker",
    "source": "Unearthed Arcana 73 - Feats",
    "category": "Magia",
    "description": "Has dedicado tiempo a cazar presas y perfeccionar tus sentidos, obteniendo los siguientes beneficios:",
    "benefits": [
      "Aumenta tu puntuación de Sabiduría en 1, hasta un máximo de 20.",
      "Aprendes el conjuro Marca del Cazador. Puedes lanzarlo una vez sin gastar ranura de conjuro por descanso largo, y también usando tus ranuras normales. Sabiduría es tu característica de lanzamiento.",
      "Tienes ventaja en las pruebas de Sabiduría (Supervivencia) para rastrear criaturas."
    ],
    "abilityBonus": {
      "stats": [
        "wis"
      ],
      "amount": 1
    }
  },
  {
    "id": "wild-talent",
    "name": "Talento Salvaje (Wild Talent)",
    "nameEn": "Wild Talent",
    "source": "Unearthed Arcana 71 - Psionic Options Revisited",
    "category": "Combate",
    "description": "Despiertas tu potencial psiónico latente, potenciando tu mente o cuerpo. Aumenta una puntuación de característica a tu elección en 1 (hasta un máximo de 20). Además, obtienes un Dado de Talento Psiónico (inicialmente 1d6) que puedes usar para potenciar pruebas de característica o impactos guiados en combate.",
    "benefits": [
      "Aumenta una característica a tu elección en 1, hasta un máximo de 20.",
      "Obtienes un Dado de Talento Psiónico (1d6) que escala a 1d8 (nv 5), 1d10 (nv 11) y 1d12 (nv 17).",
      "Característica Psio-Potenciada: Puedes tirar tu dado de Talento Psiónico y sumarlo a pruebas de la característica elegida.",
      "Impacto Guiado Psiónico: Una vez por turno al impactar, puedes reemplazar un dado de daño por el resultado de tu dado de Talento Psiónico.",
      "Reabastecimiento Psiónico: Como acción adicional, restablece tu dado a su tamaño inicial una vez por descanso largo."
    ],
    "abilityBonus": {
      "flexible": true,
      "amount": 1
    }
  }
];
