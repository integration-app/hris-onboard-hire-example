'use client';

import { useState, useCallback, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Candidate } from '@/types/candidate';
import { useOnboardingTemplates } from '@/hooks/use-onboarding-templates';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { DataInput, DropdownPortalBoundary } from '@integration-app/react';
import debounce from 'lodash/debounce';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate;
}

export function OnboardingModal({ isOpen, onClose, candidate }: OnboardingModalProps) {
  const [step, setStep] = useState<'template' | 'form'>('template');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [formSchema, setFormSchema] = useState<any>(null);
  const [isLoadingSchema, setIsLoadingSchema] = useState(false);

  const { templates, isLoading, error, getTemplateSchema } = useOnboardingTemplates();
  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTemplateSelect = async (templateId: string) => {
    setSelectedTemplateId(templateId);
    setIsLoadingSchema(true);
    setStep('form');
    try {
      const schema = await getTemplateSchema(templateId);
      setFormSchema(schema);
    } catch (error) {
      console.error('Failed to load template schema:', error);
      setStep('template');
    } finally {
      setIsLoadingSchema(false);
    }
  };

  const handleFormChange = useCallback(
    debounce((data: any) => {
      setFormData(data);
    }, 300),
    []
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      handleFormChange.cancel();
    };
  }, [handleFormChange]);

  const handleOnboard = async () => {
    if (!selectedTemplate || !formData) return;

    try {
      console.log('Starting onboarding process:', {
        candidateId: candidate.id,
        templateId: selectedTemplate.id,
        formData,
      });
      
      onClose();
      setStep('template');
      setSelectedTemplateId('');
      setFormData({});
      setSearchQuery('');
    } catch (error) {
      console.error('Failed to start onboarding:', error);
    }
  };

  const handleClose = () => {
    // Reset all state
    setStep('template');
    setSelectedTemplateId('');
    setSearchQuery('');
    setFormData({});
    setFormSchema(null);
    setIsLoadingSchema(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} >
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto" data-dropdown-portal-boundary="onboarding-modal-form">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle>
            {step === 'template' ? 'Select Onboarding Template' : (
              <div className="flex items-center gap-2">
                <span>Complete Onboarding Form</span>
                {isLoadingSchema && (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                )}
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {step === 'template' ? (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead className="w-[100px] text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center h-24">
                          Loading templates...
                        </TableCell>
                      </TableRow>
                    ) : error ? (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center h-24 text-red-500">
                          Error loading templates. Please try again.
                        </TableCell>
                      </TableRow>
                    ) : filteredTemplates.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center h-24">
                          No templates found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTemplates.map((template) => (
                        <TableRow 
                          key={template.id}
                          className={cn(
                            "cursor-pointer hover:bg-muted/50",
                            selectedTemplateId === template.id && "bg-muted"
                          )}
                        >
                          <TableCell className="font-medium">{template.name}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleTemplateSelect(template.id)}
                            >
                              Select
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : isLoadingSchema ? (
            <div className="flex flex-col items-center justify-center h-[400px] space-y-4" >
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <div className="text-center space-y-2">
                <p className="text-lg font-medium">Loading Template Schema</p>
                <p className="text-sm text-muted-foreground">
                  This may take a few seconds...
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setStep('template');
                  setIsLoadingSchema(false);
                }}
                className="mt-4"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="integration-app-form-wrapper">
                {formSchema && (
                  <DropdownPortalBoundary id="onboarding-modal-form"><DataInput
                    schema={formSchema}
                    value={formData}
                    onChange={handleFormChange}
                    hideReadOnlyFields={true}
                  /></DropdownPortalBoundary>
                )}
              </div>
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setStep('template')}>
                  Back
                </Button>
                <Button onClick={handleOnboard}>
                  Onboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 