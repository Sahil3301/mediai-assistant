
import React from 'react';

interface PatientDataInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PatientDataInput: React.FC<PatientDataInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-primary-DEFAULT transition-shadow shadow-sm text-sm placeholder-neutral-400"
        placeholder="Enter patient symptoms, medical history, specific questions for the AI, or text from reports..."
      />
       <p className="text-xs text-neutral-400 mt-1">
        Provide as much relevant detail as possible for a comprehensive analysis.
      </p>
    </div>
  );
};

export default PatientDataInput;
    