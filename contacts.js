import fs from "fs/promises";
import { join } from "path";
import colors from "colors";

const contactsPath = join("./db", "contacts.json");

function parseContacts(data) {
  return JSON.parse(data.toString());
}

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = parseContacts(data);
    const sortedContacts = [...contacts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    return sortedContacts;
  } catch (error) {
    console.log(error.message.red);
  }
}

export async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = parseContacts(data);
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  } catch (error) {
    console.log(error.message.red);
  }
}

export async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = parseContacts(data);
    const contactIndex = contacts.findIndex((c) => c.id === contactId);
    if (contactIndex !== -1) {
      const [removedContact] = contacts.splice(contactIndex, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return removedContact;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error.message.red);
  }
}

export async function addContact(name, email, phone) {
  if (!name || !email || !phone) {
    console.log("Please provide all arguments (name, email, phone) to add a contact.".red);
    return;
  }

  try {
    const data = await fs.readFile(contactsPath);
    const contacts = parseContacts(data);
    const newContact = {
      id: String(Math.floor(Math.random() * 100000) + contacts.length),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(`Oops, something went wrong: ${error.message}`.red);
  }
}
