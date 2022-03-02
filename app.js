let user = {};
let totalUser = [];
let errorIcon = `<i class="fa-solid fa-circle-exclamation"></i>`;
let upName = document.getElementById("upname");
let upEmail = document.getElementById("upemail");
let upPassword = document.getElementById("uppassword");
let mainForm = document.querySelector(".main-form");
let error_name = document.getElementById("error_name");
let error_email = document.getElementById("error_email");
let error_password = document.getElementById("error_password");
let error_password2 = document.getElementById("error_password2");
let upId = document.getElementById("upidinput");
let upSubmit = document.getElementById("submit_form");
let upModalCloseBtn = document.getElementById("modalCloserBtn");
let fileImage = document.getElementById("fileImage");
let imageSrc = document.getElementById('output');
let modSuccess = document.querySelector(".mod-success");
let eyeSlash = document.getElementById("faEyeSlash");
let eye = document.getElementById("faEye");
let eyeSlash2 = document.getElementById("faEyeSlash2");
let eye2 = document.getElementById("faEye2");




eyeSlash.addEventListener("click", () => {
    document.getElementById("password").type = "text";
    eye.style.display = "block";
    eyeSlash.style.display = "none";
})
eye.addEventListener("click", () => {
    document.getElementById("password").type = "password";
    eyeSlash.style.display = "block";
    eye.style.display = "none";
})

eyeSlash2.addEventListener("click", () => {
    document.getElementById("password2").type = "text";
    eye2.style.display = "block";
    eyeSlash2.style.display = "none";
})
eye2.addEventListener("click", () => {
    document.getElementById("password2").type = "password";
    eyeSlash2.style.display = "block";
    eye2.style.display = "none";
})



const loadFile = (event) => {
    const imageData = new FormData();
    imageData.set('key', '17ac14314ef3659a68459dd0db56cb79')
    imageData.append('image', event.target.files[0]);
    axios.post('https://api.imgbb.com/1/upload', imageData)
        .then((res) => {
            console.log(res)
            displayUrl(res.data.data.url)
            imageSrc.src = res.data.data.url;
        })

}

const displayUrl = (url) => {
    fileImage.value = url;
}


const addClass = (id) => {
    document.getElementById(id).classList.add("invalid");

}
const removeClass = (id) => {
    document.getElementById(id).classList.remove("invalid");

}

const handleLabel = (id) => {
    document.getElementById(id).style.margin = "0 0 0.4em 0em"
}

const handleBlur = (labelId, inputId) => {
    const inputValue = document.getElementById(inputId);
    if (!inputValue.value) {
        document.getElementById(labelId).style.margin = "0 0 -2.4em 1em"
    }

}


// Validation check with handleChange function

const handleChange = (fieldId, value) => {
    let validate = true;
    if (fieldId === "name") {
        validate = /^([a-zA-Z])+$/.test(value);
        if (value === "") {
            validate = false;
            error_name.innerHTML = `${errorIcon} Name is required`;
        }
        else if (value.length < 3) {
            validate = false;
            addClass(fieldId);
            error_name.innerHTML = `${errorIcon} Name should 3 character`;
        }
        else if (!validate) {
            addClass(fieldId);
            error_name.innerHTML = `${errorIcon} Name doesn't containe any number`;
        }

        else {
            removeClass(fieldId);
            error_name.innerHTML = '';
        }
    }
    if (fieldId === "email") {
        validate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        if (value === "") {
            validate = false;
            error_email.innerHTML = `${errorIcon} Email is required`;
        }
        else if (!validate) {
            addClass(fieldId);
            error_email.innerHTML = `${errorIcon} Please enter valide email address`;
        }
        else {
            removeClass(fieldId);
            error_email.innerHTML = '';

        }
    }
    if (fieldId === "password") {
        validate = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
        if (value === "") {
            validate = false;
            error_password.innerHTML = `${errorIcon} Password is required`;
        }
        else if (value.length < 7) {
            validate = false;
            addClass(fieldId);
            error_password.innerHTML = `${errorIcon} Password should be minimum 8 character`;
        }

        else if (!validate) {
            addClass(fieldId);
            error_password.innerHTML = `${errorIcon} Password contain min one capital and small letter,number,special character`;

        }
        else {
            removeClass(fieldId);
            error_password.innerHTML = '';

        }
    }
    if (fieldId === "password2") {
        if (value.length) {
            removeClass(fieldId);
            error_password2.innerHTML = '';
        }
        else {
            addClass(fieldId);
            error_password2.innerHTML = `${errorIcon} Confirm password is required`;
        }
    }

    if (validate) {
        user.image = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        user[fieldId] = value
    }
}

