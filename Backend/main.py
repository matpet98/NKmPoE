import json,os
from flask import Flask,json
from flask_cors import CORS
from flask import request
from flask import jsonify, make_response
from recog import process_audio


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

@app.route('/voice', methods = ['POST'])
def get_transcipt_audio():
    if request.method == 'POST':
        #extract file from POST BODY
        data = request.files
        print(data["file"])
        #Save file for processing it
        data["file"].save("one.wav")
        #process file
        result=process_audio("one.wav")
        print(result)
        return make_response(jsonify(result), 201)





if __name__ == "__main__":
    app.run(debug=True)
