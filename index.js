import { Command } from "commander";
import * as contacts from "./contacts.js";

const program = new Command();
program
  .option(
    "-a, --action <type>",
    "choose action: list, get -i, add -n -e -p, remove -i"
  )
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const allContacts = await contacts.listContacts();
        console.table(allContacts);
      } catch (error) {
        console.log(error.message.red);
      }
      break;

    case "get":
      try {
        const contact = await contacts.getContactById(id);
        console.log(contact || null);
      } catch (error) {
        console.log(error.message.red);
      }
      break;

    case "add":
      try {
        const newContact = await contacts.addContact(name, email, phone);
        console.log(newContact);
      } catch (error) {
        console.log(error.message.red);
      }
      break;

    case "remove":
      try {
        const removedContact = await contacts.removeContact(id);
        console.log(removedContact || null);
      } catch (error) {
        console.log(error.message.red);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
