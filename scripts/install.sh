DEPENDENCIES=./dependencies.txt
dependenciesPackages=$(tr '\n' ' ' < "$DEPENDENCIES")
yarn add $dependenciesPackages
# devDependencies
DEVDEPENDENCIES=./devDependencies.txt
devDependenciesPackages=$(tr '\n' ' ' < "$DEVDEPENDENCIES")
yarn add -D $devDependenciesPackages