from fastapi import FastAPI, APIRouter, HTTPException
from configrations import collection, client
from fastapi.middleware.cors import CORSMiddleware
from Database.models import solo
from Database.schemas import User 
from bson.objectid import ObjectId 


app = FastAPI()

router = APIRouter()


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@router.post("/")
async def create_user(user: User):
    try:
        doc = collection.insert_one(dict(user))
        return {"message" : "User created"}
    except Exception as e:
        return {"messsage" : "Some error occured", "detail":f"Some error occurred: {str(e)}"}
    
@router.get("/")
async def get_users():
    try:
        cursor = collection.find({})
        user_list = list(cursor) 
        
        users = []
        for doc in user_list:
            doc["_id"] = str(doc["_id"])
            users.append(doc)
        return users
    
    except Exception as e:
        raise {"messsage" : "Some error occured", "detail":f"Some error occurred: {str(e)}"}
    

@router.put("/{id}")
async def update_user(id: str, user:User):
    try:
        id = ObjectId(id)
        doc = collection.update_one({"_id": id}, {"$set": dict(user)})

        # $set is used to update the document. It takes a dictionary as an argument.
        # The keys of the dictionary are the fields that we want to update and the values are the new values for those fields.
    except Exception as e:
        return {"messsage" : "Some error occured", "detail":f"Some error occurred: {str(e)}"}
    

@router.delete("/{id}")
async def delete_user(id:str):
    try:
        id = ObjectId(id)
        doc = collection.delete_one({"_id": id})
    except Exception as e:
        return {"messsage" : "Some error occured", "detail":f"Some error occurred: {str(e)}"}

    
    
app.include_router(router)