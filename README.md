### Prerequisites

Prerequisites: 
-Xcode (for Simulator)
-Expo

### Installation
1. Clone the github repo.
2. Install expo and all requiered packages (npm start)
3. Activate virtualenv and start Backend
4. On MAC/LINUX:
```sh
$ source env/bin/activate
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

