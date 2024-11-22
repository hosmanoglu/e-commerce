#!/bin/bash
sleep 10
echo asdasd
mongosh --host cart_mongo1:27017 <<EOF
  var cfg = {
    "_id": "myReplicaSetcart",
    "version": 1,
    "members": [
      {
        "_id": 0,
        "host": "cart_mongo1:27017",
        "priority": 2
      },
      {
        "_id": 1,
        "host": "cart_mongo2:27017",
        "priority": 0
      },
      {
        "_id": 2,
        "host": "cart_mongo3:27017",
        "priority": 0
      }
    ]
  };
  rs.initiate(cfg);
EOF