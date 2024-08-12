from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer
from typing import List, Dict

# Hugging Face 모델 로드
def load_model(model_name: str):
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSequenceClassification.from_pretrained(model_name)
    return pipeline('text-classification', model=model, tokenizer=tokenizer)

# 현재 사용 중인 모델들 초기화
models: Dict[str, pipeline] = {}

def add_model(task: str, model_name: str):
    models[task] = load_model(model_name)

def predict_priority(task: str, task_list: List[str]):
    if task not in models:
        raise ValueError(f"Model for task '{task}' is not set.")
    model = models[task]
    predictions = model(task_list)
    return predictions

def list_models():
    return list(models.keys())

def get_model(task: str):
    return models.get(task, None)
