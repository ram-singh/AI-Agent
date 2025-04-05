from retriever.schema_retriever import get_schema_context
from agents.rag_agent import query_ollama
from prompts.prompt_templates import (
    query_generation_prompt,
    optimize_query_prompt,
    schema_validation_prompt,
    define_new_table_prompt
)

def generate_sql_from_prompt(user_prompt):
    schema = get_schema_context()
    prompt = query_generation_prompt(schema, user_prompt)
    return query_ollama(prompt)

def optimize_sql_query(sql_query):
    schema = get_schema_context()
    prompt = optimize_query_prompt(schema, sql_query)
    return query_ollama(prompt)

def validate_schema():
    schema = get_schema_context()
    prompt = schema_validation_prompt(schema)
    return query_ollama(prompt)

def define_new_table(user_prompt):
    prompt = define_new_table_prompt(user_prompt)
    return query_ollama(prompt)
