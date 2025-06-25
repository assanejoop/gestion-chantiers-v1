import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { load } from 'cheerio';
import { catchError, retry, timeout, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

// Interface pour les critères de recherche
export interface ProjectSearchCriteria {
  promoterId: number;
  parentPropertyId?: number;
  propertyTypeId?: number;
  minPrice?: number;
  maxPrice?: number;
  address?: string;
  latitude?: string;
  longitude?: string;
}


// Interface pour les filtres côté client
export interface ProjectFilters {
  search?: string;
  status?: string;
  period?: string;
}

// Interface pour la réponse paginée de l'API
export interface PaginatedResponse<T> {
  content: T[];
  totalElements?: number;
  totalPages?: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// interface PaginatedResponse<T> {
//   content: T[];
//   last: boolean;
//   totalElements?: number;
//   totalPages?: number;
//   size: number;
//   number: number;
// }

export interface RealEstateProject {
  realEstateProperty: RealEstateProject | null;
  id?: number;
  name: string;
  propertyTypeId: number;
  area: number;
  price: number;
  startDate: string;
  endDate: string;
  address: string;
  numberOfLots: number;
  numberOfRooms: number;
  description?: string;
  latitude?: number;
  longitude?: number;
  promoterId: number;
  available: boolean;
  constructionStatus: string;
  plan?: string; // URL du plan
  
  // Équipements
  hasHall: boolean;
  hasParking: boolean;
  hasElevator: boolean;
  hasSharedTerrace: boolean;
  hasGym: boolean;
  hasPlayground: boolean;
  hasSwimmingPool: boolean;
  hasSecurityService: boolean;
  hasGarden: boolean;
  hasBicycleStorage: boolean;
  hasLaundryRoom: boolean;
  hasStorageRooms: boolean;
  hasWasteDisposalArea: boolean;
  mezzanine: boolean;
  averageProgess:number;
}

export interface PropertyType {
  id: number;
  typename: string;
  description?: string;
}

export interface Promoter {
  id: number;
  name: string;
  email?: string;
  phone?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: { [key: string]: string[] };
}


// Ajoutez ces interfaces à votre service
interface PhaseProgress {
  phaseName: string;
  averageProgressPercentage: number;
}

interface ProjectWithProgress extends RealEstateProject {
  averageProgress?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RealestateService {
  private readonly endpoints = {
    save: `${environment.apiUrl}/realestate/save`,
    propertyTypes: `${environment.apiUrl}/property-types/all`,
    promoters: `${environment.apiUrl}/v1/user/me`,
    projects: `${environment.apiUrl}/realestate`,
    searchProjects: `${environment.apiUrl}/realestate/search-by-promoter`,
    indicators: `${environment.apiUrl}/indicators/global`,
    detailProject: `${environment.apiUrl}/realestate`
    
  };
  private endpoint = 'https://wakana.online/api/realestate'
  private apiImageUrl = environment.filebaseUrl;

  private apiUrlImages = '/api';
  private baseUrl = environment.apiUrl;
   
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Rechercher les projets par promoteur avec pagination
   */
  searchProjectsByPromoter(
    criteria: ProjectSearchCriteria,
    page: number = 0,
    size: number = 10
  ): Observable<PaginatedResponse<RealEstateProject>> {
    const url = `${this.endpoints.searchProjects}?page=${page}&size=${size}`;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    });

    const searchBody = {
      promoterId: criteria.promoterId,
      parentPropertyId: criteria.parentPropertyId || 0,
      propertyTypeId: criteria.propertyTypeId || 0,
      minPrice: criteria.minPrice || 0,
      maxPrice: criteria.maxPrice || 0,
      address: criteria.address || "string",
      latitude: criteria.latitude || "string",
      longitude: criteria.longitude || "string"
    };

    return this.http.post<PaginatedResponse<RealEstateProject>>(url, searchBody, { headers })
      .pipe(
        timeout(15000),
        retry({
          count: 2,
          delay: 1000
        }),
        catchError(this.handleError.bind(this))
      );
  }

  

  // tetste liste projet par promoteur
getlisteProjectsByPromoters(promoterId:number ,page:number=0 ,size:number=10):Observable<any>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  const params =new HttpParams()
    .set('promoterId', promoterId.toString())
    .set('page', page.toString())
    .set('size', size.toString());
  const url = '/realestate/search-by-promoter';
  return this.http.get<any>(url, { params });


}

  /**
   * Récupérer les projets avec transformation pour l'affichage
   */
  getProjects(
    promoterId: number,
    filters?: ProjectFilters,
    page: number = 0,
    size: number = 10
  ): Observable<any[]> {
    const criteria: ProjectSearchCriteria = {
      promoterId: promoterId,
      address: filters?.search || undefined
    };

    return this.searchProjectsByPromoter(criteria, page, size)
      .pipe(
        map(response => this.transformToDisplayProjects(response.content)),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Récupérer tous les projets paginés
   */
  getAllProjectsPaginated(
    promoterId: number,
    page: number = 0,
    size: number = 10
  ): Observable<PaginatedResponse<any>> {
    const criteria: ProjectSearchCriteria = {
      promoterId: promoterId
    };

    return this.searchProjectsByPromoter(criteria, page, size)
      .pipe(
        map(response => ({
          ...response,
          
          content: this.transformToDisplayProjects(response.content)
          
        })),
        
        catchError(this.handleError.bind(this))
      );
  }

  // getProjectPhaseIndicators(realEstatePropertyId: number): Observable<PhaseProgress[]> {
  //   const url = `${this.endpoints.indicators}?realEstatePropertyId=${realEstatePropertyId}`;
    
  //   return this.http.get<PhaseProgress[]>(url, { headers: this.getHeaders() })
  //     .pipe(
  //       timeout(10000),
  //       retry(2),
  //       catchError(this.handleError.bind(this))
  //     );
  // }

  getGlobalIndicators(realEstatePropertyId: number) {
    const url = `${this.baseUrl}/indicators/global?realEstatePropertyId=${realEstatePropertyId}`;
    return this.http.get(url);
  }
  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    });
    // Exemple: Ajouter un token d'authentification si nécessaire
    const token = localStorage.getItem('Token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  /**
   * Transformer les données de l'API vers le format d'affichage
   */
  private transformToDisplayProjects(apiProjects: RealEstateProject[]): any[] {
    return apiProjects.map(project => ({
      id: project.id || 0,
      title: project.name,
      location: this.extractLocationFromAddress(project.address),
      address: project.address,
      startDate: this.formatDisplayDate(project.startDate),
      endDate: this.formatDisplayDate(project.endDate),
      progress: this.calculateProgress(project.startDate, project.endDate),
      plan: this.apiImageUrl + (project.plan || ''),
      available: project.available
    }));
  }

  /**
   * Extraire la localisation de l'adresse complète
   */
  private extractLocationFromAddress(address: string): string {
    if (!address) return 'Non spécifié';
    
    const parts = address.split(',');
    return parts.length > 1 ? parts[parts.length - 1].trim() : address.trim();
  }

  /**
   * Formater les dates pour l'affichage (DD.MM.YY)
   */
  private formatDisplayDate(dateString: string): string {
    if (!dateString) return '';
    
    try {
      let date: Date;
      
      if (dateString.includes('-')) {
        const parts = dateString.split('-');
        if (parts.length === 3) {
          // Format DD-MM-YYYY
          if (parts[0].length === 4) {
            // Format YYYY-MM-DD
            date = new Date(dateString);
          } else {
            // Format DD-MM-YYYY
            date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
          }
        } else {
          date = new Date(dateString);
        }
      } else {
        date = new Date(dateString);
      }

      if (isNaN(date.getTime())) {
        return dateString;
      }

      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString().slice(-2);
      
      return `${day}.${month}.${year}`;
    } catch (error) {
      console.warn('Erreur lors du formatage de la date:', dateString, error);
      return dateString;
    }
  }

  /**
   * Calculer le pourcentage de progression basé sur les dates
   */
  // private calculateProgress(startDate: string, endDate: string): number {
  //   try {
  //     const now = new Date();
  //     const start = new Date(startDate);
  //     const end = new Date(endDate);

  //     if (now < start) return 0;
  //     if (now > end) return 100;

  //     const totalDuration = end.getTime() - start.getTime();
  //     const elapsed = now.getTime() - start.getTime();
      
  //     return Math.round((elapsed / totalDuration) * 100);
  //   } catch (error) {
  //     return Math.floor(Math.random() * 60) + 20;
  //   }
  // }

  

  // Méthode pour parser les dates qui arrivent sous forme de tableau
private parseDateArray(dateArray: any): Date | null {
  try {
    // Si c'est déjà une chaîne, utiliser l'ancienne méthode
    if (typeof dateArray === 'string') {
      return this.parseDate(dateArray);
    }

    // Si c'est un tableau [année, mois, jour, heure?, minute?]
    if (Array.isArray(dateArray)) {
      if (dateArray.length >= 3) {
        const year = dateArray[0];
        const month = dateArray[1] - 1; // Les mois sont 0-indexés en JavaScript
        const day = dateArray[2];
        const hour = dateArray[3] || 0;
        const minute = dateArray[4] || 0;
        const second = dateArray[5] || 0;

        const date = new Date(year, month, day, hour, minute, second);
        
        // Vérifier que la date est valide
        if (isNaN(date.getTime())) {
          console.warn('Date invalide créée à partir du tableau:', dateArray);
          return null;
        }

        return date;
      }
    }

    // Si c'est un objet Date
    if (dateArray instanceof Date) {
      return isNaN(dateArray.getTime()) ? null : dateArray;
    }

    // Essayer de convertir en Date directement
    const date = new Date(dateArray);
    return isNaN(date.getTime()) ? null : date;

  } catch (error) {
    console.warn('Erreur lors du parsing de date:', error, dateArray);
    return null;
  }
}
  // Version corrigée de votre méthode calculateProgress
  private calculateProgress(startDate: any, endDate: any): number {
    try {
      // Vérifier que les dates ne sont pas nulles, undefined ou vides
      if (!startDate || !endDate) {
        console.warn('Dates manquantes pour le calcul de progression:', { startDate, endDate });
        return 0;
      }
  
      const now = new Date();
      
      // Parser les dates (tableaux ou chaînes)
      const start = this.parseDateArray(startDate);
      const end = this.parseDateArray(endDate);
  
      // Vérifier que les dates sont valides
      if (!start || !end) {
        console.warn('Dates invalides pour le calcul de progression:', { startDate, endDate });
        return 0;
      }
  
      // Vérifier que la date de fin est après la date de début
      if (end <= start) {
        console.warn('Date de fin antérieure ou égale à la date de début:', { 
          startDate, 
          endDate, 
          parsedStart: start, 
          parsedEnd: end 
        });
        return 0;
      }
  
      // Calculs de progression
      if (now < start) return 0;
      if (now > end) return 100;
  
      const totalDuration = end.getTime() - start.getTime();
      const elapsed = now.getTime() - start.getTime();
      
      if (totalDuration === 0) return 100;
      
      const progress = (elapsed / totalDuration) * 100;
      
      if (isNaN(progress) || !isFinite(progress)) {
        console.warn('Progression calculée invalide:', { progress, elapsed, totalDuration });
        return 0;
      }
      
      return Math.max(0, Math.min(100, Math.round(progress)));
      
    } catch (error) {
      console.error('Erreur lors du calcul de progression:', error, { startDate, endDate });
      return 0;
    }
  }
  
  // Méthode pour traiter les données de projet venant du backend
  public processProjectData(project: any): any {
    if (!project) return null;
  
    // Utiliser averageProgress du backend si disponible, sinon calculer
    let progress = 0;
    
    if (project.averageProgress !== undefined && project.averageProgress !== null) {
      // Utiliser la progression du backend
      progress = Number(project.averageProgress);
      if (isNaN(progress)) {
        progress = 0;
      }
    } else if (project.startDate && project.endDate) {
      // Calculer la progression basée sur les dates
      progress = this.calculateProgress(project.startDate, project.endDate);
    }
  
    return {
      ...project,
      progress: Math.max(0, Math.min(100, progress)), // S'assurer que c'est entre 0 et 100
      available: Boolean(project.available),
      // Convertir les dates pour l'affichage si nécessaire
      startDateFormatted: this.formatDateForDisplay(project.startDate),
      endDateFormatted: this.formatDateForDisplay(project.endDate)
    };
  }
  formatDateForDisplay(startDate: any) {
    throw new Error('Method not implemented.');
  }
  
// Méthode utilitaire pour parser les dates de manière robuste
private parseDate(dateString: string): Date | null {
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }

  // Nettoyer la chaîne
  const cleanDateString = dateString.trim();
  
  try {
    // Essayer différents formats de date
    let parsedDate: Date;

    // Format ISO (YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss)
    if (cleanDateString.includes('-')) {
      parsedDate = new Date(cleanDateString);
    }
    // Format européen (DD.MM.YYYY ou DD/MM/YYYY)
    else if (cleanDateString.includes('.') || cleanDateString.includes('/')) {
      const separator = cleanDateString.includes('.') ? '.' : '/';
      const parts = cleanDateString.split(separator);
      
      if (parts.length === 3) {
        // Assumer DD.MM.YYYY ou DD/MM/YYYY
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Les mois sont 0-indexés en JS
        const year = parseInt(parts[2], 10);
        
        parsedDate = new Date(year, month, day);
      } else {
        parsedDate = new Date(cleanDateString);
      }
    }
    // Autres formats
    else {
      parsedDate = new Date(cleanDateString);
    }

    // Vérifier que la date est valide
    if (isNaN(parsedDate.getTime())) {
      return null;
    }

    return parsedDate;
    
  } catch (error) {
    console.warn('Erreur lors du parsing de date:', error, dateString);
    return null;
  }
}

// Méthode alternative si vous voulez garder un fallback aléatoire
private calculateProgressWithFallback(startDate: string, endDate: string): number {
  const progress = this.calculateProgress(startDate, endDate);
  
  // Si le calcul normal échoue (retourne 0 et qu'on est sûr qu'il devrait y avoir une progression)
  // vous pouvez utiliser cette logique
  if (progress === 0 && this.shouldHaveProgress(startDate, endDate)) {
    return Math.floor(Math.random() * 60) + 20; // Votre logique originale
  }
  
  return progress;
}

// Méthode pour déterminer si un projet devrait avoir une progression
private shouldHaveProgress(startDate: string, endDate: string): boolean {
  try {
    const now = new Date();
    const start = this.parseDate(startDate);
    const end = this.parseDate(endDate);
    
    if (!start || !end) return false;
    
    // Le projet devrait avoir une progression s'il a commencé mais n'est pas fini
    return now >= start && now <= end;
  } catch {
    return false;
  }
}



  /**
   * Créer un nouveau projet immobilier
   */
  createProject(
    projectData: RealEstateProject, 
    planFile: File, 
    // legalFile?: File
  ): Observable<ApiResponse<RealEstateProject>> {
    const formData = this.buildFormData(projectData, planFile);
    
    // Récupération du token d'authentification
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}` // Ajout du token Bearer
    });
    
    return this.http.post<ApiResponse<RealEstateProject>>(
      this.endpoints.save, 
      formData, 
      { headers }
    ).pipe(
      timeout(30000),
      retry({
        count: 2,
        delay: 1000
      }),
      catchError(this.handleError.bind(this))
    );
  }
  /**
   * Récupérer tous les types de propriétés
   */
  getPropertyTypes(): Observable<PropertyType[]> {
    return this.http.get<PropertyType[]>(this.endpoints.propertyTypes)
      .pipe(
        timeout(10000),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Récupérer tous les promoteurs
   */
  getPromoters(): Observable<Promoter[]> {
    return this.http.get<Promoter[]>(this.endpoints.promoters)
      .pipe(
        timeout(10000),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Récupérer un projet par ID
   */
  getProjectById(id: number): Observable<RealEstateProject> {
    return this.http.get<RealEstateProject>(`${this.endpoints.projects}/${id}`)
      .pipe(
        timeout(10000),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Mettre à jour un projet
   */
  updateProject(
    id: number, 
    projectData: RealEstateProject, 
    planFile?: File, 
    legalFile?: File
  ): Observable<ApiResponse<RealEstateProject>> {
    const formData = this.buildFormData(projectData, planFile, legalFile);
    
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    
    return this.http.put<ApiResponse<RealEstateProject>>(
      `${this.endpoints.projects}/${id}`, 
      formData, 
      { headers }
    ).pipe(
      timeout(30000),
      retry({
        count: 2,
        delay: 1000
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Supprimer un projet
   */
  deleteProject(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.endpoints.projects}/${id}`)
      .pipe(
        timeout(10000),
        catchError(this.handleError.bind(this))
      );
  }

   // =================== DETAIL PROJET ===================
  //  getRealEstateDetails(id: number): Observable<RealEstateProject> {
  //   return this.http.get<RealEstateProject>(`${this.endpoints}/details/${id}`);
  // }


  getRealEstateDetails(id: number): Observable<RealEstateProject> {
    // Vérification de l'ID
    if (!id || id <= 0) {
      throw new Error('ID invalide');
    }
    
    // Construction de l'URL avec vérification
    const url = `${this.endpoint}/details/${id}`;
    // console.log('URL appelée:', url); // Pour débugger
    timeout(10000), // 10 secondes max
      catchError((err) => {
        console.error('Erreur API :', err);
        return throwError(() => err);
      })
    return this.http.get<RealEstateProject>(url).pipe(
      catchError(this.handleError)
    );
  }
  // =================== MÉTHODES UTILITAIRES ===================

  /**
   * Construire le FormData pour l'API
   */
  private buildFormData(
    projectData: RealEstateProject, 
    planFile?: File, 
    legalFile?: File
  ): FormData {
    const formData = new FormData();

    const dataToSend = {
      name: projectData.name,
      propertyTypeId: projectData.propertyTypeId.toString(),
      area: projectData.area.toString(),
      price: projectData.price.toString(),
      startDate: projectData.startDate,
      endDate: projectData.endDate,
      address: projectData.address,
      numberOfLots: projectData.numberOfLots.toString(),
      numberOfRooms: projectData.numberOfRooms.toString(),
      promoterId: projectData.promoterId.toString(),
      description: projectData.description || '',
      latitude: projectData.latitude?.toString() || '0',
      longitude: projectData.longitude?.toString() || '0',
      available: 'true',
      
      // Équipements
      hasHall: projectData.hasHall ? 'true' : 'false',
      hasParking: projectData.hasParking ? 'true' : 'false',
      hasElevator: projectData.hasElevator ? 'true' : 'false',
      hasSharedTerrace: projectData.hasSharedTerrace ? 'true' : 'false',
      hasGym: projectData.hasGym ? 'true' : 'false',
      hasPlayground: projectData.hasPlayground ? 'true' : 'false',
      hasSwimmingPool: projectData.hasSwimmingPool ? 'true' : 'false',
      hasSecurityService: projectData.hasSecurityService ? 'true' : 'false',
      hasGarden: projectData.hasGarden ? 'true' : 'false',
      hasBicycleStorage: projectData.hasBicycleStorage ? 'true' : 'false',
      hasLaundryRoom: projectData.hasLaundryRoom ? 'true' : 'false',
      hasStorageRooms: projectData.hasStorageRooms ? 'true' : 'false',
      hasWasteDisposalArea: projectData.hasWasteDisposalArea ? 'true' : 'false',
      mezzanine: projectData.mezzanine ? 'true' : 'false'
    };

    // Ajouter les données au FormData
    Object.entries(dataToSend).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value);
      }
    });

    // Ajout des fichiers
    if (planFile) {
      formData.append('plan', planFile, planFile.name);
    }

    if (legalFile) {
      formData.append('legalStatus', legalFile, legalFile.name);
    }

    // Numéro de projet généré
    formData.append('number', this.generateProjectNumber().toString());

    return formData;
  }

  /**
   * Générer un numéro de projet unique
   */
  private generateProjectNumber(): number {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return parseInt(`${timestamp.toString().slice(-6)}${random}`);
  }

  /**
   * Gestion centralisée des erreurs
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Une erreur inconnue est survenue';
    let technicalDetails = '';

    console.error('Erreur API:', error);

    if (error instanceof HttpErrorResponse) {
      technicalDetails = `Status: ${error.status} - ${error.statusText}`;
      
      switch (error.status) {
        case 0:
          errorMessage = 'Impossible de contacter le serveur. Vérifiez votre connexion internet.';
          break;
        case 400:
          errorMessage = 'Données invalides. Veuillez vérifier votre saisie.';
          if (error.error?.errors) {
            const validationErrors = Object.values(error.error.errors).flat();
            errorMessage += ' Détails: ' + validationErrors.join(', ');
          }
          break;
        case 401:
          errorMessage = 'Non autorisé. Veuillez vous connecter.';
          break;
        case 403:
          errorMessage = 'Accès interdit. Vous n\'avez pas les permissions nécessaires.';
          break;
        case 404:
          errorMessage = 'Ressource non trouvée.';
          break;
        case 413:
          errorMessage = 'Fichier trop volumineux. Taille maximum autorisée: 10MB.';
          break;
        case 415:
          errorMessage = 'Type de fichier non supporté.';
          break;
        case 422:
          errorMessage = 'Données non valides.';
          if (error.error?.message) {
            errorMessage += ' ' + error.error.message;
          }
          break;
        case 500:
          errorMessage = 'Erreur interne du serveur. Veuillez réessayer plus tard.';
          break;
        case 503:
          errorMessage = 'Service temporairement indisponible. Veuillez réessayer plus tard.';
          break;
        default:
          errorMessage = `Erreur ${error.status}: ${error.message || 'Erreur inconnue'}`;
      }
    } 
    else if (isPlatformBrowser(this.platformId)) {
      if (error?.message) {
        errorMessage = `Erreur réseau: ${error.message}`;
        technicalDetails = 'Vérifiez votre connexion internet';
      }
    }

    console.error('Erreur traitée:', {
      message: errorMessage,
      technical: technicalDetails,
      platform: isPlatformBrowser(this.platformId) ? 'browser' : 'server',
      timestamp: new Date().toISOString()
    });

    const userError = new Error(errorMessage);
    (userError as any).technicalDetails = technicalDetails;
    
    return throwError(() => userError);
  }

  /**
   * Valider les fichiers avant upload
   */
  validateFile(file: File, type: 'image' | 'pdf'): { valid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!file) {
      return { valid: false, error: 'Aucun fichier sélectionné' };
    }
    
    if (file.size > maxSize) {
      return { valid: false, error: 'Le fichier est trop volumineux (maximum 10MB)' };
    }

    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const allowedPdfTypes = ['application/pdf'];

    if (type === 'image' && !allowedImageTypes.includes(file.type)) {
      return { 
        valid: false, 
        error: 'Format d\'image non supporté. Formats acceptés: JPEG, PNG, GIF, WebP' 
      };
    }

    if (type === 'pdf' && !allowedPdfTypes.includes(file.type)) {
      return { valid: false, error: 'Le fichier doit être un PDF' };
    }

    return { valid: true };
  }

  /**
   * Formater les dates pour l'API (DD-MM-YYYY)
   */
  formatDateForApi(date: string | Date): string {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      console.warn('Date invalide:', date);
      return '';
    }
    
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    
    return `${day}-${month}-${year}`;
  }

  /**
   * Préparer les données pour l'envoi à l'API 
   */
  prepareProjectData(formValue: any): RealEstateProject {
    return {
      name: formValue.name?.trim() || '',
      propertyTypeId: parseInt(formValue.propertyTypeId) || 1,
      area: parseFloat(formValue.area) || 0,
      price: parseFloat(formValue.price) || 0,
      startDate: this.formatDateForApi(formValue.startDate),
      endDate: this.formatDateForApi(formValue.endDate),
      address: formValue.address?.trim() || '',
      numberOfLots: parseInt(formValue.numberOfLots) || 1,
      numberOfRooms: parseInt(formValue.numberOfRooms) || 1,
      description: formValue.description?.trim() || '',
      latitude: parseFloat(formValue.latitude) || 0,
      longitude: parseFloat(formValue.longitude) || 0,
      promoterId: parseInt(formValue.promoterId) || 1,
      available: true,
      plan: formValue.plan || '',
      
      // Équipements
      hasHall: Boolean(formValue.hasHall),
      hasParking: Boolean(formValue.hasParking),
      hasElevator: Boolean(formValue.hasElevator),
      hasSharedTerrace: Boolean(formValue.hasSharedTerrace),
      hasGym: Boolean(formValue.hasGym),
      hasPlayground: Boolean(formValue.hasPlayground),
      hasSwimmingPool: Boolean(formValue.hasSwimmingPool),
      hasSecurityService: Boolean(formValue.hasSecurityService),
      hasGarden: Boolean(formValue.hasGarden),
      hasBicycleStorage: Boolean(formValue.hasBicycleStorage),
      hasLaundryRoom: Boolean(formValue.hasLaundryRoom),
      hasStorageRooms: Boolean(formValue.hasStorageRooms),
      hasWasteDisposalArea: Boolean(formValue.hasWasteDisposalArea),
      mezzanine: Boolean(formValue.mezzanine),
      constructionStatus: formValue.constructionStatus?.trim() || '',
      realEstateProperty:  formValue.realEstateProperty?.trim() || '',
      averageProgess: formValue.averageProgess?.trim() || '',
    };
  }

  /**
   * Vérifier la connectivité
   */
  checkConnectivity(): Observable<boolean> {
    if (!isPlatformBrowser(this.platformId)) {
      return new Observable(observer => {
        observer.next(true);
        observer.complete();
      });
    }

    return new Observable(observer => {
      try {
        observer.next(navigator.onLine);
        observer.complete();
      } catch (error) {
        observer.next(true);
        observer.complete();
      }
    });
  }
}