from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import json
from model import predict_priority, add_model, list_models, get_model

app = FastAPI()

class Task(BaseModel):
    title: str
    duration: int
    timestamp: int

class TaskList(BaseModel):
    tasks: List[Task]

class ModelRequest(BaseModel):
    task: str
    model_name: str

@app.post("/predict_priority/{task}")
async def predict_priority_route(task: str, task_list: TaskList):
    try:
        tasks = [task.title for task in task_list.tasks]
        response = predict_priority(task, tasks)
        return {"priority": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/set_model")
async def set_model_route(request: ModelRequest):
    try:
        add_model(request.task, request.model_name)
        return {"status": "Model set successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/models")
async def list_models_route():
    try:
        models = list_models()
        return {"models": models}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/model/{task}")
async def get_model_route(task: str):
    try:
        model = get_model(task)
        if model is None:
            raise HTTPException(status_code=404, detail="Model not found")
        return {"model": model.model_name}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# To run the FastAPI server, use: uvicorn fastapi_app:app --reload
