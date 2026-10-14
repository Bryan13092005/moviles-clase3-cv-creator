---
name: tuti-ui-ux
description: "Guía UI/UX e Identidad Visual de Almacenes TuTi para la aplicación CV Creator (Expo/React Native). Aplicar cuando el usuario pida diseñar, rediseñar, aplicar temas o refactorizar pantallas/componentes visuales."
---

# 🎨 Skill UI/UX: Identidad Corporativa Almacenes TuTi para CV Creator

Esta Skill proporciona las directrices oficiales de diseño e implementación UI/UX basadas en la identidad de marca de **Almacenes TuTi** (Hard Discount: accesible, claro, funcional y dinámico)[cite: 1] aplicadas a la arquitectura de pantallas de la aplicación móvil de creación de CV (`cv-creator-app`) en Expo y React Native.

---

## 1. Sistema de Diseño & Tokens de Tema (`src/constants/theme.ts`)

Define y reutiliza la siguiente paleta cromática y tipográfica en `src/constants/theme.ts`[cite: 2]:

### Paleta Cromática Principal
- **Azul Corporativo (Azul Rey)**: `#0B13A5`[cite: 1]
  - *Uso*: Modals, barras de navegación principales (`_layout.tsx`), headers de tarjetas importantes y botones primarios[cite: 1].
- **Amarillo Promocional (Amarillo Vibrante)**: `#FFF000`[cite: 1]
  - *Uso*: Botones de acento/destacados, bordes y filetes de contenedor, franjas de notificación/completado[cite: 1].
- **Blanco Puro**: `#FFFFFF`[cite: 1]
  - *Uso*: Fondo de contenedores principales, inputs, tarjetas de información[cite: 1].
- **Gris de Fondo / Neutro**: `#F4F5F8`
  - *Uso*: Fondo general de la aplicación (`container background`)[cite: 2].
- **Verde de Confirmación**: `#22C55E`
  - *Uso*: Indicadores de estado de sección "Completado" y acciones de éxito/preview[cite: 2].
- **Rojo de Eliminación**: `#DC2626`
  - *Uso*: Botones de eliminación y estados de error[cite: 2].

### Tipografía & Estilos de Texto
- **Titulares / Títulos de Marca**:
  - *Familia*: Sans-serif Geométrica (Palo Seco) Extra Bold / Heavy[cite: 1].
  - *Estilo de letras*: Trazo uniforme de alto grosor[cite: 1].
- **Subtítulos y Enlaces de Acento**:
  - *Familia*: Sans-serif Condensada Bold / Italic[cite: 1].
  - *Color por defecto*: `#0B13A5` (Azul Corporativo)[cite: 1].

---

## 2. Componentes UI Reutilizables y Reglas Directas de Diseño

### A. Botones Primarios y Contenedores Píldora (*Pill / Capsule Shape*)
Siguiendo la forma icónica del contenedor del logotipo de TuTi[cite: 1]:
- **Radio de Borde**: `borderRadius: 24` o `borderRadius: 9999` (Pill/Capsule Shape)[cite: 1].
- **Estructura de Borde Interno**:
  - Fondo: `#0B13A5` (Azul Rey)[cite: 1].
  - Borde/Filete Interno: `borderWidth: 2`, `borderColor: "#FFF000"` (Amarillo Vibrante)[cite: 1].
- **Texto**: Color `#FFFFFF` (Blanco)[cite: 1] o `#FFF000` (Amarillo)[cite: 1], peso `bold`, alineación centrada.

### B. División Horizontal Tripartita (Headers y Tarjetas)
Inspirado en la arquitectura visual y fachadas TuTi[cite: 1]:
1. **Superior (Nivel Blanco)**: Proporciona aire visual y alberga el título de la sección[cite: 1].
2. **Medio (Franja de Acento Amarillo `#FFF000`)**: Alto de `4px` a `6px` como divisor integrador visual[cite: 1].
3. **Inferior (Base Azul Rey `#0B13A5`)**: Base visual sólida para acciones principales y navegación inferior[cite: 1].

