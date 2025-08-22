NAMESPACE ?= app
CLUSTER_NAME ?= cluster-service-mesh

DOCKER_IMAGE_USER ?= lucasnfarias
DOCKER_IMAGE_NAME ?= app-service-mesh
DOCKER_IMAGE_VERSION ?= v1

STRESS_TEST_QPS ?= 6000
STRESS_TEST_TIME ?= 120s
STRESS_TEST_THREADS ?= 50

start-cluster:
	kind create cluster --config infra/kind.yaml
	kubectl cluster-info --context kind-${CLUSTER_NAME}
	kubectl create namespace ${NAMESPACE}
# install istio on the cluster (https://istio.io/latest/docs/setup/getting-started/#install)
	istioctl install
	kubectl label namespace app istio-injection=enabled --overwrite
	kubectl apply -f app/k8s -n ${NAMESPACE}
	kubectl apply -f infra/kiali.yaml
	kubectl get crd gateways.gateway.networking.k8s.io &> /dev/null || { kubectl kustomize "github.com/kubernetes-sigs/gateway-api/config/crd?ref=v1.3.0" | kubectl apply -f -; }
	kubectl apply -f infra/prometheus.yaml


delete-cluster:
	kind delete cluster --name ${CLUSTER_NAME}

build-push-docker-image:
	docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION} .
	docker tag ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION} ${DOCKER_IMAGE_USER}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION}
# docker login (if you're not logged in)
	docker push ${DOCKER_IMAGE_USER}/${DOCKER_IMAGE_NAME}

run-stress-test:
	-kubectl run -it fortio -n ${NAMESPACE} \
		--rm --image=fortio/fortio \
		-- load -qps ${STRESS_TEST_QPS} -t ${STRESS_TEST_TIME} -c ${STRESS_TEST_THREADS} \
		"http://app-ts-svc/example-k8s"

get-all-info:
	kubectl get all --all-namespaces
