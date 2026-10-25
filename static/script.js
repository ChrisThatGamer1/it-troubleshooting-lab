
document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".wizard-step");
    const progressSteps = document.querySelectorAll(".progress-step");
    const categoryCards = document.querySelectorAll(".category-card");

    const issueTypeOptions = document.getElementById("issue-type-options");
    const categoryInput = document.getElementById("category-input");
    const issueTypeInput = document.getElementById("issue-type-input");

    const selectedCategoryLabel =
        document.getElementById("selected-category-label");
    const summaryCategory = document.getElementById("summary-category");
    const summaryIssueType = document.getElementById("summary-issue-type");

    // Get the category data supplied by Flask through index.html.
    const troubleshootingData = JSON.parse(
    document.getElementById("troubleshooting-data").textContent
    );

    const issueTypes = troubleshootingData.issueTypes;
    const categoryNames = troubleshootingData.categoryNames;

    let selectedCategory = categoryInput?.value || "";
    let selectedIssueType = issueTypeInput?.value || "";

    function showStep(stepNumber) {
        steps.forEach(function (step) {
            step.hidden = Number(step.dataset.step) !== stepNumber;
        });

        progressSteps.forEach(function (step) {
            const number = Number(step.dataset.progress);

            step.classList.toggle("active", number === stepNumber);
            step.classList.toggle("completed", number < stepNumber);
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function updateSummary() {
        if (selectedCategoryLabel) {
            selectedCategoryLabel.textContent =
                categoryNames[selectedCategory] || "";
        }

        if (summaryCategory) {
            summaryCategory.textContent =
                categoryNames[selectedCategory] || "";
        }

        if (summaryIssueType) {
            summaryIssueType.textContent =
                issueTypes[selectedCategory]?.[selectedIssueType] || "";
        }
    }

    function populateIssueTypes() {
        issueTypeOptions.replaceChildren();

        const options = issueTypes[selectedCategory] || {};

        Object.entries(options).forEach(function ([value, label]) {
            const button = document.createElement("button");

            button.type = "button";
            button.className = "issue-type-card";
            button.textContent = label;

            button.addEventListener("click", function () {
                selectedIssueType = value;
                categoryInput.value = selectedCategory;
                issueTypeInput.value = selectedIssueType;

                updateSummary();
                showStep(3);

                document.getElementById("issue")?.focus();
            });

            issueTypeOptions.appendChild(button);
        });
    }

    categoryCards.forEach(function (card) {
        card.addEventListener("click", function () {
            selectedCategory = card.dataset.category;
            selectedIssueType = "";

            categoryInput.value = selectedCategory;
            issueTypeInput.value = "";

            populateIssueTypes();
            updateSummary();
            showStep(2);
        });
    });

    document.querySelectorAll("[data-back]").forEach(function (button) {
        button.addEventListener("click", function () {
            const targetStep = Number(button.dataset.back);

            if (targetStep === 1) {
                selectedIssueType = "";
                issueTypeInput.value = "";
            }

            showStep(targetStep);
        });
    });

    // Restore the relevant step if Flask returned a validation error.
    const hasServerError = Boolean(
        document.querySelector(".alert")
    );

    if (hasServerError && selectedCategory && issueTypes[selectedCategory]) {
        populateIssueTypes();
        updateSummary();

        if (selectedIssueType && issueTypes[selectedCategory][selectedIssueType]) {
            showStep(3);
        } else {
            showStep(2);
        }
    } else {
        showStep(1);
    }
});
