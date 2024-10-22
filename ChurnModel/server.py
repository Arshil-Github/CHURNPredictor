from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import joblib
import pandas as pd
import sklearn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows only the defined origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, etc.)
    allow_headers=["*"],  # Allows all headers
)
with open("model_encoded.pkl", "rb") as f:
        model = joblib.load(f)

with open("encoder.pkl", "rb") as f:
        encoder = joblib.load(f)


class ChurnParameters(BaseModel):
     age: int
     gender: str
     tenure: int
     usuage_frequency: int
     support_call: int
     payment_delay: int
     contract_length: str
     subscription_type: str
     total_spend : int
     last_interaction : int
    
def pre_processing(data):
    #data is a an object
    df = pd.DataFrame(data, index=[0])
    df1 = df.replace({'Female': 0, 'Male': 1})
    cols_encoded = encoder.transform(df1[['Subscription Type', 'Contract Length']])
    df2 = pd.concat([df1.drop(['Subscription Type', 'Contract Length'], axis=1), cols_encoded], axis=1)
    return df2

def make_data(parameters : dict):  
    data = {
            "Age": parameters['age'],
            "Gender": parameters['gender'],
            "Tenure": parameters['tenure'],
            "Usage Frequency": parameters['usage_frequency'],
            "Support Calls": parameters['support_call'],
            "Payment Delay": parameters['payment_delay'],
            "Contract Length": parameters['contract_length'],
            "Subscription Type": parameters['subscription_type'],
            "Total Spend": parameters['total_spend'],
            "Last Interaction": parameters['last_interaction']
    }
    return data

# data = make_data(ChurnParameters(
#     age = 25,
#     gender= "Male",
#     tenure= 3,
#     usuage_frequency= 2,
#     support_call= 1,
#     payment_delay= 2,
#     contract_length= "Monthly",
#     subscription_type= "Standard",
#     total_spend= 100,
#     last_interaction= 2
# ))

@app.get("/")
def read_root():
    return {"message": "Welcome to the Churn Prediction API"}

@app.post("/predict")
def predict_churn(parameters : dict):
    # Placeholder for prediction logic
    data = make_data(parameters)
    pre_processed_data = pre_processing(data)
    prediction = model.predict(pre_processed_data)
    return {"prediction": str(prediction[0])}

if __name__ == "__main__":
    uvicorn.run(app, port=8000)