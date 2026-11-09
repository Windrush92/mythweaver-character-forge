import fs from 'fs';
import path from 'path';

// Let's create the dictionary for backgrounds, equipment, roleplay traits, and language scripts
const BACKGROUND_DESCRIPTIONS = {
  acolyte: "You have spent your life in the service of a temple to a specific god or pantheon of gods, conducting sacred rites and welcoming the faithful into the presence of the divine.",
  "house-agent": "You represent the commercial, diplomatic, or espionage interests of one of the influential dragonmarked houses in Eberron.",
  "faction-agent": "You operate as an emissary, observer, or enforcer for one of the great factions of the realm (such as the Harpers, the Order of the Gauntlet, the Emerald Enclave, the Lords' Alliance, or the Zhentarim).",
  "golgari-agent": "You belong to the Golgari Swarm in Ravnica, a vast subterranean society that reclaims urban waste and channels the natural cycles of rot and rebirth.",
  "volstrucker-agent": "You are a covert operative and arcane assassin for the Volstrucker, the feared shadow agency of the Cerberus Assembly.",
  "trade-sheriff": "You enforce trade contracts, protect commercial caravans, and maintain the fragile frontier peace across busy merchant routes.",
  "gruul-anarch": "You were raised among the feral clans of the Gruul Anarchs, smashing civilization's structures and defending primal nature.",
  entertainer: "You thrive in front of an audience, knowing how to entrance, entertain, and inspire crowds with music, acrobatics, theater, or verse in taverns and grand halls.",
  anthropologist: "You have devoted your life to traveling to remote lands, living with isolated peoples, learning their dialects, and documenting their traditions and customs.",
  gambler: "You understand games of chance, risks, and human greed, reading cards and dice as skillfully as reading the faces of your opponents.",
  "mulmaster-aristocrat": "You belong to the privileged nobility of Mulmaster, navigating cutthroat political intrigue and the harsh dictates of the city's rulers.",
  archaeologist: "You explore forgotten ruins, delving into crumbling tombs and ancient monuments to unearth lost artifacts and piece together history.",
  "clan-crafter": "You were an apprentice in the great forges and stoneworks of a dwarven clan, mastering the traditional arts of smithing, masonry, or gemcraft.",
  "guild-artisan": "You are an official member of a respected guild of artisans, proficient in a manufacturing trade that supplies and sustains civil society.",
  ashari: "You are a guardian of the Ashari elemental tribes, sworn to safeguard the delicate rifts between the Material Plane and the Elemental Planes of Air, Earth, Fire, or Water.",
  athlete: "You have forged your body and mind through athletic competition, triumphing in marathons, Olympic games, or gladiator arenas.",
  "haunted-one": "You were touched by darkness or survived an unspeakable horror that claimed everything you loved, leaving you haunted by nightmares.",
  "iron-route-bandit": "You survived by ambushing caravans and travelers along the dangerous Iron Route, living by your wits and steel.",
  "rival-intern": "You work long hours at a prestigious corporate consortium or adventuring enterprise, striving to outshine your rivals.",
  knight: "You belong to a select martial echelon of nobility, sworn to knightly chivalry, accompanied by heraldry, plate armor, and loyal squires.",
  "knight-of-the-order": "You belong to a revered order of chivalry or religious knighthood, dedicated to justice, moral duty, or defending the faith.",
  "knight-of-solamnia": "You are an honorable knight of Krynn, sworn to the Measure and the Oath of Solamnia: 'My Honor is My Life.'",
  "urban-bounty-hunter": "You make your living tracking down fugitives, debtors, and targets through urban backstreets, rooftops, and crowded taverns.",
  charlatan: "You understand how people think and what they desire, using false identities, counterfeit goods, and silver-tongued confidence to prosper.",
  "simic-scientist": "You are a researcher in the Simic Combine, splicing genes, evolving bio-forms, and adapting life to meet civilization's challenges.",
  "hillsfar-merchant": "You conducted trade along the dangerous Moonsea routes, circumventing the Great Law of Humanity with gold and sharp contracts.",
  "failed-merchant": "You once dreamed of vast commercial wealth, but disastrous investments, pirate raids, or ruinous debts cost you your enterprise.",
  "guild-merchant": "You are a commercial merchant affiliated with a powerful trading cartel, managing caravans, shipping routes, and contracts.",
  shipwright: "You have spent years in shipyards and dry docks, building, repairing, and understanding every timber, rib, and sail of seagoing vessels.",
  smuggler: "You know how to move illicit contraband, avoid tariffs, and bypass city guards and coastal patrols in the dead of night.",
  "hillsfar-smuggler": "You specialized in slipping non-human refugees and contraband in and out of the xenophobic walled city of Hillsfar.",
  courtier: "You know the subtle art of courtly etiquette, diplomacy, flattery, and influence in the grand palaces and halls of power.",
  criminal: "You have a history of breaking the law and surviving in the underworld, maintaining connections to fences, thieves, and informants.",
  "rakdos-cultist": "You belong to the Cult of Rakdos, turning performance, fire, and hedonistic chaos into a thrilling art form.",
  plaintiff: "You became entangled in lengthy, complex legal disputes and tribunals, learning court systems, contracts, and legal maneuvers.",
  dissenter: "You spoke out against tyrannical authority or dogma, forced into hiding after opposing the reign of despots.",
  "black-fist-double-agent": "You operated inside the ruthless Black Fist guard in Phlan while secretly working for underground resistance cells.",
  ruined: "You once enjoyed great status, comfort, or fortune before an unexpected catastrophe stripped away your holdings.",
  hermit: "You lived in secluded seclusion in a remote wilderness, monastery, or sanctuary, seeking spiritual enlightenment and inner peace.",
  "cloistered-scholar": "You spent your formative years sheltered within the grand libraries, scriptoriums, and archives of a monastery or university.",
  "caravan-specialist": "You guided pack trains and wagons through bandit-infested passes and perilous wilderness, keeping draft beasts and cargo safe.",
  spy: "You served as a covert intelligence agent, gathering secrets, forging papers, and operating behind enemy lines.",
  "lorehold-student": "You study the magic of past epochs, archaeology, and historical spirits at Lorehold College in Strixhaven.",
  "prismari-student": "You study elemental expression, expressive dance, and raw magical performance at Prismari College in Strixhaven.",
  "quandrix-student": "You manipulate the mathematical equations, fractals, and geometric symmetries of nature at Quandrix College in Strixhaven.",
  "silverquill-student": "You master radiant illumination, ink magic, battle-oratory, and sharp wit at Silverquill College in Strixhaven.",
  "witherbloom-student": "You explore the dualities of life, decay, growth, and medicinal potions at Witherbloom College in Strixhaven.",
  "giant-foundling": "You were discovered as a child and raised among giants, learning their colossal ways, ancient runes, and towering strength.",
  "shade-fanatic": "You revere the dark majesty and planar secrets of Netheril and the Shadowfell, attuning your senses to the void.",
  "planar-philosopher": "You belong to one of Sigil's great factions, debating the multiverse's deepest metaphysical truths and planar structures.",
  outlander: "You grew up in the untamed wilderness, far from comfort and civilization, reading survival signs and tracking game.",
  "azorius-functionary": "You serve the Azorius Senate in Ravnica, drafting legislation, enforcing decrees, and preserving absolute civic order.",
  harborfolk: "You grew up along bustling docks, canals, and tidal estuaries, living among dockworkers, fishers, and harbor sailors.",
  gladiator: "You fought for survival and the crowd's roar in blood-soaked arenas, mastering theatrical combat and martial flair.",
  "rune-carver": "You learned the ancient giant craft of carving living runes into stone, bone, and steel to channel primordial power.",
  urchin: "You grew up alone on the streets of an unforgiving city, sleeping in alleys and learning to navigate rooftops and shadows.",
  "gate-urchin": "You scavenged and survived around the bustling outer gates of Baldur's Gate, reading travelers and dodging watchmen.",
  "city-watch": "You served as an officer or constable of the city watch, keeping peace in the streets and responding to local crimes.",
  "gate-warden": "You were charged with guarding and inspecting travelers passing through interplanar portals and city gates.",
  inheritor: "You are the sole custodian of an extraordinary, unique inheritance that draws wonder, envy, or peril.",
  "folk-hero": "You stood up against a tyrant or monster to protect common folk, becoming a beloved legend among everyday peasants.",
  "secret-identity": "You live a double life, maintaining an unassuming everyday persona to disguise your daring heroic or clandestine deeds.",
  "izzet-engineer": "You are a daring inventor in the Izzet League, conducting chaotic experiments with steam, lightning, and arcane mana.",
  initiate: "You completed rigorous trials to earn your place among an elite religious or monastic brotherhood.",
  "selesnya-initiate": "You joined the Selesnya Conclave, becoming one with the World Tree's collective chorus and harmonic community.",
  inquisitor: "You root out heresy, shapeshifters, cultists, and corrupting fiends with unyielding zeal and sharp investigation.",
  "phlan-insurgent": "You joined the clandestine resistance in Phlan, sabotaging invaders and fighting to liberate your conquered city.",
  "investigator-vrgr": "You investigate grim murders, paranormal anomalies, and terrifying mysteries across the dread Domains of Dread.",
  "investigator-scag": "You serve as a private detective or inquisitor along the Sword Coast, unraveling crimes and discovering missing persons.",
  "boros-legionnaire": "You march under the banner of the Boros Legion, standing as a righteous shield and zealous sword against crime and chaos.",
  "mage-of-high-sorcery": "You took the Test of High Sorcery in the Tower of Wayreth, dedicating your life to the three moons of Krynn.",
  "witchlight-hand": "You travel with the fantastical Witchlight Carnival, bringing delight, wonder, and fey curiosities to crowds.",
  sailor: "You have spent years aboard sailing vessels, weathering fierce storms, rigging sails, and navigating oceans.",
  "uthgardt-tribe-member": "You belong to one of the nomadic Uthgardt barbarian tribes of the North, bound by sacred totems and ancestral mounds.",
  "earthspur-miner": "You spent years deep underground in the Earthspur Mountains, hewing ore and navigating dark subterranean tunnels.",
  wildspacer: "You sailed the void of the Astral Sea and Wildspace aboard spelljamming ships, gazing into alien constellations.",
  noble: "You understand wealth, power, and high social standing, carrying a venerable family name, coat of arms, and land.",
  "waterdhavian-noble": "You belong to the dazzling high society of Waterdeep, navigating grand galas, trade guilds, and masked lords.",
  "ticklebelly-nomad": "You lived among the hardy nomadic tribes of the Ticklebelly hills, surviving harsh weather and raiding wyverns.",
  "dimir-operative": "You serve House Dimir, maintaining a false guild persona while carrying out secrets, assassinations, and intrigue.",
  feylost: "You were spirited away to the Feywild in your youth, returning with whimsical fey habits, sparkling eyes, and wonder.",
  fisher: "You made your living on coastal waters, rushing rivers, or misty lakes, rowing out with the dawn and reading the deep water.",
  pirate: "You sailed under the black flag, raiding merchant vessels and coastal towns, carving a fearsome reputation on the high seas.",
  "stojanow-prisoner": "You survived brutal confinement in the infamous Stojanow Gate prison, learning to endure torture, cold, and starvation.",
  rewarded: "You carried out an extraordinary deed or heroic triumph that earned you royal favor, land, or a lifelong boon.",
  "cormanthor-refugee": "You were displaced when war or corruption devastated the ancient forests of Cormanthor, seeking shelter in foreign lands.",
  "phlan-refugee": "You were forced to flee Phlan when a green dragon seized the city, enduring poverty and exile with fellow displaced folk.",
  "orzhov-representative": "You serve the Orzhov Syndicate, drafting financial contracts, collecting tithes, and binding souls with eternal debt.",
  sage: "You spent years studying manuscripts, history, and the arcane, cataloging lore and seeking answers to existence's deepest questions.",
  faceless: "You wear a theatrical mask and assume a dramatic persona to execute deeds you cannot perform under your true identity.",
  soldier: "You served in a standing military regiment, seasoned by drill, formation combat, camaraderie, and the grim reality of war.",
  marine: "You served as a specialized amphibious warrior, fighting aboard war galleys, boarding hostile vessels, and raiding coasts.",
  grinner: "You are a member of the Golden Grin, a clandestine alliance using song, rumor, and humor to resist tyranny and bring hope.",
  "dragon-casualty": "You survived a cataclysmic dragon attack that burned your home and marked you forever with physical and emotional scars.",
  "astral-drifter": "You spent decades drifting through the silver radiance of the Astral Sea, encountering divine husks and timeless wanderers.",
  "celebrity-adventurers-scion": "You grew up in the shadow of famed hero parents, dealing with high expectations and public fascination.",
  "mercenary-veteran": "You sold your sword to the highest bidder in mercenary companies, fighting in bloody border wars and sieges.",
  "far-traveler": "You hail from a distant land across vast oceans or continents, fascinated and perplexed by local customs and laws.",
  vizier: "You served as an esteemed royal advisor or high priest, guiding monarchs and interpreting divine will for nations."
};

