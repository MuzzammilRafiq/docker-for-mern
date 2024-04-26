build-dev:
	docker build -t react-app-dev -f Dockerfile.dev .

###################

build-local:
	docker build \
		-t react-app-prod:local \
		--build-arg CADDYFILE=Caddyfile.local \
		--build-arg BASE_URL=http://localhost:3001/api \
		-f Dockerfile.prod .

###################

build-prod:
	docker build \
		-t react-app-prod:prod \
		--build-arg CADDYFILE=Caddyfile.production \
		--build-arg BASE_URL=https://mern.malikmuzzammilrafiq.com/api \
		-f Dockerfile.prod .