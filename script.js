let taskList = [];
// const ttlHrsElm = document.getElementById("ttlHrs");

const hoursPerWeek = 24 * 7;
const handleOnSubmit = (e) => {
  const newForm = new FormData(e);
  const task = newForm.get("task");
  const hr = +newForm.get("hr");
  // console.log(task, hr);
  const obj = {
    task,
    hr,
    id: randomIdGenerator(),
    type: "entry",
  };
  //Check if there is enough hours left
  const existingTtlHrs = taskTotal();
  if (existingTtlHrs + hr > hoursPerWeek) {
    return alert("Sorry Bhayya. You are exceeding, hours per week");
  }

  taskList.push(obj);
  // console.log(taskList);
  displayEntryList();
};

const displayEntryList = () => {
  console.log(taskList);
  //console.log("first");
  let str = "";
  const entryElm = document.getElementById("entryList");

  const entryList = taskList.filter((item) => item.type === "entry");
  entryList.map((item, i) => {
    str += `
    <tr>
    <th scope="row">${i + 1}</th>
    <td>${item.task}</td>
    <td>${item.hr}hr</td>
    <td class="text-end">
      <button onclick="handleOnDelete('${item.id}')" class="btn btn-danger">
        <i class="fa-solid fa-trash"></i>
      </button>
      <button onclick="switchTask('${item.id}','bad')" class="btn btn-success">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </td>
  </tr>
    `;
  });
  entryElm.innerHTML = str;
  taskTotal();
};

const displayBadList = () => {
  let str = "";
  console.log(taskList);

  const badElm = document.getElementById("badList");

  const badList = taskList.filter((item) => item.type === "bad");
  badList.map((item, i) => {
    str += `
      <tr>
      <th scope="row">${i + 1}</th>
      <td>${item.task}</td>
      <td>${item.hr}hr</td>
      <td class="text-end">
       
        <button onclick="switchTask('${
          item.id
        }','entry')" class="btn btn-warning">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <button onclick="handleOnDelete('${item.id}')" class="btn btn-danger">
        <i class="fa-solid fa-trash"></i>
      </button>
      </td>
    </tr>
      `;
  });
  badElm.innerHTML = str;
  document.getElementById("savedHrsElm").innerText = badList.reduce(
    (acc, item) => acc + item.hr,
    0
  );
};
const randomIdGenerator = (length = 6) => {
  const str = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAMNBVCXZ1234567890";
  let id = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * str.length);
    id += str[randomIndex];
  }
  return id;
};
const handleOnDelete = (id) => {
  // console.log(id);
  if (window.confirm("Are you sure, you want to delete this?")) {
    taskList = taskList.filter((item) => item.id !== id);
    displayEntryList();
    displayBadList();
  }
};
const switchTask = (id, type) => {
  taskList = taskList.map((item) => {
    if (item.id === id) {
      item.type = type;
    }
    return item;
  });
  displayEntryList();
  displayBadList();
};

const taskTotal = () => {
  const ttlHr = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);
  document.getElementById("ttlHrs").innerText = ttlHr;
  return ttlHr;
};
