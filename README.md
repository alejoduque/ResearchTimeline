# Scattered Research Timeline -SRT-

This is a React application that provides a non-linear, interactive timeline visualization for a doctoral thesis.

## (English)

### Project Structure

This project is a React application built with Vite and TypeScript. The main goal is to provide a non-linear, interactive timeline visualization for a doctoral thesis.

The application is broken down into several components for better organization and maintainability:

*   `App.tsx`: The main component that holds the application's state and logic. It orchestrates the interaction between all other components.
*   `Controls.tsx`: The top bar containing filters, the "new task" input, and general action buttons like "Export" or "Randomize".
*   `Legend.tsx`: A simple component that displays the color-coded legend for the thesis chapters.
*   `TimelineCanvas.tsx`: The core interactive area where tasks and their connections are rendered using SVG. It handles all mouse events for dragging, connecting, and selecting tasks.
*   `TaskNode.tsx`: Represents a single task (a circle) within the `TimelineCanvas`.
*   `TaskDetailsModal.tsx`: A modal window that appears when a task is selected, allowing the user to view and edit details, add notes, and perform other task-specific actions.

### How to Run

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Run the development server:**
    ```bash
    npm run dev
    ```
3.  Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

---

## (Español)

### Estructura del Proyecto

Este proyecto es una aplicación de React construida con Vite y TypeScript. El objetivo principal es proporcionar una visualización de línea de tiempo interactiva y no lineal para una tesis doctoral.

La aplicación se divide en varios componentes para una mejor organización y mantenibilidad:

*   `App.tsx`: El componente principal que contiene el estado y la lógica de la aplicación. Orquesta la interacción entre todos los demás componentes.
*   `Controls.tsx`: La barra superior que contiene los filtros, el campo para añadir nuevas tareas y los botones de acción generales como "Exportar" o "Aleatorizar".
*   `Legend.tsx`: Un componente simple que muestra la leyenda codificada por colores para los capítulos de la tesis.
*   `TimelineCanvas.tsx`: El área interactiva principal donde se renderizan las tareas y sus conexiones usando SVG. Maneja todos los eventos del ratón para arrastrar, conectar y seleccionar tareas.
*   `TaskNode.tsx`: Representa una única tarea (un círculo) dentro del `TimelineCanvas`.
*   `TaskDetailsModal.tsx`: Una ventana modal que aparece cuando se selecciona una tarea, permitiendo al usuario ver y editar detalles, añadir notas y realizar otras acciones específicas de la tarea.

### Cómo Ejecutarlo

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```
2.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
3.  Abre tu navegador y navega a la URL proporcionada por Vite (normalmente `http://localhost:5173`).
