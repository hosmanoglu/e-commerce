#!/bin/bash
sleep 10
echo asdasd
mongosh --host mongo_cart:27017 <<EOF
  var cfg = {
    "_id": "myReplicaSetCart",
    "version": 1,
    "members": [
      {
        "_id": 0,
        "host": "mongo_cart:27017",
        "priority": 2
      }
    ]
  };
  rs.initiate(cfg);
EOF