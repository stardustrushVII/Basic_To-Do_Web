// (C) 2025 Stardust Softworks
let items = [];
const inputBox = document.getElementById("itemInput");
const addButton = document.getElementById("addButton");
let list = document.getElementById("itemList");
let li = document.createElement("li");
const STORAGE_KEY = "todoItems";

function save() {
    localStorage.setItem("todoItems", JSON.stringify(items));
}





addButton.addEventListener("click", function() {
    let userText = inputBox.value;
    let text = inputBox.value.trim();
    if (text === "") {
        alert("Please enter a valid item, for goodness sake!");
        return; // user feedback for empty input::error handled
    }
    if (items.includes(text)) {
        alert("This item is already in the list!");
        return; // user feedback for duplicate item::error handled
    }
    if (text.length > 255) {
        alert("Item is too long! Please limit to 255 characters.");
        return; // user feedback for too long item::error handled
    }

    const newItem = {
        text: text,
        completed: false // default state not completed
    }

    const li = document.createElement("li");
    li.textContent = text;
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        newItem.completed = !newItem.completed; // toggle completed state
        save(); // save to local on toggle
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const index = items.findIndex((item) => item.text === newItem.text);
        if (index > -1) items.splice(index, 1); // remove item from array
        save(); // save to local
        li.remove(); // remove item from list
    })


    li.appendChild(deleteBtn);
    list.appendChild(li);
    items.push(newItem); // add to array
    save(); // save to local 



    inputBox.value = ""; // clears input box after adding item
    inputBox.focus(); // Keep the focus on the input box for convenience
    
    
    console.log(userText);
    console.log(text);
    console.log("All Items", items);
})

inputBox.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return; // don't fire for every key!
        
        addButton.click();
});

// Load items from localStorage
function load() {
    const savedItems = localStorage.getItem("todoItems");
    if (savedItems) {
        items = JSON.parse(savedItems);
        for (const item of items) {
            const li = document.createElement("li");
            li.textContent = item.text;
            if (item.completed) {
                li.classList.add("completed"); // Apply the "completed" class if the item is marked as completed
            }

            li.addEventListener("click", () => {
                li.classList.toggle("completed");
                item.completed = !item.completed; // Update the completed state
                save(); // Save the updated state
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const index = items.findIndex((i) => i.text === item.text);
                if (index > -1) items.splice(index, 1); // Remove the item from the array
                save(); // Save the updated array
                li.remove(); // Remove the item from the DOM
            });

            li.appendChild(deleteBtn);
            list.appendChild(li);
        }
    }
}

load(); // load items on page load

