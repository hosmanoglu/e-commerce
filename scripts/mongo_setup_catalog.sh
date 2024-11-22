#!/bin/bash
sleep 10
echo asdasd
mongosh --host mongo_catalog:27017 <<EOF
  var cfg = {
    "_id": "myReplicaSetCatalog",
    "version": 1,
    "members": [
      {
        "_id": 0,
        "host": "mongo_catalog:27017",
        "priority": 2
      }
    ]
  };
  rs.initiate(cfg);
EOF