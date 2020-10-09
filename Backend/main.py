import json,os
from flask import Flask,json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



@app.route('/temperatur',methods=['GET'])
def get_temperature():
    # open file Json
    with open('names.json', 'r') as myfile:
        data=myfile.read()
        obj = json.loads(data)
        print(obj)
    return str(obj["Temperatur"])









if __name__ == "__main__":
    app.run(debug=True)
