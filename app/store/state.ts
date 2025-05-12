import { create } from 'zustand';
import { z } from 'zod';

// Definir el esquema de validación para Subject
const SubjectSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "El nombre es requerido"),
  professor: z.string().min(1, "El profesor es requerido"),
  schedule: z.string().min(1, "El horario es requerido"),
  progress: z.number().min(0).max(100),
  tasks: z.number().min(0),
  notes: z.number().min(0),
  color: z.string().min(1, "El color es requerido"),
});

interface AppState {
  subjects: z.infer<typeof SubjectSchema>[];
  addSubject: (subject: z.infer<typeof SubjectSchema>) => void;
  removeSubject: (id: number) => void;
  updateSubject: (id: number, updatedSubject: Partial<z.infer<typeof SubjectSchema>>) => void;
}

const loadFromLocalStorage = (): z.infer<typeof SubjectSchema>[] => {
  const data = localStorage.getItem('subjects');
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (subjects: z.infer<typeof SubjectSchema>[]) => {
  localStorage.setItem('subjects', JSON.stringify(subjects));
};

export const useAppStore = create<AppState>((set) => ({
  subjects: loadFromLocalStorage(),
  addSubject: (subject) => {
    const validatedSubject = SubjectSchema.parse(subject);
    set((state) => {
      const newSubjects = [...state.subjects, validatedSubject];
      saveToLocalStorage(newSubjects);
      return { subjects: newSubjects };
    });
  },
  removeSubject: (id) => set((state) => {
    const newSubjects = state.subjects.filter((s) => s.id !== id);
    saveToLocalStorage(newSubjects);
    return { subjects: newSubjects };
  }),
  updateSubject: (id, updatedSubject) => set((state) => {
    const newSubjects = state.subjects.map((s) => 
      s.id === id ? { ...s, ...updatedSubject } : s
    );
    saveToLocalStorage(newSubjects);
    return { subjects: newSubjects };
  }),
}));