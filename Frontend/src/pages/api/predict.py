from joblib import load
from sklearn.feature_extraction.text import CountVectorizer
import json

# Load the model
model = load('model.pkl')

def handler(request, response):
    try:
        # Get the input data from the request (assuming JSON input)
        input_data = json.loads(request.body.decode('utf-8'))
        
        print(input_data) 
        # Send back the response
        response.status(200).json({"answer": input_data})
    except Exception as e:
        response.status(500).json({"error": str(e)})