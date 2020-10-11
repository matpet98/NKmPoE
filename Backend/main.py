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
        print(obj["Temperatur"])
    return str(obj["Temperatur"])

@app.route('/wartungszeit',methods=['GET'])
def get_wartungszeit():
    # open file Json
    with open('names.json', 'r') as myfile:
        data=myfile.read()
        obj = json.loads(data)
        print(obj["Wartungszeit"])
    return str(obj["Wartungszeit"])

@app.route('/machinennummer',methods=['GET'])
def get_machinennummer():
    # open file Json
    with open('names.json', 'r') as myfile:
        data=myfile.read()
        obj = json.loads(data)
        print(obj["Machinennummer"])
    return str(obj["Machinennummer"])





if __name__ == "__main__":
    app.run(debug=True)
