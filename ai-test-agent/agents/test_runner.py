import subprocess

def run_jest_tests():
    result = subprocess.run(["npx", "jest", "--coverage"], capture_output=True, text=True)
    return result.stdout, result.stderr
def parse_failed_tests(output):
    failed = []
    for line in output.splitlines():
        if "FAIL" in line and ".spec.ts" in line:
            failed.append(line.strip())
        return failed