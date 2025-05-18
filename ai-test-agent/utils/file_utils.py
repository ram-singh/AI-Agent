import os
def find_files_with_extension(root_dir, ext):
    for root, _, files in os.walk(root_dir):
        for file in files:
            if file.endswith(ext):
                yield os.path.join(root, file)
def read_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()
def write_file(filepath, content):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)