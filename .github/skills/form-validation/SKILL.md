---
name: form-validation
description: "Guía y directrices para la validación de campos de formularios en tiempo real en la aplicación CV Creator (Expo/React Native). Aplicar cuando el usuario pida agregar, ajustar o implementar validaciones de datos en formularios."
---

# 🛡️ Skill: Validación de Formularios en Tiempo Real (CV Creator)

Esta Skill define las reglas y patrones de validación que deben aplicarse a todos los componentes de formulario (`src/app/personal-info.tsx`, `src/app/experience.tsx`, `src/app/education.tsx`)[cite: 2].

---

## 1. Reglas de Validación por Campo

### A. Información Personal (`personal-info.tsx`)
- **Nombre Completo (`fullName`)**:
  - *Regla*: Solo letras (incluye espacios, acentos y `ñ`/`Ñ`).
  - *Regex*: `/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/`
  - *Error*: `"El nombre solo debe contener letras."`
- **Correo Electrónico (`email`)**:
  - *Regla*: Formato válido de email (ej: `usuario@dominio.com`).
  - *Regex*: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
  - *Error*: `"Ingresa un correo electrónico válido."`
- **Teléfono (`phone`)**:
  - *Regla*: Solo números y longitud exacta de 10 dígitos (ej: `0999999999`).
  - *Regex*: `/^\d{10}$/`
  - *Error*: `"El teléfono debe tener exactamente 10 dígitos."`
- **Ubicación (`location`)**:
  - *Regla*: Texto alfanumérico opcional.
- **Resumen Profesional (`summary`)**:
  - *Regla*: Texto alfanumérico opcional.
- **Habilidades Blandas (`hBlandas`)**:
  - *Regla*: Texto alfanumérico opcional.

---

### B. Experiencia Laboral (`experience.tsx`)
- **Empresa y Cargo (`company`, `position`)**:
  - *Regla*: No vacíos, permiten letras, números y caracteres de puntuación básicos.
- **Fechas (`startDate`, `endDate`)**:
  - *Regla*: `startDate` es obligatoria.
  - *Validación Temporal*: Si `endDate` está definida, la fecha de fin **debe ser posterior o igual** a la fecha de inicio.
  - *Mensaje de Error*: `"La fecha de fin no puede ser anterior a la fecha de inicio."`

---

### C. Educación (`education.tsx`)
- **Institución y Título (`institution`, `degree`)**:
  - *Regla*: No vacíos.
- **Año de Graduación (`graduationYear`)**:
  - *Regla*: Solo números, exactamente 4 dígitos (entre 1950 y el año actual + 5).
  - *Regex*: `/^(19[5-9]\d|20[0-2]\d)$/`
  - *Error*: `"Ingresa un año válido de 4 dígitos."`

---

## 2. Patrón de Implementación en React Native

### Estructura de Estado de Errores

Cada pantalla con formulario debe mantener un objeto de estado `errors` alineado con `formData`:

```tsx
const [errors, setErrors] = useState<Record<string, string>>({});