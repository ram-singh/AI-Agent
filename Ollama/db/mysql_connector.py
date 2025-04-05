import mysql.connector
from config import DB_CONFIG

def get_connection():
    return mysql.connector.connect(**DB_CONFIG)

def fetch_all_table_schemas():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SHOW TABLES;")
    tables = [t[0] for t in cursor.fetchall()]
    schemas = {}
    for table in tables:
        cursor.execute(f"DESCRIBE {table};")
        schemas[table] = cursor.fetchall()
    cursor.close()
    conn.close()
    return schemas
