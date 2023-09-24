let result = document.getElementById("result");
let length = document.getElementById("length");
let checkBoxes = Array.from(document.querySelectorAll("input[type=checkbox]"));
let hardness = document.getElementById("hardness");
let spans = document.querySelectorAll(".hardness span");

const AlphabetLower = 'abcdefghijklmnopqrstuvwxyz'.split('');
const AlphabetUpper = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
const Numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const Symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "=", "-", "_", "/", "<", ">", "?", ";", "'", '"', "[", "]", "{", "}", "`", ":", "\\", "~", ".", ","];

class Password {
    constructor(upper, lower, number, symbol, length) {
        this.upper = upper || false;
        this.lower = lower || true;
        this.number = number || true;
        this.symbol = symbol || false;
        this.length = length || 10;
    }
    generate() {
        let password = "";
        let all = [];
        if (password1.lower) {
            all.push(...AlphabetLower);
        }
        if (password1.upper) {
            all.push(...AlphabetUpper);
        }
        if (password1.number) {
            all.push(...Numbers);
        }
        if (password1.symbol) {
            all.push(...Symbols);
        }
        if (all.length > 0) {
            for (let i = 0; i < password1.length; i++) {
                password += all[Math.floor(Math.random() * all.length)];
            }
        } else {
            return "";
        }
        return password;
    }
}

let password1 = new Password();

// update checkboxes
checkBoxes.forEach(elem => {
    elem.addEventListener("change", (e) => {
        if (elem.hasAttribute("checked")) {
            password1[e.target.name] = false;
            elem.removeAttribute("checked");
        } else {
            password1[e.target.name] = true;
            elem.setAttribute("checked", "");            
        }
    });
});

// remove old styles from spans for hardness
function remove() {
    for (let i = 0; i < spans.length; i++) {
        spans[i].classList = "";
    }
}


// update length of the password
length.oninput = () => {
    password1.length = length.value;
    length.previousElementSibling.textContent = length.value;

    if (password1.length < 7) {
        remove();
        spans[0].classList.add("weak");
        hardness.textContent = "TOO WEAK!";
    } else if (password1.length >= 7 && password1.length < 14) {
        remove();
        spans[0].classList.add("medium");
        spans[1].classList.add("medium");
        hardness.textContent = "medium";
    } else {
        remove();
        spans[0].classList.add("strong");
        spans[1].classList.add("strong");
        spans[2].classList.add("strong");
        spans[3].classList.add("strong");
        hardness.textContent = "strong";
    }

    let percent = (password1.length / 20) * 100;
    length.style.cssText = `background-image: linear-gradient(to right, var(--main-green) ${percent}%, var(--body) ${percent}%);`;
}

// generate new password
document.forms[0].addEventListener("submit", (e) => {
    e.preventDefault();
    result.value = password1.generate();
});

// Copy text to clipboard
document.getElementById("copy").onclick = () => {
    navigator.clipboard.writeText(result.value);
}