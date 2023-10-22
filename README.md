#About this project

The project has to main components:
  - Company.jsx --> In this component the user can fill out his company's informations (name, email, number of employees, descripiton about the company).
  - employee.jsx --> After the company's data are declared the form will automatically create as many employee forms as the number of employees
    The validation of the given informations are happens with Yup, which is a Form validation library ([link text](https://github.com/jquense/yup))
    I solved the rendering of the employee forms with the use of useState hook.
    If all the given datas are valid the project makes a JSON file from the data of both the user and the company. Which, then could be sent to a backend.

    (ui.: it was too late when i realised that the number of employees should be atleast 1 or more, and i didn't had enough time to rewrite the code.
    So if the user only gives information about his company and does not add any number of employees, the data still will be validated as ok. and could be sent to a backend)
