import { user } from './user'; // Assurez-vous que l'importation du module User est correcte
import { UserService } from './user.service';
import * as fs from 'fs';

export class UserJsonService implements UserService {
  private readonly fileName = './src/user/user.json';

  add(username: string): user {
    const users: user[] = this.readUsersFromFile();

    // Générez un nouvel ID
    const newId = this.generateUniqueId(users);
    console.log({newId})
    const userExiste = this.getById(newId)
    if (userExiste){
        throw new Error("Existe deja");
        
    }
    // Créez un nouvel utilisateur
    const newUser: user = {
      id: newId,
      name: username,
    };

    // Ajoutez le nouvel utilisateur à la liste
    users.push(newUser);

    // Écrivez la liste mise à jour dans le fichier JSON
    this.writeUsersToFile(users);

    return newUser;
  }

  getById(id: number): user | null {
    const existingData: user[] = this.readUsersFromFile();
    console.log({ existingData });

    // Recherchez l'utilisateur par ID
    const user = existingData.find((u) => u.id === id);
    if (!user) {
      return null;
    }
    return user;
  }

  private readUsersFromFile(): user[] {
    try {
      const data = fs.readFileSync(this.fileName, 'utf-8');
      console.log({ data });
      return JSON.parse(data) as user[];
    } catch (error) {
      return [];
    }
  }

  private writeUsersToFile(users: user[]): void {
    const data = JSON.stringify(users, null, 2);
    fs.writeFileSync(this.fileName, data, 'utf-8');
  }

  private generateUniqueId(users: user[]): number {
    const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
    return maxId + 1;
  }
}
