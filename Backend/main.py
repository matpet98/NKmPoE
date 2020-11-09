import json,os
from flask import Flask,json
from flask_cors import CORS, cross_origin
from flask import request
from flask import jsonify, make_response
from recog import process_audio
import csv


app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


#loading and prep dataset
dataset=[]
with open('telemetry_data.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        dataset.append(row)
dataset.pop(0)


#ts,co,humidity,light,lpg,motion,smoke,temp

def get_calc_data(number):
    result=0.0
    if (number==3):
        return dataset[0][3]
    elif (number==5):
        return dataset[0][5]
    for row in dataset:
        result+=float(row[number])
    return result/len(dataset)


#7
@app.route('/temperatur',methods=['GET'])
def get_temperature():
    return str(round(get_calc_data(7),2))

#1
@app.route('/kohlenstoffmonoxid',methods=['GET'])
def get_kohlenstoffmonoxid():
    return str(round(get_calc_data(1),5))

#2
@app.route('/luftfeuchtigkeit',methods=['GET'])
def get_luftfeuchtigkeit():
    return str(round(get_calc_data(2),2))

#3
@app.route('/licht',methods=['GET'])
def get_licht():
    x=get_calc_data(3)
    if x:
        return "AN"
    else:
        return "AUS"

#4
@app.route('/fluessiggas',methods=['GET'])
def get_fluessiggas():
    return str(round(get_calc_data(4),5))

#5
@app.route('/bewegung',methods=['GET'])
def get_bewegung():
    x=get_calc_data(5)
    if x:
        return "AN"
    else:
        return "AUS"

#6
@app.route('/rauch',methods=['GET'])
def get_rauch():
    return str(round(get_calc_data(6),5))

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
