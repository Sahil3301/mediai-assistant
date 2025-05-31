import os
import asyncio # Keep asyncio for the function signature if app.py expects awaitable
import google.generativeai as genai
from typing import TypedDict, Optional

# Environment variable for the API key
API_KEY_ENV_VAR = "GEMINI_API_KEY"

class AnalysisResult(TypedDict):
    doctorAnalysis: str
    laymanSummary: str

def _parse_gemini_response(response_text: str) -> AnalysisResult:
    """
    Parses the combined text response from Gemini into doctor and layman parts.
    Assumes specific delimiters are present in the response.
    """
    doctor_analysis_heading = "DOCTOR ANALYSIS:"
    layman_summary_heading = "LAYMAN SUMMARY:"

    doctor_analysis = "Could not parse Doctor Analysis from response."
    layman_summary = "Could not parse Layman Summary from response."

    try:
        # Find start of doctor analysis
        doctor_start_index = response_text.upper().find(doctor_analysis_heading)
        if doctor_start_index != -1:
            doctor_start_index += len(doctor_analysis_heading)

            # Find start of layman summary (which marks end of doctor analysis)
            layman_start_index_in_doc_block = response_text[doctor_start_index:].upper().find(layman_summary_heading)

            if layman_start_index_in_doc_block != -1:
                actual_layman_start_index = doctor_start_index + layman_start_index_in_doc_block
                doctor_analysis = response_text[doctor_start_index:actual_layman_start_index].strip()

                # Find start of layman summary proper
                layman_start_proper_index = response_text.upper().find(layman_summary_heading)
                if layman_start_proper_index != -1:
                    layman_start_proper_index += len(layman_summary_heading)
                    layman_summary = response_text[layman_start_proper_index:].strip()
                else: # If layman heading is missing after doctor block, take rest of string for doctor
                    doctor_analysis = response_text[doctor_start_index:].strip() # Re-evaluate doctor analysis
                    layman_summary = "Layman summary not found or delimiter missing after doctor analysis."

            else: # No layman summary heading found after doctor analysis heading
                doctor_analysis = response_text[doctor_start_index:].strip()
                layman_summary = "Layman summary delimiter not found. Full response treated as doctor analysis."

        else: # No doctor analysis heading found
            # Try to find layman summary independently if doctor summary is missing
            layman_start_index = response_text.upper().find(layman_summary_heading)
            if layman_start_index != -1:
                layman_start_index += len(layman_summary_heading)
                layman_summary = response_text[layman_start_index:].strip()
                doctor_analysis = "Doctor analysis delimiter not found. Only layman summary was parsed."
            else: # Neither heading found
                doctor_analysis = "Could not find 'DOCTOR ANALYSIS:' delimiter in response."
                layman_summary = "Could not find 'LAYMAN SUMMARY:' delimiter in response. Full response logged as doctor analysis."
                # To be safe, assign the whole text to one field if parsing fails badly.
                # doctor_analysis = response_text
                # This might be too much, better to signal parsing failure.

    except Exception as e:
        print(f"Error parsing Gemini response: {e}")
        doctor_analysis = f"Error parsing response: {e}. Raw response: {response_text[:200]}..."
        layman_summary = f"Error parsing response: {e}. Raw response: {response_text[:200]}..."

    return AnalysisResult(doctorAnalysis=doctor_analysis, laymanSummary=layman_summary)


