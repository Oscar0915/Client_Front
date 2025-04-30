# AlianzaFrontend

**AlianzaFrontend** es una aplicación web desarrollada en Angular que permite la **consulta y gestión de clientes**. Está conectada a un backend desarrollado en **Spring**, y se comunica mediante servicios configurados en los archivos `environment`.

---

## 🧩 Estructura del Proyecto

- **Componentes y Páginas**: La aplicación está organizada en componentes reutilizables y páginas que encapsulan vistas completas.
- **Core**: Contiene los servicios, modelos y lógica compartida.
- **Estilos**: Cada componente gestiona sus propios estilos de forma aislada usando SCSS implementando Angular Material.
- **Responsive**: La aplicación está optimizada para múltiples tamaños de pantalla (desktop, tablet y móvil).

---

## 🚀 Inicio Rápido

### 🔧 Requisitos

- Node.js version 22.8.0 (se encuentra definida en el archivo .nvmrc)
- Angular CLI (`npm install -g @angular/cli`)
- Backend en Spring configurado y corriendo.

### 🔁 Clonar el repositorio

```bash
git clone https://UrlRepositorioEnGIt/alianza-frontend.git
cd alianza-frontend
npm install
```

---

## 🌐 Servidor de Desarrollo

Ejecuta el servidor de desarrollo con:

```bash
ng serve
```

Navega a `http://localhost:4200/`. La app se recargará automáticamente si editas los archivos fuente.

---

## 🏗️ Build

Para generar la versión de producción:

```bash
ng build
```

Los archivos generados se encontrarán en el directorio `dist/`.

---

## ✅ Pruebas Unitarias

```bash
ng test
```

Ejecuta las pruebas unitarias con [Karma](https://karma-runner.github.io).

---

## 🔍 Pruebas End-to-End

```bash
ng e2e
```

Para esto debes instalar una plataforma de testing compatible (como Cypress o Protractor).

---

## ⚙️ Configuración de Entorno

La conexión al backend Spring está definida en el archivo:

```
src/environments/environment.ts
```

Modifica la URL base según el entorno (`dev`, `prod`, etc.).

---

## 📚 Más Ayuda

Consulta la [documentación oficial de Angular CLI](https://angular.dev/tools/cli) o ejecuta:

```bash
ng help
```