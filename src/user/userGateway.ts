
import { UserTemplate, UserGateway } from "./userDomain";

export const userGateway: UserGateway = {
  fetchUserTemplates: async (): Promise<UserTemplate[]> => {
    await new Promise(resolve => setTimeout(resolve, 250));
    return [
      { templateId: 'template-1', favourite: true },
      { templateId: 'template-2', favourite: false },
    ];
  },
  updateUserTemplate: async (templateId: string, favourite: boolean): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    // Update the favourite status in the backend
  },
};