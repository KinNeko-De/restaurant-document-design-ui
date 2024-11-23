
export interface UserTemplate {
  templateId: string;
  favourite: boolean;
}

export interface UserGateway {
  fetchUserTemplates: () => Promise<UserTemplate[]>;
  updateUserTemplate: (templateId: string, favourite: boolean) => Promise<void>;
}