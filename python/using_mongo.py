import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
print(myclient.list_database_names())
mydb=myclient["QUIZ_DB"]
print(mydb.list_collection_names())
mycol = mydb["customers"]
mydict = { "name": "John", "address": "Highway 37" }

x = mycol.insert_one(mydict)
print(x.inserted_id) 
# print(mydb.list_collection_names())
