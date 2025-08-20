# Dev Ops Observability

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

### Istio

- Custom Resource Definition (CRD) inside Kubernetes
  - It extends k8s API built-in features
- Open source created by IBM, Google and Lyft
- Maintained by CNCF (Cloud Native Computing Foundation)
- Function as sidecar or on ambient mode (since 2022)
- There are many add-ons to add new functionalities
- Layers: Control and Data Plane
- Implementation can be multi cluster and/or multi-tenant inside the same cluster

#### Envoy Proxy

- Developed by Lyft and currently, maintained by CNCF
- high performance proxy
- Acts on TCP and HTTP/gRPC layers
- Totally decoupled from the app
- High network abstraction
- Acts on Istio's Data Plane layer

#### Control Plane

- `istiod`
  - It's the brain of Istio
  - Converts high leve to low level - between config and proxy
  - Defines policies of traffic and routing
  - Pilot: responsible for the configuration of Envoy proxies
  - Citadel: security management (manage certificates and identity accesses)
  - Galley: config validator and distributer

#### Data Plane

- Envoy proxies inside clusters
- Implemented aside each service's instance (Pod will run the app and sidecar container)
- Intercepts all traffic coming in and out
- Responsible for telemetry collection
- Interprets the policies implemented by Control Plane
- When on Ambient Mode:
  - It gets divide in 2 layers: Security and Proxy L7
  - Sidecar concept doesn't exists, so there won't be a container running aside from service's instances (Pod will run only the app container)
  - Istio execution happens for each Node
  - Reduces your cluster's resource consumption (since you won't need a sidecar container running for each Pod)

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

### Service Mesh

- Infrastructure layer that facilitates the communication between services
- With this you can remove this feature from your application code (e.g. SRE teams deal with this)
- Ideal for Microservices scenario
- Commonly used with Kubernetes (other example: Nomad)
- Examples of Tools:
  - Linkerd
  - Cilium Service Mesh
  - Istio (we will use this one)
    - Most common
    - Very complete tool which is good because works for many areas and bad because it's harder to maintain and configure (more complex)

### Sidecar

- Works as a proxy that runs next to the application.
- All traffic to the application goes through the proxy before reaching the app
- Architecturally is 100% isolated from the app
- On Kubernetes, we would run a pod with 2 containers: App and Sidecar containers

### Kubernetes

- We need to install Istio on Kubernetes directly via kubectl or package manager helm
- Enable automatic injection on namespaces
- Injection happens on admission webhook (you can also use `istioctl`)
- Istio uses Kubernetes API to discover services
- All Istio components are visible within namespace `istio-system`

### mTLS (Mutual Transport Layer Security)

- Traditional TLS (HTTPS):
  - In standard TLS, the server presents a certificate to the client to prove its identity. The client then verifies this certificate against a trusted Certificate Authority (CA).
- mTLS takes this a step further by requiring the client to also present a certificate to the server, which the server then verifies.

## Troubleshooting

### Error ECCONREFUSED ::1:4318

**Solution:** `export OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:4318`
