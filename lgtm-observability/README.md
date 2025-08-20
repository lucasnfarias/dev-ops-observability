# LGTM Observability

Educational project to learn more about Observability using LGTM Stack.

## App & App-2

Simple apps using [NestJS](https://docs.nestjs.com/) to test custom logs, traces and metrics.

### How to run

```sh
# create minio folder
mkdir -p data/minio

# copy .env.example to .env
cp .env.example .env

# run LGTM stack services
docker compose up --build -d

# go to applications folders, install deps and run app
cd app && cp .env.example .env && nvm use && npm i && npm run start:dev
cd app-2 && cp .env.example .env && nvm use && npm i && npm run start:dev

# try fetching some endpoints to create logs, traces and metrics
# e.g. GET /, /users, /metric-test

# access grafana on http://localhost:3000
# access minio on http://localhost:9001
```

## Stacks

### Open Telemetry

Used to collect and export our logs, traces and metrics.

We integrate it with our NestJS app using many libs from `@opentelemetry`. You can check `app/src/tracer.ts` to check whick libs where used.

- [Official NodeJS Docs](https://opentelemetry.io/docs/languages/js/getting-started/nodejs/)
- [Docker image open-telemetry/opentelemetry-collector-contrib Github](https://github.com/open-telemetry/opentelemetry-collector-contrib)

### Pino

We used [Pino](https://github.com/pinojs/pino) to standardize our logs.

### LGTM Stack

- [Loki](https://grafana.com/oss/loki/): for Logs
- [Grafana](https://grafana.com/oss/grafana/): to centralize, configure and visualize
- [Tempo](https://grafana.com/oss/tempo/): for Traces
- [Mimir](https://grafana.com/oss/mimir/): for Metrics

### Minio

Used to persist our logs.
https://www.min.io/

## Concepts

## Team Metrics

- MTTD: Mean Time To Detect
- MTTR: Mean Time To Repair

### Golden Signals

- Latency: ms
  - consider async vs. sync and circuit breaker (e.g. istio)
- Traffic: RPS and RPM
- Errors
- Saturation
  - Lack of resources: CPU, Memory, RAM, ...

## Troubleshooting

### Error ECCONREFUSED ::1:4318

**Solution:** `export OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:4318`
