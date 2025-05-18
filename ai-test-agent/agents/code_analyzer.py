
from utils.file_utils import find_files_with_extension, read_file
from config.settings import PROJECT_PATH

def extract_code_coverage_targets():
    files = list(find_files_with_extension(PROJECT_PATH, ".ts"))
    return [(f, read_file(f)) for f in files if 'spec.ts' not in f]