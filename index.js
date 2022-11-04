const contactsOperations = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsOperations.listContacts();
      console.log("Your list of contacts:", allContacts);
      break;
    case "get":
      const contactById = await contactsOperations.getContactById(id);
      if (contactById === null) {
        console.log(
          `Sorry, there is no contacts with ID ${id} in your contacts list, try another one...`
        );
        break;
      }
      console.log("Your contact by id:", contactById);
      break;
    case "remove":
      const newContactsList = await contactsOperations.removeContact(id);
      if (newContactsList === null) {
        console.log(
          `Sorry, there is no contacts with ID ${id} to be removed, try another one...`
        );
        break;
      }
      console.log(
        `The contact with ID ${id} has been successfully deleted. Your new list of contacts is:`,
        newContactsList
      );
      break;
    case "add":
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log("Your new contact is:", newContact);
      break;
    default:
      console.log(
        "We're sorry, but requested action is not exist at all, at least currently..."
      );
  }
};

invokeAction(argv);

// invokeAction({ action: "list" });
// invokeAction({ action: "remove", id: "11" });
// invokeAction({ action: "get", id: "10" });
// invokeAction({
//   action: "add",
//   name: "Someone",
//   email: "someEmail@smile.com",
//   phone: "(888) 888 8888",
// });
