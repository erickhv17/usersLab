var express = require("express");
var app = express();
var http = require("http");
var bodyParser = require("body-parser");
var students = require("./Students");

app.set("port", process.env.PORT || 3038);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});

app.get("/student/getAll", function (request, response) {
  try {
    if (students) {
      let listForResponse = students.students.map((element) => {
        let copy = { ...element };
        delete copy.carrer;
        delete copy.admissionDate;
        delete copy.address;
        delete copy.active;
        return copy;
      });
      response.status(200).json(listForResponse);
    } else response.status(500).send({ message: "Error, Something is wrong getting the students" });
  } catch (ex) {
    response
      .status(500)
      .send({ message: "Error, Something is wrong getting the students" });
  }
});

app.get("/student/get/:id", function (request, response) {
  let id = request.params.id;

  try {
    if (students)
      response.status(200).json(
        students.students.find((elem) => {
          return elem.id == id;
        }) || { message: "Error, There isn't a student with that ID" }
      );
    else
      response
        .status(500)
        .send({ message: "Error, Something is wrong getting the student" });
  } catch (ex) {
    response
      .status(500)
      .send({ message: "Error, Something is wrong getting the student" });
  }
});

app.post("/student/add", function (req, response) {
  var postData = req.body;
  postData.id = getRandomInt();

  try {
    let responseAdd = insertFunction(postData);

    !responseAdd
      ? response.status(201).json({
          message: "Success, An student has been added correctly!",
        })
      : response.status(400).json({
          message: "Error, There is another student with the same ID",
        });
  } catch (err) {
    response
      .status(500)
      .send({ message: "Error, Something is wrong adding the student" });
  }
});

app.post("/student/edit", function (req, response) {
  var postData = req.body;

  try {
    let responseEdit = editFunction(postData);

    responseEdit > -1
      ? response.status(200).json({
          message: "Success, An student has been edited correctly!",
        })
      : response.status(400).json({
          message: "Error, There isn't the student with that ID",
        });
  } catch (err) {
    response
      .status(500)
      .send({ message: "Error, Something is wrong editing the student" });
  }
});

app.post("/student/delete/:id", function (req, response) {
  let id = req.params.id;

  try {
    let responseDelete = deleteFunction(id);

    responseDelete > -1
      ? response.status(200).json({
          message: "Success, An student has been deleted correctly!",
        })
      : response.status(400).json({
          message: "Error, There isn't the student with that ID",
        });
  } catch (err) {
    response
      .status(500)
      .send({ message: "Error, Something is wrong deleting the student" });
  }
});

insertFunction = (obj) => {
  //check if the id is already in use

  let check = students.students.every((element) => {
    return element.id == obj.id;
  });

  if (!check) students.students.push(obj);

  return check;
};

editFunction = (obj) => {
  let index = students.students.findIndex((elem) => {
    return elem.id == obj.id;
  });

  if (index > -1) students.students[index] = obj;

  return index;
};

deleteFunction = (id) => {
  let index = students.students.findIndex((elem) => {
    return elem.id == id;
  });

  if (index > -1) students.students.splice(index, 1);

  return index;
};

getRandomInt = () => {
  return Math.floor(Math.random() * Math.floor(999999999999));
};
