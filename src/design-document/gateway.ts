import { Template, TemplateLanguage, TemplateGateway } from "./domain";

export const templateGateway: TemplateGateway = {
  fetchTemplates: async (): Promise<Template[]> => {
    await new Promise(resolve => setTimeout(resolve, 2300));
    return [
    { name: 'Template 1', description: 'This is the first template.', language: TemplateLanguage.LuaLaTex, favourite: false, lastModified: new Date('2024-08-03T19:00:00'), tags: ['tag 1', 'tag 2'], status: 'Active' },
    { name: 'Template 2', description: 'This is the second template.', language: TemplateLanguage.Word, favourite: false, lastModified: new Date('2023-10-02T14:30:00'), status: 'Draft' },
    { name: 'Template 3', description: 'This is the second template.', language: TemplateLanguage.LuaLaTex, favourite: false, lastModified: new Date('2023-10-03T16:45:00'), tags: ['tag 3'], status: 'Draft' },
    { name: 'Template 4', description: 'This is the second template.', language: TemplateLanguage.LuaLaTex, favourite: false, lastModified: new Date('2023-07-04T18:00:00'), status: 'Draft' },
  ];
  },
  fetchTemplate: async (): Promise<Template> => {
    await new Promise(resolve => setTimeout(resolve, 2300));
    return {
      name: 'Template 1', 
      description: 'This is the first template.',
      language: TemplateLanguage.LuaLaTex,
      favourite: false,
      lastModified: new Date('2024-08-03T19:00:00'),
      tags: ['tag 1', 'tag 2'],
      status: 'Active'
    };
  },
};