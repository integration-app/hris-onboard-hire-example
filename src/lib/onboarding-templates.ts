export interface OnboardingTemplate {
  id: string;
  name: string;
  description: string;
  schema: Record<string, any>;
}

export function getOnboardingTemplates(): OnboardingTemplate[] {
  return [
    {
      id: 'standard',
      name: 'Standard Onboarding',
      description: 'Basic onboarding process for most roles',
      schema: {
        type: 'object',
        required: ['startDate', 'department', 'manager'],
        properties: {
          startDate: {
            type: 'string',
            format: 'date',
            title: 'Start Date',
          },
          department: {
            type: 'string',
            title: 'Department',
            enum: ['Engineering', 'Product', 'Design', 'Marketing', 'Sales'],
          },
          manager: {
            type: 'string',
            title: 'Reporting Manager',
          },
          notes: {
            type: 'string',
            title: 'Additional Notes',
            format: 'textarea',
          },
        },
      },
    },
    {
      id: 'remote',
      name: 'Remote Employee Onboarding',
      description: 'Specialized process for remote employees',
      schema: {
        type: 'object',
        required: ['startDate', 'timeZone', 'equipmentNeeded'],
        properties: {
          startDate: {
            type: 'string',
            format: 'date',
            title: 'Start Date',
          },
          timeZone: {
            type: 'string',
            title: 'Time Zone',
            enum: ['EST', 'CST', 'MST', 'PST', 'GMT', 'IST'],
          },
          equipmentNeeded: {
            type: 'array',
            title: 'Equipment Needed',
            items: {
              type: 'string',
              enum: ['Laptop', 'Monitor', 'Keyboard', 'Mouse', 'Headset'],
            },
          },
          shippingAddress: {
            type: 'string',
            title: 'Shipping Address',
            format: 'textarea',
          },
        },
      },
    },
    {
      id: 'executive',
      name: 'Executive Onboarding',
      description: 'Comprehensive onboarding for executive positions',
      schema: {
        type: 'object',
        required: ['startDate', 'compensation', 'team'],
        properties: {
          startDate: {
            type: 'string',
            format: 'date',
            title: 'Start Date',
          },
          compensation: {
            type: 'object',
            title: 'Compensation Package',
            properties: {
              salary: {
                type: 'number',
                title: 'Base Salary',
              },
              equity: {
                type: 'string',
                title: 'Equity Package',
              },
              benefits: {
                type: 'array',
                title: 'Additional Benefits',
                items: {
                  type: 'string',
                },
              },
            },
          },
          team: {
            type: 'array',
            title: 'Direct Reports',
            items: {
              type: 'string',
            },
          },
        },
      },
    },
  ];
} 