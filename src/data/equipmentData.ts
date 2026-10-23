import { CharacterAttack } from '../types';

export interface EquipmentOption {
  id: string;
  name: string;
  description: string;
  items: string[];
  attacks?: CharacterAttack[];
  armorAcBase?: number;
  armorType?: 'light' | 'medium' | 'heavy' | 'shield';
  shieldBonus?: number;
  isCustomizableWeapon?: boolean;
  weaponCategory?: 'martial' | 'simple' | 'all';
}

export interface EquipmentChoiceGroup {
  id: string;
  title: string;
  options: EquipmentOption[];
  defaultOptionId: string;
}

export interface ClassStartingEquipment {
  classId: string;
  className: string;
  choiceGroups: EquipmentChoiceGroup[];
  fixedEquipment: string[];
  startingGold: number;
}

export const CLASS_STARTING_EQUIPMENT: Record<string, ClassStartingEquipment> = {
  guerrero: {
    classId: 'guerrero',
    className: 'Guerrero (Fighter)',
    startingGold: 10,
    fixedEquipment: ['Muda de ropa común'],
    choiceGroups: [
      {
        id: 'armor',
        title: 'Armadura Principal',
        defaultOptionId: 'cota-malla',
        options: [
          {
            id: 'cota-malla',
            name: 'Cota de Malla (Chain Mail)',
            description: 'Armadura pesada de anillas de acero entrelazadas. Proporciona una sólida defensa física.',
            items: ['Cota de Malla'],
            armorAcBase: 16,
            armorType: 'heavy',
          },
          {
            id: 'cuero-arco',
            name: 'Armadura de Cuero, Arco Largo y 20 Flechas',
            description: 'Protección ligera de cuero endurecido combinada con un arco largo de tejo para combate a distancia.',
            items: ['Armadura de Cuero', 'Arco Largo', 'Carcaj con 20 Flechas'],
            armorAcBase: 11,
            armorType: 'light',
            attacks: [
              {
                id: 'arco-largo',
                name: 'Arco Largo',
                bonus: '+5',
                damage: '1d8 + 3',
                type: 'Perforante (Alcance 150/600)',
              },
            ],
          },
        ],
      },
      {
        id: 'primary-weapon',
        title: 'Arma Marcial Principal',
        defaultOptionId: 'espada-escudo',
        options: [
          {
            id: 'espada-escudo',
            name: 'Espada Larga y Escudo de Acero',
            description: 'Estilo clásico y versátil con espada recta de doble filo y escudo que otorga +2 a la CA.',
            items: ['Espada Larga', 'Escudo de Acero (+2 CA)'],
            shieldBonus: 2,
            attacks: [
              {
                id: 'espada-larga',
                name: 'Espada Larga',
                bonus: '+5',
                damage: '1d8 + 3 / 1d10 + 3',
                type: 'Cortante (Versátil)',
              },
            ],
          },
          {
            id: 'dos-marciales',
            name: 'Dos Espadas Cortas (Combate con dos armas)',
            description: 'Un par de espadas ágiles para asestar múltiples tajos rápidos por turno.',
            items: ['Espada Corta (Mano principal)', 'Espada Corta (Mano torpe)'],
            attacks: [
              {
                id: 'espada-corta-1',
                name: 'Espada Corta',
                bonus: '+5',
                damage: '1d6 + 3',
                type: 'Perforante (Sutil, Ligera)',
              },
            ],
          },
          {
            id: 'espadon',
            name: 'Gran Espadón a Dos Manos (Greatsword)',
            description: 'Una imponente hoja pesada diseñada para partir armaduras y quebrar filas enemigas.',
            items: ['Gran Espadón (Greatsword)'],
            attacks: [
              {
                id: 'espadon-dos-manos',
                name: 'Gran Espadón',
                bonus: '+5',
                damage: '2d6 + 3',
                type: 'Cortante (Pesada, A dos manos)',
              },
            ],
          },
          {
            id: 'arma-marcial-personalizada',
            name: 'Arma Marcial a Elección del Catálogo 5e',
            description: 'Elige libremente cualquier arma marcial de las 23 opciones oficiales 5e (Alabarda, Guja, Martillo de Guerra, Estoque, Arco Largo, etc.).',
            items: ['Arma Marcial a Elección'],
            isCustomizableWeapon: true,
            weaponCategory: 'martial',
          },
        ],
      },
      {
        id: 'secondary-weapon',
        title: 'Arma Secundaria o a Distancia',
        defaultOptionId: 'ballesta-ligera',
        options: [
          {
            id: 'ballesta-ligera',
            name: 'Ballesta Ligera y 20 Virotes',
            description: 'Mecanismo de tensión de precisión para abatir enemigos antes del choque cuerpo a cuerpo.',
            items: ['Ballesta Ligera', 'Estuche con 20 Virotes'],
            attacks: [
              {
                id: 'ballesta-ligera-att',
                name: 'Ballesta Ligera',
                bonus: '+4',
                damage: '1d8 + 2',
                type: 'Perforante (Alcance 80/320)',
              },
            ],
          },
          {
            id: 'dos-hachas-mano',
            name: 'Dos Hachas de Mano',
            description: 'Armas arrojadizas ligeras y devastadoras en distancias cortas.',
            items: ['Hacha de Mano (x2)'],
            attacks: [
              {
                id: 'hacha-mano-att',
                name: 'Hacha de Mano',
                bonus: '+5',
                damage: '1d6 + 3',
                type: 'Cortante (Arrojadiza 20/60)',
              },
            ],
          },
          {
            id: 'arma-simple-personalizada',
            name: 'Arma Simple a Elección del Catálogo 5e',
            description: 'Elige libremente cualquier arma simple de las 14 opciones oficiales 5e (Jabalinas, Bastón, Daga, Honda, etc.).',
            items: ['Arma Simple a Elección'],
            isCustomizableWeapon: true,
            weaponCategory: 'simple',
          },
        ],
      },
      {
        id: 'pack',
        title: 'Paquete de Equipo de Aventurero',
        defaultOptionId: 'paquete-mazmorras',
        options: [
          {
            id: 'paquete-mazmorras',
            name: 'Paquete de Explorador de Mazmorras',
            description: 'Mochila, palanca, martillo, 10 pitones de hierro, 10 antorchas, yesquero, 10 días de raciones secas, odre con agua y 50 pies de cuerda de cáñamo.',
            items: ['Mochila', 'Palanca de hierro', 'Martillo', '10 Pitones', '10 Antorchas', 'Yesquero', '10 Raciones', 'Odre de agua', '50 pies de Cuerda'],
          },
          {
            id: 'paquete-explorador',
            name: 'Paquete de Explorador',
            description: 'Mochila, saco de dormir, útiles de cocina, yesquero, 10 antorchas, 10 días de raciones, odre y 50 pies de cuerda.',
            items: ['Mochila', 'Saco de dormir', 'Útiles de cocina', 'Yesquero', '10 Antorchas', '10 Raciones', 'Odre', '50 pies de Cuerda'],
          },
        ],
      },
    ],
  },

  mago: {
    classId: 'mago',
    className: 'Mago (Wizard)',
    startingGold: 10,
    fixedEquipment: [
      'Libro de Conjuros (Grimorio encuadernado en cuero con 6 conjuros iniciales)',
      'Túnica de mago',
    ],
    choiceGroups: [
      {
        id: 'weapon',
        title: 'Arma Inicial',
        defaultOptionId: 'baston',
        options: [
          {
            id: 'baston',
            name: 'Bastón (Quarterstaff)',
            description: 'Vara de roble pulido que sirve tanto como arma de defensa como báculo de apoyo.',
            items: ['Bastón'],
            attacks: [
              {
                id: 'baston-mago',
                name: 'Bastón',
                bonus: '+2',
                damage: '1d6 - 1 / 1d8 - 1',
                type: 'Contundente (Versátil)',
              },
            ],
          },
          {
            id: 'daga',
            name: 'Daga Ritual de Acero',
            description: 'Hoja afilada para trazar círculos de protección o defenderte en combate cerrado.',
            items: ['Daga de Acero'],
            attacks: [
              {
                id: 'daga-mago',
                name: 'Daga',
                bonus: '+4',
                damage: '1d4 + 2',
                type: 'Perforante (Sutil, Ligera, Arrojadiza)',
              },
            ],
          },
        ],
      },
      {
        id: 'arcane-focus',
        title: 'Canalizador de Magia Arcana',
        defaultOptionId: 'foco-arcano',
        options: [
          {
            id: 'foco-arcano',
            name: 'Foco Arcano (Orbe de Cristal o Varita)',
            description: 'Un conducto cristalino canalizador que sustituye la necesidad de componentes materiales sencillos.',
            items: ['Foco Arcano (Varita de nogal o Esfera de Cristal)'],
          },
          {
            id: 'bolsa-componentes',
            name: 'Bolsa de Componentes de Conjuros',
            description: 'Bolsa de cuero compartimentada con polvos, hierbas y minerales para conjurar.',
            items: ['Bolsa de Componentes Arcanos'],
          },
        ],
      },
      {
        id: 'pack',
        title: 'Paquete de Equipo',
        defaultOptionId: 'paquete-erudito',
        options: [
          {
            id: 'paquete-erudito',
            name: 'Paquete de Erudito',
            description: 'Mochila, tomo de notas y sabiduría, frasco de tinta negra, pluma, 10 hojas de pergamino, bolsita de arena y un cuchillo pequeño.',
            items: ['Mochila', 'Tomo de notas', 'Frasco de tinta', 'Pluma', '10 Hojas de pergamino', 'Bolsita de arena', 'Cuchillo de pluma'],
          },
          {
            id: 'paquete-explorador',
            name: 'Paquete de Explorador',
            description: 'Mochila, saco de dormir, útiles de cocina, yesquero, 10 antorchas, 10 raciones, odre y 50 pies de cuerda.',
            items: ['Mochila', 'Saco de dormir', 'Útiles de cocina', 'Yesquero', '10 Antorchas', '10 Raciones', 'Odre', '50 pies de Cuerda'],
          },
        ],
      },
    ],
  },

  picaro: {
    classId: 'picaro',
    className: 'Pícaro (Rogue)',
    startingGold: 10,
    fixedEquipment: [
      'Armadura de Cuero (11 + Des)',
      'Dos Dagas de Acero',
      'Juego de Herramientas de Ladrón (Ganzúas, alambres y limas)',
    ],
    choiceGroups: [
      {
        id: 'primary-weapon',
        title: 'Arma Principal',
        defaultOptionId: 'estoque',
        options: [
          {
            id: 'estoque',
            name: 'Estoque de Acero (Rapier)',
            description: 'Espada de estocada fina y elegante para impactar en puntos vitales.',
            items: ['Estoque'],
            attacks: [
              {
                id: 'estoque-picaro',
                name: 'Estoque',
                bonus: '+5',
                damage: '1d8 + 3',
                type: 'Perforante (Sutil)',
              },
            ],
          },
          {
            id: 'espada-corta',
            name: 'Espada Corta',
            description: 'Arma corta y equilibrada ideal para ataques sigilosos rápidos.',
            items: ['Espada Corta'],
            attacks: [
              {
                id: 'espada-corta-picaro',
                name: 'Espada Corta',
                bonus: '+5',
                damage: '1d6 + 3',
                type: 'Perforante (Sutil, Ligera)',
              },
            ],
          },
          {
            id: 'arma-sutil-eleccion',
            name: 'Arma a Elección del Catálogo 5e',
            description: 'Elige un arma del compendio (Estoque, Espada Corta, Cimitarra, Ballesta, etc.).',
            items: ['Arma a elección'],
            isCustomizableWeapon: true,
            weaponCategory: 'all',
          },
        ],
      },
      {
        id: 'secondary-weapon',
        title: 'Arma a Distancia o Secundaria',
        defaultOptionId: 'arco-corto',
        options: [
          {
            id: 'arco-corto',
            name: 'Arco Corto y 20 Flechas',
            description: 'Arco ligero y manejable para emboscar desde las sombras.',
            items: ['Arco Corto', 'Carcaj con 20 Flechas'],
            attacks: [
              {
                id: 'arco-corto-picaro',
                name: 'Arco Corto',
                bonus: '+5',
                damage: '1d6 + 3',
                type: 'Perforante (Alcance 80/320)',
              },
            ],
          },
          {
            id: 'segunda-espada-corta',
            name: 'Segunda Espada Corta (Combate con dos armas)',
            description: 'Permite asestar un ataque adicional con la mano torpe como acción adicional.',
            items: ['Espada Corta adicional'],
            attacks: [
              {
                id: 'espada-corta-torpe',
                name: 'Segunda Espada Corta',
                bonus: '+5',
                damage: '1d6',
                type: 'Perforante (Ligera)',
              },
            ],
          },
        ],
      },
      {
        id: 'pack',
        title: 'Paquete de Equipo',
        defaultOptionId: 'paquete-ladron',
        options: [
          {
            id: 'paquete-ladron',
            name: 'Paquete de Ladrón',
            description: 'Mochila, 100 bolas de metal, campana con cuerda, 5 velas, palanca, linterna sorda, 2 frascos de aceite, raciones y odre.',
            items: ['Mochila', '100 Bolas de metal', 'Campana', '5 Velas', 'Palanca', 'Linterna con caperuza', '2 Frascos de aceite', '5 Raciones', 'Odre'],
          },
          {
            id: 'paquete-mazmorras',
            name: 'Paquete de Explorador de Mazmorras',
            description: 'Mochila, palanca, martillo, 10 pitones, 10 antorchas, yesquero, 10 raciones, odre y 50 pies de cuerda.',
            items: ['Mochila', 'Palanca', 'Martillo', '10 Pitones', '10 Antorchas', 'Yesquero', '10 Raciones', 'Odre', '50 pies de Cuerda'],
          },
        ],
      },
    ],
  },

  clerigo: {
    classId: 'clerigo',
    className: 'Clérigo (Cleric)',
    startingGold: 15,
    fixedEquipment: [
      'Escudo de Madera o Acero (+2 CA)',
      'Símbolo Sagrado de tu Deidad (Amuleto o Relicario)',
      'Vestimentas clericales de viaje',
    ],
    choiceGroups: [
      {
        id: 'primary-weapon',
        title: 'Arma Sagrada',
        defaultOptionId: 'maza',
        options: [
          {
            id: 'maza',
            name: 'Maza de Hierro Bendecida',
            description: 'Arma tradicional de los templos diseñada para machacar esqueletos y enemigos de la fe.',
            items: ['Maza de Hierro'],
            attacks: [
              {
                id: 'maza-clerigo',
                name: 'Maza',
                bonus: '+4',
                damage: '1d6 + 2',
                type: 'Contundente',
              },
            ],
          },
          {
            id: 'martillo-guerra',
            name: 'Martillo de Guerra (Warhammer)',
            description: 'Poderosa arma contundente para clérigos con competencia marcial.',
            items: ['Martillo de Guerra'],
            attacks: [
              {
                id: 'martillo-clerigo',
                name: 'Martillo de Guerra',
                bonus: '+4',
                damage: '1d8 + 2 / 1d10 + 2',
                type: 'Contundente (Versátil)',
              },
            ],
          },
          {
            id: 'arma-simple-eleccion',
            name: 'Arma Simple a Elección del Catálogo 5e',
            description: 'Elige cualquier arma simple de las 14 opciones canónicas (Lanza, Jabalina, Maza, Hoz, etc.).',
            items: ['Arma simple a elección'],
            isCustomizableWeapon: true,
            weaponCategory: 'simple',
          },
        ],
      },
      {
        id: 'armor',
        title: 'Armadura Protectora',
        defaultOptionId: 'cota-escamas',
        options: [
          {
            id: 'cota-escamas',
            name: 'Cota de Escamas (Scale Mail)',
            description: 'Armadura media de placas metálicas superpuestas (14 + Des máx 2).',
            items: ['Cota de Escamas'],
            armorAcBase: 14,
            armorType: 'medium',
          },
          {
            id: 'cuero',
            name: 'Armadura de Cuero',
            description: 'Armadura ligera que permite máxima movilidad sin desventaja en Sigilo.',
            items: ['Armadura de Cuero'],
            armorAcBase: 11,
            armorType: 'light',
          },
          {
            id: 'cota-malla-clerigo',
            name: 'Cota de Malla (Para dominios con armadura pesada)',
            description: 'Armadura pesada de anillas (16 CA). Disponible para dominios de Guerra, Tempestad, Vida, etc.',
            items: ['Cota de Malla'],
            armorAcBase: 16,
            armorType: 'heavy',
          },
        ],
      },
      {
        id: 'ranged-weapon',
        title: 'Arma Secundaria',
        defaultOptionId: 'ballesta-ligera',
        options: [
          {
            id: 'ballesta-ligera',
            name: 'Ballesta Ligera y 20 Virotes',
            description: 'Ataque certero a distancia para abatir enemigos antes del combate cuerpo a cuerpo.',
            items: ['Ballesta Ligera', '20 Virotes'],
            attacks: [
              {
                id: 'ballesta-clerigo',
                name: 'Ballesta Ligera',
                bonus: '+3',
                damage: '1d8 + 1',
                type: 'Perforante (Alcance 80/320)',
              },
            ],
          },
          {
            id: 'arma-simple',
            name: 'Lanza y Dos Dagas',
            description: 'Armas sencillas bendecidas para combate a pie o arrojadizo.',
            items: ['Lanza', 'Daga (x2)'],
            attacks: [
              {
                id: 'lanza-clerigo',
                name: 'Lanza',
                bonus: '+4',
                damage: '1d6 + 2 / 1d8 + 2',
                type: 'Perforante (Versátil, Arrojadiza)',
              },
            ],
          },
        ],
      },
      {
        id: 'pack',
        title: 'Paquete de Equipo',
        defaultOptionId: 'paquete-sacerdote',
        options: [
          {
            id: 'paquete-sacerdote',
            name: 'Paquete de Sacerdote',
            description: 'Mochila, manta, 10 velas, yesquero, caja de limosnas, incensario, vestiduras, 2 días de raciones y odre.',
            items: ['Mochila', 'Manta', '10 Velas', 'Yesquero', 'Caja de limosnas', 'Incensario', 'Vestiduras', '2 Raciones', 'Odre'],
          },
          {
            id: 'paquete-explorador',
            name: 'Paquete de Explorador',
            description: 'Mochila, saco de dormir, útiles de cocina, yesquero, 10 antorchas, 10 raciones, odre y 50 pies de cuerda.',
            items: ['Mochila', 'Saco de dormir', 'Útiles de cocina', 'Yesquero', '10 Antorchas', '10 Raciones', 'Odre', '50 pies de Cuerda'],
          },
        ],
      },
    ],
  },

  barbaro: {
    classId: 'barbaro',
    className: 'Bárbaro (Barbarian)',
    startingGold: 10,
    fixedEquipment: [
      'Cuatro Jabalinas de caza',
      'Ropas de pieles y viaje',
    ],
    choiceGroups: [
      {
        id: 'primary-weapon',
        title: 'Arma Devastadora Principal',
        defaultOptionId: 'gran-hacha',
        options: [
          {
            id: 'gran-hacha',
            name: 'Gran Hacha a Dos Manos (Greataxe)',
            description: 'Arma brutal con filo semicircular de 1d12 de daño cortante.',
            items: ['Gran Hacha (Greataxe)'],
            attacks: [
              {
                id: 'gran-hacha-att',
                name: 'Gran Hacha',
                bonus: '+5',
                damage: '1d12 + 3',
                type: 'Cortante (Pesada, A dos manos)',
              },
            ],
          },
          {
            id: 'espadon-barbaro',
            name: 'Gran Espadón (Greatsword)',
            description: 'Hoja pesada de 2d6 de daño para garantizar daño medio más elevado.',
            items: ['Gran Espadón'],
            attacks: [
              {
                id: 'espadon-barbaro-att',
                name: 'Gran Espadón',
                bonus: '+5',
                damage: '2d6 + 3',
                type: 'Cortante (Pesada, A dos manos)',
              },
            ],
          },
          {
            id: 'arma-marcial-barbaro-custom',
            name: 'Arma Marcial a Elección del Catálogo 5e',
            description: 'Elige cualquier arma marcial cuerpo a cuerpo oficial del catálogo (Alabarda, Guja, Martillo de Guerra, etc.).',
            items: ['Arma Marcial a Elección'],
            isCustomizableWeapon: true,
            weaponCategory: 'martial',
          },
        ],
      },
      {
        id: 'secondary-weapon',
        title: 'Armas de Mano Secundarias',
        defaultOptionId: 'dos-hachas',
        options: [
          {
            id: 'dos-hachas',
            name: 'Dos Hachas de Mano',
            description: 'Para asestar golpes brutales con ambas manos o arrojar a la distancia.',
            items: ['Hacha de Mano (x2)'],
            attacks: [
              {
                id: 'hacha-mano-barbaro',
                name: 'Hacha de Mano',
                bonus: '+5',
                damage: '1d6 + 3',
                type: 'Cortante (Ligera, Arrojadiza)',
              },
            ],
          },
          {
            id: 'dos-mazas',
            name: 'Dos Mazas de Guerra',
            description: 'Mazas de hueso y hierro contundentes.',
            items: ['Maza (x2)'],
            attacks: [
              {
                id: 'maza-barbaro',
                name: 'Maza',
                bonus: '+5',
                damage: '1d6 + 3',
                type: 'Contundente',
              },
            ],
          },
          {
            id: 'arma-simple-barbaro-custom',
            name: 'Arma Simple a Elección del Catálogo 5e',
            description: 'Elige cualquier arma simple oficial del catálogo (Lanza, Dagas, Garrote, etc.).',
            items: ['Arma Simple a Elección'],
            isCustomizableWeapon: true,
            weaponCategory: 'simple',
          },
        ],
      },
      {
        id: 'pack',
        title: 'Paquete de Equipo',
        defaultOptionId: 'paquete-explorador',
        options: [
          {
            id: 'paquete-explorador',
            name: 'Paquete de Explorador',
            description: 'Mochila, saco de dormir, útiles de cocina, yesquero, 10 antorchas, 10 raciones, odre y 50 pies de cuerda.',
            items: ['Mochila', 'Saco de dormir', 'Útiles de cocina', 'Yesquero', '10 Antorchas', '10 Raciones', 'Odre', '50 pies de Cuerda'],
          },
        ],
      },
    ],
  },

  bardo: {
    classId: 'bardo',
    className: 'Bardo (Bard)',
    startingGold: 15,
    fixedEquipment: ['Armadura de Cuero (11 + Des)', 'Daga de acero', 'Traje de artista'],
    choiceGroups: [
      {
        id: 'weapon',
        title: 'Arma Elegante',
        defaultOptionId: 'estoque',
        options: [
          {
            id: 'estoque',
            name: 'Estoque (Rapier)',
            description: 'Hoja estilizada de esgrima para duelistas cortesanos.',
            items: ['Estoque'],
            attacks: [
              {
                id: 'estoque-bardo',
                name: 'Estoque',
                bonus: '+5',
                damage: '1d8 + 3',
                type: 'Perforante (Sutil)',
              },
            ],
          },
          {
            id: 'espada-larga',
            name: 'Espada Larga',
            description: 'Espada de caballero para trovadores y poetas guerreros.',
            items: ['Espada Larga'],
            attacks: [
              {
                id: 'espada-larga-bardo',
                name: 'Espada Larga',
                bonus: '+4',
                damage: '1d8 + 2 / 1d10 + 2',
                type: 'Cortante (Versátil)',
              },
            ],
          },
          {
            id: 'arma-simple-eleccion',
            name: 'Cualquier Arma Simple a Elección del Catálogo 5e',
            description: 'Elige cualquier arma simple de las 14 opciones canónicas (Daga, Lanza, Maza, etc.).',
            items: ['Arma simple a elección'],
            isCustomizableWeapon: true,
            weaponCategory: 'simple',
          },
        ],
      },
      {
        id: 'instrument',
        title: 'Instrumento Musical Principal',
        defaultOptionId: 'laud',
        options: [
          {
            id: 'laud',
            name: 'Laúd Finamente Tallado',
            description: 'Instrumento de cuerda tradicional con sonido dulce y armónico.',
            items: ['Laúd'],
          },
          {
            id: 'flauta',
            name: 'Flauta de Madera / Pan',
            description: 'Instrumento de viento portátil para melodías errantes.',
            items: ['Flauta'],
          },
          {
            id: 'tambor',
            name: 'Tambor de Guerra Rítmico',
            description: 'Instrumento de percusión para infundir coraje.',
            items: ['Tambor'],
          },
        ],
      },
      {
        id: 'pack',
        title: 'Paquete de Equipo',
        defaultOptionId: 'paquete-artista',
        options: [
          {
            id: 'paquete-artista',
            name: 'Paquete de Artista',
            description: 'Mochila, saco de dormir, 2 disfraces, 5 velas, 5 raciones, odre y kit de maquillaje.',
            items: ['Mochila', 'Saco de dormir', '2 Disfraces', '5 Velas', '5 Raciones', 'Odre', 'Kit de maquillaje'],
          },
          {
            id: 'paquete-diplomatico',
            name: 'Paquete de Diplomático',
            description: 'Cofre, ropa fina, frasco de tinta, pluma, pergaminos, lámpara, aceite y perfume.',
            items: ['Cofre', 'Ropa fina', 'Tinta', 'Pluma', 'Pergaminos', 'Lámpara', 'Aceite', 'Perfume'],
          },
        ],
      },
    ],
  },

  druida: {
    classId: 'druida',
    className: 'Druida (Druid)',
    startingGold: 10,
    fixedEquipment: [
      'Armadura de Cuero (11 + Des)',
      'Foco Druídico (ramita de muérdago o tótem de tejo tallado)',
      'Paquete de explorador',
    ],
    choiceGroups: [
      {
        id: 'shield-or-weapon',
        title: 'Escudo o Arma Simple',
        defaultOptionId: 'escudo-madera',
        options: [
          {
            id: 'escudo-madera',
            name: 'Escudo de Madera (+2 CA)',
            description: 'Escudo tallado en roble endurecido, respetuoso del juramento druídico contra el metal.',
            items: ['Escudo de Madera (+2 CA)'],
            shieldBonus: 2,
          },
          {
            id: 'garrote-simple',
            name: 'Garrote de Roble Sagrado',
            description: 'Arma contundente ideal para imbuir con el truco Shillelagh.',
            items: ['Garrote'],
            attacks: [
              {
                id: 'garrote-druida',
                name: 'Garrote (o Shillelagh)',
                bonus: '+4',
                damage: '1d4 + 2 (o 1d8 + 3 mágico)',
                type: 'Contundente',
              },
            ],
          },
        ],
      },
      {
        id: 'melee-weapon',
        title: 'Arma Cuerpo a Cuerpo',
        defaultOptionId: 'cimitarra',
        options: [
          {
            id: 'cimitarra',
            name: 'Cimitarra de Acero Druídico',
            description: 'Hoja curva tradicional para cortar maleza y defender el bosque sagrado.',
            items: ['Cimitarra'],
            attacks: [
              {
                id: 'cimitarra-druida',
                name: 'Cimitarra',
                bonus: '+4',
                damage: '1d6 + 2',
                type: 'Cortante (Sutil, Ligera)',
              },
            ],
          },
          {
            id: 'lanza-druida',
            name: 'Lanza de Caza',
            description: 'Lanza con punta de pedernal o hueso para pesca y combate.',
            items: ['Lanza'],
            attacks: [
              {
                id: 'lanza-druida-att',
                name: 'Lanza',
                bonus: '+4',
                damage: '1d6 + 2 / 1d8 + 2',
                type: 'Perforante (Versátil, Arrojadiza)',
              },
            ],
          },
        ],
      },
    ],
  },

  paladin: {
    classId: 'paladin',
    className: 'Paladín (Paladin)',
    startingGold: 10,
    fixedEquipment: [
      'Cota de Malla de Acero (16 CA)',
      'Símbolo Sagrado de tu Juramento',
      'Muda de ropa militar o religiosa',
    ],
    choiceGroups: [
      {
        id: 'primary-weapon',
        title: 'Armamento Sagrado Principal',
        defaultOptionId: 'espada-escudo',
        options: [
          {
            id: 'espada-escudo',
            name: 'Espada Larga y Escudo Sagrado (+2 CA)',
            description: 'La estampa heroica del defensor devoto: 18 CA total y tajo versátil.',
            items: ['Espada Larga', 'Escudo Sagrado (+2 CA)'],
            shieldBonus: 2,
            attacks: [
              {
                id: 'espada-larga-paladin',
                name: 'Espada Larga',
                bonus: '+5',
                damage: '1d8 + 3 / 1d10 + 3',
                type: 'Cortante (Versátil)',
              },
            ],
          },
          {
            id: 'mandoble-paladin',
            name: 'Mandoble a Dos Manos (Greatsword)',
            description: 'Hoja ceremonial pesada para descargar la ira y castigos divinos.',
            items: ['Mandoble (Greatsword)'],
            attacks: [
              {
                id: 'mandoble-paladin-att',
                name: 'Mandoble',
                bonus: '+5',
                damage: '2d6 + 3',
                type: 'Cortante (Pesada, A dos manos)',
              },
            ],
          },
          {
            id: 'arma-marcial-paladin-custom',
            name: 'Arma Marcial a Elección del Catálogo 5e',
            description: 'Elige libremente cualquier arma marcial oficial del catálogo (Alabarda, Martillo de Guerra, Lanza de Caballería, etc.).',
            items: ['Arma Marcial a Elección'],
            isCustomizableWeapon: true,
            weaponCategory: 'martial',
          },
        ],
      },
      {
        id: 'secondary-weapon',
        title: 'Armas Secundarias',
        defaultOptionId: 'cinco-jabalinas',
        options: [
          {
            id: 'cinco-jabalinas',
            name: 'Cinco Jabalinas de Guerra',
            description: 'Armas arrojadizas para hostigar a enemigos a distancia.',
            items: ['Jabalinas de Guerra (x5)'],
            attacks: [
              {
                id: 'jabalina-paladin',
                name: 'Jabalina',
                bonus: '+5',
                damage: '1d6 + 3',
                type: 'Perforante (Arrojadiza 30/120)',
              },
            ],
          },
          {
            id: 'martillo-mano',
            name: 'Dos Martillos Ligeros',
            description: 'Martillos cortos de mano para combate cerrado.',
            items: ['Martillo Ligero (x2)'],
            attacks: [
              {
                id: 'martillo-ligero-paladin',
                name: 'Martillo Ligero',
                bonus: '+5',
                damage: '1d4 + 3',
                type: 'Contundente (Ligero, Arrojadizo)',
              },
            ],
          },
          {
            id: 'arma-simple-paladin-custom',
            name: 'Arma Simple Cuerpo a Cuerpo a Elección',
            description: 'Elige cualquier arma simple oficial del catálogo (Maza, Lanza, Hacha de Mano, etc.).',
            items: ['Arma Simple a Elección'],
            isCustomizableWeapon: true,
            weaponCategory: 'simple',
          },
        ],
      },
      {
        id: 'pack',
        title: 'Paquete de Equipo',
        defaultOptionId: 'paquete-sacerdote',
        options: [
          {
            id: 'paquete-sacerdote',
            name: 'Paquete de Sacerdote',
            description: 'Mochila, manta, 10 velas, yesquero, caja de limosnas, incensario, vestiduras, 2 raciones y odre.',
            items: ['Mochila', 'Manta', '10 Velas', 'Yesquero', 'Caja de limosnas', 'Incensario', 'Vestiduras', '2 Raciones', 'Odre'],
          },
          {
            id: 'paquete-explorador',
            name: 'Paquete de Explorador',
            description: 'Mochila, saco de dormir, útiles de cocina, yesquero, 10 antorchas, 10 raciones, odre y 50 pies de cuerda.',
            items: ['Mochila', 'Saco de dormir', 'Útiles de cocina', 'Yesquero', '10 Antorchas', '10 Raciones', 'Odre', '50 pies de Cuerda'],
          },
        ],
      },
    ],
  },

  explorador: {
    classId: 'explorador',
    className: 'Explorador (Ranger)',
    startingGold: 10,
    fixedEquipment: [
      'Arco Largo y Carcaj con 20 Flechas',
      'Ropas de camuflaje y botas de viaje',
    ],
    choiceGroups: [
      {
        id: 'armor',
        title: 'Armadura Inicial',
        defaultOptionId: 'cota-escamas',
        options: [
          {
            id: 'cota-escamas',
            name: 'Cota de Escamas (Scale Mail)',
            description: 'Armadura media de escamas metálicas (14 + Des máx 2).',
            items: ['Cota de Escamas'],
            armorAcBase: 14,
            armorType: 'medium',
          },
          {
            id: 'armadura-cuero',
            name: 'Armadura de Cuero',
            description: 'Armadura ligera que permite acechar en absoluto silencio sin penalización.',
            items: ['Armadura de Cuero'],
            armorAcBase: 11,
            armorType: 'light',
          },
        ],
      },
      {
        id: 'melee-weapons',
        title: 'Armas de Combate Cuerpo a Cuerpo',
        defaultOptionId: 'dos-espadas-cortas',
        options: [
          {
            id: 'dos-espadas-cortas',
            name: 'Dos Espadas Cortas',
            description: 'La doctrina clásica del explorador de bosque para luchar con dos armas ágiles.',
            items: ['Espada Corta (x2)'],
            attacks: [
              {
                id: 'espada-corta-ranger',
                name: 'Espada Corta',
                bonus: '+5',
                damage: '1d6 + 3',
                type: 'Perforante (Sutil, Ligera)',
              },
            ],
          },
          {
            id: 'dos-hachas-mano',
            name: 'Dos Hachas de Mano',
            description: 'Hachas de leñador eficaces en combate y tala de senderos.',
            items: ['Hacha de Mano (x2)'],
            attacks: [
              {
                id: 'hacha-mano-ranger',
                name: 'Hacha de Mano',
                bonus: '+5',
                damage: '1d6 + 3',
                type: 'Cortante (Arrojadiza 20/60)',
              },
            ],
          },
          {
            id: 'armas-eleccion-ranger',
            name: 'Arma Marcial o Simple a Elección del Catálogo 5e',
            description: 'Elige cualquier arma marcial o simple del compendio 5e adaptada a tu estilo de rastreador.',
            items: ['Arma marcial a elección'],
            isCustomizableWeapon: true,
            weaponCategory: 'martial',
          },
        ],
      },
      {
        id: 'pack',
        title: 'Paquete de Equipo',
        defaultOptionId: 'paquete-explorador',
        options: [
          {
            id: 'paquete-explorador',
            name: 'Paquete de Explorador',
            description: 'Mochila, saco de dormir, útiles de cocina, yesquero, 10 antorchas, 10 raciones, odre y 50 pies de cuerda.',
            items: ['Mochila', 'Saco de dormir', 'Útiles de cocina', 'Yesquero', '10 Antorchas', '10 Raciones', 'Odre', '50 pies de Cuerda'],
          },
          {
            id: 'paquete-mazmorras',
            name: 'Paquete de Explorador de Mazmorras',
            description: 'Mochila, palanca, martillo, 10 pitones, 10 antorchas, yesquero, 10 raciones, odre y 50 pies de cuerda.',
            items: ['Mochila', 'Palanca', 'Martillo', '10 Pitones', '10 Antorchas', 'Yesquero', '10 Raciones', 'Odre', '50 pies de Cuerda'],
          },
        ],
      },
    ],
  },

  hechicero: {
    classId: 'hechicero',
    className: 'Hechicero (Sorcerer)',
    startingGold: 15,
    fixedEquipment: [
      'Dos Dagas de Acero',
      'Ropas de viaje distinguidas',
    ],
    choiceGroups: [
      {
        id: 'ranged-weapon',
        title: 'Arma a Distancia o Secundaria',
        defaultOptionId: 'ballesta-ligera',
        options: [
          {
            id: 'ballesta-ligera',
            name: 'Ballesta Ligera y 20 Virotes',
            description: 'Arma mecánica para disparar a distancia sin revelar tu poder innato.',
            items: ['Ballesta Ligera', '20 Virotes'],
            attacks: [
              {
                id: 'ballesta-hechicero',
                name: 'Ballesta Ligera',
                bonus: '+4',
                damage: '1d8 + 2',
                type: 'Perforante (Alcance 80/320)',
              },
            ],
          },
          {
            id: 'dos-dagas-extra',
            name: 'Daga Arrojadiza Adicional y Honda',
            description: 'Armas sencillas ocultables entre tus ropas.',
            items: ['Honda', 'Daga adicional'],
            attacks: [
              {
                id: 'honda-hechicero',
                name: 'Honda',
                bonus: '+4',
                damage: '1d4 + 2',
                type: 'Contundente (Alcance 30/120)',
              },
            ],
          },
        ],
      },
      {
        id: 'focus',
        title: 'Foco Arcano o Componentes',
        defaultOptionId: 'foco-arcano',
        options: [
          {
            id: 'foco-arcano',
            name: 'Foco Arcano (Varita, Cristal o Cetro)',
            description: 'Un talismán canalizador que enfoca la magia pura que late en tu sangre.',
            items: ['Foco Arcano'],
          },
          {
            id: 'bolsa-componentes',
            name: 'Bolsa de Componentes de Conjuro',
            description: 'Bolsa con ingredientes materiales para tus hechizos.',
            items: ['Bolsa de Componentes'],
          },
        ],
      },
      {
        id: 'pack',
        title: 'Paquete de Equipo',
        defaultOptionId: 'paquete-mazmorras',
        options: [
          {
            id: 'paquete-mazmorras',
            name: 'Paquete de Explorador de Mazmorras',
            description: 'Mochila, palanca, martillo, 10 pitones, 10 antorchas, yesquero, 10 raciones, odre y 50 pies de cuerda.',
            items: ['Mochila', 'Palanca', 'Martillo', '10 Pitones', '10 Antorchas', 'Yesquero', '10 Raciones', 'Odre', '50 pies de Cuerda'],
          },
          {
            id: 'paquete-explorador',
            name: 'Paquete de Explorador',
            description: 'Mochila, saco de dormir, útiles de cocina, yesquero, 10 antorchas, 10 raciones, odre y 50 pies de cuerda.',
            items: ['Mochila', 'Saco de dormir', 'Útiles de cocina', 'Yesquero', '10 Antorchas', '10 Raciones', 'Odre', '50 pies de Cuerda'],
          },
        ],
      },
    ],
  },

  brujo: {
    classId: 'brujo',
    className: 'Brujo (Warlock)',
    startingGold: 10,
    fixedEquipment: [
      'Armadura de Cuero (11 + Des)',
      'Dos Dagas Ceremoniales',
      'Foco Arcano otorgado por tu Patrón',
      'Ropas de viajero oscuras',
    ],
    choiceGroups: [
      {
        id: 'primary-weapon',
        title: 'Arma Inicial',
        defaultOptionId: 'ballesta-ligera',
        options: [
          {
            id: 'ballesta-ligera',
            name: 'Ballesta Ligera y 20 Virotes',
            description: 'Arma mecánica para conservar tu magia de pacto en emboscadas.',
            items: ['Ballesta Ligera', '20 Virotes'],
            attacks: [
              {
                id: 'ballesta-brujo',
                name: 'Ballesta Ligera',
                bonus: '+4',
                damage: '1d8 + 2',
                type: 'Perforante (Alcance 80/320)',
              },
            ],
          },
          {
            id: 'lanza-brujo',
            name: 'Lanza Rúnica',
            description: 'Lanza grabada con símbolos ocultos de tu pacto.',
            items: ['Lanza'],
            attacks: [
              {
                id: 'lanza-brujo-att',
                name: 'Lanza',
                bonus: '+4',
                damage: '1d6 + 2 / 1d8 + 2',
                type: 'Perforante (Versátil)',
              },
            ],
          },
        ],
      },
      {
        id: 'pack',
        title: 'Paquete de Equipo',
        defaultOptionId: 'paquete-erudito',
        options: [
          {
            id: 'paquete-erudito',
            name: 'Paquete de Erudito Ocultista',
            description: 'Mochila, libro de secretos, frasco de tinta, pluma, pergaminos, bolsita de arena y cuchillo.',
            items: ['Mochila', 'Libro de notas', 'Tinta', 'Pluma', '10 Hojas de pergamino', 'Bolsita de arena', 'Cuchillo'],
          },
          {
            id: 'paquete-mazmorras',
            name: 'Paquete de Explorador de Mazmorras',
            description: 'Mochila, palanca, martillo, 10 pitones, 10 antorchas, yesquero, 10 raciones, odre y 50 pies de cuerda.',
            items: ['Mochila', 'Palanca', 'Martillo', '10 Pitones', '10 Antorchas', 'Yesquero', '10 Raciones', 'Odre', '50 pies de Cuerda'],
          },
        ],
      },
    ],
  },

  monje: {
    classId: 'monje',
    className: 'Monje (Monk)',
    startingGold: 5,
    fixedEquipment: [
      '10 Dardos de acero',
      'Hábito monástico sencillo de tela y sandalias',
    ],
    choiceGroups: [
      {
        id: 'monk-weapon',
        title: 'Arma Monástica',
        defaultOptionId: 'espada-corta',
        options: [
          {
            id: 'espada-corta',
            name: 'Espada Corta Tradicional',
            description: 'Arma equilibrada compatible con los ataques de artes marciales del monje.',
            items: ['Espada Corta'],
            attacks: [
              {
                id: 'espada-corta-monk',
                name: 'Espada Corta',
                bonus: '+5',
                damage: '1d6 + 3',
                type: 'Perforante (Arma de Monje)',
              },
            ],
          },
          {
            id: 'lanza-monje',
            name: 'Lanza de Bambú y Acero',
            description: 'Lanza que permite golpear con ambas manos a dos manos (1d8 de daño).',
            items: ['Lanza'],
            attacks: [
              {
                id: 'lanza-monje-att',
                name: 'Lanza',
                bonus: '+5',
                damage: '1d6 + 3 / 1d8 + 3',
                type: 'Perforante (Versátil, Arma de Monje)',
              },
            ],
          },
        ],
      },
      {
        id: 'pack',
        title: 'Paquete de Equipo',
        defaultOptionId: 'paquete-explorador',
        options: [
          {
            id: 'paquete-explorador',
            name: 'Paquete de Explorador',
            description: 'Mochila, saco de dormir, útiles de cocina, yesquero, 10 antorchas, 10 raciones, odre y 50 pies de cuerda.',
            items: ['Mochila', 'Saco de dormir', 'Útiles de cocina', 'Yesquero', '10 Antorchas', '10 Raciones', 'Odre', '50 pies de Cuerda'],
          },
          {
            id: 'paquete-mazmorras',
            name: 'Paquete de Explorador de Mazmorras',
            description: 'Mochila, palanca, martillo, 10 pitones, 10 antorchas, yesquero, 10 raciones, odre y 50 pies de cuerda.',
            items: ['Mochila', 'Palanca', 'Martillo', '10 Pitones', '10 Antorchas', 'Yesquero', '10 Raciones', 'Odre', '50 pies de Cuerda'],
          },
        ],
      },
    ],
  },

  pugilista: {
    classId: 'pugilista',
    className: 'Pugilista (Pugilist)',
    startingGold: 10,
    fixedEquipment: [
      'Paquete de explorador de mazmorras',
      'Vendas protectoras de nudillos',
      'Pantalón de lona y tirantes de cuero',
    ],
    choiceGroups: [
      {
        id: 'armor',
        title: 'Atuendo Defensivo',
        defaultOptionId: 'cuero-pugilista',
        options: [
          {
            id: 'cuero-pugilista',
            name: 'Armadura de Cuero Curtido',
            description: 'Chaleco de cuero ligero que amortigua golpes sin limitar el juego de pies.',
            items: ['Armadura de Cuero'],
            armorAcBase: 11,
            armorType: 'light',
          },
          {
            id: 'ropas-pesadas',
            name: 'Ropas de Faena Reforzadas',
            description: 'Ropa resistente sin armadura para confiar plenamente en tu defensa sin armadura.',
            items: ['Ropas de Faena'],
          },
        ],
      },
      {
        id: 'weapon',
        title: 'Arma Callejera',
        defaultOptionId: 'garrote-pesado',
        options: [
          {
            id: 'garrote-pesado',
            name: 'Garrote Plomado (Bate Callejero)',
            description: 'Un trozo pesado de madera maciza para imponer respeto.',
            items: ['Garrote Plomado'],
            attacks: [
              {
                id: 'garrote-pugilista',
                name: 'Garrote Plomado',
                bonus: '+5',
                damage: '1d6 + 3',
                type: 'Contundente',
              },
            ],
          },
          {
            id: 'nudilleras-acero',
            name: 'Nudilleras Reforzadas de Bronce',
            description: 'Nudillos metálicos ajustados para romper mandíbulas en el cuadrilátero.',
            items: ['Nudilleras de Bronce'],
            attacks: [
              {
                id: 'nudillos-pugilista',
                name: 'Golpe con Nudillera',
                bonus: '+5',
                damage: '1d6 + 3',
                type: 'Contundente',
              },
            ],
          },
        ],
      },
    ],
  },

  artifice: {
    classId: 'artifice',
    className: 'Artífice (Artificer)',
    startingGold: 15,
    fixedEquipment: [
      'Herramientas de Ladrón (Thieves\' Tools)',
      'Herramientas de Artesano (Herrero o Cerrajería)',
      'Paquete de explorador de mazmorras',
    ],
    choiceGroups: [
      {
        id: 'weapons',
        title: 'Armamento Inicial',
        defaultOptionId: 'dos-armas-simples',
        options: [
          {
            id: 'dos-armas-simples',
            name: 'Martillo Ligero y Daga de Precisión',
            description: 'Herramientas de forja que doblan como armas de combate.',
            items: ['Martillo Ligero', 'Daga'],
            attacks: [
              {
                id: 'martillo-artifice',
                name: 'Martillo Ligero',
                bonus: '+4',
                damage: '1d4 + 2',
                type: 'Contundente (Arrojadizo)',
              },
            ],
          },
          {
            id: 'ballesta-ligera',
            name: 'Ballesta Ligera y 20 Virotes',
            description: 'Mecanismo de repetición calibrado para infundir con magia.',
            items: ['Ballesta Ligera', '20 Virotes'],
            attacks: [
              {
                id: 'ballesta-artifice',
                name: 'Ballesta Ligera',
                bonus: '+4',
                damage: '1d8 + 2',
                type: 'Perforante (Alcance 80/320)',
              },
            ],
          },
        ],
      },
      {
        id: 'armor',
        title: 'Armadura Inicial',
        defaultOptionId: 'tachonado',
        options: [
          {
            id: 'tachonado',
            name: 'Armadura de Cuero Tachonado',
            description: 'Armadura ligera con remaches metálicos (12 + Des).',
            items: ['Armadura de Cuero Tachonado'],
            armorAcBase: 12,
            armorType: 'light',
          },
          {
            id: 'cota-escamas',
            name: 'Cota de Escamas',
            description: 'Armadura media de placas imbricadas (14 + Des máx 2).',
            items: ['Cota de Escamas'],
            armorAcBase: 14,
            armorType: 'medium',
          },
        ],
      },
    ],
  },
};

export function getClassStartingEquipment(classId?: string): ClassStartingEquipment | null {
  if (!classId) return null;
  const key = classId.toLowerCase().trim();
  return CLASS_STARTING_EQUIPMENT[key] || CLASS_STARTING_EQUIPMENT['guerrero'];
}