// close validation

// submitting form with addEventListener
mainForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSubmit();
});
// submitting updating form with addEventListener
upSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    updateUser();
});
// closing modal after successfully add a user
document.getElementById("crossId").addEventListener("click", () => {
    modSuccess.style.zIndex = "-50";
});
// getting all user form localStorage
const getAllUser = () => {
    let isFound = localStorage.getItem("users")
    if (isFound) {
        let getUsers = JSON.parse(isFound);
        totalUser = getUsers;
    }
};

// displayAllUser in UI 
const displayAllUser = () => {
    getAllUser();
    let cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    totalUser.map(user => {
        const { name, email, id, image } = user;
        const div = document.createElement("div");
        div.setAttribute("class", "col");
        div.innerHTML = `
          <div class="card d-flex justify-content-between align-items-center shadow-sm">
                <div class="profile_img">
                    <img src=${image}> 
                </div>
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">Email: ${email}</p>
                    <p class="card-text">ID: ${id}</p>
                </div>
                <div onclick={deleteUser(${id})} class="closer delete"><i class="fa-solid fa-trash-can"></i></div>
                <div onclick={getSingleUser(${id})} class="closer edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i class="fa-solid fa-pen-to-square"></i>
                </div>
          </div>
       
        `
        cardContainer.appendChild(div);
    })
}

// adding user into localStorage
const addToUser = () => {
    getAllUser();
    user.id = Number(new Date());
    totalUser.push(user);
    localStorage.setItem("users", JSON.stringify(totalUser));
    displayAllUser();
}
// getting single user form localStorage
const getSingleUser = (id) => {
    getAllUser();
    const newUser = totalUser.find(user => user.id == id);
    let { name, email, password, image } = newUser;
    upId.value = id;
    upName.value = name;
    upEmail.value = email;
    upPassword.value = password;
    imageSrc.src = image;
};
// updating a particular user form displayAllUser
const updateUser = () => {
    getAllUser();
    const userIndex = totalUser.findIndex((user) => user.id == upId.value);
    const newUser = totalUser[userIndex];
    newUser.name = upName.value;
    newUser.email = upEmail.value;
    newUser.password = upPassword.value;
    newUser.password2 = upPassword.value;
    newUser.image = fileImage.value ? fileImage.value : newUser.image;
    totalUser.splice(userIndex, 1, newUser);
    localStorage.setItem("users", JSON.stringify(totalUser));
    displayAllUser();

};
// delete user from localStorage
const deleteUser = (id) => {
    getAllUser();
    const newUsers = totalUser.filter(user => user.id !== id);
    totalUser = newUsers;
    localStorage.setItem("users", JSON.stringify(totalUser));
    displayAllUser();
}

displayAllUser();

// submitting main adding form after all validation
const handleSubmit = () => {
    let { name, email, password, password2 } = user;
    console.log(password)
    let submit = true;

    if (!name) {
        submit = false;
        addClass("name");
        error_name.innerHTML = `${errorIcon} Name is required and invalid name`;
    }
    if (!email) {
        submit = false;
        addClass("email");
        error_email.innerHTML = `${errorIcon} Email is required and invalid email`;
    }
    if (!password) {
        submit = false;
        addClass("password");
        error_password.innerHTML = `${errorIcon} Password is required and invalid password`;
    }
    if (!password2) {
        submit = false;
        addClass("password2");
        error_password2.innerHTML = `${errorIcon} Confirm password is required`;
    }
    if (submit) {
        if (password !== password2) {
            addClass("password2");
            error_password2.innerHTML = `${errorIcon} Password doesn't match`;

        }
        if (password === password2) {
            removeClass("password2");
            // error_password2.innerHTML = ``;
            getAllUser();
            addToUser();
            mainForm.reset();
            modSuccess.style.zIndex = "44";
        }
    }
};

