import React, { useState, useMemo, useEffect } from 'react';
import { OFFICIAL_5E_MAGIC_ITEMS } from '../data/magicItemsData';
import { EquipmentBadge } from './EquipmentBadge';
import { X, Search, Plus, Package, Sparkles, Wrench, Compass } from 'lucide-react';

export interface GearCatalogEntry {
  id: string;
  name: string;
  category: 'gear' | 'ammo_focus' | 'tools' | 'magic';
  cost?: string;
  weight?: string;
  rarity?: string;
  description: string;
}

const STANDARD_5E_GEAR: GearCatalogEntry[] = [
  // Equipo de Aventurero & Supervivencia
  { id: 'mochila', name: 'Mochila de Aventurero', category: 'gear', cost: '2 po', weight: '5 lb', description: 'Mochila de cuero resistente con correas para transportar provisiones y equipo.' },
  { id: 'antorcha', name: 'Antorcha (x5)', category: 'gear', cost: '5 pc', weight: '5 lb', description: 'Ilumina luz brillante en un radio de 20 pies y luz tenue otros 20 pies adicionales durante 1 hora.' },
  { id: 'cuerda-canamo', name: 'Cuerda de cáñamo (50 pies)', category: 'gear', cost: '1 po', weight: '10 lb', description: 'Cuerda gruesa de 50 pies (15 m) con 2 PG y CD 17 para romperse.' },
  { id: 'cuerda-seda', name: 'Cuerda de seda (50 pies)', category: 'gear', cost: '10 po', weight: '5 lb', description: 'Cuerda ligera y resistente de 50 pies con 2 PG y CD 17 para romperse.' },
  { id: 'raciones', name: 'Raciones de viaje (5 días)', category: 'gear', cost: '2 po 5 pp', weight: '10 lb', description: 'Alimentos secos, cecina, frutos secos y galletas para viajes prolongados.' },
  { id: 'odre', name: 'Odre con agua', category: 'gear', cost: '2 pp', weight: '5 lb', description: 'Recipiente de cuero con capacidad para 4 pintas de líquido.' },
  { id: 'yesquero', name: 'Yesquero y pedernal', category: 'gear', cost: '5 pp', weight: '1 lb', description: 'Pequeña caja con pedernal, eslabón y yesca para encender fuego (1 acción).' },
  { id: 'saco-dormir', name: 'Saco de dormir', category: 'gear', cost: '1 po', weight: '7 lb', description: 'Manta acolchada enrollable para descansar al aire libre o en mazmorras.' },
  { id: 'linterna-sorda', name: 'Linterna sorda', category: 'gear', cost: '10 po', weight: '2 lb', description: 'Proyecta luz brillante en un cono de 60 pies y tenue otros 60 pies (quema 1 frasco de aceite en 6 horas).' },
  { id: 'frasco-aceite', name: 'Frasco de aceite', category: 'gear', cost: '1 pp', weight: '1 lb', description: 'Combustible para linternas o arma improvisada incendiaria (+5 daño de fuego si arde).' },
  { id: 'agua-bendita', name: 'Agua bendita (frasco)', category: 'gear', cost: '25 po', weight: '1 lb', description: 'Inflige 2d6 de daño radiante al lanzarse contra infernales o no-muertos.' },
  { id: 'palanca', name: 'Palanca de hierro', category: 'gear', cost: '2 po', weight: '5 lb', description: 'Otorga ventaja a pruebas de Fuerza donde el apalancamiento resulte útil.' },
  { id: 'garfio', name: 'Garfio de escalada', category: 'gear', cost: '2 po', weight: '4 lb', description: 'Gancho metálico de cuatro puntas para asegurar cuerdas en muros o cornisas.' },
  { id: 'esposas', name: 'Esposas de hierro', category: 'gear', cost: '2 po', weight: '6 lb', description: 'Grilletes ajustables para criaturas Medianas o Pequeñas (CD 20 para escapar o forzar).' },
  { id: 'espejo-acero', name: 'Espejo de acero', category: 'gear', cost: '5 po', weight: '0.5 lb', description: 'Pequeño espejo pulido útil para asomarse tras esquinas.' },
  { id: 'tunica', name: 'Túnica de viajero / erudito', category: 'gear', cost: '1 po', weight: '4 lb', description: 'Vestimenta tradicional para lanzadores de conjuros o viajeros.' },
  { id: 'tienda-campana', name: 'Tienda de campaña (2 personas)', category: 'gear', cost: '2 po', weight: '20 lb', description: 'Refugio portátil de lona impermeable con capacidad para dos criaturas Medianas.' },
  { id: 'paquete-explorador', name: 'Paquete de Explorador', category: 'gear', cost: '10 po', weight: '59 lb', description: 'Incluye mochila, saco de dormir, útiles de cocina, yesquero, 10 antorchas, 10 raciones, odre y 50 pies de cuerda.' },
  { id: 'paquete-mazmorras', name: 'Paquete de Explorador de Mazmorras', category: 'gear', cost: '12 po', weight: '61 lb', description: 'Incluye mochila, palanca, martillo, 10 pitones, 10 antorchas, yesquero, 10 raciones, odre y 50 pies de cuerda.' },
  { id: 'paquete-sacerdote', name: 'Paquete de Sacerdote', category: 'gear', cost: '19 po', weight: '24 lb', description: 'Incluye mochila, manta, 10 velas, yesquero, caja de limosnas, incienso, incensario, vestiduras, 2 raciones y odre.' },
  { id: 'paquete-erudito', name: 'Paquete de Erudito', category: 'gear', cost: '40 po', weight: '10 lb', description: 'Incluye mochila, libro de saberes, tintero, pluma, 10 hojas de pergamino, bolsita de arena y cuchillo pequeño.' },

  // Munición y Focos Mágicos
  { id: 'flechas-20', name: 'Carcaj con 20 Flechas', category: 'ammo_focus', cost: '1 po', weight: '1 lb', description: 'Munición estándar para arcos cortos y arcos largos.' },
  { id: 'virotes-20', name: 'Estuche con 20 Virotes', category: 'ammo_focus', cost: '1 po', weight: '1.5 lb', description: 'Munición para ballestas ligeras, pesadas y de mano.' },
  { id: 'balas-honda-20', name: '20 Balas de Honda', category: 'ammo_focus', cost: '4 pc', weight: '1.5 lb', description: 'Proyectiles esféricos de plomo para usar con honda.' },
  { id: 'simbolo-sagrado', name: 'Símbolo Sagrado (Amuleto / Relicario)', category: 'ammo_focus', cost: '5 po', weight: '1 lb', description: 'Foco de lanzamiento de conjuros para Clérigos y Paladines.' },
  { id: 'foco-arcano-cristal', name: 'Foco Arcano (Cristal / Orbe)', category: 'ammo_focus', cost: '10 po', weight: '1 lb', description: 'Foco de lanzamiento de conjuros para Magos, Hechiceros y Brujos.' },
  { id: 'foco-arcano-baston', name: 'Foco Arcano (Bastón)', category: 'ammo_focus', cost: '5 po', weight: '4 lb', description: 'Bastón tallado para canalizar magia arcana (también usable como bordón).' },
  { id: 'foco-druidico', name: 'Foco Druídico (Ramita de Muérdago / Tótem)', category: 'ammo_focus', cost: '1 po', weight: '0 lb', description: 'Foco natural de lanzamiento de conjuros para Druidas y Exploradores (5.5e).' },
  { id: 'bolsa-componentes', name: 'Bolsa de Componentes', category: 'ammo_focus', cost: '25 po', weight: '2 lb', description: 'Bolsa de cuero estanca con compartimentos para todos los componentes materiales sin coste.' },
  { id: 'grimorio', name: 'Libro de Conjuros (Grimorio)', category: 'ammo_focus', cost: '50 po', weight: '3 lb', description: 'Tomo encuadernado en cuero con 100 páginas de vitela para registrar conjuros arcanos.' },

  // Herramientas y Kits
  { id: 'kit-sanador', name: 'Kit de Sanador (10 usos)', category: 'tools', cost: '5 po', weight: '3 lb', description: 'Vendas y ungüentos para estabilizar a una criatura con 0 PG sin prueba de Medicina.' },
  { id: 'herramientas-ladron', name: 'Herramientas de Ladrón', category: 'tools', cost: '25 po', weight: '1 lb', description: 'Ganzúas, lima, espejo pequeño y tenazas para abrir cerraduras y desactivar trampas.' },
  { id: 'kit-herboristeria', name: 'Kit de Herboristería', category: 'tools', cost: '5 po', weight: '3 lb', description: 'Mortero, frascos y bolsas para identificar plantas y elaborar pociones de curación.' },
  { id: 'suministros-alquimista', name: 'Suministros de Alquimista', category: 'tools', cost: '50 po', weight: '8 lb', description: 'Alambique, probetas y reactivos para elaborar ácido, fuego de alquimista o pociones.' },
  { id: 'herramientas-herrero', name: 'Herramientas de Herrero', category: 'tools', cost: '20 po', weight: '8 lb', description: 'Martillos, tenazas y limas para forjar y reparar armas y armaduras metálicas.' },
  { id: 'herramientas-manitas', name: 'Herramientas de Manitas', category: 'tools', cost: '50 po', weight: '10 lb', description: 'Destornilladores, resortes y soldador para reparar mecanismos complejos y objetos.' },
  { id: 'kit-disfraz', name: 'Kit de Disfraz', category: 'tools', cost: '25 po', weight: '3 lb', description: 'Cosméticos, tintes y vestimentas para alterar la apariencia física.' },
  { id: 'instrumento-musical', name: 'Instrumento Musical (Laúd / Flauta)', category: 'tools', cost: '35 po', weight: '2 lb', description: 'Foco arcano para Bardos o herramienta artística de interpretación.' },
  { id: 'antitoxina', name: 'Antitoxina (vial)', category: 'tools', cost: '50 po', weight: '0 lb', description: 'Otorga ventaja en tiradas de salvación contra veneno durante 1 hora.' },
];

