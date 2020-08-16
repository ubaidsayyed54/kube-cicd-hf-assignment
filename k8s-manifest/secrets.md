Previously we use to store configuration with the help of Kubernetes is the usage of gitRepo volumes which requires access to git repo located outside the cluster which
needs to be monitored and managed seperatly further with new feature like init containers we ca copy secrets configuration into a shared local volume for feasiblity.

Depending on the number of configuration resource on organinzation manages I will use different styles to handle those secrets efficiently. As all secrets are base64 encoded
and they are encrypted when stored etcd however I will further add steps with respect to security as secret is distributed only to nodes running Pods that need access to them since we are using api keys
which are confidential by using vault deployment pattern supported for kubernetes. They are stored in memory in a tmpfs and never written to physical storage, and removed when the Pod is removed. 
I will apply role-based access control (RBAC) to Secrets and allow only certain Pods with predefined service accounts to read them for more granularity on secrets

I will also define secrets in a secret volume I will also encrypt secrets at rest as well using encryption config file by setting the --encryption-provider-config flag on the kube-apiserver 
to point to the location of the config file and then restarting the api server. 
