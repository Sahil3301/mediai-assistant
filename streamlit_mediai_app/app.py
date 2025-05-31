import streamlit as st
import datetime
import asyncio
from services.gemini_service import analyze_medical_data, AnalysisResult

# --- Page Configuration ---
st.set_page_config(
    page_title="MediAI Assistant",
    layout="wide",
    initial_sidebar_state="auto", # Keep sidebar open on desktop, auto on mobile
    page_icon="🩺" # Added a page icon
)

# --- Initialize Session State (if not already present) ---
if 'is_loading' not in st.session_state:
    st.session_state.is_loading = False
if 'analysis_done' not in st.session_state:
    st.session_state.analysis_done = False
if 'error_message' not in st.session_state:
    st.session_state.error_message = None
if 'doctor_analysis' not in st.session_state:
    st.session_state.doctor_analysis = None
if 'layman_summary' not in st.session_state:
    st.session_state.layman_summary = None
if 'show_qr' not in st.session_state:
    st.session_state.show_qr = False
if 'feedback_name' not in st.session_state:
    st.session_state.feedback_name = ""
if 'feedback_email' not in st.session_state:
    st.session_state.feedback_email = ""
if 'feedback_message' not in st.session_state:
    st.session_state.feedback_message = ""


# --- Main Area ---
st.title("🩺 MediAI Assistant") # Added emoji to title
st.markdown("""
Welcome to MediAI Assistant, an AI-powered tool designed to assist healthcare professionals
in analyzing patient data for faster, more accurate insights. Our goal is to augment clinical
decision-making with intelligent analysis.
""") # Slightly refined intro text

# Medical Disclaimer
st.warning("""
**Medical Disclaimer:** This AI tool assists medical professionals but is not a substitute
for professional judgment. Healthcare providers must verify all AI-generated analyses
before clinical use. AI has limitations and should be used as a supportive tool only.
""")

st.markdown("---") # Added a separator

st.header("1. Provide Patient Information")

# File Upload
uploaded_file = st.file_uploader(
    "Upload Medical Scan/Report (JPG, PNG, PDF)",
    type=["jpg", "jpeg", "png", "pdf"],
    help="Upload a medical scan or report for analysis. Max file size: 200MB (Streamlit default)"
)

# Patient Details Text Input
patient_details_input = st.text_area(
    "Enter Patient Details",
    placeholder="Include symptoms, medical history, specific questions for the AI, or text from reports...",
    height=150,
    help="Provide as much relevant detail as possible for a comprehensive analysis."
)

# Search Grounding Checkbox
use_grounding_input = st.checkbox(
    "Enable Google Search Grounding",
    value=False,
    help="If checked, the AI will try to use Google Search for up-to-date information (Note: mock service currently doesn't use this)."
)

# Generate Analysis Button
if st.button("✨ Generate Analysis", key="generate_button"): # Added emoji to button
    if not patient_details_input and not uploaded_file:
        st.session_state.error_message = "Please provide patient details or upload a medical scan/report."
        st.session_state.analysis_done = True
        st.session_state.is_loading = False
    else:
        st.session_state.is_loading = True
        st.session_state.analysis_done = True
        st.session_state.error_message = None
        st.session_state.doctor_analysis = None
        st.session_state.layman_summary = None

        file_data_for_service = None
        if uploaded_file is not None:
            print(f"File uploaded: {uploaded_file.name}")

        try:
            result = asyncio.run(analyze_medical_data(
                patient_notes=patient_details_input,
                use_search_grounding=use_grounding_input
            ))
            st.session_state.doctor_analysis = result['doctorAnalysis']
            st.session_state.layman_summary = result['laymanSummary']
            if "Error:" in st.session_state.doctor_analysis:
                 st.session_state.error_message = st.session_state.doctor_analysis
        except Exception as e:
            st.session_state.error_message = f"An unexpected error occurred: {str(e)}"
            print(f"Exception during analysis: {e}")
        finally:
            st.session_state.is_loading = False

    st.experimental_rerun()

st.markdown("---") # Added a separator
st.header("2. AI Analysis Results")

if st.session_state.is_loading:
    with st.spinner("🧠 Performing AI magic... Please wait."): # Changed spinner text
        asyncio.run(asyncio.sleep(0.1))
elif st.session_state.error_message:
    st.error(f"😟 Error: {st.session_state.error_message}") # Added emoji to error
elif st.session_state.analysis_done and st.session_state.doctor_analysis and st.session_state.layman_summary:
    st.subheader("👨‍⚕️ For Medical Professionals") # Added emoji
    st.markdown(st.session_state.doctor_analysis)
    st.markdown("---")
    st.subheader("😊 Patient-Friendly Summary") # Added emoji
    st.markdown(st.session_state.layman_summary)
elif st.session_state.analysis_done:
    st.info("Analysis process completed, but no specific results or errors were generated. Please check inputs or service logs.")
else:
    st.info("Your analysis results will appear here once generated. Please input data above and click 'Generate Analysis'.") # Slightly more instructive

# --- Sidebar ---
st.sidebar.title("About & Support") # Changed sidebar title slightly
st.sidebar.markdown("---")

# Donation Section
st.sidebar.subheader("💖 Support This Project") # Added emoji
qr_image_path = "streamlit_mediai_app/assets/donation-qr.png"

try:
    with open(qr_image_path, "rb") as f:
        qr_code_bytes = f.read()

    if st.sidebar.button("Show/Hide Donation QR Code", key="qr_button"):
        st.session_state.show_qr = not st.session_state.show_qr
        st.experimental_rerun()

    if st.session_state.show_qr:
        st.sidebar.image(qr_code_bytes, caption="Scan to donate. Thank you!", width=200)
        st.sidebar.markdown("Your support helps us improve and maintain this tool!") # Enhanced text

except FileNotFoundError:
    st.sidebar.error(f"QR Image not found.")
    st.sidebar.markdown("Imagine a QR code here to support the project!")

st.sidebar.markdown("---")

# Contact/Feedback Section
st.sidebar.subheader("📬 Contact & Feedback") # Added emoji
st.sidebar.markdown("**Email:** Rathoresahil3301@gmail.com") # Bolded labels
st.sidebar.markdown("**Phone:** +91 9557898822") # Bolded labels

st.session_state.feedback_name = st.sidebar.text_input("Your Name (Optional)", value=st.session_state.feedback_name, key="fb_name_key")
st.session_state.feedback_email = st.sidebar.text_input("Your Email (Optional)", value=st.session_state.feedback_email, key="fb_email_key")
st.session_state.feedback_message = st.sidebar.text_area("Your Feedback", value=st.session_state.feedback_message, key="fb_msg_key", height=100)

if st.sidebar.button("✉️ Send Feedback", key="send_feedback_button"): # Added emoji
    if st.session_state.feedback_message:
        st.sidebar.success("Feedback submitted! Thank you for your valuable input.") # Enhanced message
        print(f"Feedback Received: Name='{st.session_state.feedback_name}', Email='{st.session_state.feedback_email}', Message='{st.session_state.feedback_message}'")
        st.session_state.feedback_name = ""
        st.session_state.feedback_email = ""
        st.session_state.feedback_message = ""
        st.experimental_rerun()
    else:
        st.sidebar.warning("Please enter your feedback message before sending.")

st.sidebar.markdown("---")
st.sidebar.caption(f"© {datetime.date.today().year} MediAI Assistant. Version 1.0 (Streamlit)") # Added version
