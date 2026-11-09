// Script to patch canonical Wikidot English names, descriptions, and categories into WIKIDOT_RACES in src/data/wikidotRacesData.ts
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/wikidotRacesData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Update interfaces
if (!content.includes('nameEn?: string;')) {
  content = content.replace(
    'export interface WikidotSubrace {\n  id: string;\n  name: string;',
    'export interface WikidotSubrace {\n  id: string;\n  name: string;\n  nameEn?: string;\n  description: string;\n  descriptionEn?: string;'
  );
  content = content.replace(
    'export interface WikidotRace {\n  id: string;\n  name: string;\n  category?: WikidotRaceCategory;',
    'export interface WikidotRace {\n  id: string;\n  name: string;\n  nameEn?: string;\n  category?: WikidotRaceCategory;\n  categoryEn?: string;\n  description: string;\n  descriptionEn?: string;'
  );
}

// Canonical Wikidot English dictionary for 5e races
const WIKIDOT_ENGLISH_RACES = {
  "humano": {
    nameEn: "Human",
    categoryEn: "Common",
    descriptionEn: "Humans are the most adaptable, diverse, and ambitious people among the common races. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.",
    subraces: {
      "humano-estandar": { nameEn: "Standard Human (PHB)", descriptionEn: "The versatile classic human: balanced across all physical and mental faculties." },
      "humano-variante": { nameEn: "Variant Human (PHB)", descriptionEn: "Specialized from their early days with an innate feat and versatile skill training." },
      "humano-marca-hallazgo": { nameEn: "Mark of Finding Human (Eberron)", descriptionEn: "Honed senses and supernatural intuition for tracking and discovery." },
      "humano-marca-manejo": { nameEn: "Mark of Handling Human (Eberron)", descriptionEn: "Primal kinship with beasts and monstrous creatures." },
      "humano-marca-creacion": { nameEn: "Mark of Making Human (Eberron)", descriptionEn: "Innate artisanal genius and arcane crafting aptitude." },
      "humano-marca-pasaje": { nameEn: "Mark of Passage Human (Eberron)", descriptionEn: "Gifted with rapid movement and spatial teleportation magic." },
      "humano-marca-centinela": { nameEn: "Mark of Sentinel Human (Eberron)", descriptionEn: "Vigilant protectors gifted with shield wards and warding magic." },
      "humano-kessig": { nameEn: "Kessig Human (Innistrad)", descriptionEn: "Hardy woodfolk and survivalists skilled in forest navigation." },
      "humano-gavony": { nameEn: "Gavony Human (Innistrad)", descriptionEn: "Disciplined parish guardians and resolute town defenders." },
      "humano-nephalia": { nameEn: "Nephalia Human (Innistrad)", descriptionEn: "Astute coastal merchants, smugglers, and alchemical scholars." },
      "humano-stensia": { nameEn: "Stensia Human (Innistrad)", descriptionEn: "Grim mountain survivalists tempered by brooding crags." }
    }
  },
  "elfo": {
    nameEn: "Elf",
    categoryEn: "Common",
    descriptionEn: "Elves are a magical people of otherworldly grace, living in the world but not entirely part of it. They live in places of ethereal beauty, in the midst of ancient forests or in silvery spires.",
    subraces: {
      "alto-elfo": { nameEn: "High Elf", descriptionEn: "Possess a keen mind and mastery of at least the basics of wizardry." },
      "elfo-bosques": { nameEn: "Wood Elf", descriptionEn: "Keen senses and intuition with fleet feet carrying them stealthily through forest glades." },
      "drow": { nameEn: "Drow (Dark Elf)", descriptionEn: "Descended from an earlier subrace of dark-skinned elves banished to the Underdark." },
      "eladrin": { nameEn: "Eladrin (Feywild)", descriptionEn: "Elves native to the Feywild who can channel seasonal magic and fey misty steps." },
      "elfo-marino": { nameEn: "Sea Elf", descriptionEn: "Aquatic elves who fell in love with wild ocean beauty and underwater realms." },
      "shadar-kai": { nameEn: "Shadar-kai (Shadowfell)", descriptionEn: "Sworn to the Raven Queen, serving in the gloomy realm of the Shadowfell." },
      "elfo-palido": { nameEn: "Pallid Elf", descriptionEn: "Reclusive elves from the Pallid Grove with uncanny insight and moon magic." },
      "elfo-astral": { nameEn: "Astral Elf", descriptionEn: "Elves who ventured into the Astral Plane centuries ago, touched by starlight." },
      "elfo-marca-sombra": { nameEn: "Mark of Shadow Elf (Eberron)", descriptionEn: "Spinning webs of illusion, weaving darkness, and mastering intrigue." },
      "elfo-avariel": { nameEn: "Avariel (Winged Elf)", descriptionEn: "Rare celestial-winged elves who soar across mountain winds." },
      "elfo-grugach": { nameEn: "Grugach (Wild Elf)", descriptionEn: "Reclusive, territorial forest hunters fiercely guarding ancestral woodlands." }
    }
  },
  "enano": {
    nameEn: "Dwarf",
    categoryEn: "Common",
    descriptionEn: "Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal. Their courage and endurance are easily a match for any of the larger folk.",
    subraces: {
      "enano-colinas": { nameEn: "Hill Dwarf", descriptionEn: "Deep intuition, keen senses, and remarkable resilience granting bonus health." },
      "enano-montanas": { nameEn: "Mountain Dwarf", descriptionEn: "Strong, hardy warriors accustomed to rugged terrain and heavy armor." },
      "duergar": { nameEn: "Duergar (Gray Dwarf)", descriptionEn: "Inhabitants of the subterranean Underdark possessing invisibility and size-growth." },
      "enano-marca-custodia": { nameEn: "Mark of Warding Dwarf (Eberron)", descriptionEn: "Masters of magical locks, security wards, and arcane bank vaults." },
      "enano-kaladesh": { nameEn: "Kaladesh Dwarf", descriptionEn: "Innovative artisans of aether-fueled filigree craft." }
    }
  },
  "mediano": {
    nameEn: "Halfling",
    categoryEn: "Common",
    descriptionEn: "The diminutive halflings survive in a world full of larger creatures by avoiding notice or, barring that, avoiding offense. Affable and cheerful, they cherish the comforts of home.",
    subraces: {
      "mediano-piesligeros": { nameEn: "Lightfoot Halfling", descriptionEn: "Naturally stealthy, capable of hiding easily behind larger companions." },
      "mediano-fornido": { nameEn: "Stout Halfling", descriptionEn: "Hardier folk said to have dwarven blood, possessing poison resistance." },
      "mediano-fantasmal": { nameEn: "Ghostwise Halfling", descriptionEn: "Wild clan halflings gifted with silent telepathic speech." },
      "mediano-lotusden": { nameEn: "Lotusden Halfling", descriptionEn: "Deeply bonded with nature and forest druidic craft." },
      "mediano-marca-curacion": { nameEn: "Mark of Healing Halfling (Eberron)", descriptionEn: "Gifted with restorative touch and supernatural healing prowess." },
      "mediano-marca-hospitalidad": { nameEn: "Mark of Hospitality Halfling (Eberron)", descriptionEn: "Brimming with soothing culinary and welcoming domestic wards." }
    }
  },
  "tiflin": {
    nameEn: "Tiefling",
    categoryEn: "Common",
    descriptionEn: "To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling, bearing the mark of an ancient fiendish pact.",
    subraces: {
      "tiflin-asmodeus": { nameEn: "Bloodline of Asmodeus", descriptionEn: "Commanding dark fire and thaumaturgy through Lord of the Nine Hells blood." },
      "tiflin-baalzebul": { nameEn: "Bloodline of Baalzebul", descriptionEn: "Gifted with corrupting rot and rays of sickness." },
      "tiflin-dispater": { nameEn: "Bloodline of Dispater", descriptionEn: "Masters of subterfuge, whispers, and magical lockpicking." },
      "tiflin-fierna": { nameEn: "Bloodline of Fierna", descriptionEn: "Seductive sway over emotions, charming and captivating others." },
      "tiflin-glasya": { nameEn: "Bloodline of Glasya", descriptionEn: "Gifted with illusory disguises, stealth, and invisibility." },
      "tiflin-levistus": { nameEn: "Bloodline of Levistus", descriptionEn: "Channelling Stygian frost and protective icy armor." },
      "tiflin-mammon": { nameEn: "Bloodline of Mammon", descriptionEn: "Innate grasp of trade magic, gold lust, and arcane appraisal." },
      "tiflin-mefistofeles": { nameEn: "Bloodline of Mephistopheles", descriptionEn: "Prodigious arcane scholars wielding destructive flame spells." },
      "tiflin-zariel": { nameEn: "Bloodline of Zariel", descriptionEn: "Martial hellfire smites forged in the vanguard of Avernus." },
      "tiflin-alado": { nameEn: "Winged Tiefling", descriptionEn: "Possess leathery bat-like wings enabling swift flight." },
      "tiflin-abisal": { nameEn: "Abyssal Tiefling", descriptionEn: "Touched by chaotic demonic energy fluctuating across rests." }
    }
  },
  "draconido": {
    nameEn: "Dragonborn",
    categoryEn: "Common",
    descriptionEn: "Born of dragons, as their name proclaims, the dragonborn walk proudly through a world that greets them with fearful incomprehension. Shaped by draconic gods or the dragons themselves.",
    subraces: {
      "draco-rojo": { nameEn: "Red Dragonborn (Fire)", descriptionEn: "Harness devastating cone of searing fire." },
      "draco-azul": { nameEn: "Blue Dragonborn (Lightning)", descriptionEn: "Unleash crackling line of electrical voltage." },
      "draco-verde": { nameEn: "Green Dragonborn (Poison)", descriptionEn: "Exhale toxic noxious cloud with poison resistance." },
      "draco-negro": { nameEn: "Black Dragonborn (Acid)", descriptionEn: "Spit sizzling caustic line of destructive acid." },
      "draco-blanco": { nameEn: "White Dragonborn (Cold)", descriptionEn: "Breathe freezing cone of glacial rime." },
      "draco-oro": { nameEn: "Gold Dragonborn (Fire)", descriptionEn: "Noble metallic lineage exhaling radiant flame." },
      "draco-plata": { nameEn: "Silver Dragonborn (Cold)", descriptionEn: "Majestic metallic lineage breathing paralyzing cold." },
      "draco-bronce": { nameEn: "Bronze Dragonborn (Lightning)", descriptionEn: "Coastal metallic lineage commanding lightning arcs." },
      "draco-cobre": { nameEn: "Copper Dragonborn (Acid)", descriptionEn: "Playful metallic lineage spitting corrosive acid." },
      "draco-oropel": { nameEn: "Brass Dragonborn (Fire)", descriptionEn: "Chatty metallic lineage unleashing fiery beams." },
      "draco-amatista": { nameEn: "Amethyst Dragonborn (Force)", descriptionEn: "Gem lineage wielding telekinetic gravity and force pulses." },
      "draco-cristal": { nameEn: "Crystal Dragonborn (Radiant)", descriptionEn: "Gem lineage dazzling foes with brilliant starlight." },
      "draco-esmeralda": { nameEn: "Emerald Dragonborn (Psychic)", descriptionEn: "Gem lineage disrupting minds with psychic resonance." },
      "draco-zafiro": { nameEn: "Sapphire Dragonborn (Thunder)", descriptionEn: "Gem lineage blasting foes with deafening sonic bursts." },
      "draco-topacio": { nameEn: "Topaz Dragonborn (Necrotic)", descriptionEn: "Gem lineage withering vitality with entropy blasts." },
      "draco-ravenite": { nameEn: "Ravenite Dragonborn (Wildemount)", descriptionEn: "Tailless martial dragonborn with fierce vengeful strikes." },
      "draco-draconiano": { nameEn: "Draconian (Dragonlance)", descriptionEn: "Engineered dragonborn with gliding wings and death throes." }
    }
  },
  "semiorco": {
    nameEn: "Half-Orc",
    categoryEn: "Common",
    descriptionEn: "Half-orcs' grayish pigmentation, sloping brows, jutting jaws, prominent teeth, and towering builds make their orcish heritage plain for all to see. Unstoppable endurance in battle.",
    subraces: {
      "semiorco-clasico": { nameEn: "Classic Half-Orc (PHB)", descriptionEn: "Relentless endurance and brutal critical strikes in combat." },
      "semiorco-marca-hallazgo": { nameEn: "Mark of Finding Half-Orc (Eberron)", descriptionEn: "Masterful hunters and trackers in Khorvaire." }
    }
  },
  "semielfo": {
    nameEn: "Half-Elf",
    categoryEn: "Common",
    descriptionEn: "Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of their elf and human parents: human curiosity and elven grace.",
    subraces: {
      "semielfo-estandar": { nameEn: "Standard Half-Elf", descriptionEn: "Skill versatility granting two bonus proficiencies." },
      "semielfo-bosques": { nameEn: "Wood Elf Heritage", descriptionEn: "Fleet of foot with natural forest concealment." },
      "semielfo-alto": { nameEn: "High Elf Heritage", descriptionEn: "Innate wizard cantrip from high elven lineage." },
      "semielfo-drow": { nameEn: "Drow Heritage", descriptionEn: "Innate Drow magic (Dancing Lights and Faerie Fire)." },
      "semielfo-acuatico": { nameEn: "Aquatic Elf Heritage", descriptionEn: "Natural swimming speed from aquatic ancestors." },
      "semielfo-marca-deteccion": { nameEn: "Mark of Detection Half-Elf (Eberron)", descriptionEn: "Supernatural sight piercing illusions and uncovering lies." },
      "semielfo-marca-tormenta": { nameEn: "Mark of Storm Half-Elf (Eberron)", descriptionEn: "Commanding wind and lightning on airships and gale seas." }
    }
  },
  "gnomo": {
    nameEn: "Gnome",
    categoryEn: "Common",
    descriptionEn: "A constant hum of busy activity pervades the warrens and neighborhoods where gnomes form their close-knit communities. Driven by enthusiasm, inventiveness, and quick wit.",
    subraces: {
      "gnomo-rocas": { nameEn: "Rock Gnome", descriptionEn: "Natural tinkerers with keen aptitude for mechanical clockwork devices." },
      "gnomo-bosque": { nameEn: "Forest Gnome", descriptionEn: "Innate illusion magic and communication with small beasts." },
      "svirfneblin": { nameEn: "Deep Gnome (Svirfneblin)", descriptionEn: "Subterranean survivalists blending seamlessly into Underdark stone." },
      "gnomo-marca-escritura": { nameEn: "Mark of Scribing Gnome (Eberron)", descriptionEn: "Masters of mystical ciphers, translation, and communication spells." },
      "autognomo": { nameEn: "Autognome (Spelljammer)", descriptionEn: "Mechanical gnome constructs infused with life spark." }
    }
  },
  "goblin": {
    nameEn: "Goblin",
    categoryEn: "Monstrous",
    descriptionEn: "Goblins occupy an uneasy place in the world. As small, sneaky humanoids, they survive through cunning, numbers, and striking from the shadows.",
    subraces: {
      "goblin-clasico": { nameEn: "Classic Goblin", descriptionEn: "Nimble escape and dealing extra damage to larger foes." },
      "goblin-dankwood": { nameEn: "Dankwood Goblin", descriptionEn: "Forest foragers with innate animal empathy." }
    }
  },
  "hobgoblin": {
    nameEn: "Hobgoblin",
    categoryEn: "Monstrous",
    descriptionEn: "War horns sound, stones crack, and hobgoblins march into battle. Disciplined, militaristic, and fiercely proud of their martial heritage.",
    subraces: {
      "hobgoblin-marcial": { nameEn: "Martial Hobgoblin", descriptionEn: "Martial training and saving face bonuses." },
      "hobgoblin-feerico": { nameEn: "Fey Gift Hobgoblin (MPMM)", descriptionEn: "Channelling fey hospitality and supportive combat auras." }
    }
  },
  "bugbear": {
    nameEn: "Bugbear",
    categoryEn: "Monstrous",
    descriptionEn: "Bugbears are born for battle and mayhem. Surviving through brute force and uncanny stealth, they surprise their prey with remarkable long-limbed reach.",
    subraces: {
      "bugbear-clasico": { nameEn: "Classic Bugbear", descriptionEn: "Long limbs and surprise attack burst damage." },
      "bugbear-feerico": { nameEn: "Multiverse Bugbear (MPMM)", descriptionEn: "Fey ancestry and enhanced reach on all melee attacks." }
    }
  },
  "kobold": {
    nameEn: "Kobold",
    categoryEn: "Monstrous",
    descriptionEn: "Small and reptilian, kobolds revere dragons and serve them as loyal tunnelers, trap-makers, and resource scavengers in deep caverns.",
    subraces: {
      "kobold-clasico": { nameEn: "Classic Kobold", descriptionEn: "Pack tactics and groveling distractions." },
      "kobold-multiverso": { nameEn: "Multiverse Kobold (MPMM)", descriptionEn: "Draconic roar and draconic sorcery cantrip." }
    }
  },
  "orco": {
    nameEn: "Orc",
    categoryEn: "Monstrous",
    descriptionEn: "Orcs are aggressive, powerful warriors driven by their fierce gods. Blessed with incredible endurance and adrenaline-fueled rushes.",
    subraces: {
      "orco-clasico": { nameEn: "Classic Orc", descriptionEn: "Aggressive bonus-action dash toward enemies." },
      "orco-eberron": { nameEn: "Eberron Orc", descriptionEn: "Spiritual guardians and primal wardens of the Shadow Marches." },
      "orco-exandria": { nameEn: "Exandria Orc", descriptionEn: "Proud warriors carrying relentless endurance and great carry capacity." }
    }
  },
  "yuan-ti": {
    nameEn: "Yuan-ti Pureblood",
    categoryEn: "Exotic",
    descriptionEn: "The serpent-blooded yuan-ti purebloods blend serpentine features with humanoid forms, boasting innate magic resistance and venom immunity.",
    subraces: {
      "yuan-ti-clasico": { nameEn: "Classic Pureblood", descriptionEn: "Poison immunity, magic resistance, and animal friendship with snakes." },
      "yuan-ti-multiverso": { nameEn: "Multiverse Yuan-ti (MPMM)", descriptionEn: "Poison resistance and innate spellcasting." }
    }
  },
  "hombre-lagarto": {
    nameEn: "Lizardfolk",
    categoryEn: "Monstrous",
    descriptionEn: "Lizardfolk possess an alien, dispassionate mindset. They view the world through survival and pragmatism, harvesting natural materials into shields and spears.",
    subraces: {
      "hombre-lagarto-clasico": { nameEn: "Classic Lizardfolk", descriptionEn: "Natural armor, hungry jaws bite, and artisanal bonecraft." },
      "hombre-lagarto-chamanico": { nameEn: "Shamanic Lizardfolk", descriptionEn: "Primal swamp magic and reptilian resilience." }
    }
  },
  "aasimar": {
    nameEn: "Aasimar",
    categoryEn: "Exotic",
    descriptionEn: "Aasimar bear within their souls the light of the heavens. Descended from celestial touch, they carry divine purpose, holy radiance, and heavenly wrath.",
    subraces: {
      "aasimar-protector": { nameEn: "Protector Aasimar", descriptionEn: "Manifest incorporeal radiant wings to soar and smite evil." },
      "aasimar-azote": { nameEn: "Scourge Aasimar", descriptionEn: "Radiate intense divine burning heat scorching everything around." },
      "aasimar-caido": { nameEn: "Fallen Aasimar", descriptionEn: "Dark skeletal wings inspiring terror and dread in foes." },
      "aasimar-guia-radiante": { nameEn: "Celestial Revelation Aasimar (MPMM)", descriptionEn: "Choose between radiant soul, radiant consumption, or necrotic shroud." }
    }
  },
  "goliat": {
    nameEn: "Goliath",
    categoryEn: "Exotic",
    descriptionEn: "At the highest mountain peaks—far above the slopes where trees grow and where the air is thin—dwell the reclusive goliaths. Strong, competitive, and stalwart.",
    subraces: {
      "goliat-montana": { nameEn: "Mountain Goliath", descriptionEn: "Stone's endurance shrugging off fatal blows." },
      "goliat-gigante-nubes": { nameEn: "Cloud Giant Heritage", descriptionEn: "Slip through mists with subtle teleportation." },
      "goliat-gigante-fuego": { nameEn: "Fire Giant Heritage", descriptionEn: "Infuse attacks with burning forge fury." },
      "goliat-gigante-escarcha": { nameEn: "Frost Giant Heritage", descriptionEn: "Chill foes with freezing glacial strikes." },
      "goliat-gigante-colinas": { nameEn: "Hill Giant Heritage", descriptionEn: "Knock opponents prone with crushing heft." },
      "goliat-gigante-tormenta": { nameEn: "Storm Giant Heritage", descriptionEn: "Retaliate with crackling thunderbolts." }
    }
  },
  "tabaxi": {
    nameEn: "Tabaxi",
    categoryEn: "Exotic",
    descriptionEn: "Hailing from strange and distant lands, wandering tabaxi are catlike humanoids driven by curiosity to collect interesting artifacts, tales, and wonder.",
    subraces: {
      "tabaxi-clasico": { nameEn: "Classic Tabaxi", descriptionEn: "Feline agility and climbing claws." },
      "tabaxi-multiverso": { nameEn: "Multiverse Tabaxi (MPMM)", descriptionEn: "Cat's claws slashing damage and sprint agility." }
    }
  },
  "tortle": {
    nameEn: "Tortle",
    categoryEn: "Exotic",
    descriptionEn: "What many tortles consider a simple life, others might see as a life of adventure. Tortles are born near sandy shores, walk with sturdy shells, and live peaceful lives.",
    subraces: {
      "tortle-solitario": { nameEn: "Wandering Tortle", descriptionEn: "Natural armor shell and claw attacks." },
      "tortle-costero": { nameEn: "Coastal Tortle", descriptionEn: "Holding breath and swimming in tidal waters." }
    }
  },
  "kenku": {
    nameEn: "Kenku",
    categoryEn: "Exotic",
    descriptionEn: "Haunted by an ancient crime that robbed them of their wings, the kenku wander the world as vagabonds and burglars who live at the fringes of human society, communicating through mimicry.",
    subraces: {
      "kenku-clasico": { nameEn: "Classic Kenku", descriptionEn: "Expert forgery and sound mimicry." },
      "kenku-multiverso": { nameEn: "Multiverse Kenku (MPMM)", descriptionEn: "Kenku recall granting advantage on skilled checks." }
    }
  },
  "firbolg": {
    nameEn: "Firbolg",
    categoryEn: "Exotic",
    descriptionEn: "Firbolg tribes cloister in remote forest strongholds, preferring to spend their days in quiet harmony with the woods. When provoked, firbolgs demonstrate formidable martial prowess.",
    subraces: {
      "firbolg-bosque": { nameEn: "Classic Firbolg", descriptionEn: "Firbolg magic, hidden step invisibility, and speech of beast and leaf." },
      "firbolg-multiverso": { nameEn: "Multiverse Firbolg (MPMM)", descriptionEn: "Bonus-action disguise self and hidden step." }
    }
  },
  "genasi": {
    nameEn: "Genasi",
    categoryEn: "Planar",
    descriptionEn: "Genasi inherit something of the majesty and might of their planar ancestors—elemental beings of Air, Earth, Fire, or Water, walking the mortal realms.",
    subraces: {
      "genasi-fuego": { nameEn: "Fire Genasi", descriptionEn: "Darkvision, fire resistance, and produce flame cantrip." },
      "genasi-agua": { nameEn: "Water Genasi", descriptionEn: "Amphibious, swim speed, acid resistance, and create or destroy water." },
      "genasi-aire": { nameEn: "Air Genasi", descriptionEn: "Unending breath, lightning resistance, and levitate." },
      "genasi-tierra": { nameEn: "Earth Genasi", descriptionEn: "Earth walk across difficult terrain and pass without trace." }
    }
  },
  "triton": {
    nameEn: "Triton",
    categoryEn: "Exotic",
    descriptionEn: "Originally from the Elemental Plane of Water, tritons settled in the ocean depths of the Material Plane, guarding the deep waters against aquatic monstrosities.",
    subraces: {
      "triton-profundo": { nameEn: "Classic Triton", descriptionEn: "Amphibious, swim speed, cold resistance, and aquatic control magic." },
      "triton-multiverso": { nameEn: "Multiverse Triton (MPMM)", descriptionEn: "Darkvision and innate aquatic spells." }
    }
  },
  "cambiaformas": {
    nameEn: "Changeling",
    categoryEn: "Exotic",
    descriptionEn: "Changelings can alter their physical appearance with a thought. While many use this ability to deceive, some use it to explore different identities and cultures.",
    subraces: {
      "cambiaformas-eberron": { nameEn: "Eberron Changeling", descriptionEn: "Shapechanger feature and dual social proficiencies." },
      "cambiaformas-multiverso": { nameEn: "Multiverse Changeling (MPMM)", descriptionEn: "Fey ancestry and seamless shapeshifting." }
    }
  },
  "forjado": {
    nameEn: "Warforged",
    categoryEn: "Exotic",
    descriptionEn: "Built as mindless automatons in the Last War, the warforged gained sentience and now seek their place in a world that no longer requires their martial service.",
    subraces: {
      "forjado-integrado": { nameEn: "Integrated Warforged", descriptionEn: "Integrated protection (+1 AC), specialized design, and constructed resilience." },
      "forjado-juggernaut": { nameEn: "Juggernaut Warforged", descriptionEn: "Heavy ironframe built for brutal siege warfare." },
      "forjado-skirmisher": { nameEn: "Skirmisher Warforged", descriptionEn: "Lightframe scout designed for rapid flanking." },
      "forjado-envoy": { nameEn: "Envoy Warforged", descriptionEn: "Specialized diplomatic and artisanal construct." }
    }
  },
  "aarakocra": {
    nameEn: "Aarakocra",
    categoryEn: "Exotic",
    descriptionEn: "Sequestered in high mountains atop tall trees, the aarakocra evoke awe and wonder as winged humanoids of the sky, patrolling the borders of the elemental planes.",
    subraces: {
      "aarakocra-clasico": { nameEn: "Classic Aarakocra", descriptionEn: "50 ft flying speed while not wearing medium or heavy armor." },
      "aarakocra-multiverso": { nameEn: "Multiverse Aarakocra (MPMM)", descriptionEn: "Flying speed equal to walking speed and wind gust magic." }
    }
  },
  "hada": {
    nameEn: "Fairy",
    categoryEn: "Planar",
    descriptionEn: "The Feywild is home to many fantastic peoples, including fairies. Infused with the magic of the Feywild, they possess insectile wings and playful fey glamour.",
    subraces: {
      "hada-corte": { nameEn: "Fey Court Fairy", descriptionEn: "Fey passage wings and fairy magic spells (Druidcraft, Faerie Fire, Enlarge/Reduce)." },
      "hada-silvestre": { nameEn: "Sylvan Fairy", descriptionEn: "Wildwood sprite with subtle woodland illusions." }
    }
  },
  "liebrelido": {
    nameEn: "Harengon",
    categoryEn: "Exotic",
    descriptionEn: "Harengons originated in the Feywild, where they spoke Sylvan and embodied the spirit of freedom and travel. They are bipedal rabbitfolk blessed with lucky footwork.",
    subraces: {
      "liebrelido-feerico": { nameEn: "Feywild Harengon", descriptionEn: "Hare-trigger initiative, lucky footwork saves, and rabbit hop bonus action." },
      "liebrelido-madriguera": { nameEn: "Burrow Harengon", descriptionEn: "Tunnel scouts with keen hearing and nimble burrowing instinct." }
    }
  },
  "centauro": {
    nameEn: "Centaur",
    categoryEn: "Exotic",
    descriptionEn: "Roaming the wild plains and ancient groves, centaurs combine the upper bodies of humanoids with the lower bodies of powerful horses. Natural chargers with thundering hooves.",
    subraces: {
      "centauro-ravnica": { nameEn: "Ravnica / Theros Centaur", descriptionEn: "40 ft speed, charge hoof attack, equine build, and survivor instincts." },
      "centauro-multiverso": { nameEn: "Multiverse Centaur (MPMM)", descriptionEn: "Fey creature type, natural hooves, and charge attacks." }
    }
  },
  "minotauro": {
    nameEn: "Minotaur",
    categoryEn: "Exotic",
    descriptionEn: "Minotaurs are barrel-chested humanoids with heads resembling horned bulls. Formidable warriors with devastating goring rushes and labyrinthine recall.",
    subraces: {
      "minotauro-ravnica": { nameEn: "Ravnica Minotaur", descriptionEn: "Horns gore attack, goring rush dash, and hammering horns bonus action." },
      "minotauro-krynn": { nameEn: "Krynn Minotaur", descriptionEn: "Honor-bound seafaring gladiators from Dragonlance." }
    }
  },
  "satiro": {
    nameEn: "Satyr",
    categoryEn: "Planar",
    descriptionEn: "Satyrs are fey revelers of the wildlands, delighting in music, dance, celebration, and mischief with potent magic resistance and leaping goat legs.",
    subraces: {
      "satiro-theros": { nameEn: "Theros Satyr", descriptionEn: "Ram attack, magic resistance, mirthful leaps, and reveler proficiency." },
      "satiro-feerico": { nameEn: "Feywild Satyr (MPMM)", descriptionEn: "Fey creature type, magic resistance, and celebratory song." }
    }
  },
  "gith": {
    nameEn: "Gith",
    categoryEn: "Planar",
    descriptionEn: "Once enslaved by mind flayers, the gith rebelled and split into two distinct factions: the astral-dwelling Githyanki and the monastic Githzerai.",
    subraces: {
      "githyanki": { nameEn: "Githyanki", descriptionEn: "Martial astral raiders wielding silver swords and astral psionics (Jump, Misty Step)." },
      "githzerai": { nameEn: "Githzerai", descriptionEn: "Disciplined monastic sages dwelling in Limbo wielding mental shielding psionics." }
    }
  },
  "shifter": {
    nameEn: "Shifter",
    categoryEn: "Exotic",
    descriptionEn: "Shifters, sometimes called the weretouched, are humanoids with bestial aspects that can be unleashed in a momentary transformation known as shifting.",
    subraces: {
      "shifter-beasthide": { nameEn: "Beasthide Shifter", descriptionEn: "Tough and resilient, gaining temporary hit points and bonus AC while shifted." },
      "shifter-longtooth": { nameEn: "Longtooth Shifter", descriptionEn: "Fierce predator manifesting savage fangs to bite as a bonus action." },
      "shifter-swiftstride": { nameEn: "Swiftstride Shifter", descriptionEn: "Graceful and quick, moving away reactively when an enemy closes in." },
      "shifter-wildhunt": { nameEn: "Wildhunt Shifter", descriptionEn: "Innate tracker preventing nearby enemies from gaining advantage against you." }
    }
  },
  "kalashtar": {
    nameEn: "Kalashtar",
    categoryEn: "Planar",
    descriptionEn: "The kalashtar are a compound race: bonded humanoids infused with otherworldly spirits of light from the plane of dreams, possessing telepathy and psychic resilience.",
    subraces: {
      "kalashtar-luz": { nameEn: "Path of Light Kalashtar", descriptionEn: "Devout disciples of the dream spirit Il-Yannah." },
      "kalashtar-huerfano": { nameEn: "Orphan Kalashtar", descriptionEn: "Disconnected dream wanderers surviving in Khorvaire." }
    }
  },
  "leonin": {
    nameEn: "Leonin",
    categoryEn: "Exotic",
    descriptionEn: "The leonin are proud, noble lion-folk who wander the golden plains. Fierce protectors of their prides with a fearsome, thunderous roar.",
    subraces: {
      "leonin-llanuras": { nameEn: "Plains Leonin", descriptionEn: "35 ft speed, darkvision, claw attacks, and frightening roar." },
      "leonin-cazador": { nameEn: "Hunter Leonin", descriptionEn: "Solitary stalkers attuned to scent and ambush." }
    }
  },
  "loxodon": {
    nameEn: "Loxodon",
    categoryEn: "Exotic",
    descriptionEn: "Loxodons are humanoid elephants revered for their wisdom, serenity, stonecrafting patience, and powerful trunk dexterity.",
    subraces: {
      "loxodon-constructor": { nameEn: "Mason Loxodon", descriptionEn: "Natural armor (12 + Con), trunk grasping, and serene calm mind." },
      "loxodon-erudito": { nameEn: "Chronicler Loxodon", descriptionEn: "Sacred memory keepers and deep history scholars." }
    }
  },
  "kender": {
    nameEn: "Kender",
    categoryEn: "Exotic",
    descriptionEn: "Originating on the world of Krynn, kender are diminutive folk blessed with supernatural fearlessness, boundless curiosity, and taunting quips.",
    subraces: {}
  },
  "owlin": {
    nameEn: "Owlin",
    categoryEn: "Exotic",
    descriptionEn: "Distant kin of giant owls from the Feywild, owlin are feathered folk with silent flight, telescopic vision, and a scholarly demeanor.",
    subraces: {}
  },
  "plasmoide": {
    nameEn: "Plasmoid",
    categoryEn: "Planar",
    descriptionEn: "Plasmoids are amorphous beings of living protoplasm who can alter their shape, squeeze through tiny gaps, and extend pseudopods.",
    subraces: {}
  },
  "thri-kreen": {
    nameEn: "Thri-kreen",
    categoryEn: "Planar",
    descriptionEn: "Thri-kreen are mantis-like insectoid folk with chameleon carapaces, secondary arms, and telepathic communication.",
    subraces: {}
  },
  "grung": {
    nameEn: "Grung",
    categoryEn: "Monstrous",
    descriptionEn: "Grungs are small, tree-dwelling frogfolk of the tropical jungles with toxic skin secretions, water dependency, and high leaping agility.",
    subraces: {}
  },
  "simic-hybrid": {
    nameEn: "Simic Hybrid",
    categoryEn: "Exotic",
    descriptionEn: "Created through biomantic cross-breeding on Ravnica, Simic hybrids incorporate animal adaptations such as gliding fins, carapace armor, or grappling appendages.",
    subraces: {}
  },
  "giff": {
    nameEn: "Giff",
    categoryEn: "Planar",
    descriptionEn: "Giff are tall, broad-shouldered hippo-folk who love military discipline, honor, heavy armaments, and devastating firearms.",
    subraces: {}
  },
  "vedalken": {
    nameEn: "Vedalken",
    categoryEn: "Planar",
    descriptionEn: "Blue-skinned humanoids who value rationality, cold logic, and perfection in all pursuits, possessing unmatched mental resilience.",
    subraces: {}
  },
  "hadozee": {
    nameEn: "Hadozee",
    categoryEn: "Planar",
    descriptionEn: "Simian spacefarers known as winged baboons, hadozee have membranes connecting their limbs that allow them to glide gracefully between ship rigging.",
    subraces: {}
  },
  "locathah": {
    nameEn: "Locathah",
    categoryEn: "Exotic",
    descriptionEn: "Aquatic fishfolk who dwell along coastlines and reefs, known for their resilient scales and determination to survive against all odds.",
    subraces: {}
  },
  "verdan": {
    nameEn: "Verdan",
    categoryEn: "Planar",
    descriptionEn: "Mutated by the chaos of the Underdark, verdan are goblinoid beings touched by the primal entity That-Which-Endures, possessing telepathy and mutating growth.",
    subraces: {}
  }
};

