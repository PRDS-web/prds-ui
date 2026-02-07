// Custom field types for additional application fields
export const CUSTOM_FIELD_TYPES = [
  { value: 'text', label: 'Short Text' },
  { value: 'textarea', label: 'Long Text' },
  { value: 'email', label: 'Email' },
  { value: 'url', label: 'URL' },
  { value: 'number', label: 'Number' },
  { value: 'phone', label: 'Phone' },
];

// Application form fields config - employers select which fields applicants must fill
export const APPLICATION_FORM_FIELDS_DEFAULT = {
  firstName: { label: 'First Name', enabled: true, required: true },
  lastName: { label: 'Last Name', enabled: true, required: true },
  email: { label: 'Email Address', enabled: true, required: true },
  phoneNumber: { label: 'Phone Number', enabled: true, required: true },
  experience: { label: 'Years of Experience', enabled: true, required: true },
  skills: { label: 'Skills', enabled: true, required: true },
  coverLetter: { label: 'Cover Letter', enabled: true, required: false },
  linkedIn: { label: 'LinkedIn Profile URL', enabled: true, required: false },
};
