const addButton = document.querySelector('#add');

const updateLSData = () => {
    const textareaData = document.querySelectorAll('textarea');
    const notes = [];
    console.log(textareaData);
    textareaData.forEach((note) => {
        return notes.push(note.value);
    });
    console.log(notes);
    localStorage.setItem('notes', JSON.stringify(notes));
};

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
        <div class="operation">
            <button class="edit"><i class="fa fa-edit"></i></button>
            <button class="delete"><i class="fa-duotone fa-solid fa-trash"></i></button>
        </div>
        <div class="main ${text ? " " : "hidden"}">${text}</div>
        <textarea class="" ${text ? "hidden" : " "}>${text}</textarea>
    `;
    note.insertAdjacentHTML('afterbegin', htmlData);

    // Getting the references
    const editbutton = note.querySelector(".edit");
    const deletebutton = note.querySelector(".delete");
    const mainDiv = note.querySelector(".main");
    const textarea = note.querySelector("textarea");

    // Delete note functionality
    deletebutton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    });

    // Toggle using edit button
    editbutton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    });

    // Update the main div content with textarea changes
    textarea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();

    });

    document.body.appendChild(note);
};


const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
    notes.forEach((note) => addNewNote(note))
}

addButton.addEventListener('click', () => addNewNote());
