import joblib

# Load the model
with open('model.pkl', 'rb') as model_file:
    model = joblib.load(model_file)
