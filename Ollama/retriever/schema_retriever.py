from db.mysql_connector import fetch_all_table_schemas
from db.schema_utils import schema_to_text

def get_schema_context():
    schema = fetch_all_table_schemas()
    return schema_to_text(schema)
