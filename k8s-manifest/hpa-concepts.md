There are three ways in which we can autoscale our clusters below are the descriptive of each type of scaling and steps involved while scaling our kubernetes cluster

Horizontal scaling by increasing and decreasing the number of Pod replicas, vertical scaling by changing resource requirements for Pods, 
and scaling the cluster itself by changing the number of cluster nodes. These actions can be performed manually(imperative) as well as (decalarative)

we explore how Kubernetes can perform scaling based on load automatically.
Identifying accurately how many resources a container will require, and how many replicas a service will need at a given time to meet SLA takes time and effort. Luckily, Kubernetes makes it easy to alter the resources of a container, the desired replicas for a service, or the number of nodes in the cluster. 
Such changes can happen either manually, or given specific rules, can be performed in a fully automated manner.
We can not only can preserve a fixed Pod and cluster setup, but also can monitor external metrics and capacity-related events, analyze the current state, and scale itself for the desired performance. 
 
There are two main approaches to scaling any application: horizontal and vertical. Horizontally equates to creating more replicas of a Pod. Vertically scaling implies giving more resources to running containers. 
creating an application configuration for autoscaling on a shared cloud platform without affecting other services and the cluster itself requires significant trial and error but below is the overview of all three strategies.


### Manual Horizontal Scaling 
The manual scaling approach is based on a human intervention issuing commands to Kubernetes can be used in the absence of autoscaling
An advantage of the manual approach is that it also allows proactivity rather than reactive-only changes: knowing the seasonality and the expected application load, 
We can scale it out in advance rather then waiting for actual load to be visualize on the graph.

### IMPERATIVE SCALING

Scaling a Deployment’s replicas on the command line
kubectl scale hf-nodejs-app --replicas=4

A controller such as ReplicaSet is responsible for making sure a specific number of Pod instances are always up and running. 
Thus, scaling a Pod is as trivially simple as changing the number of desired replicas. 
Given a Deployment named honestfood, scaling it to four instances can be done in one command, as shown in Example 24-1.

Scaling a Deployment’s replicas on the command line
kubectl scale hf-nodejs-app --replicas=4

### DECLARATIVE SCALING
scale command is simple and good for quick reactions to e, but it does not preserve this configuration outside the cluster. 
To avoid configuration drift and to introduce operational processes for backporting changes, 
it is a better practice to change the desired number of replicas declaratively in the ReplicaSet or some other 
definition and apply the changes to Kubernetes.

Using a Deployment for declaratively setting the number of replicas
kubectl apply -f deployment.yaml

We can only scale resources managing multiple Pods such as ReplicaSets, Deployments, and StatefulSets the resource which provide subresource endpoint 


Manual scaling styles (imperative and declarative) involves human internvention to observe or anticipate a change in the application load, make a decision on how much to scale, and apply it to the cluster. 
but they are not suitable for dynamic workload patterns that change often and require continuous adaptation.

### Horontal Pod Autoscaling

An HPA for the honestfood Deployment can be created with the command in Example 24-3. For the HPA to have any effect, 
it is important that the Deployment declare a .spec.resources.requests limit for the CPU as described. 
Another requirement is that you have the metrics server enabled, which is a cluster-wide aggregator of resource usage data.

Create HPA definition on the command line
kubectl autoscale deployment honestfood --cpu-percent=50 --min=1 --max=5


This definition instructs the HPA controller to keep between one and five Pod instances to retain an average Pod CPU usage of around 50% of the specified CPU resource limit in the Pod’s .spec.resources.requests declaration. 
Deployments create new ReplicaSets during updates but without copying over any HPA definitions. If you apply an HPA to a ReplicaSet managed by a Deployment, it is not copied over to new ReplicaSets and will be lost.
A better technique is to apply the HPA to the higher-level Deployment abstraction, which preserves and applies the HPA to the new ReplicaSet versions.

### Working of HPA
1.Retrieves metrics about the Pods that are subject to scaling according to the HPA definition. 
2.Calculates the required number of replicas based on the current metric value and targeting the desired metric value. 
Here is a simplified version of the formula:

The replicas field of the autoscaled resource will be updated with this calculated number and other controllers do their bit of work in achieving and keeping the new desired state


### Standard metrics
with .spec.metrics.resource[:].type equals to Resource and represent resource usage metrics such as CPU and memory and can be specificy as percentage
Custom metrics
.spec.metrics.resource[&#x2a;].type equals to Object or Pod require a more advanced cluster monitoring setup, which can vary from cluster to cluster
The custom metrics are served in an aggregated API Server under .metrics.k8s.io 
API path and are provided by different metrics adapters such as Prometheus, Datadog, Microsoft Azure, or Google Stackdriver.
External metrics
This category is for metrics that describe resources that are not a part of the Kubernetes cluster. For example, you may have a Pod that consumes messages from a cloud-based queueing service. 
Very often in such a scenario, you may want to scale the number of consumer Pods based on the queue depth.
Probably one of the most critical decisions around autoscaling is which metrics to use. For an HPA to be useful, there must be a direct correlation between the metric value and the number of Pod replicas. 
For example, if the chosen metric is of Queries-per-Second (such as HTTP requests per second) kind, increasing the number of Pods causes the average number of queries to go down as the queries are dispatched to more Pods.

### Vertical Pod Autoscaling
HPA is preferred over VPA as it doesnt hav big impact because all it is meant for stateless services.
VPA is used for stateful application and useful for tuning the resource of the container based on load patterns

Vertical scaling also has these kinds of challenges in identifying the correct requests and limits for a container

Update policy
Controls how VPA applies changes. The Initial mode allows assigning resource requests only during Pod creation time but not later
updateMode: Off
The value Off disables automatic changes to Pods

updateMode: Initial
VPA definition can also have a resource policy that influences how VPA computes the recommended resources

updateMode: Auto

HPA is using resource metrics such as CPU and memory and the VPA is also influencing the same values, you may end up with horizontally scaled Pods that are also vertically scaled (hence double scaling).

### Cluster autoscaling.
These option is usually provided by cloud providers in order to scale our nodes up and down.
Creating a cluster with autoscaling
```
gcloud container clusters create cluster-name --num-nodes 30 \
    --enable-autoscaling --min-nodes 15 --max-nodes 50 [--zone compute-zone]
```

Adding a node pool with autoscaling
```
gcloud container node-pools create pool-name --cluster cluster-name \
    --enable-autoscaling --min-nodes 1 --max-nodes 5 [--zone compute-zone]
```

Enabling autoscaling for an existing node pool
```
gcloud container clusters update cluster-name --enable-autoscaling \
    --min-nodes 1 --max-nodes 10 --zone compute-zone --node-pool default-pool
```

Disabling autoscaling for an existing node pool
```
gcloud container clusters update cluster-name --no-enable-autoscaling \
    --node-pool pool-name [--zone compute-zone --project project-id]
```