### Scalable service with k8s HPA

We can scale kuberetes cluster using a custom metrics adapter and using google cloudmonitor. We will deploy custom metrics adapter and then scrape from within
our application code number of http request to a custom metrics and when threshold breaches pods autoscales.

#### Step 2: Deploying the GKE cluster
Set the default zone for the gcloud command-line tool:
```
gcloud config set compute/zone zone
```

Set the PROJECT_ID environment variable to your Google Cloud project ID (project-id):
```
export PROJECT_ID=<project-id>
```

Set the default zone for the gcloud command-line tool:
```
gcloud config set project $PROJECT_ID
```

Creating a GKE cluster
```
gcloud container clusters create metrics-autoscaling
```

#### Step 2: Deploy the Custom Metrics Adapter

The Custom Metrics Adapter allows our cluster to send and receive metrics with Cloud Monitoring.
Grant your user the ability to create required authorization roles:
```
kubectl create clusterrolebinding cluster-admin-binding \
    --clusterrole cluster-admin --user "$(gcloud config get-value account)"
```

Deploy the new resource model adapter on your cluster:
```
kubectl apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/k8s-stackdriver/4ed2ef2a60
```

#### Step 3: Deploy an application with metrics
In this case we are using custom metrics which will scrape the qps count to cloud monitor in our node.js application 
```
kubectl apply -f hpa-deployment.yaml
```


#### Step 4: Generate the load for testing the autoscaling action
```
kubectl run -it --rm --restart=Never loadgenerator --image=busybox -- sh -c "while true; do wget -O - -q http://<load-balancer-ip-for-nodejs-app>/;done"
```