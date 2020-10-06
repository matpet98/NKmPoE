import json,os
from flask import Flask,json
from flask_restful import Api, Resource

app = Flask(__name__)
api =  Api(app)


# open file Json
with open('names.json', 'r') as myfile:
    data=myfile.read()

# parse file 
obj = json.loads(data)


class gettheobject(Resource):
  def get(self, name):
  
    return obj[name]

 


api.add_resource(gettheobject,"/op/<string:name>/")

if __name__ == "__main__":
    app.run(debug=False) 
