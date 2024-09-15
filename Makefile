# start
run:
	yarn dev

# deps
deps:
	rm -rf node_modules yarn.lock
	yarn install
# format
fmt:
	yarn biome format --write ./

# package manage
chmod:
	chmod +x scripts/install.sh
	chmod +x scripts/uninstall.sh

pi:
	scripts/install.sh

pui:
	scripts/uninstall.sh