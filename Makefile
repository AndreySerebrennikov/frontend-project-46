.SILENT:

make gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run	

lint:
	npx eslint .	

test: 
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8	

install:
	npm ci