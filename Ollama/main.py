from agents.sql_optimizer_agent import (
    generate_sql_from_prompt,
    optimize_sql_query,
    validate_schema,
    define_new_table
)

def main():
    print("1. Generate SQL from prompt")
    print("2. Optimize SQL query")
    print("3. Validate existing schema")
    print("4. Define new table schema")
    choice = input("Choose an option: ")

    if choice == "1":
        prompt = input("Enter your request: ")
        print(generate_sql_from_prompt(prompt))

    elif choice == "2":
        query = input("Enter SQL query: ")
        print(optimize_sql_query(query))

    elif choice == "3":
        print(validate_schema())

    elif choice == "4":
        prompt = input("Describe the table you need: ")
        print(define_new_table(prompt))

if __name__ == "__main__":
    main()
