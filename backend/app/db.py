import firebase_admin
from firebase_admin import credentials, firestore, auth

# Initialize Firebase with Service Account
cred = credentials.Certificate("firebase_config.json")
firebase_admin.initialize_app(cred)

# Firestore DB
db = firestore.client()
