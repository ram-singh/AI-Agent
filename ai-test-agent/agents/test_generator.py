from langchain_openai import AzureChatOpenAI

from config.settings import AZURE_OPENAI_DEPLOYMENT, AZURE_OPENAI_API_VERSION

llm = AzureChatOpenAI(
    azure_deployment=AZURE_OPENAI_DEPLOYMENT,
    api_version=AZURE_OPENAI_API_VERSION,
    temperature=0.3
)

def generate_unit_test(file_path, source_code):
    prompt = f"""You are an expert in writing Jest unit tests for Angular projects.
    Your task is to generate a spec.ts file with 100% code coverage for the following code:
    {source_code}
    Please provide only the .spec.ts code."""
    return llm.predict(prompt)
