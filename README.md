# kube-cicd-hf-assignment



### Clone the repo
```
cd ~
git clone https://github.com/ubaidsayyed54/kube-cicd-hf-assignment.git
```

### Building the application and pushing to the docker hub
```
docker build -t ubaidsayyed/nodejs-app:1.0.0 .
docker push ubaidsayyed/nodejs-app:1.0.0
```

### Creating a GKE cluster with auto-scaling nodepool
```
#  cluster with autoscaling-on 
gcloud container clusters create hf-cicd-demo --num-nodes 1 --zone us-central1-a --enable-autoscaling --min-nodes "1" --max-nodes "3"

# connecting to the GKE cluster
gcloud container clusters get-credentials hf-cicd-demo --zone us-central1-a --project hf-cicd-project
```

### Configuring the cloudbuild 

![cloudbuild-1](https://github.com/ubaidsayyed54/kube-cicd-hf-assignment/blob/master/images/install-cloudbuild.png)


![cloudbuild-2](https://github.com/ubaidsayyed54/kube-cicd-hf-assignment/blob/master/images/cloudbuild-trigger1.png)

![cloudbuild-3](https://github.com/ubaidsayyed54/kube-cicd-hf-assignment/blob/master/images/cloudbuild-3.png)

![cloudbuild-4](https://github.com/ubaidsayyed54/kube-cicd-hf-assignment/blob/master/images/cloud-build-2.png)




