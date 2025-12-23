export interface AppItem {
  id: string;
  name: string;
  domain: string;
  iconUrl: string;
  status: AppStatus;
}

export enum AppStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
}

export interface AddAppFormData {
  appName: string;
}

export type Language = 'ru' | 'en';