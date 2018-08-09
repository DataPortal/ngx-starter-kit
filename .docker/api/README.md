API
===
Deploying coord-angular API

### Build
```bash
# build app docker image
docker build --tag=coord-angular-api -f .docker/api/prod.dockerfile . 
```

### Run
```bash
docker run -it --env TYPEORM_HOST=localhost -p 3000:3000  coord-angular-api
```

### Test

> The app will be available at http://localhost:3000

```bash
# test
curl -v -X GET \
  http://localhost:3000/myapi/tenant \
| jq .
```


### Deploy

#### Docker Push
```bash
# login to hub.docker.com to push docker image
docker login

# tag
docker tag coord-angular-api xmlking/coord-angular-api:0.1.4-SNAPSHOT
docker tag xmlking/coord-angular-api:0.1.4-SNAPSHOT  xmlking/coord-angular-api:latest

# push
docker push xmlking/coord-angular-api:0.1.4-SNAPSHOT
docker push xmlking/coord-angular-api:latest
```

#### OpenShift Deployment
> Deploy coord-angular-api to OpenShift

```bash
# login
oc login <my OpenShift URL>
# oc login  https://console.starter-us-west-1.openshift.com
oc project coord-angular
cd .docker/api

# create app (first time deployment)
oc new-app -f api.tmpl.yml -p APPNAME=coord-angular-api -n coord-angular

# follow next steps if you want completely delete and deploy.
# delete only deploymentConfig
oc delete all -l app=coord-angular-api -n coord-angular

# delete fully
oc delete all,configmap,secret -l app=coord-angular-api -n coord-angular

# redeploy
# From OpenShift Console UI
Applications > Deployments > coord-angular > Deploy 
```
 