console.log('Total background English descriptions prepared:', Object.keys(BACKGROUND_DESCRIPTIONS).length);

const ROLEPLAY_TRANSLATIONS = {
  // Fisher
  "Tengo una paciencia infinita: las mejores cosas de la vida requieren esperar en silencio.": "I have endless patience; the best things in life require waiting in silence.",
  "Siempre tengo una anécdota desmesurada sobre un pez colosal que se me escapó por poco.": "I always have an oversized story about a colossal fish that barely got away.",
  "Me siento más sereno remando en aguas tranquilas que en cualquier fiesta bulliciosa.": "I feel more at peace rowing on quiet waters than in any raucous party.",
  "Hablo con frases sencillas y trato las advertencias del agua con un respeto reverencial.": "I speak in simple sentences and treat the water's warnings with reverent respect.",
  "Paciencia: Las prisas solo conducen a romper la línea y perder la presa; la constancia triunfa. (Neutral)": "Patience: Haste only snaps the line and loses the catch; constancy prevails. (Neutral)",
  "Generosidad: Si la red viene llena, se comparte el pescado con las familias necesitadas. (Bueno)": "Generosity: If the net comes in full, share the bounty with families in need. (Good)",
  "Respeto: El agua da la vida y puede arrebatarla en un segundo; respeta a los espíritus de las olas. (Legal)": "Respect: The water gives life and can take it in a heartbeat; revere the spirits of the waves. (Lawful)",
  "Independencia: Una barca, una caña y el horizonte abierto son todo lo que necesito para ser libre. (Caótico)": "Independence: A boat, a rod, and an open horizon are all I need to be free. (Chaotic)",
  "Mi pequeña barca de pesca me fue heredada por mi abuelo y es mi mayor orgullo.": "My small fishing boat was bequeathed by my grandfather and is my greatest pride.",
  "Deseo capturar al legendario pez monstruoso que habita en las profundidades del lago local.": "I seek to catch the legendary monstrous fish lurking in the depths of my local waters.",
  "Protegeré a mi aldea pesquera de los corsarios y de los monstruos que asolan la costa.": "I will defend my fishing village from pirates and monsters that plague the coastline.",
  "Mis aliados son mis compañeros de travesía; nos aseguraremos de que nadie pase hambre.": "My allies are my shipmates; we will ensure no one aboard goes hungry.",
  "Tiendo a exagerar el tamaño de mis capturas y hazañas hasta límites inverosímiles.": "I tend to exaggerate the size of my catches and deeds to unbelievable extremes.",
  "A veces me pierdo en ensoñaciones contemplando el reflejo del agua cuando debería actuar.": "I sometimes drift into daydreams gazing at the water's reflection when I should take action.",
  "Me cuesta desprenderme de trastos y aparejos viejos que acumulo en mi mochila.": "I find it hard to part with old tackle and worn gear that clutters my pack.",
  "Suelo preferir la soledad de la pesca a las conversaciones sociales complejas.": "I often prefer the solitude of fishing to complicated social conversations.",

  // Universal Personalities
  "Siempre tengo una cita poética, refrán o proverbio antiguo para cada situación.": "I always have a poetic quote, proverb, or ancient saying for every situation.",
  "No confío fácilmente en nadie que no haya sangrado o luchado a mi lado.": "I don't easily trust anyone who hasn't bled or fought by my side.",
  "Mantengo una calma absoluta y voz serena incluso en medio del peligro mortal.": "I maintain absolute calm and a serene voice even in the face of mortal danger.",
  "Colecciono pequeñas baratijas, piedras pulidas o recuerdos curiosos de cada viaje.": "I collect small trinkets, polished river stones, or curious keepsakes from every journey.",
  "Mi curiosidad es insaciable: no puedo resistirme a investigar un secreto o misterio.": "My curiosity is insatiable: I cannot resist investigating a secret or mystery.",
  "Juzgo a las personas por cómo tratan a los animales, mendigos y sirvientes.": "I judge people by how they treat animals, beggars, and servants.",
  "Siempre encuentro algo divertido o sarcástico que decir, incluso en los peores momentos.": "I always find something funny or sarcastic to say, even in the worst moments.",
  "Soy directo y franco como un golpe de maza; desprecio las sutilezas y la hipocresía.": "I am blunt and direct as a warhammer; I despise subtlety and hypocrisy.",
  "Planifico metódicamente cada paso antes de actuar y me desespero si otros improvisan.": "I methodically plan every step before acting and get exasperated when others improvise.",
  "Me apasiona contar historias y exagerar mis hazañas frente al fuego de campamento.": "I love telling tall tales and exaggerating my exploits around the campfire.",

  // Universal Ideals
  "Justicia: Nadie está por encima de la ley moral, ni siquiera los reyes o los dioses.": "Justice: No one is above the moral law, not even kings or gods.",
  "Libertad: Las cadenas son para las bestias; nadie tiene derecho a esclavizar a otros.": "Freedom: Chains are meant for beasts; no one has the right to enslave others.",
  "Compasión: La verdadera fuerza se demuestra protegiendo a quienes no pueden defenderse.": "Compassion: True strength is shown by protecting those who cannot defend themselves.",
  "Poder: Solo los fuertes y decididos tienen el derecho de dictar el destino del mundo.": "Power: Only the strong and decisive have the right to dictate the fate of the world.",
  "Conocimiento: El saber y la comprensión del cosmos son el mayor tesoro existente.": "Knowledge: Understanding the mysteries of the cosmos is the greatest treasure in existence.",

  // Universal Bonds
  "Todo lo que hago es para devolverle el honor y la gloria perdida a mi familia o linaje.": "Everything I do is to restore lost honor and glory to my family or lineage.",
  "Poseo una extraña reliquia que me entregó mi mentor antes de desaparecer sin dejar rastro.": "I hold a strange relic entrusted to me by my mentor before they vanished without a trace.",
  "Tengo una deuda de vida impagable con un camarada al que juré proteger a cualquier coste.": "I owe an unpayable life debt to a comrade whom I swore to protect at all costs.",
  "Mi lealtad pertenece a mi pueblo natal; viajo para enviarles riquezas y protegerlos de las sombras.": "My loyalty belongs to my hometown; I adventure to send them wealth and guard them from the shadows.",
  "Busco venganza implacable contra la criatura o tirano que destruyó todo lo que amaba.": "I seek relentless vengeance against the monster or tyrant who destroyed everything I loved.",

  // Universal Flaws
  "No puedo resistirme a una apuesta arriesgada, una partida de dados o un desafío temerario.": "I can't resist a risky wager, a game of dice, or a reckless challenge.",
  "Mi orgullo es desmedido: me cuesta horrores admitir un error, incluso ante la evidencia.": "My pride is boundless; I find it excruciating to admit a mistake, even in the face of proof.",
  "Tengo un miedo secreto y visceral a la oscuridad absoluta o a quedar atrapado bajo tierra.": "I harbor a secret, visceral dread of total darkness or being trapped underground.",
  "El brillo del oro y las gemas preciosas nubla mi juicio y me tienta a cometer imprudencias.": "The glint of gold and precious gems clouds my judgment, tempting me into foolish risks.",
  "Guardo rencores eternos; nunca olvido ni perdono una ofensa, por insignificante que haya sido.": "I hold eternal grudges; I never forget or forgive an insult, however petty.",

  // Soldier
  "Mantengo una disciplina militar rigurosa en mi higiene, armas y campamento.": "I maintain rigorous military discipline in my hygiene, weapons, and camp.",
  "He visto los horrores de la guerra de cerca; duermo con un ojo abierto y alerta.": "I have seen the horrors of war firsthand; I sleep with one eye open and alert.",
  "Utilizo jerga militar y trato a mis compañeros como si fueran mi escuadrón.": "I use military jargon and treat my companions as if they were my platoon.",
  "Puedo quedarme dormido en cualquier lugar y soportar las peores inclemencias sin quejarme.": "I can fall asleep anywhere and endure the harshest hardships without complaint.",
  "Deber: Cumplo las órdenes de mis superiores con precisión milimétrica.": "Greater Good: Our lot is to lay down our lives in defense of others.",
  "Hermandad: Quienes combaten hombro con hombro conmigo son mi verdadera familia.": "Responsibility: I do what I must and obey just authority.",
  "Fuerza: En la batalla, solo la espada más afilada y el brazo más firme dictan la verdad.": "Might: In life as in war, the stronger force wins.",
  "Daré mi vida con honor para proteger a los soldados bajo mi mando o a mis camaradas.": "I would still lay down my life for the people I served with.",
  "Conservo el estandarte desgarrado de mi antiguo regimiento caído en batalla.": "Someone saved my life on the battlefield. To this day, I will never leave a friend behind.",
  "Busco al general traidor que vendió a mis compañeros en una emboscada letal.": "My honor is my life.",
  "El monstruoso enemigo que masacró a mi unidad todavía me acecha en pesadillas.": "I'll never forget the crushing defeat my company suffered or the enemies who dealt it.",
  "El monstruo que combatí aún me produce ataques de pánico ante ruidos estruendosos.": "The monstrous enemy we faced still gives me night terrors and panic attacks.",
  "Obedezco ciegamente la jerarquía militar, incluso cuando tengo dudas éticas.": "The monstrous enemy we faced still gives me night terrors and panic attacks.",
  "Desprecio a los civiles y cobardes que nunca han empuñado un arma por su pueblo.": "I have little respect for anyone who is not a proven warrior.",
  "Mi apetito voraz por la violencia a menudo complica situaciones diplomáticas.": "I'd rather eat my weapon than admit when I'm wrong.",

  // Criminal
  "Siempre tengo un plan de escape en mente antes de entrar en cualquier habitación.": "I always have an escape route mapped out before entering any room.",
  "Desconfío instintivamente de la guardia de la ciudad y de cualquier figura de autoridad.": "I instinctively distrust city guards and any figure of authority.",
  "Hablo en susurros y suelo ocultar mis manos en los bolsillos o mangas.": "I speak in whispers and keep my hands tucked in my pockets or sleeves.",
  "Me atrae el riesgo y disfruto de la adrenalina de burlar cerraduras imposibles.": "I am always calm, no matter what the situation. I never raise my voice or let my emotions control me.",
  "Libertad: Las cadenas son impuestas por los ricos para controlar a los audaces.": "Freedom: Chains are meant to be broken, as are those who would forge them.",
  "Lealtad: Entre ladrones y proscritos, la traición se paga con la vida; soy fiel a los míos.": "Honor: I don't steal from others in the trade.",
  "Codicia: Haré lo que sea necesario si el botín contiene suficientes monedas de oro.": "Greed: I will do whatever it takes to become wealthy.",
  "Debo una suma exorbitante a un peligroso jefe del bajo mundo que me busca.": "I'm trying to pay off an old debt I owe to a generous benefactor.",
  "Envío la mayor parte de mi dinero mal habido para mantener a mi familia en el anonimato.": "My ill-gotten gains go to support my family.",
  "Un antiguo socio me traicionó y me dejó pudriéndome en una celda; pagaré esa deuda.": "Something important was taken from me, and I aim to steal it back.",
  "Si veo algo brillante y desprotegido, mi impulso inicial siempre es robarlo.": "When I see something valuable, I can't think about anything but how to steal it.",
  "Huyo a la primera señal de que las cosas se complican en vez de luchar hasta el final.": "When faced with a choice between money and my friends, I usually choose the money.",
  "Nunca creo en las intenciones altruistas; creo que todo el mundo tiene un motivo oculto.": "An innocent person is in prison for a crime that I committed. I'm okay with that.",

  // Acolyte
  "Interpreto casi cada suceso fortuito como una señal directa o presagio de mi deidad.": "I idolize a particular hero of my faith, and constantly refer to that person's deeds and example.",
  "He pasado tanto tiempo en los templos que me cuesta entender las normas callejeras mundanas.": "I can find common ground between the fiercest enemies, empathizing with them and always working toward peace.",
  "Cito oraciones sagradas y escrituras canónicas en medio de conversaciones cotidianas.": "I see presages in every event and action. The gods try to speak to us, we just need to listen.",
  "Veo la bondad potencial en las almas más corrompidas y siempre ofrezco redención.": "Nothing can shake my optimistic attitude.",
  "Fe: Confío ciegamente en que los dioses guían mis pasos y nunca me abandonarán.": "Tradition: The ancient traditions of worship and sacrifice must be preserved and upheld.",
  "Tradición: Los ritos y liturgias ancestrales deben preservarse con devoción estricta.": "Charity: I always try to help those in need, no matter what the personal cost.",
  "Poder Sagrado: La magia divina es el único poder legítimo en el multiverso.": "Power: I hope to one day rise to the top of my faith's religious hierarchy.",
  "Haría cualquier cosa por defender el templo sagrado donde fui consagrado sacerdote.": "I would die to recover an ancient relic of my faith that was lost long ago.",
  "Busco recuperar una reliquia santa robada que fue profanada por herejes oscuros.": "I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.",
  "Mi meta es difundir las bendiciones y doctrinas de mi dios por tierras paganas.": "I owe my life to the priest who took me in after my parents died.",
  "Juzgo severamente a cualquiera que no comparta mi fe o exprese dudas teológicas.": "I judge others harshly, and myself even more severely.",
  "Obedezco ciegamente a la jerarquía de mi iglesia, incluso ante órdenes cuestionables.": "I put too much trust in those who wield power within my temple's hierarchy.",
  "Confío en que mi dios me salvará de peligros absurdos en lugar de ser precavido.": "Once I pick a goal, I become obsessed with it to the detriment of everything else in my life."
};

