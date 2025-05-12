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

export const useAppStore = create<AppState>((set) => ({
  subjects: [],
  addSubject: (subject) => {
    const validatedSubject = SubjectSchema.parse(subject);
    set((state) => ({ subjects: [...state.subjects, validatedSubject] }));
  },
  removeSubject: (id) => set((state) => ({ subjects: state.subjects.filter((s) => s.id !== id) })),
  updateSubject: (id, updatedSubject) => set((state) => ({
    subjects: state.subjects.map((s) => 
      s.id === id ? { ...s, ...updatedSubject } : s
    ),
  })),
}));