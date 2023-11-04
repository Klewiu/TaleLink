export interface Story {
    id: number;
    title: string;
    timestamp: string;
    isEdit: boolean;
    text: string;
    category: string; 
    updated: string;
    user: string;
    updatedBy: string;
    newText: string; // Holds the update form edited text
  }