console.log('Total roleplay translations prepared:', Object.keys(ROLEPLAY_TRANSLATIONS).length);

// Generate src/utils/dndEnglishRoleplayAndBackgrounds.ts
const fileContent = `// Comprehensive English Translations for Backgrounds, Roleplay Traits, Equipment & Language Scripts
// Automatically loaded when UI language is English.

export const BACKGROUND_DESCRIPTIONS_EN: Record<string, string> = ${JSON.stringify(BACKGROUND_DESCRIPTIONS, null, 2)};

export const ROLEPLAY_TEXT_MAP_EN: Record<string, string> = ${JSON.stringify(ROLEPLAY_TRANSLATIONS, null, 2)};

export function translateLanguageScript(script: string): string {
  switch (script) {
    case 'Común': return 'Common';
    case 'Enano': return 'Dwarvish';
    case 'Élfico': return 'Elvish';
    case 'Infernal': return 'Infernal';
    case 'Celestial': return 'Celestial';
    case 'Dracónico': return 'Draconic';
    case 'Ninguno': return 'None';
    case 'Kraul': return 'Kraul';
    case 'Vedalken': return 'Vedalken';
    default: return script;
  }
}

export function translateBackgroundDescription(id: string, nameEn?: string, fallbackDesc?: string): string {
  if (id && BACKGROUND_DESCRIPTIONS_EN[id]) {
    return BACKGROUND_DESCRIPTIONS_EN[id];
  }
  const cleanId = (id || '').toLowerCase().replace(/^bg-/, '').replace(/^bg-2024-/, '');
  if (BACKGROUND_DESCRIPTIONS_EN[cleanId]) {
    return BACKGROUND_DESCRIPTIONS_EN[cleanId];
  }
  if (nameEn) {
    const slug = nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (BACKGROUND_DESCRIPTIONS_EN[slug]) {
      return BACKGROUND_DESCRIPTIONS_EN[slug];
    }
  }
  return fallbackDesc || '';
}

export function translateRoleplayOptionText(spanishText: string): string {
  if (!spanishText) return '';
  const trimmed = spanishText.trim();
  if (ROLEPLAY_TEXT_MAP_EN[trimmed]) {
    return ROLEPLAY_TEXT_MAP_EN[trimmed];
  }
  for (const [es, en] of Object.entries(ROLEPLAY_TEXT_MAP_EN)) {
    if (trimmed.includes(es)) {
      return trimmed.replace(es, en);
    }
  }
  return spanishText;
}
`;

fs.writeFileSync('src/utils/dndEnglishRoleplayAndBackgrounds.ts', fileContent, 'utf8');
console.log('Successfully wrote src/utils/dndEnglishRoleplayAndBackgrounds.ts');
