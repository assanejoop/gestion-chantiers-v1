import { expand, takeWhile, reduce, takeUntil } from 'rxjs/operators';
import { 
  Component, 
  OnInit, 
  OnDestroy, 
  ChangeDetectionStrategy, 
  inject,
  signal,
  computed,
  effect,
  Input
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  Subject, 
  Observable, 
  combineLatest, 
  merge,
  EMPTY,
  timer,
  of
} from 'rxjs';
import { 
  debounceTime, 
  distinctUntilChanged, 
  startWith, 
  switchMap, 
  catchError, 
  finalize, 
  map,
  tap,
  retry,
  timeout,
  shareReplay
} from 'rxjs/operators';

import { 
  RealestateService, 
  ProjectFilters, 
  PaginatedResponse 
} from '../../core/services/realestate.service';
import { environment } from '../../../environments/environment.prod';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { AuthService } from '../auth/services/auth.service';
import { log } from 'console';

// Types et interfaces
interface ProjectListState {
  projects: any[];
  loading: boolean;
  error: string | null;
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasMore: boolean;
}

interface PaginationInfo {
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasMore: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit, OnDestroy {
  [x: string]: any;
  imageName: any;
  currentImageIndex: number = 0;
  tabImagesApi: any[] = [];
  images: any[] = [];
  imageError = false;
  imageLoading = true;

  allProjects: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  
  // Injection de dépendances 
  private readonly router = inject(Router);
  public readonly realestateService = inject(RealestateService);
  private readonly fb = inject(FormBuilder);
  private apiImagesService = inject(RealestateService);
  private readonly authservice = inject(AuthService);
  
  // CORRECTION 1: Initialisation avec une valeur par défaut
  promoterId: number = 0;

  @Input() project: any;
  filebaseUrl = "https://wakana.online/repertoire_chantier/";

  // Configuration
  private readonly DEFAULT_PAGE_SIZE = 10;
  private readonly SEARCH_DEBOUNCE_TIME = 300;
  private readonly REQUEST_TIMEOUT = 15000;
  private readonly MAX_RETRIES = 2;

  // Signals 
  private readonly stateSignal = signal<ProjectListState>({
    projects: [],
    loading: false,
    error: null,
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: this.DEFAULT_PAGE_SIZE,
    hasMore: true
  });

  // Computed signals pour les vues
  readonly projects = computed(() => this.stateSignal().projects);
  readonly loading = computed(() => this.stateSignal().loading);
  readonly error = computed(() => this.stateSignal().error);
  readonly pagination = computed((): PaginationInfo => {
    const state = this.stateSignal();
    return {
      totalElements: state.totalElements,
      totalPages: state.totalPages,
      currentPage: state.currentPage,
      pageSize: state.pageSize,
      hasMore: state.hasMore
    };
  });

  // Formulaire et recherche
  readonly searchForm = this.fb.group({
    search: [''],
    status: ['all'],
    period: ['all']
  });

  // Subjects pour la gestion des événements
  private readonly searchSubject = new Subject<ProjectFilters>();
  private readonly pageChangeSubject = new Subject<number>();
  private readonly refreshSubject = new Subject<void>();
  private readonly destroy$ = new Subject<void>();

  // Options de configuration
  readonly pageSizeOptions = [5, 10, 20, 50] as const;

  constructor() {
    // Effect pour surveiller les changements d'état 
    effect(() => {
      const state = this.stateSignal();
      if (state.error) {
        console.error('Erreur dans ProjectsComponent:', state.error);
      }
    });

    this.setupFormSubscription();
    this.setupDataFlow();
  }

  isValidplan(url: string): boolean {
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/') || url.startsWith('assets/');
    } catch {
      return false;
    }
  }

  ngOnInit(): void {
    // CORRECTION 2: Modification de l'ordre d'exécution
    this.getPromoteurConnecter();
  }
  
