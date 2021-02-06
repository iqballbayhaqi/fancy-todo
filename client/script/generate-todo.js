const deleteTodo = (id) => {
  $.ajax({
    url: 'http://localhost:3001/todos/' + id,
    method: 'DELETE',
    headers: {
      token: localStorage.getItem("access_token")
    }
  })
  .done( res => {
    generateListTodo()
  })
  .fail( err => {
    console.log(err);
  })
}

const doneTodo = (id) => {
  $.ajax({
    url: 'http://localhost:3001/todos/' + id,
    method: 'PATCH',
    headers: {
      token: localStorage.getItem("access_token")
    },
    data: {
      status: true
    }
  })
  .done( res => {
    generateListTodo()
  })
  .fail( err => {
    console.log(err);
  })
}

const generateListTodo = () => {
  $.ajax({
    url: "http://localhost:3001/todos",
    method: "GET",
    headers: {
      token: localStorage.getItem("access_token"),
    },
  })
    .done((res) => {
      $("#list-card-todo").empty();
      resUndone = res.filter(val => val.status === false)
      resUndone.forEach((el, index) => {
        $("#list-card-todo").append(`
          <div class="card" style="margin-top: ${index !== 0 ? "20px" : "0"};">
            <div class="d-flex">
              <img
                src="${el.image}"
                width="auto"
                height="200px"
                onError="this.onerror=null;this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3RcPqetZMxRhAdfp6tD2lxDrIKTlewNHp4g&usqp=CAU';"
                class="card-img-top"
                style="width: auto"
              />
              <div class="card-body">
                <h3>${el.title}</h3>
                <p style="margin: 0">
                  ${el.description}
                </p>
                <p>Due Date : ${el.due_date}</p>
                <div class="btn-hapus">
                  <button type="button" onclick="doneTodo(${el.id})" class="btn btn-info">Done</button>
                  <button type="button" onclick="deleteTodo(${el.id})" class="btn btn-danger">Delete</button>
                </div>
              </div>
            </div>
          </div>
        `);
      });
      $("#list-card-todo").append(`
        <h3 class="text-center" style="margin-top: 20px">Done</h3>
      `)
      resDone = res.filter(val => val.status === true)
      resDone.forEach((el, index) => {
        $("#list-card-todo").append(`
          <div class="card" style="margin-top: ${index !== 0 ? "20px" : "0"};">
            <div class="d-flex">
              <img
                src="${el.image}"
                width="auto"
                height="200px"
                onError="this.onerror=null;this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3RcPqetZMxRhAdfp6tD2lxDrIKTlewNHp4g&usqp=CAU';"
                class="card-img-top"
                style="width: auto"
              />
              <div class="card-body">
                <h3>${el.title}</h3>
                <p style="margin: 0">
                  ${el.description}
                </p>
                <p>Due Date : ${el.due_date}</p>
                <div class="btn-hapus">
                  <button type="button" onclick="deleteTodo(${el.id})" class="btn btn-danger">Delete</button>
                </div>
              </div>
            </div>
          </div>
        `);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
generateListTodo();