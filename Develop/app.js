const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let empIdCount = 1
const empArray = []

const questions = [
    {
        type: 'list',
        name: 'addEmpType',
        choices: ['Manager', 'Engineer', 'Intern']
    },
    {
        type: 'input',
        name: 'empName',
        message: 'Enter full name: '
    },
    {
        type: 'input',
        name: 'empEmail',
        message: 'Enter employee email: '
    }
]

function rerun() {
    inquirer.prompt({
        type: 'list',
        name: 'addAdditional',
        choices: ['Y', 'N']
    }).then((resp) => {
        if (resp.addAdditional === 'Y') {
            addEmp()
        } else {
            let htmlBlock = render(empArray)
            fs.writeFileSync(("./output/team.html"), htmlBlock)
        }
    });
};

function addEmp() {
    inquirer.prompt(questions).then((answers) => {
        if (answers.addEmpType === 'Manager') {
            inquirer.prompt({
                type: 'input',
                name: 'officeNumber',
                message: 'Employee office number: '
            }).then((data) => {
                answers.officeNumber = data.officeNumber
                empArray.push(new Manager(answers.empName, empIdCount, answers.empEmail, answers.officeNumber))
                empIdCount++
                rerun()
            })
        } else if (answers.addEmpType === 'Engineer') {
            inquirer.prompt({
                type: 'input',
                name: 'github',
                message: 'Employee GitHub account: '
            }).then((data) => {
                answers.github = data.github
                empArray.push(new Engineer(answers.empName, empIdCount, answers.empEmail, answers.github))
                empIdCount++
                rerun()
            })
        } else if (answers.addEmpType === 'Intern') {
            inquirer.prompt({
                type: 'input',
                name: 'school',
                message: 'Student school: '
            }).then((data) => {
                answers.school = data.school
                empArray.push(new Intern(answers.empName, empIdCount, answers.empEmail, answers.school))
                empIdCount++
                rerun()
            })
        };
    });
};

addEmp()

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