async def analyze_medical_data(
    patient_notes: str,
    image_base64: Optional[str] = None, # Not used in this version
    image_mime_type: Optional[str] = None, # Not used in this version
    use_search_grounding: bool = False # Not directly used by gemini-pro basic, but good to keep
) -> AnalysisResult:
    """
    Analyzes medical data using the Google Gemini API.
    """
    api_key = os.getenv(API_KEY_ENV_VAR)
    if not api_key:
        return AnalysisResult(
            doctorAnalysis="Error: GEMINI_API_KEY environment variable not set.",
            laymanSummary="Error: GEMINI_API_KEY environment variable not set."
        )

    if not patient_notes or patient_notes.strip() == '':
        return AnalysisResult(
            doctorAnalysis="Error: Insufficient data provided. Please provide patient information.",
            laymanSummary="Error: Not enough information was provided to create a summary."
        )

    try:
        genai.configure(api_key=api_key)

        # For text-only input, use gemini-pro
        # In future, if image_base64 is provided, would switch to gemini-pro-vision
        model = genai.GenerativeModel('gemini-pro')

        prompt = f"""
You are an AI medical assistant. Based on the following patient notes, provide:
1. A detailed medical analysis suitable for a doctor.
2. A simplified summary suitable for a layman.

Patient Notes:
{patient_notes}

Please structure your response clearly with the headings "DOCTOR ANALYSIS:" and "LAYMAN SUMMARY:".

DOCTOR ANALYSIS:
[Provide detailed medical analysis here]

LAYMAN SUMMARY:
[Provide simplified layman summary here]
"""

        # Simulate network delay even for real calls for consistent UX if API is too fast
        # await asyncio.sleep(1) # Optional: consider if API responses are too quick

        print(f"Calling Gemini API with patient_notes: '{patient_notes[:50]}...'")
        response = await asyncio.to_thread(model.generate_content, prompt) # Run blocking SDK call in a thread

        if response and response.text:
            return _parse_gemini_response(response.text)
        else:
            # Handle cases where response.text might be empty or response itself is problematic
            # Accessing response.prompt_feedback can give reasons for blocking if any
            error_detail = "Unknown error or empty response from API."
            if response and response.prompt_feedback:
                error_detail = f"API call failed or content blocked. Feedback: {response.prompt_feedback}"

            return AnalysisResult(
                doctorAnalysis=f"Error: {error_detail}",
                laymanSummary=f"Error: {error_detail}"
            )

    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        # Check for specific Google API errors if possible, e.g. permission denied for bad key
        # from google.api_core import exceptions as google_exceptions
        # if isinstance(e, google_exceptions.PermissionDenied):
        #     error_msg = "Error: Gemini API permission denied. Check your API key and ensure the API is enabled."
        # elif isinstance(e, google_exceptions.ResourceExhausted):
        #     error_msg = "Error: Gemini API quota exhausted. Please check your usage limits."
        # else:
        error_msg = f"Error during API call: {str(e)}"

        return AnalysisResult(
            doctorAnalysis=error_msg,
            laymanSummary=error_msg
        )

# Example usage (for testing the service directly)
if __name__ == '__main__':
    async def main_test():
        print("Testing gemini_service.py with REAL API (requires GEMINI_API_KEY set)...")

        # Test case 1: With patient notes
        test_notes_1 = "Patient reports persistent cough for 2 weeks, mild fever, and fatigue. Smoker for 10 years."
        print(f"\n--- Test Case 1: '{test_notes_1}' ---")
        result_1 = await analyze_medical_data(test_notes_1)
        print(f"Doctor Analysis:\n{result_1['doctorAnalysis']}")
        print(f"Layman Summary:\n{result_1['laymanSummary']}")

        # Test case 2: Empty patient notes (should be caught before API call)
        test_notes_2 = ""
        print(f"\n--- Test Case 2: Empty Notes ---")
        result_2 = await analyze_medical_data(test_notes_2)
        print(f"Doctor Analysis:\n{result_2['doctorAnalysis']}")
        print(f"Layman Summary:\n{result_2['laymanSummary']}")

        # Test case 3: API key not set (Illustrative - manually unset env var to test this)
        # current_api_key = os.environ.pop(API_KEY_ENV_VAR, None)
        # print("\n--- Test Case 3: API Key Not Set ---")
        # result_3 = await analyze_medical_data(test_notes_1)
        # print(f"Doctor Analysis:\n{result_3['doctorAnalysis']}")
        # print(f"Layman Summary:\n{result_3['laymanSummary']}")
        # if current_api_key: # Restore if it was set
        #     os.environ[API_KEY_ENV_VAR] = current_api_key

    asyncio.run(main_test())
