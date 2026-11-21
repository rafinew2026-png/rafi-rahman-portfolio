import type { CVData } from '../types/cv';

/**
 * Verbatim Curriculum Vitae data extracted directly from:
 * /public/assets/aistudio/Rafi__Rahman_c8fc26d5.pdf
 * Every field preserves the exact original wording, dates, results, and details.
 */
export const initialCVData: CVData = {
  hasUploadedSource: true,
  name: 'Rafi Rahman',
  roleTitle: 'IT Support Specialist · NSDA Level-3 Certified',
  contact: {
    phone: '+880 1906765019',
    email: 'rafirahmanrafi618@gmail.com',
    address: 'House-368, Mirpur-13,',
  },
  careerObjective:
    'NSDA Level-3 certified IT Support professional with practical expertise in hardware and software troubleshooting, lab administration, CCTV, and POS operations. Seeking an IT Support Specialist or Lab Assistant role to utilize my technical skills in ensuring smooth daily operation',
  experience: [
    {
      id: 'the-everest-it',
      company: 'The Everest IT',
      designation: 'IT Lab Assistant (Asset project & SICIP project)',
      startDate: '01Oct 2025',
      endDate: '30Jun 2026',
      location: 'Shewrapara, Dhaka',
      responsibilities: [
        'Assist users with hardware, software, printing, and Internet connectivity issues.',
        'Install, update, and troubleshoot software applications and operating systems.',
        'Perform routine maintenance on computers, printers, and peripherals, including cleaning and minor repairs.',
        'Monitor for malware/spyware, ensure lab policies are followed, and keep the lab locked/supervised as required.',
      ],
    },
    {
      id: 'axionet-it-systems',
      company: 'AXIONET IT SYSTEMS',
      designation: 'Project Support Coordinator (Asset project- SICIP project)',
      startDate: 'Dec',
      endDate: 'Jan (2 Months 2025)',
      location: 'Shewrapara , Dhaka',
      responsibilities: [
        'Project Support: Assisted the Lab In-charge with daily operations and testing setups for the SICIP project.',
        'Attendance & Student Monitoring: Monitored daily student attendance, tracked classroom participation, and ensured regular engagement across training sessions.',
        'Reporting & Documentation: Prepared daily/weekly attendance logs and detailed absence reports to analyze student retention and track absenteeism.',
      ],
    },
    {
      id: 'prince-bazar',
      company: 'PRINCE BAZAR',
      designation: 'CCTV Operator',
      startDate: '01sep 2024',
      endDate: '30 sep 2025',
      location: 'Mirpur-14, Dhaka',
      responsibilities: [
        'Surveillance & Loss Prevention: Monitored real-time CCTV footage to detect suspicious behavior, prevent shoplifting, and minimize inventory shrinkage across all store departments.',
        'Safety Oversight: Tracked floor activity and staff conduct to ensure safety and operational standards.',
        'Incident Reporting: Reviewed video logs to investigate incidents and prepare clear reports for management.',
      ],
    },
    {
      id: 'food-valley',
      company: 'FOOD VALLEY',
      designation: 'POS Operator',
      startDate: '03Feb 2020',
      endDate: '31Jul 2021',
      location: 'Lal khan Bazar, Chattogram',
      responsibilities: [
        'Transactions & Cash Reconciliation: Executed precise POS transactions, managed cash flow, and maintained daily financial accuracy at checkout.',
        'Service Excellence & Resolution: Delivered exceptional customer service, managed sales inquiries, and resolved issue inquiries seamlessly to enhance store satisfaction.',
      ],
    },
  ],
  education: [
    {
      id: 'nsda-level-3',
      title: 'NSDA Certified IT Support Service Level-3',
      category: 'Certification',
      institution: 'NSDA Level-3 Certified',
      boardOrAuthority: 'NSDA',
      groupOrSubject: 'IT Support Service Level-3',
      passingYear: 'Certified',
      result: 'Level-3 Certified',
    },
    {
      id: 'bachelor-of-arts',
      title: 'Bachelor of Arts (B.A)',
      category: 'Degree',
      institution: 'National University',
      boardOrAuthority: 'National University',
      groupOrSubject: 'Bachelor of Arts (B.A)',
      passingYear: '—',
      result: 'CGPA: 2.63',
    },
    {
      id: 'hsc',
      title: 'Higher School Certificate (H.S.C) in Humanities',
      category: 'Higher Secondary',
      institution: 'Chattogram Board',
      boardOrAuthority: 'Chattogram Board',
      groupOrSubject: 'Humanities',
      passingYear: '2020 – 2021',
      result: 'GPA: 3.67 (out of 5.00)',
    },
    {
      id: 'ssc',
      title: 'Secondary School Certificate (S.S.C) in Business Studies',
      category: 'Secondary',
      institution: 'Chattogram Board',
      boardOrAuthority: 'Chattogram Board',
      groupOrSubject: 'Business Studies',
      passingYear: '2019',
      result: 'CGPA (out of 5.00)- 2.83',
    },
  ],
  computerSkills: [
    {
      id: 'cs-ms-office',
      name: 'MS Office (Word, Excel, PowerPoint)',
      category: 'Computer Skills',
    },
    {
      id: 'cs-fundamentals',
      name: 'Computer Fundamentals',
      category: 'Computer Skills',
    },
    {
      id: 'cs-troubleshooting',
      name: 'Hardware & Software Troubleshooting',
      category: 'Computer Skills',
    },
    {
      id: 'cs-cctv',
      name: 'CCTV & Surveillance Operations',
      category: 'Computer Skills',
    },
    {
      id: 'cs-internet-network',
      name: 'Internet Applications & Network Basics',
      category: 'Computer Skills',
    },
  ],
  specialization: [
    {
      id: 'sp-1',
      name: 'Cool minded, strong managing ability and Convincing Power.',
      category: 'Specialization',
    },
    {
      id: 'sp-2',
      name: 'NSDA Certified IT Support Service Level-3.',
      category: 'Specialization',
    },
    {
      id: 'sp-3',
      name: 'Have good communicative skills are always consistent and professional as the situation demand.',
      category: 'Specialization',
    },
    {
      id: 'sp-4',
      name: 'Adoptive to new technology and a quick learner.',
      category: 'Specialization',
    },
    {
      id: 'sp-5',
      name: 'Hardware & Software installation.',
      category: 'Specialization',
    },
    {
      id: 'sp-6',
      name: 'Self-motivated and Good team worker.',
      category: 'Specialization',
    },
    {
      id: 'sp-7',
      name: 'Enthusiastic, Creative, Routine & Sincere about own task.',
      category: 'Specialization',
    },
    {
      id: 'sp-8',
      name: 'Website Research',
      category: 'Specialization',
    },
    {
      id: 'sp-9',
      name: 'Data Entry',
      category: 'Specialization',
    },
    {
      id: 'sp-10',
      name: 'Data analysis',
      category: 'Specialization',
    },
  ],
  languages: [
    {
      id: 'lang-bangla',
      name: 'Bangla',
      category: 'Languages',
    },
    {
      id: 'lang-english',
      name: 'English',
      category: 'Languages',
    },
    {
      id: 'lang-hindi',
      name: 'Hindi',
      category: 'Languages',
    },
  ],
  hobbies: [
    'Reading Book',
    'Traveling',
    'Rendering services to the society.',
    'Music etc.',
  ],
  personalProfile: [
    { label: "Father's Name", value: 'Md.Maksudur Rahman' },
    { label: "Mother's Name", value: 'Jannat Ara Begum' },
    { label: 'Date of Birth', value: '01 December 2002' },
    { label: 'Nationality', value: 'Bangladeshi (by Birth)' },
    { label: 'Gender', value: 'Male' },
    { label: 'Marital Status', value: 'Single' },
    { label: 'Religion', value: 'Islam' },
    { label: 'Blood Group', value: 'AB+(Positive)' },
    {
      label: 'Permanent Address',
      value: 'Vill: West Charbata, P.O: Char Bata (3813), P.S: Subornochar',
    },
  ],
  declaration:
    'I undersigned certify that, to the best of my knowledge and belief this bio-data correctly describes qualifications of me. My willful misstatement described here in may lead to my disqualification or dismissal if employed.',
  photoUrl: '/assets/cv/rafi_photo.png',
  signatureUrl: '/assets/cv/rafi_signature.png',
  originalPdfUrl: '/assets/aistudio/Rafi__Rahman_c8fc26d5.pdf',
  originalPdfFilename: 'Rafi_Rahman_CV.pdf',
};
