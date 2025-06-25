// ===== ENUMS =====

export enum UserProfile {
    PROMOTEUR = 'PROMOTEUR'
  }
  
  export enum SubscriptionPlanName {
    PROMOTEUR_PLAN = 'PROMOTEUR_PLAN'
  }
  
  export enum SubscriptionStatus {
    PENDING = 'PENDING'
  }
  
  export enum UnitType {
    DOCUMENT = 'DOCUMENT'
  }
  
  export enum PropertyStatus {
    AVAILABLE = 'AVAILABLE'
  }
  
  export enum ConstructionStatus {
    IN_PROGRESS = 'IN_PROGRESS'
  }
  
  export enum ConstructionPhase {
    GROS_OEUVRE = 'GROS_OEUVRE'
  }
  
  export enum LotStatus {
    PENDING = 'PENDING'
  }
  
  export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
  }
  
  export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
  }
  
  export enum FeeName {
    LOTFEE = 'LOTFEE'
  }
  
  // ===== INTERFACES DE BASE =====
  
  export interface Authority {
    authority: string;
  }
  

  // Pour la création
export interface CreateMaterial {
  label: string;
  quantity: number;
  criticalThreshold: number;
  unitId: number;
  propertyId: number;
  
}

  export interface Company {
    id: number;
    name: string;
    logo: string;
    primaryColor: string;
    secondaryColor: string;
  }
  
  export interface SubscriptionPlan {
    id: number;
    name: SubscriptionPlanName;
    totalCost: number;
    installmentCount: number;
  }
  
  export interface Subscription {
    id: number;
    user: string;
    subscriptionPlan: SubscriptionPlan;
    startDate: string; // Format: YYYY-MM-DD
    endDate: string; // Format: YYYY-MM-DD
    active: boolean;
    paidAmount: number;
    installmentCount: number;
    dateInvoice: string; // Format: YYYY-MM-DD
    status: SubscriptionStatus;
    renewed: boolean;
  }
  
  export interface User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    adress: string;
    technicalSheet: string;
    profil: UserProfile;
    activated: boolean;
    notifiable: boolean;
    telephone: string;
    subscriptions: Subscription[];
    company: Company;
    createdAt: string; // Format: ISO 8601
    funds: number;
    note: number;
    photo: string;
    idCard: string;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
    authorities: Authority[];
    username: string;
    enabled: boolean;
  }
  
  export interface PropertyType {
    id: number;
    typeName: string;
    parent: boolean;
  }
  
  export interface ConstructionPhaseIndicator {
    id: number;
    realEstateProperty: string;
    phaseName: ConstructionPhase;
    progressPercentage: number;
    lastUpdated: string; // Format: ISO 8601
  }
  
  export interface LotFee {
    id: number;
    name: FeeName;
    fee: number;
  }
  
  export interface Comment {
    id: number;
    text: string;
    user: User;
    lot: string;
    createdAt: string; // Format: ISO 8601
  }
  
  export interface Lot {
    id: number;
    name: string;
    description: string;
    startDate: string; // Format: YYYY-MM-DD
    endDate: string; // Format: YYYY-MM-DD
    status: LotStatus;
    realEstateProperty: string;
    subcontractor: User;
    comments: Comment[];
  }
  
  export interface Task {
    id: number;
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    realEstateProperty: string;
    executors: User[];
    pictures: string[];
    startDate: string; // Format: ISO 8601
    endDate: string; // Format: ISO 8601
  }
  
  export interface RealEstateProperty {
    id: number;
    name: string;
    number: string;
    address: string;
    price: number;
    numberOfRooms: number;
    area: number;
    latitude: string;
    longitude: string;
    available: boolean;
    reservationFee: number;
    discount: number;
    feesFile: number;
    description: string;
    plan: string;
    legalStatus: string;
    numberOfLots: number;
    level: number;
    promoter: User;
    recipient: User;
    notary: User;
    agency: User;
    bank: User;
    parentProperty: string;
    timestamp: number;
    pictures: string[];
    propertyType: PropertyType;
    constructionPhaseIndicators: ConstructionPhaseIndicator[];
    
    // Amenities
    hasHall: boolean;
    hasParking: boolean;
    hasElevator: boolean;
    hasSwimmingPool: boolean;
    hasGym: boolean;
    hasPlayground: boolean;
    hasSecurityService: boolean;
    hasGarden: boolean;
    hasSharedTerrace: boolean;
    hasBicycleStorage: boolean;
    hasLaundryRoom: boolean;
    hasStorageRooms: boolean;
    hasWasteDisposalArea: boolean;
    
    // Status and dates
    status: PropertyStatus;
    constructionStatus: ConstructionStatus;
    lotFeesPaid: boolean;
    lotFee: LotFee;
    coOwner: boolean;
    budget: number;
    allocateDate: string; // Format: ISO 8601
    rental: boolean;
    commentcount: number;
    rentalDate: string; // Format: ISO 8601
    soldAt: string; // Format: ISO 8601
    startDate: string; // Format: ISO 8601
    endDate: string; // Format: ISO 8601
    mezzanine: boolean;
    
    // Relations
    lots: Lot[];
    tasks: Task[];
  }
  
  export interface Unit {
    id: number;
    label: string;
    code: string;
    hasStartDate: boolean;
    hasEndDate: boolean;
    type: UnitType;
  }
  
  export interface Material {
    id: number;
    label: string;
    quantity: number;
    criticalThreshold: number;
    createdAt: string; // Format: ISO 8601
    unit: Unit;
    property: RealEstateProperty;
  }
  
  export interface Sort {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  }
  
  export interface Pageable {
    paged: boolean;
    unpaged: boolean;
    pageNumber: number;
    pageSize: number;
    offset: number;
    sort: Sort;
  }
  
  // ===== INTERFACE PRINCIPALE =====
  
  export interface MaterialsResponse {
    totalElements: number;
    totalPages: number;
    pageable: Pageable;
    numberOfElements: number;
    size: number;
    content: Material[];
    number: number;
    sort: Sort;
    first: boolean;
    last: boolean;
    empty: boolean;
  }
  
  // ===== TYPES UTILITAIRES =====
  
  export type MaterialCreateRequest = Omit<Material, 'id' | 'createdAt'>;
  export type MaterialUpdateRequest = Partial<MaterialCreateRequest> & { id: number };
  
  export type UserCreateRequest = Omit<User, 'id' | 'createdAt' | 'authorities' | 'accountNonExpired' | 'credentialsNonExpired' | 'accountNonLocked' | 'enabled'>;
  
  export type PropertyCreateRequest = Omit<RealEstateProperty, 'id' | 'timestamp' | 'constructionPhaseIndicators' | 'lots' | 'tasks' | 'commentcount'>;
  
  // ===== INTERFACES POUR LES API ENDPOINTS =====
  
  export interface MaterialMovement {
    id?: number;
    materialId: number;
    quantity: number;
    type: 'IN' | 'OUT';
    description?: string;
    timestamp: string; // Format: ISO 8601
    userId: number;
  }
  
  export interface MaterialMovementsResponse {
    totalElements: number;
    totalPages: number;
    content: MaterialMovement[];
    pageable: Pageable;
    numberOfElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    last: boolean;
    empty: boolean;
  }
  
  // ===== FONCTIONS HELPER =====
  
  export const createDefaultPagination = (): Pageable => ({
    paged: true,
    unpaged: false,
    pageNumber: 0,
    pageSize: 20,
    offset: 0,
    sort: {
      unsorted: true,
      sorted: false,
      empty: true
    }
  });
  
  export const createEmptyMaterialsResponse = (): MaterialsResponse => ({
    totalElements: 0,
    totalPages: 0,
    pageable: createDefaultPagination(),
    numberOfElements: 0,
    size: 0,
    content: [],
    number: 0,
    sort: {
      unsorted: true,
      sorted: false,
      empty: true
    },
    first: true,
    last: true,
    empty: true
  });
  
  // ===== VALIDATION HELPERS =====
  
  export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const isValidPhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone);
  };
  
  export const isValidCoordinates = (lat: string, lng: string): boolean => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    return !isNaN(latitude) && !isNaN(longitude) && 
           latitude >= -90 && latitude <= 90 && 
           longitude >= -180 && longitude <= 180;
  };