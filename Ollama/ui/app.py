import streamlit as st
from agents.sql_optimizer_agent import (
    generate_sql_from_prompt,
    optimize_sql_query,
    validate_schema,
    define_new_table
)

st.set_page_config(page_title="Database AI Agent", layout="centered")

st.title("🧠 Database AI Agent (RAG + Ollama)")

option = st.selectbox(
    "What would you like to do?",
    [
        "Generate SQL from prompt",
        "Optimize existing SQL query",
        "Validate current schema",
        "Define new table schema"
    ]
)

if option == "Generate SQL from prompt":
    user_prompt = st.text_area("Describe what you want the SQL query to do:")
    if st.button("Generate SQL"):
        with st.spinner("Thinking..."):
            result = generate_sql_from_prompt(user_prompt)
        st.code(result, language="sql")

elif option == "Optimize existing SQL query":
    sql_query = st.text_area("Paste your SQL query:")
    if st.button("Optimize"):
        with st.spinner("Optimizing..."):
            result = optimize_sql_query(sql_query)
        st.code(result, language="sql")

elif option == "Validate current schema":
    if st.button("Validate Schema"):
        with st.spinner("Analyzing schema..."):
            result = validate_schema()
        st.text_area("Schema Review", result, height=300)

elif option == "Define new table schema":
    schema_request = st.text_area("Describe the table you need:")
    if st.button("Generate Schema"):
        with st.spinner("Defining schema..."):
            result = define_new_table(schema_request)
        st.code(result)