### C. Campos de Entrada (`src/components/InputField.tsx`)
- Fondo: `#FFFFFF`[cite: 1].
- Borde por defecto: `1px solid #E2E8F0`.
- Borde en Foco: `2px solid #0B13A5` (Azul Corporativo)[cite: 1].
- Etiqueta (`Label`): Color `#0B13A5`[cite: 1], peso `700` (`fontWeight: "bold"`).

---

## 3. Guía de Rediseño por Pantalla (`src/app/`)

### 1. Pantalla Principal / Dashboard (`src/app/index.tsx`)
- **Header**: Banner estilo píldora con fondo Azul Rey (`#0B13A5`), borde Amarillo (`#FFF000`) y título "Tu CV Profesional".
- **Tarjetas de Sección (Información Personal, Experiencia, Educación)**:
  - Fondo blanco con borde superior/izquierdo en Amarillo Vibrante (`#FFF000`) o Azul Corporativo (`#0B13A5`)[cite: 1].
  - Badge de Estado: Verde con check (`✓ Completado`) o Amarillo (`Pendiente`)[cite: 2].
  - Botones de Edición: Estilo Píldora Azul Rey[cite: 1].
- **Botón de Vista Previa**: Botón destacado en Verde o Amarillo Vibrante con texto en Azul Rey para máxima accesibilidad y contraste[cite: 1, 2].

### 2. Formulario de Información Personal (`src/app/personal-info.tsx`)
- Encabezado con franja integradora Amarilla (`#FFF000`)[cite: 1].
- Contenedores de formulario organizados dentro de tarjetas blancas con sombras suaves (`elevation: 2`)[cite: 2].
- Botones de acción:
  - **Guardar**: Estilo Píldora TuTi (`#0B13A5` con borde `#FFF000`)[cite: 1].
  - **Cancelar**: Variante secundaria transparente con borde Azul Rey[cite: 2].

### 3. Formulario de Experiencia Laboral (`src/app/experience.tsx`)
- Mantener la integración con `KeyboardAwareScrollView` y `DateTimePicker`[cite: 2].
- Tarjetas de experiencias agregadas:
  - Fondo blanco, borde lateral izquierdo de `4px` en Azul Rey (`#0B13A5`)[cite: 1].
  - Botón de eliminar (`✕`): Píldora circular en Rojo (`#DC2626`)[cite: 2].

### 4. Formulario de Educación (`src/app/education.tsx`)
- Mismo patrón visual que la vista de experiencia para garantizar consistencia UI[cite: 2].
- Mantenimiento de listas dinámicas con tarjetas con bordes redondeados y contraste tipográfico claro[cite: 1, 2].

### 5. Vista Previa / CV Preview (`src/app/preview.tsx` y `src/components/CVPreview.tsx`)
- **Header del CV**:
  - Banda superior de encabezado en Azul Rey (`#0B13A5`) con el nombre completo en letras resaltadas en Blanco/Amarillo[cite: 1, 2].
- **Títulos de Sección del CV** ("RESUMEN PROFESIONAL", "EXPERIENCIA LABORAL", "EDUCACIÓN")[cite: 2]:
  - Letras en minúscula/mayúscula con el tono Azul Rey (`#0B13A5`) y una línea decorativa inferior en Amarillo Vibrante (`#FFF000`)[cite: 1, 2].

---

## 4. Instrucciones para la Generación de Código

Cuando implementes o modifiques código en este proyecto:
1. Utiliza `StyleSheet.create` de React Native y refiérete siempre a los colores definidos en la paleta oficial (`#0B13A5`, `#FFF000`, `#FFFFFF`)[cite: 1].
2. Aplica `borderRadius: 20` o mayor en los botones para reflejar el estilo *Capsule/Pill Shape* de la marca TuTi[cite: 1].
3. Asegura el cumplimiento con las guías de Expo Router (`src/app/_layout.tsx`) actualizando la propiedad `headerStyle` con `backgroundColor: "#0B13A5"` y `headerTintColor: "#FFF000"`[cite: 1, 2].