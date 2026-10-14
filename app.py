#import flask
from flask import Flask, render_template, request 

print("Starting app.py...") #temporary print 

app = Flask(__name__) #creates web app


#defines the homepage route 
@app.route("/", methods=["GET", "POST"])
def home():
    issue = ""

    if request.method == "POST":
        issue = request.form.get("issue", "")

    return render_template("index.html", issue=issue)

    

if __name__ == "__main__":
    app.run(debug=True)