# Developer documentation
In this application we use the [Python Django framework](https://www.djangoproject.com/) and the [Go programming language](https://golang.org) for the backend systems, and [React](https://reactjs.org/) for the frontend.

## Setup your development environment
First make sure the following tools are available on your computer:

* [Git](https://git-scm.com/)
* [Go (v1.14+)](https://golang.org/doc/install)
* [Node.js (v 12)](https://nodejs.org/) (with NPM)
* [Modd](https://github.com/cortesi/modd)
* [Docker](https://docker.com), including [docker-compose](https://docs.docker.com/compose/)
* [Python (v3.8)](https://www.python.org)

> On Ubuntu 18.04, most of these can be installed through the `apt` package manager. The `golang` version in `apt` is too old, so you will need to install that manually. For Node.js, you can install the correct version using the `nvm` script or as a snap (the snaps have a channel for each major release), as the version in apt is too old. Modd also needs to be installed manually, or through `go get`, see the install instructions on the Modd github readme. For Python you will need to make sure to install the right version from apt, which is not the default version in Ubuntu 18.04. Be sure to also include the `python3.8-dev` and `python3.8-venv` packages.

Then clone this repository:

```bash
git clone git@gitlab.com:commonground/developer.overheid.nl.git
cd developer.overheid.nl/
```

### Database

First, start a database for local development:

```bash
docker-compose -f docker-compose.dev.yml up
```
Tip: if you want to completely restart and reset the database, use `docker-compose -f docker-compose.dev.yml down`


### Django API

Make sure to install the postgresql client libraries when you are not on Windows
to be able to install psycopg2.
Depending on the environment you have to do the following.

On a linux machine install postgresql client libs using the package manager. For example
on Ubuntu/Debian execute:

```bash
sudo apt install libpq-dev
```

On Mac install postgresql, for example with Homebrew:

```bash
brew install postgresql
```

This installs the entire server on your Mac as there is no separate package for just
the client part of PostgreSQL, but the server doesn't have to be running for this use case.
Also note that if you installed using Homebrew, you probably need to execute the following for psycopg2 to be able to
find all the necessary libs, see https://github.com/psycopg/psycopg2/issues/1200#issuecomment-770198398:

```bash
$ brew link openssl
Warning: Refusing to link macOS provided/shadowed software: openssl@1.1
If you need to have openssl@1.1 first in your PATH, run:
  echo 'export PATH="/opt/homebrew/opt/openssl@1.1/bin:$PATH"' >> ~/.zshrc

For compilers to find openssl@1.1 you may need to set:
  export LDFLAGS="-L/opt/homebrew/opt/openssl@1.1/lib"
  export CPPFLAGS="-I/opt/homebrew/opt/openssl@1.1/include"

For pkg-config to find openssl@1.1 you may need to set:
  export PKG_CONFIG_PATH="/opt/homebrew/opt/openssl@1.1/lib/pkgconfig"
```

First, set up a python virtual environment with python 3.8 and activate it.

Then install the python dependencies:

```bash
cd api && pip install -r requirements-dev.txt
```

> __*Note*__: If you already have `pip-tools` installed, or you have already installed a previous version of `requirements-dev.txt`, you can run `pip-sync requirements-dev.txt` instead of `pip install ...` to update your environment. This will also delete unneeded packages.

Run the migrations:
```bash
python manage.py migrate
```

Optionally load some development test data into the database, this can be done only once:

```bash
python manage.py loaddata core_testdata
```

The following step is not necessary if you have loaded the testdata. It syncs the API JSON files to your database.
This will be executed when the system is deployed. This can be run multiple times:

```bash
python manage.py sync_apis
```

You can now start the Django API (development version) with:

```bash
python manage.py runserver
```

If you want to run the python tests:

```bash
python manage.py test
```

If you want to run the python linter:

```bash
prospector
```


### Go Validator

To run the Go validator:

```bash
cd validate/ && go run cmd/don-validate/*.go
```

If you want to run the validator tests as a watcher, use:

```bash
modd -f test.conf
```


### Frontend

To start the frontend application:

```bash
cd ui/ && npm install && npm start
```
This command should automatically open a browser on [http://localhost:3000](http://localhost:3000/).


## Running with minikube

Run this project with minikube if you want to test changes to the helm charts or Dockerfiles locally.

### Install dependencies

* kubectl
* minikube
* helm

### Prepare your minikube cluster

1. Start minikube: `minikube start --cpus 4 --memory 8192 --disk-size=50G`
1. Configure docker to use minikube's docker daemon: `eval $(minikube docker-env)`
1. Add the official helm stable chart repo: `helm repo add stable https://kubernetes-charts.storage.googleapis.com/`
1. Add the traefik namespace: `kubectl create namespace traefik`
1. Install traefik: `helm install traefik stable/traefik --namespace traefik --values helm/traefik-values-minikube.yaml`
1. Install KubeDB. Follow the kubedb.com [instructions for installing using helm](https://kubedb.com/docs/0.12.0/setup/install/#using-helm).
1. Add the don-dev namespace: `kubectl create namespace don-dev`
1. Add minikube's hostnames to your `/etc/hosts` file so you can reach the services from your browser: `sh initialize-hostnames.sh`

Note: from now on, you only need to follow the first two steps to start and prepare minikube.

### Deploy to minikube
To deploy a new version to minikube, run these commands:
```bash
docker-compose build
```
```bash
helm upgrade --install don-dev ./helm/don --namespace don-dev --values helm/don/values.yaml --values helm/don/values-minikube.yaml
```

You can see your changes at: http://don.minikube:30080/

## Data model changes

The linkchecker uses a mock database for its tests. If you make changes to the data model (using django migrations) you should also update the test schema by running `pg_dump`:

    pg_dump -h localhost -U don don --no-owner --schema-only --schema=public --table=core_\* \
    | sed '/-- Dumped by /d' > linkchecker/testdata/testschema.sql

You may need to adjust the command to your local development setup. If you use the docker dev database you can run the `pg_dump` in the container with

    docker exec developeroverheidnl_database_1 pg_dump -U don don \
    --no-owner --schema-only -T django* -T auth* \
    | sed '/-- Dumped by /d' > linkchecker/testdata/testschema.sql

then you can be sure you have a `pg_dump` version matching the database. After dumping the database schema, commit the updated `linkchecker/testdata/testschema.sql`.

Don't worry: if you forget to do this, the pipeline will fail as a friendly reminder :)


Depending on the change, the development fixtures must be updated as well. You will find out soon enough if it is necessary, because again the pipeline will fail.

The fixtures can be (re)generated by executing the following command in the activated python environment.
Make sure to run this with a database containing proper data, because all data from the "core" models (except the excluded models)
will be dumped.


```bash
python manage.py dumpdata -e core.URLProbe -e core.DesignRuleResult --indent 2 core > core/fixtures/core_testdata.json
```


## Adding/updating dependencies

### Python

First, make sure your virtual environment is active.

#### New dependency

To include a new module dependency, add the module name to `requirements.in` (for production dependencies) or `requirements-dev.in` (for development and testing dependencies). Then update your dependencies.

#### Update dependencies

To update all dependencies to their newest versions, run

```bash
pip-compile requirements.in --generate-hashes
pip-compile requirements-dev.in --generate-hashes
pip-sync requirements-dev.txt
```

__*NB:*__ The order of the `pip-compile`'s is important!

If you updated your git repository and the new version has changes in the requirements files, also run the `pip-sync` command to synchronize your environment with the requirements files.

> __*Note*__: `pip-sync` will synchronize your environment with the requirements files, that means it will also delete any modules that are not listed in the requirements files. If you do not want that, run `pip install -r requirements-dev.txt` instead of `pip-sync`.

#### Dependency problems

When you update dependencies, it may happen that there is an unsolved bug in a new dependency version or that some required modules do not work together well. In that case you have a few options:
- Abort the upgrade and try again later. Often problems will be resolved by the package maintainers in short time.
- Add explicit constraints to `requirements*.in` to exclude the problematic versions.
- Modify the `requirements*.txt` files manually to select working versions. Note that you need to provide hashes for all packages.

### Javascript/Go

Todo

## Conventions for commit messages

### Conventional commits
We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This convention requires you to add a type and an optional scope to your commit message. The scope is based on the applications in the repository. If you are not sure which scope to use please leave the scope blank.

The type must be one of the following:

* **build**: Changes that affect the build system or external dependencies
* **ci**: Changes to our CI configuration files and scripts
* **data**: Changes to data files (for this repo, mostly API's stored in JSON files)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **revert**: Changes that revert other changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

The available scopes are:

* api
* ui
* helm
* linkchecker
* validator

### Issue number prefix
For branches that are linked to a Gitlab issue, the commit message should also be prefixed by the issue number.  The issue number comes after the conventional commit part.

Example: `feat(ui): #235 replace add buttons with links on small devices`
