import * as userService from "../../services/user.service";
import { User } from "../../entities/user";
import * as dotenv from "dotenv";
import { dataSourceTest } from "../../config/dbTest";

dotenv.config();

beforeAll(async () => {
  await dataSourceTest.initialize();
  await dataSourceTest.runMigrations();
});

afterAll(async () => {
  await dataSourceTest.destroy();
});

beforeEach(async () => {
  await dataSourceTest.getRepository(User).delete({});
});

describe("User service integration tests", () => {
  const email = "anewuser@test1.fr";
  const password = "1234";

  it("Test 01 - create new user", async () => {
    const user = await userService.createUser(email, password);

    expect(user).toBeDefined();
    expect(user.email).toBe(email);
    expect(user.password).not.toBe(password);
    expect(user.password).toMatch(/^\$argon2id/);

    const userInDb = await dataSourceTest.getRepository(User).findOne({
      where: { email },
    });
    expect(userInDb).not.toBeNull();
    if (userInDb) {
      expect(userInDb.email).toBe(email);
      expect(userInDb.password).not.toBe(password);
    } else {
      console.error("User not found.");
    }
  });

  it("Test 02 - Get user profile by email", async () => {
    const retrievedUser = await userService.getByEmail(email);

    expect(retrievedUser).toBeDefined();

    if (retrievedUser) {
      expect(retrievedUser.email).toBe(email);
      expect(retrievedUser.password).not.toBe(password);
      expect(retrievedUser.surveys).toBeDefined();
      expect(retrievedUser.role).toBeDefined();
    } else {
      console.error("retrievedUser not found.");
    }
  });

  it("Test 03 - Update user profile", async () => {
    const user = await userService.getByEmail(email);
    const updatedEmail = "updated@example.com";
    const updatedFirstname = "John";
    const updatedLastname = "Doe";

    if (user) {
      await userService.updateUser(
        user,
        updatedEmail,
        updatedFirstname,
        updatedLastname
      );
    } else {
      console.error("User not found.");
    }

    const updatedUser = await userService.getByEmail(updatedEmail);

    expect(updatedUser).toBeDefined();

    if (updatedUser) {
      expect(updatedUser.email).toBe(updatedEmail);
      expect(updatedUser.firstname).toBe(updatedFirstname);
      expect(updatedUser.lastname).toBe(updatedLastname);
      expect(updatedUser.password).not.toBe(user?.password);
    } else {
      console.error("updatedUser not found.");
    }
  });

  it("Test 04 - Delete user", async () => {
    const user = await userService.getByEmail("updated@example.com");

    if (user) {
      await userService.deleteUser(user.email);
    } else {
      console.error("User not found.");
    }

    const deletedUser = await userService.getByEmail("updated@example.com");

    expect(deletedUser).toBeNull();
  });
});

