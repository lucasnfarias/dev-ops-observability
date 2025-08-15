# Dev Ops Observability

## App

Simple app using [NestJS](https://docs.nestjs.com/) initial template

## Open Telemetry

- [Official NodeJS Docs](https://opentelemetry.io/docs/languages/js/getting-started/nodejs/)
- [Docker image open-telemetry/opentelemetry-collector-contrib Github](https://github.com/open-telemetry/opentelemetry-collector-contrib)

## LGTM Stack

- [Loki](https://grafana.com/oss/loki/): for Logs
- [Grafana](https://grafana.com/oss/grafana/): to centralize, configure and visualize
- [Tempo](https://grafana.com/oss/tempo/): for Traces
- [Mimir](https://grafana.com/oss/mimir/): for Metrics

## Minio

Used to store our logs.
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
