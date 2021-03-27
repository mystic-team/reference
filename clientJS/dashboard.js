const showClass = (className) => {
  let userDetails = {};
  if (localStorage.getItem("userDetails").length > 10) {
    userDetails = JSON.parse(localStorage.getItem("userDetails"));
    document.getElementById("email").value = userDetails.email;
  }
  userDetails.sorted.forEach((c) => {
    if (c.className == className) {
      students = c.students;
      localStorage.setItem("currentStudents", JSON.stringify(students));
    }
  });
  localStorage.setItem("currentClassName", className);
  window.location.href = "/class";
};

const getData = () => {
  userDetails = document.getElementById("userDetails").value;
  //   if (localStorage.getItem("userDetails").length < 10)
  localStorage.setItem("userDetails", userDetails);
  userDetails = JSON.parse(userDetails);
  let html = "";
  let h2 =""; /*

  */
  let rowsCount = 1;
  let colCount = 1;
  let semCount = 0; //2-
  let temp = semCount;
  userDetails.sorted.forEach((c) => {
    if(semCount !== c.sem)
    {
      h2 += `
      <h2 class="text-3xl row-start-${rowsCount/*1*/} col-start-1 col-span-full" > <img class="w-7 inline" src="./static/imgs/pencil.svg"> Semester - ${c.sem} </h2>
      `;
      semCount = c.sem; //2-3-4
      colCount = 1; //1-1-1
      rowsCount++; //2-3-4
      console.log(rowsCount)
    }
    html = `
      <div class="logsign grid items-center justify-items-center card h-28 row-start-${rowsCount} col-start-${colCount} col-span-4 cursor-pointer" onclick='showClass("${c.className}")'>
        <span class="text-3xl">${c.className}</span>
      </div>
    `;
    h2+=html;
    colCount+=4;
    if(colCount > 12 ){
      colCount = 1;
      rowsCount++;
    }
    if(temp !== semCount)
    {
      rowsCount++;
      temp = semCount;
    }
  });
  // document.getElementsByClassName("h2").innerHTML = c.sem;
  document.getElementById("allClasses").innerHTML = h2
};

const addClass = () => {
  let userDetails = {};
  if (localStorage.getItem("userDetails").length > 10) {
    userDetails = JSON.parse(localStorage.getItem("userDetails"));
    document.getElementById("email").value = userDetails.email;
  }
  form = document.getElementById("form");
  if (form.style.display == "block") {
    form.style.display = "none";
  } else {
    form.style.display = "block";
  }
};
