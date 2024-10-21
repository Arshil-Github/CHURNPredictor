# Customer Retention Prediction Model

This project aims to predict whether the customer stop doing business with a company or not.

### Techstack
- Machine Learning
  - Scikit Learn
  - Pandas, Numpy and Matplotlib
- Front end
  - React
  - Tailwind

## Dataset
This dataset is used for training this model : https://www.kaggle.com/datasets/muhammadshahidazeem/customer-churn-dataset
### Features
- Age
- Gender
- Tenure
- Usuage Frequency
- Support Calls
- Payment Delay
- Subscription Model
- Contract Length
- Total Spent Last Interaction Churn

### Correlation between features
![image](https://github.com/user-attachments/assets/a1f652c6-cc72-4754-9f7e-112866d7c957)

## Model Architecture
![image](https://github.com/user-attachments/assets/da190c20-cd6a-42e1-b013-ef3100d16a1e)
PreProcessor: MinMaxScaler

Model: SGD Classifier

Metrics: Precision, Recall, Accurac

## Results
This is the confusion matrix when using precision as refit matrix
![image](https://github.com/user-attachments/assets/508dd673-a916-4d28-ac95-6e9280b806ad)

This is the confusion matrix when using recall as refit matrix
![image](https://github.com/user-attachments/assets/8984ed06-e381-41b0-b312-7ab01fb5db21)


This is the confusion matrix when using accuracy as refit matrix
![image](https://github.com/user-attachments/assets/dec3af75-67bb-42a9-8500-7a86fa0982a7)

