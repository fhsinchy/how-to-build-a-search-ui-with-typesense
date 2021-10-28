# Building a Search UI with Typesense

```shell

# spin up Typesense container
docker container run \
    --publish 8108:8108 \
    --detach \
    --volume /home/shovik/typesense/data:/data typesense/typesense:0.21.0 \
    --data-dir /data \
    --api-key=vaqcyr27eJ

# index data
cd server 
npm install
node data/indexer.js

# start client
cd client
npm install
npm run serve

http://localhost:8080/
```
