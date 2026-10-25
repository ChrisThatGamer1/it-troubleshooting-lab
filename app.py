#import flask
from flask import Flask, render_template, request

print("Starting app.py...") #temporary print 

app = Flask(__name__) #creates web app

# Available categories and their supported issue types.
ISSUE_TYPES = {
    "device": {
        "slow_computer": "Computer is running slowly",
        "app_crashing": "Application keeps crashing",
        "hardware": "Hardware or peripheral problem",
        "other_device": "Other device or software issue",
    },

    "network": {
        "wifi": "Wi-Fi will not connect",
        "no_internet": "No internet access",
        "VPN": "VPN connection failure",
        "slow_network": "Slow network connection",
        "other_network": "other network issue",
    },

    "account": {
        "password": "Password reset",
        "locked_account": "Account is locked",
        "permissions": "Access or permission problem",
        "other_account": "Other account issue",
    },

    "email": {
        "email_access": "Cannot access email",
        "calendar": "Calendar problem",
        "teams": "Microsoft Teams problem",
        "other_email": "Other email or collaboration issue",
    },
}

CATEGORY_NAMES = {
    "device": "Device or software",
    "network": "Network",
    "account": "Account & access",
    "email": "Email & collaboration",
}


@app.route("/", methods=["GET", "POST"])
def home():
    error = ""
    submitted = False

    category = ""
    issue_type = ""
    issue = ""

    if request.method == "POST":
        category = request.form.get("category", "").strip()
        issue_type = request.form.get("issue_type", "").strip()
        issue = request.form.get("issue", "").strip()

        if category not in ISSUE_TYPES:
            error = "Please select a valid issue category."

        elif issue_type not in ISSUE_TYPES[category]:
            error = "Please select a valid issue type."

        elif not issue:
            error = "Please describe your technical issue."

        if not error:
            submitted = True

    # This return must be outside the POST block.
    # It handles both GET and POST requests.
    return render_template(
        "index.html",
        categories=CATEGORY_NAMES,
        issue_types=ISSUE_TYPES,
        category=category,
        issue_type=issue_type,
        issue=issue,
        error=error,
        submitted=submitted,
    )
    
if __name__ == "__main__":
    app.run(debug=True)