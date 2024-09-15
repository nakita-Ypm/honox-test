# start
run:
	yarn dev

# package manage
chmod:
	chmod +x scripts/install.sh
	chmod +x scripts/uninstall.sh

pi:
	scripts/install.sh

pui:
	scripts/uninstall.sh