// Now parse WIKIDOT_RACES and inject nameEn, categoryEn, descriptionEn, and for subraces
for (const [id, enData] of Object.entries(WIKIDOT_ENGLISH_RACES)) {
  // Regex to find the race object by id
  const racePattern = new RegExp(`(\\{\\s*"id":\\s*"${id}",\\s*"name":\\s*"[^"]+",)`, 'g');
  if (racePattern.test(content)) {
    content = content.replace(racePattern, (match) => {
      if (match.includes('"nameEn":')) return match;
      return `${match}\n    "nameEn": "${enData.nameEn}",\n    "categoryEn": "${enData.categoryEn}",\n    "descriptionEn": "${enData.descriptionEn}",`;
    });
  }

  // Subraces
  if (enData.subraces) {
    for (const [subId, subEn] of Object.entries(enData.subraces)) {
      const subPattern = new RegExp(`(\\{\\s*"id":\\s*"${subId}",\\s*"name":\\s*"[^"]+",)`, 'g');
      if (subPattern.test(content)) {
        content = content.replace(subPattern, (match) => {
          if (match.includes('"nameEn":')) return match;
          return `${match}\n        "nameEn": "${subEn.nameEn}",\n        "descriptionEn": "${subEn.descriptionEn}",`;
        });
      }
    }
  }
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully patched WIKIDOT_RACES with canonical Wikidot English entries!');
