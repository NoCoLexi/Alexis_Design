import { db, type User, type InsertUser, type Contact, type InsertContact, users, contacts } from "@workspace/db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return rows[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const rows = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return rows[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const rows = await db.insert(users).values(insertUser).returning();
    return rows[0];
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const rows = await db.insert(contacts).values(insertContact).returning();
    return rows[0];
  }

  async getContacts(): Promise<Contact[]> {
    return db.select().from(contacts).orderBy(contacts.createdAt);
  }
}

export const storage = new DbStorage();
