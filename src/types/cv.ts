export interface ExperienceEntry {
  id: string;
  company: string;
  designation: string;
  startDate: string;
  endDate: string;
  location: string;
  responsibilities: string[];
}

export interface EducationEntry {
  id: string;
  title: string;
  category: 'Certification' | 'Degree' | 'Higher Secondary' | 'Secondary';
  institution: string;
  boardOrAuthority: string;
  groupOrSubject: string;
  passingYear: string;
  result: string;
  details?: string[];
}

export interface SkillEntry {
  id: string;
  name: string;
  category: 'Computer Skills' | 'Specialization' | 'Languages';
  detail?: string;
}

export interface ProfileField {
  label: string;
  value: string;
}

export interface CVData {
  hasUploadedSource: boolean;
  name: string;
  roleTitle: string;
  contact: {
    phone: string;
    email: string;
    address: string;
    linkedin?: string;
  };
  careerObjective: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  computerSkills: SkillEntry[];
  specialization: SkillEntry[];
  languages: SkillEntry[];
  hobbies: string[];
  personalProfile: ProfileField[];
  declaration: string;
  signatureDate?: string;
  photoUrl: string | null;
  signatureUrl: string | null;
  originalPdfUrl: string | null;
  originalPdfFilename: string | null;
}
