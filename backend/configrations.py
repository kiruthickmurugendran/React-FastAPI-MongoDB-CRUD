from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


# Ensure password here
uri = "mongodb+srv://user:password@cluster0.rw6bt1o.mongodb.net/?appName=Cluster0"

client = MongoClient(uri, server_api=ServerApi('1'))

# the above codes has been copied from atlas documentation

db = client.UserDB

collection = db.userCollection