  // CORRECTION 3: Amélioration de la méthode avec gestion d'erreur robuste
  getPromoteurConnecter(): void {
    this.updateState({ loading: true, error: null });
    
    this.authservice.getCurrentUser().pipe(
      timeout(this.REQUEST_TIMEOUT),
      retry(1),
      catchError(error => {
        console.error("Erreur lors de la récupération de l'utilisateur connecté:", error);
        this.updateState({ 
          loading: false, 
          error: "Impossible de récupérer les informations utilisateur" 
        });
        return EMPTY;
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        console.log("Utilisateur connecté:", response);
        if (response && response.id) {
          this.promoterId = response.id;
          console.log("ID utilisateur connecté:", this.promoterId);
          
          // CORRECTION 4: Charger les données après avoir obtenu l'ID
          this.loadInitialData();
          this.AfficherListeProjetByPrompter();
          this.loadAllProjectsAndUpdateState(this.promoterId);
        } else {
          this.updateState({ 
            loading: false, 
            error: "ID utilisateur non trouvé" 
          });
        }
      },
      error: (error) => {
        console.error("Erreur finale:", error);
        this.updateState({ 
          loading: false, 
          error: "Erreur lors de la connexion utilisateur" 
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ============ CONFIGURATION DES FLUX DE DONNÉES ============

  private setupFormSubscription(): void {
    this.searchForm.valueChanges
      .pipe(
        takeUntilDestroyed(),
        debounceTime(this.SEARCH_DEBOUNCE_TIME),
        distinctUntilChanged(),
        map(this.mapFormToFilters),
        tap(() => this.resetPagination())
      )
      .subscribe(filters => this.searchSubject.next(filters));
  }

  private setupDataFlow(): void {
    // Flux principal combinant recherche, pagination et rafraîchissement
    const dataFlow$ = merge(
      // Recherche initiale
      this.searchSubject.pipe(
        startWith(this.mapFormToFilters(this.searchForm.value)),
        map(filters => ({ filters, page: 0, isRefresh: false }))
      ),
      
      // Changement de page
      this.pageChangeSubject.pipe(
        map(page => ({ 
          filters: this.mapFormToFilters(this.searchForm.value), 
          page, 
          isRefresh: false 
        }))
      ),
      
      // Rafraîchissement
      this.refreshSubject.pipe(
        map(() => ({
          filters: this.mapFormToFilters(this.searchForm.value),
          page: 0,
          isRefresh: true
        }))
      )
    );

    dataFlow$
      .pipe(
        takeUntilDestroyed(),
        tap(() => this.updateState({ loading: true, error: null })),
        switchMap(({ filters, page, isRefresh }) => 
          this.loadProjectsWithRetry(filters, page, isRefresh)
        )
      )
      .subscribe();
  }

  // CORRECTION 5: Amélioration de la méthode avec vérification de l'ID
  AfficherListeProjetByPrompter(): void {
    if (!this.promoterId || this.promoterId <= 0) {
      
      console.warn("ID promoteur invalide:", this.promoterId);
      this.updateState({ 
        loading: false, 
        error: "ID promoteur invalide" 
      });
      return;
    }

    console.log("ID utilisateur avant envoi:", this.promoterId);
    
    this.realestateService.getlisteProjectsByPromoters(this.promoterId).pipe(
      timeout(this.REQUEST_TIMEOUT),
      retry(1),
      catchError(error => {
        console.error("Erreur lors de la récupération des projets:", error);
        let errorMessage = "Erreur lors de la récupération des projets";
        
        // CORRECTION 6: Gestion spécifique de l'erreur de parsing JSON
        if (error.error && typeof error.error === 'string' && error.error.includes('<!DOCTYPE')) {
          errorMessage = "Le serveur retourne du HTML au lieu de JSON. Vérifiez l'URL de l'API.";
        } else if (error.status === 0) {
          errorMessage = "Impossible de contacter le serveur. Vérifiez l'URL de l'API et la connexion.";
        } else if (error.status === 404) {
          errorMessage = "Endpoint non trouvé. Vérifiez l'URL de l'API.";
        }
        
        this.updateState({ 
          loading: false, 
          error: errorMessage 
        });
        return EMPTY;
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        console.log('Liste des projets récupérée:', response);
        // Traiter la réponse ici si nécessaire
        this.updateState({ loading: false });
      }
    });
  }

  // ============ CHARGEMENT DES DONNÉES ============

  private loadInitialData(): void {
    // CORRECTION 7: Vérifier que promoterId est défini avant de charger
    if (this.promoterId && this.promoterId > 0) {
      this.searchSubject.next(this.mapFormToFilters(this.searchForm.value));
    }
  }

  private loadProjectsWithRetry(
    filters: ProjectFilters, 
    page: number, 
    isRefresh: boolean = false
  ): Observable<void> {
    // CORRECTION 8: Vérification de l'ID avant l'appel API
    if (!this.promoterId || this.promoterId <= 0) {
      console.warn("Tentative de chargement avec ID promoteur invalide:", this.promoterId);
      return of(void 0);
    }

    return this.realestateService
      .getAllProjectsPaginated(this.promoterId, page, this.stateSignal().pageSize)
      .pipe(
        timeout(this.REQUEST_TIMEOUT),
        retry({
          count: this.MAX_RETRIES,
          delay: (error, retryCount) => {
            console.warn(`Tentative ${retryCount + 1}/${this.MAX_RETRIES + 1} échouée:`, error.message);
            return timer(1000 * Math.pow(2, retryCount));
          }
        }),
        map(response => this.processProjectsResponse(response, filters, page, isRefresh)),
        catchError(error => this.handleLoadError(error)),
        finalize(() => this.updateState({ loading: false })),
        shareReplay(1)
      );
  }

  // ============ LA MÉTHODE AVEC VALIDATION NULL SAFETY ============

  private processProjectsResponse(
    response: PaginatedResponse<any>,
    filters: ProjectFilters,
    page: number,
    isRefresh: boolean
  ): void {
    const filteredProjects = this.filterProjectsLocally(response.content || [], filters);
    const currentState = this.stateSignal();
    
    let updatedProjects: any[];
    
    if (page === 0 || isRefresh) {
      updatedProjects = filteredProjects;
    } else {
      updatedProjects = [...currentState.projects, ...filteredProjects];
    }

    // Validation avec valeurs par défaut pour éviter les erreurs TypeScript
    const totalElements = response.totalElements ?? 0;
    const totalPages = response.totalPages ?? 0;
    const hasMore = response.last !== undefined 
      ? !response.last 
      : (totalPages > 0 && page < totalPages - 1);

    this.updateState({
      projects: updatedProjects,
      totalElements,
      totalPages,
      currentPage: page,
      hasMore,
      loading: false,
      error: null
    });
  }

  private handleLoadError(error: any): Observable<void> {
    let errorMessage = 'Une erreur inattendue s\'est produite.';
    
    // CORRECTION 9: Amélioration de la détection d'erreur de parsing JSON
    if (error.error && typeof error.error === 'string' && error.error.includes('<!DOCTYPE')) {
      errorMessage = 'Le serveur retourne du HTML au lieu de JSON. Vérifiez la configuration de votre API.';
    } else if (error.name === 'TimeoutError') {
      errorMessage = 'Le serveur met trop de temps à répondre. Veuillez réessayer.';
    } else if (error.code === 'UND_ERR_CONNECT_TIMEOUT') {
      errorMessage = 'Impossible de contacter le serveur. Vérifiez votre connexion internet.';
    } else if (error.status === 0) {
      errorMessage = 'Problème de connectivité réseau. Vérifiez votre connexion et l\'URL de l\'API.';
    } else if (error.status >= 500) {
      errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
    } else if (error.status >= 400) {
      errorMessage = 'Erreur de requête. Veuillez vérifier les paramètres.';
    }

    console.error('Erreur détaillée:', error);
    
    this.updateState({
      loading: false,
      error: errorMessage
    });

    return EMPTY;
  }

  // ============ FILTRAGE ET TRANSFORMATION ============

  private mapFormToFilters = (formValue: any): ProjectFilters => ({
    search: formValue?.search?.trim() || undefined,
    status: formValue?.status !== 'all' ? formValue.status : undefined,
    period: formValue?.period !== 'all' ? formValue.period : undefined
  });

  private filterProjectsLocally(projects: any[], filters: ProjectFilters): any[] {
    if (!projects?.length) return [];

    return projects.filter(project => {
      if (filters.search && !this.matchesSearchTerm(project, filters.search)) {
        return false;
      }

      if (filters.status && !this.matchesStatus(project, filters.status)) {
        return false;
      }

      if (filters.period && !this.matchesPeriod(project, filters.period)) {
        return false;
      }

      return true;
    });
  }

  private matchesSearchTerm(project: any, searchTerm: string): boolean {
    const term = searchTerm.toLowerCase();
    return [
      project.title,
      project.location,
      project.address
    ].some(field => field?.toLowerCase().includes(term));
  }

  private matchesStatus(project: any, status: string): boolean {
    switch (status) {
      case 'active': return project.available;
      case 'inactive': return !project.available;
      case 'completed': return project.progress >= 100;
      case 'in-progress': return project.progress > 0 && project.progress < 100;
      default: return true;
    }
  }

  private matchesPeriod(project: any, period: string): boolean {
    const currentYear = new Date().getFullYear();
    const projectYear = this.extractYearFromDate(project.startDate);

    switch (period) {
      case 'current-year': return projectYear === currentYear;
      case 'last-year': return projectYear === currentYear - 1;
      case 'older': return projectYear < currentYear - 1;
      default: return true;
    }
  }

  private extractYearFromDate(dateString: string): number {
    try {
      const parts = dateString.split('.');
      if (parts.length === 3) {
        let year = parseInt(parts[2], 10);
        if (year < 50) year += 2000;
        else if (year < 100) year += 1900;
        return year;
      }
    } catch (error) {
      console.warn('Erreur extraction année:', dateString, error);
    }
    return new Date().getFullYear();
  }

  // ============ GESTION D'ÉTAT ============

  private updateState(partialState: Partial<ProjectListState>): void {
    this.stateSignal.update(currentState => ({
      ...currentState,
      ...partialState
    }));
  }

  private resetPagination(): void {
    this.updateState({
      currentPage: 0,
      projects: [],
      totalElements: 0,
      totalPages: 0,
      hasMore: true
    });
  }

  private getProgressValue(project: any): number {
    let progressValue = project?.averageProgress ?? project?.progress ?? 0;
    const numProgress = Number(progressValue);
    
    if (isNaN(numProgress)) {
      console.warn('Valeur de progression invalide:', progressValue, 'pour le projet:', project?.id);
      return 0;
    }
    
    return Math.max(0, Math.min(100, numProgress));
  }

  // ============ MÉTHODE POUR CHARGER TOUS LES PROJETS ============

  private loadAllProjects(promoterId: number): Observable<any[]> {
    const pageSize = 50;
    
    const loadPage = (page: number): Observable<any[]> => {
      return this.realestateService.getAllProjectsPaginated(promoterId, page, pageSize).pipe(
        switchMap(response => {
          if (response.last || response.content.length < pageSize) {
            return of(response.content);
          } else {
            return loadPage(page + 1).pipe(
              map(nextPageContent => response.content.concat(nextPageContent))
            );
          }
        })
      );
    };
    
    return loadPage(0);
  }

  // CORRECTION 10: Amélioration avec vérification de l'ID
  private loadAllProjectsAndUpdateState(promoterId: number): void {
    if (!promoterId || promoterId <= 0) {
      console.warn("ID promoteur invalide pour charger tous les projets:", promoterId);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.loadAllProjects(promoterId).pipe(
      tap(projects => console.log('Tous les projets chargés:', projects)),
      catchError(error => {
        console.error('Erreur lors du chargement de tous les projets:', error);
        this.errorMessage = 'Impossible de charger tous les projets.';
        return of([]);
      }),
      finalize(() => {
        this.isLoading = false;
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (projects: any[]) => {
        this.allProjects = projects;
        console.log('Nombre total de projets chargés:', this.allProjects.length);
      }
    });
  }

  // ============ MÉTHODES PUBLIQUES ============

  onSearch(): void {
    this.searchSubject.next(this.mapFormToFilters(this.searchForm.value));
  }

  onClearSearch(): void {
    this.searchForm.reset({
      search: '',
      status: 'all',
      period: 'all'
    });
  }

  onPageChange(page: number): void {
    this.pageChangeSubject.next(page);
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (!target?.value) return;

    const size = parseInt(target.value, 10);
    this.updateState({
      pageSize: size,
      currentPage: 0,
      projects: []
    });
    
    this.searchSubject.next(this.mapFormToFilters(this.searchForm.value));
  }

  onRefresh(): void {
    this.refreshSubject.next();
  }

  onProjectClick(project: any): void {
    if (project && project.id) {
      this.router.navigate(['/detailprojet', project.id]);
    }
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target) return;

    const threshold = 100;
    const atBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - threshold;
    const state = this.stateSignal();

    if (atBottom && !state.loading && state.hasMore) {
      this.onPageChange(state.currentPage + 1);
    }
  }

  onImageLoad(event: Event): void {
    console.log('Image chargée avec succès:', (event.target as HTMLImageElement).src);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/architecte.png'; // image fallback locale
  }

  // ============ MÉTHODES UTILITAIRES POUR LE TEMPLATE ============

  trackByProjectId = (index: number, project: any): number => project.id;

  getStatusClass(project: any): string {
    if (!project.available) return 'status-inactive';
    if (project.progress >= 100) return 'status-completed';
    if (project.progress > 0) return 'status-in-progress';
    return 'status-pending';
  }

  getProgressBarClass(progress: number): string {
    if (progress < 30) return 'progress-low';
    if (progress < 70) return 'progress-medium';
    return 'progress-high';
  }

  formatProgress = (progress: number): string => `${progress}%`;

  getGradientBackground = (progress: number): string => 
    'linear-gradient(90deg, #F39C12 0%, #FF5C02 100%)';

  safeGetValue = (value: any): any => value ?? null;
  
  isDefined = <T>(value: T | undefined | null): value is T => 
    value !== undefined && value !== null;
}