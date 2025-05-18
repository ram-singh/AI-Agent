from agents.web_searcher import search_fix_for_error
from langchain_openai import AzureChatOpenAI
from config.settings import AZURE_OPENAI_DEPLOYMENT, AZURE_OPENAI_API_VERSION

llm = AzureChatOpenAI(
    azure_deployment=AZURE_OPENAI_DEPLOYMENT,
    api_version=AZURE_OPENAI_API_VERSION,
    temperature=0.3
)
def fix_test_case(source_code, test_code, error_message):
    tavily_results = search_fix_for_error(error_message)
    prompt = f"""
    You're an expert in debugging Jest test failures.
    Here's the original test:
    {test_code}
    Here's the error:
    {error_message}
    Relevant info from web:
    {tavily_results}
    Fix the test case to pass and maintain full coverage.
    """
    return llm.predict(prompt)