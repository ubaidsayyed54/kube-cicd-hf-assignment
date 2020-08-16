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
gcloud container clusters create demo-cloudbuild --num-nodes 1 --zone us-central1-a --enable-autoscaling --min-nodes "1" --max-nodes "3"
```

#  


