import { useState } from 'react';
import { analyzeMedicalData } from '../services/geminiService';

export interface AnalysisResult {
  doctorAnalysis: string;
  laymanSummary: string;
}

export const useGemini = () => {
  const [analysis, setAnalysis] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateAnalysis = async (patientData: string, file: File | null, useGrounding: boolean) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Handle file-to-base64 conversion for imageParts
      const result = await analyzeMedicalData(patientData, null, null, useGrounding);
      setAnalysis(result.doctorAnalysis);
      setSummary(result.laymanSummary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return { generateAnalysis, analysis, summary, isLoading, error };
};

export default useGemini;
