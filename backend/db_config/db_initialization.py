import json
from dotenv import load_dotenv
from pymongo import MongoClient

with open('./db_config/db_config.json') as f:
    data = json.load(f)

with open('../environment.json') as f:
    env = json.load(f)

MONGO_URI = env["MONGO_URI"]
print(MONGO_URI)
client = MongoClient(MONGO_URI)

for db_info in data['databases']:
    db = client[db_info['name']]
    for col_info in db_info['collections']:
        db.create_collection(col_info['name'])