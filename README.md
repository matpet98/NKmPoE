### Prerequisites

Prerequisites: 
-Xcode (for Simulator)
-Expo
-Python

### Installation
1. Clone the github repo.
2. Install expo and all requiered packages (npm start)
3. Install requirements.txt
```sh
$ pip install -r requirements.txt
```
4. Now you have to copy the De-de folder with the german language-model to your pocketsphinx-data path:
If you have created a virtual env the path is: /YOUR_ENV/lib/python2.7/site-packages/speech_recognition/pocketsphinx-data/
5. Next you can start the Backend-server:
```sh
$ python main.py
```

Now you can run the app on the Simulator through Expo:

```sh
$ cd frontend/app
$ expo start
```
5. Start the Simulator from Xcode->Developer Tools
6. Choose "Run on Simulator" in the Metro Builder


### Running on your phone

Your phone and the Computer running the Backend must be in the same network!

1. Find out the local ip adress of your computer yourself  or go on "http://127.0.0.1:5000/ip"
2. Change const url = "http://YOUR_IP_ADRESS:5000/" in App.js

