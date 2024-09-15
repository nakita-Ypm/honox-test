# dependencies
DEPENDENCIES=./dependencies.txt
dependenciesPackages=$(tr '\n' ' ' < "$DEPENDENCIES")
yarn remove $dependenciesPackages
# devDependencies
DEVDEPENDENCIES=./devDependencies.txt
devDependenciesPackages=$(tr '\n' ' ' < "$DEVDEPENDENCIES")
yarn remove $devDependenciesPackages 