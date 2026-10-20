// Add the default promt. 
const placeholder = document.createElement("option");
placeholder.value ="";
placeholder.textContent = options.length
    ? "Select a specific issue"
    : "Choose a category first";

issueTypeSelect.appendChild(placeholder);

// Add issues for the selected category.
options.forEach(function (optionData) {
    const option = document.createElement("option");
    option.value = optionData[0];
    option.textContext = optionData[1];


    issueTypeSelect.appendChild(option);

});