const MAGIC_GEAR_ENTRIES: GearCatalogEntry[] = OFFICIAL_5E_MAGIC_ITEMS.map((item) => ({
  id: item.id,
  name: item.name,
  category: 'magic',
  rarity: item.rarity,
  description: item.summary || item.description,
}));

const ALL_GEAR_CATALOG: GearCatalogEntry[] = [...STANDARD_5E_GEAR, ...MAGIC_GEAR_ENTRIES];

interface GearPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGear: (itemName: string) => void;
  title?: string;
  subtitle?: string;
}

export const GearPickerModal: React.FC<GearPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectGear,
  title = 'Equipo de Aventurero & Objetos',
  subtitle = 'Busca equipo estándar, kits, munición, objetos mágicos o añade uno personalizado.',
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'gear' | 'ammo_focus' | 'tools' | 'magic'>('all');
  const [customInput, setCustomInput] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredItems = useMemo(() => {
    return ALL_GEAR_CATALOG.filter((item) => {
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          (item.rarity && item.rarity.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [search, categoryFilter]);

  if (!isOpen) return null;

  const handleAddCustomFromModal = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    onSelectGear(trimmed);
    setCustomInput('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[105] bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#f5ebd7] border-2 border-[#b88c32] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-[#2c221a]">
        {/* Header */}
        <div className="bg-[#23190f] text-[#f5ebd7] px-5 py-3.5 border-b-2 border-[#8c672b] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#8c672b]/25 border border-[#b88c32] flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-[#ffd56b]" />
            </div>
            <div className="min-w-0">
              <h3 className="font-fantasy font-bold text-base sm:text-lg text-[#ffd56b] truncate">
                {title}
              </h3>
              <p className="text-[11px] text-[#cbb695] truncate">{subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#382717] hover:bg-[#523922] text-[#e6cfab] transition cursor-pointer shrink-0"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Custom Item Bar + Search + Categories */}
        <div className="p-3.5 sm:p-4 bg-[#efe3cb] border-b border-[#d4be98] space-y-2.5">
          {/* Custom Quick Add */}
          <div className="flex items-center gap-2 bg-[#fcf6ea] p-2 rounded-xl border border-[#b89b6a]">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustomFromModal()}
              placeholder="O escribe aquí un objeto personalizado (ej: Carta sellada, Amuleto antiguo...)"
              className="flex-1 bg-transparent px-2 py-1 text-xs text-[#2c221a] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddCustomFromModal}
              disabled={!customInput.trim()}
              className="px-3 py-1.5 bg-[#8c672b] hover:bg-[#73521e] disabled:opacity-40 text-white rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" /> Añadir Objeto
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8c672b] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar en el catálogo (poción, cuerda, flechas, kit, bolsa...)"
                className="w-full bg-[#fcf6ea] border border-[#b89b6a] rounded-xl pl-9 pr-3 py-2 text-xs text-[#2c221a] focus:outline-none focus:border-[#8c672b]"
              />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: 'Todos', icon: <Package className="w-3 h-3" /> },
                { id: 'gear', label: 'Aventurero', icon: <Compass className="w-3 h-3" /> },
                { id: 'ammo_focus', label: 'Munición/Focos', icon: <Sparkles className="w-3 h-3" /> },
                { id: 'tools', label: 'Kits/Herramientas', icon: <Wrench className="w-3 h-3" /> },
                { id: 'magic', label: 'Mágicos/Pociones', icon: <Sparkles className="w-3 h-3" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategoryFilter(tab.id as any)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer border ${
                    categoryFilter === tab.id
                      ? 'bg-[#8c672b] text-white border-[#6e4f1d]'
                      : 'bg-[#fcf6ea] text-[#5e4b37] border-[#cbb28c] hover:bg-[#f4e8d1]'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {filteredItems.length === 0 ? (
            <div className="col-span-full py-10 text-center text-sm text-[#786450]">
              No se encontraron objetos que coincidan con "{search}". Puedes añadirlo como objeto personalizado arriba.
            </div>
          ) : (
            filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectGear(item.name);
                  onClose();
                }}
                className="text-left p-3 rounded-xl bg-[#fcf6ea] hover:bg-[#faeed8] border border-[#cbb28c] hover:border-[#8c672b] transition flex items-start justify-between gap-2.5 group cursor-pointer shadow-2xs"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <EquipmentBadge name={item.name} size="md" />
                  <div className="min-w-0">
                    <div className="font-fantasy font-bold text-xs sm:text-sm text-[#2c221a] group-hover:text-[#8c672b] transition truncate">
                      {item.name}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                      {item.cost && (
                        <span className="text-[9.5px] bg-[#ede1ce] text-[#6b4f1d] px-1.5 py-0.5 rounded font-mono font-bold">
                          {item.cost}
                        </span>
                      )}
                      {item.weight && (
                        <span className="text-[9.5px] bg-[#ede1ce] text-[#5e4b37] px-1.5 py-0.5 rounded font-mono">
                          {item.weight}
                        </span>
                      )}
                      {item.rarity && (
                        <span className="text-[9.5px] bg-[#e5d8f4] text-[#5b21b6] px-1.5 py-0.5 rounded font-bold border border-[#c4b5fd]">
                          {item.rarity}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#5e4b37] mt-1 line-clamp-2 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-md bg-[#8c672b] text-white text-[10px] font-fantasy font-bold shrink-0 opacity-85 group-hover:opacity-100 flex items-center gap-0.5">
                  <Plus className="w-3 h-3" /> Añadir
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
