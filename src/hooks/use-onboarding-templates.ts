import { useIntegrationApp } from "@integration-app/react";
import useSWR from "swr";

interface OnboardingTemplate {
  id: string;
  name: string;
}

interface FormSchema {
  type: string;
  properties: {
    applicantOnboarding: {
      type: string;
      properties: Record<string, {
        type: string;
        properties?: Record<string, any>;
        required?: string[];
      }>;
      required?: string[];
    };
  };
}

export function useOnboardingTemplates() {
  const integrationApp = useIntegrationApp();

  const { data, error, isLoading } = useSWR(
    'onboarding-templates',
    async () => {
      const result = await integrationApp
        .connection('adp-workforce')
        .action('list-onboarding-templates')
        .run();

      return result.output.records as OnboardingTemplate[];
    }
  );

  const getTemplateSchema = async (templateId: string) => {
    const result = await integrationApp
      .connection('adp-workforce')
      .dataCollection('application-onboard', { onboardingTemplateCode: templateId })
      .get();

    return result.fieldsSchema as FormSchema;
  };

  return {
    templates: data || [],
    isLoading,
    error,
    getTemplateSchema,
  };
} 