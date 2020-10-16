import json,os
from flask import Flask,json
from flask_cors import CORS
from flask import request
from flask import jsonify, make_response



app = Flask(__name__)
CORS(app)

        
@app.route('/Rest',methods=['GET'])
def get_temperature():
    # open file Json
    with open('names.json', 'r') as myfile:
        data=myfile.read()
        obj = json.loads(data)
        print(obj["Rest"])
    return str(obj["Rest"])

    
@app.route('/Vorrat',methods=['GET'])
def get_temperature():
    # open file Json
    with open('names.json', 'r') as myfile:
        data=myfile.read()
        obj = json.loads(data)
        print(obj["Vorrat"])
    return str(obj["Vorrat"])

 
    
@app.route('/Abfallreduzierung',methods=['GET'])
def get_temperature():
    # open file Json
    with open('names.json', 'r') as myfile:
        data=myfile.read()
        obj = json.loads(data)
        print(obj["Abfallreduzierung"])
    return str(obj["Abfallreduzierung"])



@app.route('/Wasserverbrauch',methods=['GET'])
def get_temperature():
    # open file Json
    with open('names.json', 'r') as myfile:
        data=myfile.read()
        obj = json.loads(data)
        print(obj["Wasserverbrauch"])
    return str(obj["Wasserverbrauch"])


@app.route('/Hallenummer',methods=['GET'])
def get_temperature():
    # open file Json
    with open('names.json', 'r') as myfile:
        data=myfile.read()
        obj = json.loads(data)
        print(obj["Hallenummer"])
    return str(obj["Hallenummer"])



@app.route('/Mechankername',methods=['GET'])
def get_temperature():
    # open file Json
    with open('names.json', 'r') as myfile:
        data=myfile.read()
        obj = json.loads(data)
        print(obj["Mechankername"])
    return str(obj["Mechankername"])

 

@app.route('/Reparatur',methods=['GET'])
def get_temperature():
    # open file Json
    with open('names.json', 'r') as myfile:
        data=myfile.read()
        obj = json.loads(data)
        print(obj["Reparatur"])
    return str(obj["Reparatur"])

 


@app.route('/Energieverbrauch',methods=['GET'])
def get_temperature():
    # open file Json
    with open('names.json', 'r') as myfile:
        data=myfile.read()
        obj = json.loads(data)
        print(obj["Energieverbrauch"])
    return str(obj["Energieverbrauch"])

 
   
@app.route('/Oelwechsel',methods=['GET'])
def get_temperature():
    # open file Json
    with open('names.json', 'r') as myfile:
        data=myfile.read()
        obj = json.loads(data)
        print(obj["Oelwechsel"])
    return str(obj["Oelwechsel"])

 
   
   
@app.route('/Defekt',methods=['GET'])
def get_temperature():
    # open file Json
    with open('names.json', 'r') as myfile:
        data=myfile.read()
        obj = json.loads(data)
        print(obj["Defekt"])
    return str(obj["Defekt"])

 
    
@app.route('/Machinennummer',methods=['GET'])
def get_temperature():
    # open file Json
    with open('names.json', 'r') as myfile:
        data=myfile.read()
        obj = json.loads(data)
        print(obj["Machinennummer"])
    return str(obj["Machinennummer"])



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



 


if __name__ == "__main__":
    app.run(debug=False) 
