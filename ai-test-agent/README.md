### Create an environment and install dependencies

#### Windows Powershell
PS> python3 -m venv lgenv
PS> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
PS> lgenv\scripts\activate
PS> pip install -r requirements.txt

#### Mac/Linux/WSL
$ python3 -m venv lc-academy-env
$ source lc-academy-env/bin/activate
$ pip install -r requirements.txt


