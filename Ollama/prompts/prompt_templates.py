def query_generation_prompt(schema_text, user_prompt):
    return f"""
You are a SQL expert. Based on the following schema:
{schema_text}

Generate a SQL query for the request:
\"\"\"{user_prompt}\"\"\"
"""

def optimize_query_prompt(schema_text, sql_query):
    return f"""
You are a SQL optimizer. Given the schema:
{schema_text}

Suggest improvements for the query:
\"\"\"{sql_query}\"\"\"
"""

def schema_validation_prompt(schema_text):
    return f"""
Review the following MySQL schema for performance issues:
{schema_text}

Suggest improvements if any.
"""

def define_new_table_prompt(user_prompt):
    return f"""
Create a new table schema based on:
\"\"\"{user_prompt}\"\"\"
"""
