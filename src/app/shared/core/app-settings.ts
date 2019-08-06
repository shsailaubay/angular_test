import { environment } from '../../../environments/environment';
// main settings
// export const PARAM_HOST_NAME = 'http://api.spaberry.luxystech.com';
export const PARAM_HOST_NAME = 'https://api.new.spatravel-online.com';
export const SECOND_HOST_NAME = environment.secondApiUrl;
export const FIRST_HOST_NAME = environment.firstApiUrl;

// session keys
export const SESSION_DIRECTIONS_LIST = 'directionsList';
export const SESSION_TRAVEL_TOPICS_LIST = 'travelTopicsList';
export const SESSION_MEDICAL_PROCEDURE_LIST = 'medicalProcedureList';
export const SESSION_DISEASE_LIST = 'diseaseList';
export const SESSION_POPULAR_CITY_LIST = 'popularCity';
export const SESSION_PROGRAMS_LIST = 'programsList';
export const SESSION_SERVICES_LIST = 'servicesList';
export const SESSION_AGENCY_LIST = 'agencyList';
export const SESSION_QUERY = 'agencyQuery';
export const SESSION_ORDER_OBJ = 'orderObj';
export const SESSION_ORDER_PAYMENT = 'orderObjPayment';
export const SESSION_PROMO_ACTION_QUERY = 'promoActionQuery';

export const LOCAL_STORAGE_COOKIE_INFO = 'CookiesСonfirmed';
export const BASE_TITLE = 'Spa Travel Kur & Wellness Reisen';

export const BOARDING_CHOICE_SLUG: SelectElement[] = [
  {name: {ru: 'Только кровать', de: 'Ohne Verpflegung'}, value: 'only_bed'},
  {name: {ru: 'Кровать и завтрак', de: 'Frühstück'}, value: 'bed_breakfast'},
  {name: {ru: 'Полупансион', de: 'Halbpension'}, value: 'half_board'},
  {name: {ru: 'Полный пансион', de: 'Vollpension'}, value: 'full_board'},
  {name: {ru: 'Все включено', de: 'All inclusive'}, value: 'all_inclusive'},
];

export const BOARDING_CHOICE_ID: EnumChoice[] = [
  {name: 'only_bed', value: 0},
  {name: 'bed_breakfast', value: 1},
  {name: 'half_board', value: 2},
  {name: 'full_board', value: 3},
  {name: 'all_inclusive', value: 4},
];

export const TEST_AGENCIES: Number[] = environment.production ? [
  667, // PAUL TEST
  7, // Zakevich-Test
  387, // Spa Travel GmbH
  906 // TEZ TOUR DMCC
] : [];
