import { Component, computed, signal } from '@angular/core';

type ReactivityMode = 'signals' | 'zone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly title = 'Laboratorio Angular 19';
  readonly selectedExercise = signal(0);
  readonly reactivityMode = signal<ReactivityMode>('signals');
  readonly checkedRequirements = signal<string[]>([]);
  readonly selectedSource = signal('app.config.ts');
  readonly completedPhases = signal<number[]>([]);

  readonly exercises = [
    { id: '01', navTitle: 'Arquitectura por dominios', eyebrow: 'Ejercicio 01', title: 'Ordena el proyecto para que escale', description: 'Organiza CloudServices Hub por responsabilidades y localiza cada pieza antes de empezar a implementar.', tags: ['standalone', 'feature-based'] },
    { id: '02', navTitle: 'Reactividad de precisión', eyebrow: 'Ejercicio 02', title: 'Elige la reactividad que necesita la vista', description: 'Compara el alcance de Signals con el ciclo global de Zone.js en una lectura rápida de rendimiento.', tags: ['signals', 'computed', 'takeUntilDestroyed'] },
    { id: '03', navTitle: 'Reto CloudServices Hub', eyebrow: 'Ejercicio 03', title: 'Define una consola que resista producción', description: 'Revisa los cinco requisitos del proyecto integrador y marca los que ya puedes justificar en tu solución.', tags: ['guards', 'lazy loading', 'HttpClient'] },
    { id: '04', navTitle: 'Piezas de implementación', eyebrow: 'Ejercicio 04', title: 'Conecta configuración, rutas y servicios', description: 'Explora los fragmentos esenciales que convierten el diseño del reto en una aplicación Angular 19.', tags: ['routing', 'RxJS', 'forms'] },
    { id: '05', navTitle: 'Plan de desarrollo', eyebrow: 'Ejercicio 05', title: 'Construye, verifica y entrega', description: 'Sigue la ruta de seis fases para completar el proyecto final con una base técnica comprobable.', tags: ['roadmap', 'quality'] }
  ];

  readonly requirements = [
    { id: 'auth', title: 'Acceso protegido', detail: 'AuthService con signals y un functional guard que devuelva un UrlTree.' },
    { id: 'lazy', title: 'Vistas bajo demanda', detail: 'Rutas con loadComponent para entregar cada pantalla como un chunk independiente.' },
    { id: 'input', title: 'Detalle paramétrico', detail: 'El identificador :id llega al componente mediante withComponentInputBinding().' },
    { id: 'api', title: 'API tolerante a fallos', detail: 'HttpClient con retry(2) y catchError para proteger la lectura de telemetría.' },
    { id: 'form', title: 'Alta con reglas reales', detail: 'Formulario reactivo que impide usar el prefijo prod- dentro de desarrollo.' }
  ];

  readonly sourceFiles = [
    { id: 'app.config.ts', label: 'app.config.ts', purpose: 'Proveedores globales', code: `provideRouter(appRoutes, withComponentInputBinding()),\nprovideHttpClient()` },
    { id: 'app.routes.ts', label: 'app.routes.ts', purpose: 'Navegación protegida', code: `{\n  path: 'dashboard',\n  loadComponent: () => import('./features/dashboard/dashboard.component')\n    .then(m => m.DashboardComponent),\n  canActivate: [authGuard]\n}` },
    { id: 'telemetry.service.ts', label: 'telemetry.service.ts', purpose: 'Datos y resiliencia', code: `return this.http.get<Microservicio[]>(this.apiUrl).pipe(\n  retry(2),\n  catchError(this.handleError)\n);` },
    { id: 'form.component.ts', label: 'form.component.ts', purpose: 'Validación de negocio', code: `if (entorno === 'desarrollo' && nombre.startsWith('prod-')) {\n  return { prefijoReservado: true };\n}` }
  ];

  readonly phases = [
    { id: 1, title: 'Inicializa', detail: 'Configura SCSS, routing estricto y proveedores globales.' },
    { id: 2, title: 'Modela', detail: 'Define Microservicio, TelemetryService y AuthService.' },
    { id: 3, title: 'Protege', detail: 'Añade guard funcional, redirección y rutas diferidas.' },
    { id: 4, title: 'Construye', detail: 'Resuelve acceso, dashboard y métricas computadas.' },
    { id: 5, title: 'Captura', detail: 'Implementa formulario reactivo y detalle con parámetro.' },
    { id: 6, title: 'Verifica', detail: 'Prueba el bloqueo, los chunks y la compilación final.' }
  ];

  readonly activeExercise = computed(() => this.exercises[this.selectedExercise()]);
  readonly activeSource = computed(() => this.sourceFiles.find((source) => source.id === this.selectedSource()) ?? this.sourceFiles[0]);
  readonly checkedRequirementCount = computed(() => this.checkedRequirements().length);
  readonly completedPhaseCount = computed(() => this.completedPhases().length);
  readonly reactivityComplexity = computed(() => this.reactivityMode() === 'signals' ? 'O(k)' : 'O(N)');
  readonly reactivityScope = computed(() => this.reactivityMode() === 'signals' ? 'Solo los nodos dependientes' : 'El árbol de componentes');

  selectExercise(index: number): void { this.selectedExercise.set(index); }
  setReactivityMode(mode: ReactivityMode): void { this.reactivityMode.set(mode); }
  selectSource(id: string): void { this.selectedSource.set(id); }

  toggleRequirement(id: string): void {
    this.checkedRequirements.update((checked) => checked.includes(id) ? checked.filter((item) => item !== id) : [...checked, id]);
  }

  togglePhase(id: number): void {
    this.completedPhases.update((completed) => completed.includes(id) ? completed.filter((item) => item !== id) : [...completed, id]);
  }

  isRequirementChecked(id: string): boolean { return this.checkedRequirements().includes(id); }
  isPhaseComplete(id: number): boolean { return this.completedPhases().includes(id); }
}
