# ⚔️ MythWeaver: Forja de Héroes 5e

> **Creador y Gestor de Hojas de Personaje D&D 5e — 100% Client-Side, Gratuito, Sin Servidores y Sin Registro.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![D&D 5e SRD](https://img.shields.io/badge/D%26D_5e-SRD_5.1-crimson.svg)](#)
[![React 19](https://img.shields.io/badge/React-19.2-61dafb.svg)](#)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff.svg)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-38bdf8.svg)](#)

---

## 🌟 ¿Qué es MythWeaver Character Forge?

**MythWeaver Character Forge** es una aplicación web independiente de código abierto diseñada para crear, gestionar y jugar personajes de **D&D 5ª Edición**.

A diferencia de otras plataformas comerciales, **no requiere registro, no pide email, no almacena tus datos en servidores externos y no tiene límites de personajes**. Todo se ejecuta en el navegador del usuario y se almacena en su propio almacenamiento local (`localStorage`).

---

## ✨ Características Principales

### 🧙‍♂️ 1. Asistente Guiado de Creación (9 Pasos)
* **Paso 1: Identidad & Apariencia**: Nombre de héroe, nombre de jugador, selector de nivel (1-20), avatar con encuadre interactivo y **24 marcos de retrato de fantasía** (oro real, forja enana, calavera gótica, vacío eldritch, fuego, hielo, etc.), y compás de los 9 alineamientos morales.
* **Paso 2: Raza & Linaje**: Razas oficiales y subrazas con rasgos raciales completos, bonos de características flexibles y velocidad calculada.
* **Paso 3: Trasfondos Oficiales (99 Trasfondos con precisión Wikidot 1:1)**:
  * Equipamiento canónico exacto y riquezas iniciales en monedas de oro, plata y cobre (ej. *Haunted One* con 1 pp y baratija de horror; *Feylost* con 8 po, baratijas feéricas e idiomas feéricos restringidos).
  * Idiomas específicos filtrados (Común, Exótico, Ravnica o pools cerrados).
  * Tiradas interactivas de rasgos de personalidad, ideales, vínculos, defectos y baratijas oficiales d100.
* **Paso 4: Clase & Nivel**: Todas las clases del SRD con progresión por niveles, dados de golpe y selección de subclases en sus niveles correspondientes.
* **Paso 5: Puntuaciones de Característica**: 
  * Tirada interactiva de dados 4d6 descartando el menor (animación 3D de dados poliédricos).
  * Matriz estándar (15, 14, 13, 12, 10, 8).
  * Asignación manual / Point Buy.
* **Paso 6: Dotes & Mejoras de Característica**: Soporte para incrementos de característica (+2 o +1/+1) y dotes oficiales.
* **Paso 7: Conjuración & Grimorio**: Límites de trucos y conjuros preparados/conocidos calculados automáticamente según clase y nivel.
* **Paso 8: Inventario & Equipo**: Selección interactiva de paquetes de equipo inicial con equipamiento directo de armas y armaduras (con cálculo automático de CA).
* **Paso 9: Revisión Final & Forja**: Resumen completo y forja directa del héroe.

---

### 📜 2. Hoja de Personaje Interactiva Modular
* **Hoja en Vivo interactiva**: Con vial alquímico de puntos de golpe (PG), contador de CA con escudo de herrería, monedas de iniciativa y percepción pasiva.
* **Rastreador de Recursos**: Espacios de conjuros gastables con botones de descanso corto y descanso largo.
* **Tiradas Rápidas**: Ataques de armas con cálculo de bonos de impacto y daño automático.

---

### 📄 3. Exportación a Hoja Oficial Editable en PDF (3 Páginas)
* Exporta instantáneamente la ficha completa a la **Hoja Oficial de Personaje D&D 5e en formato PDF editable** (3 páginas completas con atributos, salvaciones, habilidades, armas, rasgos, conjuros, equipo e historial).
* 100% compatible con Adobe Acrobat, navegadores y visores estándar.

---

### 💾 4. Copia de Seguridad & Portabilidad
* **Exportar / Importar JSON**: Descarga tu personaje individual en `.json` o realiza un respaldo completo de todos tus personajes.
* **Importar desde PDF**: Lee e importa personajes desde hojas PDF oficiales previamente guardadas.

---

### 📖 5. Compendio Canónico 5e & Herramienta para Forjar Armas y Armaduras
* **Base de Datos Canónica**: Consulta clases 1-20, subclases, razas, los 99 trasfondos, grimorio oficial con filtros por escuela/clase/nivel, dotes, objetos mágicos, condiciones y reglas tácticas oficiales.
* **Herramienta para Forjar Armas & Armaduras**: Crea tus propias armas mágicas o equipo personalizado con categoría (simple/marcial), dados de daño, tipo de daño elemental, propiedades (*Sutil, Versátil, Pesada, Alcance, etc.*), bonos mágicos (+1, +2, +3) y descripción. Las armas creadas se guardan en tu navegador y quedan listas para inspeccionar en el compendio o equipar en tus fichas de personaje.

---

## 🚀 Inicio Rápido (Local)

Requisitos previos: [Node.js](https://nodejs.org/) (versión 18 o superior).

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/mythweaver-character-forge.git

# 2. Entrar al directorio
cd mythweaver-character-forge

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador para empezar a crear héroes.

---

## 🌐 Publicación Gratuita en Internet

Puedes alojar esta aplicación de forma **100% gratuita** en cualquier servicio de hosting estático:

### Opción A: Despliegue en Vercel (Recomendado - 1 Clic)
1. Sube este repositorio a tu cuenta de **GitHub**.
2. Entra en [Vercel.com](https://vercel.com) e inicia sesión con GitHub.
3. Haz clic en **"Add New Project"** y selecciona este repositorio.
4. Presiona **"Deploy"**. Vercel detectará Vite automáticamente y tu aplicación estará online con enlace seguro HTTPS en segundos.

### Opción B: Despliegue en GitHub Pages
1. En tu archivo `package.json`, añade el comando de deploy:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
2. Ejecuta `npm run build` y publica la carpeta `dist`.

---

## 🛠️ Tecnologías Utilizadas

* **React 19** + **TypeScript**
* **Vite 8**
* **Tailwind CSS 4**
* **Lucide React** (Iconografía de fantasía)
* **pdf-lib** (Generación client-side de PDFs oficiales)

---

## ⚖️ Licencia & Reconocimientos

* Este proyecto es software libre bajo licencia **MIT**.
* Compatible con el **System Reference Document 5.1 (SRD 5.1)** bajo la Open Game License (OGL) y Creative Commons de Wizards of the Coast.
* Datos y compatibilidad mecánica inspirados en el compendio de Wikidot D&D 5e.
