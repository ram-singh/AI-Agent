def schema_to_text(schema_dict):
    text = ""
    for table, columns in schema_dict.items():
        text += f"Table: {table}\n"
        for col in columns:
            text += f"  - {col[0]} {col[1]}\n"
    return text
