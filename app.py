#import flask
from flask import Flask 

print("Starting app.py...") #temporary print 

app = Flask(__name__) #creates web app


#defines the homepage route 
@app.route("/")
def home():
    return "IT Troubleshooting Lab is running! CTG will be back" 

    



if __name__ == "__main__":
    app.run(debug=True)