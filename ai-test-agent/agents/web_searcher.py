import requests
from config.settings import TAVILY_API_KEY

def search_fix_for_error(error_message):
    url = "https://api.tavily.com/search"
    headers = {"Authorization": f"Bearer {TAVILY_API_KEY}"}
    params = {"query": error_message}
    res = requests.get(url, headers=headers, params=params)
    return res.json().get("results", [])