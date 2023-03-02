import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

// Should be able to list all users
// Should not be able to a non admin user get list of all users
// Should not be able to a non existing user get list of all users

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userFound = this.usersRepository.findById(user_id);

    if (!userFound) {
      throw new Error("Client user ID not found");
    }

    if (!userFound.admin) {
      throw new Error("Not allowed, lacking permissions.");
    }
    console.log(userFound);

    const users = this.usersRepository.list();
    return users;
  }
}

export { ListAllUsersUseCase };
