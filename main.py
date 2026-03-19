import os
import json
import subprocess
from pathlib import Path

def main():
    terraform_dir = Path(__file__).parent / 'terraform'
    env_file = terraform_dir / 'env.json'

    if not env_file.exists():
        print(f"Error: .env file not found in {env_file}")
        return 1

    with open(env_file, 'r') as f:
        env_variables = json.load(f)

    for key, value in env_variables.items():
        os.environ[key] = value

    subprocess.run(['terraform', 'init'], cwd=terraform_dir)
    subprocess.run(['terraform', 'apply', '-auto-approve'], cwd=terraform_dir)

if __name__ == '__main__':
    main()