# Service Mesh

Educational project to learn more about Service Mesh using Istio

## App & App-2

Simple apps using [NestJS](https://docs.nestjs.com/) to test service mesh.

### How to run

```sh
# create cluster, install istio and run app deployment
make start-cluster

# forward port for kiali and check it on http://localhost:4000
kubectl port-forward service/kiali -n istio-system 4000:20001

# delete cluster
make delete-cluster
```

## Kubernetes commands

```sh
# check istio
kubectl get pods -n istio-system

# get all info from app namespace
kubectl get all -n app

# get pod logs
kubectl logs {POD_NAME} -n app

# delete resources
kubectl delete -f k8s -n app

# forward port from pod
kubectl port-forward {POD_NAME} -n app 8080:3000

# forward port for kiali
kubectl port-forward service/kiali -n istio-system 4000:20001

# get current namespace config
kubectl get ns app -o yaml
```

## Stacks

### Kubernetes

- We need to install Istio on Kubernetes directly via kubectl or package manager helm
- Enable automatic injection on namespaces
- Injection happens on admission webhook (you can also use `istioctl`)
- Istio uses Kubernetes API to discover services
- All Istio components are visible within namespace `istio-system`

### Istio

https://istio.io/latest/docs/overview/quickstart/

- Custom Resource Definition (CRD) inside Kubernetes
  - It extends k8s API built-in features
- Open source created by IBM, Google and Lyft
- Maintained by CNCF (Cloud Native Computing Foundation)
- Function as sidecar or on ambient mode (since 2022)
- There are many add-ons to add new functionalities
- Layers: Control and Data Plane
- Implementation can be multi cluster and/or multi-tenant inside the same cluster

#### Kiali

Kiali is a console for Istio service mesh.

We used this config to setup it:
https://github.com/istio/istio/blob/master/samples/addons/kiali.yaml

#### Prometheus

Responsible for collecting metrics.

#### Jaeger

Responsible for traces.

https://github.com/istio/istio/blob/master/samples/addons/jaeger.yaml

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

#### VirtualService

- Manage Traffic config on infra layer instead of application layer
  - Timeout, retry, request flow,...
- A layer above kubernetes traffic layer

#### DestinationRile

- Define your subsets
- What application will be the host that receives the requests

#### Ambiente Mode

- `--set profile=ambient`
- Without sidecar
- More efficient

## Concepts

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

### mTLS (Mutual Transport Layer Security)

- Traditional TLS (HTTPS):
  - In standard TLS, the server presents a certificate to the client to prove its identity. The client then verifies this certificate against a trusted Certificate Authority (CA).
- mTLS takes this a step further by requiring the client to also present a certificate to the server, which the server then verifies.

### Circuit Breaker

- Design patter to protect your system
- Avoid some application blocking others

### Canary Deployment

- Gradual transition between app versions
- Sticky sessions to maintain user accessing the same version while it's receiving traffic
- Istio can do it, but it is not the go-to
- Tools specific for this: Argo, Rollouts, Flagger
